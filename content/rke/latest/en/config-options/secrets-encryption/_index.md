---
title: Encrypting Secret Data at Rest
weight: 230
---

As of version `v0.3.1` RKE adds the support for managing secret data encryption at rest, which is [supported by Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#before-you-begin) since version `v1.13`.
At-rest data encryption is required for:
- Compliance requirements.
- Additional layer of security.
- Reduce security impact of etcd node compromise.
- Reduce security impact of etcd backups compromise.
- Ability to use external Key Management Systems.

RKE provides users with two paths of configuration to enable at-rest data encryption:

- Managed at-rest data encryption.
- Custom configuration for at-rest data encryption.

Both configuration options can be added during initial cluster provisioning or by updating an exsiting cluster.

To utilize this feature, a new is added to [Kube API service Configuration]({{< baseurl >}}//rke/latest/en/config-options/services/#kubernetes-api-server). A full custom configuration looks like this:

```yaml
services:
  kube-api:
    secrets_encryption_config:
      enabled: true
      custom_config:
        apiVersion: apiserver.config.k8s.io/v1
        kind: EncryptionConfiguration
        resources:
        - resources:
          - secrets
          providers:
          - aescbc:
              keys:
              - name: k-fw5hn
                secret: RTczRjFDODMwQzAyMDVBREU4NDJBMUZFNDhCNzM5N0I=
          - identity: {}

```
### Managed At-Rest Data Encryption.

Enabling and disabling at-rest data encryption in Kubernetes a relatively complex process that requires several steps to be performed by they Kubernetes cluster administrator. The managed configuration aims to reduced this overhead and provided a simple abstraction layer to manage the process.

#### Enable Encryption
Managed at-rest data encryption is disabled by default and can be enabled by using the following configuration:

```yaml
services:
  kube-api:
    secrets_encryption_config:
      enabled: true
```
Once enabled, RKE will perform the following [actions](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#encrypting-your-data) to enable at-rest data encryption:
- Generate new random 32 bit encryption key.
- Generate an encryption provider configuration file using the new key. The default [provider](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#providers) used is `aescbc`.
- Deploy the provider configuration file to all nodes with `controlplane` role.
- Update kube-apiserver container arguments to point to the provider configuration file.
- Restart kube-apiserver container.
- At this point, data encryption is enabled. However, all existing secrets are still stored in plain text. RKE will [rewrite](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#ensure-all-secrets-are-encrypted) all secrets to ensure encryption is fully in effect.

#### Disable Encryption
To disabled encryption, you can either set the `enabled` flag to `false`, or simply remove the `secrets_encryption_config` block entirely.

```yaml
services:
  kube-api:
    secrets_encryption_config:
      enabled: false
```

Once disabled, RKE will perform the following [actions](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#encrypting-your-data) to disabled encryption on your cluster:
- Generate a new provider configuration file with the no-encryption `identity{}` provider as the first provider, and the previous `aescbc` set in the second place. This will allow Kubernetes to use the first to write the secrets, and the second one to decrypt them.
- Deploy the new provider configuration and restart kube-apiserver.
- Rewrite all secrets. This is required because, at this point, new data will be written to disk in plain text, but the existing data is still encrypted using the old provider. By rewriting all secrets, RKE ensures that all stored data is decrypted.
- Update kube-apiserver arguments to remove encryption provider configuration and restart kube-apiserver
- Remove the provider configuration file.

#### Key Rotation
With managed configuration, RKE has the ability to perform key rotation process documented [here](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#rotating-a-decryption-key). To perform this operation, the following subcommand is used:
```bash
$ ./rke encrypt rotate-key --help
NAME:
   rke encrypt rotate-key - Rotate cluster encryption provider key

USAGE:
   rke encrypt rotate-key [command options] [arguments...]

OPTIONS:
   --config value           Specify an alternate cluster YAML file (default: "cluster.yml") [$RKE_CONFIG]
   --ssh-agent-auth         Use SSH Agent Auth defined by SSH_AUTH_SOCK
   --ignore-docker-version  Disable Docker version check

```
This command will perform the following actions:
- Generate new random 32 bit encryption key.
- Generate a new provider configuration with new key as the first provider and the second key as the second provider. During secrets rewrite, the first key will be used to encrypt the data on the write operation, while the second key (the old key) will be used to decrypt the stored data during the the read operation.
- Deploy the new provider configuration to all `controlplane` nodes and restart kube-apiserver.
- Rewrite all secrets. This process will re-encrypt all the secrets with the new key.
- Update configuration to remove old key and restart kube-apiserver

>>**Note:** For a cluster with encryption enabled, disabling the encryption and re-enabling it again is equivalent to the rotation process. In other words, RKE will not reuse old keys if encryption was disabled and enabled again, instead, it will generate new keys every time.

### Custom At-Rest Data Encryption Configuration
With managed configuration, RKE provides they user with a very simple way to enable and disable encryption with minimal interaction and configuration. However, it doesn't allow for any customization to the configuration.

With Custom Encryption Configuration, RKE allows the user to provide their own configuration and manage it own their own. RKE will only help the user deploy the configuration and rewrite the secrets if needed. It's the user responsibility to make sure their confirmation is valid.

>>**Note:** Using invalid Encryption Provider Configuration could cause several issues with your cluster ranging from crashing Kube API service to completely losing access to encrypted data.

An ideal use case for Custom Configuration would be enabling an external Key Management System like [Amazon KMS](https://aws.amazon.com/kms/). An example of the configuration AWS KMS would look like this:
```yaml

services:
  kube-api:
    extra_binds:
      - "/var/run/kmsplugin/:/var/run/kmsplugin/"
    secrets_encryption_config:
      enabled: true
      custom_config:
        apiVersion: apiserver.config.k8s.io/v1
        kind: EncryptionConfiguration
        resources:
          - resources:
            - secrets
            providers:
            - kms:
                name: aws-encryption-provider
                endpoint: unix:///var/run/kmsplugin/socket.sock
                cachesize: 1000
                timeout: 3s
            - identity: {}
```

Documentation for AWS KMS can be found [here](https://github.com/kubernetes-sigs/aws-encryption-provider). When Custom Configuration to enable AWS KMS provider, you should consider the following points:
- Since RKE runs Kube API in a container, it's required that you use the `extra_binds` feature to bind-mount the KMS provider socket location inside the Kube API container.
- The AWS KMS provider runs as a pod in the cluster. Therefor, the proper way to enabled it is to:
    - Deploy your cluster with at-rest encryption disabled.
    - Deploy the KMS pod and make sure it's working correctly.
    - Update your cluster with the Custom Encryption Configuration to utilize the KMS provider.
- Kube API connects to the KMS provider using a unix socket. You should configure your KMS deployment to run pods on all `controlplane` nodes in the cluster.
- Your `controlplane` node should be configured with an AMI profile that has access to the KMS key you used in your configuration.

### Encryption and Backup
It's important to understand that enabling encryption for you cluster means that you can no longer access encrypted data in your etcd database and/or etcd database backups without using your encryption keys.

The encryption configuration is stored in the cluster state file `cluster.rkestate`, which is decoupled from the etcd backups. For example, for any of the following backup cases, the restore process will fail:
- Snapshot is taken while encryption is enabled and restored when it's disabled. In this case, the encryption keys are no longer stored in the cluster state.
- Snapshot is take before keys are rotated and restore is attempted after. In this case, the old keys used for encryption at the time of the snapshot no loner exist in the cluster state file.

The same applies to the Custom Configuration use case, however in this case it will depends on user configuration.
