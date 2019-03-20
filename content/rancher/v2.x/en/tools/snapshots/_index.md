---
title: Snapshots
weight: 10000
---

_Available as of v2.2.0_

In the Rancher UI, etcd backup and recovery for [Rancher launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) can be easily performed. Snapshots of the etcd database are taken and saved either [locally on to the etcd nodes](#test) or to a S3 compatible target. The advantages of configuring S3 is that if all etcd nodes are lost, your snapshot is saved remotely and can be used to restore the cluster.

Rancher recommends enabling the ability to set up recurring snapshots, but one-time snapshots can easily be taken as well.  

## Configuring Recurring Snapshots for the Cluster

By default, any [Rancher launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) are enabled to take recurring snapshots that are saved locally. If you have any Rancher launched Kubernetes clusters that were created prior to v2.2.0, you can enable recurring snapshots by editing the existing cluster.

During cluster provisioning or editing the cluster, the configuration about snapshots are in the advanced section for **Cluster Options**. Click on **Show advanced options**.

In the **Advanced Cluster Options** section, there are several options available to configure:

| Option | Description | Default Value|
| --- | ---| --- |
|[etcd Snapshot Backup Target](#snapshot-backup-targets)| Select where you want the snapshots to be saved. Options are either local or in S3 | local|
|Recurring etcd Snapshot Enabled| Enable/Disable recurring snapshots | Yes|
|[Recurring etcd Snapshot Creation Period](#snapshot-creation-period-and-retention-count) | Time in hours between recurring snapshots| 12 hours |
|[Recurring etcd Snapshot Retention Count](#snapshot-creation-period-and-retention-count)| Number of snapshots to retain| 6 |

### Snapshot Backup Targets

Rancher supports two different backup targets:

* [Local Target](#local-backup-target)
* [S3 Target](#s3-backup-target)

#### Local Backup Target

By default, the `local` backup target is selected. The benefits of this option is that there is no external configuration. Snapshots are automatically saved locally to the etcd nodes in the [Rancher launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/). All recurring snapshots are taken at configured [intervals](#intervals). The downside of using the `local` backup target is that if there is a total disaster and _all_ etcd nodes are lost, there is no ability to restore the cluster.

#### S3 Backup Target

The `S3` backup target allows users to configure a S3 compatible backend to store the snapshots. The main benefit of this option is that if the cluster loses all the etcd nodes, the cluster can still be restored as the snapshots are stored externally. The downside of using the `S3` backup target is that additional configuration is required in order to have these snapshots saved remotely.

| Option | Description | Required|
|---|---|---|
|S3 Bucket Name| S3 bucket name where backups will be stored| *|
|S3 Region|S3 region for the backup bucket| |
|S3 Region Endpoint|S3 regions endpoint for the backup bucket|* |
|S3 Access Key|S3 access key with permission to access the backup bucket|*|
|S3 Secret Key|S3 secret key with permission to access the backup bucket|*|

### Snapshot Creation Period and Retention Count

Select how often you want recurring snapshots to be taken as well as how many snapshots to keep. The amount of time is measured in hours. With timestamped snapshots, the user has the ability to do a point-in-time recovery.

## One-Time Snapshots

Besides recurring snapshots, you might want to take a one-time snapshot in specific use cases. For example, if you're about to upgrade the Kubernetes version of your cluster, you might want to take a snapshot right before the upgrade.

1. In the **Global** view, navigate to the cluster that you want to take a one-time snapshot.

2. Click the **Vertical Ellipsis (...) > Snapshot Now**.

**Result:** Based on your [snapshot backup target](#snapshot-backup-targets), a one-time snapshot will be taken and saved in the selected backup target.

## Viewing Available snapshots

The list of all available snapshots for the cluster is available.

1. In the **Global** view, navigate to the cluster that you want to view snapshots.

2. Click **Tools > Snapshots** from the navigation bar to view the list of saved snapshots. These snapshots include a timestamp of when they were created.

## Restoring your Cluster from a Snapshot

If your Kubernetes cluster is broken, you can restore the cluster from a snapshot.

1. In the **Global** view, navigate to the cluster that you want to view snapshots.

2. Click the **Vertical Ellipsis (...) > Restore Snapshot**.

3. Select the snapshot that you want to use for restoring your cluster from the dropdown of available snapshots. Click **Save**.

    > **Note:** Snapshots from S3 can only be restored from if the cluster is configured to take recurring snapshots on S3.

**Result:** The cluster will go into `updating` state and the process of restoring the `etcd` nodes from the snapshot will start. The cluster is restored when it returns to an `active` state.

> **Note**: If you are restoring a cluster with unavailable etcd nodes, it's recommended that all etcd nodes are removed from  Rancher before attempting to restore. For clusters that were provisioned using [nodes hosted in an infrastructure provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/), new etcd nodes will automatically be created. For [custom clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/), please ensure that you add new etcd nodes to the cluster.   
