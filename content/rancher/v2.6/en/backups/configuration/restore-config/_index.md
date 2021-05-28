---
title: Restore Configuration
shortTitle: Restore
weight: 2
aliases:
  - /rancher/v2.5/en/backups/v2.5/configuration/restore-config
---

The Restore Create page lets you provide details of the backup to restore from

{{< img "/img/rancher/backup_restore/restore/restore.png" "">}}

- [Backup Source](#backup-source)
	- [An Existing Backup Config](#an-existing-backup-config)
	- [The default storage target](#the-default-storage-target)
	- [An S3-compatible object store](#an-s3-compatible-object-store)
- [Encryption](#encryption)
- [Prune during restore](#prune-during-restore)
- [Getting the Backup Filename from S3](#getting-the-backup-filename-from-s3)

# Backup Source
Provide details of the backup file and its storage location, which the operator will then use to perform the restore. Select from the following options to provide these details




### An existing backup config

Selecting this option will populate the **Target Backup** dropdown with the Backups available in this cluster. Select the Backup from the dropdown, and that will fill out the **Backup Filename** field for you, and will also pass the backup source information from the selected Backup to the operator.

{{< img "/img/rancher/backup_restore/restore/existing.png" "">}}

If the Backup custom resource does not exist in the cluster, you need to get the exact filename and provide the backup source details with the default storage target or an S3-compatible object store.


### The default storage target

Select this option if you are restoring from a backup file that exists in the default storage location configured at the operator-level. The operator-level configuration is the storage location that was configured when the `rancher-backup` operator was installed or upgraded. Provide the exact filename in the **Backup Filename** field.

{{< img "/img/rancher/backup_restore/restore/default.png" "">}}

### An S3-compatible object store

Select this option if no default storage location is configured at the operator-level, OR if the backup file exists in a different S3 bucket than the one configured as the default storage location. Provide the exact filename in the **Backup Filename** field. Refer to [this section](#getting-the-backup-filename-from-s3) for exact steps on getting the backup filename from s3. Fill in all the details for the S3 compatible object store. Its fields are exactly same as ones for the `backup.StorageLocation` configuration in the [Backup custom resource.](../../configuration/backup-config/#storage-location)

{{< img "/img/rancher/backup_restore/restore/s3store.png" "">}} 

# Encryption

If the backup was created with encryption enabled, its file will have `.enc` suffix. Choosing such a Backup, or providing a backup filename with `.enc` suffix will display another dropdown named **Encryption Config Secret**.

{{< img "/img/rancher/backup_restore/restore/encryption.png" "">}} 

The Secret selected from this dropdown must have the same contents as the one used for the Backup custom resource while performing the backup. If the encryption configuration doesn't match, the restore will fail

The `Encryption Config Secret` dropdown will filter out and list only those Secrets that have this exact key

| YAML Directive Name | Description |
| ---------------- | ---------------- |
| `encryptionConfigSecretName` |  Provide the name of the Secret from `cattle-resources-system` namespace, that contains the encryption config file.  |

> **Important**
This field should only be set if the backup was created with encryption enabled. Providing the incorrect encryption config will cause the restore to fail.

# Prune During Restore

* **Prune**:  In order to fully restore Rancher from a backup, and to go back to the exact state it was at when the backup was performed, we need to delete any additional resources that were created by Rancher after the backup was taken. The operator does so if the **Prune** flag is enabled. Prune is enabled by default and it is recommended to keep it enabled.
* **Delete Timeout**: This is the amount of time the operator will wait while deleting a resource before editing the resource to remove finalizers and attempt deletion again.

| YAML Directive Name | Description |
| ---------------- | ---------------- |
| `prune` |  Delete the resources managed by Rancher that are not present in the backup (Recommended).  |
| `deleteTimeoutSeconds` |  Amount of time the operator will wait while deleting a resource before editing the resource to remove finalizers and attempt deletion again.  |

# Getting the Backup Filename from S3

This is the name of the backup file that the `rancher-backup` operator will use to perform the restore.

To obtain this file name from S3, go to your S3 bucket (and folder if it was specified while performing backup).

Copy the filename and store it in your Restore custom resource. So assuming the name of your backup file is `backupfile`,

- If your bucket name is `s3bucket` and no folder was specified, then the `backupFilename` to use will be `backupfile`.
- If your bucket name is `s3bucket` and the base folder is`s3folder`, the `backupFilename` to use is only `backupfile` .
- If there is a subfolder inside `s3Folder` called `s3sub`, and that has your backup file, then the `backupFilename` to use is `s3sub/backupfile`.

| YAML Directive Name | Description |
| ---------------- | ---------------- |
| `backupFilename` |  This is the name of the backup file that the `rancher-backup` operator will use to perform the restore.  |
