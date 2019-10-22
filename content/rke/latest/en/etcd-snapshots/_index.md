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

**Note:** As of RKE v0.2.0, the `pki.bundle.tar.gz` file is no longer required because of a change in how the [Kubernetes cluster state is stored]({{< baseurl >}}/rke/latest/en/installation/#kubernetes-cluster-state).

# Backing Up a Cluster

You can create [one-time snapshots]({{<baseurl>}}/rke/latest/en/etcd-snapshots/one-time-snapshots) to back up your cluster, and you can also configure [recurring snapshots]({{<baseurl>}}/rke/latest/en/etcd-snapshots/recurring-snapshots).

# Restoring a Cluster from Backup

You can use RKE to [restore your cluster from backup]({{<baseurl>}}/rke/latest/en/etcd-snapshots/restoring-from-backup).

# Example Scenarios

These [example scenarios]({{<baseurl>}}/rke/latest/en/etcd-snapshots/example-scenarios) for backup and restore are different based on your version of RKE.

## Troubleshooting

If you have trouble restoring your cluster, you can refer to the [troubleshooting]({{<baseurl>}}/rke/latest/en/etcd-snapshots/troubleshooting) page.
