---
title: Best Practices for Rancher Managed vSphere Clusters
shortTitle: Rancher Managed Clusters in vSphere
aliases:
  - /rancher/v2.5/en/best-practices/v2.5/rancher-managed/managed-vsphere
---

This guide outlines a reference architecture for provisioning downstream Rancher clusters in a vSphere environment, in addition to standard vSphere best practices as documented by VMware.

- [1. VM Considerations](#1-vm-considerations)
- [2. Network Considerations](#2-network-considerations)
- [3. Storage Considerations](#3-storage-considerations)
- [4. Backups and Disaster Recovery](#4-backups-and-disaster-recovery)

<figcaption>Solution Overview</figcaption>

![Solution Overview](/img/rancher/solution_overview.drawio.svg)

# 1. VM Considerations

### Leverage VM Templates to Construct the Environment

To facilitate consistency across the deployed Virtual Machines across the environment, consider the use of "Golden Images" in the form of VM templates. Packer can be used to accomplish this, adding greater customisation options.

### Leverage DRS Anti-Affinity Rules (Where Possible) to Separate Downstream Cluster Nodes Across ESXi Hosts

Doing so will ensure node VM's are spread across multiple ESXi hosts - preventing a single point of failure at the host level.

### Leverage DRS Anti-Affinity Rules (Where Possible) to Separate Downstream Cluster Nodes Across Datastores

Doing so will ensure node VM's are spread across multiple datastores - preventing a single point of failure at the datastore level.

### Configure VM's as Appropriate for Kubernetes

It’s important to follow K8s and etcd best practices when deploying your nodes, including disabling swap, double-checking you have full network connectivity between all machines in the cluster, using unique hostnames, MAC addresses, and product_uuids for every node.

# 2. Network Considerations 

### Leverage Low Latency, High Bandwidth Connectivity Between ETCD Nodes

Deploy etcd members within a single data center where possible to avoid latency overheads and reduce the likelihood of network partitioning. For most setups, 1Gb connections will suffice. For large clusters, 10Gb connections can reduce the time taken to restore from backup.

### Consistent IP Addressing for VM's

Each node used should have a static IP configured. In the case of DHCP, each node should have a DHCP reservation to make sure the node gets the same IP allocated.

# 3. Storage Considerations

### Leverage SSD Drives for ETCD Nodes

ETCD is very sensitive to write latency. Therefore, leverage SSD disks where possible. 

# 4. Backups and Disaster Recovery

### Perform Regular Downstream Cluster Backups

Kubernetes uses etcd to store all its data - from configuration, state and metadata. Backing this up is crucial in the event of disaster recovery.

### Back up Downstream Node VMs

Incorporate the Rancher downstream node VM's within a standard VM backup policy.