---
title: Creating a Nutanix AOS Cluster
shortTitle: Nutanix
description: Use Rancher to create a Nutanix AOS (AHV) cluster. It may consist of groups of VMs with distinct properties which allow for fine-grained control over the sizing of nodes. 
metaDescription: Use Rancher to create a Nutanix AOS (AHV) cluster. It may consist of groups of VMs with distinct properties which allow for fine-grained control over the sizing of nodes. 
weight: 2225
---

[Nutanix Acropolis Operating System](https://www.nutanix.com/products/acropolis) (Nutanix AOS) is an operating system for the Nutanix hyper-converged infrastructure platform. AOS comes with a built-in hypervisor called [Acropolis Hypervisor](https://www.nutanix.com/products/ahv), or AHV. By using Rancher with Nutanix AOS (AHV), you can bring cloud operations on-premises.

Rancher can provision nodes in AOS (AHV) and install Kubernetes on them. When creating a Kubernetes cluster in AOS, Rancher first provisions the specified number of virtual machines by communicating with the Prism Central API. Then it installs Kubernetes on top of the VMs.

A Nutanix cluster may consist of multiple groups of VMs with distinct properties, such as the amount of memory or the number of vCPUs. This grouping allows for fine-grained control over the sizing of nodes for each Kubernetes role.

- [Creating a Nutanix Cluster](cluster-provisioning/rke-clusters/node-pools/nutanicluster-provisioning/rke-clusters/node-pools/nutanix/provisioning-nutanix-clusters/#creating-a-nutanix-aos-cluster)
- [Provisioning Storage](cluster-provisioning/rke-clusters/node-pools/nutanicluster-provisioning/rke-clusters/node-pools/nutanix/provisioning-nutanix-clusters)

# Creating a Nutanix Cluster

In [this section,](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/launch-kubernetes-with-rancher/use-new-nodes-in-an-infra-provider/nutanix/provision-kubernetes-clusters-in-aos.md) you'll learn how to use Rancher to install an [RKE](https://rancher.com/docs/rke/latest/en/) Kubernetes cluster in Nutanix AOS.