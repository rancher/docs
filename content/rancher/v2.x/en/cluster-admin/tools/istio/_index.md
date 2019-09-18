---
title: Istio
weight: 5
---

_Available as of v2.3.0-alpha5_

Using Rancher, you can connect, secure, control, and observe services through integration with [Istio](https://istio.io/), a leading open-source service mesh solution. Istio provides behavioral insights and operational control over the service mesh as a whole, offering a complete solution to satisfy the diverse requirements of microservice applications.

## Prerequisites

The required resource allocation for each service is listed in the [configuration options]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/istio/config/). Please review it before attempting to enable Istio.

In larger deployments, it is strongly advised that the infrastructure be placed on dedicated nodes in the cluster by adding node selector for each Istio components.

#### Default Resource Consumption

Workload | Container | CPU - Request | Mem - Request | CPU - Limit | Mem - Limit | Configurable
---------|-----------|---------------|---------------|-------------|-------------|-------------
istio-pilot |discovery| 500m | 2048Mi | 1000m | 4096Mi | Y
 istio-telemetry |mixer| 1000m         | 1024Mi        | 4800m       | 4096Mi      | Y            
 istio-policy | mixer      | 1000m         | 1024Mi        | 4800m       | 4096Mi      | Y            
 istio-tracing   | jaeger     | 100m          | 100Mi         | 500m        | 1024Mi      | Y            
 prometheus      | prometheus | 750m          | 750Mi         | 1000m       | 1024Mi      | Y            
 grafana         | grafana    | 100m          | 100Mi         | 200m        | 512Mi       | Y            
 Others          | -        | 500m          | 500Mi         | -         | -         | N            
 Total           | -        | 3950m         | 5546Mi        | -         | -         | -          

## Enabling Istio

As an [administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Istio to your Kubernetes cluster.

1. From the **Global** view, navigate to the cluster that you want to configure Istio for.

1. Select **Tools > Istio** in the navigation bar.

1. Select **Enable** to show the [Istio configuration options]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/istio/config/). Enter in your desired configuration options. Ensure you have enough resources on your worker nodes to enable Istio.

1. Click **Save**.

**Result:** The Istio application, `cluster-istio`, is added as an [application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) to the cluster's `system` project.  After the application is `active`, you can start using Istio.


## Using Istio for Metrics Visualization

Once Istio is `active`, you can see visualizations of your Istio service mesh with Kiali, Jaeger, Grafana, and Prometheus, which are all open-source projects that Rancher has integrated with.

- **Kiali** helps you define, validate, and observe your Istio service mesh. Kiali shows you what services are in your mesh and how they are connected. Kiali includes Jaeger Tracing to provide distributed tracing out of the box.
- **Jaeger** is a distributed tracing system released as open source by Uber Technologies. It is used for monitoring and troubleshooting microservices-based distributed systems.
- **Grafana** is an analytics platform that allows you to query, visualize, alert on and understand your metrics. Grafana lets you visualize data from Prometheus.
- **Prometheus** is a systems monitoring and alerting toolkit.

With Istio enabled, you can:

- Access [Kiali UI](https://www.kiali.io/) by clicking the Kiali UI icon in the Istio page.
- Access [Jaeger UI](https://www.jaegertracing.io/) by clicking the Jaeger UI icon in the Istio page.
- Access [Grafana UI](https://grafana.com/) by clicking the Grafana UI icon in the Istio page.
- Access [Prometheus UI](https://prometheus.io/) by clicking the Prometheus UI icon in the Istio page.
- Go to a project to [view traffic graph, traffic metrics and manage traffic]({{< baseurl >}}/rancher/v2.x/en/project-admin/istio/).

## Leveraging Istio in Projects

After you enable Istio, you can see metrics and a traffic graph on the project level. You can see a traffic graph for all namespaces that have Istio sidecar injection enabled. For more information, refer to [How to Use Istio in Your Project]({{< baseurl >}}/rancher/v2.x/en/project-admin/istio/).

## Disabling Istio

To disable Istio:

1. From the **Global** view, navigate to the cluster that you want to disable Istio for.

1. Select **Tools > Istio** in the navigation bar.

1. Click **Disable Istio**, then click the red button again to confirm the disable action.

**Result:** The `cluster-istio` application in the cluster's `system` project gets removed.
