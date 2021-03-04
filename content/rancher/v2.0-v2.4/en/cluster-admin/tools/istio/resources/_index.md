---
title: CPU and Memory Allocations
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/istio/configuring-resource-allocations/
  - /rancher/v2.0-v2.4/en/project-admin/istio/config/
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/istio/resources
  - /rancher/v2.0-v2.4/en/istio/legacy/resources
  - /rancher/v2.0-v2.4/en/istio/v2.3.x-v2.4.x/resources
---
_Available as of v2.3.0_

This section describes the minimum recommended computing resources for the Istio components in a cluster.

The CPU and memory allocations for each component are [configurable.](#configuring-resource-allocations)

Before enabling Istio, we recommend that you confirm that your Rancher worker nodes have enough CPU and memory to run all of the components of Istio.

> **Tip:** In larger deployments, it is strongly advised that the infrastructure be placed on dedicated nodes in the cluster by adding a node selector for each Istio component.

The table below shows a summary of the minimum recommended resource requests and limits for the CPU and memory of each central Istio component.

In Kubernetes, the resource request indicates that the workload will not deployed on a node unless the node has at least the specified amount of memory and CPU available. If the workload surpasses the limit for CPU or memory, it can be terminated or evicted from the node. For more information on managing resource limits for containers, refer to the [Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/)

Workload | Container | CPU - Request | Mem - Request | CPU - Limit | Mem - Limit | Configurable
---------|-----------|---------------|---------------|-------------|-------------|-------------
istio-pilot |discovery| 500m | 2048Mi | 1000m | 4096Mi | Y
 istio-telemetry |mixer| 1000m         | 1024Mi        | 4800m       | 4096Mi      | Y            
 istio-policy | mixer      | 1000m         | 1024Mi        | 4800m       | 4096Mi      | Y            
 istio-tracing   | jaeger     | 100m          | 100Mi         | 500m        | 1024Mi      | Y            
 prometheus      | prometheus | 750m          | 750Mi         | 1000m       | 1024Mi      | Y            
 grafana         | grafana    | 100m          | 100Mi         | 200m        | 512Mi       | Y            
 Others          | -        | 500m          | 500Mi         | -         | -         | N            
 **Total**           | **-**        | **3950m**         | **5546Mi**        | **>12300m**         | **>14848Mi**         | **-**   


# Configuring Resource Allocations

You can individually configure the resource allocation for each type of Istio component. This section includes the default resource allocations for each component.

To make it easier to schedule the workloads to a node, a cluster administrator can reduce the CPU and memory resource requests for the component. However, the default CPU and memory allocations are the minimum that we recommend.

You can find more information about Istio configuration in the [official Istio documentation](https://istio.io/docs/concepts/what-is-istio).

To configure the resources allocated to an Istio component, 

1. In Rancher, go to the cluster where you have Istio installed.
1. Click **Tools > Istio.** This opens the Istio configuration page.
1. Change the CPU or memory allocations, the nodes where each component will be scheduled to, or the node tolerations.
1. Click **Save.**

**Result:** The resource allocations for the Istio components are updated.

## Pilot

[Pilot](https://istio.io/docs/ops/deployment/architecture/#pilot)  provides the following:

- Authentication configuration
- Service discovery for the Envoy sidecars
- Traffic management capabilities for intelligent routing (A/B tests and canary rollouts)
- Configuration for resiliency (timeouts, retries, circuit breakers, etc)

For more information on Pilot, refer to the [documentation](https://istio.io/docs/concepts/traffic-management/#pilot-and-envoy).

Option | Description| Required | Default
-------|------------|-------|-------
Pilot CPU Limit | CPU resource limit for the istio-pilot pod.| Yes      | 1000
Pilot CPU Reservation | CPU reservation for the istio-pilot pod. | Yes      | 500
Pilot Memory Limit | Memory resource limit for the istio-pilot pod. | Yes      | 4096
Pilot Memory Reservation | Memory resource requests for the istio-pilot pod. | Yes      | 2048
Trace sampling Percentage | [Trace sampling percentage](https://istio.io/docs/tasks/telemetry/distributed-tracing/overview/#trace-sampling) | Yes      | 1
Pilot Selector | Ability to select the nodes in which istio-pilot pod is deployed to. To use this option, the nodes must have labels. | No       | n/a

## Mixer

[Mixer](https://istio.io/docs/ops/deployment/architecture/#mixer)  enforces access control and usage policies across the service mesh. It also integrates with plugins for monitoring tools such as Prometheus. The Envoy sidecar proxy passes telemetry data and monitoring data to Mixer, and Mixer passes the monitoring data to Prometheus.

For more information on Mixer, policies and telemetry, refer to the [documentation](https://istio.io/docs/concepts/policies-and-telemetry/).

Option | Description| Required | Default
-------|------------|-------|-------
Mixer Telemetry CPU Limit | CPU resource limit for the istio-telemetry pod.| Yes                      | 4800
Mixer Telemetry CPU Reservation | CPU reservation for the istio-telemetry pod.| Yes                      | 1000
Mixer Telemetry Memory Limit | Memory resource limit for the istio-telemetry pod.| Yes                      | 4096
Mixer Telemetry Memory Reservation | Memory resource requests for the istio-telemetry pod.| Yes                      | 1024
Enable Mixer Policy | Whether or not to deploy the istio-policy. | Yes                      | False
Mixer Policy CPU Limit | CPU resource limit for the istio-policy pod. | Yes, when policy enabled | 4800
Mixer Policy CPU Reservation | CPU reservation for the istio-policy pod. | Yes, when policy enabled | 1000
Mixer Policy Memory Limit | Memory resource limit for the istio-policy pod. | Yes, when policy enabled | 4096
Mixer Policy Memory Reservation | Memory resource requests for the istio-policy pod. | Yes, when policy enabled | 1024
Mixer Selector | Ability to select the nodes in which istio-policy and istio-telemetry pods are deployed to. To use this option, the nodes must have labels. | No                       | n/a

## Tracing

[Distributed tracing](https://istio.io/docs/tasks/telemetry/distributed-tracing/overview/) enables users to track a request through a service mesh. This makes it easier to troubleshoot problems with latency, parallelism and serialization.

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

For more information, refer to the [documentation](https://istio.io/docs/tasks/traffic-management/ingress/).

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

## Prometheus

You can query for Istio metrics using Prometheus. Prometheus is an open-source systems monitoring and alerting toolkit.

Option | Description| Required | Default
-------|------------|-------|-------
Prometheus CPU Limit | CPU resource limit for the Prometheus pod.| Yes      | 1000
Prometheus CPU Reservation | CPU reservation for the Prometheus pod.| Yes      | 750
Prometheus Memory Limit | Memory resource limit for the Prometheus pod.| Yes      | 1024
Prometheus Memory Reservation | Memory resource requests for the Prometheus pod.| Yes      | 750
Retention for Prometheus | How long your Prometheus instance retains data | Yes      | 6
Prometheus Selector | Ability to select the nodes in which Prometheus pod is deployed to. To use this option, the nodes must have labels.| No       | n/a

## Grafana

You can visualize metrics with Grafana. Grafana lets you visualize Istio traffic data scraped by Prometheus.

Option | Description| Required | Default
-------|------------|-------|-------
Enable Grafana | Whether or not to deploy the Grafana.| Yes                                                         | True
Grafana CPU Limit | CPU resource limit for the Grafana pod.| Yes, when Grafana enabled                                   | 200
Grafana CPU Reservation | CPU reservation for the Grafana pod.| Yes, when Grafana enabled                                   | 100
Grafana Memory Limit | Memory resource limit for the Grafana pod.| Yes, when Grafana enabled                                   | 512
Grafana Memory Reservation | Memory resource requests for the Grafana pod.| Yes, when Grafana enabled                                   | 100
Grafana Selector | Ability to select the nodes in which Grafana pod is deployed to. To use this option, the nodes must have labels. | No                                                          | n/a
Enable Persistent Storage for Grafana | Enable Persistent Storage for Grafana | Yes, when Grafana enabled                                   | False
Source | Use a Storage Class to provision a new persistent volume or Use an existing persistent volume claim | Yes, when Grafana enabled and enabled PV                    | Use SC
Storage Class | Storage Class for provisioning PV for Grafana | Yes, when Grafana enabled, enabled PV and use storage class | Use the default class
Persistent Volume Size | The size for the PV you would like to provision for Grafana | Yes, when Grafana enabled, enabled PV and use storage class | 5Gi
Existing Claim | Use existing PVC for Grafana | Yes, when Grafana enabled, enabled PV and use existing PVC  | n/a
