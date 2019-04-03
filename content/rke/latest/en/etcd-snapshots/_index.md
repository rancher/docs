---
title: Backups and Disaster Recovery
weight: 150
aliases:
  - /rke/latest/en/installation/etcd-snapshots/
---

_Available as of v0.1.7_

RKE clusters can be configured to automatically take snapshots of etcd. In a disaster scenario, you can restore these snapshots, which are stored on other nodes in the cluster. Snapshots are always saved locally in `/opt/rke/etcd-snapshots`.

_Available as of v0.2.0_

RKE can also upload your snapshots to a S3 compatible backend. Additionally, the **pki.bundle.tar.gz** file usage is no longer required as v0.2.0 has changed how the [Kubernetes cluster state is stored]({{< baseurl >}}/rke/latest/en/installation/#kubernetes-cluster-state).

## One-Time Snapshots

The `rke etcd snapshot-save` command will save a snapshot of etcd from each etcd node in the cluster config file. The snapshot is saved in `/opt/rke/etcd-snapshots`. When running the command, an additional container is created to take the snapshot. When the snapshot is completed, the container is automatically removed.

Prior to v0.2.0, along with the individual snapshot, RKE saves a backup of the certificates, i.e. a file named `pki.bundle.tar.gz`, in the same location. The snapshot and pki bundle file are required for the restore process in versions prior to v0.2.0.

As of v0.2.0, the one-time snapshot can be uploaded to a S3 compatible backend by using the additional options to specify the S3 backend.

### Options for `rke etcd snapshot-save`

| Option | Description | S3 Specific |
| --- | --- | --- |
|   `--name` value         |    Specify snapshot name |  |
|   `--config` value       |    Specify an alternate cluster YAML file (default: "cluster.yml") [$RKE_CONFIG] |  |
|   `--s3`                 |    Enabled backup to s3 |   * |
|   `--s3-endpoint` value  |    Specify s3 endpoint url (default: "s3.amazonaws.com") |   * |
|   `--access-key` value   |    Specify s3 accessKey |   * |
|   `--secret-key` value   |    Specify s3 secretKey |  * |
|   `--bucket-name` value  |    Specify s3 bucket name |   * |
|   `--region` value       |    Specify the s3 bucket location (optional) |   * |
| `--ssh-agent-auth`      |   [Use SSH Agent Auth defined by SSH_AUTH_SOCK]({{< baseurl >}}/rke/latest/en/config-options/#ssh-agent) | |
| `--ignore-docker-version`  | [Disable Docker version check]({{< baseurl >}}/rke/latest/en/config-options/#supported-docker-versions) |

### Local One-Time Snapshot Example

```
$ rke etcd snapshot-save --config cluster.yml --name snapshot-name   
```

The snapshot is saved in `/opt/rke/etcd-snapshots`

### One-Time Snapshots uploaded to S3 Example

_Available as of v0.2.0_

```
$ rke etcd snapshot-save --config cluster.yml --name snapshot-name  \
--s3 --access-key S3_ACCESS_KEY --secret-key S3_SECRET_KEY \
--bucket-name s3-bucket-name --s3-endpoint s3.amazonaws.com
```

The snapshot is saved in `/opt/rke/etcd-snapshots` as well as uploaded to the S3 backend.

## Recurring Snapshots

To schedule automatic recurring etcd snapshots, you can enable the `etcd-snapshot` service with [extra configuration options the etcd service](#options-for-the-etcd-snapshot-service). `etcd-snapshot` runs in a service container alongside the `etcd` container. By default, the `etcd-snapshot` service takes a snapshot for every node that has the `etcd` role and stores them to local disk in `/opt/rke/etcd-snapshots`. If you set up the [options for S3](#options-for-the-etcd-snapshot-service), the snapshot will also be uploaded to the S3 backend.

Prior to v0.2.0, along with the snapshots, RKE saves a backup of the certificates, i.e. a file named `pki.bundle.tar.gz`, in the same location. The snapshot and pki bundle file are required for the restore process in versions prior to v0.2.0.

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

Depending on your version of RKE, the options used to configure recurring snapshots may be different.

_Available as of v0.2.0_

|Option|Description| S3 Specific |
|---|---| --- |
|**interval_hours**| The duration in hours between recurring backups.  This supercedes the `creation` option and will override it if both are specified.| |
|**retention**| The number of snapshots to retain before rotation. This supercedes the `retention` option and will override it if both are specified.| |
|**bucket_name**| S3 bucket name where backups will be stored| * |
|**access_key**| S3 access key with permission to access the backup bucket.| * |
|**secret_key** |S3 secret key with permission to access the backup bucket.| * |
|**region** |S3 region for the backup bucket. This is optional.| * |
|**endpoint** |S3 regions endpoint for the backup bucket.| * |

<br>


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
        endpoint: s3.amazonaws.com
```

#### Prior to v0.2.0

|Option|Description|
|---|---|
|**Snapshot**|By default, the recurring snapshot service is disabled. To enable the service, you need to define it as part of `etcd` and set it to `true`.|
|**Creation**|By default, the snapshot service will take snapshots every 5 minutes (`5m0s`). You can change the time between snapshots as part of the `creation` directive for the `etcd` service.|
|**Retention**|By default, all snapshots are saved for 24 hours (`24h`) before being deleted and purged. You can change how long to store a snapshot as part of the `retention` directive for the `etcd` service.|

```yaml
services:
    etcd:
      snapshot: true
      creation: 5m0s
      retention: 24h
```

## Etcd Disaster Recovery

If there is a disaster with your Kubernetes cluster, you can use `rke etcd snapshot-restore` to recover your etcd. This command reverts etcd to a specific snapshot. RKE also removes the old `etcd` container before creating a new `etcd` cluster using the snapshot that you have chosen.

>**Warning:** Restoring an etcd snapshot deletes your current etcd cluster and replaces it with a new one. Before you run the `rke etcd snapshot-restore` command, you should back up any important data in your cluster.

The snapshot used to restore your etcd cluster can either be stored locally in `/opt/rke/etcd-snapshots` or from a S3 compatible backend. The S3 backend option is available as of v0.2.0.

### Options for `rke etcd snapshot-restore`

| Option | Description | S3 Specific |
| --- | --- | ---|
| `--name` value            |  Specify snapshot name | |
| `--config` value          |  Specify an alternate cluster YAML file (default: "cluster.yml") [$RKE_CONFIG] | |
| `--s3`                    |  Enabled backup to s3 |* |
| `--s3-endpoint` value     |  Specify s3 endpoint url (default: "s3.amazonaws.com") | * |
| `--access-key` value      |  Specify s3 accessKey | *|
| `--secret-key` value      |  Specify s3 secretKey | *|
| `--bucket-name` value     |  Specify s3 bucket name | *|
| `--region` value          |  Specify the s3 bucket location (optional) | *|
| `--ssh-agent-auth`      |   [Use SSH Agent Auth defined by SSH_AUTH_SOCK]({{< baseurl >}}/rke/latest/en/config-options/#ssh-agent) | |
| `--ignore-docker-version`  | [Disable Docker version check]({{< baseurl >}}/rke/latest/en/config-options/#supported-docker-versions) |

### Example of Restoring from a Local Snapshot

When restoring etcd from a local snapshot, the snapshot is assumed to be located in `/opt/rke/etcd-snapshots`. In versions prior to v0.2.0, the `pki.bundle.tar.gz` file is also expected to be in the same location. As of v0.2.0, this file is no longer needed as v0.2.0 has changed how the [Kubernetes cluster state is stored]({{< baseurl >}}/rke/latest/en/installation/#kubernetes-cluster-state).

```
$ rke etcd snapshot-restore --config cluster.yml --name mysnapshot
```

### Example of Restoring from a Snapshot in S3

_Available as of v0.2.0_

When restoring etcd from a snapshot located in S3, the command needs the S3 information in order to connect to the S3 backend and retrieve the snapshot.

```
$ rke etcd snapshot-restore --config cluster.yml --name snapshot-name \
--s3 --access-key S3_ACCESS_KEY --secret-key S3_SECRET_KEY \
--bucket-name s3-bucket-name --s3-endpoint s3.amazonaws.com
```
## Example

In this example, the Kubernetes cluster was deployed on two AWS nodes.

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| node2 | 10.0.0.2 | [etcd]                 |

### Back up the `etcd` cluster

Take a local snapshot of the Kubernetes cluster. As of v0.2.0, you can also upload this snapshot directly to a S3 backend with the [S3 options](#options-for-rke-etcd-snapshot-save).

```
$ rke etcd snapshot-save --name snapshot.db --config cluster.yml
```

![etcd snapshot]({{< baseurl >}}/img/rke/rke-etcd-backup.png)


### Store the Snapshot Externally to S3

As of v0.2.0, this step is no longer required, as RKE can upload and download snapshots automatically from S3 by adding in [S3 options](#options-for-rke-etcd-snapshot-save) when running the `rke etcd snapshot-save` command.

After taking the etcd snapshot on `node2`, we recommend saving this backup in a persistence place. One of the options is to save the backup and `pki.bundle.tar.gz` file on a S3 bucket or tape backup.

> **Note:** As of v0.2.0, the file **pki.bundle.tar.gz** is no longer required for the restore process.

```
# If you're using an AWS host and have the ability to connect to S3
root@node2:~# s3cmd mb s3://rke-etcd-backup
root@node2:~# s3cmd /opt/rke/etcd-snapshots/snapshot.db /opt/rke/etcd-snapshots/pki.bundle.tar.gz s3://rke-etcd-backup/
```

### Place the backup on a new node

To simulate the failure, let's power down `node2`.

```
root@node2:~# poweroff
```

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| ~~node2~~ | ~~10.0.0.2~~ | ~~[etcd]~~                 |
| node3 | 10.0.0.3 | [etcd]                 |
|   |   |   |


Before restoring etcd and running `rke up`, we need to retrieve the backup saved on S3 to a new node, e.g. `node3`. As of v0.2.0, you can directly retrieve the snapshot from S3 when running the restore command, so this step is for users who stored the snapshot externally without using the integrated S3 options.

```
# Make a Directory
root@node3:~# mkdir -p /opt/rke/etcdbackup
# Get the Backup from S3
root@node3:~# s3cmd get s3://rke-etcd-backup/snapshot.db /opt/rke/etcd-snapshots/snapshot.db
# Get the pki bundle from S3, only needed prior to v0.2.0
root@node3:~# s3cmd get s3://rke-etcd-backup/pki.bundle.tar.gz /opt/rke/etcd-snapshots/pki.bundle.tar.gz
```

###  Restore `etcd` on the new node from the backup

Before updating and restoring etcd, you will need to add the new node into the Kubernetes cluster with the `etcd` role. In the `cluster.yml`, comment out the old node and add in the new node. `

```yaml
nodes:
    - address: 10.0.0.1
      hostname_override: node1
      user: ubuntu
      role:
        - controlplane
        - worker
#    - address: 10.0.0.2
#      hostname_override: node2
#      user: ubuntu
#      role:
#       - etcd
    - address: 10.0.0.3
      hostname_override: node3
      user: ubuntu
      role:
        - etcd
```

After the new node is added to the `cluster.yml`, run `rke etcd snapshot-restore` to launch `etcd` from the backup. The snapshot and `pki.bundle.tar.gz` file are expected to be saved at `/opt/rke/etcd-snapshots`.
As of v0.2.0, if you want to directly retrieve the snapshot from S3, add in the [S3 options](#options-for-rke-etcd-snapshot-restore).

> **Note:** As of v0.2.0, the file **pki.bundle.tar.gz** is no longer required for the restore process.

```
$ rke etcd snapshot-restore --name snapshot.db --config cluster.yml
```

Finally, we need to restore the operations on the cluster by making the Kubernetes API point to the new `etcd` by running `rke up` again using the new `cluster.yml`.

```
$ rke up --config cluster.yml
```

Confirm that your Kubernetes cluster is functional by checking the pods on your cluster.

```
> kubectl get pods                                                    
NAME                     READY     STATUS    RESTARTS   AGE
nginx-65899c769f-kcdpr   1/1       Running   0          17s
nginx-65899c769f-pc45c   1/1       Running   0          17s
nginx-65899c769f-qkhml   1/1       Running   0          17s
```

## Troubleshooting

As of **v0.1.9**, the **rke-bundle-cert** container is removed on both success and failure of a restore. To debug any issues, you will need to look at the **logs** generated from rke.

As of **v0.1.8** and below, the **rke-bundle-cert** container is left over from a failed etcd restore. If you are having an issue with restoring an **etcd snapshot** then you can do the following on each etcd nodes before attempting to do another restore:

```
docker container rm --force rke-bundle-cert
```

The rke-bundle-cert container is usually removed when a backup or restore of **etcd** succeeds. Whenever something goes wrong, the **rke-bundle-cert** container will be left over. You can look
at the logs or inspect the container to see what the issue is.

```
docker container logs --follow rke-bundle-cert
docker container inspect rke-bundle-cert
```

The important thing to note is the mounts of the container and location of the **pki.bundle.tar.gz**.
