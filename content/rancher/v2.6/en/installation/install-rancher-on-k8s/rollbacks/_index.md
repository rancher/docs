---
title: Rollbacks
weight: 3
---

- [Rolling Back to Rancher v2.5.0+](#rolling-back-to-rancher-v2-5-0)
- [Rolling Back to Rancher v2.2-v2.4+](#rolling-back-to-rancher-v2-2-v2-4)
- [Rolling Back to Rancher v2.0-v2.1](#rolling-back-to-rancher-v2-0-v2-1)

# Rolling Back to Rancher v2.5.0+

To roll back to Rancher v2.5.0+, use the **Rancher Backups** application and restore Rancher from backup.

Rancher has to be started with the lower/previous version after a rollback.

A restore is performed by creating a Restore custom resource.

> **Important**
>
> * Follow the instructions from this page for restoring rancher on the same cluster where it was backed up from. In order to migrate rancher to a new cluster, follow the steps to [migrate rancher.]({{<baseurl>}}/rancher/v2.6/en/backups/migrating-rancher)
> * While restoring Rancher on the same setup, the Rancher deployment is manually scaled down before the restore starts, then the operator will scale it back up once the restore completes. As a result, Rancher and its UI will be unavailable until the restore is complete. While the UI is unavailable, use the original cluster kubeconfig with the restore YAML file: `kubectl create -f restore.yaml`.

### Scale the Rancher Deployment to 0

1. In the upper left corner, click **☰ > local**.
1. From the menu on the left, click **Workload**.
1. Under **Workload**, click on **Deployments**.
1. At the top, click on the dropdown to adjust the filter. Select **cattle-system** as the filter.
1. Find the row for the `rancher` deployment and click **⋮ > Edit Config**.
1. Change **Replicas** to 0.
1. Scroll to the bottom and click **Save**.

### Create the Restore Custom Resource

1. Click **☰ > Cluster Management**.
1. Go to the local cluster and click **Explore**.
1. In the left navigation bar, click **Rancher Backups > Restore**.
	* **Note:** If the Rancher Backups app is not visible, you will need to install it from the Charts page in **Apps & Marketplace**. Refer [here]({{<baseurl>}}/rancher/v2.6/en/helm-charts/#charts) for more information.
1. Click **Create**.
1. Create the Restore with the form or with YAML. For help creating the Restore resource using the online form, refer to the [configuration reference]({{<baseurl>}}/rancher/v2.6/en/backups/configuration/restore-config) and to the [examples.]({{<baseurl>}}/rancher/v2.6/en/backups/examples) 
1. To use the YAML editor, you can click **Create > Create from YAML.** Enter the Restore YAML. The following is an example Restore custom resource:

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

1. Click **Create**.

**Result:** The backup file is created and updated to the target storage location. The resources are restored in this order:

1. Custom Resource Definitions (CRDs)
2. Cluster-scoped resources
3. Namespaced resources

To check how the restore is progressing, you can check the logs of the operator. Follow these steps to get the logs:

```yaml
kubectl get pods -n cattle-resources-system
kubectl logs -n cattle-resources-system -f
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

# Rolling Back to Rancher v2.2-v2.4+

To roll back to Rancher before v2.5, follow the procedure detailed here: [Restoring Backups — Kubernetes installs]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/restore/rke-restore/) Restoring a snapshot of the Rancher server cluster will revert Rancher to the version and state at the time of the snapshot.

For information on how to roll back Rancher installed with Docker, refer to [this page.]({{<baseurl>}}/rancher/v2.6/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks)

> Managed clusters are authoritative for their state. This means restoring the rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.

# Rolling Back to Rancher v2.0-v2.1

Rolling back to Rancher v2.0-v2.1 is no longer supported. The instructions for rolling back to these versions are preserved [here]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/restore/rke-restore/v2.0-v2.1) and are intended to be used only in cases where upgrading to Rancher v2.2+ is not feasible.
