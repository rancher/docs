---
title: Restoring Rancher
weight: 2
---

A restore is performed by creating a Restore custom resource.

### 1. Create the Restore Custom Resource

1. In the **Cluster Explorer,** go to the dropdown menu in the upper left corner and click **Rancher Backups.**
1. Click **Restore.**
1. Create the Restore with the form, or with YAML. For this example, we can use **Create > Create from YAML.**

Create a Restore custom resource such as the following. 

The `prune` directive needs to be set to false so that the secret associated with the operator's service account will not get deleted.

Replace the `backupFilename` and `storageLocation` with your own information.

```yaml
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

**Result:** Helm 3 stores the chart release as a Kubernetes [Secret.](https://kubernetes.io/docs/concepts/configuration/secret/) When the restore is performed, the Rancher chart release in the backup is created in the cluster where the restore is performed. Now Rancher does not need to be reinstalled. It just needs to be upgraded.

### 2. Install cert-manager

Follow the steps to [install cert-manager]({{<baseurl>}}/rancher/v2.x/en/installation/install-rancher-on-k8s/install/#5-install-cert-manager) in the documentation about installing cert-manager on Kubernetes.

### 3. Upgrade the Rancher Release

If Rancher was scaled down when the backup was created, you can set the size of the deployment through the `helm upgrade` command.

```
helm upgrade rancher rancher-alpha/rancher \
  --version 2.5.0-alpha1 \
  --namespace cattle-system \
  -set hostname=<same hostname as first rancher server> \
  --set rancherImageTag=master-head
```

For more information about Rancher image tags, see [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/resources/choosing-version/)

**Result:** Rancher is restored.