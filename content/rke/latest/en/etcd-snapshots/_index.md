---
title: Backups and Disaster Recovery
weight: 150
aliases:
  - /rke/latest/en/installation/etcd-snapshots/
---

_Available as of v0.1.7_

RKE clusters can be configured to automatically take snapshots of etcd. In a disaster scenario, you can restore these snapshots, which are stored on other nodes in the cluster. Snapshots are always saved locally in `/opt/rke/etcd-snapshots`.

_Available as of v0.2.0_

RKE can upload your snapshots to a S3 compatible backend.

**Note:** As of RKE v0.2.0, the `pki.bundle.tar.gz` file is no longer required because of a change in how the [Kubernetes cluster state is stored]({{<baseurl>}}/rke/latest/en/installation/#kubernetes-cluster-state).

# Backing Up a Cluster

You can create [one-time snapshots]({{<baseurl>}}/rke/latest/en/etcd-snapshots/one-time-snapshots) to back up your cluster, and you can also configure [recurring snapshots]({{<baseurl>}}/rke/latest/en/etcd-snapshots/recurring-snapshots).

# Restoring a Cluster from Backup

You can use RKE to [restore your cluster from backup]({{<baseurl>}}/rke/latest/en/etcd-snapshots/restoring-from-backup).

# Example Scenarios

These [example scenarios]({{<baseurl>}}/rke/latest/en/etcd-snapshots/example-scenarios) for backup and restore are different based on your version of RKE.

# How Snapshots Work

For each etcd node in the cluster, the etcd cluster health is checked. If the node reports that the etcd cluster is healthy, a snapshot is created from it and optionally uploaded to S3.

The snapshot is stored in `/opt/rke/etcd-snapshots`. If the directory is configured on the nodes as a shared mount, it will be overwritten. On S3, the snapshot will always be from the last node that uploads it, as all etcd nodes upload it and the last will remain.

In the case when multiple etcd nodes exist, any created snapshot is created after the cluster has been health checked, so it can be considered a valid snapshot of the data in the etcd cluster.

_Available as of v1.1.4_

Each snapshot will include the cluster state file in addition to the etcd snapshot file.

### Snapshot Naming

The name of the snapshot is auto-generated. The `--name` option can be used to override the name of the snapshot when creating one-time snapshots with the RKE CLI.

An example one-time snapshot name is `rke_etcd_snapshot_2020-10-15T16:47:24+02:00`. An example recurring snapshot name is `2020-10-15T14:53:26Z_etcd`.

### How Restoring from a Snapshot Works

On restore, the following process is used:

1. The snapshot is retrieved from S3, if S3 is configured.
1. The snapshot is unzipped (if zipped).
1. It is checked if the cluster state file is included in the snapshot, if it is included, it will be used instead of the local cluster state file (_Available as of v1.1.4_)
1. One of the etcd nodes in the cluster serves that snapshot file to the other nodes.
1. The other etcd nodes download the snapshot and validate the checksum so that they all use the same snapshot for the restore.
1.  The cluster is restored and post-restore actions will be done in the cluster.

## Troubleshooting

If you have trouble restoring your cluster, you can refer to the [troubleshooting]({{<baseurl>}}/rke/latest/en/etcd-snapshots/troubleshooting) page.
