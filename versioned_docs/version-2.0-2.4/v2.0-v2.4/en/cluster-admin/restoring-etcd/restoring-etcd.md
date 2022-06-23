---
title: Restoring a Cluster from Backup 
weight: 2050
---

_Available as of v2.2.0_

etcd backup and recovery for [Rancher launched Kubernetes clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) can be easily performed. Snapshots of the etcd database are taken and saved either locally onto the etcd nodes or to a S3 compatible target. The advantages of configuring S3 is that if all etcd nodes are lost, your snapshot is saved remotely and can be used to restore the cluster.

Rancher recommends enabling the [ability to set up recurring snapshots of etcd]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/backing-up-etcd/#configuring-recurring-snapshots), but [one-time snapshots]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/backing-up-etcd/#one-time-snapshots) can easily be taken as well. Rancher allows restore from [saved snapshots](#restoring-a-cluster-from-a-snapshot) or if you don't have any snapshots, you can still [restore etcd](#recovering-etcd-without-a-snapshot).

As of Rancher v2.4.0, clusters can also be restored to a prior Kubernetes version and cluster configuration.

This section covers the following topics:

- [Viewing Available Snapshots](#viewing-available-snapshots)
- [Restoring a Cluster from a Snapshot](#restoring-a-cluster-from-a-snapshot)
- [Recovering etcd without a Snapshot](#recovering-etcd-without-a-snapshot)
- [Enabling snapshot features for clusters created before Rancher v2.2.0](#enabling-snapshot-features-for-clusters-created-before-rancher-v2-2-0)

## Viewing Available Snapshots

The list of all available snapshots for the cluster is available.

1. In the **Global** view, navigate to the cluster that you want to view snapshots.

2. Click **Tools > Snapshots** from the navigation bar to view the list of saved snapshots. These snapshots include a timestamp of when they were created.

## Restoring a Cluster from a Snapshot

If your Kubernetes cluster is broken, you can restore the cluster from a snapshot.

Restores changed in Rancher v2.4.0.

{{% tabs %}}
{{% tab "Rancher v2.4.0+" %}}

Snapshots are composed of the cluster data in etcd, the Kubernetes version, and the cluster configuration in the `cluster.yml.` These components allow you to select from the following options when restoring a cluster from a snapshot:

- **Restore just the etcd contents:** This restore is similar to restoring to snapshots in Rancher before v2.4.0.
- **Restore etcd and Kubernetes version:** This option should be used if a Kubernetes upgrade is the reason that your cluster is failing, and you haven't made any cluster configuration changes.
- **Restore etcd, Kubernetes versions and cluster configuration:** This option should be used if you changed both the Kubernetes version and cluster configuration when upgrading.

When rolling back to a prior Kubernetes version, the [upgrade strategy options]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/upgrading-kubernetes/#configuring-the-upgrade-strategy) are ignored. Worker nodes are not cordoned or drained before being reverted to the older Kubernetes version, so that an unhealthy cluster can be more quickly restored to a healthy state.

> **Prerequisite:** To restore snapshots from S3, the cluster needs to be configured to [take recurring snapshots on S3.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/backing-up-etcd/#configuring-recurring-snapshots)

1. In the **Global** view, navigate to the cluster that you want to restore from a snapshots.

2. Click the **&#8942; > Restore Snapshot**.

3. Select the snapshot that you want to use for restoring your cluster from the dropdown of available snapshots.

4. In the **Restoration Type** field, choose one of the restore options described above.

5. Click **Save**.

**Result:** The cluster will go into `updating` state and the process of restoring the `etcd` nodes from the snapshot will start. The cluster is restored when it returns to an `active` state.

{{% /tab %}}
{{% tab "Rancher before v2.4.0" %}}

> **Prerequisites:** 
>
> - Make sure your etcd nodes are healthy. If you are restoring a cluster with unavailable etcd nodes, it's recommended that all etcd nodes are removed from Rancher before attempting to restore. For clusters in which Rancher used node pools to provision [nodes in an infrastructure provider]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/), new etcd nodes will automatically be created. For [custom clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes/), please ensure that you add new etcd nodes to the cluster.
> - To restore snapshots from S3, the cluster needs to be configured to [take recurring snapshots on S3.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/backing-up-etcd/#configuring-recurring-snapshots)

1. In the **Global** view, navigate to the cluster that you want to restore from a snapshot.

2. Click the **&#8942; > Restore Snapshot**.

3. Select the snapshot that you want to use for restoring your cluster from the dropdown of available snapshots.

4. Click **Save**. 

**Result:** The cluster will go into `updating` state and the process of restoring the `etcd` nodes from the snapshot will start. The cluster is restored when it returns to an `active` state.

{{% /tab %}}
{{% /tabs %}}

## Recovering etcd without a Snapshot

If the group of etcd nodes loses quorum, the Kubernetes cluster will report a failure because no operations, e.g. deploying workloads, can be executed in the Kubernetes cluster. The cluster should have three etcd nodes to prevent a loss of quorum. If you want to recover your set of etcd nodes, follow these instructions:

1. Keep only one etcd node in the cluster by removing all other etcd nodes.

2. On the single remaining etcd node, run the following command:

    ```
    $ docker run --rm -v /var/run/docker.sock:/var/run/docker.sock assaflavie/runlike etcd
    ```

    This command outputs the running command for etcd, save this command to use later.

3. Stop the etcd container that you launched in the previous step and rename it to `etcd-old`.

    ```
    $ docker stop etcd
    $ docker rename etcd etcd-old
    ```

4. Take the saved command from Step 2 and revise it:

    - If you originally had more than 1 etcd node, then you need to change `--initial-cluster` to only contain the node that remains.
    - Add `--force-new-cluster` to the end of the command.

5. Run the revised command.

6. After the single nodes is up and running, Rancher recommends adding additional etcd nodes to your cluster. If you have a [custom cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes) and you want to reuse an old node, you are required to [clean up the nodes]({{<baseurl>}}/rancher/v2.0-v2.4/en/faq/cleaning-cluster-nodes/) before attempting to add them back into a cluster.  

# Enabling Snapshot Features for Clusters Created Before Rancher v2.2.0

If you have any Rancher launched Kubernetes clusters that were created before v2.2.0, after upgrading Rancher, you must [edit the cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/editing-clusters/) and _save_ it, in order to enable the updated snapshot features. Even if you were already creating snapshots before v2.2.0, you must do this step as the older snapshots will not be available to use to [back up and restore etcd through the UI]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/restoring-etcd/).
