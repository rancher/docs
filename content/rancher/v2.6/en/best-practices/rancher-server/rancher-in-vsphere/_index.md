---
title: Installing Rancher in a vSphere Environment
shortTitle: On-Premises Rancher in vSphere
weight: 3
aliases:
  - /rancher/v2.5/en/best-practices/v2.5/rancher-server/rancher-in-vsphere
---

This guide outlines a reference architecture for installing Rancher on an RKE Kubernetes cluster in a vSphere environment, in addition to standard vSphere best practices as documented by VMware.

- [1. Load Balancer Considerations](#1-load-balancer-considerations)
- [2. VM Considerations](#2-vm-considerations)
- [3. Network Considerations](#3-network-considerations)
- [4. Storage Considerations](#4-storage-considerations)
- [5. Backups and Disaster Recovery](#5-backups-and-disaster-recovery)

<figcaption>Solution Overview</figcaption>

![Solution Overview](/docs/img/rancher/rancher-on-prem-vsphere.svg)

# 1. Load Balancer Considerations

A load balancer is required to direct traffic to the Rancher workloads residing on the RKE nodes.

### Leverage Fault Tolerance and High Availability

Leverage the use of an external (hardware or software) load balancer that has inherit high-availability functionality (F5, NSX-T, Keepalived, etc).

### Back Up Load Balancer Configuration

In the event of a Disaster Recovery activity, availability of the Load balancer configuration will expedite the recovery process.

### Configure Health Checks

Configure the Load balancer to automatically mark nodes as unavailable if a health check is failed. For example, NGINX can facilitate this with:

`max_fails=3 fail_timeout=5s` 

### Leverage an External Load Balancer

Avoid implementing a software load balancer within the management cluster.

### Secure Access to Rancher

Configure appropriate Firewall / ACL rules to only expose access to Rancher

# 2. VM Considerations

### Size the VM's According to Rancher Documentation

https://rancher.com/docs/rancher/v2.5/en/installation/requirements/

### Leverage VM Templates to Construct the Environment

To facilitate consistency across the deployed Virtual Machines across the environment, consider the use of "Golden Images" in the form of VM templates. Packer can be used to accomplish this, adding greater customisation options.

### Leverage DRS Anti-Affinity Rules (Where Possible) to Separate Rancher Cluster Nodes Across ESXi Hosts

Doing so will ensure node VM's are spread across multiple ESXi hosts - preventing a single point of failure at the host level.

### Leverage DRS Anti-Affinity Rules (Where Possible) to Separate Rancher Cluster Nodes Across Datastores

Doing so will ensure node VM's are spread across multiple datastores - preventing a single point of failure at the datastore level.

### Configure VM's as Appropriate for Kubernetes

It’s important to follow K8s and etcd best practices when deploying your nodes, including disabling swap, double-checking you have full network connectivity between all machines in the cluster, using unique hostnames, MAC addresses, and product_uuids for every node.

# 3. Network Considerations 

### Leverage Low Latency, High Bandwidth Connectivity Between ETCD Nodes

Deploy etcd members within a single data center where possible to avoid latency overheads and reduce the likelihood of network partitioning. For most setups, 1Gb connections will suffice. For large clusters, 10Gb connections can reduce the time taken to restore from backup.

### Consistent IP Addressing for VM's

Each node used should have a static IP configured. In the case of DHCP, each node should have a DHCP reservation to make sure the node gets the same IP allocated.

# 4. Storage Considerations

### Leverage SSD Drives for ETCD Nodes

ETCD is very sensitive to write latency. Therefore, leverage SSD disks where possible. 

# 5. Backups and Disaster Recovery

### Perform Regular Management Cluster Backups

Rancher stores its data in the ETCD datastore of the Kubernetes cluster it resides on. Like with any Kubernetes cluster, perform frequent, tested backups of this cluster.

### Back up Rancher Cluster Node VMs

Incorporate the Rancher management node VM's within a standard VM backup policy.
