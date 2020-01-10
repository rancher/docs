---
title: Provisioning Kubernetes Clusters
description: Provisioning Kubernetes Clusters
weight: 2000
aliases:
  - /rancher/v2.x/en/concepts/clusters/
  - /rancher/v2.x/en/concepts/clusters/cluster-providers/
  - /rancher/v2.x/en/tasks/clusters/
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/
---

Rancher simplifies the creation of clusters by allowing you to create them through the Rancher UI rather than more complex alternatives. Rancher provides multiple options for launching a cluster. Use the option that best fits your use case.

This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts]({{<baseurl>}}/rancher/v2.x/en/overview/concepts) page.

For a conceptual overview of how the Rancher server provisions clusters and what tools it uses to provision them, refer to the [architecture]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/) page.

## Cluster Creation Options

Options include:

<!-- TOC -->

- [Hosted Kubernetes Cluster](#hosted-kubernetes-cluster)
- [Rancher Launched Kubernetes](#rancher-launched-kubernetes)
    - [Nodes Hosted by an Infrastructure Provider](#nodes-hosted-by-an-infrastructure-provider)
    - [Custom Nodes](#custom-nodes)
- [Import Existing Cluster](#import-existing-cluster)

<!-- /TOC -->

# Hosted Kubernetes Cluster

If you use a Kubernetes provider such as Google GKE, Rancher integrates with its cloud APIs, allowing you to create and manage a hosted cluster from the Rancher UI.

[Hosted Kubernetes Cluster]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters)

# Rancher Launched Kubernetes

The [Rancher Kubernetes Engine (RKE)]({{<baseurl>}}/rke/latest/en/) allows you to create a Kubernetes cluster on your own nodes. RKE is Rancher’s own lightweight Kubernetes installer.

In RKE clusters, Rancher manages the deployment of Kubernetes. These clusters can be deployed on any bare metal server, cloud provider, or virtualization platform.

These nodes can be dynamically provisioned through Rancher's UI, which calls [Docker Machine](https://docs.docker.com/machine/) to launch nodes on various cloud providers.

If you already have a node that you want to add to an RKE cluster, you can add it to the cluster by running a Rancher agent container on it.

For more information, refer to the section on [RKE clusters.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/)

### Nodes Hosted by an Infrastructure Provider

Using Rancher, you can create pools of nodes based on a [node template]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This template defines the parameters used to launch nodes in your cloud providers.

The benefit of using nodes hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher automatically replaces it, thus maintaining the expected cluster configuration.

The cloud providers available for creating a node template are decided based on the [node drivers]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-drivers) active in the Rancher UI.

For more information, refer to the section on [nodes hosted by an infrastructure provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/)

### Custom Nodes

You can bring any nodes you want to Rancher and use them to create a cluster. Clusters created with custom nodes are also called custom clusters.

These nodes include on-premise bare metal servers, cloud-hosted virtual machines, or on-premise virtual machines.

[Custom Nodes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/)

# Import Existing Cluster

Users can import an existing Kubernetes cluster into Rancher. 

Note that Rancher does not automate the provisioning, scaling, or upgrade of imported clusters. All other Rancher features, including management of cluster, policy, and workloads, are available for imported clusters.

For more information, refer to the section on [importing existing clusters.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/)
