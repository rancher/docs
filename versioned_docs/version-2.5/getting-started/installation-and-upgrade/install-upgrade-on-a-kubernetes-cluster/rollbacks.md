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
  - /rancher/v2.x/en/installation/install-rancher-on-k8s/rollbacks/
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
> * Follow the instructions from this page for restoring rancher on the same cluster where it was backed up from. In order to migrate rancher to a new cluster, follow the steps to [migrate rancher.](../../../how-to-guides/new-user-guides/backup-restore-and-disaster-recovery/migrate-rancher-to-new-cluster.md)
> * While restoring Rancher on the same setup, the Rancher deployment is manually scaled down before the restore starts, then the operator will scale it back up once the restore completes. As a result, Rancher and its UI will be unavailable until the restore is complete. While the UI is unavailable, use the original cluster kubeconfig with the restore YAML file: `kubectl create -f restore.yaml`.

### Scale the Rancher Deployment to 0

1. From the **Global** view, hover over the **local** cluster.
1. Under **Projects in local**, click on **System**.
1. From the **cattle-system** namespace section, find the `rancher` deployment.
1. Select **&#8942; > Edit**.
1. Change **Scalable deployment of _ pods** to `0`.
1. Scroll to the bottom and click **Save**.

### Create the Restore Custom Resource

1. In the **Cluster Explorer,** go to the dropdown menu in the upper left corner and click **Rancher Backups.**
	* **Note:** If the Rancher Backups app is not visible in the dropdown, you will need to install it from the Charts page in **Apps & Marketplace**. Refer [here](../../../pages-for-subheaders/helm-charts-in-rancher.md#charts) for more information.
1. Click **Restore.**
1. Create the Restore with the form or with YAML. For help creating the Restore resource using the online form, refer to the [configuration reference](../../../reference-guides/backup-restore-configuration/restore-configuration.md) and to the [examples.](../../../reference-guides/backup-restore-configuration/examples.md)
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
	For help configuring the Restore, refer to the [configuration reference](../../../reference-guides/backup-restore-configuration/restore-configuration.md) and to the [examples.](../../../reference-guides/backup-restore-configuration/examples.md)

1. Click **Create.**

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

For information on how to roll back Rancher installed with Docker, refer to [this page.](../other-installation-methods/rancher-on-a-single-node-with-docker/roll-back-docker-installed-rancher.md)

> Managed clusters are authoritative for their state. This means restoring the rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.

# Rolling Back to Rancher v2.0-v2.1

Rolling back to Rancher v2.0-v2.1 is no longer supported. The instructions for rolling back to these versions are preserved [here]({{<baseurl>}}/rancher/v2.0-v2.4/en/backups/restore/rke-restore/v2.0-v2.1) and are intended to be used only in cases where upgrading to Rancher v2.2+ is not feasible.
