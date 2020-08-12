---
title: Integrating Rancher and Prometheus for Cluster Monitoring
shortTitle: Monitoring
description: Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Learn about the scope of monitoring and how to enable cluster monitoring
weight: 10
---

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution.

This page describes how to enable monitoring for a cluster. 

This section covers the following topics:

- [About Prometheus](#about-prometheus)
- [Monitoring scope](#monitoring-scope)
- [Enabling cluster monitoring](#enabling-cluster-monitoring)
- [Resource consumption](#resource-consumption)
  - [Resource consumption of Prometheus pods](#resource-consumption-of-prometheus-pods)
  - [Resource consumption of other pods](#resources-consumption-of-other-pods)

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

# Resource Consumption

When enabling cluster monitoring, you need to ensure your worker nodes and Prometheus pod have enough resources. The tables below provides a guide of how much resource consumption will be used. In larger deployments, it is strongly advised that the monitoring infrastructure be placed on dedicated nodes in the cluster.

### Resource Consumption of Prometheus Pods

This table is the resource consumption of the Prometheus pod, which is based on the number of all the nodes in the cluster. The count of nodes includes the worker, control plane and etcd nodes. Total disk space allocation should be approximated by the `rate * retention` period set at the cluster level. When enabling cluster level monitoring, you should adjust the CPU and Memory limits and reservation.

Number of Cluster Nodes | CPU (milli CPU) | Memory | Disk
------------------------|-----|--------|------
5 | 500 | 650 MB | ~1 GB/Day
50| 2000 | 2 GB | ~5 GB/Day
256| 4000 | 6 GB | ~18 GB/Day

Additional pod resource requirements for cluster level monitoring.

| Workload            |      Container                  | CPU - Request | Mem - Request | CPU - Limit | Mem - Limit | Configurable |
|---------------------|---------------------------------|---------------|---------------|-------------|-------------|--------------|
| Prometheus          | prometheus                      |     750Mi      |     750Mi     |    1500Mi    |    1500Mi  |       Y      |
|                     | prometheus-proxy                |      50Mi      |      50Mi     |     100Mi    |     100Mi   |       Y      |
|                     | prometheus-auth                 |     100Mi      |     100Mi     |     500Mi    |     200Mi   |       Y      |
|                     | prometheus-config-reloader      |       -       |       -       |      50Mi    |      50Mi   |       N      |
|                     | rules-configmap-reloader        |       -       |       -       |     100Mi    |      25Mi   |       N      |
| Grafana             | grafana-init-plugin-json-copy   |      50Mi      |      50Mi     |      50Mi    |      50Mi   |       Y      |
|                     | grafana-init-plugin-json-modify |      50Mi      |      50Mi     |      50Mi    |      50Mi   |       Y      |
|                     | grafana                         |     100Mi      |     100Mi     |     200Mi    |     200Mi   |       Y      |
|                     | grafana-proxy                   |      50Mi      |      50Mi     |     100Mi    |     100Mi   |       Y      |
| Kube-State Exporter | kube-state                      |     100Mi      |     130Mi     |     100Mi    |     200Mi   |       Y      |
| Node Exporter       | exporter-node                   |     200Mi     |     200Mi     |     200Mi    |     200Mi   |       Y      |
| Operator            | prometheus-operator             |     100Mi      |      50Mi     |     200Mi    |     100Mi   |       Y      |


### Resource Consumption of Other Pods

Besides the Prometheus pod, there are components that are deployed that require additional resources on the worker nodes.

Pod | CPU (milli CPU) | Memory (MB)
----|-----------------|------------
Node Exporter (Per Node) | 100 | 30
Kube State Cluster Monitor | 100 | 130
Grafana | 100 | 150
Prometheus Cluster Monitoring Nginx | 50 | 50
