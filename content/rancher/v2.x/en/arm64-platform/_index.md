---
title: ARM64 Platform Support (Experimental)
weight: 7600
---

_Available as of v2.2.0_

For the ARM64 platform, Rancher currently supports the following two features:  

- Running Rancher Server on ARM64 platform
- Using Rancher to manage ARM64 Platform Kubernetes
    - Import ARM64 Kubernetes clusters
    - Create ARM64 Kubernetes clusters with custom nodes

>**Notes:**
>The `Monitoring`,`Alerts and Notifiers`,`Pipelines`,`Logging` features are currently not supported in the ARM64 platform. 
>These features will be supported for the ARM64 platform in the future updates.  

>Now only `Flannel` network is supported to create custom Kubernetes clusters on ARM64 platform.  
>Now Rancher only supports Kubernetes version `v1.12` and above on ARM64 platform.

## Running Rancher Server on ARM64 platform

The Rancher image is published using the [docker manifest](https://docs.docker.com/engine/reference/commandline/manifest/), so whether on the AMD64 platform or the ARM64 platform, you can use the same image name and tag to install Rancher.  

About how to install Rancher, please refer to the [Installation]({{< baseurl >}}/rancher/v2.x/en/installation/) section.

## Using Rancher to manage ARM64 Platform Kubernetes

Rancher currently supports the following two ways to manage ARM64 platform Kubernetes clusters.

- [Import ARM64 Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/arm64-platform/manage-arm64-k8s/#import-arm64-kubernetes-clusters)
- [Create ARM64 Kubernetes clusters with custom nodes]({{< baseurl >}}/rancher/v2.x/en/arm64-platform/manage-arm64-k8s/#create-arm64-kubernetes-clusters-with-custom-nodes)
