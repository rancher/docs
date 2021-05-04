---
title: Configuration Options
weight: 3
aliases:
  - /rancher/v2.5/en/istio/v2.5/configuration-reference
---

- [Egress Support](#egress-support)
- [Enabling Automatic Sidecar Injection](#enabling-automatic-sidecar-injection)
- [Overlay File](#overlay-file)
- [Selectors and Scrape Configs](#selectors-and-scrape-configs)
- [Enable Istio with Pod Security Policies](#enable-istio-with-pod-security-policies)
- [Additional Steps for Installing Istio on an RKE2 Cluster](#additional-steps-for-installing-istio-on-an-rke2-cluster)
- [Additional Steps for Project Network Isolation](#additional-steps-for-project-network-isolation)

### Egress Support

By default the Egress gateway is disabled, but can be enabled on install or upgrade through the values.yaml or via the [overlay file](#overlay-file).

### Enabling Automatic Sidecar Injection

Automatic sidecar injection is disabled by default. To enable this, set the `sidecarInjectorWebhook.enableNamespacesByDefault=true` in the values.yaml on install or upgrade. This automatically enables Istio sidecar injection into all new namespaces that are deployed.

### Overlay File

An Overlay File is designed to support extensive configuration of your Istio installation. It allows you to make changes to any values available in the [IstioOperator API](https://istio.io/latest/docs/reference/config/istio.operator.v1alpha1/). This will ensure you can customize the default installation to fit any scenario. 

The Overlay File will add configuration on top of the default installation that is provided from the Istio chart installation. This means you do not need to redefine the components that already defined for installation. 

For more information on Overlay Files, refer to the [Istio documentation.](https://istio.io/latest/docs/setup/install/istioctl/#configure-component-settings)

### Selectors and Scrape Configs

The Monitoring app sets `prometheus.prometheusSpec.ignoreNamespaceSelectors=false` which enables monitoring across all namespaces by default. This ensures you can view traffic, metrics and graphs for resources deployed in a namespace with `istio-injection=enabled` label. 

If you would like to limit Prometheus to specific namespaces, set `prometheus.prometheusSpec.ignoreNamespaceSelectors=true`. Once you do this, you will need to add additional configuration to continue to monitor your resources.

For details, refer to [this section.](./selectors-and-scrape)

### Enable Istio with Pod Security Policies

Refer to [this section.](./enable-istio-with-psp)

### Additional Steps for Installing Istio on an RKE2 Cluster

Refer to [this section.](./rke2)

### Additional Steps for Project Network Isolation

Refer to [this section.](./canal-and-project-network)