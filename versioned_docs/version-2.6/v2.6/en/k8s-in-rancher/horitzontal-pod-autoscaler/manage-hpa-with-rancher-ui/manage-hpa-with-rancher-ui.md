---
title: Managing HPAs with the Rancher UI
weight: 3028
---

The Rancher UI supports creating, managing, and deleting HPAs. You can configure CPU or memory usage as the metric that the HPA uses to scale.

If you want to create HPAs that scale based on other metrics than CPU and memory, refer to [Configuring HPA to Scale Using Custom Metrics with Prometheus]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl/#configuring-hpa-to-scale-using-custom-metrics-with-prometheus).

## Creating an HPA

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster you want to create an HPA in and click **Explore**.
1. In the left navigation bar, click **Service Discovery > HorizontalPodAutoscalers**.
1. Click **Create**.
1. Select a **Namespace** for the HPA.
1. Enter a **Name** for the HPA.
1. Select a **Target Reference** as scale target for the HPA.
1. Specify the **Minimum Replicas** and **Maximum Replicas** for the HPA.
1. Configure the metrics for the HPA. You can choose memory or CPU usage as the metric that will cause the HPA to scale the service up or down. In the **Quantity** field, enter the percentage of the workload's memory or CPU usage that will cause the HPA to scale the service. To configure other HPA metrics, including metrics available from Prometheus, you need to [manage HPAs using kubectl]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl/#configuring-hpa-to-scale-using-custom-metrics-with-prometheus).

1. Click **Create** to create the HPA.

> **Result:** The HPA is deployed to the chosen namespace. You can view the HPA's status from the project's Resources > HPA view.

## Get HPA Metrics and Status

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster that has the HPA and click **Explore**.
1. In the left navigation bar, click **Service Discovery > HorizontalPodAutoscalers**. The **HorizontalPodAutoscalers** page shows the number of current replicas.

For more detailed metrics and status of a specific HPA, click the name of the HPA. This leads to the HPA detail page.


## Deleting an HPA

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster that has the HPA you want to delete and click **Explore**.
1. In the left navigation bar, click **Service Discovery > HorizontalPodAutoscalers**.
1. Click **Resources > HPA**.
1. Find the HPA which you would like to delete and click **⋮ > Delete**.
1. Click **Delete** to confirm.

> **Result:** The HPA is deleted from the current cluster.
