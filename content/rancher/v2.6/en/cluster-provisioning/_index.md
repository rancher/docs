---
title: Setting up Kubernetes Clusters in Rancher
description: Provisioning Kubernetes Clusters
weight: 7
aliases:
  - /rancher/v2.5/en/concepts/clusters/
  - /rancher/v2.5/en/concepts/clusters/cluster-providers/
  - /rancher/v2.5/en/tasks/clusters/
---

Rancher simplifies the creation of clusters by allowing you to create them through the Rancher UI rather than more complex alternatives. Rancher provides multiple options for launching a cluster. Use the option that best fits your use case.

This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts]({{<baseurl>}}/rancher/v2.5/en/overview/concepts) page.

For a conceptual overview of how the Rancher server provisions clusters and what tools it uses to provision them, refer to the [architecture]({{<baseurl>}}/rancher/v2.5/en/overview/architecture/) page.

This section covers the following topics:

<!-- TOC -->

- [Cluster Management Capabilities by Cluster Type](#cluster-management-capabilities-by-cluster-type)
- [Setting up clusters in a hosted Kubernetes provider](#setting-up-clusters-in-a-hosted-kubernetes-provider)
- [Launching Kubernetes with Rancher](#launching-kubernetes-with-rancher)
  - [Launching Kubernetes and Provisioning Nodes in an Infrastructure Provider](#launching-kubernetes-and-provisioning-nodes-in-an-infrastructure-provider)
  - [Launching Kubernetes on Existing Custom Nodes](#launching-kubernetes-on-existing-custom-nodes)
- [Registering Existing Clusters](#registering-existing-clusters)
- [Importing Existing Clusters](#importing-existing-clusters)

  <!-- /TOC -->

### Cluster Management Capabilities by Cluster Type

The following table summarizes the options and settings available for each cluster type:

{{% include file="/rancher/v2.5/en/cluster-provisioning/cluster-capabilities-table" %}}

# Setting up Clusters in a Hosted Kubernetes Provider

In this scenario, Rancher does not provision Kubernetes because it is installed by providers such as Google Kubernetes Engine (GKE), Amazon Elastic Container Service for Kubernetes, or Azure Kubernetes Service.

If you use a Kubernetes provider such as Google GKE, Rancher integrates with its cloud APIs, allowing you to create and manage role-based access control for the hosted cluster from the Rancher UI.

For more information, refer to the section on [hosted Kubernetes clusters.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters)

# Launching Kubernetes with Rancher

Rancher uses the [Rancher Kubernetes Engine (RKE)]({{<baseurl>}}/rke/latest/en/) as a library when provisioning Kubernetes on your own nodes. RKE is Rancher’s own lightweight Kubernetes installer.

In RKE clusters, Rancher manages the deployment of Kubernetes. These clusters can be deployed on any bare metal server, cloud provider, or virtualization platform.

These nodes can be dynamically provisioned through Rancher's UI, which calls [Docker Machine](https://docs.docker.com/machine/) to launch nodes on various cloud providers.

If you already have a node that you want to add to an RKE cluster, you can add it to the cluster by running a Rancher agent container on it.

For more information, refer to the section on [RKE clusters.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/)

### Launching Kubernetes and Provisioning Nodes in an Infrastructure Provider

Rancher can dynamically provision nodes in infrastructure providers such as Amazon EC2, DigitalOcean, Azure, or vSphere, then install Kubernetes on them.

Using Rancher, you can create pools of nodes based on a [node template]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This template defines the parameters used to launch nodes in your cloud providers.

One benefit of using nodes hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher can automatically replace it, thus maintaining the expected cluster configuration.

The cloud providers available for creating a node template are decided based on the [node drivers]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/#node-drivers) active in the Rancher UI.

For more information, refer to the section on [nodes hosted by an infrastructure provider]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/)

### Launching Kubernetes on Existing Custom Nodes

When setting up this type of cluster, Rancher installs Kubernetes on existing [custom nodes,]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/custom-nodes/) which creates a custom cluster.

You can bring any nodes you want to Rancher and use them to create a cluster.

These nodes include on-prem bare metal servers, cloud-hosted virtual machines, or on-prem virtual machines.

# Registering Existing Clusters

The cluster registration feature replaces the feature to import clusters.

Registering EKS clusters now provides additional benefits. For the most part, registered EKS clusters and EKS clusters created in Rancher are treated the same way in the Rancher UI, except for deletion.

When you delete an EKS cluster that was created in Rancher, the cluster is destroyed. When you delete an EKS cluster that was registered in Rancher, it is disconnected from the Rancher server, but it still exists and you can still access it in the same way you did before it was registered in Rancher.

For more information, see [this page.](./registered-clusters)
