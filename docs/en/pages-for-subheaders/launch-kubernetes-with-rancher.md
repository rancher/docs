---
title: Launching Kubernetes with Rancher
weight: 4
---

You can have Rancher launch a Kubernetes cluster using any nodes you want. When Rancher deploys Kubernetes onto these nodes, you can choose between [Rancher Kubernetes Engine](https://rancher.com/docs/rke/latest/en/) (RKE) or [RKE2](https://docs.rke2.io) distributions. Rancher can launch Kubernetes on any computers, including:

- Bare-metal servers
- On-premise virtual machines
- Virtual machines hosted by an infrastructure provider

Rancher can install Kubernetes on existing nodes, or it can dynamically provision nodes in an infrastructure provider and install Kubernetes on them.

Rancher can also create pools of nodes. One benefit of installing Kubernetes on node pools hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher can automatically create another node to join the cluster to ensure that the count of the node pool is as expected.

## RKE

### Requirements

If you use RKE to set up a cluster, your nodes must meet the [requirements](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/node-requirements-for-rancher-managed-clusters.md) for nodes in downstream user clusters.

### Launching Kubernetes on New Nodes in an Infrastructure Provider

Using Rancher, you can create pools of nodes based on a [node template](use-new-nodes-in-an-infra-provider.md#node-templates). This node template defines the parameters you want to use to launch nodes in your cloud providers.

One benefit of installing Kubernetes on node pools hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher can automatically create another node to join the cluster to ensure that the count of the node pool is as expected.

For more information, refer to the section on [launching Kubernetes on new nodes.](use-new-nodes-in-an-infra-provider.md)

### Launching Kubernetes on Existing Custom Nodes

In this scenario, you want to install Kubernetes on bare-metal servers, on-prem virtual machines, or virtual machines that already exist in a cloud provider. With this option, you will run a Rancher agent Docker container on the machine.

If you want to reuse a node from a previous custom cluster, [clean the node](../how-to-guides/advanced-user-guides/manage-clusters/clean-cluster-nodes.md) before using it in a cluster again. If you reuse a node that hasn't been cleaned, cluster provisioning may fail.

For more information, refer to the section on [custom nodes.](use-existing-nodes.md)

# Programmatically Creating RKE Clusters

The most common way to programmatically deploy RKE clusters through Rancher is by using the Rancher2 Terraform provider. The documentation for creating clusters with Terraform is [here.](https://registry.terraform.io/providers/rancher/rancher2/latest/docs/resources/cluster)

## RKE2

Rancher v2.6 introduced provisioning for [RKE2](https://docs.rke2.io/) clusters directly from the Rancher UI. RKE2, also known as RKE Government, is a fully conformant Kubernetes distribution that focuses on security and compliance within the U.S. Federal Government sector. In Rancher v.2.6.4 and earlier, RKE2 provisioning was in tech preview.

Note that in Rancher v2.6.5, RKE2 provisioning became GA.

### Requirements

If you use RKE2 to set up a cluster, your nodes must meet the [requirements](https://docs.rke2.io/install/requirements/) for nodes in downstream user clusters.

### Launching Kubernetes on New Nodes in an Infrastructure Provider

RKE2 provisioning is built on top of a new provisioning framework that leverages the upstream [Cluster API](https://github.com/kubernetes-sigs/cluster-api) project. With this new provisioning framework, you can:

- Provision RKE2 clusters onto any provider for which Rancher has a node driver
- Fully configure RKE2 clusters within Rancher
- Choose CNI options Calico, Cilium, and Multus in addition to Canal

RKE2 provisioning also includes installing RKE2 on clusters with Windows nodes. 

Windows features for RKE2 include:

- Windows supports the vSphere node driver
- Calico CNI for Windows RKE2 custom clusters 
- Project Network Isolation (PNI) for Calico
- Windows Containers with RKE2 powered by containerd
- Provisioning of Windows RKE2 clusters through Terraform
- Provisioning of Windows RKE2 custom clusters directly from the Rancher UI

Windows Support for RKE2 Custom Clusters requires choosing Calico as the CNI.

### Launching Kubernetes on Existing Custom Nodes

RKE2 provisioning also allows you to install custom clusters on pre-provisioned VMs or bare-metal nodes.

If you want to reuse a node from a previous custom cluster, clean the node before using it in a cluster again. If you reuse a node that hasn't been cleaned, cluster provisioning may fail.

# Programmatically Creating RKE2 Clusters

The most common way to programmatically deploy RKE2 clusters through Rancher is by using the Rancher2 Terraform provider. The documentation for creating clusters with Terraform is [here.](https://registry.terraform.io/providers/rancher/rancher2/latest/docs/resources/cluster_v2)