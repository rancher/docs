---
title: Cluster Backups
weight: 10000
---
_Available as of v2.2.0_

Using Rancher, you can now backup and restore your RKE or Custom Kubernetes clusters directly from the UI.

Using Rancher you can can configure local snapshots on your ETCD plane nodes, as well as configure remote backups to an S3 compatible target which allows you to restore your cluster even if all nodes are lost.

When Cluster Backup is enabled, it's also possible to do one-time snapshots along with configured recurring snapshots.

> **Note:** Cluster Backup is only available for [RKE Clusters]({{< baseurl >}}rancher/v2.x/en/cluster-provisioning/rke-clusters/) and [Custom Clusters]({{< baseurl >}}rancher/v2.x/en/cluster-provisioning/custom-clusters/).

## Configuring Cluster Backups
As of version 2.0.0, all newly RKE provisioned clusters have Local Cluster recurring Snapshots enabled by default. For RKE clusters provisioned with an older versions of Rancher, see [How to enable Cluster backups for existing clusters]({{< baseurl >}}/rancher/v2.x/en/tools/cluster-backups/existing-clusters/)

To configure or disable Cluster Backups, you need to access the Cluster Backup configuration section. This is available during initial cluster configuration or later by editing the cluster.
- While on the **Add Cluster** or **Edit** cluster view, click on **Show advanced options**
- Click on the "Advanced Cluster Options" tab to expand the configuration.

| Option | Description | Default value|
| --- | ---| --- |
|etcd Snapshot Backup Target| Select cluster backup target | local|
|Recurring etcd Snapshot Enabled| Enable/Disable recurring snapshot | Yes|
|Recurring etcd Snapshot Creation Period | Time in hours between recurring|  snapshots| 12 hours |
|Recurring etcd Snapshot Retention Count| Number of snapshots to retain| 6 |

## Cluster Backup Targets
Rancher Cluster Backup support two different backup targets:

* [Local Target](#local-target)
* [S3 Target](#s3-target)

## Local Backup Target
Local Backup target is the most basic option. It's enabled by default for all newly RKE provisioned clusters.

Local Backup target works by saving local ETCD snapshot on all ETCD plane nodes at a pre-configured interval. This provides the user an ability to do point-in-time recovery, or recover from a broken ETCD cluster. However, it doesn't provide the ability to recover if all the ETCD plane nodes are lost, since the snapshots are stored locally on the nodes.


## S3 Backup Target
S3 Backup target allows the user to configure an S3 compatible backend as a remote snapshot storage.

Having the snapshots stored remotely provides a lot of flexibility. In addition to point-in-time recovery and recovering broken ETCD cluster, this targets allows the user to recover the cluster from disaster situations like losing all nodes on the ETCD plane. In other words, it essentially lets the user to replace a broken cluster by restoring from a remote backup.

When S3 target is enabled, additional configuration is required to set it up:

| Option | Description | Required|
|---|---|---|
|S3 Bucket Name| S3 bucket name where backups will be stored| Yes|
|S3 Region|S3 region for the backup bucket|No|
|S3 Region Endpoint|S3 regions endpoint for the backup bucket|Yes|
|S3 Access Key|S3 access key with permission to access the backup bucket|Yes|
|S3 Secret Key|S3 secret key with permission to access the backup bucket|Yes|

## Backing Up Your Cluster
Once backup is enabled for a cluster, the backup controller will automatically start taking snapshots of the cluster ETCD database at the configured intervals.

It's also possible to take one-time snapshots by going to the global cluster view or the cluster view and clicking **Vertical Elipsis (...) > Snapshot Now** for your cluster.

## Listing Backups
You can list all the available snapshots for your cluster by going to the cluster view and clicking **Tools > Snapshots** from the navigation bar.

## Restoring From Backup
You can restore your cluster from backup at any time by going to the global cluster view or the cluster view and clicking **Vertical Elipsis (...) > Restore Snapshot** for your cluster.

A list of available snapshots will be available to choose from. Once you select a snapshot, click **Save**. The cluster will go into `updating` state and the restore process will start.

**Note:** If you are restoring a cluster with unavailable nodes, It's recommended that you delete the nodes from rancher UI before attempting to restore.

**Note:** It's not possible to restore from snapshots saved on S3 if you don't have S3 target configuration enabled on the cluster level. You need to enable S3 target first before trying to restore from a snapshot saved on S3.
