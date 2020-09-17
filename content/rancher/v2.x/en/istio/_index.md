---
title: Istio
weight: 15
---

_Available as of v2.4.0_

[Istio](https://istio.io/) is an open-source tool that makes it easier for DevOps teams to observe, control, troubleshoot, and secure the traffic within a complex network of microservices.

> Rancher's Istio integration changed significantly in v2.5. If you are using Rancher v2.4, refer to the [legacy documentation.](../legacy)

As a network of microservices changes and grows, the interactions between them can become more difficult to manage and understand. In such a situation, it is useful to have a service mesh as a separate infrastructure layer. Istio's service mesh lets you manipulate traffic between microservices without changing the microservices directly.

Our integration of Istio is designed so that a Rancher operator, such as an administrator or cluster owner, can deliver Istio to developers. Then developers can use Istio to enforce security policies, troubleshoot problems, or manage traffic for green/blue deployments, canary deployments, or A/B testing.

This service mesh provides features that include but are not limited to the following:

- Traffic management features
- Enhanced monitoring and tracing
- Service discovery and routing
- Secure connections and service-to-service authentication with mutual TLS
- Load balancing
- Automatic retries, backoff, and circuit breaking

After Istio is enabled in a cluster, you can leverage Istio's control plane functionality with `kubectl`.

Rancher's Istio integration comes with support for [Kiali.](https://www.kiali.io/) Kiali provides a diagram that shows the services within a service mesh and how they are connected, including the traffic rates and latencies between them. You can check the health of the service mesh, or drill down to see the incoming and outgoing requests to a single component.

# What's New in Rancher v2.5

The overall architecture of Istio has been simplified. A single component, Istiod, has been created by combining Pilot, Citadel, Galley and the sidecar injector. Node Agent functionality has also been merged into istio-agent.

Addons that were previously installed by Istio (cert-manager, Grafana, Jaeger, Kiali, Prometheus, Zipkin) will now need to be installed separately. Istio will support installation of integrations that are from the Istio Project and will maintain compatibility with those that are not.

A Prometheus integration will still be available through an installation of [Rancher Monitoring,](../../monitoring-alerting) or by installing your own Prometheus operator. Rancher's Istio chart will also install Kiali by default to ensure you can get a full picture of your microservices out of the box.

Istio has migrated away from Helm as a way to install Istio and now provides installation through the istioctl binary or Istio Operator. To ensure the easiest interaction with Istio, Rancher's Istio will maintain a Helm chart that utilizes the istioctl binary to manage your Istio installation.

This Helm chart will be available via the Apps and Marketplace in the UI. A user that has access to the Rancher Chart's catalog will need to set up Istio before it can be used in the project.

# Prerequisites

Before enabling Istio, we recommend that you confirm that your Rancher worker nodes have enough [CPU and memory](./resources) to run all of the components of Istio.

# Setup Guide

Refer to the [setup guide]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup) for instructions on how to set up Istio and use it in a project.

# Disabling Istio

To remove Istio components from a cluster, namespace, or workload, refer to the section on [disabling Istio.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/disabling-istio)

# Architecture

Istio installs a service mesh that uses [Envoy](https://www.envoyproxy.io/learn/service-mesh) sidecar proxies to intercept traffic to each workload. These sidecars intercept and manage service-to-service communication, allowing fine-grained observation and control over traffic within the cluster.

Only workloads that have the Istio sidecar injected can be tracked and controlled by Istio.

Enabling Istio in Rancher enables monitoring in the cluster, and enables Istio in all new namespaces that are created in a cluster. You need to manually enable Istio in preexisting namespaces.

When a namespace has Istio enabled, new workloads deployed in the namespace will automatically have the Istio sidecar. You need to manually enable Istio in preexisting workloads.

For more information on the Istio sidecar, refer to the [Istio docs](https://istio.io/docs/setup/kubernetes/additional-setup/sidecar-injection/).

### Multiple Ingresses

By default, each Rancher-provisioned cluster has one NGINX ingress controller allowing traffic into the cluster. To allow Istio to receive external traffic, you need to enable the Istio ingress gateway for the cluster. The result is that your cluster will have two ingresses.

![In an Istio-enabled cluster, you can have two ingresses: the default Nginx ingress, and the default Istio controller.]({{<baseurl>}}/img/rancher/istio-ingress.svg)

Additional Ingresses can be configured via the [overlay file] (overlay file link here)

### Egress Support

By default an Egress gateway is not installed, but can be configured via the [overlay file] (overlay file link here)