---
title: Legacy Backup and Restore Documentation
weight: 6
---

This section is devoted to protecting your data in a disaster scenario.

To protect yourself from a disaster scenario, you should create backups on a regular basis.

  - Rancher server backups:
    - [Rancher installed on a K3s Kubernetes cluster](./backups/k3s-backups)
    - [Rancher installed on an RKE Kubernetes cluster](./backups/ha-backups)
  - [Backing up Rancher Launched Kubernetes Clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/backing-up-etcd/)

In a disaster scenario, you can restore your `etcd` database by restoring a backup.

   - [Rancher Server Restorations]({{<baseurl>}}/rancher/v2.x/en/backups/restorations)
   - [Restoring Rancher Launched Kubernetes Clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/restoring-etcd/)

For Rancher installed with Docker, the backup and restore procedure is the same in Rancher v2.5. The backup and restore instructions for Docker installs are [here.]({{<baseurl>}}/rancher/v2.x/en/backups/docker-installs)