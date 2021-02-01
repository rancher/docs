---
title: Configuration
weight: 3
aliases:
  - /rancher/v2.5/en/monitoring-alerting/v2.5/configuration
---

This page captures some of the most important options for configuring the custom resources for monitoring.

For information on configuring custom scrape targets and rules for Prometheus, please refer to the upstream documentation for the [Prometheus Operator.](https://github.com/prometheus-operator/prometheus-operator) Some of the most important custom resources are explained in the Prometheus Operator [design documentation.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md) The Prometheus Operator documentation can help also you set up RBAC, Thanos, or custom configuration. 

- [Configuring Prometheus](#configuring-prometheus)
- [Configuring Targets with ServiceMonitors and PodMonitors](#configuring-targets-with-servicemonitors-and-podmonitors)
  - [ServiceMonitors](#servicemonitors)
  - [PodMonitors](#podmonitors)
- [PrometheusRules](#prometheusrules)
- [Alertmanager Config](#alertmanager-config)
- [Trusted CA for Notifiers](#trusted-ca-for-notifiers)
- [Additional Scrape Configurations](#additional-scrape-configurations)
- [Examples](#examples)

# Configuring Prometheus

The primary way that users will be able to customize this feature for specific Monitoring and Alerting use cases is by creating and/or modifying ConfigMaps, Secrets, and Custom Resources pertaining to this deployment.

Prometheus Operator introduces a set of [Custom Resource Definitions](https://github.com/prometheus-operator/prometheus-operator#customresourcedefinitions) that allow users to deploy and manage Prometheus and Alertmanager instances by creating and modifying those custom resources on a cluster.

Prometheus Operator will automatically update your Prometheus configuration based on the live state of these custom resources.

There are also certain special types of ConfigMaps/Secrets such as those corresponding to Grafana Dashboards, Grafana Datasources, and Alertmanager Configs that will automatically update your Prometheus configuration via sidecar proxies that observe the live state of those resources within your cluster.

By default, a set of these resources (curated by the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) project) are deployed onto your cluster as part of installing the Rancher Monitoring Application to set up a basic Monitoring / Alerting stack. For more information how to configure custom targets, alerts, notifiers, and dashboards after deploying the chart, see below.

# Configuring Targets with ServiceMonitors and PodMonitors

Customizing the scrape configuration used by Prometheus to determine which resources to scrape metrics from will primarily involve creating / modifying the following resources within your cluster:

### ServiceMonitors

This CRD declaratively specifies how groups of Kubernetes services should be monitored. Any Services in your cluster that match the labels located within the ServiceMonitor `selector` field will be monitored based on the `endpoints` specified on the ServiceMonitor. For more information on what fields can be specified, please look at the [spec](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#servicemonitor) provided by Prometheus Operator.

For more information about how ServiceMonitors work, refer to the [Prometheus Operator documentation.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/running-exporters.md)

### PodMonitors

This CRD declaratively specifies how group of pods should be monitored. Any Pods in your cluster that match the labels located within the PodMonitor `selector` field will be monitored based on the `podMetricsEndpoints` specified on the PodMonitor. For more information on what fields can be specified, please look at the [spec](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#podmonitorspec) provided by Prometheus Operator.

# PrometheusRules

This CRD defines a group of Prometheus alerting and/or recording rules.

For information on configuring PrometheusRules, refer to [this page.](./prometheusrules)

# Alertmanager Config

For information on configuring the Alertmanager, refer to [this page.](./alertmanager)

# Trusted CA for Notifiers

If you need to add a trusted CA to your notifier, follow these steps:

1. Create the `cattle-monitoring-system` namespace.
1. Add your trusted CA secret to the `cattle-monitoring-system` namespace.
1. Deploy or upgrade the `rancher-monitoring` Helm chart. In the chart options, reference the secret in **Alerting > Additional Secrets.**

**Result:** The default Alertmanager custom resource will have access to your trusted CA.

# Additional Scrape Configurations

If the scrape configuration you want cannot be specified via a ServiceMonitor or PodMonitor at the moment, you can provide an `additionalScrapeConfigSecret` on deploying or upgrading `rancher-monitoring`.

A [scrape_config section](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config) specifies a set of targets and parameters describing how to scrape them. In the general case, one scrape configuration specifies a single job.

An example of where this might be used is with Istio. For more information, see [this section.](https://rancher.com/docs/rancher/v2.5/en/istio/v2.5/configuration-reference/selectors-and-scrape)

# Examples

### ServiceMonitor

An example ServiceMonitor custom resource can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml) 

### PodMonitor

An example PodMonitor can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/user-guides/getting-started/example-app-pod-monitor.yaml) An example Prometheus resource that refers to it can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/user-guides/getting-started/prometheus-pod-monitor.yaml)

### PrometheusRule

For users who are familiar with Prometheus, a PrometheusRule contains the alerting and recording rules that you would normally place in a [Prometheus rule file](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/).

For a more fine-grained application of PrometheusRules within your cluster, the ruleSelector field on a Prometheus resource allows you to select which PrometheusRules should be loaded onto Prometheus based on the labels attached to the PrometheusRules resources.

An example PrometheusRule is on [this page.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/alerting.md)

### Alertmanager Config

For an example configuration, refer to [this section.](./alertmanager/#example-alertmanager-config)