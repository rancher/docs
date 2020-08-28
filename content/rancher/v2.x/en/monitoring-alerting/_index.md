---
title: Monitoring and Alerting
shortTitle: Monitoring/Alerting
description: Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Learn about the scope of monitoring and how to enable cluster monitoring
weight: 12
---

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution.

This page describes how to enable monitoring for a cluster. 

This section covers the following topics:

- [Changes in Rancher v2.5](#changes-in-rancher-v2-5)
- [About Prometheus](#about-prometheus)
- [Monitoring scope](#monitoring-scope)
- [Enabling cluster monitoring](#enabling-cluster-monitoring)
- [Configuration](#configuration)
- [Examples](#examples)
  - [Create ServiceMonitor Custom Resource](#create-servicemonitor-custom-resource)
  - [PodMonitor](#podmonitor)
  - [PrometheusRule](#prometheusrule)
  - [Alertmanager Config](#alertmanager-config)
  - [Configuring a Persistent Grafana Dashboard](#configuring-a-persistent-grafana-dashboard)
  - [Configuring Grafana to Use Multiple Data Sources](#configuring-grafana-to-use-multiple-data-sources)


# Changes in Rancher v2.5

Rancher's monitoring application is powered by the Prometheus operator, and it now relies less on Rancher's in-house monitoring tools.

This change allows Rancher to automatically support new features of the Prometheus operator API. Now all of the features exposed by the upstream Prometheus operator are available in the monitoring application, and you have more flexibility to configure monitoring.

Previously, you would use the Rancher UI to configure monitoring. The Rancher UI created CRDs that were maintained by Rancher and updated the Prometheus state. In Rancher v2.5, you directly create CRDs for the monitoring application, and those CRDs are exposed in the Rancher UI.

The differences between Rancher's monitoring feature and the upstream Prometheus operator can be found in the [changelog.](https://github.com/rancher/charts/blob/dev-v2.5/packages/rancher-monitoring/overlay/CHANGELOG.md)

# About Prometheus

Prometheus provides a _time series_ of your data, which is, according to [Prometheus documentation](https://prometheus.io/docs/concepts/data_model/):

>A stream of timestamped values belonging to the same metric and the same set of labeled dimensions, along with comprehensive statistics and metrics of the monitored cluster.

In other words, Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Using timestamps, Prometheus lets you query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or [Grafana](https://grafana.com/), which is an analytics viewing platform deployed along with Prometheus.

By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, restore crashed servers, etc.

# Monitoring Scope

Cluster monitoring allows you to view the health of your Kubernetes cluster. Prometheus collects metrics from the cluster components below, which you can view in graphs and charts.

- [Kubernetes control plane]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#kubernetes-components-metrics)
- [etcd database]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#etcd-metrics)
- [All nodes (including workers)]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#cluster-metrics)

# Enabling Cluster Monitoring

As an [administrator]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Prometheus to monitor your Kubernetes cluster.

> **Prerequisite:** Make sure that you are allowing traffic on port 9796 for each of your nodes because Prometheus will scrape metrics from here.

> The default username and password for the Grafana instance will be `admin/admin`. However, Grafana dashboards are served via the Rancher authentication proxy, so only users who are currently authenticated into the Rancher server have access to the Grafana dashboard.

# Configuration

For information on configuring custom Prometheus metrics and alerting rules, refer to the upstream documentation for the [Prometheus operator.](https://github.com/prometheus-operator/prometheus-operator) This documentation can help you set up RBAC, Thanos, or custom configuration.

To create an additional scrape configuration, refer to [this page.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/additional-scrape-config.md)

# Examples

### Create ServiceMonitor Custom Resource

An example ServiceMonitor custom resource can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/prometheus-operator-crd/monitoring.coreos.com_servicemonitors.yaml) 

### PodMonitor

An example PodMonitor can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/user-guides/getting-started/example-app-pod-monitor.yaml) and an example Prometheus resource that refers to it can be found [here.](https://github.com/prometheus-operator/prometheus-operator/blob/master/example/user-guides/getting-started/prometheus-pod-monitor.yaml)

### PrometheusRule

Prometheus rule files are held in PrometheusRule custom resources. Use the label selector field ruleSelector in the Prometheus object to define the rule files that you want to be mounted into Prometheus. An example PrometheusRule is on [this page.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/alerting.md)

### Alertmanager Config

The Prometheus Operator introduces an Alertmanager resource, which allows users to declaratively describe an Alertmanager cluster.

The upstream Prometheus documentation includes information on how to [set up](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/user-guides/alerting.md) and [configure](https://prometheus.io/docs/alerting/latest/configuration/) Alertmanager.

### Configuring a Persistent Grafana Dashboard

To allow the Grafana dashboard to persist after it restarts, you will need to add the configuration JSON into a ConfigMap.

You can add this configuration to the ConfigMap using the Rancher UI.

### Configuring Grafana to Use Multiple Data Sources

The data from Prometheus is used as the data source for the Grafana dashboard. Multiple data sources can be configured for Grafana.