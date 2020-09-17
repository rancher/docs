---
title: CPU and Memory Allocations
weight: 1
aliases:
  - /rancher/v2.x/en/project-admin/istio/configuring-resource-allocations/
  - /rancher/v2.x/en/project-admin/istio/config/
  - /rancher/v2.x/en/cluster-admin/tools/istio/resources
---
_This section applies to Istio in Rancher v2.5.0. If you are using Rancher v2.4.x, refer to [this section.](../../legacy/resources)_

This section describes the minimum recommended computing resources for the Istio components in a cluster.

The CPU and memory allocations for each component are [configurable.](#configuring-resource-allocations)

Before enabling Istio, we recommend that you confirm that your Rancher worker nodes have enough CPU and memory to run all of the components of Istio.

> **Tip:** In larger deployments, it is strongly advised that the infrastructure be placed on dedicated nodes in the cluster by adding a node selector for each Istio component.

The table below shows a summary of the minimum recommended resource requests and limits for the CPU and memory of each central Istio component.

In Kubernetes, the resource request indicates that the workload will not deployed on a node unless the node has at least the specified amount of memory and CPU available. If the workload surpasses the limit for CPU or memory, it can be terminated or evicted from the node. For more information on managing resource limits for containers, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/)

Workload | CPU - Request | Mem - Request | CPU - Limit | Mem - Limit | Configurable
---------|---------------|---------------|-------------|-------------|-------------
istiod | 610m | 2186Mi | 4000m | 2048Mi | Y | Y
 istio-telemetry | 1000m         | 10214Mi        | 4800m       | 4096Mi      | Y        
 istio-policy | 1000m         | 1024Mi        | 4800m       | 4096Mi      | Y      
istio-ingressgateway | 2000m | 1024Mi  | 10m |  40Mi | Y                   
 Others          | 500m          | 500Mi         | -         | -         | Y           
 **Total**       | **4500m**         | **5620Mi**        | **>12300m**         | **>14848Mi**         | **-**   


# Configuring Resource Allocations

You can individually configure the resource allocation for each type of Istio component. This section includes the default resource allocations for each component.

To make it easier to schedule the workloads to a node, a cluster administrator can reduce the CPU and memory resource requests for the component. However, the default CPU and memory allocations are the minimum that we recommend.

You can find more information about Istio configuration in the [official Istio documentation](https://istio.io/docs/concepts/what-is-istio).

To configure the resources allocated to an Istio component,

1. In Rancher Dashboard, navigate to your Istio installation in Apps & Marketplace
1. Click **Upgrade** to edit the base components via changes the values.yaml or add an [overlay file](link to overlayfile install instructions). 
1. Change the CPU or memory allocations, the nodes where each component will be scheduled to, or the node tolerations.
1. Click **Upgrade.** to rollout changes

**Result:** The resource allocations for the Istio components are updated.

## Istiod

[Istiod](https://istio.io/latest/docs/ops/deployment/architecture/#istiod)  provides the following:

- Authentication configuration
- Service discovery for the Envoy sidecars
- Traffic management capabilities for intelligent routing (A/B tests and canary rollouts)
- Configuration for resiliency (timeouts, retries, circuit breakers, etc)

For more information on Istiod, refer to the [documentation](https://istio.io/latest/docs/ops/deployment/architecture/#components).

## Tracing

[Distributed tracing](https://istio.io/latest/docs/tasks/observability/distributed-tracing/overview/) enables users to track a request through a service mesh. This makes it easier to troubleshoot problems with latency, parallelism and serialization.

Option | Description| Required | Default
-------|------------|-------|-------
Enable Tracing | Whether or not to deploy the istio-tracing. | Yes | True
Tracing CPU Limit | CPU resource limit for the istio-tracing pod.  | Yes      | 500
Tracing CPU Reservation | CPU reservation for the istio-tracing pod. | Yes      | 100
Tracing Memory Limit | Memory resource limit for the istio-tracing pod. | Yes      | 1024
Tracing Memory Reservation | Memory resource requests for the istio-tracing pod.  | Yes      | 100
Tracing Selector | Ability to select the nodes in which tracing pod is deployed to. To use this option, the nodes must have labels. | No       | n/a

## Ingress Gateway

The Istio gateway allows Istio features such as monitoring and route rules to be applied to traffic entering the cluster. This gateway is a prerequisite for outside traffic to make requests to Istio.

For more information, refer to the [documentation](https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/).

Option | Description| Required | Default
-------|------------|-------|-------
Enable Ingress Gateway | Whether or not to deploy the istio-ingressgateway. | Yes      | False
Service Type of Istio Ingress Gateway | How to expose the gateway. You can choose NodePort or Loadbalancer | Yes      | NodePort
Http2 Port | The NodePort for http2 requests  | Yes      | 31380
Https Port | The NodePort for https requests  | Yes      | 31390
Load Balancer IP | Ingress Gateway Load Balancer IP | No       | n/a
Load Balancer Source Ranges | Ingress Gateway Load Balancer Source Ranges | No       | n/a
Ingress Gateway CPU Limit | CPU resource limit for the istio-ingressgateway pod. | Yes      | 2000
Ingress Gateway CPU Reservation | CPU reservation for the istio-ingressgateway pod. | Yes      | 100
Ingress Gateway Memory Limit | Memory resource limit for the istio-ingressgateway pod. | Yes      | 1024
Ingress Gateway Memory Reservation | Memory resource requests for the istio-ingressgateway pod. | Yes      | 128
Ingress Gateway Selector | Ability to select the nodes in which istio-ingressgateway pod is deployed to. To use this option, the nodes must have labels. | No       | n/a
