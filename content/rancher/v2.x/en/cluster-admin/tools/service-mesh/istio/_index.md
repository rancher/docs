---
title: Service Mesh Configuration
weight: 1
---

_Available as of v2.3.0-alpha_

While configuring service mesh, there are multiple options that can be configured.

## PILOT

Option | Description| Field 
-------|------------|-------
Pilot CPU Limit | CPU resource limit for the istio-pilot pod.| istio-pilot.discovery.resources.limits.cpu
Pilot CPU Reservation | CPU reservation for the istio-pilot pod. | istio-pilot.discovery.resources.requests.cpu
Pilot Memory Limit | Memory resource limit for the istio-pilot pod. | istio-pilot.discovery.resources.limits.memory
Pilot Memory Reservation | Memory resource requests for the istio-pilot pod. | istio-pilot.discovery.resources.requests.memory
Trace sampling Percentage | [Trace sampling percentage](https://istio.io/docs/tasks/telemetry/distributed-tracing/overview/#trace-sampling) | stio-pilot.discovery.env.PILOT_TRACE_SAMPLING
Pilot Selector | Ability to select the nodes in which istio-pilot pod is deployed to. To use this option, the nodes must have labels. | istio-pilot.nodeAffinity.matchExpressions

## MIXER

Option | Description| Field 
-------|------------|-------
Mixer Telemetry CPU Limit | CPU resource limit for the istio-telemetry pod.| istio-telemetry.mixer.resources.limits.cpu
Mixer Telemetry CPU Reservation | CPU reservation for the istio-telemetry pod.| istio-telemetry.mixer.resources.requests.cpu
Mixer Telemetry Memory Limit | Memory resource limit for the istio-telemetry pod.| istio-telemetry.mixer.resources.limits.memory
Mixer Telemetry Memory Reservation | Memory resource requests for the istio-telemetry pod.| istio-telemetry.mixer.resources.requests.memory
Enable Mixer Policy | Whether or not to deploy the istio-policy. | n/a
Mixer Policy CPU Limit | CPU resource limit for the istio-policy pod. | istio-policy.mixer.resources.limits.cpu
Mixer Policy CPU Reservation | CPU reservation for the istio-policy pod. | istio-policy.mixer.resources.requests.cpu
Mixer Policy Memory Limit | Memory resource limit for the istio-policy pod. | istio-policy.mixer.resources.limits.memory
Mixer Policy Memory Reservation | Memory resource requests for the istio-policy pod. | istio-policy.mixer.resources.requests.memory
Mixer Selector | Ability to select the nodes in which istio-policy and istio-telemetry pods are deployed to. To use this option, the nodes must have labels. | (istio-policy / istio-telemetry).nodeAffinity.matchExpressions

## TRACING

Option | Description| Field 
-------|------------|-------
Enable Tracing | Whether or not to deploy the istio-tracing. | n/a
Tracing CPU Limit | CPU resource limit for the istio-tracing pod.  | istio-tracing.jaeger.resources.limits.cpu
Tracing CPU Reservation | CPU reservation for the istio-tracing pod. | istio-tracing.jaeger.resources.requests.cpu
Tracing Memory Limit | Memory resource limit for the istio-tracing pod. | istio-tracing.jaeger.resources.limits.memory
Tracing Memory Reservation | Memory resource requests for the istio-tracing pod.  | istio-tracing.jaeger.resources.requests.memory
Tracing Selector | Ability to select the nodes in which tracing pod is deployed to. To use this option, the nodes must have labels. | istio-tracing.nodeAffinity.matchExpressions

## INGRESS GATEWAY

Option | Description| Field 
-------|------------|-------
Enable Ingress Gateway | Whether or not to deploy the istio-ingressgateway. | n/a
Service Type of Istio Ingress Gateway | How to expose the gateway. You can choose NodePort or Loadbalancer | service.istio-ingressgateway.type
Http2 Port | The NodePort for http2 requests  | service.istio-ingressgateway.ports.http2.nodePort
Https Port | The NodePort for https requests  | service.istio-ingressgateway.ports.https.nodePort
Load Balancer IP | Ingress Gateway Load Balancer IP | service.istio-ingressgateway.loadBalancerIp
Load Balancer Source Ranges | Ingress Gateway Load Balancer Source Ranges | service.istio-ingressgateway.loadBalancerSourceRanges
Ingress Gateway CPU Limit | CPU resource limit for the istio-ingressgateway pod. | istio-ingressgateway.istio-proxy.resources.limits.cpu
Ingress Gateway CPU Reservation | CPU reservation for the istio-ingressgateway pod. | istio-ingressgateway.istio-proxy.resources.requests.cpu
Ingress Gateway Memory Limit | Memory resource limit for the istio-ingressgateway pod. | istio-ingressgateway.istio-proxy.resources.limits.memory
Ingress Gateway Memory Reservation | Memory resource requests for the istio-ingressgateway pod. | istio-ingressgateway.istio-proxy.resources.requests.memory
Ingress Gateway Selector | Ability to select the nodes in which istio-ingressgateway pod is deployed to. To use this option, the nodes must have labels. | istio-ingressgateway.nodeAffinity.matchExpressions

## PROMETHEUS

Option | Description| Field 
-------|------------|-------
Prometheus CPU Limit | CPU resource limit for the Prometheus pod.| prometheus.prometheus.resources.limits.cpu 
Prometheus CPU Reservation | CPU reservation for the Prometheus pod.| prometheus.prometheus.resources.requests.cpu 
Prometheus Memory Limit | Memory resource limit for the Prometheus pod.| prometheus.prometheus.resources.limits.memory 
Prometheus Memory Reservation | Memory resource requests for the Prometheus pod.| prometheus.prometheus.resources.requests.memory 
Retention for Prometheus | How long your Prometheus instance retains data | prometheus.prometheus.args 
Prometheus Selector | Ability to select the nodes in which Prometheus pod is deployed to. To use this option, the nodes must have labels.| prometheus.nodeAffinity.matchExpressions 

## GRAFANA

Option | Description| Field 
-------|------------|-------
Enable Grafana | Whether or not to deploy the Grafana.| n/a 
Grafana CPU Limit | CPU resource limit for the Grafana pod.| grafana.grafana.resources.limits.cpu 
Grafana CPU Reservation | CPU reservation for the Grafana pod.| grafana.grafana.resources.requests.cpu 
Grafana Memory Limit | Memory resource limit for the Grafana pod.| grafana.grafana.resources.limits.memory 
Grafana Memory Reservation | Memory resource requests for the Grafana pod.| grafana.grafana.resources.requests.memory 
Grafana Selector | Ability to select the nodes in which Grafana pod is deployed to. To use this option, the nodes must have labels. | grafana.nodeAffinity.matchExpressions 
Enable Persistent Storage for Grafana | Enable Persistent Storage for Grafana | n/a 
Source | Use a Storage Class to provision a new persistent volume or Use an existing persistent volume claim | n/a 
Storage Class | Storage Class for provisioning PV for Grafana | volume.istio-grafana-pvc.storageClass 
Existing Claim | Use existing PVC for Grafna | grafana.volumes.data.pvc.claimName 


