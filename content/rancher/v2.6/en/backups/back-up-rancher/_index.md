---
title: Backing up Rancher
weight: 1
---

In this section, you'll learn how to back up Rancher running on any Kubernetes cluster. To backup Rancher installed with Docker, refer the instructions for [single node backups]({{<baseurl>}}/rancher/v2.6/en/backups/docker-installs/docker-backups)

The backup-restore operator needs to be installed in the local cluster, and only backs up the Rancher app. The backup and restore operations are performed only in the local Kubernetes cluster. 

Note that the rancher-backup operator version 2.x.x is for Rancher v2.6.x.

> When restoring a backup into a new Rancher setup, the version of the new setup should be the same as the one where the backup is made. The Kubernetes version should also be considered when restoring a backup, since the supported apiVersion in the cluster and in the backup file could be different.

### Prerequisites

The Rancher version must be v2.5.0 and up.

Refer [here]({{<baseurl>}}/rancher/v2.6/en/backups/migrating-rancher/#2-restore-from-backup-using-a-restore-custom-resource) for help on restoring an existing backup file into a v1.22 cluster in Rancher v2.6.3.

### 1. Install the Rancher Backups operator

The backup storage location is an operator-level setting, so it needs to be configured when the Rancher Backups application is installed or upgraded.

Backups are created as .tar.gz files. These files can be pushed to S3 or Minio, or they can be stored in a persistent volume.

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the `local` cluster and click **Explore**. The `local` cluster runs the Rancher server.
1. Click **Apps & Marketplace > Charts**.
1. Click **Rancher Backups**.
1. Click **Install**.
1. Configure the default storage location. For help, refer to the [storage configuration section.](../configuration/storage-config)
1. Click **Install**.

>**NOTE:** There is a known issue in Fleet that occurs after performing a restoration using the backup-restore-operator: Secrets used for clientSecretName and helmSecretName are not included in Fleet gitrepos. Refer [here]({{<baseurl>}}rancher/v2.6/en/deploy-across-clusters/fleet/#troubleshooting) for a workaround.

### 2. Perform a Backup

To perform a backup, a custom resource of type Backup must be created.

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the `local` cluster and click **Explore**.
1. In the left navigation bar, click **Rancher Backups > Backups**.
1. Click **Create**.
1. Create the Backup with the form, or with the YAML editor.
1. For configuring the Backup details using the form, click **Create** and refer to the [configuration reference](../configuration/backup-config) and to the [examples.](../examples/#backup)
1. For using the YAML editor, we can click **Create > Create from YAML**. Enter the Backup YAML. This example Backup custom resource would create encrypted recurring backups in S3. The app uses the `credentialSecretNamespace` value to determine where to look for the S3 backup secret:

    ```yaml
    apiVersion: resources.cattle.io/v1
    kind: Backup
    metadata:
      name: s3-recurring-backup
    spec:
      storageLocation:
        s3:
          credentialSecretName: s3-creds
          credentialSecretNamespace: default
          bucketName: rancher-backups
          folder: rancher
          region: us-west-2
          endpoint: s3.us-west-2.amazonaws.com
      resourceSetName: rancher-resource-set
      encryptionConfigSecretName: encryptionconfig
      schedule: "@every 1h"
      retentionCount: 10
      ```

    > **Note:** When creating the Backup resource using YAML editor, the `resourceSetName` must be set to `rancher-resource-set`

    For help configuring the Backup, refer to the [configuration reference](../configuration/backup-config) and to the [examples.](../examples/#backup)    

    > **Important:** The `rancher-backup` operator doesn't save the EncryptionConfiguration file. The contents of the EncryptionConfiguration file must be saved when an encrypted backup is created, and the same file must be used when restoring from this backup.
1. Click **Create**.

**Result:** The backup file is created in the storage location configured in the Backup custom resource. The name of this file is used when performing a restore.

