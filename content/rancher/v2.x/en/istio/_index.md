---
title: Istio
weight: 15
---

# Istio in Cluster Manager
If you are using a Rancher version from **v2.3.x** to **v2.4.x**, the older way of setting up Istio in th **Cluster Manager** is documented in [this section.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/)


# Istio in Cluster Explorer
 [Istio](https://istio.io/) is an open-source tool that makes it easier for DevOps teams to observe, secure, control, and troubleshoot the traffic within a complex network of microservices.

As a network of microservices changes and grows, the interactions between them can become increasingly difficult to manage and understand. In such a situation, it is useful to have a service mesh as a separate infrastructure layer. Istio's service mesh lets you manipulate traffic between microservices without changing the microservices directly.

Our integration of Istio is designed so that a Rancher operator, such as an administrator or cluster owner, can deliver Istio to a team of developers. Then developers can use Istio to enforce security policies, troubleshoot problems, or manage traffic for green/blue deployments, canary deployments, or A/B testing.

This core service mesh provides features that include but are not limited to the following:

- **Traffic Management** such as ingress and egress routing, circuit breaking, mirroring.
- **Security** with resources to authenticate and authorize traffic and users, mTLS included.
- **Observability** of logs, metrics, and distributed traffic flows.

After [setting up istio]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup) you can leverage Istio's control plane functionality through the Cluster Explorer, `kubectl`, or `istioctl`.

Rancher's Istio integration comes with a comprehensive visualization aid:

- **Get the full picture of your microservice architecture with Kiali.** [Kiali](https://www.kiali.io/) provides a diagram that shows the services within a service mesh and how they are connected, including the traffic rates and latencies between them. You can check the health of the service mesh, or drill down to see the incoming and outgoing requests to a single component.

Istio needs to be set up by a `cluster-admin` before it can be used in a project.

# What's New in Rancher v2.5

The overall architecture of Istio has been simplified. A single component, Istiod, has been created by combining Pilot, Citadel, Galley and the sidecar injector. Node Agent functionality has also been merged into istio-agent.

Addons that were previously installed by Istio (cert-manager, Grafana, Jaeger, Kiali, Prometheus, Zipkin) will now need to be installed separately. Istio will support installation of integrations that are from the Istio Project and will maintain compatibility with those that are not.

A Prometheus integration will still be available through an installation of [Rancher Monitoring]({{<baseurl>}}/rancher/v2.x/en/monitoring-alerting/), or by installing your own Prometheus operator. Rancher's Istio chart will also install Kiali by default to ensure you can get a full picture of your microservices out of the box.

Istio has migrated away from Helm as a way to install Istio and now provides installation through the istioctl binary or Istio Operator. To ensure the easiest interaction with Istio, Rancher's Istio will maintain a Helm chart that utilizes the istioctl binary to manage your Istio installation.

This Helm chart will be available via the Apps and Marketplace in the UI. A user that has access to the Rancher Chart's catalog will need to set up Istio before it can be used in the project.

# Prerequisites

Before enabling Istio, we recommend that you confirm that your Rancher worker nodes have enough [CPU and memory]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/resources) to run all of the components of Istio.

# Setup Guide

Refer to the [setup guide]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup) for instructions on how to set up Istio and use it in a project.

# Remove Istio

To remove Istio components from a cluster, namespace, or workload, refer to the section on [uninstalling Istio.]({{<baseurl>}}/rancher/v2.x/en/istio/disabling-istio/)

# Migrate From Previous Istio Version

There is no upgrade path for Istio versions less than 1.7

# Accessing Visualizations

> By default, only cluster-admins have access to Kiali. For instructions on how to allow admin, edit or views roles to access them, refer to [Access to Visualizations.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/rbac/#access-to-visualizations)

After Istio is set up in a cluster, Grafana, Prometheus,and Kiali are available in the Rancher UI. 

To access the Grafana and Prometheus visualizations, from the **Cluster Explorer** navigate to the **Monitoring** app overview page, and click on **Grafana** or **Prometheus**

To access the Kiali visualization, from the **Cluster Explorer** navigate to the **Istio** app overview page, and click on **Kiali**. From here you can access the **Traffic Graph** tab or the **Traffic Metrics** tab to see network visualizations and metrics. 

By default, all namespace will picked up by prometheus and make data available for Kiali graphs. Refer to [selector/scrape config setup]({{<baseurl>}}/rancher/v2.x/en/istio/setup/enable-istio-in-cluster/#selectors-scrape-configs) if you would like to use a different configuration for prometheus data scraping. 

Your access to the visualizations depend on your role. Grafana and Prometheus are only available for `cluster-admin` roles. The Kiali UI is available only to `cluster-admin` by default, but `cluster-admin` can allow other roles to access them by editing the Istio values.yaml.

# Architecture

Istio installs a service mesh that uses [Envoy](https://www.envoyproxy.io/learn/service-mesh) sidecar proxies to intercept traffic to each workload. These sidecars intercept and manage service-to-service communication, allowing fine-grained observation and control over traffic within the cluster.

Only workloads that have the Istio sidecar injected can be tracked and controlled by Istio.

When a namespace has Istio enabled, new workloads deployed in the namespace will automatically have the Istio sidecar. You need to manually enable Istio in preexisting workloads.

For more information on the Istio sidecar, refer to the [Istio sidecare-injection docs](https://istio.io/docs/setup/kubernetes/additional-setup/sidecar-injection/) and for more information on Istio's architecture, refer to the [Istio Architecture docs](https://istio.io/latest/docs/ops/deployment/architecture/)

### Multiple Ingresses

By default, each Rancher-provisioned cluster has one NGINX ingress controller allowing traffic into the cluster. Istio also installs an ingress gateway by default into the `istio-system` namespace.  The result is that your cluster will have two ingresses in your cluster.

![In an Istio-enabled cluster, you can have two ingresses: the default Nginx ingress, and the default Istio controller.]({{<baseurl>}}/img/rancher/istio-ingress.svg)
 
 Additional Istio Ingress gateways can be enabled via the [overlay file]({{<baseurl>}}/rancher/v2.x/en/istio/setup/enable-istio-in-cluster/#overlay-file).

### Egress Support

By default the Egress gateway is disabled, but can be enabled on install or upgrade through the values.yaml or via the [overlay file]({{<baseurl>}}/rancher/v2.x/en/istio/setup/enable-istio-in-cluster/#overlay-file).