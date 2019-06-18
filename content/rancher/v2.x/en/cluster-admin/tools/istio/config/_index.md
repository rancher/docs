---
title: Istio Configuration
weight: 1
---

<<<<<<< HEAD
_Available as of v2.3.0-alpha_
=======
_Available as of v2.3.0-alpha4_
>>>>>>> Change v2.3.0-alpha to v2.3.0-alph4 for HPA and Istio docs

There are several configuration options for Istio. You can find more information about Istio configuration in the [official Istio documentation](https://istio.io/docs/concepts/what-is-istio).

## PILOT

Pilot provides service discovery for the Envoy sidecars, traffic management capabilities for intelligent routing (e.g., A/B tests, canary rollouts, etc.), and resiliency (timeouts, retries, circuit breakers, etc.).

For more information on Pilot, refer to the [documentation](https://istio.io/docs/concepts/traffic-management/#pilot-and-envoy).

Option | Description| Required | Default
-------|------------|-------|-------
Pilot CPU Limit | CPU resource limit for the istio-pilot pod.| Yes      | 1000
Pilot CPU Reservation | CPU reservation for the istio-pilot pod. | Yes      | 500
Pilot Memory Limit | Memory resource limit for the istio-pilot pod. | Yes      | 4096
Pilot Memory Reservation | Memory resource requests for the istio-pilot pod. | Yes      | 2048
Trace sampling Percentage | [Trace sampling percentage](https://istio.io/docs/tasks/telemetry/distributed-tracing/overview/#trace-sampling) | Yes      | 1
Pilot Selector | Ability to select the nodes in which istio-pilot pod is deployed to. To use this option, the nodes must have labels. | No       | n/a

## MIXER

Mixer is a platform-independent component. Mixer enforces access control and usage policies across the service mesh, and collects telemetry data from the Envoy proxy and other services. For more information on Mixer, policies and telemetry, refer to the [documentation](https://istio.io/docs/concepts/policies-and-telemetry/).

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

## TRACING

Istio-enabled applications can collect trace spans. For more information on distributed tracing with Istio, refer to the [documentation](https://istio.io/docs/tasks/telemetry/distributed-tracing/overview/).

Option | Description| Required | Default
-------|------------|-------|-------
Enable Tracing | Whether or not to deploy the istio-tracing. | Yes | True
Tracing CPU Limit | CPU resource limit for the istio-tracing pod.  | Yes      | 500
Tracing CPU Reservation | CPU reservation for the istio-tracing pod. | Yes      | 100
Tracing Memory Limit | Memory resource limit for the istio-tracing pod. | Yes      | 1024
Tracing Memory Reservation | Memory resource requests for the istio-tracing pod.  | Yes      | 100
Tracing Selector | Ability to select the nodes in which tracing pod is deployed to. To use this option, the nodes must have labels. | No       | n/a

## INGRESS GATEWAY

The Istio Gateway allows Istio features such as monitoring and route rules to be applied to traffic entering the cluster. For more information, refer to the [documentation](https://istio.io/docs/tasks/traffic-management/ingress/).

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

## PROMETHEUS

You can query for Istio metrics using Prometheus. Prometheus is an open-source systems monitoring and alerting toolkit.

Option | Description| Required | Default
-------|------------|-------|-------
Prometheus CPU Limit | CPU resource limit for the Prometheus pod.| Yes      | 1000
Prometheus CPU Reservation | CPU reservation for the Prometheus pod.| Yes      | 750
Prometheus Memory Limit | Memory resource limit for the Prometheus pod.| Yes      | 1024
Prometheus Memory Reservation | Memory resource requests for the Prometheus pod.| Yes      | 750
Retention for Prometheus | How long your Prometheus instance retains data | Yes      | 6
Prometheus Selector | Ability to select the nodes in which Prometheus pod is deployed to. To use this option, the nodes must have labels.| No       | n/a

## GRAFANA

You can visualize metrics with Grafana. Grafana is a tool that lets you visualize Istio traffic data.

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
Existing Claim | Use existing PVC for Grafna | Yes, when Grafana enabled, enabled PV and use existing PVC  | n/a


