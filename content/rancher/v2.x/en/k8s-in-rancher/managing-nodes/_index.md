---
title: Managing Nodes
weight:
aliases:
---

After you launch a Kubernetes cluster in Rancher, you can manage individual nodes from the cluster's **Node** tab. Depending on the [option used]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) to provision the cluster, there are different node options available.

>**Note:** If you want to manage the _cluster_ and not individual nodes, see [Editing Clusters]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters).

To manage individual nodes, browse to the cluster that you want to manage and then select **Nodes** from the main menu. The following sections list what node management options are available for each cluster type.

<!-- TOC -->

- [Nodes Provisioned by Hosted Kubernetes Providers](#nodes-provisioned-by-hosted-kubernetes-providers)
- [Nodes Provisioned by Node Pool](#nodes-provisioned-by-node-pool)
- [Nodes Provisioned with the Custom Nodes Option](#nodes-provisioned-with-the-custom-nodes-option)
- [Imported Nodes](#imported-nodes)

<!-- /TOC -->

## Nodes Provisioned by Hosted Kubernetes Providers

Options for managing nodes [hosted by a Kubernetes provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) are somewhat limited in Rancher. To make edits such as scaling the number of nodes up or down, use the hosted provider's Web console rather than Rancher UI.

From the Rancher UI, you can:

- Mark nodes as unschedulable (i.e., **Cordon**).
- Enter a **Custom Name**, **Description**, or **Label** for a node.
- View node API Data.


## Nodes Provisioned by Node Pool
 
Clusters provisioned using [one of the node pool options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-pools) allow you to:

- Mark nodes as unschedulable (i.e., **Cordon**).
- Delete nodes.
- Scale the number of nodes in the cluster up or down.
- Enter a **Custom Name**, **Description**, or **Label** for a node.
- Download the private key that a node uses for SSL/TLS encryption.
- View API Data.

## Nodes Provisioned with the Custom Nodes Option

For nodes provisioned using the [custom nodes option]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#custom-nodes), you can use the following options from the Rancher UI:

- Mark nodes as unschedulable (i.e., **Cordon**).
- Delete nodes
- Enter a **Custom Name**, **Description**, or **Label** for a node.
- Download the private key that a node uses for SSL/TLS encryption.
- View API Data.
 
## Imported Nodes

Although you can deploy workloads to an [imported cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/) using Rancher, you cannot manage individual cluster nodes. All management of imported cluster nodes must take place outside of Rancher.
