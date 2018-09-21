---
title: Nodes
weight:
aliases:
---

After you launch a Kubernetes cluster in Rancher, you can manage individual nodes from the cluster's **Node** tab. Depending on the [option used]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) to provision the cluster, there are different node options available.

>**Note:** If you want to manage the _cluster_ and not individual nodes, see [Editing Clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters).

To manage individual nodes, browse to the cluster that you want to manage and then select **Nodes** from the main menu. 

The following table lists what node options are available for each [type of cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-options) in Rancher. Click the links in the **Option** column for more detailed information about each feature.

| Option                                           | [Node Pool][1]                                   | [Custom Node][2] | [Hosted Cluster][3] | [Imported Nodes][4] | Description                                                        |
| ------------------------------------------------ | ------------------------------------------------ | ---------------- | ------------------- | ------------------- | ------------------------------------------------------------------ |
| [Cordon](#cordoning-a-node)                      | ✓                                                | ✓                | ✓                   |                     | Marks the node as unschedulable.                                   |
| [Drain](#draining-a-node)                        | ✓                                                | ✓                | ✓                   |                     | Marks the node as unschedulable _and_ terminates all pods.         |
| [Edit](#editing-a-node)                          | ✓                                                | ✓                | ✓                   |                     | Enter a **Custom Name**, **Description**, or **Label** for a node. |
| [View API](#viewing-a-node-api)                  | ✓                                                | ✓                | ✓                   |                     | View API data.                                                     |
| [Delete](#deleting-a-node)                       | ✓                                                | ✓                |                     |                     | Deletes defective nodes from the cluster.                          |
| [Download Keys](#remoting-into-a-node-pool-node) | ✓                                                | ✓                |                     |                     | Download SSH key pair to remote into the node.                     |
| [Node Scaling](#scaling-nodes)                   | ✓                                                |                  |                     |                     | Scale the number of nodes in the cluster up or down.               |

[1]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/
[2]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/
[3]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/
[4]: {{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/

## Cordoning a Node

_Cordoning_ is the process of marking the node as unschedulable without affecting its pods. This feature is useful for performing short tasks during small maintenance windows. 


## Draining a Node

_Draining_ is the process of gracefully terminate all pods on the node while marking the node as unschedulable.
This feature is useful for preventing new pods from landing on the node while you are trying to get them off for longer maintenance tasks.

For pods with a replica set, the pod is replaced by a new pod that will be scheduled to a new node. Additionally, if the pod is part of a service, then clients will automatically be redirected to the new pod.

For pods with no replica set, you need to bring up a new copy of the pod, and assuming it is not part of a service, redirect clients to it.

After you've drained a node an performed maintenance, make it scheduleable against by uncordoning it.

## Editing a Node

Editing a node lets you change its name, add a description of the node, or add [labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

## Viewing a Node API

## Deleting a Node

Use **Delete** to remove defective nodes from the cloud provider. When you the delete a defective node, Rancher automatically replaces it with an identically provisioned node.

## Scaling Nodes

## Notes for Node Pool Nodes
 
Clusters provisioned using [one of the node pool options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) automatically maintain the node scale that's set during the initial cluster provisioning. This scale determines the number of active nodes that Rancher maintains for the cluster. 

 
## Notes for Nodes Provisioned by Hosted Kubernetes Providers

Options for managing nodes [hosted by a Kubernetes provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) are somewhat limited in Rancher. Rather than using the Rancher UI to make edits such as scaling the number of nodes up or down, edit the cluster directly.


## Notes for Imported Nodes

Although you can deploy workloads to an [imported cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/) using Rancher, you cannot manage individual cluster nodes. All management of imported cluster nodes must take place outside of Rancher.

### Remoting into a Node Pool Node

1. From the Node Pool cluster, select **Nodes** from the main menu.
1. Find the node that you want to remote into. Select **Ellipsis (...) > Download Keys**.
    ![Download Keys]({{< baseurl >}}/)img/rancher/download-keys.png

    **Step Result:** A ZIP file containing files used for SSH is downloaded.

1. Extract the ZIP file to any location.
1. Open Terminal. Change your location to the extracted ZIP file.
1. Enter the following command:

    ```
    ssh -i id_rsa root@<IP_OF_HOST>
    ```
