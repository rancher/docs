---
title: Viewing Metrics
weight: 2
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/tools/monitoring/viewing-metrics
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/monitoring/viewing-metrics
  - /rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/viewing-metrics
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/viewing-metrics
---

_Available as of v2.2.0_

After you've enabled monitoring at either the [cluster level]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) or [project level]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/tools/monitoring/), you will want to be start viewing the data being collected. There are multiple ways to view this data.

## Rancher Dashboard

>**Note:** This is only available if you've enabled monitoring at the [cluster level]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/). Project specific analytics must be viewed using the project's Grafana instance.

Rancher's dashboards are available at multiple locations:

- **Cluster Dashboard**: From the **Global** view, navigate to the cluster.
- **Node Metrics**: From the **Global** view, navigate to the cluster. Select **Nodes**. Find the individual node and click on its name. Click **Node Metrics.**
- **Workload Metrics**: From the **Global** view, navigate to the project. From the main navigation bar, choose **Resources > Workloads.** (In versions before v2.3.0, choose **Workloads** on the main navigation bar.) Find the individual workload and click on its name. Click **Workload Metrics.**
- **Pod Metrics**: From the **Global** view, navigate to the project. Select **Workloads > Workloads**. Find the individual workload and click on its name. Find the individual pod and click on its name. Click **Pod Metrics.**
- **Container Metrics**: From the **Global** view, navigate to the project. From the main navigation bar, choose **Resources > Workloads.** (In versions before v2.3.0, choose **Workloads** on the main navigation bar.) Find the individual workload and click on its name. Find the individual pod and click on its name. Find the individual container and click on its name. Click **Container Metrics.**

Prometheus metrics are displayed and are denoted with the Grafana icon. If you click on the icon, the metrics will open a new tab in Grafana.

Within each Prometheus metrics widget, there are several ways to customize your view.

- Toggle between two views:
  - **Detail**: Displays graphs and charts that let you view each event in a Prometheus time series
  - **Summary** Displays events in a Prometheus time series that are outside the norm.
- Change the range of the time series that you're viewing to see a more refined or expansive data sample.
- Customize the data sample to display data between specific dates and times.

When analyzing these metrics, don't be concerned about any single standalone metric in the charts and graphs. Rather, you should establish a baseline for your metrics over the course of time, e.g. the range of values that your components usually operate within and are considered normal. After you establish the baseline, be on the lookout for any large deltas in the charts and graphs, as these big changes usually indicate a problem that you need to investigate.

## Grafana

If you've enabled monitoring at either the [cluster level]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/) or [project level]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/tools/monitoring/), Rancher automatically creates a link to Grafana instance. Use this link to view monitoring data.

Grafana allows you to query, visualize, alert, and ultimately, understand your cluster and workload data. For more information on Grafana and its capabilities, visit the [Grafana website](https://grafana.com/grafana).

### Authentication

Rancher determines which users can access the new Grafana instance, as well as the objects they can view within it, by validating them against the user's [cluster or project roles]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/). In other words, a user's access in Grafana mirrors their access in Rancher.

When you go to the Grafana instance, you will be logged in with the username `admin` and the password `admin`. If you log out and log in again, you will be prompted to change your password. You will only have access to the URL of the Grafana instance if you have access to view the corresponding metrics in Rancher. So for example, if your Rancher permissions are scoped to the project level, you won't be able to see the Grafana instance for cluster-level metrics.

### Accessing the Cluster-level Grafana Instance

1. From the **Global** view, navigate to a cluster that has monitoring enabled.

1. Go to the **System** project view. This project is where the cluster-level Grafana instance runs.

1. Click **Apps.** In versions before v2.2.0, choose **Catalog Apps** on the main navigation bar.

1. Go to the `cluster-monitoring` application.

1. In the `cluster-monitoring` application, there are two `/index.html` links: one that leads to a Grafana instance and one that leads to a Prometheus instance. When you click the Grafana link, it will redirect you to a new webpage for Grafana, which shows metrics for the cluster.

1. You will be signed in to the Grafana instance automatically. The default username is `admin` and the default password is `admin`. For security, we recommend that you log out of Grafana, log back in with the `admin` password, and change your password.

**Results:** You are logged into Grafana from the Grafana instance. After logging in, you can view the preset Grafana dashboards, which are imported via the [Grafana provisioning mechanism](http://docs.grafana.org/administration/provisioning/#dashboards), so you cannot modify them directly. For now, if you want to configure your own dashboards, clone the original and modify the new copy.
