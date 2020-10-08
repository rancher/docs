---
title: Monitoring and Alerting
shortTitle: Monitoring/Alerting
description: Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Learn about the scope of monitoring and how to enable cluster monitoring
weight: 14
aliases:
  - /rancher/v2.x/en/dashboard/monitoring-alerting
  - /rancher/v2.x/en/dashboard/notifiers
  - /rancher/v2.x/en/cluster-admin/tools/monitoring/
---

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution.

[use Arvind's wording for explaining kube-prometheus stack]

Prometheus collects metrics from the cluster components, which you can view in graphs and charts.

This page describes how to enable monitoring for a cluster using Rancher's new monitoring application, which was introduced in Rancher v2.5. For the legacy docs about monitoring, refer to [this section.](../legacy)

> Before enabling monitoring, be sure to review the [resource requirements.](#resource-requirements)

- [Changes in Rancher v2.5 and Migrating to Monitoring v2](#changes-in-rancher-v2-5-and-migrating-to-monitoring-v2)
- [Differences between `rancher-monitoring` and Upstream Prometheus](#differences-between-rancher-monitoring-and-upstream-prometheus)
- [Changes to Role-based Access Control](#changes-to-role-based-access-control)
- [Default Alerts, Targets and Grafana Dashboards](#default-alerts-targets-and-grafana-dashboards)
- [Enable Monitoring](#enable-monitoring)
- [Uninstall Monitoring](#uninstall-monitoring)
- [Resource Requirements](#resource-requirements)
- [Configuration Reference](#configuration-reference)
- [Dashboards](#dashboards)
  - [Grafana UI](#grafana-ui)
  - [Prometheus UI](#prometheus-ui)
  - [Viewing the Prometheus Targets](#viewing-the-prometheus-targets)
  - [Viewing the Prometheus Rules](#viewing-the-prometheus-rules)
  - [Viewing Active Alerts in Alertmanager](#viewing-active-alerts-in-alertmanager)
- [Prometheus Adapter](#prometheus-adapter)

### Changes in Rancher v2.5 and Migrating to Monitoring v2

If you previously enabled monitoring in Rancher prior to v2.5, there is no upgrade path for the monitoring application. You will need to disable monitoring and re-enable monitoring in Rancher.

For a list of changes in the new monitoring application, refer to this [page.](../migrating)

### Differences between `rancher-monitoring` and Upstream Prometheus

In general, any feature supported by the upstream [Prometheus Operator Helm chart ](https://github.com/helm/charts/tree/master/stable/prometheus-operator) should be supported in the corresponding version Helm chart for Rancher's monitoring application.

The deviations from the upstream Prometheus Operator Helm chart are recorded in the [CHANGELOG.md file](https://github.com/rancher/charts/blob/dev-v2.5/charts/rancher-monitoring/CHANGELOG.md) in the Helm chart of Rancher's monitoring application.

### Changes to Role-based Access Control

Project owners and members no longer get access to Grafana or Prometheus by default. If view-only users had access to Grafana, they would be able to see data from any namespace. For Kiali, any user can edit things they don’t own in any namespace.

For more information about role-based access control in `rancher-monitoring`, refer to [this page.](./rbac)

# Enabling Cluster Monitoring

As an [administrator]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Prometheus to monitor your Kubernetes cluster.

> If you want to set up Alertmanager, Grafana or Ingress, it has to be done with the settings on the Helm chart deployment. It's problematic to create Ingress outside the deployment.

> **Prerequisites:**
> 
> - Make sure that you are allowing traffic on port 9796 for each of your nodes because Prometheus will scrape metrics from here.
> - Make sure your cluster fulfills the resource requirements. The cluster should have at least 1950Mi memory available, 2700m CPU, and 50Gi storage. A breakdown of the resource limits and requests is [here.](#resource-requirements)

1. In the Rancher UI, go to the cluster where you want to install monitoring and click **Cluster Explorer.**
1. Click **Apps.**
1. Click the `rancher-monitoring` app.
1. Optional: Click **Chart Options** and configure alerting, Prometheus and Grafana. For help, refer to the [configuration reference.](#../configuration)
1. Scroll to the bottom of the Helm chart README and click **Install.**

**Result:** The monitoring app is deployed in the `cattle-monitoring-system` namespace.

### Next Steps

To configure Prometheus resources from the Rancher UI, click **Apps & Marketplace > Monitoring** in the upper left corner.

# Uninstall Monitoring

1. From the **Cluster Explorer,** click Apps & Marketplace.
1. Click **Installed Apps.**
1. Go to the `cattle-monitoring-system` namespace and check the boxes for `rancher-monitoring-crd` and `rancher-monitoring`.
1. Click **Delete.**
1. Confirm **Delete.**

**Result:** `rancher-monitoring` is uninstalled.

# Resource Requirements

The resource requests and limits can be configured when installing `rancher-monitoring`.

The default values are in the `values.yaml` in the `rancher-monitoring` Helm chart.

There is a [known issue](https://github.com/rancher/rancher/issues/28787#issuecomment-693611821) that K3s clusters require more default memory. If you are enabling monitoring on a K3s cluster, we recommend to setting `prometheus.prometheusSpec.resources.memory.limit` to 2500Mi` and `prometheus.prometheusSpec.resources.memory.request` to 1750Mi.

| Resource Name | Memory Limit | CPU Limit | Memory Request | CPU Request |
| ------------- | ------------ | ----------- | ---------------- | ------------------ |
| alertmanager | 500Mi | 1000m | 100Mi |  100m |
| grafana | 200Mi | 200m | 100Mi | 100m |
| kube-state-metrics subchart | 200Mi  | 100m | 130Mi | 100m |
| prometheus-node-exporter subchart | 50Mi | 200m | 30Mi | 100m |
| prometheusOperator | 500Mi | 200m | 100Mi | 100m |
| prometheus | 500Mi | 1000m | 100Mi | 100m |
| **Total**                 | **1950Mi** | **2700m** | **560Mi** | **600m** |

At least 50Gi storage is recommended.

# Configuration Reference

For the configuration reference and examples, refer to [this page.](../configuration)

# Dashboards

Installing `rancher-monitoring` makes the following dashboards available from the Rancher UI.

### Grafana UI

The default username and password for the Grafana instance will be `admin`/`prom-operator`. However, Grafana dashboards are served via the Rancher authentication proxy, so only users who are currently authenticated into the Rancher server have access to the Grafana dashboard. For information about the default permissions, refer to the [roles-based access control section.](./rbac)

To see the Grafana UI, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Grafana.

- How to view the currently deployed dashboard
- how to create a custom dashboard on the Grafana UI
- Configuring a persistent Grafana dashboard - will be built on the second, once you have a JSON dashboard, how do you copy it to a configmap
- configuring Grafana to use multiple data sources - might not need this.

<figcaption>Cluster Compute Resources Dashboard in Grafana</figcaption>
![Cluster Compute Resources Dashboard in Grafana]({{<baseurl>}}/img/rancher/cluster-compute-resources-dashboard.png)

<figcaption>Default Dashboards in Grafana</figcaption>
![Default Dashboards in Grafana]({{<baseurl>}}/img/rancher/default-grafana-dashboards.png)

To allow the Grafana dashboard to persist after it restarts, you will need to add the configuration JSON into a ConfigMap. You can add this configuration to the ConfigMap using the Rancher UI.

### Prometheus UI

To see the Prometheus UI, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Graph.**

<figcaption>Prometheus Graph UI</figcaption>
![Prometheus Graph UI]({{<baseurl>}}/img/rancher/prometheus-graph-ui.png)

### Viewing the Prometheus Targets

To see the Prometheus Targets, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Targets.**

<figcaption>Targets in the Prometheus UI</figcaption>
![Prometheus Targets UI]({{<baseurl>}}/img/rancher/prometheus-targets-ui.png)

### Viewing the Prometheus Rules

To see the Prometheus Rules, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Rules.**

<figcaption>Rules in the Prometheus UI</figcaption>
![Prometheus Rules UI]({{<baseurl>}}/img/rancher/prometheus-rules-ui.png)

### Viewing Active Alerts in Alertmanager

When `rancher-monitoring` is installed, the Prometheus Alertmanager UI is deployed.

The Alertmanager handles alerts sent by client applications such as the Prometheus server. It takes care of deduplicating, grouping, and routing them to the correct receiver integration such as email, PagerDuty, or OpsGenie. It also takes care of silencing and inhibition of alerts.

In the Alertmanager UI, you can view your alerts and the current Alertmanager configuration.

To see the Prometheus Rules, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Alertmanager.**

**Result:** The Alertmanager UI opens in a new tab. For help with configuration, refer to the [official Alertmanager documentation.](https://prometheus.io/docs/alerting/latest/alertmanager/)

<figcaption>The Alertmanager UI</figcaption>
![Alertmanager UI]({{<baseurl>}}/img/rancher/alertmanager-ui.png)

# Prometheus Adapter

The [Prometheus adapter](https://github.com/prometheus-community/helm-charts/tree/main/charts/prometheus-adapter) is useful if you want to expose the metrics collected by `rancher-monitoring` to the custom metrics API for Kubernetes. A common use case is to use the custom metrics for the horizontal pod autoscaler.

The Prometheus adapter allows you to provide a secret to determine what metrics from Prometheus get sent to the custom metrics API.

You can provide configuration via Helm for the Prometheus adapter.

<<<<<<< HEAD
The data from Prometheus is used as the data source for the Grafana dashboard. Multiple data sources can be configured for Grafana.
=======
For more information about using the Promethus adapter, refer to this [documentation.](https://github.com/DirectXMan12/k8s-prometheus-adapter/blob/master/docs/config-walkthrough.md)
>>>>>>> Update monitoring docs
