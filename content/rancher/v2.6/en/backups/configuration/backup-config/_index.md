---
title: Backup Configuration
shortTitle: Backup
weight: 1
aliases:
  - /rancher/v2.5/en/backups/v2.5/configuration/backup-config
---

The Backup Create page lets you configure a schedule, enable encryption and specify the storage location for your backups.

{{< img "/img/rancher/backup_restore/backup/backup.png" "">}}

- [Schedule](#schedule)
- [Encryption](#encryption)
- [Storage Location](#storage-location)
  - [S3](#s3)
  - [Example S3 Storage Configuration](#example-s3-storage-configuration)
  - [Example MinIO Configuration](#example-minio-configuration)
  - [Example credentialSecret](#example-credentialsecret)
  - [IAM Permissions for EC2 Nodes to Access S3](#iam-permissions-for-ec2-nodes-to-access-s3)
- [Examples](#examples)


# Schedule

Select the first option to perform a one-time backup, or select the second option to schedule recurring backups. Selecting **Recurring Backups** lets you configure following two fields:

- **Schedule**: This field accepts
  - Standard [cron expressions](https://en.wikipedia.org/wiki/Cron), such as `"0 * * * *"`
  - Descriptors, such as `"@midnight"` or `"@every 1h30m"`
-  **Retention Count**: This value specifies how many backup files must be retained. If files exceed the given retentionCount,  the oldest files will be deleted. The default value is 10.

{{< img "/img/rancher/backup_restore/backup/schedule.png" "">}}

| YAML Directive Name | Description |
| ---------------- | ---------------- |
| `schedule` |  Provide the cron string for scheduling recurring backups.  |
| `retentionCount` |  Provide the number of backup files to be retained.  |

# Encryption

The rancher-backup gathers resources by making calls to the kube-apiserver. Objects returned by apiserver are decrypted, so even if [encryption At rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/) is enabled, even the encrypted objects gathered by the backup will be in plaintext.

To avoid storing them in plaintext, you can use the same encryptionConfig file that was used for at-rest encryption, to encrypt certain resources in your backup.

> **Important:** You must save the encryptionConfig file, because it won’t be saved by the rancher-backup operator.
The same encryptionFile needs to be used when performing a restore.

The operator consumes this encryptionConfig as a Kubernetes Secret, and the Secret must be in the operator’s namespace. Rancher installs the `rancher-backup` operator in the `cattle-resources-system` namespace, so create this encryptionConfig secret in that namespace.

For the `EncryptionConfiguration`, you can use the [sample file provided in the Kubernetes documentation.](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/#understanding-the-encryption-at-rest-configuration)

To create the Secret, the encryption configuration file must be named `encryption-provider-config.yaml`, and the `--from-file` flag must be used to create this secret.

Save the `EncryptionConfiguration` in a file called `encryption-provider-config.yaml` and run this command:

```
kubectl create secret generic encryptionconfig \
  --from-file=./encryption-provider-config.yaml \
  -n cattle-resources-system
```

This will ensure that the secret contains a key named `encryption-provider-config.yaml`, and the operator will use this key to get the encryption configuration.

The `Encryption Config Secret` dropdown will filter out and list only those Secrets that have this exact key

{{< img "/img/rancher/backup_restore/backup/encryption.png" "">}}

In the example command above, the name `encryptionconfig` can be changed to anything.


| YAML Directive Name | Description |
| ---------------- | ---------------- |
| `encryptionConfigSecretName` |  Provide the name of the Secret from `cattle-resources-system` namespace, that contains the encryption config file.  |

# Storage Location

{{< img "/img/rancher/backup_restore/backup/storageLocation.png" "">}}

If the StorageLocation is specified in the Backup, the operator will retrieve the backup location from that particular S3 bucket. If not specified, the operator will try to find this file in the default operator-level S3 store, and in the operator-level PVC store. The default storage location is configured during the deployment of the `rancher-backup` operator.

Selecting the first option stores this backup in the storage location configured while installing the rancher-backup chart. The second option lets you configure a different S3 compatible storage provider for storing the backup.

### S3

The S3 storage location contains the following configuration fields:

1. **Credential Secret** (optional): If you need to use the AWS Access keys Secret keys to access s3 bucket, create a secret with your credentials with keys and the directives `accessKey` and `secretKey`. It can be in any namespace. An example secret is [here.](#example-credentialsecret) This directive is unnecessary if the nodes running your operator are in EC2 and set up with IAM permissions that allow them to access S3, as described in [this section.](#iam-permissions-for-ec2-nodes-to-access-s3) The Credential Secret dropdown lists the secrets in all namespaces.
1. **Bucket Name**: The name of the S3 bucket where backup files will be stored.
1. **Region** (optional): The AWS [region](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) where the S3 bucket is located. This field isn't needed for configuring MinIO.
1. **Folder** (optional): The name of the folder in the S3 bucket where backup files will be stored.
1. **Endpoint**: The [endpoint](https://docs.aws.amazon.com/general/latest/gr/s3.html)  that is used to access S3 in the region of your bucket.
1. **Endpoint CA** (optional): This should be the Base64 encoded CA cert. For an example, refer to the [example S3 compatible configuration.](#example-s3-storage-configuration)
1. **Skip TLS Verifications** (optional): Set to true if you are not using TLS.


| YAML Directive Name | Description | Required |
| ---------------- | ---------------- | ------------ |
| `credentialSecretName` |  If you need to use the AWS Access keys Secret keys to access s3 bucket, create a secret with your credentials with keys and the directives `accessKey` and `secretKey`. It can be in any namespace as long as you provide that namespace in `credentialSecretNamespace`. An example secret is [here.](#example-credentialsecret) This directive is unnecessary if the nodes running your operator are in EC2 and set up with IAM permissions that allow them to access S3, as described in [this section.](#iam-permissions-for-ec2-nodes-to-access-s3)  |  |
| `credentialSecretNamespace` | The namespace of the secret containing the credentials to access S3. This directive is unnecessary if the nodes running your operator are in EC2 and set up with IAM permissions that allow them to access S3, as described in [this section.](#iam-permissions-for-ec2-nodes-to-access-s3) |  |
| `bucketName` | The name of the S3 bucket where backup files will be stored. | ✓ |
| `folder` | The name of the folder in the S3 bucket where backup files will be stored. | |
| `region` | The AWS [region](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) where the S3 bucket is located. | ✓ |
| `endpoint` |  The [endpoint](https://docs.aws.amazon.com/general/latest/gr/s3.html)  that is used to access S3 in the region of your bucket.  | ✓ |
| `endpointCA` | This should be the Base64 encoded CA cert. For an example, refer to the [example S3 compatible configuration.](#example-s3-storage-configuration) |  |
| `insecureTLSSkipVerify` | Set to true if you are not using TLS. | |

### Example S3 Storage Configuration

```yaml
s3:
  credentialSecretName: s3-creds
  credentialSecretNamespace: default
  bucketName: rancher-backups
  folder: rancher
  region: us-west-2
  endpoint: s3.us-west-2.amazonaws.com
```

### Example MinIO Configuration

```yaml
s3:
  credentialSecretName: minio-creds
  bucketName: rancherbackups
  endpoint: minio.35.202.130.254.xip.io
  endpointCA: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURHakNDQWdLZ0F3SUJBZ0lKQUtpWFZpNEpBb0J5TUEwR0NTcUdTSWIzRFFFQkN3VUFNQkl4RURBT0JnTlYKQkFNTUIzUmxjM1F0WTJFd0hoY05NakF3T0RNd01UZ3lOVFE1V2hjTk1qQXhNREk1TVRneU5UUTVXakFTTVJBdwpEZ1lEVlFRRERBZDBaWE4wTFdOaE1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBCjA4dnV3Q2Y0SEhtR2Q2azVNTmozRW5NOG00T2RpS3czSGszd1NlOUlXQkwyVzY5WDZxenBhN2I2M3U2L05mMnkKSnZWNDVqeXplRFB6bFJycjlpbEpWaVZ1NFNqWlFjdG9jWmFCaVNsL0xDbEFDdkFaUlYvKzN0TFVTZSs1ZDY0QQpWcUhDQlZObU5xM3E3aVY0TE1aSVpRc3N6K0FxaU1Sd0pOMVVKQTZ6V0tUc2Yzc3ByQ0J2dWxJWmZsVXVETVAyCnRCTCt6cXZEc0pDdWlhNEEvU2JNT29tVmM2WnNtTGkwMjdub3dGRld3MnRpSkM5d0xMRE14NnJoVHQ4a3VvVHYKQXJpUjB4WktiRU45L1Uzb011eUVKbHZyck9YS2ZuUDUwbk8ycGNaQnZCb3pUTStYZnRvQ1d5UnhKUmI5cFNTRApKQjlmUEFtLzNZcFpMMGRKY2sxR1h3SURBUUFCbzNNd2NUQWRCZ05WSFE0RUZnUVU5NHU4WXlMdmE2MTJnT1pyCm44QnlFQ2NucVFjd1FnWURWUjBqQkRzd09ZQVU5NHU4WXlMdmE2MTJnT1pybjhCeUVDY25xUWVoRnFRVU1CSXgKRURBT0JnTlZCQU1NQjNSbGMzUXRZMkdDQ1FDb2wxWXVDUUtBY2pBTUJnTlZIUk1FQlRBREFRSC9NQTBHQ1NxRwpTSWIzRFFFQkN3VUFBNElCQVFER1JRZ1RtdzdVNXRQRHA5Q2psOXlLRW9Vd2pYWWM2UlAwdm1GSHpubXJ3dUVLCjFrTkVJNzhBTUw1MEpuS29CY0ljVDNEeGQ3TGdIbTNCRE5mVVh2anArNnZqaXhJYXR2UWhsSFNVaWIyZjJsSTkKVEMxNzVyNCtROFkzelc1RlFXSDdLK08vY3pJTGh5ei93aHRDUlFkQ29lS1dXZkFiby8wd0VSejZzNkhkVFJzNwpHcWlGNWZtWGp6S0lOcTBjMHRyZ0xtalNKd1hwSnU0ZnNGOEcyZUh4b2pOKzdJQ1FuSkg5cGRIRVpUQUtOL2ppCnIvem04RlZtd1kvdTBndEZneWVQY1ZWbXBqRm03Y0ZOSkc4Y2ZYd0QzcEFwVjhVOGNocTZGeFBHTkVvWFZnclMKY1VRMklaU0RJd1FFY3FvSzFKSGdCUWw2RXBaUVpWMW1DRklrdFBwSQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0t
```
### Example credentialSecret

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

### IAM Permissions for EC2 Nodes to Access S3

There are two ways to set up the `rancher-backup` operator to use S3 as the backup storage location.

One way is to configure the `credentialSecretName` in the Backup custom resource, which refers to AWS credentials that have access to S3.

If the cluster nodes are in Amazon EC2, the S3 access can also be set up by assigning IAM permissions to the EC2 nodes so that they can access S3. 

To allow a node to access S3, follow the instructions in the [AWS documentation](https://aws.amazon.com/premiumsupport/knowledge-center/ec2-instance-access-s3-bucket/) to create an IAM role for EC2. When you add a custom policy to the role, add the following permissions, and replace the `Resource` with your bucket name:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
     "Resource": [
        "arn:aws:s3:::rancher-backups"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
         "arn:aws:s3:::rancher-backups/*"
      ]
    }
  ]
}
```

After the role is created, and you have attached the corresponding instance profile to your EC2 instance(s), the `credentialSecretName` directive can be left empty in the Backup custom resource. 

# Examples

For example Backup custom resources, refer to [this page.](../../examples/#backup)