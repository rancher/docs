---
title: Nodes
weight:
aliases:
---

After you launch a Kubernetes cluster in Rancher, you can manage individual nodes from the cluster's **Node** tab. Depending on the [option used]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) to provision the cluster, there are different node options available.


To manage individual nodes, browse to the cluster that you want to manage and then select **Nodes** from the main menu. You can open the options menu for a node by clicking its **Ellipsis** icon (**...**).

![Node Options]({{< baseurl >}}/img/rancher/node-edit.png)

>**Note:** If you want to manage the _cluster_ and not individual nodes, see [Editing Clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters).

The following table lists which node options are available for each [type of cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-options) in Rancher. Click the links in the **Option** column for more detailed information about each feature.

| Option                                           | [Node Pool][1]                                   | [Custom Node][2] | [Hosted Cluster][3] | [Imported Nodes][4] | Description                                                        |
| ------------------------------------------------ | ------------------------------------------------ | ---------------- | ------------------- | ------------------- | ------------------------------------------------------------------ |
| [Cordon](#cordoning-a-node)                      | ✓                                                | ✓                | ✓                   |                     | Marks the node as unschedulable.                                   |
| [Drain](#draining-a-node)                        | ✓                                                | ✓                | ✓                   |                     | Marks the node as unschedulable _and_ evicts all pods.             |
| [Edit](#editing-a-node)                          | ✓                                                | ✓                | ✓                   |                     | Enter a custom name, description, or label for a node. |
| [View API](#viewing-a-node-api)                  | ✓                                                | ✓                | ✓                   |                     | View API data.                                                     |
| [Delete](#deleting-a-node)                       | ✓                                                | ✓                |                     |                     | Deletes defective nodes from the cluster.                          |
| [Download Keys](#remoting-into-a-node-pool-node) | ✓                                                |                  |                     |                     | Download SSH key for remoting into the node.                     |
| [Node Scaling](#scaling-nodes)                   | ✓                                                |                  |                     |                     | Scale the number of nodes in the node pool up or down.               |

[1]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/
[2]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/
[3]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/
[4]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/

## Cordoning a Node

_Cordoning_ a node marks it as unschedulable. This feature is useful for performing short tasks on the node during small maintenance windows, like reboots, upgrades, or decommissions.  When you're done, power back on and make the node schedulable again by uncordoning it.

## Draining a Node

_Draining_ is the process of first cordoning the node, and then evicting all its pods. This feature is useful for performing node maintenance (like kernel upgrades or hardware maintenance). It prevents new pods from deploying to the node while redistributing existing pods so that users don't experience service interruption.

- For pods with a replica set, the pod is replaced by a new pod that will be scheduled to a new node. Additionally, if the pod is part of a service, then clients will automatically be redirected to the new pod.

- For pods with no replica set, you need to bring up a new copy of the pod, and assuming it is not part of a service, redirect clients to it.
 
You can drain nodes that are in either a `cordoned` or `active` state. When you drain a node, the node is cordoned, the nodes are evaluated for conditions they must meet to be drained, and then (if it meets the conditions) the node evicts its pods. 

However, you can override the conditions draining when you initiate the drain (see [below](#below)). You're also given an opportunity to set a grace period and timeout value.

![Drain]({{< baseurl >}}/img/rancher/node-drain.png)

<a id="below"></a>
The following list describes each drain option:

- **Even if there are pods not managed by a ReplicationController, ReplicaSet, Job, DaemonSet or StatefulSet**
 
    These types of pods won't get rescheduled to a new node, since they do not have a controller. Kubernetes expects you to have your own logic that handles the deletion of these pods. Kubernetes forces you to choose this option (which will delete/evict these pods) or drain won't proceed.

- **Even if there are DaemonSet-managed pods**

    Similar to above, if you have any daemonsets, drain would proceed only if this option is selected. Even when this option is on, pods won't be deleted since they'll immediately be replaced. On startup, Rancher currently has a few daemonsets running by default in the system, so this option is turned on by default.

- **Even if there are pods using emptyDir**
 
    If a pod uses emptyDir to store local data, you might not be able to safely delete it, since the data in the emptyDir will be deleted once the pod is removed from the node. Similar to the first option, Kubernetes expects the implementation to decide what to do with these pods. Choosing this option will delete these pods. 

- **Grace Period**

    The timeout given to each pod for cleaning things up, so they will have chance to exit gracefully. For example, when pods might need to finish any outstanding requests, roll back transactions or save state to some external storage. If negative, the default value specified in the pod will be used. 

- **Timeout**  

    The amount of time drain should continue to wait before giving up.

    >**Kubernetes Known Issue:** Currently, the [timeout setting](https://github.com/kubernetes/kubernetes/pull/64378) is not enforced while draining a node. This issue will be corrected as of Kubernetes 1.12.

If there's any error related to user input, the node enters a `cordoned` state because the drain failed. You can either correct the input and attempt to drain the node again, or you can abort by uncordoning the node.

If the drain continues without error, the node enters a `draining` state. You'll have the option to stop the drain when the node is in this state, which will stop the drain process and change the node's state to `cordoned`.

Once drain successfully completes, the node will be in a state of `drained`. You can then power off or delete the node.

>**Want to know more about cordon and drain?** See the [Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/cluster-management/#maintenance-on-a-node).


## Editing a Node

Editing a node lets you change its name, add a description of the node, or add [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).


## Viewing a Node API

Select this option to view the node's [API endpoints]({{< baseurl >}}/rancher/v2.x/en/api/).


## Deleting a Node

Use **Delete** to remove defective nodes from the cloud provider. When you the delete a defective node, Rancher automatically replaces it with an identically provisioned node.

>**Tip:** If your cluster is hosted by an infrastructure provider, and you want to scale your cluster down instead of deleting a defective node, [scale down](#scaling-nodes) rather than delete.


## Scaling Nodes

For nodes hosted by an infrastructure provider, you can scale the number of nodes in each node pool by using the scale controls. This option isn't available for other cluster types.

![Scaling Nodes]({{< baseurl >}}/img/rancher/iaas-scale-nodes.png)


## Remoting into a Node Pool Node

For [nodes hosted by an infrastructure provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/), you have the option of downloading its SSH key so that you can connect to it remotely from your desktop.


1. From the Node Pool cluster, select **Nodes** from the main menu.

1. Find the node that you want to remote into. Select **Ellipsis (...) > Download Keys**.

    **Step Result:** A ZIP file containing files used for SSH is downloaded.

1. Extract the ZIP file to any location.

1. Open Terminal. Change your location to the extracted ZIP file.

1. Enter the following command:

    ```
    ssh -i id_rsa root@<IP_OF_HOST>
    ```

## Notes for Node Pool Nodes
 
Clusters provisioned using [one of the node pool options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) automatically maintain the node scale that's set during the initial cluster provisioning. This scale determines the number of active nodes that Rancher maintains for the cluster. 

 
## Notes for Nodes Provisioned by Hosted Kubernetes Providers

Options for managing nodes [hosted by a Kubernetes provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) are somewhat limited in Rancher. Rather than using the Rancher UI to make edits such as scaling the number of nodes up or down, edit the cluster directly.


## Notes for Imported Nodes

Although you can deploy workloads to an [imported cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/) using Rancher, you cannot manage individual cluster nodes. All management of imported cluster nodes must take place outside of Rancher.

