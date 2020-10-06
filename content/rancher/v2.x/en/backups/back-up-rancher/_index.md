---
title: Backing up Rancher
weight: 1
---

In this section, you'll learn how to back up Rancher running on any Kubernetes cluster. To backup Rancher installed with Docker, refer the instructions for [single node backups](../legacy/backup/single-node-backups/)

### Prerequisites

Rancher version must be v2.5.0 and up

### 1. Install the `rancher-backup` operator

The backup storage location is an operator-level setting, so it needs to be configured when `rancher-backup` is installed or upgraded.

Backups are created as .tar.gz files. These files can be pushed to S3 or Minio, or they can be stored in a persistent volume.

1. In the Rancher UI, go to the **Cluster Explorer.**
1. Click **Apps.**
1. Click `rancher-backup`.
1. Configure the default storage location. For help, refer to the [storage configuration section.](../configuration/storage-config)

### 2. Perform a Backup

To perform a backup, a custom resource of type Backup must be created.

1. In the **Cluster Explorer,** go to the dropdown menu in the upper left corner and click **Rancher Backups.**
1. Click **Backup.**
1. Create the Backup with the form, or with YAML editor.
1. For configuring the Backup details using the form, click **Create** and refer to the [configuration reference](../configuration/backup-config) and to the [examples.](../examples/#backup)
1. For using the YAML editor, we can click **Create > Create from YAML.** Enter the Backup YAML. This example Backup custom resource would create encrypted recurring backups in S3:

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
1. Click **Create.**

**Result:** The backup file is created in the storage location configured in the Backup custom resource. The name of this file is used when performing a restore.

