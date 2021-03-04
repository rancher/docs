---
title: Setting up Kubernetes Clusters in Rancher
description: Provisioning Kubernetes Clusters
weight: 7
aliases:
  - /rancher/v2.0-v2.4/en/concepts/clusters/
  - /rancher/v2.0-v2.4/en/concepts/clusters/cluster-providers/
  - /rancher/v2.0-v2.4/en/tasks/clusters/
---

Rancher simplifies the creation of clusters by allowing you to create them through the Rancher UI rather than more complex alternatives. Rancher provides multiple options for launching a cluster. Use the option that best fits your use case.

This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts]({{<baseurl>}}/rancher/v2.0-v2.4/en/overview/concepts) page.

For a conceptual overview of how the Rancher server provisions clusters and what tools it uses to provision them, refer to the [architecture]({{<baseurl>}}/rancher/v2.0-v2.4/en/overview/architecture/) page.

This section covers the following topics:

<!-- TOC -->

- [Setting up clusters in a hosted Kubernetes provider](#setting-up-clusters-in-a-hosted-kubernetes-provider)
- [Launching Kubernetes with Rancher](#launching-kubernetes-with-rancher)
  - [Launching Kubernetes and Provisioning Nodes in an Infrastructure Provider](#launching-kubernetes-and-provisioning-nodes-in-an-infrastructure-provider)
  - [Launching Kubernetes on Existing Custom Nodes](#launching-kubernetes-on-existing-custom-nodes)
- [Importing Existing Clusters](#importing-existing-clusters)

  <!-- /TOC -->

The following table summarizes the options and settings available for each cluster type:

{{% include file="/rancher/v2.0-v2.4/en/cluster-provisioning/cluster-capabilities-table" %}}

# Setting up Clusters in a Hosted Kubernetes Provider

In this scenario, Rancher does not provision Kubernetes because it is installed by providers such as Google Kubernetes Engine (GKE), Amazon Elastic Container Service for Kubernetes, or Azure Kubernetes Service.

If you use a Kubernetes provider such as Google GKE, Rancher integrates with its cloud APIs, allowing you to create and manage role-based access control for the hosted cluster from the Rancher UI.

For more information, refer to the section on [hosted Kubernetes clusters.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters)

# Launching Kubernetes with Rancher

Rancher uses the [Rancher Kubernetes Engine (RKE)]({{<baseurl>}}/rke/latest/en/) as a library when provisioning Kubernetes on your own nodes. RKE is Rancher’s own lightweight Kubernetes installer.

In RKE clusters, Rancher manages the deployment of Kubernetes. These clusters can be deployed on any bare metal server, cloud provider, or virtualization platform.

These nodes can be dynamically provisioned through Rancher's UI, which calls [Docker Machine](https://docs.docker.com/machine/) to launch nodes on various cloud providers.

If you already have a node that you want to add to an RKE cluster, you can add it to the cluster by running a Rancher agent container on it.

For more information, refer to the section on [RKE clusters.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/)

### Launching Kubernetes and Provisioning Nodes in an Infrastructure Provider

Rancher can dynamically provision nodes in infrastructure providers such as Amazon EC2, DigitalOcean, Azure, or vSphere, then install Kubernetes on them.

Using Rancher, you can create pools of nodes based on a [node template]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-templates). This template defines the parameters used to launch nodes in your cloud providers.

One benefit of using nodes hosted by an infrastructure provider is that if a node loses connectivity with the cluster, Rancher can automatically replace it, thus maintaining the expected cluster configuration.

The cloud providers available for creating a node template are decided based on the [node drivers]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/#node-drivers) active in the Rancher UI.

For more information, refer to the section on [nodes hosted by an infrastructure provider]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/)

### Launching Kubernetes on Existing Custom Nodes

When setting up this type of cluster, Rancher installs Kubernetes on existing [custom nodes,]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes/) which creates a custom cluster.

You can bring any nodes you want to Rancher and use them to create a cluster.

These nodes include on-prem bare metal servers, cloud-hosted virtual machines, or on-prem virtual machines.

# Importing Existing Clusters

_Available from Rancher v2.0.x-v2.4.x_

In this type of cluster, Rancher connects to a Kubernetes cluster that has already been set up. Therefore, Rancher does not provision Kubernetes, but only sets up the Rancher agents to communicate with the cluster.

Note that Rancher does not automate the provisioning, scaling, or upgrade of imported clusters. Other Rancher features, including management of cluster, role-based access control, policy, and workloads, are available for imported clusters.

For all imported Kubernetes clusters except for K3s clusters, the configuration of an imported cluster still has to be edited outside of Rancher. Some examples of editing the cluster include adding and removing nodes, upgrading the Kubernetes version, and changing Kubernetes component parameters.

In Rancher v2.4, it became possible to import a K3s cluster and upgrade Kubernetes by editing the cluster in the Rancher UI.

For more information, refer to the section on [importing existing clusters.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/imported-clusters/)

### Importing and Editing K3s Clusters

_Available as of Rancher v2.4.0_

[K3s]({{<baseurl>}}/k3s/latest/en/) is a lightweight, fully compliant Kubernetes distribution. K3s Kubernetes clusters can now be imported into Rancher.

When a K3s cluster is imported, Rancher will recognize it as K3s, and the Rancher UI will expose the following features in addition to the functionality for other imported clusters:

- The ability to upgrade the K3s version
- The ability to see a read-only version of the K3s cluster's configuration arguments and environment variables used to launch each node in the cluster.

For more information, refer to the section on [imported K3s clusters.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/imported-clusters/)