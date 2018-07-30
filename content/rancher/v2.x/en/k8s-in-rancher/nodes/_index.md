---
title: Nodes
weight:
aliases:
---

After you launch a Kubernetes cluster in Rancher, you can manage individual nodes from the cluster's **Node** tab. Depending on the [option used]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) to provision the cluster, there are different node options available.

>**Note:** If you want to manage the _cluster_ and not individual nodes, see [Editing Clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters).

To manage individual nodes, browse to the cluster that you want to manage and then select **Nodes** from the main menu. The following sections list what node management options are available for each cluster type.

<!-- TOC -->

- [Nodes Provisioned by Node Pool](#nodes-provisioned-by-node-pool)
- [Nodes Provisioned with the Custom Nodes Option](#nodes-provisioned-with-the-custom-nodes-option)
- [Nodes Provisioned by Hosted Kubernetes Providers](#nodes-provisioned-by-hosted-kubernetes-providers)
- [Imported Nodes](#imported-nodes)

<!-- /TOC -->


## Nodes Provisioned by Node Pool
 
Clusters provisioned using [one of the node pool options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) automatically maintain the node scale that's set during the initial cluster provisioning. This scale determines the number of active nodes that Rancher maintains for the cluster. 

- Mark nodes as unschedulable (i.e., **Cordon**). When a node is cordoned, no new pods are scheduled for the node, but the existing pods continue to run.
- Delete defective nodes from the cloud provider. When you the delete a defective node, Rancher automatically replaces it with an identically provisioned node.
    
    >**Note:** If you want to scale down the number of nodes, use the scaling controls rather than deleting the node.
- Scale the number of nodes in the cluster up or down.
- Enter a **Custom Name**, **Description**, or **Label** for a node.
- Download the SSH key pair for a node. You can use this key pair to remote into the node using an SSH connection from your workstation. For more instructions on how to remote into the node, see [Remoting into a Node Pool Node](#remoting-into-a-node-pool-node).
- View API Data.

### Remoting into a Node Pool Node

1. From the Node Pool cluster, select **Nodes** from the main menu.
1. Find the node that you want to remote into. Select **Ellipsis (...) > Download Keys**.

    **Step Result:** A ZIP file containing files used for SSH is downloaded.

1. Extract the ZIP file to any location.
1. Open Terminal. Change your location to the extracted ZIP file.
1. Enter the following command:

    ```
    ssh -i id_rsa root@<IP_OF_HOST>
    ```

## Nodes Provisioned with the Custom Nodes Option

For nodes provisioned using the [custom nodes option]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#custom-nodes), you can use the following options from the Rancher UI:

- Mark nodes as unschedulable (i.e., **Cordon**). When a node is cordoned, no new pods are scheduled for the node, but the existing pods continue to run.
- Delete node objects from the **Nodes** ist. When you the delete a custom node, you still have to delete it from the node itself.
- Enter a **Custom Name**, **Description**, or **Label** for a node.
- View API Data.
 
## Nodes Provisioned by Hosted Kubernetes Providers

Options for managing nodes [hosted by a Kubernetes provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) are somewhat limited in Rancher. To make edits such as scaling the number of nodes up or down, use the hosted provider's Web console rather than Rancher UI.

From the Rancher UI, you can:

- Mark nodes as unschedulable (i.e., **Cordon**). When a node is cordoned, no new pods are scheduled for the node, but the existing pods continue to run.
- Enter a **Custom Name**, **Description**, or **Label** for a node.
- View node API Data.

## Imported Nodes

Although you can deploy workloads to an [imported cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/) using Rancher, you cannot manage individual cluster nodes. All management of imported cluster nodes must take place outside of Rancher.
