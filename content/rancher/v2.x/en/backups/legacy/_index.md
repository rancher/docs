---
title: Legacy Backup and Restore Documentation
weight: 6
---

> This section is under construction.


This section is devoted to protecting your data in a disaster scenario.

To protect yourself from a disaster scenario, you should create backups on a regular basis.

  - Rancher server backups:
    - [Rancher installed on a K3s Kubernetes cluster](./backups/k3s-backups)
    - [Rancher installed on an RKE Kubernetes cluster](./backups/ha-backups)
    - [Rancher installed with Docker](./backups/single-node-backups/)
  - [Backing up Rancher Launched Kubernetes Clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/backing-up-etcd/)

In a disaster scenario, you can restore your `etcd` database by restoring a backup.

   - [Rancher Server Restorations]({{<baseurl>}}/rancher/v2.x/en/backups/restorations)
   - [Restoring Rancher Launched Kubernetes Clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/restoring-etcd/)
