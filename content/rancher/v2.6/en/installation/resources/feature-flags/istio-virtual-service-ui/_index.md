---
title: UI for Istio Virtual Services and Destination Rules
weight: 2
---

This feature enables a UI that lets you create, read, update and delete virtual services and destination rules, which are traffic management features of Istio.

> **Prerequisite:** Turning on this feature does not enable Istio. A cluster administrator needs to [enable Istio for the cluster]({{<baseurl>}}/rancher/v2.6/en/istio/setup) in order to use the feature.

To enable or disable this feature, refer to the instructions on [the main page about enabling experimental features.]({{<baseurl>}}/rancher/v2.6/en/installation/resources/feature-flags/)

Environment Variable Key | Default Value | Status | Available as of
---|---|---|---
`istio-virtual-service-ui` |`false` |  Experimental | v2.3.0
`istio-virtual-service-ui` | `true` | GA                    | v2.3.2

# About this Feature

A central advantage of Istio's traffic management features is that they allow dynamic request routing, which is useful for canary deployments, blue/green deployments, or A/B testing.

When enabled, this feature turns on a page that lets you configure some traffic management features of Istio using the Rancher UI. Without this feature, you need to use `kubectl` to manage traffic with Istio.

The feature enables two UI tabs: one tab for **Virtual Services** and another for **Destination Rules**. 

- **Virtual services** intercept and direct traffic to your Kubernetes services, allowing you to direct percentages of traffic from a request to different services. You can use them to define a set of routing rules to apply when a host is addressed. For details, refer to the [Istio documentation.](https://istio.io/docs/reference/config/networking/v1alpha3/virtual-service/)
- **Destination rules** serve as the single source of truth about which service versions are available to receive traffic from virtual services. You can use these resources to define policies that apply to traffic that is intended for a service after routing has occurred. For details, refer to the [Istio documentation.](https://istio.io/docs/reference/config/networking/v1alpha3/destination-rule)

To see these tabs,

1.  Click **☰ > Cluster Management**.
1. Go to the cluster where Istio is installed and click **Explore**.
1. In the left navigation bar, click **Istio**.
1. You will see tabs for **Kiali** and **Jaeger**. From the left navigation bar, you can view and configure **Virtual Services** and **Destination Rules**.