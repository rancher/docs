---
title: Rollbacks
weight: 3
aliases:
  - /rancher/v2.x/en/upgrades/rollbacks
  - /rancher/v2.x/en/installation/upgrades-rollbacks/rollbacks
  - /rancher/v2.x/en/upgrades/ha-server-rollbacks
  - /rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks
  - /rancher/v2.x/en/installation/upgrades-rollbacks/rollbacks/ha-server-rollbacks
  - /rancher/v2.x/en/installation/install-rancher-on-k8s/upgrades-rollbacks/rollbacks
---

- [Rolling Back to Rancher v2.5.0+](#rolling-back-to-rancher-v2-5-0)
- [Rolling Back to Rancher v2.2-v2.4+](#rolling-back-to-rancher-v2-2-v2-4)
- [Rolling Back to Rancher v2.0-v2.1](#rolling-back-to-rancher-v2-0-v2-1)

# Rolling Back to Rancher v2.5.0+

To roll back to Rancher v2.5.0+, use the `rancher-backup` application and restore Rancher from backup.

Rancher has to be started with the lower/previous version after a rollback.

A restore is performed by creating a Restore custom resource.

> **Important**
>
> * Follow the instructions from this page for restoring rancher on the same cluster where it was backed up from. In order to migrate rancher to a new cluster, follow the steps to [migrate rancher.]({{<baseurl>}}/rancher/v2.5/en/backups/migrating-rancher)
> * While restoring rancher on the same setup, the operator will scale down the rancher deployment when restore starts, and it will scale back up the deployment once restore completes. So Rancher will be unavailable during the restore.

### Create the Restore Custom Resource

1. In the **Cluster Explorer,** go to the dropdown menu in the upper left corner and click **Rancher Backups.**
1. Click **Restore.**
1. Create the Restore with the form, or with YAML.  For creating the Restore resource using form, refer to the  [configuration reference]({{<baseurl>}}/rancher/v2.5/en/backups/configuration/restore-config) and to the [examples.]({{<baseurl>}}/rancher/v2.5/en/backups/examples)
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

      For help configuring the Restore, refer to the [configuration reference]({{<baseurl>}}/rancher/v2.5/en/backups/v2.5/configuration/restore-config/) and to the [examples.]({{<baseurl>}}/rancher/v2.5/en/backups/v2.5/examples/)

1. Click **Create.**

**Result:** The rancher-operator scales down the rancher deployment during restore, and scales it back up once the restore completes. The resources are restored in this order:

1. Custom Resource Definitions (CRDs)
2. Cluster-scoped resources
3. Namespaced resources

To check how the restore is progressing, you can check the logs of the operator. Follow these steps to get the logs:

```yaml
kubectl get pods -n cattle-resources-system
kubectl logs -n cattle-resources-system -f
```

### Roll back to the previous Rancher version

Rancher can be rolled back using the Rancher UI.

1. In the Rancher UI, go to the local cluster. 
1. Go to the System project.
1. Edit Rancher deployment and modify image to version that you are rolling back to.
1. Save changes made.

# Rolling Back to Rancher v2.2-v2.4+

To roll back to Rancher before v2.5, follow the procedure detailed here: [Restoring Backups — Kubernetes installs]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/restore/rke-restore/) Restoring a snapshot of the Rancher server cluster will revert Rancher to the version and state at the time of the snapshot.

For information on how to roll back Rancher installed with Docker, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks)

> Managed clusters are authoritative for their state. This means restoring the rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.

# Rolling Back to Rancher v2.0-v2.1

Rolling back to Rancher v2.0-v2.1 is no longer supported. The instructions for rolling back to these versions are preserved [here]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/restore/rke-restore/v2.0-v2.1) and are intended to be used only in cases where upgrading to Rancher v2.2+ is not feasible.