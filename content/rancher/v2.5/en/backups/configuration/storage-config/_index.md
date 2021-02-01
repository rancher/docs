---
title: Backup Storage Location Configuration
shortTitle: Storage
weight: 3
aliases:
  - /rancher/v2.5/en/backups/v2.5/configuration/storage-config
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
| Credential Secret | Choose the credentials for S3 from your secrets in Rancher. [Example]({{<baseurl>}}/rancher/v2.5/en/backups/v2.5/examples/#example-credential-secret-for-storing-backups-in-s3). |
| Bucket Name | Enter the name of the [S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) where the backups will be stored. Default: `rancherbackups`. |
| Region | The [AWS region](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) where the S3 bucket is located. |
| Folder | The [folder in the S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/using-folders.html) where the backups will be stored. |
| Endpoint | The [S3 endpoint](https://docs.aws.amazon.com/general/latest/gr/s3.html) For example, `s3.us-west-2.amazonaws.com`. |
| Endpoint CA | The CA cert used to for the S3 endpoint. Default: base64 encoded CA cert |
| insecureTLSSkipVerify | Set to true if you are not using TLS. |

### Existing StorageClass

Installing the `rancher-backup` chart by selecting the StorageClass option will create a Persistent Volume Claim (PVC), and Kubernetes will in turn dynamically provision a Persistent Volume (PV) where all the backups will be saved by default.

For information about creating storage classes refer to [this section.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/volumes-and-storage/provisioning-new-storage/)

> **Important**
It is highly recommended to use a StorageClass with a reclaim policy of "Retain". Otherwise if the PVC created by the `rancher-backup` chart gets deleted (either during app upgrade, or accidentally), the PV will get deleted too, which means all backups saved in it will get deleted.  
If no such StorageClass is available, after the PV is provisioned, make sure to edit its reclaim policy and set it to "Retain" before storing backups in it.

### Existing Persistent Volume

Select an existing Persistent Volume (PV) that will be used to store your backups. For information about creating PersistentVolumes in Rancher, refer to [this section.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/volumes-and-storage/attaching-existing-storage/#2-add-a-persistent-volume-that-refers-to-the-persistent-storage)

> **Important**
It is highly recommended to use a Persistent Volume with a reclaim policy of "Retain". Otherwise if the PVC created by the `rancher-backup` chart gets deleted (either during app upgrade, or accidentally), the PV will get deleted too, which means all backups saved in it will get deleted.  


# Example values.yaml for the rancher-backup Helm Chart


This values.yaml file can be used to configure `rancher-backup` operator when the Helm CLI is used to install it.

For more information about `values.yaml` files and configuring Helm charts during installation, refer to the [Helm documentation.](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing)

```yaml
image:
  repository: rancher/rancher-backup
  tag: v0.0.1-rc10

## Default s3 bucket for storing all backup files created by the rancher-backup operator
s3:
  enabled: false
  ## credentialSecretName if set, should be the name of the Secret containing AWS credentials.
  ## To use IAM Role, don't set this field
  credentialSecretName: creds 
  credentialSecretNamespace: ""
  region: us-west-2
  bucketName: rancherbackups
  folder: base folder
  endpoint: s3.us-west-2.amazonaws.com
  endpointCA: base64 encoded CA cert
  # insecureTLSSkipVerify: optional

## ref: http://kubernetes.io/docs/user-guide/persistent-volumes/
## If persistence is enabled, operator will create a PVC with mountPath /var/lib/backups
persistence: 
  enabled: false

  ## If defined, storageClassName: <storageClass>
  ## If set to "-", storageClassName: "", which disables dynamic provisioning
  ## If undefined (the default) or set to null, no storageClassName spec is
  ##   set, choosing the default provisioner.  (gp2 on AWS, standard on
  ##   GKE, AWS & OpenStack). 
  ## Refer to https://kubernetes.io/docs/concepts/storage/persistent-volumes/#class-1
  ##
  storageClass: "-"

  ## If you want to disable dynamic provisioning by setting storageClass to "-" above, 
  ## and want to target a particular PV, provide name of the target volume 
  volumeName: ""

  ## Only certain StorageClasses allow resizing PVs; Refer to https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/
  size: 2Gi


global:
  cattle:
    systemDefaultRegistry: ""

nodeSelector: {}

tolerations: []

affinity: {}
```
