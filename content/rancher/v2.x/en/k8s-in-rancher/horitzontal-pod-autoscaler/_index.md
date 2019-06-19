---
title: Horizontal Pod Autoscaler
weight: 3026
---

The [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) (HPA) is a Kubernetes feature that allows you to configure your cluster to automatically scale the services it's running up or down.

Rancher provides some additional features to help manage HPAs, depending on the version of Rancher. 

For more information on how HPA works and why it is used, refer to [Background Information on HPAs]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-background).

## Managing HPAs

The way that you manage HPAs is different based on your version of the Kubernetes API:

- **For Kubernetes API version autoscaling/V2beta1:** This version of the Kubernetes API lets you autoscale your pods based on the CPU and memory utilization of your application.
- **For Kubernetes API Version autoscaling/V2beta2:** This version of the Kubernetes API lets you autoscale your pods based on CPU and memory utilization, in addition to custom metrics.

HPAs are also managed differently based on your version of Rancher:

- **For Rancher Prior to v2.3.0-alpha:** To manage and configure HPAs, you need to use `kubectl`. For instructions on how to create, manage, and scale HPAs, refer to [Managing HPAs with kubectl]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl).
- **For Rancher v2.3.0-alpha+**: You can create, manage, and delete HPAs using the Rancher UI. From the Rancher UI you can configure the HPA to scale based on CPU and memory utilization. For more information, refer to [Managing HPAs with the Rancher UI]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui). To scale the HPA based on custom metrics, you still need to use `kubectl`. For more information, refer to [Configuring HPA to Scale Using Custom Metrics with Prometheus]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl/#configuring-hpa-to-scale-using-custom-metrics-with-prometheus).

You might have additional HPA installation steps if you are using an older version of Rancher:

- **For Rancher v2.0.7+:** Clusters created in Rancher v2.0.7 and higher automatically have all the requirements needed (metrics-server and Kubernetes cluster configuration) to use HPA.
- **For Rancher Prior to v2.0.7:** Clusters created in Rancher prior to v2.0.7 don't automatically have the requirements needed to use HPA. For instructions on installing HPA for these clusters, refer to [Manual HPA Installation for Clusters Created Before Rancher v2.0.7]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-for-rancher-before-2_0_7).

## Testing HPAs with a Service Deployment

In Rancher v2.3.x+, you can see your HPA's current number of replicas by going to your project's **HPA** tab. For more information, refer to [Get HPA Metrics and Status]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui/).

You can also use `kubectl` to get the status of HPAs that you test with your load testing tool. For more information, refer to [Testing HPAs with kubectl]
({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/testing-hpa/).