---
title: Prometheus Configuration
weight: 1
aliases:
  - /rancher/v2.5/en/monitoring-alerting/v2.5/configuration/prometheusrules
  - /rancher/v2.5/en/monitoring-alerting/configuration/prometheusrules
  - /rancher/v2.5/en/monitoring-alerting/configuration/advanced/prometheusrules
---

It is usually not necessary to directly edit the Prometheus custom resource because the monitoring application automatically updates it based on changes to ServiceMonitors and PodMonitors.

> This section assumes familiarity with how monitoring components work together. For more information about Alertmanager, see [this section.](../how-monitoring-works/#how-alertmanager-works)




# About the Prometheus Custom Resource
- when the Prometheus operator observes it, it creates prometheus-rancher-monitoring-prometheus, which is the prometheus deployment that is created based on the configuration in the Prometheus CR.
- This is where we configure details like what Alertmanagers are connected to Prometheus, what are the external URLs, and other details that prometheus needs. Rancher builds this CR for you. It has fields for pod monitor and service monitor selectors - technically you can filter that to include only the ones in a certain namespace.
- monitoring v2 only supports one prometheus per cluster because we haven’t supported project level monitoring. But you might want to edit prometheus Cr if you want to limit the namespaces.
- prometheus also has the rules and routes in it.