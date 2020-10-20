---
title: Migrating to Rancher v2.5 Monitoring
weight: 5
aliases:
  - /rancher/v2.x/en/monitoring-alerting/migrating
---

If you previously enabled Monitoring, Alerting, or Notifiers in Rancher prior to v2.5, there is no upgrade path for switching to the new monitoring/alerting solution. You will need to disable monitoring/alerting/notifiers in the same way it was disabled in Rancher v2.4 before deploying the new monitoring solution via Cluster Explorer. 

### Monitoring Prior to Rancher v2.5

As of v2.2.0, Rancher's Cluster Manager allowed users to enable Monitoring & Alerting V1 (both powered by [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)) independently within a cluster. For more information on how to configure Monitoring & Alerting V1, see the [docs about monitoring prior to Rancher v2.5](/rancher/v2.x/en/monitoring-alerting/v2.0.x-v2.4.x).

When Monitoring is enabled, Monitoring V1 deploys [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/docs/grafana/latest/getting-started/what-is-grafana/) onto a cluster to monitor the state of processes of your cluster nodes, Kubernetes components, and software deployments and create custom dashboards to make it easy to visualize collected metrics.

Monitoring V1 could be configured on both a cluster-level and on a project-level and would automatically scrape certain workloads deployed as Apps on the Rancher cluster.

When Alerts or Notifiers are enabled, Alerting V1 deploys [Prometheus Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) and a set of Rancher controllers onto a cluster that allows users to define alerts and configure alert-based notifications via Email, Slack, PagerDuty, etc. Users can choose to create different types of alerts depending on what needs to be monitored (e.g. System Services, Resources, CIS Scans, etc.); however, PromQL Expression-based alerts can only be created if Monitoring V1 is enabled.

### Monitoring/Alerting via Cluster Explorer in Rancher 2.5

As of v2.5.0, Rancher's Cluster Explorer now allows users to enable Monitoring & Alerting V2 (both powered by [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)) together within a cluster. 

Unlike in Monitoring & Alerting V1, both features are packaged in a single Helm chart found [here](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring). The behavior of this chart and configurable fields closely matches [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack), a Prometheus Community Helm chart, and any deviations from the upstream chart can be found in the [CHANGELOG.md](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring/CHANGELOG.md) maintained with the chart.

Monitoring V2 can only be configured on the cluster level. Project-level monitoring and alerting is no longer supported.

For more information on how to configure Monitoring & Alerting V2, see the [docs for monitoring in Rancher v2.5](../).

### Changes to Role-based Access Control

Project owners and members no longer get access to Grafana or Prometheus by default. If view-only users had access to Grafana, they would be able to see data from any namespace. For Kiali, any user can edit things they don’t own in any namespace.

For more information about role-based access control in `rancher-monitoring`, refer to [this page.](../rbac)
