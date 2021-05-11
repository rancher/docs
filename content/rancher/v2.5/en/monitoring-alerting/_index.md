---
title: Monitoring and Alerting
shortTitle: Monitoring/Alerting
description: Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Learn about the scope of monitoring and how to enable cluster monitoring
weight: 13
aliases:
  - /rancher/v2.5/en/dashboard/monitoring-alerting
  - /rancher/v2.5/en/dashboard/notifiers
  - /rancher/v2.5/en/cluster-admin/tools/monitoring/
---

Using the `rancher-monitoring` application, you can quickly deploy leading open-source monitoring and alerting solutions onto your cluster.

- [Features](#features)
- [How Monitoring Works](#how-monitoring-works)
- [Enable Monitoring](#enable-monitoring)
- [Default Alerts, Targets, and Grafana Dashboards](#default-alerts-targets-and-grafana-dashboards)
- [Uninstall Monitoring](#uninstall-monitoring)
- [Monitoring Workloads](#monitoring-workloads)
- [Windows Cluster Support](#windows-cluster-support)
- [Setting up Metrics for HPA](#setting-up-metrics-for-hpa)
- [Role-based Access Control](#role-based-access-control)
- [Upgrading from Monitoring V1 to V2](#upgrading-from-monitoring-v1-to-v2)
- [Known Issues](#known-issues)

# Features

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

# Enable Monitoring

To enable monitoring, follow the steps on [this page.](./enable-monitoring)

# Default Alerts, Targets, and Grafana Dashboards

By default, Rancher Monitoring deploys exporters (such as [node-exporter](https://github.com/prometheus/node_exporter) and [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics)) as well as default Prometheus alerts and Grafana dashboards (curated by the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) project) onto a cluster.

### Grafana UI

[Grafana](https://grafana.com/grafana/) allows you to query, visualize, alert on and understand your metrics no matter where they are stored. Create, explore, and share dashboards with your team and foster a data driven culture.

To see the default dashboards for time series data visualization, go to the Grafana UI. In the left navigation bar, click the icon with four boxes and click **Manage.**

To view and customize the PromQL queries powering the Grafana dashboard, see [this page.](./customize-grafana)

To create a persistent Grafana dashboard, see [this page.](./persist-grafana)

For information about role-based access control for Grafana, see [this section.](./rbac/#role-based-access-control-for-grafana)

### Alertmanager UI

To see the default alerts, go to the [Alertmanager UI](./alertmanager-ui) and click **Expand all groups.**

### Prometheus UI

To see what services you are monitoring, you will need to see your targets. To view the default targets, refer to [Viewing the Prometheus Targets.](./prometheus-ui/#viewing-the-prometheus-targets)


# Configuration

> The configuration reference assumes familiarity with how monitoring components work together. For more information, see [How Monitoring Works.](./how-monitoring-works)

### Configuring Monitoring Resources in Rancher

- [ServiceMonitor and PodMonitor](./configuration/servicemonitor-podmonitor)
- [Receiver](./configuration/receiver)
- [Route](./configuration/route)
- [PrometheusRule](./configuration/advanced/prometheusrule)
- [Prometheus](./configuration/advanced/prometheus)
- [Alertmanager](./configuration/advanced/alertmanager)

### Configuring Helm Chart Options

For more information on `rancher-monitoring` chart options, including options to set resource limits and requests, see [this page.](./configuration/helm-chart-options)

# Uninstall Monitoring

1. From the **Cluster Explorer,** click Apps & Marketplace.
1. Click **Installed Apps.**
1. Go to the `cattle-monitoring-system` namespace and check the boxes for `rancher-monitoring-crd` and `rancher-monitoring`.
1. Click **Delete.**
1. Confirm **Delete.**

**Result:** `rancher-monitoring` is uninstalled.

> **Note on Persistent Grafana Dashboards:** For users who are using Monitoring V2 v9.4.203 or below, uninstalling the Monitoring chart will delete the cattle-dashboards namespace, which will delete all persisted dashboards, unless the namespace is marked with the annotation `helm.sh/resource-policy: "keep"`. This annotation is added by default in Monitoring V2 v14.5.100+ but can be manually applied on the cattle-dashboards namespace before an uninstall if an older version of the Monitoring chart is currently installed onto your cluster.

# Monitoring Workloads

The steps for setting up monitoring for workloads depends on whether you want basic metrics such as CPU and memory for the workload, or whether you want to scrape custom metrics from the workload.

If you only need CPU and memory time series for the workload, you don't need to deploy a ServiceMonitor or PodMonitor because the monitoring application already collects metrics data on resource usage by default. The resource usage time series data is in Prometheus's local time series database. Grafana shows the data in aggregate, but you can see the data for the individual workload by using a PromQL query that extracts the data for that workload. Once you have the PromQL query, you can execute the query individually in the Prometheus UI and see the time series visualized there, or you can use the query to customize a Grafana dashboard to display the workload metrics. For examples of PromQL queries for workload metrics, see [this section.](https://rancher.com/docs/rancher/v2.5/en/monitoring-alerting/configuration/expression/#workload-metrics)

To set up custom metrics for your workload, you will need to set up an exporter and create a new ServiceMonitor custom resource to configure Prometheus to scrape metrics from your exporter.

For more information, see [this section.](./monitoring-workloads)

# Windows Cluster Support

_Available as of v2.5.8_

When deployed onto an RKE1 Windows cluster, Monitoring V2 will now automatically deploy a [windows-exporter](https://github.com/prometheus-community/windows_exporter) DaemonSet and set up a ServiceMonitor to collect metrics from each of the deployed Pods. This will populate Prometheus with `windows_` metrics that are akin to the `node_` metrics exported by [node_exporter](https://github.com/prometheus/node_exporter) for Linux hosts.

To be able to fully deploy Monitoring V2 for Windows, all of your Windows hosts must have a minimum [wins](https://github.com/rancher/wins) version of v0.1.0.

For more details on how to upgrade wins on existing Windows hosts, refer to the section on [Windows cluster support for Monitoring V2.](./windows-clusters)

# Setting up Metrics for HPA

The monitoring app installs a Prometheus adapter that can be used for making the metrics from monitoring available from the Kubernetes API. This is useful for horizontal pod autoscaling based on custom metrics.

For details, see [this section.](./hpa)

# Monitoring Rancher Apps

A common pattern for Rancher apps is to package a ServiceMonitor in the Helm chart for the application. The ServiceMonitor contains a preconfigured Prometheus target for monitoring.

When the ServiceMonitor is enabled and monitoring is also enabled, Prometheus will be able to scrape metrics from the Rancher application.

For details, see [this page.](./monitoring-rancher-apps)

# Role-based Access Control

For information on configuring access to monitoring, see [this page.](./rbac)

# Upgrading from Monitoring V1 to V2

For more information about upgrading the Monitoring app in Rancher 2.5, please refer to the [migration docs](./migrating). 

If you previously enabled Monitoring, Alerting, or Notifiers in Rancher before v2.5, there is no upgrade path for switching to the new monitoring/ alerting solution. You will need to disable monitoring/ alerting/notifiers in Cluster Manager before deploying the new monitoring solution via Cluster Explorer.


# Known Issues

There is a [known issue](https://github.com/rancher/rancher/issues/28787#issuecomment-693611821) that K3s clusters require more default memory. If you are enabling monitoring on a K3s cluster, we recommend to setting `prometheus.prometheusSpec.resources.memory.limit` to 2500 Mi and `prometheus.prometheusSpec.resources.memory.request` to 1750 Mi.

For tips on debugging high memory usage, see [this page.](./memory-usage)
