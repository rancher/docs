---
title: Using Rancher to manage ARM64 Kubernetes
weight: 50
---

_Available as of v2.2.0_

Rancher currently supports the following two ways to manage ARM64 platform Kubernetes clusters.

- Import ARM64 Kubernetes clusters
- Create ARM64 Kubernetes clusters with custom nodes

### Import ARM64 Kubernetes clusters

You can import an existing ARM64 platform Kubernetes cluster and then manage it using Rancher.  
The rancher agent image is published using the [docker manifest](https://docs.docker.com/engine/reference/commandline/manifest/), so when you are importing clusters you don't need to change any configurations.

About how to import Kubernetes clusters, please refer to the [Importing Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/) section.

### Create ARM64 Kubernetes clusters with custom nodes

Rancher supports creating ARM64 platform Kubernetes clusters with your custom nodes. 
All the images which Rancher using to create Kubernetes clusters are published using the [docker manifest](https://docs.docker.com/engine/reference/commandline/manifest/), so you don't need to change any configurations to create ARM64 platform Kubernetes clusters.

>Now only `Flannel` network is supported to create custom Kubernetes clusters on ARM64 platform.  
>Now Rancher only supports Kubernetes version `v1.12` and above on ARM64 platform.

About how to create Kubernetes clusters with custom nodes, please refer to the [Creating a Cluster with Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/) section.
