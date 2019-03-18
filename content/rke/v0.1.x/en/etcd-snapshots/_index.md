---
title: Backups and Disaster Recovery
weight: 150
aliases:
  - /rke/v0.1.x/en/installation/etcd-snapshots/
---

As of v0.1.7, you can configure a RKE cluster to automatically take snapshots of etcd. In a disaster scenario, you can restore these snapshots, which are stored on other nodes in the cluster.

As of v0.2.0, you can use RKE to automatically upload your snapshots to an S3 compatible backend. Additionally, the **pki.bundle.tar.gz** file usage is no longer required as v0.2.0 uses a [newer state management model]({{< baseurl >}}/rke/v0.1.x/en/installation/#kubernetes-cluster-state).

## One-Time Snapshots

RKE can take a one-time snapshot of a running etcd node in a RKE cluster. The snapshot is automatically saved in `/opt/rke/etcd-snapshots`.

```
$ rke etcd snapshot-save --config cluster.yml     

WARN[0000] Name of the snapshot is not specified using [rke_etcd_snapshot_2018-05-17T23:32:08+02:00]
INFO[0000] Starting saving snapshot on etcd hosts       
INFO[0000] [dialer] Setup tunnel for host [x.x.x.x]
INFO[0001] [dialer] Setup tunnel for host [y.y.y.y]
INFO[0002] [dialer] Setup tunnel for host [z.z.z.z]
INFO[0003] [etcd] Saving snapshot [rke_etcd_snapshot_2018-05-17T23:32:08+02:00] on host [x.x.x.x]
INFO[0004] [etcd] Successfully started [etcd-snapshot-once] container on host [x.x.x.x]
INFO[0004] [etcd] Saving snapshot [rke_etcd_snapshot_2018-05-17T23:32:08+02:00] on host [y.y.y.y]
INFO[0005] [etcd] Successfully started [etcd-snapshot-once] container on host [y.y.y.y]
INFO[0005] [etcd] Saving snapshot [rke_etcd_snapshot_2018-05-17T23:32:08+02:00] on host [z.z.z.z]
INFO[0006] [etcd] Successfully started [etcd-snapshot-once] container on host [z.z.z.z]
INFO[0006] Finished saving snapshot [rke_etcd_snapshot_2018-05-17T23:32:08+02:00] on all etcd hosts
```

The command will save a snapshot of etcd from each etcd node in the cluster config file and will save it in `/opt/rke/etcd-snapshots`. When running the command, an additional container is created to take the snapshot. When the snapshot is completed, the container is automatically removed.

### S3 One-Time Snapshots
_Available as of v0.2.0_

As of v0.2.0, it's possible to use RKE to save and directly upload snapshots to S3.

```
$ rke etcd snapshot-save --help
NAME:
   rke etcd snapshot-save - Take snapshot on all etcd hosts

USAGE:
   rke etcd snapshot-save [command options] [arguments...]

OPTIONS:
   --name value             Specify snapshot name
   --config value           Specify an alternate cluster YAML file (default: "cluster.yml") [$RKE_CONFIG]
   --s3                     Enabled backup to s3
   --s3-endpoint value      Specify s3 endpoint url (default: "s3.amazonaws.com")
   --access-key value       Specify s3 accessKey
   --secret-key value       Specify s3 secretKey
   --bucket-name value      Specify s3 bucket name
   --region value           Specify the s3 bucket location (optional)
   --ssh-agent-auth         Use SSH Agent Auth defined by SSH_AUTH_SOCK
   --ignore-docker-version  Disable Docker version check


$ rke etcd snapshot-save --config cluster.yml --s3  --access-key S3_ACCESS_KEY --secret-key S3_SECRET_KEY --bucket-name s3-bucket-name --name snapshot-name --s3-endpoint s3.amazonaws.com
```

## Etcd Recurring Snapshots

To schedule a recurring automatic etcd snapshot save, you can enable the `etcd-snapshot` service. `etcd-snapshot` runs in a service container alongside the `etcd` container. `etcd-snapshot` automatically takes a snapshot of etcd and stores them to its local disk in `/opt/rke/etcd-snapshots`.


In the `cluster.yml`, you need to turn enable `snapshot` as part of the `etcd service`. Additionally, you want to specify `creation` and `retention` for the snapshot service.

```yaml
services:
    etcd:
      snapshot: true
      creation: 5m0s
      retention: 24h
```


When a cluster is launched with the etcd snapshot service enabled, you can view the `etcd-rolling-snapshots` logs to confirm backups are being created automatically.

```
$ docker logs etcd-rolling-snapshots

time="2018-05-04T18:39:16Z" level=info msg="Initializing Rolling Backups" creation=1m0s retention=24h0m0s
time="2018-05-04T18:40:16Z" level=info msg="Created backup" name="2018-05-04T18:40:16Z_etcd" runtime=108.332814ms
time="2018-05-04T18:41:16Z" level=info msg="Created backup" name="2018-05-04T18:41:16Z_etcd" runtime=92.880112ms
time="2018-05-04T18:42:16Z" level=info msg="Created backup" name="2018-05-04T18:42:16Z_etcd" runtime=83.67642ms
time="2018-05-04T18:43:16Z" level=info msg="Created backup" name="2018-05-04T18:43:16Z_etcd" runtime=86.298499ms
```

For every node that has the `etcd` role, these `backups` are saved to `/opt/rke/etcd-snapshots/`.

### Snapshot Options
|Option|Description|
|---|---|
|**Snapshot**|By default, the recurring snapshot service is disabled. To enable the service, you need to define it as part of `etcd` and set it to `true`.|
|**Creation**|By default, the snapshot service will take snapshots every 5 minutes (`5m0s`). You can change the time between snapshots as part of the `creation` directive for the `etcd` service.|
|**Retention**|By default, all snapshots are saved for 24 hours (`24h`) before being deleted and purged. You can change how long to store a snapshot as part of the `retention` directive for the `etcd` service.|

## S3 Recurring Backups
_Available as of v0.2.0_

As of v0.2.0, RKE support saving snapshots to S3 compatible backends. This is true for both recurring backups and one time snapshots.

### S3 Snapshot Options
The new backup options replace the [legacy backup configuration]({{< baseurl >}}/rke/v0.1.x/en/etcd-snapshots/#etcd-recurring-snapshots) and should be used instead in the `cluster.yml` file:

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

|Option|Description|
|---|---|
|**interval_hours**| The duration in hours between recurring backups. This deprecates the `creation` legacy option and will override it if both are specified.|
|**retention**| The number of snapshots to retain before rotation. This deprecates the `retention` legacy option and will override it if both are specified.|
|**bucket_name**| S3 bucket name where backups will be stored|
|**access_key**| S3 access key with permission to access the backup bucket.|
|**secret_key** |S3 secret key with permission to access the backup bucket.|
|**region** |S3 region for the backup bucket. This is optional.|
|**endpoint** |S3 regions endpoint for the backup bucket.|

## Etcd Disaster recovery

If there is a disaster with your Kubernetes cluster, you can use `rke etcd snapshot-restore` to recover your etcd. This command will revert to a specific snapshot stored in `/opt/rke/etcd-snapshots` that you explicitly define. During the restore process, RKE also removes the old `etcd` container before creating a new `etcd` cluster using the snapshot that you have chosen.

>**Warning:** Restoring an etcd snapshot deletes your current etcd cluster and replaces it with a new one. Before you run the `rke etcd snapshot-restore` command, you should back up any important data in your cluster.

```
$ rke etcd snapshot-restore --name mysnapshot --config cluster.yml
INFO[0000] Starting restore on etcd hosts
INFO[0000] [dialer] Setup tunnel for host [x.x.x.x]
INFO[0002] [dialer] Setup tunnel for host [y.y.y.y]
INFO[0005] [dialer] Setup tunnel for host [z.z.z.z]
INFO[0007] [hosts] Cleaning up host [x.x.x.x]
INFO[0007] [hosts] Running cleaner container on host [x.x.x.x]
INFO[0008] [kube-cleaner] Successfully started [kube-cleaner] container on host [x.x.x.x]
INFO[0008] [hosts] Removing cleaner container on host [x.x.x.x]
INFO[0008] [hosts] Successfully cleaned up host [x.x.x.x]
INFO[0009] [hosts] Cleaning up host [y.y.y.y]
INFO[0009] [hosts] Running cleaner container on host [y.y.y.y]
INFO[0010] [kube-cleaner] Successfully started [kube-cleaner] container on host [y.y.y.y]
INFO[0010] [hosts] Removing cleaner container on host [y.y.y.y]
INFO[0010] [hosts] Successfully cleaned up host [y.y.y.y]
INFO[0011] [hosts] Cleaning up host [z.z.z.z]
INFO[0011] [hosts] Running cleaner container on host [z.z.z.z]
INFO[0012] [kube-cleaner] Successfully started [kube-cleaner] container on host [z.z.z.z]
INFO[0012] [hosts] Removing cleaner container on host [z.z.z.z]
INFO[0012] [hosts] Successfully cleaned up host [z.z.z.z]
INFO[0012] [etcd] Restoring [snapshot] snapshot on etcd host [x.x.x.x]
INFO[0013] [etcd] Successfully started [etcd-restore] container on host [x.x.x.x]
INFO[0014] [etcd] Restoring [snapshot] snapshot on etcd host [y.y.y.y]
INFO[0015] [etcd] Successfully started [etcd-restore] container on host [y.y.y.y]
INFO[0015] [etcd] Restoring [snapshot] snapshot on etcd host [z.z.z.z]
INFO[0016] [etcd] Successfully started [etcd-restore] container on host [z.z.z.z]
INFO[0017] [etcd] Building up etcd plane..
INFO[0018] [etcd] Successfully started [etcd] container on host [x.x.x.x]
INFO[0020] [etcd] Successfully started [rke-log-linker] container on host [x.x.x.x]
INFO[0021] [remove/rke-log-linker] Successfully removed container on host [x.x.x.x]
INFO[0022] [etcd] Successfully started [etcd] container on host [y.y.y.y]
INFO[0023] [etcd] Successfully started [rke-log-linker] container on host [y.y.y.y]
INFO[0025] [remove/rke-log-linker] Successfully removed container on host [y.y.y.y]
INFO[0025] [etcd] Successfully started [etcd] container on host [z.z.z.z]
INFO[0027] [etcd] Successfully started [rke-log-linker] container on host [z.z.z.z]
INFO[0027] [remove/rke-log-linker] Successfully removed container on host [z.z.z.z]
INFO[0027] [etcd] Successfully started etcd plane..
INFO[0027] Finished restoring on all etcd hosts
```
### S3 Snapshot Restore
_Available as of v0.2.0_

As of v0.2.0, RKE support downloading snapshots from S3 compatible backends. This is true for both recurring backups and one time snapshots.

In order to restore a cluster for a snapshot stored on S3, you need to run the following command:
```
$ rke etcd snapshot-restore --help
NAME:
   rke etcd snapshot-restore - Restore existing snapshot

USAGE:
   rke etcd snapshot-restore [command options] [arguments...]

OPTIONS:
   --name value             Specify snapshot name
   --config value           Specify an alternate cluster YAML file (default: "cluster.yml") [$RKE_CONFIG]
   --s3                     Enabled backup to s3
   --s3-endpoint value      Specify s3 endpoint url (default: "s3.amazonaws.com")
   --access-key value       Specify s3 accessKey
   --secret-key value       Specify s3 secretKey
   --bucket-name value      Specify s3 bucket name
   --region value           Specify the s3 bucket location (optional)
   --ssh-agent-auth         Use SSH Agent Auth defined by SSH_AUTH_SOCK
   --ignore-docker-version  Disable Docker version check

$ rke  etcd snapshot-restore --config cluster.yml --s3  --access-key S3_ACCESS_KEY --secret-key S3_SECRET_KEY --bucket-name s3-bucket-name --name snapshot-name --s3-endpoint s3.amazonaws.com
```
## Example

In this example, the Kubernetes cluster was deployed on two AWS nodes.

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| node2 | 10.0.0.2 | [etcd]                 |

### Back up the `etcd` cluster

Take a snapshot of the Kubernetes cluster.

```
$ rke etcd snapshot-save --name snapshot.db --config cluster.yml
```

![etcd snapshot]({{< baseurl >}}/img/rke/rke-etcd-backup.png)


### Store the snapshot externally

>**Note:** As of version 0.2.0, this is no longer required, as RKE can upload and download snapshots automatically from S3.
>**Note:** As of version 0.2.0, the file **pki.bundle.tar.gz** is no longer required.

After taking the etcd snapshot on `node2`, we recommend saving this backup in a persistence place. One of the options is to save the backup on a S3 bucket or tape backup.


```
# If you're using an AWS host and have the ability to connect to S3
root@node2:~# s3cmd mb s3://rke-etcd-backup
root@node2:~# s3cmd /opt/rke/etcdbackup/snapshot.db s3://rke-etcd-backup/
```

### Place the backup on a new node

To simulate the failure, let's power down `node2`.

```
root@node2:~# poweroff
```

Before restoring etcd and running `rke up`, we need to retrieve the backup saved on S3 to a new node, e.g. `node3`.


|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| ~~node2~~ | ~~10.0.0.2~~ | ~~[etcd]~~                 |
| node3 | 10.0.0.3 | [etcd]                 |
|   |   |   |

```
# Make a Directory
root@node3:~# mkdir -p /opt/rke/etcdbackup
$ Get the Backup from S3
root@node3:~# s3cmd get s3://rke-etcd-backup/snapshot.db /opt/rke/etcdbackup/snapshot.db
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

After the new node is added to the `cluster.yml`, run `rke etcd snapshot-restore` to launch `etcd` from the backup.  ]

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

As of **v0.1.8** and below, the **rke-bundle-cert** container is left over from a failed etcd restore. If you are having an issue with restoring an **etcd snapshot** then you can do the following on each etcd nodes before attempting to do another restore:

```
docker container rm --force rke-bundle-cert
```

The rke-bundle-cert container is usually removed when a backup or restore of **etcd** succeeds.
Whenever something goes wrong, the **rke-bundle-cert** container will be left over. You can look
at the logs or inspect the container to see what the issue is.

```
docker container logs --follow rke-bundle-cert
docker container inspect rke-bundle-cert
```

The important thing to note is the mounts of the container and location of the **pki.bundle.tar.gz**.

As of **v0.1.9**, the **rke-bundle-cert** container is removed on both success and
failure of a restore. To debug any issues, you will need to look at the **logs** generated from rke.
