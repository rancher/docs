---
title: Built-in Dashboards
weight: 3
---

- [Grafana UI](#grafana-ui)
- [Alertmanager UI](#alertmanager-ui)
- [Prometheus UI](#prometheus-ui)

# Grafana UI

[Grafana](https://grafana.com/grafana/) allows you to query, visualize, alert on and understand your metrics no matter where they are stored. Create, explore, and share dashboards with your team and foster a data driven culture.

To see the default dashboards for time series data visualization, go to the Grafana UI. In the left navigation bar, click the icon with four boxes and click **Manage.**

### Customizing Grafana

To view and customize the PromQL queries powering the Grafana dashboard, see [this page.](./customize-grafana)

### Persistent Grafana Dashboards

To create a persistent Grafana dashboard, see [this page.](./persist-grafana)

### Access to Grafana

For information about role-based access control for Grafana, see [this section.](./rbac/#role-based-access-control-for-grafana)


# Alertmanager UI

When `rancher-monitoring` is installed, the Prometheus Alertmanager UI is deployed, allowing you to view your alerts and the current Alertmanager configuration.

> This section assumes familiarity with how monitoring components work together. For more information about Alertmanager, see [this section.](../how-monitoring-works/#how-alertmanager-works)


### Accessing the Alertmanager UI

> **Prerequisite:** The `rancher-monitoring` application must be installed.

To see the Alertmanager UI, go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Alertmanager.**

**Result:** The Alertmanager UI opens in a new tab. For help with configuration, refer to the [official Alertmanager documentation.](https://prometheus.io/docs/alerting/latest/alertmanager/)

For more information on configuring Alertmanager in Rancher, see [this page.](./configuration/alertmanager)

<figcaption>The Alertmanager UI</figcaption>
![Alertmanager UI]({{<baseurl>}}/img/rancher/alertmanager-ui.png)


### Viewing Default Alerts

To see the default alerts, go to the [Alertmanager UI](./alertmanager-ui) and click **Expand all groups.**


# Prometheus UI

To see the Prometheus UI, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Graph.**

<figcaption>Prometheus Graph UI</figcaption>
![Prometheus Graph UI]({{<baseurl>}}/img/rancher/prometheus-graph-ui.png)

### Viewing the Prometheus Targets

To see what services you are monitoring, you will need to see your targets. 

To see the Prometheus Targets, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Targets.**

<figcaption>Targets in the Prometheus UI</figcaption>
![Prometheus Targets UI]({{<baseurl>}}/img/rancher/prometheus-targets-ui.png)

### Viewing the PrometheusRules

To see the PrometheusRules, install `rancher-monitoring`. Then go to the **Cluster Explorer.** In the top left corner, click **Cluster Explorer > Monitoring.** Then click **Prometheus Rules.**

<figcaption>Rules in the Prometheus UI</figcaption>
![PrometheusRules UI]({{<baseurl>}}/img/rancher/prometheus-rules-ui.png)

For more information on PrometheusRules in Rancher, see [this page.](./configuration/prometheusrules)