---
title: Istio
weight: 5
---

_Available as of v2.3.0-alpha4_

Using Rancher, you can connect, secure, control, and observe services through integration with [Istio](https://istio.io/), a leading open-source service mesh solution. Istio provides behavioral insights and operational control over the service mesh as a whole, offering a complete solution to satisfy the diverse requirements of microservice applications.

## Enabling Istio

As an [administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Istio to your Kubernetes cluster.

1. From the **Global** view, navigate to the cluster that you want to configure Istio for.

1. Select **Tools > Istio** in the navigation bar.

1. Select **Enable** to show the [Istio configuration options]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/istio/config/). Enter in your desired configuration options. Ensure you have enough resources on your worker nodes to enable Istio.

1. Click **Save**.

**Result:** The Istio application, `cluster-istio`, is added as an [application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) to the cluster's `system` project.  After the application is `active`, you can start using Istio.

> **Note:** When enabling Istio, you need to ensure your worker nodes and Istio pod have enough resources. In larger deployments, it is strongly advised that the infrastructure be placed on dedicated nodes in the cluster.

## Using Istio

Once Istio is `active`, you can see visualizations of your Istio service mesh across several services:

- **Kiali** helps you define, validate, and observe your Istio service mesh. Kiali shows you what services are in your mesh and how they are connected. Kiali includes Jaeger Tracing to provide distributed tracing out of the box.
- **Jaeger** is a distributed tracing system released as open source by Uber Technologies. It is used for monitoring and troubleshooting microservices-based distributed systems.
- **Grafana** is an analytics platform that allows you to query, visualize, alert on and understand your metrics. Grafana lets you visualize data from Prometheus.
- **Prometheus** is a systems monitoring and alerting toolkit.

Kiali, Jaeger, Grafana, and Prometheus are open-source.

With Istio enabled, you can:

- Access [Kiali UI](https://www.kiali.io/) by clicking the Kiali UI icon in the Istio page.
- Access [Jaeger UI](https://www.jaegertracing.io/) by clicking the Jaeger UI icon in the Istio page.
- Access [Grafana UI](https://grafana.com/) by clicking the Grafana UI icon in the Istio page.
- Access [Prometheus UI](https://prometheus.io/) by clicking the Prometheus UI icon in the Istio page.
- Go to a project to [view traffic graph, traffic metrics and manage traffic]({{< baseurl >}}/rancher/v2.x/en/project-admin/istio/).

## Disabling Istio

To disable Istio:

1. From the **Global** view, navigate to the cluster that you want to disable Istio for.

1. Select **Tools > Istio** in the navigation bar.

1. Click **Disable Istio**, then click the red button again to confirm the disable action.

**Result:** The `cluster-istio` application in the cluster's `system` project gets removed.
