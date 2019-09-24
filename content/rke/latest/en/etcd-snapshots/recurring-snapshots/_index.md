---
title: Recurring Snapshots
weight: 2
---

Recurring snapshots are handled differently based on your version of RKE.

{{% tabs %}}
{{% tab "RKE v0.2.0+"%}}

To schedule automatic recurring etcd snapshots, you can enable the `etcd-snapshot` service with [extra configuration options](#options-for-the-etcd-snapshot-service). `etcd-snapshot` runs in a service container alongside the `etcd` container. By default, the `etcd-snapshot` service takes a snapshot for every node that has the `etcd` role and stores them to local disk in `/opt/rke/etcd-snapshots`.

If you set up the [options for S3](#options-for-the-etcd-snapshot-service), the snapshot will also be uploaded to the S3 backend.

### Snapshot Service Logging

When a cluster is launched with the `etcd-snapshot` service enabled, you can view the `etcd-rolling-snapshots` logs to confirm backups are being created automatically.

```
$ docker logs etcd-rolling-snapshots

time="2018-05-04T18:39:16Z" level=info msg="Initializing Rolling Backups" creation=1m0s retention=24h0m0s
time="2018-05-04T18:40:16Z" level=info msg="Created backup" name="2018-05-04T18:40:16Z_etcd" runtime=108.332814ms
time="2018-05-04T18:41:16Z" level=info msg="Created backup" name="2018-05-04T18:41:16Z_etcd" runtime=92.880112ms
time="2018-05-04T18:42:16Z" level=info msg="Created backup" name="2018-05-04T18:42:16Z_etcd" runtime=83.67642ms
time="2018-05-04T18:43:16Z" level=info msg="Created backup" name="2018-05-04T18:43:16Z_etcd" runtime=86.298499ms
```

### Options for the `Etcd-Snapshot` Service

|Option|Description| S3 Specific |
|---|---| --- |
|**interval_hours**| The duration in hours between recurring backups.  This supercedes the `creation` option (which was used in RKE prior to v0.2.0) and will override it if both are specified.| |
|**retention**| The number of snapshots to retain before rotation. This supercedes the `retention` option and will override it if both are specified.| |
|**bucket_name**| S3 bucket name where backups will be stored| * |
|**folder**| Folder inside S3 bucket where backups will be stored. This is optional.| * |
|**access_key**| S3 access key with permission to access the backup bucket.| * |
|**secret_key** |S3 secret key with permission to access the backup bucket.| * |
|**region** |S3 region for the backup bucket. This is optional.| * |
|**endpoint** |S3 regions endpoint for the backup bucket.| * |
|**custom_ca** |Custom certificate authority to use when connecting to the endpoint. Only required for private S3 compatible storage solutions. Available for RKE v0.2.5+.| * |

The `--access-key` and `--secret-key` options are not required if the `etcd` nodes are AWS EC2 instances that have been configured with a suitable IAM instance profile.

### IAM Support for Storing Snapshots in S3

In addition to API access keys, RKE supports using IAM roles for S3 authentication. The cluster etcd nodes must be assigned an IAM role that has read/write access to the designated backup bucket on S3. Also, the nodes must have network access to the S3 endpoint specified.

Below is an [example IAM policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_s3_rw-bucket.html) that would allow nodes to store and retrieve backups from S3:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ListObjectsInBucket",
            "Effect": "Allow",
            "Action": ["s3:ListBucket"],
            "Resource": ["arn:aws:s3:::bucket-name"]
        },
        {
            "Sid": "AllObjectActions",
            "Effect": "Allow",
            "Action": "s3:*Object",
            "Resource": ["arn:aws:s3:::bucket-name/*"]
        }
    ]
}
```

For details on giving an application access to S3, refer to the AWS documentation on [Using an IAM Role to Grant Permissions to Applications Running on Amazon EC2 Instances.](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2.html)

### Configuring the Snapshot Service in YAML

```yaml
services:
  etcd:
    backup_config:
      interval_hours: 12
      retention: 6
      s3backupconfig:
        access_key: S3_ACCESS_KEY
        secret_key: S3_SECRET_KEY
        bucket_name: s3-bucket-name
        region: ""
        folder: ""
        endpoint: s3.amazonaws.com
```

{{% /tab %}}
{{% tab "RKE prior to v0.2.0"%}}

To schedule automatic recurring etcd snapshots, you can enable the `etcd-snapshot` service with [extra configuration options](#options-for-the-local-etcd-snapshot-service). `etcd-snapshot` runs in a service container alongside the `etcd` container. By default, the `etcd-snapshot` service takes a snapshot for every node that has the `etcd` role and stores them to local disk in `/opt/rke/etcd-snapshots`.

RKE saves a backup of the certificates, i.e. a file named `pki.bundle.tar.gz`, in the same location. The snapshot and pki bundle file are required for the restore process in versions prior to v0.2.0.

### Snapshot Service Logging

When a cluster is launched with the `etcd-snapshot` service enabled, you can view the `etcd-rolling-snapshots` logs to confirm backups are being created automatically.

```
$ docker logs etcd-rolling-snapshots

time="2018-05-04T18:39:16Z" level=info msg="Initializing Rolling Backups" creation=1m0s retention=24h0m0s
time="2018-05-04T18:40:16Z" level=info msg="Created backup" name="2018-05-04T18:40:16Z_etcd" runtime=108.332814ms
time="2018-05-04T18:41:16Z" level=info msg="Created backup" name="2018-05-04T18:41:16Z_etcd" runtime=92.880112ms
time="2018-05-04T18:42:16Z" level=info msg="Created backup" name="2018-05-04T18:42:16Z_etcd" runtime=83.67642ms
time="2018-05-04T18:43:16Z" level=info msg="Created backup" name="2018-05-04T18:43:16Z_etcd" runtime=86.298499ms
```

### Options for the Local `Etcd-Snapshot` Service

|Option|Description|
|---|---|
|**Snapshot**|By default, the recurring snapshot service is disabled. To enable the service, you need to define it as part of `etcd` and set it to `true`.|
|**Creation**|By default, the snapshot service will take snapshots every 5 minutes (`5m0s`). You can change the time between snapshots as part of the `creation` directive for the `etcd` service.|
|**Retention**|By default, all snapshots are saved for 24 hours (`24h`) before being deleted and purged. You can change how long to store a snapshot as part of the `retention` directive for the `etcd` service.|

### Configuring the Snapshot Service in YAML

```yaml
services:
    etcd:
      snapshot: true
      creation: 5m0s
      retention: 24h
```

{{% /tab %}}
{{% /tabs %}}
