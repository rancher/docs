---
title: Istio
weight: 14
aliases:
  - /rancher/v2.6/en/dashboard/istio
---

[Istio](https://istio.io/) is an open-source tool that makes it easier for DevOps teams to observe, secure, control, and troubleshoot the traffic within a complex network of microservices.

> If you are still using Istio v1, installed with the legacy Cluster Manager, we recommend migrating to Istio v2 by following [these steps.](./migrating/#migrating-istio) Istio v1 (1.5.920) will receive limited security updates should no longer be used. The images for Istio 1.5.920 should not be downloaded unless upgrading Istio is not feasible.

- [Overview](#overview)
- [Tools Bundled with Istio](#tools-bundled-with-istio)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
- [Remove Istio](#remove-istio)
- [Migrate from Previous Istio Version](#migrate-from-previous-istio-version)
- [Accessing Visualizations](#accessing-visualizations)
- [Architecture](#architecture)
- [Additional steps for installing Istio on an RKE2 cluster](#additional-steps-for-installing-istio-on-an-rke2-cluster)

# Overview

As a network of microservices changes and grows, the interactions between them can become increasingly difficult to manage and understand. In such a situation, it is useful to have a service mesh as a separate infrastructure layer. Istio's service mesh lets you manipulate traffic between microservices without changing the microservices directly.

Our integration of Istio is designed so that a Rancher operator, such as an administrator or cluster owner, can deliver Istio to a team of developers. Then developers can use Istio to enforce security policies, troubleshoot problems, or manage traffic for green/blue deployments, canary deployments, or A/B testing.

This core service mesh provides features that include but are not limited to the following:

- **Traffic Management** such as ingress and egress routing, circuit breaking, mirroring.
- **Security** with resources to authenticate and authorize traffic and users, mTLS included.
- **Observability** of logs, metrics, and distributed traffic flows.

After [setting up istio]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/tools/istio/setup) you can leverage Istio's control plane functionality through the Cluster Explorer, `kubectl`, or `istioctl`.

Istio needs to be set up by a `cluster-admin` before it can be used in a project.

# Tools Bundled with Istio

Our [Istio](https://istio.io/) installer wraps the istioctl binary commands in a handy Helm chart, including an overlay file option to allow complex customization. 

It also includes the following:

### Kiali

Kiali is a comprehensive visualization aid used for graphing traffic flow throughout the service mesh. It allows you to see how they are connected, including the traffic rates and latencies between them. 

You can check the health of the service mesh, or drill down to see the incoming and outgoing requests to a single component.

### Jaeger

Our Istio installer includes a quick-start, all-in-one installation of [Jaeger,](https://www.jaegertracing.io/) a tool used for tracing distributed systems.

Note that this is not a production-qualified deployment of Jaeger. This deployment uses an in-memory storage component, while a persistent storage component is recommended for production. For more information on which deployment strategy you may need, refer to the [Jaeger documentation.](https://www.jaegertracing.io/docs/latest/operator/#production-strategy)

# Prerequisites

Before enabling Istio, we recommend that you confirm that your Rancher worker nodes have enough [CPU and memory]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/tools/istio/resources) to run all of the components of Istio.

If you are installing Istio on RKE2 cluster, some additional steps are required. For details, see [this section.](#additional-steps-for-installing-istio-on-an-rke2-cluster)

Note that Istio v2 (upstream Istio v1.7+) cannot be upgraded in an air gapped environment.

# Setup Guide

Refer to the [setup guide]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/tools/istio/setup) for instructions on how to set up Istio and use it in a project.

# Remove Istio

To remove Istio components from a cluster, namespace, or workload, refer to the section on [uninstalling Istio.]({{<baseurl>}}/rancher/v2.6/en/istio/disabling-istio/)

# Migrate From Previous Istio Version

For details on migrating from Istio v1 installed with the legacy Cluster Manager, see [this page.](./migrating)

# Accessing Visualizations

> By default, only cluster-admins have access to Kiali. For instructions on how to allow admin, edit or views roles to access them, see [this section.]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/tools/istio/rbac/)

After Istio is set up in a cluster, Grafana, Prometheus,and Kiali are available in the Rancher UI. 

To access the Grafana and Prometheus visualizations, from the **Cluster Explorer** navigate to the **Monitoring** app overview page, and click on **Grafana** or **Prometheus**

To access the Kiali visualization, from the **Cluster Explorer** navigate to the **Istio** app overview page, and click on **Kiali**. From here you can access the **Traffic Graph** tab or the **Traffic Metrics** tab to see network visualizations and metrics. 

By default, all namespace will picked up by prometheus and make data available for Kiali graphs. Refer to [selector/scrape config setup](./configuration-reference/selectors-and-scrape) if you would like to use a different configuration for prometheus data scraping. 

Your access to the visualizations depend on your role. Grafana and Prometheus are only available for `cluster-admin` roles. The Kiali UI is available only to `cluster-admin` by default, but `cluster-admin` can allow other roles to access them by editing the Istio values.yaml.

# Architecture

Istio installs a service mesh that uses [Envoy](https://www.envoyproxy.io/learn/service-mesh) sidecar proxies to intercept traffic to each workload. These sidecars intercept and manage service-to-service communication, allowing fine-grained observation and control over traffic within the cluster.

Only workloads that have the Istio sidecar injected can be tracked and controlled by Istio.

When a namespace has Istio enabled, new workloads deployed in the namespace will automatically have the Istio sidecar. You need to manually enable Istio in preexisting workloads.

For more information on the Istio sidecar, refer to the [Istio sidecare-injection docs](https://istio.io/docs/setup/kubernetes/additional-setup/sidecar-injection/) and for more information on Istio's architecture, refer to the [Istio Architecture docs](https://istio.io/latest/docs/ops/deployment/architecture/)

### Multiple Ingresses

By default, each Rancher-provisioned cluster has one NGINX ingress controller allowing traffic into the cluster. Istio also installs an ingress gateway by default into the `istio-system` namespace.  The result is that your cluster will have two ingresses in your cluster.

![In an Istio-enabled cluster, you can have two ingresses: the default Nginx ingress, and the default Istio controller.]({{<baseurl>}}/img/rancher/istio-ingress.svg)
 
 Additional Istio Ingress gateways can be enabled via the [overlay file]({{<baseurl>}}/rancher/v2.6/en/istio/v2.5/configuration-reference/#overlay-file).

### Egress Support

By default the Egress gateway is disabled, but can be enabled on install or upgrade through the values.yaml or via the [overlay file]({{<baseurl>}}/rancher/v2.6/en/istio/v2.5/configuration-reference/#overlay-file).

# Additional Steps for Installing Istio on an RKE2 Cluster

To install Istio on an RKE2 cluster, follow the steps in [this section.]({{<baseurl>}}/rancher/v2.6/en/istio/v2.5/configuration-reference/rke2/)
