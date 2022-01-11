---
title: Launching Kubernetes with Rancher
weight: 4
---

You can have Rancher launch a Kubernetes cluster using any nodes you want. When Rancher deploys Kubernetes onto these nodes, it uses [Rancher Kubernetes Engine]({{<baseurl>}}/rke/latest/en/) (RKE), which is Rancher's own lightweight Kubernetes installer. It can launch Kubernetes on any computers, including:

- Bare-metal servers
- On-premise virtual machines
- Virtual machines hosted by an infrastructure provider

Rancher can install Kubernetes on existing nodes, or it can dynamically provision nodes in an infrastructure provider and install Kubernetes on them.

RKE clusters include clusters that Rancher launched on Windows nodes or other existing custom nodes, as well as clusters that Rancher launched with new nodes on Azure, Digital Ocean, EC2, or vSphere.

### Changes in Rancher v2.6

_Tech Preview_

Rancher v2.6 introduces provisioning for [RKE2](https://docs.rke2.io/) clusters directly from the Rancher UI. RKE2, also known as RKE Government, is a fully conformant Kubernetes distribution that focuses on security and compliance within the U.S. Federal Government sector.

RKE2 provisioning is built on top of a new provisioning framework that leverages the upstream [Cluster API](https://github.com/kubernetes-sigs/cluster-api) project. With this new provisioning framework, you can:

- Provision RKE2 clusters on Digital Ocean, AWS EC2, Azure, and vSphere
- Fully configure RKE2 clusters within Rancher
- Choose CNI options Calico, Cilium, and Multus in addition to Canal
- Install custom RKE2 clusters on pre-provisioned VMs or bare-metal nodes

The RKE2 provisioning tech preview also includes installing RKE2 on Windows clusters. Windows features for RKE2 include:

- Windows Containers with RKE2 powered by containerd
- Added provisioning of Windows RKE2 custom clusters directly from the Rancher UI
- Calico CNI for Windows RKE2 custom clusters. 
- SAC releases of Windows Server (2004 and 20H2) are included in the technical preview.

Windows Support for RKE2 Custom Clusters requires choosing Calico as the CNI.

### Requirements

If you use RKE to set up a cluster, your nodes must meet the [requirements]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/node-requirements) for nodes in downstream user clusters.

### Launching Kubernetes on New Nodes in an Infrastructure Provider

Using Rancher, you can create pools of nodes based on a [node template]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This node template defines the parameters you want to use to launch nodes in your cloud providers.

One benefit of installing Kubernetes on node pools hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher can automatically create another node to join the cluster to ensure that the count of the node pool is as expected.

For more information, refer to the section on [launching Kubernetes on new nodes.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/node-pools/)

### Launching Kubernetes on Existing Custom Nodes

In this scenario, you want to install Kubernetes on bare-metal servers, on-prem virtual machines, or virtual machines that already exist in a cloud provider. With this option, you will run a Rancher agent Docker container on the machine.

If you want to reuse a node from a previous custom cluster, [clean the node]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/cleaning-cluster-nodes/) before using it in a cluster again. If you reuse a node that hasn't been cleaned, cluster provisioning may fail.

For more information, refer to the section on [custom nodes.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/custom-nodes/)
