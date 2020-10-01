---
title: Monitoring and Alerting V2 Documentation
shortTitle: 2.5.x
weight: 5
---

This section covers the following topics:

- [Monitoring & Alerting Scope](#monitoring-scope)
- [Enabling Monitoring & Alerting](#enabling-monitoring-and-alerting)
- [Configuration](#configuration)
- [Examples](#examples)
  - [Create ServiceMonitor Custom Resource](#create-servicemonitor-custom-resource)
  - [PodMonitor](#podmonitor)
  - [PrometheusRule](#prometheusrule)
  - [Alertmanager Config](#alertmanager-config)
  - [Configuring a Persistent Grafana Dashboard](#configuring-a-persistent-grafana-dashboard)
  - [Configuring Grafana to Use Multiple Data Sources](#configuring-grafana-to-use-multiple-data-sources)

## Monitoring & Alerting V2 Scope

Needs to be modified to add in alerting stuff

Enabling monitoring allows you to view the health of your Kubernetes cluster. Prometheus collects metrics from the cluster components below, which you can view in graphs and charts.

- [Kubernetes control plane]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#kubernetes-components-metrics)
- [etcd database]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#etcd-metrics)
- [All nodes (including workers)]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#cluster-metrics)

## Enabling Monitoring & Alerting V2

As an [administrator]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Prometheus, Grafana, and Alertmanager to monitor your Kubernetes cluster and set up an alerting / notification pipeline.

> **Prerequisite:** Make sure that you are allowing traffic on port 9796 for each of your nodes because Prometheus will scrape metrics from here.

> The default username and password for the Grafana instance will be `admin/prom-operator`. However, Grafana dashboards are served via the Rancher authentication proxy, so only users who are currently authenticated into the Rancher server have access to the Grafana dashboard.

## Configuration

For information on configuring custom Prometheus metrics and alerting rules, refer to the upstream documentation for the [Prometheus operator.](https://github.com/prometheus-operator/prometheus-operator) This documentation can help you set up RBAC, Thanos, or custom configuration.

To create an additional scrape configuration, refer to [this page.](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/additional-scrape-config.md)

## Examples

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