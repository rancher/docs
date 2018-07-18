---
title: Provisioning Kubernetes Clusters
weight: 2000
aliases:
  - /rancher/v2.x/en/concepts/clusters/
  - /rancher/v2.x/en/concepts/clusters/cluster-providers/
  - /rancher/v2.x/en/tasks/clusters/
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/
---

## What's a Kubernetes Cluster?

In the IT world, a cluster is a group of computing resources that work as a team to accomplish a goal.

A _Kubernetes Cluster_ is a cluster that uses the [Kubernetes container-orchestration system](https://kubernetes.io/) to deploy, maintain, and scale Docker containers, allowing your organization to automate application operations. Kubernetes reduces the manual processes of maintaining organization operations.

### Kubernetes Cluster Node Components

Each computing resource in a Kubernetes Cluster is called a _node_. Node can be either bare-metal servers or virtual machines. Kubernetes (here after, K8s) classifies nodes into three distinct types: _etcd_ nodes, _control plane_ nodes, and _worker_ nodes. Understanding the role of each node will help you create your own K8s cluster.

#### etcd Nodes

[etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd) nodes run the `etcd` database. The `etcd` database component is a key value store used as K8s storage for all cluster data, such as cluster coordination and state management.

`etcd` is a distributed key value store, meaning it runs on multiple nodes so that there's always a backup available for fail over. Even though you can run `etcd` on a single node, you should run it on multiple nodes. We recommend 3, 5, or 7 nodes for redundancy.

#### Control Plane Nodes

[Control plane](https://kubernetes.io/docs/concepts/#kubernetes-control-plane) nodes run the K8s API server, scheduler, and controller manager. These nodes take care of routine tasks to ensure that your K8s cluster is running according to your configuration. Because all cluster data is stored on your `etcd` nodes, control plane nodes are stateless. You can run control plane on a single node, although two or more nodes are recommended for redundancy. Additionally, you can a single node can share the control plane and `etcd` roles.

#### Worker Nodes

[Worker nodes](https://kubernetes.io/docs/concepts/architecture/nodes/) run:

-_kubelets_, which is an agent that monitors the state of the node, ensuring your containers are healthy.
- _workloads_, which are the containers and pods that hold your apps, as well as other types of deployments.

Worker nodes also run storage and networking drivers, and ingress controllers when required. You create as many worker nodes as needed for your workload needs.

## Cluster Creation in Rancher

Now that you know what a K8s Cluster is, how does Rancher fit in?

Rancher simplifies creation of K8s clusters by allowing you to create them through the Rancher UI rather than more complex alternatives. Rancher provides multiple options for launching a K8s cluster. Use the option that best fits you use case.

## Cluster Creation Options

Options include:

<!-- TOC -->

- [Hosted Kubernetes Cluster](#hosted-kubernetes-cluster)
- [RKE Clusters](#rke-clusters)

    - [Node Pools (i.e., Infrastructure Provider)](#node-pools-ie-infrastructure-provider)
    - [Custom Nodes (i.e. Existing Nodes)](#custom-nodes-ie-existing-nodes)
    
- [Import Existing Cluster](#import-existing-cluster)

<!-- /TOC -->

### Hosted Kubernetes Cluster

If you already use a K8s provider such as Google GKE, Rancher can integrate with its cloud APIs, allowing you to create and manage your hosted cluster from the Rancher UI.

[Hosted Kubernetes Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-providers/hosted-kubernetes-clusters)

### Rancher Launched Kubernetes

Alternatively, you can use Rancher to create a cluster from your own existing nodes, using RKE. RKE is Rancher’s own lightweight K8s installer. It works with any bare metal server, cloud provider, or virtualization platform. It integrates with node drivers to automatically provision nodes on AWS, Azure, DigitalOcean, vSphere, OpenStack, etc. Users can add custom nodes to the cluster by running the Rancher agent on these nodes.

[Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-providers/rke-clusters/)

#### Node Pools (i.e., Infrastructure Provider)

Using Rancher, you can leverage APIs from major IaaS providers in combination with RKE to create nodes and provision a new K8s cluster.

[Node Pools]({{< baseurl >}}/rancher/v2.x/en/cluster-providers/rke-clusters/#node-pools)

#### Custom Nodes (i.e. Existing Nodes)

Use Rancher to create a K8s cluster on your on-premise bare metal servers. This option creates a cluster using RKE, which is Rancher's own lightweight K8s installer.

In addition to bare metal servers, RKE can also create clusters on less popular IaaS providers by integrating with node drivers.

[Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-providers/rke-clusters/#custom-nodes)

### Import Existing Cluster

Users can import an existing K8s cluster into Rancher. Rancher does not automate the provisioning, scaling, and upgrade of imported K8s clusters. All other cluster management, policy management, and workload management capabilities of Rancher apply to imported clusters.

[Importing Existing Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-providers/imported-clusters/)