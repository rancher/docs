---
title: ServiceMonitor and PodMonitor Configuration
shortTitle: ServiceMonitors and PodMonitors
weight: 7
---

ServiceMonitors and PodMonitors are both pseudo-CRDs that map the scrape configuration of the Prometheus custom resource.

These configuration objects declaratively specify the endpoints that Prometheus will scrape metrics from.

ServiceMonitors are more commonly used than PodMonitors, and we recommend them for most use cases.

> This section assumes familiarity with how monitoring components work together. For more information about Alertmanager, see [this section.](../../how-monitoring-works/)

### ServiceMonitors

This pseudo-CRD maps to a section of the Prometheus custom resource configuration. It declaratively specifies how groups of Kubernetes services should be monitored. 

When a ServiceMonitor is created, the Prometheus Operator updates the Prometheus scrape configuration to include the ServiceMonitor configuration. Then Prometheus begins scraping metrics from the endpoint defined in the ServiceMonitor.

Any Services in your cluster that match the labels located within the ServiceMonitor `selector` field will be monitored based on the `endpoints` specified on the ServiceMonitor. For more information on what fields can be specified, please look at the [spec](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#servicemonitor) provided by Prometheus Operator.

For more information about how ServiceMonitors work, refer to the [Prometheus Operator documentation.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/running-exporters.md)

### PodMonitors

This pseudo-CRD maps to a section of the Prometheus custom resource configuration. It declaratively specifies how group of pods should be monitored. 

When a PodMonitor is created, the Prometheus Operator updates the Prometheus scrape configuration to include the PodMonitor configuration. Then Prometheus begins scraping metrics from the endpoint defined in the ServiceMonitor.

Any Pods in your cluster that match the labels located within the PodMonitor `selector` field will be monitored based on the `podMetricsEndpoints` specified on the PodMonitor. For more information on what fields can be specified, please look at the [spec](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#podmonitorspec) provided by Prometheus Operator.
