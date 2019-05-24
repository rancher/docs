---
title: Monitoring
weight: 2528
---

_Available as of v2.2.4_

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution. Prometheus provides a _time series_ of your data, which is, according to [Prometheus documentation](https://prometheus.io/docs/concepts/data_model/):

>A stream of timestamped values belonging to the same metric and the same set of labeled dimensions, along with comprehensive statistics and metrics of the monitored cluster.

In other words, Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Using timestamps, Prometheus lets you query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or [Grafana](https://grafana.com/), which is an analytics viewing platform deployed along with Prometheus. By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, restore crashed servers, etc.  Multi-tenancy support in terms of cluster and project-only Prometheus instances are also supported.

Only [administrators]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/), [cluster owners or members]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), or [project owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles) can configure project level monitoring. Project members can only view monitoring metrics.

## Monitoring Scope

Using Prometheus, you can monitor Rancher at both the [cluster level]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/) and project level. For each cluster and project that is enabled for monitoring, Rancher deploys a Prometheus server.

- [Cluster monitoring]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/) allows you to view the health of your Kubernetes cluster. Prometheus collects metrics from the cluster components below, which you can view in graphs and charts.

    - [Kubernetes control plane]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#kubernetes-components-metrics)
    - [etcd database]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#etcd-metrics)
    - [All nodes (including workers)]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#cluster-metrics)

- Project monitoring allows you to view the state of pods running in a given project. Prometheus collects metrics from the project's deployed HTTP and TCP/UDP workloads.

## Configuring Project Monitoring

1. From the **Global** view, navigate to the project that you want to configure project monitoring.

1. Select **Tools > Monitoring** in the navigation bar.

1. Select **Enable** to show the [Prometheus configuration options]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/prometheus/). Enter in your desired configuration options.

1. Click **Save**.

### Project Level Monitoring Resource Requirements

Container| CPU - Request | Mem - Request | CPU - Limit | Mem - Limit | Configurable
---------|---------------|---------------|-------------|-------------|-------------
Prometheus|750m| 750Mi | 1000m | 1000Mi | Yes
Grafana | 100m | 100Mi | 200m | 200Mi | No


**Result:** A single application,`project-monitoring`, is added as an [application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) to the project.  After the application is `active`, you can start viewing [project metrics](#project-metrics) through the [Rancher dashboard]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/#rancher-dashboard) or directly from [Grafana]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/#grafana).

## Project Metrics

If [cluster monitoring]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/) is also enabled for the project, [workload metrics]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#workload-metrics) are  available for the project.

If only project monitoring is enabled, you can monitor custom metrics from any [exporters](https://prometheus.io/docs/instrumenting/exporters/). You can also expose some custom endpoints on deployments without needing to configure Prometheus for your project.

### Example

A [Redis](https://redis.io/) application is deployed in the namespace `redis-app` in the project `Datacenter`. It is monitored via [Redis exporter](https://github.com/oliver006/redis_exporter).

After enabling project monitoring, you can edit the application to configure the **Advanced Options -> Custom Metrics** section. Enter the `Container Port` and `Path` and select the `Protocol`.
