---
title: Migrating Rancher to a New Cluster
weight: 3
---

If you are migrating Rancher to a new Kubernetes cluster, you don't need to install Rancher on the new cluster first. If Rancher is restored to a new cluster with Rancher already installed, it can cause problems.

### Prerequisites

These instructions assume you have [created a backup](../back-up-rancher) and you have already installed a new Kubernetes cluster where Rancher will be deployed.

It is required to use the same hostname that was set as the server URL in the first cluster.

Rancher version must be v2.5.0 and up

Rancher can be installed on any Kubernetes cluster, including hosted Kubernetes clusters such as Amazon EKS clusters. For help installing Kubernetes, refer to the documentation of the Kubernetes distribution. One of Rancher's Kubernetes distributions may also be used:

- [RKE Kubernetes installation docs]({{<baseurl>}}/rke/latest/en/installation/)
- [K3s Kubernetes installation docs]({{<baseurl>}}/k3s/latest/en/installation/)

### 1. Install the rancher-backup Helm chart
```
helm repo add rancher-charts https://charts.rancher.io
helm repo update
helm install rancher-backup-crd rancher-charts/rancher-backup-crd -n cattle-resources-system --create-namespace
helm install rancher-backup rancher-charts/rancher-backup -n cattle-resources-system
```

### 2. Restore from backup using a Restore custom resource

If you are using an S3 store as the backup source, and need to use your S3 credentials for restore, create a secret in this cluster using your S3 credentials. The Secret data must have two keys, `accessKey` and `secretKey` containing the s3 credentials like this:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: s3-creds
type: Opaque
stringData:
  accessKey: <Enter your access key>
  secretKey: <Enter your secret key>
```

This secret can be created in any namespace, with the above example it will get created in the default namespace

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

> **Important:** The field `encryptionConfigSecretName` must be set only if your backup was created with encryption enabled. Provide the name of the Secret containing the encryption config file. If you only have the encryption config file, but don't have a secret created with it in this cluster, use the following steps to create the secret:  
1. The encryption configuration file must be named `encryption-provider-config.yaml`, and the `--from-file` flag must be used to create this secret. So save your `EncryptionConfiguration` in a file called `encryption-provider-config.yaml` and run this command:

```
kubectl create secret generic encryptionconfig \
  --from-file=./encryption-provider-config.yaml \
  -n cattle-resources-system
```

Then apply the resource:

```
kubectl apply -f migrationResource.yaml 
```

### 3. Install cert-manager

Follow the steps to [install cert-manager]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/#5-install-cert-manager) in the documentation about installing cert-manager on Kubernetes.

### 4. Bring up Rancher with Helm

Use the same version of Helm to install Rancher, that was used on the first cluster.

```
helm install rancher rancher-latest/rancher \
  --namespace cattle-system \
  --set hostname=<same hostname as the server URL from the first Rancher server> \
```
