---
title: Restore Configuration
shortTitle: Restore
weight: 2
---

The OpenAPI schema for the Restore custom resource definition is [here.](https://github.com/rancher/rancher-backup/blob/master/crds/restore.yaml)

The Restore custom resource accepts the following fields:

- [BackupFilename]
- [EncryptionConfigName]

### BackupFilename

This is the name of the backup file that the `rancher-backup` operator will use to perform the restore.

This field is required.

To obtain this file name from S3, go to your S3 bucket (and folder if it was specified while performing backup).

Copy the filename and store it in your Restore custom resource. So for instance,

- If your bucket name is `s3bucket` and no folder was specified, the `backupFilename` to use will be the `Key` value from S3.
- If your bucket name is `s3bucket` and the base folder is`s3folder`, the `Key` will be `s3Folder/backupfile`, so the `backupFilename` to use is only `backupfile` . 
- If there is a subfolder inside `s3Folder` called `s3sub`, and that has your backup file named `backupfileSub`, then the `backupFilename` to use is `s3sub/backupfileSub`.

### EncryptionConfigName

This is encryption configuration secret. It must be the same secret as the one used for the Backup custom resource while performing the backup. If the encryption configuration doesn't match, the restore will fail.

This field is optional.

### StorageLocation

This field is optional.

Its fields are exactly same as ones for the `backup.StorageLocation` configuration in the [Backup custom resource.](../../backup-config/storagelocation)

If the StorageLocation is specified, the operator will retrieve the backup location from that particular S3 bucket. If not specified, operator will try to find this file in the operator-level S3 store, and in the operator-level PVC store.

The operator-level configuration is the storage location that was configured when the `rancher-backup` operator was installed or upgraded.