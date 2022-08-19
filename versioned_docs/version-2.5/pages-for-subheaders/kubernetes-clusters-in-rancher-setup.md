---
title: Setting up Kubernetes Clusters in Rancher
description: Provisioning Kubernetes Clusters
weight: 7
aliases:
  - /rancher/v2.5/en/concepts/clusters/
  - /rancher/v2.5/en/concepts/clusters/cluster-providers/
  - /rancher/v2.5/en/tasks/clusters/
  - /rancher/v2.x/en/cluster-provisioning/
---

Rancher simplifies the creation of clusters by allowing you to create them through the Rancher UI rather than more complex alternatives. Rancher provides multiple options for launching a cluster. Use the option that best fits your use case.

This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts](../reference-guides/kubernetes-concepts.md) page.

For a conceptual overview of how the Rancher server provisions clusters and what tools it uses to provision them, refer to the [architecture](rancher-manager-architecture.md) page.

This section covers the following topics:

<!-- TOC -->

- [Cluster Management Capabilities by Cluster Type](#cluster-management-capabilities-by-cluster-type)
- [Setting up clusters in a hosted Kubernetes provider](#setting-up-clusters-in-a-hosted-kubernetes-provider)
- [Launching Kubernetes with Rancher](#launching-kubernetes-with-rancher)
  - [Launching Kubernetes and Provisioning Nodes in an Infrastructure Provider](#launching-kubernetes-and-provisioning-nodes-in-an-infrastructure-provider)
  - [Launching Kubernetes on Existing Custom Nodes](#launching-kubernetes-on-existing-custom-nodes)
- [Registering Existing Clusters](#registering-existing-clusters)

  <!-- /TOC -->

### Cluster Management Capabilities by Cluster Type

The following table summarizes the options and settings available for each cluster type:

import ClusterCapabilitiesTable from '../shared-files/_cluster-capabilities-table.md';

<ClusterCapabilitiesTable />

# Setting up Clusters in a Hosted Kubernetes Provider

In this scenario, Rancher does not provision Kubernetes because it is installed by providers such as Google Kubernetes Engine (GKE), Amazon Elastic Container Service for Kubernetes, or Azure Kubernetes Service.

If you use a Kubernetes provider such as Google GKE, Rancher integrates with its cloud APIs, allowing you to create and manage role-based access control for the hosted cluster from the Rancher UI.

For more information, refer to the section on [hosted Kubernetes clusters.](set-up-clusters-from-hosted-kubernetes-providers.md)

# Launching Kubernetes with Rancher

Rancher uses the [Rancher Kubernetes Engine (RKE)](https://rancher.com/docs/rke/latest/en/) as a library when provisioning Kubernetes on your own nodes. RKE is Rancher’s own lightweight Kubernetes installer.

In RKE clusters, Rancher manages the deployment of Kubernetes. These clusters can be deployed on any bare metal server, cloud provider, or virtualization platform.

These nodes can be dynamically provisioned through Rancher's UI, which calls [Docker Machine](https://docs.docker.com/machine/) to launch nodes on various cloud providers.

If you already have a node that you want to add to an RKE cluster, you can add it to the cluster by running a Rancher agent container on it.

For more information, refer to the section on [RKE clusters.](launch-kubernetes-with-rancher.md)

### Launching Kubernetes and Provisioning Nodes in an Infrastructure Provider

Rancher can dynamically provision nodes in infrastructure providers such as Amazon EC2, DigitalOcean, Azure, or vSphere, then install Kubernetes on them.

Using Rancher, you can create pools of nodes based on a [node template](use-new-nodes-in-an-infra-provider.md#node-templates). This template defines the parameters used to launch nodes in your cloud providers.

One benefit of using nodes hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher can automatically replace it, thus maintaining the expected cluster configuration.

The cloud providers available for creating a node template are decided based on the [node drivers](use-new-nodes-in-an-infra-provider.md#node-drivers) active in the Rancher UI.

For more information, refer to the section on [nodes hosted by an infrastructure provider](use-new-nodes-in-an-infra-provider.md)

### Launching Kubernetes on Existing Custom Nodes

When setting up this type of cluster, Rancher installs Kubernetes on existing [custom nodes,](use-existing-nodes.md) which creates a custom cluster.

You can bring any nodes you want to Rancher and use them to create a cluster.

These nodes include on-prem bare metal servers, cloud-hosted virtual machines, or on-prem virtual machines.

# Registering Existing Clusters

The cluster registration feature replaces the feature to import clusters.

Registering EKS clusters now provides additional benefits. For the most part, registered EKS clusters and EKS clusters created in Rancher are treated the same way in the Rancher UI, except for deletion.

When you delete an EKS cluster that was created in Rancher, the cluster is destroyed. When you delete an EKS cluster that was registered in Rancher, it is disconnected from the Rancher server, but it still exists and you can still access it in the same way you did before it was registered in Rancher.

For more information, see [this page.](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/register-existing-clusters.md)
