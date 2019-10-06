---
title: 6. Set up Istio's Components for Traffic Management
weight: 6
---

A central advantage of  traffic management in Istio is that it allows dynamic request routing, which is useful for canary deployments or blue/green deployments. The two key resources in Istio traffic management are virtual services and destination rules. 

- **[Virtual services](https://istio.io/docs/reference/config/networking/v1alpha3/virtual-service/)** intercept and direct traffic to your Kubernetes services, allowing you to divide percentages of traffic from a request to different services. You can use them to define a set of routing rules to apply when a host is addressed.
- **[Destination rules](https://istio.io/docs/reference/config/networking/v1alpha3/destination-rule/)** serve as the single source of truth about which service versions are available to receive traffic from virtual services. You can use these resources to define policies that apply to traffic that is intended for a service after routing has occurred.

For more information on the core features of Istio, refer to the [official Istio documentation.](https://istio.io/docs/concepts/what-is-istio/#core-features)

### [Next: Generate and View Traffic]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/view-traffic)