---
title: Backing up Rancher Installed on a K3s Kubernetes Cluster
shortTitle: K3s Installs
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/backups/backups/k3s-backups
  - /rancher/v2.0-v2.4/en/backups/backups/k8s-backups/k3s-backups
  - /rancher/v2.0-v2.4/en/backups/legacy/backup/k8s-backups/k3s-backups/
  - /rancher/v2.0-v2.4/en/backups/legacy/backups/k3s-backups
  - /rancher/v2.0-v2.4/en/backups/legacy/backup/k3s-backups
  - /rancher/v2.0-v2.4/en/backups/v2.0.x-v2.4.x/backup/k3s-backups
---

When Rancher is installed on a high-availability Kubernetes cluster, we recommend using an external database to store the cluster data.

The database administrator will need to back up the external database, or restore it from a snapshot or dump.

We recommend configuring the database to take recurring snapshots.

### K3s Kubernetes Cluster Data

One main advantage of this K3s architecture is that it allows an external datastore to hold the cluster data, allowing the K3s server nodes to be treated as ephemeral.

<figcaption>Architecture of a K3s Kubernetes Cluster Running the Rancher Management Server</figcaption>
![Architecture of an RKE Kubernetes Cluster Running the Rancher Management Server]({{<baseurl>}}/img/rancher/k3s-server-storage.svg)

### Creating Snapshots and Restoring Databases from Snapshots

For details on taking database snapshots and restoring your database from them, refer to the official database documentation:

- [Official MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/replication-snapshot-method.html)
- [Official PostgreSQL documentation](https://www.postgresql.org/docs/8.3/backup-dump.html)
- [Official etcd documentation](https://github.com/etcd-io/etcd/blob/master/Documentation/op-guide/recovery.md)