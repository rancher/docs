---
title: Creating a vSphere Cluster
shortTitle: vSphere
description: Use Rancher to create a vSphere cluster. It may consist of groups of VMs with distinct properties which allow for fine-grained control over the sizing of nodes. 
metaDescription: Use Rancher to create a vSphere cluster. It may consist of groups of VMs with distinct properties which allow for fine-grained control over the sizing of nodes. 
weight: 2225
aliases:
  - /rancher/v2.0-v2.4/en/tasks/clusters/creating-a-cluster/create-cluster-vsphere/
---

By using Rancher with vSphere, you can bring cloud operations on-premises.

Rancher can provision nodes in vSphere and install Kubernetes on them. When creating a Kubernetes cluster in vSphere, Rancher first provisions the specified number of virtual machines by communicating with the vCenter API. Then it installs Kubernetes on top of them.

A vSphere cluster may consist of multiple groups of VMs with distinct properties, such as the amount of memory or the number of vCPUs. This grouping allows for fine-grained control over the sizing of nodes for each Kubernetes role.

- [vSphere Enhancements in Rancher v2.3](#vsphere-enhancements-in-rancher-v2-3)
- [Creating a vSphere Cluster](#creating-a-vsphere-cluster)
- [Provisioning Storage](#provisioning-storage)
- [Enabling the vSphere Cloud Provider](#enabling-the-vsphere-cloud-provider)

# vSphere Enhancements in Rancher v2.3

The vSphere node templates have been updated, allowing you to bring cloud operations on-premises with the following enhancements:

### Self-healing Node Pools

_Available as of v2.3.0_

One of the biggest advantages of provisioning vSphere nodes with Rancher is that it allows you to take advantage of Rancher's self-healing node pools, also called the [node auto-replace feature,]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#about-node-auto-replace) in your on-premises clusters. Self-healing node pools are designed to help you replace worker nodes for stateless applications. When Rancher provisions nodes from a node template, Rancher can automatically replace unreachable nodes.

> **Important:** It is not recommended to enable node auto-replace on a node pool of master nodes or nodes with persistent volumes attached, because VMs are treated ephemerally. When a node in a node pool loses connectivity with the cluster, its persistent volumes are destroyed, resulting in data loss for stateful applications.

### Dynamically Populated Options for Instances and Scheduling

_Available as of v2.3.3_

Node templates for vSphere have been updated so that when you create a node template with your vSphere credentials, the template is automatically populated with the same options for provisioning VMs that you have access to in the vSphere console.

For the fields to be populated, your setup needs to fulfill the [prerequisites.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/#prerequisites)

### More Supported Operating Systems

In Rancher v2.3.3+, you can provision VMs with any operating system that supports `cloud-init`. Only YAML format is supported for the [cloud config.](https://cloudinit.readthedocs.io/en/latest/topics/examples.html)

In Rancher before v2.3.3, the vSphere node driver included in Rancher only supported the provisioning of VMs with [RancherOS]({{<baseurl>}}/os/v1.x/en/) as the guest operating system.

### Video Walkthrough of v2.3.3 Node Template Features

In this YouTube video, we demonstrate how to set up a node template with the new features designed to help you bring cloud operations to on-premises clusters.

{{< youtube id="dPIwg6x1AlU">}}

# Creating a vSphere Cluster

In [this section,](./provisioning-vsphere-clusters) you'll learn how to use Rancher to install an [RKE]({{<baseurl>}}/rke/latest/en/) Kubernetes cluster in vSphere.

# Provisioning Storage

For an example of how to provision storage in vSphere using Rancher, refer to [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/volumes-and-storage/examples/vsphere) In order to dynamically provision storage in vSphere, the vSphere provider must be [enabled.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere)

# Enabling the vSphere Cloud Provider

When a cloud provider is set up in Rancher, the Rancher server can automatically provision new infrastructure for the cluster, including new nodes or persistent storage devices.

For details, refer to the section on [enabling the vSphere cloud provider.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere)