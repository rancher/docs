---
title: Etcd Backup and Restoration
weight: 370
---

# Etcd Backup and Restoration

You can configure a Rancher Kubenettes Engine (RKE) cluster to automatically create backups of etcd. In a disaster scenario, you can restore these backups, which are stored on other cluster nodes.

## Etcd Regular Backup

To schedule a recurring automatic etcd backup, enable the `etcd-backup` service. `etcd-backup` runs in a service container alongside the `etcd` container. `etcd-backup` automatically creates backups and stores them to its local disk.

To enable `etcd-backup` in RKE CLI, configure the following three variables:

```
services:
  etcd:
    backup: true
    creation: 5m0s
    retention: 24h
```

- `backup`: Enables/disables etcd backups in the RKE cluster.

	Default value: `false`.
- `creation`: Time period in which `etcd-backup` creates and stores local backups.

	Default value: `5m0s`

- `retention`: Time period before before an etcd backup expires. Expired backups are purged.

	Default value: `24h`

After RKE runs, view the `etcd-backup` logs to confirm backups are being created automatically:
```
# docker logs etcd-backup
time="2018-05-04T18:39:16Z" level=info msg="Initializing Rolling Backups" creation=1m0s retention=24h0m0s
time="2018-05-04T18:40:16Z" level=info msg="Created backup" name="2018-05-04T18:40:16Z_etcd" runtime=108.332814ms
time="2018-05-04T18:41:16Z" level=info msg="Created backup" name="2018-05-04T18:41:16Z_etcd" runtime=92.880112ms
time="2018-05-04T18:42:16Z" level=info msg="Created backup" name="2018-05-04T18:42:16Z_etcd" runtime=83.67642ms
time="2018-05-04T18:43:16Z" level=info msg="Created backup" name="2018-05-04T18:43:16Z_etcd" runtime=86.298499ms
```
Backups are saved to the following directory: `/opt/rke/etcdbackup/`. Backups are created on each node that runs etcd.


## Etcd onetime Snapshots

RKE also added two commands that for etcd backup management:
```
./rke etcd backup [NAME]
```
and
```
./rke etcd restore [NAME]
```

The backup command saves a snapshot of etcd in `/opt/rke/etcdbackup`. This command also creates a container for the backup. When the backup completes, the container is removed.

```
# ./rke etcd backup --name snapshot

INFO[0000] Starting Backup on etcd hosts
INFO[0000] [dialer] Setup tunnel for host [x.x.x.x]
INFO[0002] [dialer] Setup tunnel for host [y.y.y.y]
INFO[0004] [dialer] Setup tunnel for host [z.z.z.z]
INFO[0006] [etcd] Starting backup on host [x.x.x.x]
INFO[0007] [etcd] Successfully started [etcd-backup-once] container on host [x.x.x.x]
INFO[0007] [etcd] Starting backup on host [y.y.y.y]
INFO[0009] [etcd] Successfully started [etcd-backup-once] container on host [y.y.y.y]
INFO[0010] [etcd] Starting backup on host [z.z.z.z]
INFO[0011] [etcd] Successfully started [etcd-backup-once] container on host [z.z.z.z]
INFO[0011] Finished backup on all etcd hosts
```
## Etcd Disaster Recovery

`etcd restore` is a command used to recover from an etcd cluster disaster. The command reverts to any snapshot stored in `/opt/rke/etcdbackup` that you explicitly define. When you run `etcd restore`, RKE removes the old etcd container if it still exists. To restore operations, RKE creates a new etcd cluster using the snapshot you choose.

>**Warning:** Restoring an etcd backup deletes your current etcd cluster and replaces it with a new one. Before you run the `etcd restore` command, backup any important data in your current cluster.

```
./rke etcd restore --name snapshot --config test-aws.yml
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
