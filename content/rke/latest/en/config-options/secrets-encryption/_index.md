---
title: Encrypting Secret Data at Rest
weight: 230
---

As of version `v0.3.1` RKE adds the support for managing secret data encryption at rest, which is [supported by Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#before-you-begin) since version `v1.13`.

At-rest data encryption is required for:

- Compliance requirements
- Additional layer of security
- Reduce security impact of etcd node compromise
- Reduce security impact of etcd backups compromise
- Ability to use external Key Management Systems

RKE provides users with two paths of configuration to enable at-rest data encryption:

- Managed at-rest data encryption
- Custom configuration for at-rest data encryption

Both configuration options can be added during initial cluster provisioning or by updating an existing cluster.

To utilize this feature, a new field `secrets_encryption_config` is added to the [Kubernetes API service configuration]({{<baseurl>}}//rke/latest/en/config-options/services/#kubernetes-api-server). A full custom configuration looks like this:

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
# Managed At-Rest Data Encryption

Enabling and disabling at-rest data encryption in Kubernetes is a relatively complex process that requires several steps to be performed by the Kubernetes cluster administrator. The managed configuration aims to reduce this overhead and provides a simple abstraction layer to manage the process.

### Enable Encryption
Managed at-rest data encryption is disabled by default and can be enabled by using the following configuration:

```yaml
services:
  kube-api:
    secrets_encryption_config:
      enabled: true
```
Once enabled, RKE will perform the following [actions](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#encrypting-your-data) to enable at-rest data encryption:

- Generate a new random 32-bit encryption key
- Generate an encryption provider configuration file using the new key The default [provider](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#providers) used is `aescbc`
- Deploy the provider configuration file to all nodes with `controlplane` role
- Update the `kube-apiserver` container arguments to point to the provider configuration file.
- Restart the `kube-apiserver` container.

After the `kube-api server` is restarted, data encryption is enabled. However, all existing secrets are still stored in plain text. RKE will [rewrite](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#ensure-all-secrets-are-encrypted) all secrets to ensure encryption is fully in effect.

### Disable Encryption
To disable encryption, you can either set the `enabled` flag to `false`, or simply remove the `secrets_encryption_config` block entirely from cluster.yml.

```yaml
services:
  kube-api:
    secrets_encryption_config:
      enabled: false
```

Once encryption is disabled in `cluster.yml`, RKE will perform the following [actions](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#encrypting-your-data) to disable encryption in your cluster:

- Generate a new provider configuration file with the no-encryption `identity{}` provider as the first provider, and the previous `aescbc` set in the second place. This will allow Kubernetes to use the first entry to write the secrets, and the second one to decrypt them.
- Deploy the new provider configuration and restart `kube-apiserver`.
- Rewrite all secrets. This is required because, at this point, new data will be written to disk in plain text, but the existing data is still encrypted using the old provider. By rewriting all secrets, RKE ensures that all stored data is decrypted.
- Update `kube-apiserver` arguments to remove the encryption provider configuration and restart the `kube-apiserver`.
- Remove the provider configuration file.


# Key Rotation
Sometimes there is a need to rotate encryption config in your cluster. For example, the key is compromised. There are two ways to rotate the keys: with an RKE CLI command, or by disabling and re-enabling encryption in `cluster.yml`.

### Rotating Keys with the RKE CLI

With managed configuration, RKE CLI has the ability to perform the key rotation process documented [here](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#rotating-a-decryption-key) with one command. To perform this operation, the following subcommand is used:
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

- Generate a new random 32-bit encryption key
- Generate a new provider configuration with the new key as the first provider and the second key as the second provider. When the secrets are rewritten, the first key will be used to encrypt the data on the write operation, while the second key (the old key) will be used to decrypt the stored data during the the read operation
- Deploy the new provider configuration to all `controlplane` nodes and restart the `kube-apiserver`
- Rewrite all secrets. This process will re-encrypt all the secrets with the new key.
- Update the configuration to remove the old key and restart the `kube-apiserver`

### Rotating Keys by Disabling and Re-enabling Encryption in cluster.yml

For a cluster with encryption enabled, you can rotate the encryption keys by updating `cluster.yml`. If you enable and re-enable the data encryption in the `cluster.yml`, RKE will not reuse old keys. Instead, it will generate new keys every time, yielding the same result as a key rotation with the RKE CLI.

# Custom At-Rest Data Encryption Configuration
With managed configuration, RKE provides the user with a very simple way to enable and disable encryption with minimal interaction and configuration. However, it doesn't allow for any customization to the configuration.

With custom encryption configuration, RKE allows the user to provide their own configuration. Although RKE will help the user to deploy the configuration and rewrite the secrets if needed, it doesn't provide a configuration validation on user's behalf. It's the user responsibility to make sure their configuration is valid.

>**Warning:** Using invalid Encryption Provider Configuration could cause several issues with your cluster, ranging from crashing the Kubernetes API service, `kube-api`,  to completely losing access to encrypted data.

### Example: Using Custom Encryption Configuration with Amazon KMS

An example for custom configuration would be enabling an external key management system like [Amazon KMS](https://aws.amazon.com/kms/). The following is an example of the configuration for AWS KMS:

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

Documentation for AWS KMS can be found [here](https://github.com/kubernetes-sigs/aws-encryption-provider). When Custom Configuration is set to to enable the AWS KMS provider, you should consider the following points:

- Since RKE runs the `kube-api`  service in a container, it's required that you use the `extra_binds` feature to bind-mount the KMS provider socket location inside the `kube-api` container.
- The AWS KMS provider runs as a pod in the cluster. Therefor, the proper way to enable it is to:
    1. Deploy your cluster with at-rest encryption disabled.
    2. Deploy the KMS pod and make sure it's working correctly.
    3. Update your cluster with the custom encryption configuration to utilize the KMS provider.
- Kube API connects to the KMS provider using a Unix socket. You should configure your KMS deployment to run pods on all `controlplane` nodes in the cluster.
- Your `controlplane` node should be configured with an AMI profile that has access to the KMS key you used in your configuration.

### How to Prevent Restore Failures after Rotating Keys
It's important to understand that enabling encryption for you cluster means that you can no longer access encrypted data in your etcd database and/or etcd database backups without using your encryption keys.

The encryption configuration is stored in the cluster state file `cluster.rkestate`, which is decoupled from the etcd backups. For example, in any of the following backup cases, the restore process will fail:

- The snapshot is taken while encryption is enabled and restored when it's disabled. In this case, the encryption keys are no longer stored in the cluster state.
- The snapshot is taken before the keys are rotated and restore is attempted after. In this case, the old keys used for encryption at the time of the snapshot no longer exist in the cluster state file.

Therefore, we recommend that when you enable or disable encryption, or when you rotate keys, you should [create a snapshot]({{<baseurl>}}/rke/latest/en/etcd-snapshots/one-time-snapshots/) so that your backup requires the same keys that you have access to.

This also means you should not rotate the keys during the restore process, because you would lose the encryption keys in `cluster.rkestate`.

The same applies to the custom configuration use case, however in this case it will depend on the user-provided encryption configuration.
