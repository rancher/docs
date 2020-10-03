---
title: Restoring Rancher
weight: 2
---

A restore is performed by creating a Restore custom resource. 

> **Important**
* Follow the instructions from this page for restoring rancher on the same cluster where it was backed up from. In order to migrate rancher to a new cluster, follow the steps to [migrate rancher.](../migrating-rancher)  
* While restoring rancher on the same setup, the operator will scale down the rancher deployment when restore starts, and it will scale back up the deployment once restore completes. So Rancher will be unavailable during the restore.

### 1. Create the Restore Custom Resource

1. In the **Cluster Explorer,** go to the dropdown menu in the upper left corner and click **Rancher Backups.**
1. Click **Restore.**
1. Create the Restore with the form, or with YAML.  For creating the Restore resource using form, refer to the [configuration reference](../configuration/restore-config) and to the [examples.](../examples/#restore)
1. For using the YAML editor, we can click **Create > Create from YAML.** Enter the Restore YAML.

    ```yaml
    apiVersion: resources.cattle.io/v1
	kind: Restore
	metadata:
	  name: restore-migration
	spec:
	  backupFilename: backup-b0450532-cee1-4aa1-a881-f5f48a007b1c-2020-09-15T07-27-09Z.tar.gz
	  encryptionConfigSecretName: encryptionconfig
	  storageLocation:
	    s3:
	      credentialSecretName: s3-creds
	      credentialSecretNamespace: default
	      bucketName: rancher-backups
	      folder: rancher
	      region: us-west-2
	      endpoint: s3.us-west-2.amazonaws.com
      ```

      For help configuring the Restore, refer to the [configuration reference](../configuration/restore-config) and to the [examples.](../examples/#restore)

1. Click **Create.**

**Result:** The rancher-operator scales down the rancher deployment during restore. Once the restore completes, the operator scales back up the rancher deployment. So rancher will be unavailable for the duration of restore. To check how the restore is progressing, you can check the logs of the operator. Follow these steps to get the logs:

```yaml
kubectl get pods -n cattle-resources-system
kubectl logs <pod name from above command> -n cattle-resources-system -f
```