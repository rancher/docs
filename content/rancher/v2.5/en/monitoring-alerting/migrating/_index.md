---
title: Migrating to Rancher v2.5 Monitoring
weight: 5
aliases:
  - /rancher/v2.5/en/monitoring-alerting/v2.5/migrating
---

If you previously enabled Monitoring, Alerting, or Notifiers in Rancher before v2.5, there is no automatic upgrade path for switching to the new monitoring/alerting solution. Before deploying the new monitoring solution via Cluster Explore, you will need to disable and remove all existing custom alerts, notifiers and monitoring installations for the whole cluster and in all projects.

### Monitoring Before Rancher v2.5

As of v2.2.0, Rancher's Cluster Manager allowed users to enable Monitoring & Alerting V1 (both powered by [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)) independently within a cluster. 

When Monitoring is enabled, Monitoring V1 deploys [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/docs/grafana/latest/getting-started/what-is-grafana/) onto a cluster to monitor the state of processes of your cluster nodes, Kubernetes components, and software deployments and create custom dashboards to make it easy to visualize collected metrics.

Monitoring V1 could be configured on both a cluster-level and on a project-level and would automatically scrape certain workloads deployed as Apps on the Rancher cluster.

When Alerts or Notifiers are enabled, Alerting V1 deploys [Prometheus Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/) and a set of Rancher controllers onto a cluster that allows users to define alerts and configure alert-based notifications via Email, Slack, PagerDuty, etc. Users can choose to create different types of alerts depending on what needs to be monitored (e.g. System Services, Resources, CIS Scans, etc.); however, PromQL Expression-based alerts can only be created if Monitoring V1 is enabled.

### Monitoring/Alerting via Cluster Explorer in Rancher 2.5

As of v2.5.0, Rancher's Cluster Explorer now allows users to enable Monitoring & Alerting V2 (both powered by [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)) together within a cluster. 

Unlike in Monitoring & Alerting V1, both features are packaged in a single Helm chart found [here](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring). The behavior of this chart and configurable fields closely matches [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack), a Prometheus Community Helm chart, and any deviations from the upstream chart can be found in the [CHANGELOG.md](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring/CHANGELOG.md) maintained with the chart.

Monitoring V2 can only be configured on the cluster level. Project-level monitoring and alerting is no longer supported.

For more information on how to configure Monitoring & Alerting V2, see [this page.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/configuration)

### Changes to Role-based Access Control

Project owners and members no longer get access to Grafana or Prometheus by default. If view-only users had access to Grafana, they would be able to see data from any namespace. For Kiali, any user can edit things they don’t own in any namespace.

For more information about role-based access control in `rancher-monitoring`, refer to [this page.](../rbac)

### Migrating from Monitoring V1 to Monitoring V2

While there is no automatic migration available, it is possible to manually migrate custom Grafana dashboards and alerts that were created in Monitoring V1 to Monitoring V2.

Before you can install Monitoring V2, Monitoring V1 needs to be uninstalled completely. In order to uninstall Monitoring V1:

* Remove all cluster and project specific alerts and alerts groups
* Remove all notifiers
* Disable all project monitoring installations under Cluster -> Project -> Tools -> Monitoring
* Ensure that all project-monitoring apps in all projects have been removed and are not recreated after a few minutes
* Disable the cluster monitoring installation under Cluster -> Tools -> Monitoring
* Ensure that the cluster-monitoring app and the monitoring-operator app in the System project have been removed and are not recreated after a few minutes

#### Migrating Grafana Dashboards

You can migrate any dashboard added to Grafana in Monitoring V1 to Monitoring V2. In Monitoring V1 you can export an existing dashboard like this:

* Sign into Grafana
* Navigate to the dashboard you want to export
* Go to the dashboard settings
* Copy the [JSON Model](https://grafana.com/docs/grafana/latest/dashboards/json-model/)

In the JSON Model, change all `datasource` fields from `RANCHER_MONITORING` to `Prometheus`. You can easily do this by replacing all occurrences of `"datasource": "RANCHER_MONITORING"` with `"datasource": "Prometheus"`.

If Grafana is backed by a persistent volume, you can now [import](https://grafana.com/docs/grafana/latest/dashboards/export-import/) this JSON Model into the Monitoring V2 Grafana UI.
It is recommended to provide the dashboard to Grafana with a ConfigMap in the `cattle-dashboards` namespace that has the label `grafana_dashboard: "1"`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: custom-dashboard
  namespace: cattle-dashboards
  labels:
    grafana_dashboard: "1"
data:
  custom-dashboard.json: |
    { 
      ... 
    }
```

Once this ConfigMap is created, the dashboard will automatically be added to Grafana.

#### Migrating Alerts

It is only possible to directly migrate expression-based alerts to Monitoring V2. Fortunately, the event-based alerts that could be set up to alert on system component, node or workload events, are already covered out-of-the-box by the alerts that are part of Monitoring V2. So it is not necessary to migrate them.

To migrate the following expression alert

{{< img "/img/rancher/monitoring/migration/alert_2.4_to_2.5_source.png" "">}}

you have to either create a PrometheusRule configuration like this in any namespace

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: custom-rules
  namespace: default
spec:
  groups:
    - name: custom.rules
      rules:
        - alert: Custom Expression Alert
          expr: prometheus_query > 5
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "The result of prometheus_query has been larger than 5 for 5m. Current value {{ $value }}"
```

or add the Prometheus Rule through the Cluster Explorer

{{< img "/img/rancher/monitoring/migration/alert_2.4_to_2.5_target.png" "">}}

For more details on how to configure PrometheusRules in Monitoring V2 see [Monitoring Configuration]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/configuration#prometheusrules).

#### Migrating notifiers

There is no direct equivalent for how notifiers work in Monitoring V1. Instead you have to replicate the desired setup with [Routes and Receivers]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/configuration#alertmanager-config) in Monitoring V2.
