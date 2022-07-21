---
title: Backup Storage Location Configuration
shortTitle: Storage
weight: 3
---

Configure a storage location where all backups are saved by default. You will have the option to override this with each backup, but will be limited to using an S3-compatible object store.

Only one storage location can be configured at the operator level.

- [Storage Location Configuration](#storage-location-configuration)
  - [No Default Storage Location](#no-default-storage-location)
  - [S3-compatible Object Store](#s3-compatible-object-store)
  - [Use an existing StorageClass](#existing-storageclass)
  - [Use an existing PersistentVolume](#existing-persistent-volume)
- [Encryption](#encryption)
- [Example values.yaml for the rancher-backup Helm Chart](#example-values-yaml-for-the-rancher-backup-helm-chart)

# Storage Location Configuration

### No Default Storage Location

You can choose to not have any operator-level storage location configured. If you select this option, you must configure an S3-compatible object store as the storage location for each individual backup.

### S3-compatible Object Store

| Parameter | Description |
| -------------- | -------------- |
| Credential Secret | Choose the credentials for S3 from your secrets in Rancher. [Example](examples.md#example-credential-secret-for-storing-backups-in-s3). |
| Bucket Name | Enter the name of the [S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) where the backups will be stored. Default: `rancherbackups`. |
| Region | The [AWS region](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) where the S3 bucket is located. |
| Folder | The [folder in the S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/using-folders.html) where the backups will be stored. |
| Endpoint | The [S3 endpoint](https://docs.aws.amazon.com/general/latest/gr/s3.html) For example, `s3.us-west-2.amazonaws.com`. |
| Endpoint CA | The CA cert used to for the S3 endpoint. Default: base64 encoded CA cert |
| insecureTLSSkipVerify | Set to true if you are not using TLS. |

### Existing StorageClass

Installing the `rancher-backup` chart by selecting the StorageClass option will create a Persistent Volume Claim (PVC), and Kubernetes will in turn dynamically provision a Persistent Volume (PV) where all the backups will be saved by default.

For information about creating storage classes refer to [this section.](../../how-to-guides/advanced-user-guides/manage-clusters/create-kubernetes-persistent-storage/manage-persistent-storage/dynamically-provision-new-storage.md)

::: note Important:

It is highly recommended to use a StorageClass with a reclaim policy of "Retain". Otherwise if the PVC created by the `rancher-backup` chart gets deleted (either during app upgrade, or accidentally), the PV will get deleted too, which means all backups saved in it will get deleted.  
If no such StorageClass is available, after the PV is provisioned, make sure to edit its reclaim policy and set it to "Retain" before storing backups in it.

:::

### Existing Persistent Volume

Select an existing Persistent Volume (PV) that will be used to store your backups. For information about creating PersistentVolumes in Rancher, refer to [this section.](../../how-to-guides/advanced-user-guides/manage-clusters/create-kubernetes-persistent-storage/manage-persistent-storage/set-up-existing-storage.md#2-add-a-persistent-volume-that-refers-to-the-persistent-storage)

:::note Important:

It is highly recommended to use a Persistent Volume with a reclaim policy of "Retain". Otherwise if the PVC created by the `rancher-backup` chart gets deleted (either during app upgrade, or accidentally), the PV will get deleted too, which means all backups saved in it will get deleted.  

:::

# Example values.yaml for the rancher-backup Helm Chart

The documented `values.yaml` file that can be used to configure `rancher-backup` operator when the Helm CLI is used can be found in the [backup-restore-operator repository.](https://github.com/rancher/backup-restore-operator/blob/master/charts/rancher-backup/values.yaml)

For more information about `values.yaml` files and configuring Helm charts during installation, refer to the [Helm documentation.](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing)

