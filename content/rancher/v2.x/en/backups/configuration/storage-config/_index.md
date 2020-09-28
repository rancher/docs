---
title: Backup Storage Location Configuration
shortTitle: Storage
weight: 3
---

Configure a storage location where all backups are saved by default. You will have the option to override this with each backup, but will be limited to using an S3-compatible object store.

The storage location is configured at the operator level. Therefore, it must be configured when the `rancher-backup` operator is installed or upgraded.

Only one storage location can be configured for each backup.

- [Storage Location Configuration](#storage-location-configuration)
  - [No Default Storage Location](#no-default-storage-location)
  - [Use the Default Storage Class (gp2)](#use-the-default-storage-class-gp2)
  - [S3-compatible Object Store](#s3-compatible-object-store)
  - [Existing StorageClass](#existing-storageclass)
  - [Existing PersistentVolume](#existing-persistentvolume)
- [Encryption](#encryption)
- [Example values.yaml for the rancher-backup Helm Chart](#example-values-yaml-for-the-rancher-backup-helm-chart)

# Storage Location Configuration

### No Default Storage Location

This option is the default.

### Use the Default Storage Class (gp2)

If this option is selected, the cluster's [default StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/) will be used to store the backups.

### S3-compatible Object Store

| Parameter | Description |
| -------------- | -------------- |
| Credential Secret | Choose the credentials for S3 from your secrets in Rancher. |
| Bucket Name | Enter the name of the [S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html) where the backups will be stored. Default: `rancherbackups`. |
| Region | The [AWS region](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) where the S3 bucket is located. |
| Folder | The [folder in the S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/using-folders.html) where the backups will be stored. |
| Endpoint | The [S3 endpoint](https://docs.aws.amazon.com/general/latest/gr/s3.html) For example, `s3.us-west-2.amazonaws.com`. |
| Endpoint CA | The CA cert used to for the S3 endpoint. Default: base64 encoded CA cert |

### Existing StorageClass

Configure an existing storage class that will be used to store your backups. For information about creating storage classes in refer to [this section.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/provisioning-new-storage/#1-add-a-storage-class-and-configure-it-to-use-your-storage-provider)

If a StorageClass is selected, a new PersistentVolumeClaim will be created on the same host on which the `rancher-backup` operator pod is running. This will in turn create a new PersistentVolume due to dynamic provisioning.

### Existing PersistentVolume

Configure an existing PersistentVolume that will be used to store your backups. For information about creating PersistentVolumes in Rancher, refer to [this section.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/attaching-existing-storage/#2-add-a-persistent-volume-that-refers-to-the-persistent-storage)

# Encryption

Resources can be encrypted before they are saved in a backup file.

The `rancher-backup` operator uses the same process to encrypt the backups as is described in the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/) for encrypting data at rest.Encryption details are provided in an EncryptionConfiguration YAML file.

You can use any EncryptionConfiguration YAML, including one that is already used in your Kubernetes cluster.

In order for `rancher-backup` operator to use the EncryptionConfiguration, the file must be named `encryption-provider-config.yaml`.

> **Important:** The `rancher-backup` operator doesn't save the EncryptionConfiguration file. The contents of the EncryptionConfiguration file must be saved when a backup is created, and the same file must be used when restoring from this backup.

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