---
title: One-time Snapshots
weight: 1
---

One-time snapshots are handled differently depending on your version of RKE.

{{% tabs %}}
{{% tab "RKE v0.2.0+" %}}

To save a snapshot of etcd from each etcd node in the cluster config file, run the `rke etcd snapshot-save` command.

The snapshot is saved in `/opt/rke/etcd-snapshots`.

When running the command, an additional container is created to take the snapshot. When the snapshot is completed, the container is automatically removed.

The one-time snapshot can be uploaded to a S3 compatible backend by using the additional options to specify the S3 backend.

To create a local one-time snapshot, run:

```
$ rke etcd snapshot-save --config cluster.yml --name snapshot-name   
```

**Result:** The snapshot is saved in `/opt/rke/etcd-snapshots`.

To save a one-time snapshot to S3, run:

```
$ rke etcd snapshot-save \
--config cluster.yml \
--name snapshot-name \
--s3 \
--access-key S3_ACCESS_KEY \
--secret-key S3_SECRET_KEY \
--bucket-name s3-bucket-name \
--folder s3-folder-name \ # Optional - Available as of v0.3.0
--s3-endpoint s3.amazonaws.com
```

**Result:** The snapshot is saved in `/opt/rke/etcd-snapshots` as well as uploaded to the S3 backend.

### Options for `rke etcd snapshot-save`

| Option | Description | S3 Specific |
| --- | --- | --- |
|   `--name` value         |    Specify snapshot name |  |
|   `--config` value       |    Specify an alternate cluster YAML file (default: `cluster.yml`) [$RKE_CONFIG] |  |
|   `--s3`                 |    Enabled backup to s3 |   * |
|   `--s3-endpoint` value  |    Specify s3 endpoint url (default: "s3.amazonaws.com") |   * |
|   `--access-key` value   |    Specify s3 accessKey |   * |
|   `--secret-key` value   |    Specify s3 secretKey |  * |
|   `--bucket-name` value  |    Specify s3 bucket name |   * |
|   `--folder` value  |    Specify folder inside  bucket where backup will be stored. This is optional. _Available as of v0.3.0_ |   * |
|   `--region` value       |    Specify the s3 bucket location (optional) |   * |
| `--ssh-agent-auth`      |   [Use SSH Agent Auth defined by SSH_AUTH_SOCK]({{< baseurl >}}/rke/latest/en/config-options/#ssh-agent) | |
| `--ignore-docker-version`  | [Disable Docker version check]({{< baseurl >}}/rke/latest/en/config-options/#supported-docker-versions) |

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

{{% /tab %}}
{{% tab "RKE prior to v0.2.0" %}}

To save a snapshot of etcd from each etcd node in the cluster config file, run the `rke etcd snapshot-save` command.

When running the command, an additional container is created to take the snapshot. When the snapshot is completed, the container is automatically removed.

RKE saves a backup of the certificates, i.e. a file named `pki.bundle.tar.gz`, in the same location. The snapshot and pki bundle file are required for the restore process.

To create a local one-time snapshot, run:

```
$ rke etcd snapshot-save --config cluster.yml --name snapshot-name   
```

**Result:** The snapshot is saved in `/opt/rke/etcd-snapshots`.

### Options for `rke etcd snapshot-save`

| Option | Description |
| --- | --- |
|   `--name` value         |    Specify snapshot name |
|   `--config` value       |    Specify an alternate cluster YAML file (default: `cluster.yml`) [$RKE_CONFIG] |
| `--ssh-agent-auth`      |   [Use SSH Agent Auth defined by SSH_AUTH_SOCK]({{< baseurl >}}/rke/latest/en/config-options/#ssh-agent) |
| `--ignore-docker-version`  | [Disable Docker version check]({{< baseurl >}}/rke/latest/en/config-options/#supported-docker-versions) |

{{% /tab %}}
{{% /tabs %}}
