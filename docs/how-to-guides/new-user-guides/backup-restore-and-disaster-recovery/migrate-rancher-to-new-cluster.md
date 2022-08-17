---
title: Migrating Rancher to a New Cluster
weight: 3
---

If you are migrating Rancher to a new Kubernetes cluster, you don't need to install Rancher on the new cluster first. If Rancher is restored to a new cluster with Rancher already installed, it can cause problems.

### Prerequisites

These instructions assume you have [created a backup](back-up-rancher.md) and you have already installed a new Kubernetes cluster where Rancher will be deployed.

:::caution

It is required to use the same hostname that was set as the server URL in the first cluster. If not done, downstream clusters will show as unavailable in the cluster management page of the UI, and you won't be able to click inside the cluster or on the cluster's <b>Explore</b> button.

:::

Rancher version must be v2.5.0 and up

Rancher can be installed on any Kubernetes cluster, including hosted Kubernetes clusters such as Amazon EKS clusters. For help installing Kubernetes, refer to the documentation of the Kubernetes distribution. One of Rancher's Kubernetes distributions may also be used:

- [RKE Kubernetes installation docs](https://rancher.com/docs/rke/latest/en/installation/)
- [K3s Kubernetes installation docs](https://rancher.com/docs/k3s/latest/en/installation/)

### 1. Install the rancher-backup Helm chart
Install version 2.x.x of the rancher-backup chart. The following assumes a connected environment with access to DockerHub:
```
helm repo add rancher-charts https://charts.rancher.io
helm repo update
helm install rancher-backup-crd rancher-charts/rancher-backup-crd -n cattle-resources-system --create-namespace --version $CHART_VERSION
helm install rancher-backup rancher-charts/rancher-backup -n cattle-resources-system --version $CHART_VERSION
```
<br/>
For an **air-gapped environment**, use the option below to pull the `backup-restore-operator` image from your private registry when installing the rancher-backup-crd helm chart.
```
--set image.repository $REGISTRY/rancher/backup-restore-operator
```

### 2. Restore from backup using a Restore custom resource

:::note Important:

Kubernetes v1.22, available as an experimental feature of v2.6.3, does not support restoring from backup files containing CRDs with the apiVersion `apiextensions.k8s.io/v1beta1`. In v1.22, the default `resourceSet` in the rancher-backup app is updated to collect only CRDs that use `apiextensions.k8s.io/v1`. There are currently two ways to work around this issue:

1. Update the default `resourceSet` to collect the CRDs with the apiVersion v1.
1. Update the default `resourceSet` and the client to use the new APIs internally, with `apiextensions.k8s.io/v1` as the replacement.

- Note that when making or restoring backups for v1.22, the Rancher version and the local cluster's Kubernetes version should be the same. The Kubernetes version should be considered when restoring a backup since the supported apiVersion in the cluster and in the backup file could be different.

:::

If you are using an S3 store as the backup source and need to use your S3 credentials for restore, create a secret in this cluster using your S3 credentials. The Secret data must have two keys - `accessKey` and `secretKey` - that contain the S3 credentials.

:::caution

The values `accessKey` and `secretKey` in the example below must be base64-encoded first when creating the object directly. If not encoded first, the pasted values will cause errors when you are attempting to backup or restore.

:::

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: s3-creds
type: Opaque
data:
  accessKey: <Enter your base64-encoded access key>
  secretKey: <Enter your base64-encoded secret key>
```

This secret can be created in any namespace; with the above example, it will get created in the default namespace.

In the Restore custom resource, `prune` must be set to false.

Create a Restore custom resource like the example below:

```yaml
# migrationResource.yaml
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-migration
spec:
  backupFilename: backup-b0450532-cee1-4aa1-a881-f5f48a007b1c-2020-09-15T07-27-09Z.tar.gz
  prune: false
  encryptionConfigSecretName: encryptionconfig
  storageLocation:
    s3:
      credentialSecretName: s3-creds
      credentialSecretNamespace: default
      bucketName: backup-test
      folder: ecm1
      region: us-west-2
      endpoint: s3.us-west-2.amazonaws.com
```

:::note Important:

The field `encryptionConfigSecretName` must be set only if your backup was created with encryption enabled. Provide the name of the Secret containing the encryption config file. If you only have the encryption config file, but don't have a secret created with it in this cluster, use the following steps to create the secret:

:::

1. The encryption configuration file must be named `encryption-provider-config.yaml`, and the `--from-file` flag must be used to create this secret. So save your `EncryptionConfiguration` in a file called `encryption-provider-config.yaml` and run this command:
```
kubectl create secret generic encryptionconfig \
  --from-file=./encryption-provider-config.yaml \
  -n cattle-resources-system
```

1. Apply the manifest, and watch for the Restore resources status:

    Apply the resource:
```
kubectl apply -f migrationResource.yaml
```

    Watch the Restore status:
```
kubectl get restore
```

    Watch the restoration logs:
```
kubectl logs -n cattle-resources-system --tail 100 -f rancher-backup-xxx-xxx
```

Once the Restore resource has the status `Completed`, you can continue the Rancher installation.

### 3. Install cert-manager

Follow the steps to [install cert-manager](../../../pages-for-subheaders/install-upgrade-on-a-kubernetes-cluster.md#5-install-cert-manager) in the documentation about installing cert-manager on Kubernetes.

### 4. Bring up Rancher with Helm

Use the same version of Helm to install Rancher, that was used on the first cluster.

```
helm install rancher rancher-latest/rancher \
  --namespace cattle-system \
  --set hostname=<same hostname as the server URL from the first Rancher server> \
```
