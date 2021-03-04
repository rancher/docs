---
title: Restoring Rancher Installed on a K3s Kubernetes Cluster
shortTitle: K3s Installs
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/backups/restorations/k3s-restoration
  - /rancher/v2.0-v2.4/en/backups/restorations/k8s-restore/k3s-restore
  - /rancher/v2.0-v2.4/en/backups/legacy/restore/k8s-restore/k3s-restore/
  - /rancher/v2.0-v2.4/en/backups/legacy/restore/k3s-restore
  - /rancher/v2.0-v2.4/en/backups/v2.0.x-v2.4.x/restore/k3s-restore
---

When Rancher is installed on a high-availability Kubernetes cluster, we recommend using an external database to store the cluster data.

The database administrator will need to back up the external database, or restore it from a snapshot or dump.

We recommend configuring the database to take recurring snapshots.

### Creating Snapshots and Restoring Databases from Snapshots

For details on taking database snapshots and restoring your database from them, refer to the official database documentation:

- [Official MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-snapshot-method.html)
- [Official PostgreSQL documentation](https://www.postgresql.org/docs/8.3/backup-dump.html)
- [Official etcd documentation](https://github.com/etcd-io/etcd/blob/master/Documentation/op-guide/recovery.md)