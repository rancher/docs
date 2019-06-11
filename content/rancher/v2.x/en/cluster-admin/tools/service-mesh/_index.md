---
title: Service Mesh
weight: 5
---

_Available as of v2.3.0-alpha_

Using Rancher, you can connect, secure, control, and observe services through integration with [Istio](https://istio.io/), a leading open-source service mesh solution. Istio provides behavioral insights and operational control over the service mesh as a whole, offering a complete solution to satisfy the diverse requirements of microservice applications.

## Enabling Service Mesh

As an [administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Istio to your Kubernetes cluster.

1. From the **Global** view, navigate to the cluster that you want to configure the service mesh for.

1. Select **Tools > Service Mesh** in the navigation bar.

1. Select **Enable** to show the [Service mesh configuration options]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/service-mesh/istio/). Enter in your desired configuration options.

1. Click **Save**.

**Result:** The Istio application, `cluster-istio`, is added as an [application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) to the cluster's `system` project.  After the application is `active`, you can start using Istio.

> **Note:** When enabling service mesh, you need to ensure your worker nodes and Istio pod have enough resources. In larger deployments, it is strongly advised that the service mesh infrastructure be placed on dedicated nodes in the cluster.

## Using Service Mesh

Once the service mesh is `active`, you can:

1. Access [Kiali UI](https://www.kiali.io/) by clicking Kiali UI icon in service mesh page.
1. Access [Jaeger UI](https://www.jaegertracing.io/) by clicking Jaeger UI icon in service mesh page.
1. Access [Grafana UI](https://grafana.com/) by clicking Grafana UI icon in service mesh page.
1. Access [Prometheus UI](https://prometheus.io/) by clicking Prometheus UI icon in service mesh page.
1. Go to a project to [view traffic graph, traffic metrics and manage traffic]({{< baseurl >}}/rancher/v2.x/en/project-admin/service-mesh/).

## Disabling Service Mesh

To disable the service mesh:

1. From the **Global** view, navigate to the cluster that you want to disable the service mesh for.

1. Select **Tools > Service Mesh** in the navigation bar.

1. Click **Disable Istio**, then click the red button again to confirm the disable action.

**Result:** The `cluster-istio` application in the cluster's `system` project gets removed.
