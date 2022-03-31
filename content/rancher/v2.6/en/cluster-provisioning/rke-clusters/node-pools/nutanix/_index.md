---
title: Creating a Nutanix AOS Cluster
shortTitle: Nutanix
description: Use Rancher to create a Nutanix AOS (AHV) cluster. It may consist of groups of VMs with distinct properties which allow for fine-grained control over the sizing of nodes. 
metaDescription: Use Rancher to create a Nutanix AOS (AHV) cluster. It may consist of groups of VMs with distinct properties which allow for fine-grained control over the sizing of nodes. 
weight: 2225
---

By using Rancher with Nutanix AOS (AHV), you can bring cloud operations on-premises.

Rancher can provision nodes in AOS (AHV) and install Kubernetes on them. When creating a Kubernetes cluster in AOS, Rancher first provisions the specified number of virtual machines by communicating with the Prism Central API. Then it installs Kubernetes on top of them.

A Nutanix cluster may consist of multiple groups of VMs with distinct properties, such as the amount of memory or the number of vCPUs. This grouping allows for fine-grained control over the sizing of nodes for each Kubernetes role.

- [Creating a Nutanix Cluster](#creating-a-nutanix-cluster)
- [Provisioning Storage](#provisioning-storage)

# Creating a Nutanix Cluster

In [this section,](./provisioning-nutanix-clusters) you'll learn how to use Rancher to install an [RKE]({{<baseurl>}}/rke/latest/en/) Kubernetes cluster in Nutanix AOS.
