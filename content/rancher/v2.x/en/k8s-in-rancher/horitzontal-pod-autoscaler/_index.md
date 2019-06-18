---
title: Horizontal Pod Autoscaler
weight: 3026
---

Using the Kubernetes [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) feature (HPA), you can configure your cluster to automatically scale the services it's running up or down.

HPAs are handled differently based on your version of Rancher and your version of the Kubernetes API.

### For Kubernetes API version `autoscaling/V2beta1`

This version of the Kubernetes API lets you autoscale your pods based on the CPU and memory utilization of your application.

### For Kubernetes API Version `autoscaling/V2beta2`

This version of the Kubernetes API lets you autoscale your pods based on CPU and memory utilization, in addition to custom metrics.

### For Rancher v2.0.7+

Clusters created in Rancher v2.0.7 and higher have all the requirements needed (metrics-server and Kubernetes cluster configuration) to use HPA.

### For Rancher Prior to v2.0.7

Clusters created in Rancher prior to v2.0.7 don't automatically have the requirements needed to use HPA. For instructions on installing HPA for these clusters, refer to [Manual HPA Installation for Clusters Created Before Rancher v2.0.7]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/hpa-for-rancher-before-2_0_7).

### For Rancher Prior to v2.3.0-alpha

You can [manage HPAs using `kubectl`]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl).

### For Rancher v2.3.0-alpha+

You can create, manage, and delete HPAs using the Rancher UI. From the Rancher UI you can configure the HPA to scale based on CPU and memory utilization.

For configuring HPA to scale based on custom metrics, you still need to use `kubectl`. For more information, refer to [Managing HPAs using `kubectl`]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl/_index.md)

## Why Use Horizontal Pod Autoscaler?

Using HPA, you can automatically scale the number of pods within a replication controller, deployment, or replica set up or down. HPA automatically scales the number of pods that are running for maximum efficiency. Factors that affect the number of pods include:

- A minimum and maximum number of pods allowed to run, as defined by the user.
- Observed CPU/memory use, as reported in resource metrics.
- Custom metrics provided by third-party metrics application like Prometheus, Datadog, etc.

HPA improves your services by:

- Releasing hardware resources that would otherwise be wasted by an excessive number of pods.
- Increase/decrease performance as needed to accomplish service level agreements.

## How HPA Works

![HPA Schema]({{< baseurl >}}/img/rancher/horizontal-pod-autoscaler.jpg)

HPA is implemented as a control loop, with a period controlled by the `kube-controller-manager` flags below:

Flag | Default | Description |
---------|----------|----------|
 `--horizontal-pod-autoscaler-sync-period` | `30s` | How often HPA audits resource/custom metrics in a deployment.
 `--horizontal-pod-autoscaler-downscale-delay` | `5m0s` | Following completion of a downscale operation, how long HPA must wait before launching another downscale operations.
 `--horizontal-pod-autoscaler-upscale-delay` | `3m0s` | Following completion of an upscale operation, how long HPA must wait before launching another upscale operation.


For full documentation on HPA, refer to the [Kubernetes Documentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).

## Horizontal Pod Autoscaler API Objects

HPA is an API resource in the Kubernetes `autoscaling` API group. The current stable version is `autoscaling/v1`, which only includes support for CPU autoscaling. To get additional support for scaling based on memory and custom metrics, use the beta version instead: `autoscaling/v2beta1`.

For more information about the HPA API object, see the [HPA GitHub Readme](https://git.k8s.io/community/contributors/design-proposals/autoscaling/horizontal-pod-autoscaler.md#horizontalpodautoscaler-object).

## Managing HPAs

In Rancher v2.3.x+, the Rancher UI supports [creating, managing, and deleting HPAs]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui/). It lets you configure CPU or memory usage as the metric that the HPA uses to scale.

For prior versions of Rancher, you can [manage HPAs using `kubectl`]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-kubectl/_index.md). You also need to use `kubectl` if you want to create HPAs that scale based on other metrics than CPU and memory.

## Testing HPAs with a Service Deployment

In Rancher v2.3.x+, you can see your HPA's current number of replicas by going to your project's **HPA** tab. For more information, refer to [Get HPA Metrics and Status]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/manage-hpa-with-rancher-ui/).

You can also use `kubectl` to get the status of HPAs that you test with your load testing tool. For more information, refer to [Testing HPAs with kubectl]
({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/horitzontal-pod-autoscaler/testing-hpa/).