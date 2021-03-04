---
title: Examples
weight: 5
aliases:
  - /rancher/v2.5/en/backups/v2.5/examples
---

This section contains examples of Backup and Restore custom resources.

The default backup storage location is configured when the `rancher-backup` operator is installed or upgraded.

Encrypted backups can only be restored if the Restore custom resource uses the same encryption configuration secret that was used to create the backup.

- [Backup](#backup)
  - [Backup in the default location with encryption](#backup-in-the-default-location-with-encryption)
  - [Recurring backup in the default location](#recurring-backup-in-the-default-location)
  - [Encrypted recurring backup in the default location](#encrypted-recurring-backup-in-the-default-location)
  - [Encrypted backup in Minio](#encrypted-backup-in-minio)
  - [Backup in S3 using AWS credential secret](#backup-in-s3-using-aws-credential-secret)
  - [Recurring backup in S3 using AWS credential secret](#recurring-backup-in-s3-using-aws-credential-secret)
  - [Backup from EC2 nodes with IAM permission to access S3](#backup-from-ec2-nodes-with-iam-permission-to-access-s3)
- [Restore](#restore)
  - [Restore using the default backup file location](#restore-using-the-default-backup-file-location)
  - [Restore for Rancher migration](#restore-for-rancher-migration)
  - [Restore from encrypted backup](#restore-from-encrypted-backup)
  - [Restore an encrypted backup from Minio](#restore-an-encrypted-backup-from-minio)
  - [Restore from backup using an AWS credential secret to access S3](#restore-from-backup-using-an-aws-credential-secret-to-access-s3)
  - [Restore from EC2 nodes with IAM permissions to access S3](#restore-from-ec2-nodes-with-iam-permissions-to-access-s3)
- [Example Credential Secret for Storing Backups in S3](#example-credential-secret-for-storing-backups-in-s3)
- [Example EncryptionConfiguration](#example-encryptionconfiguration)

# Backup

This section contains example Backup custom resources.

### Backup in the Default Location with Encryption

```yaml
apiVersion: resources.cattle.io/v1
kind: Backup
metadata:
  name: default-location-encrypted-backup
spec:
  resourceSetName: rancher-resource-set
  encryptionConfigSecretName: encryptionconfig
```

### Recurring Backup in the Default Location

```yaml
apiVersion: resources.cattle.io/v1
kind: Backup
metadata:
  name: default-location-recurring-backup
spec:
  resourceSetName: rancher-resource-set
  schedule: "@every 1h"
  retentionCount: 10
```

### Encrypted Recurring Backup in the Default Location

```yaml
apiVersion: resources.cattle.io/v1
kind: Backup
metadata:
  name: default-enc-recurring-backup
spec:
  resourceSetName: rancher-resource-set
  encryptionConfigSecretName: encryptionconfig
  schedule: "@every 1h"
  retentionCount: 3
```

### Encrypted Backup in Minio

```yaml
apiVersion: resources.cattle.io/v1
kind: Backup
metadata:
  name: minio-backup
spec:
  storageLocation:
    s3:
      credentialSecretName: minio-creds
      credentialSecretNamespace: default
      bucketName: rancherbackups
      endpoint: minio.xip.io
      endpointCA: LS0tLS1CRUdJTi3VUFNQkl5UUT.....pbEpWaVzNkRS0tLS0t
  resourceSetName: rancher-resource-set
  encryptionConfigSecretName: encryptionconfig
```

### Backup in S3 Using AWS Credential Secret

```yaml
apiVersion: resources.cattle.io/v1
kind: Backup
metadata:
  name: s3-backup
spec:
  storageLocation:
    s3:
      credentialSecretName: s3-creds
      credentialSecretNamespace: default
      bucketName: rancher-backups
      folder: ecm1
      region: us-west-2
      endpoint: s3.us-west-2.amazonaws.com
  resourceSetName: rancher-resource-set
  encryptionConfigSecretName: encryptionconfig
```

### Recurring Backup in S3 Using AWS Credential Secret

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
      folder: ecm1
      region: us-west-2
      endpoint: s3.us-west-2.amazonaws.com
  resourceSetName: rancher-resource-set
  encryptionConfigSecretName: encryptionconfig
  schedule: "@every 1h"
  retentionCount: 10
```

### Backup from EC2 Nodes with IAM Permission to Access S3

This example shows that the AWS credential secret does not have to be provided to create a backup if the nodes running `rancher-backup` have [these permissions for access to S3.](../configuration/backup-config/#iam-permissions-for-ec2-nodes-to-access-s3)

```yaml
apiVersion: resources.cattle.io/v1
kind: Backup
metadata:
  name: s3-iam-backup
spec:
  storageLocation:
    s3:
      bucketName: rancher-backups
      folder: ecm1
      region: us-west-2
      endpoint: s3.us-west-2.amazonaws.com
  resourceSetName: rancher-resource-set
  encryptionConfigSecretName: encryptionconfig
```

# Restore

This section contains example Restore custom resources.

### Restore Using the Default Backup File Location

```yaml
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-default
spec:
  backupFilename: default-location-recurring-backup-752ecd87-d958-4d20-8350-072f8d090045-2020-09-26T12-29-54-07-00.tar.gz
#  encryptionConfigSecretName: test-encryptionconfig
```

### Restore for Rancher Migration
```yaml
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-migration
spec:
  backupFilename: backup-b0450532-cee1-4aa1-a881-f5f48a007b1c-2020-09-15T07-27-09Z.tar.gz
  prune: false
  storageLocation:
    s3:
      credentialSecretName: s3-creds
      credentialSecretNamespace: default
      bucketName: rancher-backups
      folder: ecm1
      region: us-west-2
      endpoint: s3.us-west-2.amazonaws.com
```

### Restore from Encrypted Backup

```yaml
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-encrypted
spec:
  backupFilename: default-test-s3-def-backup-c583d8f2-6daf-4648-8ead-ed826c591471-2020-08-24T20-47-05Z.tar.gz
  encryptionConfigSecretName: encryptionconfig
```

### Restore an Encrypted Backup from Minio

```yaml
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-minio
spec:
  backupFilename: default-minio-backup-demo-aa5c04b7-4dba-4c48-9ac4-ab7916812eaa-2020-08-30T13-18-17-07-00.tar.gz
  storageLocation:
    s3:
      credentialSecretName: minio-creds
      credentialSecretNamespace: default
      bucketName: rancherbackups
      endpoint: minio.xip.io
      endpointCA: LS0tLS1CRUdJTi3VUFNQkl5UUT.....pbEpWaVzNkRS0tLS0t
  encryptionConfigSecretName: test-encryptionconfig
```

### Restore from Backup Using an AWS Credential Secret to Access S3

```yaml
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-s3-demo
spec:
  backupFilename: test-s3-recurring-backup-752ecd87-d958-4d20-8350-072f8d090045-2020-09-26T12-49-34-07-00.tar.gz.enc
  storageLocation:
    s3:
      credentialSecretName: s3-creds
      credentialSecretNamespace: default
      bucketName: rancher-backups
      folder: ecm1
      region: us-west-2
      endpoint: s3.us-west-2.amazonaws.com
  encryptionConfigSecretName: test-encryptionconfig
```

### Restore from EC2 Nodes with IAM Permissions to Access S3

This example shows that the AWS credential secret does not have to be provided to restore from backup if the nodes running `rancher-backup` have [these permissions for access to S3.](../configuration/backup-config/#iam-permissions-for-ec2-nodes-to-access-s3)

```yaml
apiVersion: resources.cattle.io/v1
kind: Restore
metadata:
  name: restore-s3-demo
spec:
  backupFilename: default-test-s3-recurring-backup-84bf8dd8-0ef3-4240-8ad1-fc7ec308e216-2020-08-24T10#52#44-07#00.tar.gz
  storageLocation:
    s3:
      bucketName: rajashree-backup-test
      folder: ecm1
      region: us-west-2
      endpoint: s3.us-west-2.amazonaws.com
  encryptionConfigSecretName: test-encryptionconfig
```

# Example Credential Secret for Storing Backups in S3

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: creds
type: Opaque
data:
  accessKey: <Enter your access key>
  secretKey: <Enter your secret key>
```

# Example EncryptionConfiguration

```yaml
apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aesgcm:
          keys:
            - name: key1
              secret: c2VjcmV0IGlzIHNlY3VyZQ==
            - name: key2
              secret: dGhpcyBpcyBwYXNzd29yZA==
      - aescbc:
          keys:
            - name: key1
              secret: c2VjcmV0IGlzIHNlY3VyZQ==
            - name: key2
              secret: dGhpcyBpcyBwYXNzd29yZA==
      - secretbox:
          keys:
            - name: key1
              secret: YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY=
```



