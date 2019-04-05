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

A cluster is a group of computers that work together as a single system.

A _Kubernetes Cluster_ is a cluster that uses the [Kubernetes container-orchestration system](https://kubernetes.io/) to deploy, maintain, and scale Docker containers, allowing your organization to automate application operations.

### Kubernetes Cluster Node Components

Each computing resource in a Kubernetes Cluster is called a _node_. Nodes can be either bare-metal servers or virtual machines. Kubernetes classifies nodes into three types: _etcd_ nodes, _control plane_ nodes, and _worker_ nodes.

#### etcd Nodes 

[etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd) nodes run the etcd database. The etcd database component is a key value store used as Kubernetes storage for all cluster data, such as cluster coordination and state management.

etcd is a distributed key value store, meaning it runs on multiple nodes so that there's always a backup available for fail over. Even though you can run etcd on a single node, you should run it on multiple nodes. We recommend 3, 5, or 7 etcd nodes for redundancy.

#### Control Plane Nodes

[Control plane](https://kubernetes.io/docs/concepts/#kubernetes-control-plane) nodes run the Kubernetes API server, scheduler, and controller manager. These nodes take care of routine tasks to ensure that your cluster maintains your configuration. Because all cluster data is stored on your etcd nodes, control plane nodes are stateless. You can run control plane on a single node, although two or more nodes are recommended for redundancy. Additionally, a single node can share the control plane and etcd roles.

#### Worker Nodes

[Worker nodes](https://kubernetes.io/docs/concepts/architecture/nodes/) run:

- _Kubelets_: An agent that monitors the state of the node, ensuring your containers are healthy.
- _Workloads_: The containers and pods that hold your apps, as well as other types of deployments.

Worker nodes also run storage and networking drivers, and ingress controllers when required. You create as many worker nodes as necessary to run your workloads.

## Cluster Creation in Rancher

Now that you know what a Kubernetes Cluster is, how does Rancher fit in?

Rancher simplifies creation of clusters by allowing you to create them through the Rancher UI rather than more complex alternatives. Rancher provides multiple options for launching a cluster. Use the option that best fits your use case.

![Rancher diagram]({{< baseurl >}}/img/rancher/ranchercomponentsdiagram.svg)<br/>
<sup>Rancher components used for provisioning/managing Kubernetes clusters.</sup>


## Cluster Creation Options

Options include:

<!-- TOC -->

- [Hosted Kubernetes Cluster](#hosted-kubernetes-cluster)
- [Rancher Launched Kubernetes](#rancher-launched-kubernetes)
    - [Nodes Hosted by an Infrastructure Provider](#nodes-hosted-by-an-infrastructure-provider)
    - [Custom Nodes](#custom-nodes)
- [Import Existing Cluster](#import-existing-cluster)

<!-- /TOC -->

### Hosted Kubernetes Cluster

If you use a Kubernetes provider such as Google GKE, Rancher integrates with its cloud APIs, allowing you to create and manage a hosted cluster from the Rancher UI.

[Hosted Kubernetes Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters)

### Rancher Launched Kubernetes

Alternatively, you can use Rancher to create a cluster on your own nodes, using [Rancher Kubernetes Engine (RKE)]({{< baseurl >}}/rke/latest/en/). RKE is Rancher’s own lightweight Kubernetes installer. In RKE clusters, Rancher manages the deployment of Kubernetes. These clusters can be deployed on any bare metal server, cloud provider, or virtualization platform. These nodes can either:

- Be provisioned through Rancher's UI, which calls [Docker Machine](https://docs.docker.com/machine/) to launch nodes on various cloud providers.
- Be a prior existing node that's brought into the cluster by running a Rancher agent container on it.

[Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/)

#### Nodes Hosted by an Infrastructure Provider

Using Rancher, you can create pools of nodes based on a [node template]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This template defines the parameters used to launch nodes in your cloud providers. The cloud providers available for creating a node template are decided based on the [node drivers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-drivers) active in the Rancher UI. The benefit of using nodes hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher automatically replaces it, thus maintaining the expected cluster configuration.

[Nodes Hosted by an Infrastructure Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/)

#### Custom Nodes

You can bring any nodes you want to Rancher and use them to create a cluster. These nodes include on-premise bare metal servers, cloud-hosted virtual machines, or on-premise virtual machines.

[Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/)

### Import Existing Cluster

Users can import an existing Kubernetes cluster into Rancher. Note that Rancher does not automate the provisioning, scaling, or upgrade of imported clusters. All other Rancher features, including management of cluster, policy, and workloads, are available for imported clusters.

[Importing Existing Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/)
