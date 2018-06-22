---
title: Backups and Disaster Recovery
weight: 3000
draft: true
---

You can configure a Rancher Kubernetes Engine (RKE) cluster to automatically take snapshots of etcd. In a disaster scenario, you can restore these snapshots, which are stored on other cluster nodes.

### One-Time Snapshots

RKE introduce a new command that can take a snapshot of a running etcd node in rke cluster, the snapshot will be automatically saved in `/opt/rke/etcd-snapshots`, the commands works as following:
```
./rke etcd snapshot-save --config cluster.yml     

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

The command will save a snapshot of etcd from each etcd node in the cluster config file and will save it in `/opt/rke/etcd-snapshots`. This command also creates a container for taking the snapshot. When the process completes, the container is automatically removed.

### Etcd Recurring Snapshots

To schedule a recurring automatic etcd snapshot save, enable the `etcd-snapshot` service. `etcd-snapshot` runs in a service container alongside the `etcd` container. `etcd-snapshot` automatically takes a snapshot of etcd and stores them to its local disk in `/opt/rke/etcd-snapshots`.

To enable `etcd-snapshot` in RKE CLI, configure the following three variables:

```
services:
  etcd:
    snapshot: true
    creation: 5m0s
    retention: 24h
```

- `snapshot`: Enables/disables etcd snapshot recurring service in the RKE cluster.

	Default value: `false`.
- `creation`: Time period in which `etcd-sanpshot` take snapshots.

	Default value: `5m0s`

- `retention`: Time period before before an etcd snapshot expires. Expired snapshots are purged.

	Default value: `24h`

After RKE runs, view the `etcd-snapshot` logs to confirm backups are being created automatically:
```
# docker logs etcd-snapshot

time="2018-05-04T18:39:16Z" level=info msg="Initializing Rolling Backups" creation=1m0s retention=24h0m0s
time="2018-05-04T18:40:16Z" level=info msg="Created backup" name="2018-05-04T18:40:16Z_etcd" runtime=108.332814ms
time="2018-05-04T18:41:16Z" level=info msg="Created backup" name="2018-05-04T18:41:16Z_etcd" runtime=92.880112ms
time="2018-05-04T18:42:16Z" level=info msg="Created backup" name="2018-05-04T18:42:16Z_etcd" runtime=83.67642ms
time="2018-05-04T18:43:16Z" level=info msg="Created backup" name="2018-05-04T18:43:16Z_etcd" runtime=86.298499ms
```
Backups are saved to the following directory: `/opt/rke/etcd-snapshots/`. Backups are created on each node that runs etcd.


### Etcd Disaster recovery

`etcd snapshot-restore` is used for etcd Disaster recovery, it reverts to any snapshot stored in `/opt/rke/etcd-snapshots` that you explicitly define. When you run `etcd snapshot-restore`, RKE removes the old etcd container if it still exists. To restore operations, RKE creates a new etcd cluster using the snapshot you choose.

>**Warning:** Restoring an etcd snapshot deletes your current etcd cluster and replaces it with a new one. Before you run the `etcd snapshot-restore` command, backup any important data in your current cluster.

```
./rke etcd snapshot-restore --name snapshot --config cluster.yml
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

## Example

In this example we will assume that you started RKE on two nodes:

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| node2 | 10.0.0.2 | [etcd]                 |

### 1. Setting up rke cluster
A minimal cluster configuration file for running k8s on these nodes should look something like the following:

```
nodes:
  - address: 10.0.0.1
    hostname_override: node1
    user: ubuntu
    role: [controlplane,worker]
  - address: 10.0.0.2
    hostname_override: node2
    user: ubuntu
    role: [etcd]
```

After running `rke up` you should be able to have a two node cluster, the next step is to run few pods on node1:

```
kubectl --kubeconfig=kube_config_cluster.yml run nginx --image=nginx --replicas=3
```

### 2. Backup etcd cluster

Now lets take a snapshot using RKE:

```
rke etcd snapshot-save --name snapshot.db --config cluster.yml
```

![etcd snapshot](img/rke-etcd-backup.png)

### 3. Store snapshot externally

After taking the etcd backup on node2 we should be able to save this backup in a persistence place, one of the options to do that is to save the backup taken on a s3 bucket or tape backup, for example:

```
root@node2:~# s3cmd mb s3://rke-etcd-backup
root@node2:~# s3cmd /opt/rke/etcdbackup/snapshot.db s3://rke-etcd-backup/
```

### 4. Pull the backup on a new node

To simulate the failure lets powerdown node2 completely:

```
root@node2:~# poweroff
```

Now its time to pull the backup saved on s3 on a new node:

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| ~~node2~~ | ~~10.0.0.2~~ | ~~[etcd]~~                 |
| node3 | 10.0.0.3 | [etcd]                 |
|   |   |   |
```
root@node3:~# mkdir -p /opt/rke/etcdbackup
root@node3:~# s3cmd get s3://rke-etcd-backup/snapshot.db /opt/rke/etcdbackup/snapshot.db
```

### 5. Restore etcd on the new node

Now lets do a restore to restore and run etcd on the third node, in order to do that you have first to add the third node to the cluster configuration file:
```
nodes:
  - address: 10.0.0.1
    hostname_override: node1
    user: ubuntu
    role: [controlplane,worker]
#  - address: 10.0.0.2
#    hostname_override: node2
#    user: ubuntu
#    role: [etcd]
  - address: 10.0.0.3
    hostname_override: node3
    user: ubuntu
    role: [etcd]
```
and then run `rke etcd restore`:
```
rke etcd snapshot-restore --name snapshot.db --config cluster.yml
```

The previous command will restore the etcd data dir from the snapshot and run etcd container on this node, the final step is to restore the operations on the cluster by making the k8s api to point to the new etcd, to do that we run `rke up` again on the new cluster.yml file:
```
rke up --config cluster.yml
```
You can make sure that operations have been restored by checking the nginx deployment we created earlier:
```
> kubectl get pods                                                    
NAME                     READY     STATUS    RESTARTS   AGE
nginx-65899c769f-kcdpr   1/1       Running   0          17s
nginx-65899c769f-pc45c   1/1       Running   0          17s
nginx-65899c769f-qkhml   1/1       Running   0          17s
```
