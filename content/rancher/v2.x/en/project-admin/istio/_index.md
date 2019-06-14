---
title: Istio
weight: 3528
---

_Available as of v2.3.0-alpha_

Using Rancher, you can connect, secure, control, and observe services through integration with [Istio](https://istio.io/), a leading open-source service mesh solution. Istio provides behavioral insights and operational control over the service mesh as a whole, offering a complete solution to satisfy the diverse requirements of microservice applications.

>**Prerequisites:**
>
>- [Istio]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/istio/) must be enabled in the cluster.
>- To be a part of an Istio service mesh, pods and services in a Kubernetes cluster must satisfy the [Istio Pods and Services Requirements](https://istio.io/docs/setup/kubernetes/prepare/requirements/)

## Istio Sidecar Auto Injection

In the create and edit namespace page, you can enable or disable [Istio sidecar auto injection](https://istio.io/blog/2019/data-plane-setup/#automatic-injection). When you enable it, Rancher will add `istio-injection=enabled` label to the namespace automatically.

> **Note:** Injection occurs at pod creation time. If the pod has been created before you enable auto injection. You need to kill the running pod and verify a new pod is created with the injected sidecar.

## View Traffic Graph

Rancher integrates Kiali Graph into the Rancher UI. The Kiali graph provides a powerful way to visualize the topology of your Istio service mesh. It shows you which services communicate with each other.

To see the traffic graph for a particular namespace:

1. From the **Global** view, navigate to the project that you want to view traffic graph for.

1. Select **Istio** in the navigation bar.

1. Select **Traffic Graph** in the navigation bar.

1. Select the namespace. Note: It only shows the namespaces which has `istio-injection=enabled` label.

## View Traffic Metrics

Istio’s monitoring features provide visibility into the performance of all your services.

To see the Success Rate, Request Volume, 4xx Request Count, Project 5xx Request Count and Request Duration metrics:

1. From the **Global** view, navigate to the project that you want to view traffic metrics for.

1. Select **Istio** in the navigation bar.

1. Select **Traffic Metrics** in the navigation bar.


## Other Istio Features

There are many other [Istio Features](https://istio.io/docs/concepts/what-is-istio/#core-features)
that you can now use in your cluster.
