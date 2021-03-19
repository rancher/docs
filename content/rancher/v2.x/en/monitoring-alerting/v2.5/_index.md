---
title: Monitoring in Rancher v2.5
shortTitle: Rancher v2.5
weight: 1
---

Using Rancher, you can quickly deploy leading open-source monitoring alerting solutions onto your cluster.

The `rancher-monitoring` operator, introduced in Rancher v2.5, is powered by [Prometheus](https://prometheus.io/), [Grafana](https://grafana.com/grafana/),  [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/), the [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator), and the [Prometheus adapter.](https://github.com/DirectXMan12/k8s-prometheus-adapter) This page describes how to enable monitoring and alerting within a cluster using the new monitoring application.

Rancher's solution allows users to:

- Monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments via Prometheus, a leading open-source monitoring solution.
- Define alerts based on metrics collected via Prometheus
- Create custom dashboards to make it easy to visualize collected metrics via Grafana
- Configure alert-based notifications via Email, Slack, PagerDuty, etc. using Prometheus Alertmanager
- Defines precomputed, frequently needed or computationally expensive expressions as new time series based on metrics collected via Prometheus (only available in 2.5)
- Expose collected metrics from Prometheus to the Kubernetes Custom Metrics API via Prometheus Adapter for use in HPA (only available in 2.5)

More information about the resources that get deployed onto your cluster to support this solution can be found in the [`rancher-monitoring`](https://github.com/rancher/charts/tree/main/charts/rancher-monitoring) Helm chart, which closely tracks the upstream [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) Helm chart maintained by the Prometheus community with certain changes tracked in the [CHANGELOG.md](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring/CHANGELOG.md).

> If you previously enabled Monitoring, Alerting, or Notifiers in Rancher before v2.5, there is no upgrade path for switching to the new monitoring/ alerting solution. You will need to disable monitoring/ alerting/notifiers in Cluster Manager before deploying the new monitoring solution via Cluster Explorer.

For more information about upgrading the Monitoring app in Rancher 2.5, please refer to the [migration docs](./migrating). 

- [About Prometheus](#about-prometheus)
- [Enable Monitoring](#enable-monitoring)
  - [Default Alerts, Targets, and Grafana Dashboards](#default-alerts-targets-and-grafana-dashboards)
- [Using Monitoring](#using-monitoring)
  - [Grafana UI](#grafana-ui)
  - [Prometheus UI](#prometheus-ui)
  - [Viewing the Prometheus Targets](#viewing-the-prometheus-targets)
  - [Viewing the PrometheusRules](#viewing-the-prometheusrules)
  - [Viewing Active Alerts in Alertmanager](#viewing-active-alerts-in-alertmanager)
- [Uninstall Monitoring](#uninstall-monitoring)
- [Setting Resource Limits and Requests](#setting-resource-limits-and-requests)
- [Known Issues](#known-issues)

# About Prometheus

Prometheus provides a time series of your data, which is, according to the [Prometheus documentation:](https://prometheus.io/docs/concepts/data_model/)

> A stream of timestamped values belonging to the same metric and the same set of labeled dimensions, along with comprehensive statistics and metrics of the monitored cluster.

In other words, Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Using timestamps, Prometheus lets you query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or Grafana, which is an analytics viewing platform deployed along with Prometheus.

By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, restore crashed servers, etc.

# Enable Monitoring

As an [administrator]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Prometheus to monitor your Kubernetes cluster.

> **Requirements:**
> 
> - Make sure that you are allowing traffic on port 9796 for each of your nodes because Prometheus will scrape metrics from here.
> - Make sure your cluster fulfills the resource requirements. The cluster should have at least 1950Mi memory available, 2700m CPU, and 50Gi storage. A breakdown of the resource limits and requests is [here.](#setting-resource-limits-and-requests)
> - When installing monitoring on an RKE cluster using RancherOS or Flatcar Linux nodes, change the etcd node certificate directory to `/opt/rke/etc/kubernetes/ssl`.


1. In the Rancher UI, go to the cluster where you want to install monitoring and click **Cluster Explorer.**
1. Click **Apps.**
1. Click the `rancher-monitoring` app.
1. Optional: Click **Chart Options** and configure alerting, Prometheus and Grafana. For help, refer to the [configuration reference.](./configuration)
1. Scroll to the bottom of the Helm chart README and click **Install.**

**Result:** The monitoring app is deployed in the `cattle-monitoring-system` namespace.

### Default Alerts, Targets, and Grafana Dashboards

By default, Rancher Monitoring deploys exporters (such as [node-exporter](https://github.com/prometheus/node_exporter) and [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics)) as well as default Prometheus alerts and Grafana dashboards (curated by the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) project) onto a cluster.

To see the default alerts, go to the [Alertmanager UI](#viewing-active-alerts-in-alertmanager) and click **Expand all groups.**

To see what services you are monitoring, you will need to see your targets. To view the default targets, refer to [Viewing the Prometheus Targets.](#viewing-the-prometheus-targets)

To see the default dashboards, go to the [Grafana UI.](#grafana-ui) In the left navigation bar, click the icon with four boxes and click **Manage.**

### Next Steps

To configure Prometheus resources from the Rancher UI, click **Apps & Marketplace > Monitoring** in the upper left corner.

# Using Monitoring

Installing `rancher-monitoring` makes the following dashboards available from the Rancher UI.

> **Note:** If you want to set up Alertmanager, Grafana or Ingress, it has to be done with the settings on the Helm chart deployment. It's problematic to create Ingress outside the deployment.

### Grafana UI

[Grafana](https://grafana.com/grafana/) allows you to query, visualize, alert on and understand your metrics no matter where they are stored. Create, explore, and share dashboards with your team and foster a data driven culture.

Rancher allows any users who are authenticated by Kubernetes and have access the Grafana service deployed by the Rancher Monitoring chart to access Grafana via the Rancher Dashboard UI. By default, all users who are able to access Grafana are given the [Viewer](https://grafana.com/docs/grafana/latest/permissions/organization_roles/#viewer-role) role, which allows them to view any of the default dashboards deployed by Rancher.

However, users can choose to log in to Grafana as an [Admin](https://grafana.com/docs/grafana/latest/permissions/organization_roles/#admin-role) if necessary. The default Admin username and password for the Grafana instance will be `admin`/`prom-operator`, but alternative credentials can also be supplied on deploying or upgrading the chart.

> **Persistent Dashboards:** To allow the Grafana dashboard to persist after it restarts, add the dashboard configuration JSON into a ConfigMap. ConfigMaps also allow the dashboards to be deployed with a GitOps or CD based approach. This allows the dashboard to be put under version control. For details, refer to [this section.](./persist-grafana)

To see the Grafana UI, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Grafana.

<figcaption>Cluster Compute Resources Dashboard in Grafana</figcaption>
![Cluster Compute Resources Dashboard in Grafana]({{<baseurl>}}/img/rancher/cluster-compute-resources-dashboard.png)

<figcaption>Default Dashboards in Grafana</figcaption>
![Default Dashboards in Grafana]({{<baseurl>}}/img/rancher/grafana-default-dashboard.png)

### Prometheus UI

To see the Prometheus UI, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Graph.**

<figcaption>Prometheus Graph UI</figcaption>
![Prometheus Graph UI]({{<baseurl>}}/img/rancher/prometheus-graph-ui.png)

### Viewing the Prometheus Targets

To see the Prometheus Targets, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Targets.**

<figcaption>Targets in the Prometheus UI</figcaption>
![Prometheus Targets UI]({{<baseurl>}}/img/rancher/prometheus-targets-ui.png)

### Viewing the PrometheusRules

To see the PrometheusRules, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Rules.**

<figcaption>Rules in the Prometheus UI</figcaption>
![PrometheusRules UI]({{<baseurl>}}/img/rancher/prometheus-rules-ui.png)

For more information on PrometheusRules in Rancher, see [this page.](./configuration/prometheusrules)

### Viewing Active Alerts in Alertmanager

When `rancher-monitoring` is installed, the Prometheus Alertmanager UI is deployed.

The Alertmanager handles alerts sent by client applications such as the Prometheus server. It takes care of deduplicating, grouping, and routing them to the correct receiver integration such as email, PagerDuty, or OpsGenie. It also takes care of silencing and inhibition of alerts.

In the Alertmanager UI, you can view your alerts and the current Alertmanager configuration.

To see the PrometheusRules, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Alertmanager.**

**Result:** The Alertmanager UI opens in a new tab. For help with configuration, refer to the [official Alertmanager documentation.](https://prometheus.io/docs/alerting/latest/alertmanager/)

For more information on configuring Alertmanager in Rancher, see [this page.](./configuration/alertmanager)

<figcaption>The Alertmanager UI</figcaption>
![Alertmanager UI]({{<baseurl>}}/img/rancher/alertmanager-ui.png)

# Uninstall Monitoring

1. From the **Cluster Explorer,** click Apps & Marketplace.
1. Click **Installed Apps.**
1. Go to the `cattle-monitoring-system` namespace and check the boxes for `rancher-monitoring-crd` and `rancher-monitoring`.
1. Click **Delete.**
1. Confirm **Delete.**

**Result:** `rancher-monitoring` is uninstalled.

# Setting Resource Limits and Requests

The resource requests and limits can be configured when installing `rancher-monitoring`.

The default values are in the [values.yaml](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring/values.yaml) in the `rancher-monitoring` Helm chart.

The default values in the table below are the minimum required resource limits and requests.

| Resource Name | Memory Limit | CPU Limit | Memory Request | CPU Request |
| ------------- | ------------ | ----------- | ---------------- | ------------------ |
| alertmanager | 500Mi | 1000m | 100Mi |  100m |
| grafana | 200Mi | 200m | 100Mi | 100m |
| kube-state-metrics subchart | 200Mi  | 100m | 130Mi | 100m |
| prometheus-node-exporter subchart | 50Mi | 200m | 30Mi | 100m |
| prometheusOperator | 500Mi | 200m | 100Mi | 100m |
| prometheus | 2500Mi | 1000m | 1750Mi | 750m |
| **Total**                 | **3950Mi** | **2700m** | **2210Mi** | **1250m** |

At least 50Gi storage is recommended.

# Known Issues

There is a [known issue](https://github.com/rancher/rancher/issues/28787#issuecomment-693611821) that K3s clusters require more default memory. If you are enabling monitoring on a K3s cluster, we recommend to setting `prometheus.prometheusSpec.resources.memory.limit` to 2500 Mi and `prometheus.prometheusSpec.resources.memory.request` to 1750 Mi.
