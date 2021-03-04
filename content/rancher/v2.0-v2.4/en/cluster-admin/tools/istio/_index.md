---
title: Istio
weight: 15
aliases:
  - /rancher/v2.0-v2.4/en/dashboard/istio
  - /rancher/v2.0-v2.4/en/project-admin/istio/configuring-resource-allocations/
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/istio/
  - /rancher/v2.0-v2.4/en/project-admin/istio
  - /rancher/v2.0-v2.4/en/istio/legacy/cluster-istio
---
_Available as of v2.3.0_

[Istio](https://istio.io/) is an open-source tool that makes it easier for DevOps teams to observe, control, troubleshoot, and secure the traffic within a complex network of microservices.

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

Rancher's Istio integration comes with comprehensive visualization aids:

- **Trace the root cause of errors with Jaeger.** [Jaeger](https://www.jaegertracing.io/) is an open-source tool that provides a UI for a distributed tracing system, which is useful for root cause analysis and for determining what causes poor performance. Distributed tracing allows you to view an entire chain of calls, which might originate with a user request and traverse dozens of microservices.
- **Get the full picture of your microservice architecture with Kiali.** [Kiali](https://www.kiali.io/) provides a diagram that shows the services within a service mesh and how they are connected, including the traffic rates and latencies between them. You can check the health of the service mesh, or drill down to see the incoming and outgoing requests to a single component.
- **Gain insights from time series analytics with Grafana dashboards.** [Grafana](https://grafana.com/) is an analytics platform that allows you to query, visualize, alert on and understand the data gathered by Prometheus.
- **Write custom queries for time series data with the Prometheus UI.** [Prometheus](https://prometheus.io/) is a systems monitoring and alerting toolkit. Prometheus scrapes data from your cluster, which is then used by Grafana. A Prometheus UI is also integrated into Rancher, and lets you write custom queries for time series data and see the results in the UI.


Istio needs to be set up by a Rancher administrator or cluster administrator before it can be used in a project.

# Prerequisites

Before enabling Istio, we recommend that you confirm that your Rancher worker nodes have enough [CPU and memory]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/resources) to run all of the components of Istio.

# Setup Guide

Refer to the [setup guide]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/setup) for instructions on how to set up Istio and use it in a project.

# Disabling Istio

To remove Istio components from a cluster, namespace, or workload, refer to the section on [disabling Istio.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/disabling-istio)

# Accessing Visualizations

> By default, only cluster owners have access to Jaeger and Kiali. For instructions on how to allow project members to access them, see [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/istio/rbac/)

After Istio is set up in a cluster, Grafana, Prometheus, Jaeger, and Kiali are available in the Rancher UI.

Your access to the visualizations depend on your role. Grafana and Prometheus are only available for cluster owners. The Kiali and Jaeger UIs are available only to cluster owners by default, but cluster owners can allow project members to access them by editing the Istio settings. When you go to your project and click **Resources > Istio,** you can go to each UI for Kiali, Jaeger, Grafana, and Prometheus by clicking their icons in the top right corner of the page.

To see the visualizations, go to the cluster where Istio is set up and click **Tools > Istio.** You should see links to each UI at the top of the page.

You can also get to the visualization tools from the project view.

# Viewing the Kiali Traffic Graph

1. From the project view in Rancher, click **Resources > Istio.**
1. If you are a cluster owner, you can go to the **Traffic Graph** tab. This tab has the Kiali network visualization integrated into the UI.

# Viewing Traffic Metrics

Istio’s monitoring features provide visibility into the performance of all your services.

1. From the project view in Rancher, click **Resources > Istio.**
1. Go to the **Traffic Metrics** tab. After traffic is generated in your cluster, you should be able to see metrics for **Success Rate, Request Volume, 4xx Response Count, Project 5xx Response Count** and **Request Duration.** Cluster owners can see all of the metrics, while project members can see a subset of the metrics.

# Architecture

Istio installs a service mesh that uses [Envoy](https://www.envoyproxy.io/learn/service-mesh) sidecar proxies to intercept traffic to each workload. These sidecars intercept and manage service-to-service communication, allowing fine-grained observation and control over traffic within the cluster.

Only workloads that have the Istio sidecar injected can be tracked and controlled by Istio.

Enabling Istio in Rancher enables monitoring in the cluster, and enables Istio in all new namespaces that are created in a cluster. You need to manually enable Istio in preexisting namespaces.

When a namespace has Istio enabled, new workloads deployed in the namespace will automatically have the Istio sidecar. You need to manually enable Istio in preexisting workloads.

For more information on the Istio sidecar, refer to the [Istio docs](https://istio.io/docs/setup/kubernetes/additional-setup/sidecar-injection/).

### Two Ingresses

By default, each Rancher-provisioned cluster has one NGINX ingress controller allowing traffic into the cluster. To allow Istio to receive external traffic, you need to enable the Istio ingress gateway for the cluster. The result is that your cluster will have two ingresses.

![In an Istio-enabled cluster, you can have two ingresses: the default Nginx ingress, and the default Istio controller.]({{<baseurl>}}/img/rancher/istio-ingress.svg)