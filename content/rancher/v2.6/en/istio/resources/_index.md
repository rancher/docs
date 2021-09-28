---
title: CPU and Memory Allocations
weight: 1
---

This section describes the minimum recommended computing resources for the Istio components in a cluster.

The CPU and memory allocations for each component are [configurable.](#configuring-resource-allocations)

Before enabling Istio, we recommend that you confirm that your Rancher worker nodes have enough CPU and memory to run all of the components of Istio.

> **Tip:** In larger deployments, it is strongly advised that the infrastructure be placed on dedicated nodes in the cluster by adding a node selector for each Istio component.

The table below shows a summary of the minimum recommended resource requests and limits for the CPU and memory of each core Istio component.

In Kubernetes, the resource request indicates that the workload will not deployed on a node unless the node has at least the specified amount of memory and CPU available. If the workload surpasses the limit for CPU or memory, it can be terminated or evicted from the node. For more information on managing resource limits for containers, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/)

| Workload   | CPU - Request  | Memory - Request  |  CPU - Limit  |  Memory - Limit |
|----------------------|---------------|------------|-----------------|-------------------|
| ingress gateway |  100m | 128mi  | 2000m          |  1024mi |
| egress gateway  |  100m |  128mi   |   2000m        |  1024mi |
| istiod          |  500m      | 2048mi        |       No limit    |    No limit             |
| proxy          |  10m         | 10mi            | 2000m        | 1024mi   |
| **Totals:** | **710m** | **2314Mi** | **6000m** | **3072Mi** |

# Configuring Resource Allocations

You can individually configure the resource allocation for each type of Istio component. This section includes the default resource allocations for each component.

To make it easier to schedule the workloads to a node, a cluster-admin can reduce the CPU and memory resource requests for the component. However, the default CPU and memory allocations are the minimum that we recommend.

You can find more information about Istio configuration in the [official Istio documentation](https://istio.io/).

To configure the resources allocated to an Istio component,

1.  Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. In the left navigation bar, click **Apps & Marketplace**.
1. Click **Installed Apps**.
1. Go to the `istio-system` namespace. In one of the Istio workloads, such as `rancher-istio`, click **⋮ > Edit/Upgrade**.
1. Click **Upgrade** to edit the base components via changes to the values.yaml or add an [overlay file]({{<baseurl>}}/rancher/v2.6/en/istio/configuration-reference/#overlay-file). For more information about editing the overlay file, see [this section.](./#editing-the-overlay-file)
1. Change the CPU or memory allocations, the nodes where each component will be scheduled to, or the node tolerations.
1. Click **Upgrade**. to rollout changes

**Result:** The resource allocations for the Istio components are updated.

### Editing the Overlay File

The overlay file can contain any of the values in the [Istio Operator spec.](https://istio.io/latest/docs/reference/config/istio.operator.v1alpha1/#IstioOperatorSpec) The overlay file included with the Istio application is just one example of a potential configuration of the overlay file.

As long as the file contains `kind: IstioOperator` and the YAML options are valid, the file can be used as an overlay.

In the example overlay file provided with the Istio application, the following section allows you to change Kubernetes resources:

```
#      k8s:
#        resources:
#          requests:
#            cpu: 200m
```
