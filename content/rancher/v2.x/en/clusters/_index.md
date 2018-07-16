---
title: Creating Kubernetes Clusters
weight: 2000
aliases:
  - /rancher/v2.x/en/concepts/clusters/
  - /rancher/v2.x/en/concepts/clusters/cluster-providers/
  - /rancher/v2.x/en/tasks/clusters/
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/
---

## What's a Kubernetes Cluster?

A cluster is a group of computing resources that work as a team to accomplish a goal. Each individual computer in a cluster is called a _node_.

## Cluster Creation

Rancher simplifies creation of Kubernetes clusters by allowing you to create them with the Rancher UI rather than a config file.

### Node Components

A Kubernetes cluster contains 3 types of nodes: etcd nodes, control plane nodes, and worker nodes.

#### etcd Nodes

The etcd nodes are used to run the etcd database. etcd is a key value store used as Kubernetes’ backing store for all cluster data. Even though you can run etcd on a single node, you need 3, 5, or 7 nodes for redundancy.

#### Control Plane Nodes

The control plane nodes are used to run the Kubernetes API server, scheduler, and controller manager. Control plane nodes are stateless since all cluster data are stored on etcd nodes. You can run control plane on 1 node, although 2 or more nodes are required for redundancy. You can also run control plane on etcd nodes.

#### Worker Nodes

Worker nodes are used to run the kubelet and the workload. It also runs the storage and networking drivers and ingress controllers when required. You create as many worker nodes as needed for your workload needs.


Using Rancher, you can create Kubernetes clusters using a variety of options. Use the option that best fits your use case.

## Hosted Kubernetes Providers

By integrating with cloud APIs, Rancher lets you create new Kubernetes clusters through hosted providers, all within the Rancher UI. You can create clusters using either:

- A hosted Kubernetes provider, such as Google GKE, Amazon EKS, or Microsoft AKS.
- An IaaS provider, using nodes provided from Amazon EC2, Microsoft Azure, or DigitalOcean.

## Rancher-Launched Kubernetes

Alternatively, you can use Rancher to create a cluster from your own existing nodes, using RKE. RKE is Rancher’s own lightweight Kubernetes installer. It works with any bare metal server, cloud provider, or virtualization platform. It integrates with node drivers to automatically provision nodes on AWS, Azure, DigitalOcean, vSphere, OpenStack, etc. Users can add custom nodes to the cluster by running the Rancher agent on these nodes.

## Kubernetes Importation

Finally, you also have the option of importing an existing Kubernetes cluster that you're already using into Rancher.
