---
title: Restoring from Backup
weight: 3
---

The details of restoring your cluster from backup are different depending on your version of RKE.

{{% tabs %}}
{{% tab "RKE v0.2.0+"%}}

<<<<<<< HEAD
If there is a disaster with your Kubernetes cluster,you can use `rke etcd snapshot-restore` to recover your etcd. This command reverts the etcd to a specific snapshot. The following actions are included in the command:

- Syncs the snapshot or downloads the snapshot from S3, if necessary.
- Checks snapshot checksum across etcd nodes to make sure they are identical.
- Deletes your current cluster and cleans old data by running `rke remove`. This removes the entire Kubernetes cluster, not just the etcd cluster.
- Rebuilds the etcd cluster from the chosen snapshot.
- Creates a new cluster by running `rke up`.
- Restarts cluster system pods.

>**Warning:** You should back up any important data in your cluster before running `rke etcd snapshot-restore` because the command deletes your current Kubernetes cluster and replaces it with a new one.
=======
If there is a disaster with your Kubernetes cluster, you can use `rke etcd snapshot-restore` to recover your etcd. This command reverts the etcd to a specific snapshot. The following actions are included in the command:

- Removes the old `etcd` container
- Deletes your current `etcd` cluster (runs `rke remove` to clean old data)
- Syncs the snapshot or downloads the snapshot from s3
- Creates a new `etcd` cluster using the snapshot that you have chosen (triggers `rke up`)

>**Warning:** You should back up any important data in your cluster before running `rke etcd snapshot-restore` because the command deletes your current etcd cluster and replaces it with a new one.
>>>>>>> 5a829e738a02361aee4814c0c0002e574c1eccdb

The snapshot used to restore your etcd cluster can either be stored locally in `/opt/rke/etcd-snapshots` or from a S3 compatible backend.

### Example of Restoring from a Local Snapshot

To restore etcd from a local snapshot, run:

```
$ rke etcd snapshot-restore --config cluster.yml --name mysnapshot
```

The snapshot is assumed to be located in `/opt/rke/etcd-snapshots`.

**Note:** The `pki.bundle.tar.gz` file is not needed because RKE v0.2.0 changed how the [Kubernetes cluster state is stored]({{< baseurl >}}/rke/latest/en/installation/#kubernetes-cluster-state).

### Example of Restoring from a Snapshot in S3

> **Prerequisite:** Ensure your `cluster.rkestate` is present before starting the restore, because this contains your certificate data for the cluster.

When restoring etcd from a snapshot located in S3, the command needs the S3 information in order to connect to the S3 backend and retrieve the snapshot.

```shell
$ rke etcd snapshot-restore \
--config cluster.yml \
--name snapshot-name \
--s3 \
--access-key S3_ACCESS_KEY \
--secret-key S3_SECRET_KEY \
--bucket-name s3-bucket-name \
--s3-endpoint s3.amazonaws.com
```
**Note:** if you were restoring a cluster that had Rancher installed, the Rancher UI should start up after a few minutes; you don't need to re-run Helm.

### Options for `rke etcd snapshot-restore`

| Option | Description | S3 Specific |
| --- | --- | ---|
| `--name` value            |  Specify snapshot name | |
| `--config` value          |  Specify an alternate cluster YAML file (default: `cluster.yml`) [$RKE_CONFIG] | |
| `--s3`                    |  Enabled backup to s3 |* |
| `--s3-endpoint` value     |  Specify s3 endpoint url (default: "s3.amazonaws.com") | * |
| `--access-key` value      |  Specify s3 accessKey | *|
| `--secret-key` value      |  Specify s3 secretKey | *|
| `--bucket-name` value     |  Specify s3 bucket name | *|
| `--region` value          |  Specify the s3 bucket location (optional) | *|
| `--ssh-agent-auth`      |   [Use SSH Agent Auth defined by SSH_AUTH_SOCK]({{< baseurl >}}/rke/latest/en/config-options/#ssh-agent) | |
| `--ignore-docker-version`  | [Disable Docker version check]({{< baseurl >}}/rke/latest/en/config-options/#supported-docker-versions) |

{{% /tab %}}
{{% tab "RKE prior to v0.2.0"%}}

<<<<<<< HEAD
If there is a disaster with your Kubernetes cluster, you can use `rke etcd snapshot-restore` to recover your etcd. This command reverts etcd to a specific snapshot.

The following actions are included in `rke etcd snapshot-restore`:

- Removes the old etcd cluster
- Rebuilds the etcd cluster using the local snapshot

Before you run this command, you must:

- Run `rke remove` to remove your Kubernetes cluster and clean the nodes
- Download your etcd snapshot from S3, if applicable. Place the etcd snapshot and the `pki.bundle.tar.gz` file in `/opt/rke/etcd-snapshots`. Manually sync the snapshot across all `etcd` nodes.

After the restore, you must rebuild your Kubernetes cluster with `rke up`.

>**Warning:** You should back up any important data in your cluster before running `rke etcd snapshot-restore` because the command deletes your current etcd cluster and replaces it with a new one.

=======
If there is a disaster with your Kubernetes cluster, you can use `rke etcd snapshot-restore` to recover your etcd. This command reverts etcd to a specific snapshot. RKE also removes the old `etcd` container before creating a new `etcd` cluster using the snapshot that you have chosen.

>**Warning:** You should back up any important data in your cluster before running `rke etcd snapshot-restore` because the command deletes your current etcd cluster and replaces it with a new one.

The snapshot used to restore your etcd cluster is stored locally in  `/opt/rke/etcd-snapshots`.

>>>>>>> 5a829e738a02361aee4814c0c0002e574c1eccdb
### Example of Restoring from a Local Snapshot

To restore etcd from a local snapshot, run:

```
$ rke etcd snapshot-restore --config cluster.yml --name mysnapshot
```

The snapshot is assumed to be located in `/opt/rke/etcd-snapshots`.

<<<<<<< HEAD
The snapshot must be manually synched across all `etcd` nodes.

=======
>>>>>>> 5a829e738a02361aee4814c0c0002e574c1eccdb
The `pki.bundle.tar.gz` file is also expected to be in the same location.

### Options for `rke etcd snapshot-restore`

| Option | Description |
| --- | --- |
| `--name` value            |  Specify snapshot name |
| `--config` value          |  Specify an alternate cluster YAML file (default: `cluster.yml`) [$RKE_CONFIG] |
| `--ssh-agent-auth`      |   [Use SSH Agent Auth defined by SSH_AUTH_SOCK]({{< baseurl >}}/rke/latest/en/config-options/#ssh-agent) |
| `--ignore-docker-version`  | [Disable Docker version check]({{< baseurl >}}/rke/latest/en/config-options/#supported-docker-versions) |

{{% /tab %}}
{{% /tabs %}}