---
title: Service Mesh Configuration
weight: 1
---

_Available as of v2.3.0-alpha_

While configuring service mesh, there are multiple options that can be configured.

## PILOT

Option | Description
-------|-------------
Pilot CPU Limit | CPU resource limit for the istio-pilot pod.
Pilot CPU Reservation | CPU reservation for the istio-pilot pod.
Pilot Memory Limit | Memory resource limit for the istio-pilot pod.
Pilot Memory Reservation | Memory resource requests for the istio-pilot pod.
Trace sampling Percentage | [Trace sampling percentage](https://istio.io/docs/tasks/telemetry/distributed-tracing/overview/#trace-sampling)
Pilot Selector | Ability to select the nodes in which istio-pilot pod is deployed to. To use this option, the nodes must have labels.

## TELEMETRY

Option | Description
-------|-------------
Telemetry CPU Limit | CPU resource limit for the istio-telemetry pod.
Telemetry CPU Reservation | CPU reservation for the istio-telemetry pod.
Telemetry Memory Limit | Memory resource limit for the istio-telemetry pod.
Telemetry Memory Reservation | Memory resource requests for the istio-telemetry pod.
Telemetry Selector | Ability to select the nodes in which istio-telemetry pod is deployed to. To use this option, the nodes must have labels.

## POLICY

Option | Description
-------|-------------
Enable Policy | Whether or not to deploy the istio-policy.
Policy CPU Limit | CPU resource limit for the istio-policy pod.
Policy CPU Reservation | CPU reservation for the istio-policy pod.
Policy Memory Limit | Memory resource limit for the istio-policy pod.
Policy Memory Reservation | Memory resource requests for the istio-policy pod.
Policy Selector | Ability to select the nodes in which istio-policy pod is deployed to. To use this option, the nodes must have labels.

## PROMETHEUS

Option | Description
-------|-------------
Prometheus CPU Limit | CPU resource limit for the Prometheus pod.
Prometheus CPU Reservation | CPU reservation for the Prometheus pod.
Prometheus Memory Limit | Memory resource limit for the Prometheus pod.
Prometheus Memory Reservation | Memory resource requests for the Prometheus pod.
Retention for Prometheus | How long your Prometheus instance retains data
Prometheus Selector | Ability to select the nodes in which Prometheus pod is deployed to. To use this option, the nodes must have labels.

## GRAFANA

Option | Description
-------|-------------
Enable Grafana | Whether or not to deploy the Grafana.
Grafana CPU Limit | CPU resource limit for the Grafana pod.
Grafana CPU Reservation | CPU reservation for the Grafana pod.
Grafana Memory Limit | Memory resource limit for the Grafana pod.
Grafana Memory Reservation | Memory resource requests for the Grafana pod.
Grafana Selector | Ability to select the nodes in which Grafana pod is deployed to. To use this option, the nodes must have labels.

## TRACING

Option | Description
-------|-------------
Enable Tracing | Whether or not to deploy the istio-tracing.
Tracing CPU Limit | CPU resource limit for the istio-tracing pod.
Tracing CPU Reservation | CPU reservation for the istio-tracing pod.
Tracing Memory Limit | Memory resource limit for the istio-tracing pod.
Tracing Memory Reservation | Memory resource requests for the istio-tracing pod.
Tracing Selector | Ability to select the nodes in which tracing pod is deployed to. To use this option, the nodes must have labels.

## GATEWAY

Option | Description
-------|-------------
Enable Gateway | Whether or not to deploy the istio-ingressgateway.
Service Type of Istio Ingress Gateway | How to expose the gateway. You can choose NodePort or Loadbalancer
Http2 Port | The NodePort for http2 requests
Https Port | The NodePort for https requests
Load Balancer IP | Ingress Gateway Load Balancer IP
Load Balancer Source Ranges | Ingress Gateway Load Balancer Source Ranges
Gateway CPU Limit | CPU resource limit for the istio-ingressgateway pod.
Gateway CPU Reservation | CPU reservation for the istio-ingressgateway pod.
Gateway Memory Limit | Memory resource limit for the istio-ingressgateway pod.
Gateway Memory Reservation | Memory resource requests for the istio-ingressgateway pod.
Gateway Selector | Ability to select the nodes in which istio-ingressgateway pod is deployed to. To use this option, the nodes must have labels.
