---
title: Restoring etcd
weight: 2050
---

_Available as of v2.2.0_

etcd backup and recovery for [Rancher launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) can be easily performed. Snapshots of the etcd database are taken and saved either [locally on to the etcd nodes](#test) or to a S3 compatible target. The advantages of configuring S3 is that if all etcd nodes are lost, your snapshot is saved remotely and can be used to restore the cluster.

Rancher recommends enabling the [ability to set up recurring snapshots of etcd]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/backing-up-etcd/#configuring-recurring-snapshots-for-the-cluster), but [one-time snapshots]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/backing-up-etcd/#one-time-snapshots) can easily be taken as well. Rancher allows restore from [saved snapshots](##restoring-your-cluster-from-a-snapshot) or if you don't have any snapshots, you can still [restore etcd](#recovering-etcd-without-a-snapshot).

>**Note:** If you have any Rancher launched Kubernetes clusters that were created prior to v2.2.0, you must [edit the existing cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/editing-clusters/) and save it in order to [enable the new snapshot features]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/backing-up-etcd/). Even if you had already enabled snapshots prior to v2.2.0, you must do this step as the old snapshots will not be available to back up and restore etcd.

## Viewing Available Snapshots

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

> **Note:** If you are restoring a cluster with unavailable etcd nodes, it's recommended that all etcd nodes are removed from  Rancher before attempting to restore. For clusters that were provisioned using [nodes hosted in an infrastructure provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/), new etcd nodes will automatically be created. For [custom clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/), please ensure that you add new etcd nodes to the cluster.   

## Recovering etcd without a Snapshot

If the group of etcd nodes loses quorum, the Kubernetes cluster will report a failure because no operations, e.g. deploying workloads, can be executed in the Kubernetes cluster. Please review the best practices for the what the [number of etcd nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/production/#count-of-etcd-nodes) should be in a Kubernetes cluster. If you want to recover your set of etcd nodes, follow these instructions:

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

6. After the single nodes is up and running, Rancher recommends adding additional etcd nodes to your cluster. If you have a [custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/) and you want to reuse an old node, you are required to [clean up the nodes]({{< baseurl >}}/rancher/v2.x/en/faq/cleaning-cluster-nodes/) before attempting to add them back into a cluster.  
