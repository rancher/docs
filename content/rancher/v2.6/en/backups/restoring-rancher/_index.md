---
title: Restoring Rancher
weight: 2
aliases:
  - /rancher/v2.x/en/installation/backups/restores
  - /rancher/v2.x/en/backups/restoring-rancher
---

A restore is performed by creating a Restore custom resource. 

> **Important**
>
> * Follow the instructions from this page for restoring rancher on the same cluster where it was backed up from. In order to migrate rancher to a new cluster, follow the steps to [migrate rancher.]({{<baseurl>}}/rancher/v2.6/en/backups/migrating-rancher)
> * While restoring rancher on the same setup, the rancher deployment is manually scaled down before the restore starts then the operator will scale it back up once restore completes. So Rancher will be unavailable during the restore.

### Scale the Rancher Deployment to 0

1. In the upper left corner, click **≡ > local**.
1. From the menu on the left, click **Workload**.
1. Under **Workload**, click on **Deployments**.
1. At the top, click on the dropdown to adjust the filter. Select **cattle-system** as the filter.
1. Find the row for the `rancher` deployment and click **⋮ > Edit Config**.
1. Change **Replicas** to 0.
1. Scroll to the bottom and click **Save**.

### Create the Restore Custom Resource

1. In the **Cluster Explorer,** go to the dropdown menu in the upper left corner and click **Rancher Backups.**
1. Click **Restore.**
1. Create the Restore with the form, or with YAML.  For creating the Restore resource using form, refer to the [configuration reference]({{<baseurl>}}/rancher/v2.6/en/backups/configuration/restore-config) and to the [examples.]({{<baseurl>}}/rancher/v2.6/en/backups/examples)
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

      For help configuring the Restore, refer to the [configuration reference]({{<baseurl>}}/rancher/v2.6/en/backups/configuration/restore-config) and to the [examples.]({{<baseurl>}}/rancher/v2.6/en/backups/examples)

1. Click **Create.**

**Result:** The rancher-operator scales the rancher deployment back up once the restore completes. The resources are restored in this order:

1. Custom Resource Definitions (CRDs)
2. Cluster-scoped resources
3. Namespaced resources

### Logs

To check how the restore is progressing, you can check the logs of the operator. Run this command to follow the logs:

```
kubectl logs -n cattle-resources-system -l app.kubernetes.io/name=rancher-backup -f
```

### Roll back to a previous Rancher version

Rancher can be rolled back using the Helm CLI. To roll back to the previous version:

```yaml
helm rollback rancher -n cattle-system
```

If the previous revision is not the intended target, you can specify a revision to roll back to. To see the deployment history:

```yaml
helm history rancher -n cattle-system
```

When the target revision is determined, perform the rollback. This example will roll back to revision `3`:

```yaml
helm rollback rancher 3 -n cattle-system
```

### Cleanup

If you created the restore resource with kubectl, remove the resource to prevent a naming conflict with future restores.
