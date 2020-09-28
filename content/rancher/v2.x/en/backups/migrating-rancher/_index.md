---
title: Migrating Rancher to a New Cluster
weight: 3
---

If you are migrating Rancher to a new Kubernetes cluster, you don't need to install Rancher on the new cluster first. If Rancher is restored to a new cluster with Rancher already installed, it can cause problems with [permissions](https://github.com/rancher/rancher-backup/issues/24) and [namespaces.](https://github.com/rancher/rancher-backup/issues/6)

### Prerequisites

These instructions assume you have [created a backup](../back-up-rancher) and you have already installed a new Kubernetes cluster where Rancher will be deployed.

Rancher can be installed on any Kubernetes cluster, including hosted Kubernetes clusters such as Amazon EKS clusters. For help installing Kubernetes, refer to the documentation of the Kubernetes distribution. One of Rancher's Kubernetes distributions may also be used:

- [RKE Kubernetes installation docs]({{<baseurl>}}/rke/latest/en/installation/)
- [K3s Kubernetes installation docs]({{<baseurl>}}/k3s/latest/en/installation/)

### 1. Install the rancher-backup Helm chart
```
helm repo add rancherchart https://charts.rancher.io
helm repo update
helm install rancher-backup-crd rancherchart/rancher-backup-crd -n cattle-resources-system --create-namespace
helm install rancher-backup rancherchart/rancher-backup -n cattle-resources-system
```

### 2. Restore from backup using a Restore custom resource

In the Restore custom resource, `prune` must be set to false. 

Create a Restore custom resource like the example below:

```yaml
# migrationResource.yaml
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-migration
spec:
  backupFilename: b-eks-2-b0450532-cee1-4aa1-a881-f5f48a007b1c-2020-09-15T07#27#09Z.tar.gz
  prune: false
  storageLocation:
    s3:
      credentialSecretName: s3-creds
      credentialSecretNamespace: default
      bucketName: backup-test
      folder: ecm1
      region: us-west-2
      endpoint: s3.us-west-2.amazonaws.com
```

Then apply the resource:

```
kubectl apply -f migrationResource.yaml 
```

### 3. Install cert-manager

Follow the steps to [install cert-manager]({{<baseurl>}}/rancher/v2.x/en/installation/install-rancher-on-k8s/install/#5-install-cert-manager) in the documentation about installing cert-manager on Kubernetes.

### 4. Bring up Rancher with Helm

```
helm upgrade rancher rancher-alpha/rancher \
  --version 2.5.0-alpha1 \
  --namespace cattle-system \
  --set hostname=<same hostname as first Rancher server> \
  --set rancherImageTag=master-head
```