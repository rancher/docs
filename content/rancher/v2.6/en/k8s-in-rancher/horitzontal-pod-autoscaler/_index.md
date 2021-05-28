---
title: The Horizontal Pod Autoscaler
description: Learn about the horizontal pod autoscaler (HPA). How to manage HPAs and how to test them with a service deployment
weight: 3026
aliases:
  - /rancher/v2.5/en/k8s-in-rancher/horizontal-pod-autoscaler
---

The [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) (HPA) is a Kubernetes feature that allows you to configure your cluster to automatically scale the services it's running up or down.

Rancher provides some additional features to help manage HPAs, depending on the version of Rancher. 

You can create, manage, and delete HPAs using the Rancher UI. It only supports HPA in the `autoscaling/v2beta2` API.

## Managing HPAs

The way that you manage HPAs is different based on your version of the Kubernetes API:

- **For Kubernetes API version autoscaling/V2beta1:** This version of the Kubernetes API lets you autoscale your pods based on the CPU and memory utilization of your application.
- **For Kubernetes API Version autoscaling/V2beta2:** This version of the Kubernetes API lets you autoscale your pods based on CPU and memory utilization, in addition to custom metrics.

You can create, manage, and delete HPAs using the Rancher UI. From the Rancher UI you can configure the HPA to scale based on CPU and memory utilization. For more information, refer to [Managing HPAs with the Rancher UI]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui). To scale the HPA based on custom metrics, you still need to use `kubectl`. For more information, refer to [Configuring HPA to Scale Using Custom Metrics with Prometheus]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl/#configuring-hpa-to-scale-using-custom-metrics-with-prometheus).

Clusters created in Rancher v2.0.7 and higher automatically have all the requirements needed (metrics-server and Kubernetes cluster configuration) to use HPA.
## Testing HPAs with a Service Deployment

You can see your HPA's current number of replicas by going to your project and clicking **Resources > HPA.** For more information, refer to [Get HPA Metrics and Status]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui/).

You can also use `kubectl` to get the status of HPAs that you test with your load testing tool. For more information, refer to [Testing HPAs with kubectl]
({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/horitzontal-pod-autoscaler/testing-hpa/).
