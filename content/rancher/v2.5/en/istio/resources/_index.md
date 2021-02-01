---
title: CPU and Memory Allocations
weight: 1
aliases:
  - /rancher/v2.5/en/project-admin/istio/configuring-resource-allocations/
  - /rancher/v2.5/en/project-admin/istio/config/
  - /rancher/v2.5/en/cluster-admin/tools/istio/resources
  - /rancher/v2.5/en/istio/v2.5/resources
---

This section describes the minimum recommended computing resources for the Istio components in a cluster.

The CPU and memory allocations for each component are [configurable.](#configuring-resource-allocations)

Before enabling Istio, we recommend that you confirm that your Rancher worker nodes have enough CPU and memory to run all of the components of Istio.

> **Tip:** In larger deployments, it is strongly advised that the infrastructure be placed on dedicated nodes in the cluster by adding a node selector for each Istio component.

The table below shows a summary of the minimum recommended resource requests and limits for the CPU and memory of each core Istio component.

In Kubernetes, the resource request indicates that the workload will not deployed on a node unless the node has at least the specified amount of memory and CPU available. If the workload surpasses the limit for CPU or memory, it can be terminated or evicted from the node. For more information on managing resource limits for containers, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/)

Workload | CPU - Request | Mem - Request | CPU - Limit | Mem - Limit | Configurable
---------:|---------------:|---------------:|-------------:|-------------:|-------------:
Istiod | 610m | 2186Mi | 4000m | 2048Mi | Y | Y
Istio-policy | 1000m         | 1024Mi        | 4800m       | 4096Mi      | Y      
Istio-telemetry | 1000m         | 10214Mi        | 4800m       | 4096Mi      | Y        
Istio-ingressgateway | 2000m | 1024Mi  | 10m |  40Mi | Y                   
Others          | 500m          | 500Mi         | -         | -         | Y           
**Total**       | **4500m**         | **5620Mi**        | **>12300m**         | **>14848Mi**         | **-**   


# Configuring Resource Allocations

You can individually configure the resource allocation for each type of Istio component. This section includes the default resource allocations for each component.

To make it easier to schedule the workloads to a node, a cluster-admin can reduce the CPU and memory resource requests for the component. However, the default CPU and memory allocations are the minimum that we recommend.

You can find more information about Istio configuration in the [official Istio documentation](https://istio.io/).

To configure the resources allocated to an Istio component,

1. In the Rancher **Cluster Explorer**, navigate to your Istio installation in **Apps & Marketplace**
1. Click **Upgrade** to edit the base components via changes the values.yaml or add an [overlay file]({{<baseurl>}}/rancher/v2.5/en/istio/v2.5/configuration-reference/#overlay-file).
1. Change the CPU or memory allocations, the nodes where each component will be scheduled to, or the node tolerations.
1. Click **Upgrade.** to rollout changes

**Result:** The resource allocations for the Istio components are updated.