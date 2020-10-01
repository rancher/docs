---
title: Monitoring / Alerting
shortTitle: Monitoring / Alerting
description: Rancher makes it easy to deploy a full monitoring and alerting solution onto a Kubernetes cluster by leveraging popular solutions such as Prometheus, Alertmanager, and Grafana. Learn about the scope of Rancher's monitoring / alerting stack and how to enable it within your cluster.
weight: 15
---

Users can deploy a full monitoring and alerting solution (powered by [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)) onto your cluster, which:

- Monitors the state and processes of your cluster nodes, Kubernetes components, and software deployments via [Prometheus](https://prometheus.io/), a leading open-source monitoring solution.
- Defines alerts based on metrics collected via [Prometheus](https://prometheus.io/)
- Creates custom dashboards to make it easy to visualize collected metrics via [Grafana](https://grafana.com/docs/grafana/latest/getting-started/what-is-grafana/)
- Configures alert-based notifications via Email, Slack, PagerDuty, etc. using [Prometheus Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/)
- Defines precomputed frequently needed / computationally expensive expressions as new time series based on metrics collected via [Prometheus](https://prometheus.io/) (only available in 2.5.x)
- Exposes collected metrics from Prometheus to the Kubernetes Custom Metrics API via [Prometheus Adapter](https://github.com/DirectXMan12/k8s-prometheus-adapter) for use in HPA (only available in 2.5.x)

This section covers the following topics:

- [Monitoring Components](#monitoring-components)
  - [Prometheus](#about-prometheus)
  - [Grafana](#about-grafana)
  - [Alertmanager](#about-alertmanager)
  - [Prometheus Operator](#about-prometheus-operator)
  - [Prometheus Adapter](#about-prometheus-adapter)
- [Changes in Rancher 2.5.x](#changes-in-rancher-2.5.x)
  - [Monitoring & Alerting V1](#monitoring-alerting-v1)
  - [Monitoring & Alerting V2](#monitoring-alerting-v2)

## Monitoring Components

### Prometheus

Prometheus provides a _time series_ of your data, which is, according to [Prometheus documentation](https://prometheus.io/docs/concepts/data_model/):

>A stream of timestamped values belonging to the same metric and the same set of labeled dimensions, along with comprehensive statistics and metrics of the monitored cluster.

In other words, Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Using timestamps, Prometheus lets you query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or [Grafana](https://grafana.com/), which is an analytics viewing platform deployed along with Prometheus.

By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, restore crashed servers, etc.

### Grafana

Insert section here

### Alertmanager

Insert section here

### Prometheus Operator

Insert section here

### Prometheus Adapter (only in 2.5.x)

Insert section here

## Changes in Rancher 2.5.x

### Monitoring & Alerting V1

As of v2.2.0, Rancher's Enterprise Cluster Manager allows users to enable Monitoring & Alerting V1 (both powered by [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)) independently within a cluster. For more information on how to configure Monitoring & Alerting V1, see the [Legacy docs](/rancher/v2.x/en/monitoring-alerting/legacy).

When Monitoring is enabled, Monitoring V1 deploys [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/docs/grafana/latest/getting-started/what-is-grafana/) onto a cluster to monitor the state of processes of your cluster nodes, Kubernetes components, and software deployments and create custom dashboards to make it easy to visualize collected metrics. Monitoring V1 could be configured on both a cluster-level and on a project-level and would automatically scrape certain workloads deployed as Apps on the Rancher cluster.

When Alerts or Notifiers are enabled, Alerting V1 deploys [Prometheus Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) and a set of Rancher controllers onto a cluster that allows users to define alerts and configure alert-based notifications via Email, Slack, PagerDuty, etc. Users can choose to create different types of alerts depending on what needs to be monitored (e.g. System Services, Resources, CIS Scans, etc.); however, PromQL Expression-based alerts can only be created if Monitoring V1 is enabled.

### Monitoring & Alerting V2

As of v2.5.0, Rancher Dashboard now allows users to enable Monitoring & Alerting V2 (both powered by [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)) together within a cluster. 

Unlike in Monitoring & Alerting V1, both features are packaged in a single Helm chart found [here](https://github.com/rancher/charts/tree/dev-v2.5/charts/rancher-monitoring). The behavior of this chart and configurable fields closely matches [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack), a Prometheus Community Helm chart, and any deviations from the upstream chart can be found in the [CHANGELOG.md](https://github.com/rancher/charts/blob/dev-v2.5/charts/rancher-monitoring/CHANGELOG.md) maintained with the chart.

If you currently use Monitoring or Alerting V1 and are interested in upgrading to Monitoring & Alerting V2 in Rancher 2.5, please see [Migrating to 2.5.x](/rancher/v2.x/en/monitoring-alerting/2.5.x/migrating/). For more information on how to configure Monitoring & Alerting V2, see the [2.5.x docs](/rancher/v2.x/en/monitoring-alerting/2.5.x).