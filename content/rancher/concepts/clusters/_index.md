---
title: Clusters
weight: 2100
---

# Clusters

Coming Soon

## What's a Cluster?

Coming Soon

## Cluster Creation

Coming Soon

### Node Components

A Kubernetes cluster contains 3 types of nodes: etcd nodes, control plane nodes, and worker nodes.

#### etcd Nodes

The etcd nodes are used to run the etcd database. etcd is a key value store used as Kubernetes’ backing store for all cluster data. Even though you can run etcd on a single node, you need 3, 5, or 7 nodes for redundancy.

#### Control Plane Nodes

The control plane nodes are used to run the Kubernetes API server, scheduler, and controller manager. Control plane nodes are stateless since all cluster data are stored on etcd nodes. You can run control plane on 1 node, although 2 or more nodes are required for redundancy. You can also run control plane on etcd nodes.

#### Worker Nodes

Worker nodes are used to run the kubelet and the workload. It also runs the storage and networking drivers and ingress controllers when required. You create as many worker nodes as needed for your workload needs.

### Cluster Providers

#### Rancher Kubernetes Engine (RKE)

RKE is Rancher’s own lightweight Kubernetes installer. It works with any cloud providers, virtualization platforms, or bare metal servers. It integrates with node drivers to automatically provision nodes on AWS, Azure, DigitalOcean, vSphere, OpenStack, etc. Users can add custom nodes to the cluster by running the Rancher agent on these nodes.

#### Cloud-Managed Kubernetes Clusters

Rancher integrates with cloud APIs so users can provision GKE, EKS, and AKS clusters directly from Rancher. New cloud managed Kubernetes clusters will be added as they become available.

#### Imported Clusters

Users can existing Kubernetes cluster into Rancher. Rancher does not automate the provisioning, scaling, and upgrade of imported Kubernetes clusters. All other cluster management, policy management, and workload management capabilities of Rancher apply to imported clustered.

### Kubeconfig File

Coming Soon
