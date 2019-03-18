---
title: Upgrading Clusters
weight: 10000
---

## Enabling Cluster Backups For Existing Clusters
 Prior to v2.2.0. Legacy RKE based backups were enabled by default. To update your cluster to use Rancher Cluster Backup, you need to apply the following steps:

 - Edit your cluster. While in the **Edit** cluster view, click on **Show advanced options**. The UI will show a notice about upgrading the backup configuration for the cluster.
 - Click on the "Advanced Cluster Options" tab to expand the configuration.
 - Make sure the recurring snapshots are enabled, and the backup configuration are set as needed.
 - Save changes to the cluster.


 Once your cluster is updated, Cluster backups will be enabled and the first backup will be taken shortly.
