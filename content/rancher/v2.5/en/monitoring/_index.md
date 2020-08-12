---
title: Integrating Rancher and Prometheus for Cluster Monitoring
shortTitle: Monitoring
description: Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Learn about the scope of monitoring and how to enable cluster monitoring
weight: 10
---

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution.

This page describes how to enable monitoring for a cluster. 

This section covers the following topics:

- [Changes in Rancher v2.5](#changes-in-rancher-v2-5)
- [About Prometheus](#about-prometheus)
- [Monitoring scope](#monitoring-scope)
- [Enabling cluster monitoring](#enabling-cluster-monitoring)
- [Resource consumption](#resource-consumption)
  - [Resource consumption of Prometheus pods](#resource-consumption-of-prometheus-pods)
  - [Resource consumption of other pods](#resources-consumption-of-other-pods)

# Changes in Rancher v2.5

Rancher's monitoring application is now powered by the Prometheus operator and relies less on Rancher's in-house monitoring tools.

This change allows Rancher to automatically support new features of the Prometheus operator API.

Previously, you would use the Rancher UI to configure monitoring. The Rancher UI created CRDs that were maintained by Rancher and updated the Prometheus state. In Rancher v2.5, you directly create CRDs for the monitoring application, and those CRDs are exposed in the Rancher UI.

For information on configuring custom Prometheus metrics and alerting rules, refer to the upstream documentation for the [Prometheus operator.](https://github.com/prometheus-operator/prometheus-operator) This documentation can also help you set up RBAC, Thanos, or custom configuration.

The Rancher monitoring application's Helm chart comes with a README that provides documentation. If you want to set up monitoring with advanced features, you can enable them when deploying the application.

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
