---
title: Backup and Restore Embedded etcd Datastore (Experimental)
shortTitle: Backup and Restore
weight: 26
---

_Available as of v1.19.1+k3s1_

In this section, you'll learn how to create backups of the K3s cluster data and to restore the cluster from backup.

> This is an experimental feature available for K3s clusters with an embedded etcd datastore. If you installed K3s with an external datastore, refer to the upstream documentation for the database for information on backing up the cluster data.

### Creating Snapshots

Snapshots are enabled by default.

The snapshot directory defaults to `/server/db/snapshots`.

To configure the snapshot interval or the number of retained snapshots, refer to the [options.](#options)

### Restoring a Cluster from a Snapshot

When K3s is restored from backup, the old data directory will be moved to `/server/db/etcd-old/`. Then K3s will attempt to restore the snapshot by creating a new data directory, then starting etcd with a new K3s cluster with one etcd member.

To restore the cluster from backup, run K3s with the `--cluster-reset` option, with the `--cluster-reset-restore-path` also given:

```
./k3s server \
  --cluster-reset \
  --cluster-reset-restore-path=<PATH-TO-SNAPSHOT>
```

**Result:**  A message in the logs says that K3s can be restarted without the flags. Start k3s again and should run successfully and be restored from the specified snapshot.

### Options

These options can be passed in with the command line, or in the [configuration file,]({{<baseurl>}}/k3s/latest/en/installation/install-options/#configuration-file ) which may be easier to use.

| Options | Description |
| ----------- | --------------- |
| `--etcd-disable-snapshots` | Disable automatic etcd snapshots |
| `--etcd-snapshot-schedule-cron` value  |  Snapshot interval time in cron spec. eg. every 5 hours `* */5 * * *`(default: `0 */12 * * *`) |
| `--etcd-snapshot-retention` value  | Number of snapshots to retain (default: 5) |
| `--etcd-snapshot-dir` value  | Directory to save db snapshots. (Default location: `${data-dir}/db/snapshots`) |
| `--cluster-reset`  | Forget all peers and become sole member of a new cluster. This can also be set with the environment variable `[$K3S_CLUSTER_RESET]`.
| `--cluster-reset-restore-path` value | Path to snapshot file to be restored