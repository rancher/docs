---
title: Monitoring and Alerting
shortTitle: Monitoring/Alerting
description: Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Learn about the scope of monitoring and how to enable cluster monitoring
weight: 13
---

Using the `rancher-monitoring` application, you can quickly deploy leading open-source monitoring and alerting solutions onto your cluster.

- [Features](#features)
- [How Monitoring Works](#how-monitoring-works)
- [Default Components and Deployments](#default-components-and-deployments)
- [Role-based Access Control](#role-based-access-control)
- [Guides](#guides)
- [Windows Cluster Support](#windows-cluster-support)
- [Known Issues](#known-issues)

### Features

Prometheus lets you view metrics from your Rancher and Kubernetes objects. Using timestamps, Prometheus lets you query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or Grafana, which is an analytics viewing platform deployed along with Prometheus.

By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, or restore crashed servers.

The `rancher-monitoring` operator, introduced in Rancher v2.5, is powered by [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/grafana/),  [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/), the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator), and the [Prometheus adapter.](https://github.com/DirectXMan12/k8s-prometheus-adapter)

The monitoring application allows you to:

- Monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments
- Define alerts based on metrics collected via Prometheus
- Create custom Grafana dashboards
- Configure alert-based notifications via Email, Slack, PagerDuty, etc. using Prometheus Alertmanager
- Defines precomputed, frequently needed or computationally expensive expressions as new time series based on metrics collected via Prometheus
- Expose collected metrics from Prometheus to the Kubernetes Custom Metrics API via Prometheus Adapter for use in HPA

# How Monitoring Works

For an explanation of how the monitoring components work together, see [this page.](./how-monitoring-works)

# Default Components and Deployments

### Built-in Dashboards

By default, the monitoring application deploys Grafana dashboards (curated by the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) project) onto a cluster.

It also deploys an Alertmanager UI and a Prometheus UI. For more information about these tools, see [Built-in Dashboards.](./dashboards)
### Default Metrics Exporters

By default, Rancher Monitoring deploys exporters (such as [node-exporter](https://github.com/prometheus/node_exporter) and [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics)).

These default exporters automatically scrape metrics for CPU and memory from all components of your Kubernetes cluster, including your workloads.

### Default Alerts

The monitoring application deploys some alerts by default. To see the default alerts, go to the [Alertmanager UI](./dashboards/#alertmanager-ui) and click **Expand all groups.**

### Components Exposed in the Rancher UI

For a list of monitoring components exposed in the Rancher UI, along with common use cases for editing them, see [this section.](./how-monitoring-works/#components-exposed-in-the-rancher-ui)

# Role-based Access Control

For information on configuring access to monitoring, see [this page.](./rbac)

# Guides

- [Enable monitoring](./guides/enable-monitoring)
- [Uninstall monitoring](./guides/uninstall)
- [Monitoring workloads](./guides/monitoring-workloads)
- [Customizing Grafana dashboards](./guides/customize-grafana)
- [Persistent Grafana dashboards](./guides/persist-grafana)
- [Debugging high memory usage](./guides/memory-usage)
- [Migrating from Monitoring V1 to V2](./guides/migrating)

# Configuration

### Configuring Monitoring Resources in Rancher

> The configuration reference assumes familiarity with how monitoring components work together. For more information, see [How Monitoring Works.](./how-monitoring-works)

- [ServiceMonitor and PodMonitor](./configuration/servicemonitor-podmonitor)
- [Receiver](./configuration/receiver)
- [Route](./configuration/route)
- [PrometheusRule](./configuration/advanced/prometheusrules)
- [Prometheus](./configuration/advanced/prometheus)
- [Alertmanager](./configuration/advanced/alertmanager)

### Configuring Helm Chart Options

For more information on `rancher-monitoring` chart options, including options to set resource limits and requests, see [this page.](./configuration/helm-chart-options)

# Windows Cluster Support

When deployed onto an RKE1 Windows cluster, Monitoring V2 will now automatically deploy a [windows-exporter](https://github.com/prometheus-community/windows_exporter) DaemonSet and set up a ServiceMonitor to collect metrics from each of the deployed Pods. This will populate Prometheus with `windows_` metrics that are akin to the `node_` metrics exported by [node_exporter](https://github.com/prometheus/node_exporter) for Linux hosts.

To be able to fully deploy Monitoring V2 for Windows, all of your Windows hosts must have a minimum [wins](https://github.com/rancher/wins) version of v0.1.0.

For more details on how to upgrade wins on existing Windows hosts, refer to the section on [Windows cluster support for Monitoring V2.](./windows-clusters)



# Known Issues

There is a [known issue](https://github.com/rancher/rancher/issues/28787#issuecomment-693611821) that K3s clusters require more default memory. If you are enabling monitoring on a K3s cluster, we recommend to setting `prometheus.prometheusSpec.resources.memory.limit` to 2500 Mi and `prometheus.prometheusSpec.resources.memory.request` to 1750 Mi.

For tips on debugging high memory usage, see [this page.](./guides/memory-usage)
