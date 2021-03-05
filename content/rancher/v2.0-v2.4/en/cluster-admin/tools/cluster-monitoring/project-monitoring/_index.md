---
title: Project Monitoring
weight: 2
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/tools/monitoring
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/monitoring/project-monitoring
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/project-monitoring
---

_Available as of v2.2.4_

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution.

This section covers the following topics:

- [Monitoring scope](#monitoring-scope)
- [Permissions to configure project monitoring](#permissions-to-configure-project-monitoring)
- [Enabling project monitoring](#enabling-project-monitoring)
- [Project-level monitoring resource requirements](#project-level-monitoring-resource-requirements)
- [Project metrics](#project-metrics)

### Monitoring Scope

Using Prometheus, you can monitor Rancher at both the [cluster level]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) and project level. For each cluster and project that is enabled for monitoring, Rancher deploys a Prometheus server.

- [Cluster monitoring]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) allows you to view the health of your Kubernetes cluster. Prometheus collects metrics from the cluster components below, which you can view in graphs and charts.

    - Kubernetes control plane
    - etcd database
    - All nodes (including workers)

- Project monitoring allows you to view the state of pods running in a given project. Prometheus collects metrics from the project's deployed HTTP and TCP/UDP workloads.

### Permissions to Configure Project Monitoring

Only [administrators]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/), [cluster owners or members]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), or [project owners]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles) can configure project level monitoring. Project members can only view monitoring metrics.

### Enabling Project Monitoring

> **Prerequisite:** Cluster monitoring must be [enabled.]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/)

1. Go to the project where monitoring should be enabled. Note: When cluster monitoring is enabled, monitoring is also enabled by default in the **System** project.

1. Select **Tools > Monitoring** in the navigation bar.

1. Select **Enable** to show the [Prometheus configuration options]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/prometheus/). Enter in your desired configuration options.

1. Click **Save**.

### Project-Level Monitoring Resource Requirements

Container| CPU - Request | Mem - Request | CPU - Limit | Mem - Limit | Configurable
---------|---------------|---------------|-------------|-------------|-------------
Prometheus|750m| 750Mi | 1000m | 1000Mi | Yes
Grafana | 100m | 100Mi | 200m | 200Mi | No


**Result:** A single application,`project-monitoring`, is added as an [application]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/apps/) to the project. After the application is `active`, you can start viewing project metrics through the [Rancher dashboard]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) or directly from Grafana.

> The default username and password for the Grafana instance will be `admin/admin`. However, Grafana dashboards are served via the Rancher authentication proxy, so only users who are currently authenticated into the Rancher server have access to the Grafana dashboard.

### Project Metrics
[Workload metrics]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/expression/#workload-metrics) are available for the project if monitoring is enabled at the [cluster level]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) and at the [project level.](#enabling-project-monitoring)

You can monitor custom metrics from any [exporters.](https://prometheus.io/docs/instrumenting/exporters/) You can also expose some custom endpoints on deployments without needing to configure Prometheus for your project.

> **Example:**
> A [Redis](https://redis.io/) application is deployed in the namespace `redis-app` in the project `Datacenter`. It is monitored via [Redis exporter](https://github.com/oliver006/redis_exporter). After enabling project monitoring, you can edit the application to configure the <b>Advanced Options -> Custom Metrics</b> section. Enter the `Container Port` and `Path` and select the `Protocol`.

To access a project-level Grafana instance,

1. From the **Global** view, navigate to a cluster that has monitoring enabled.

1. Go to a project that has monitoring enabled.

1. From the project view, click **Apps.** In versions before v2.2.0, choose **Catalog Apps** on the main navigation bar.

1. Go to the `project-monitoring` application.

1. In the `project-monitoring` application, there are two `/index.html` links: one that leads to a Grafana instance and one that leads to a Prometheus instance. When you click the Grafana link, it will redirect you to a new webpage for Grafana, which shows metrics for the cluster.

1. You will be signed in to the Grafana instance automatically. The default username is `admin` and the default password is `admin`. For security, we recommend that you log out of Grafana, log back in with the `admin` password, and change your password.

**Results:** You will be logged into Grafana from the Grafana instance. After logging in, you can view the preset Grafana dashboards, which are imported via the [Grafana provisioning mechanism](http://docs.grafana.org/administration/provisioning/#dashboards), so you cannot modify them directly. For now, if you want to configure your own dashboards, clone the original and modify the new copy.
