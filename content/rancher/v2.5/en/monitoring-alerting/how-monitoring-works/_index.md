---
title: How Monitoring Works
weight: 1
---

- [1. How Data Flows through the Monitoring Application](#1-how-data-flows-through-the-monitoring-application)
- [2. How Prometheus Works](#2-how-prometheus-works)
  - [2.1. Defining what Metrics are Scraped](#2-1-defining-what-metrics-are-scraped)
  - [2.2. Scraping Metrics from Exporters](#2-2-scraping-metrics-from-exporters)
  - [2.3. Storing Time Series Data](#2-3-storing-time-series-data)
  - [2.4. Querying the Time Series Database](#2-4-querying-the-time-series-database)
  - [2.5. Defining Rules for when Alerts Should be Fired](#2-5-defining-rules-for-when-alerts-should-be)
  - [2.6. Firing Alerts](#2-6-firing-alerts)
- [3. How Alertmanager Works](#3-how-alertmanager-works)
  - [3.1. Routing Alerts to Receivers](#3-1-routing-alerts-to-receivers)
  - [3.2. Configuring Multiple Receivers](#3-2-configuring-multiple-receivers)
- [4. How the Monitoring Application Works](#4-how-the-monitoring-application-works)
  - [4.1. Resources Deployed by Default](#4-1-resources-deployed-by-default)
  - [4.2. PushProx](#4-2-pushprox)
  - [4.3. Default Exporters](#4-3-default-exporters)
- [5. Components Exposed in the Rancher UI](#5-components-exposed-in-the-rancher-ui)

# 1. How Data Flows through the Monitoring Application

The below diagram shows the linear flow of data through the monitoring application in chronological order:


![Data Flow Through Monitoring Components]({{<baseurl>}}/img/rancher/monitoring-components.svg)

# 2. How Prometheus Works

### 2.1. Defining what Metrics are Scraped

ServiceMonitors define targets that are intended for Prometheus to scrape.

The [Prometheus custom resource tells](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md#prometheus) Prometheus which ServiceMonitors it should use to find out where to scrape metrics from.

The Prometheus Operator observes the ServiceMonitors, continuously using them to auto-generate the scrape configuration in the Prometheus custom resource and keeping it in sync. This scrape configuration tells Prometheus which endpoints to scrape metrics from and how it will label the metrics from those endpoints.

Prometheus scrapes all of the metrics defined in its scrape configuration at every `scrape_interval`, which is one minute by default.

The scrape configuration can be viewed as part of the Prometheus custom resource that is exposed in the Rancher UI.

### 2.2. Scraping Metrics from Exporters

Prometheus scrapes metrics from deployments known as [exporters,](https://prometheus.io/docs/instrumenting/exporters/) which export the time series data in a format that Prometheus can ingest. 

In Prometheus, time series consist of streams of timestamped values belonging to the same metric and the same set of labeled dimensions.

To allow monitoring to be installed on hardened Kubernetes clusters, `rancher-monitoring` application proxies the communication between Prometheus and the exporter through PushProx. For more information about PushProx, see [this section.](#pushprox)


### 2.3. Storing Time Series Data

After collecting metrics from exporters, Prometheus stores the time series in a local on-disk time series database. Prometheus optionally integrates with remote systems, but `rancher-monitoring` uses local storage for the time series database.

The database can then be queried using PromQL, the query language for Prometheus. Grafana dashboards use PromQL queries to generate data visualizations.

### 2.4. Querying the Time Series Database

The PromQL query language is the primary tool to query Prometheus for time series data.

In Grafana, you can right-click a CPU utilization and click Inspect. This opens a panel that shows the [raw query results.](https://grafana.com/docs/grafana/latest/panels/inspect-panel/#inspect-raw-query-results)The raw results demonstrate how each dashboard is powered by PromQL queries.

### 2.5. Defining Rules for when Alerts Should be Fired

Rules define the conditions for Prometheus to fire alerts.

When you define a Rule (which is declared within a RuleGroup in a PrometheusRule resource), the [spec of the Rule itself](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#rule) contains labels that are used by Alertmanager to figure out which Route should receive this Alert.

For example, an Alert with the label `team: front-end` will be sent to all Routes that match on that label.

Prometheus rule files are held in PrometheusRule custom resources. A PrometheusRule allows you to define one or more RuleGroups. Each RuleGroup consists of a set of Rule objects that can each represent either an alerting or a recording rule with the following fields:

- The name of the new alert or record
- A PromQL expression for the new alert or record
- Labels that should be attached to the alert or record that identify it (e.g. cluster name or severity)
- Annotations that encode any additional important pieces of information that need to be displayed on the notification for an alert (e.g. summary, description, message, runbook URL, etc.). This field is not required for recording rules.

### 2.6. Firing Alerts

Prometheus doesn't maintain the state of whether alerts are active. It fires alerts repetitively at every evaluation interval, relying on Alertmanager to group and filter the alerts into meaningful notifications.

The `evaluation_interval` constant defines how often Prometheus evaluates its alerting rules against the time series database. Similar to the `scrape_interval`, the `evaluation_interval` also defaults to one minute.

The rules are contained in a set of rule files. Rule files include both alerting rules and recording rules, but only alerting rules result in alerts being fired after their evaluation.

For recording rules, Prometheus runs a query, then stores it as a time series. This synthetic time series is useful for storing the results of an expensive or time-consuming query so that it can be queried more quickly in the future.

Alerting rules are more commonly used. Whenever an alerting rule evaluates to a positive number, Prometheus fires an alert.

The Rule file adds labels and annotations to alerts before firing them, depending on the use case:

- Labels indicate information that identifies the alert and could affect the routing of the alert. For example, if when sending an alert about a certain container, the container ID could be used as a label.
- Annotations denote information that doesn't affect where an alert is routed, for example, a runbook or an error message.

# 3. How Alertmanager Works

The Alertmanager handles alerts sent by client applications such as the Prometheus server. It takes care of the following tasks:

- Deduplicating, grouping, and routing alerts to the correct receiver integration such as email, PagerDuty, or OpsGenie
- Silencing and inhibition of alerts
- Tracking alerts that fire over time
- Sending out the status of whether an alert is currently firing, or if it is resolved
    
### 3.1. Routing Alerts to Receivers

Alertmanager coordinates where alerts are sent. It allows you to group alerts based on labels and fire them based on whether certain labels are matched. One top-level route accepts all alerts. 

From there, Alertmanager continues routing alerts to receivers based on whether they match the conditions of the next route.

While the Rancher UI forms only allow editing a routing tree that is two levels deep, you can configure more deeply nested routing structures by editing the Alertmanager custom resource YAML.

### 3.2. Configuring Multiple Receivers

By editing the forms in the Rancher UI, you can set up a Receiver resource with all the information Alertmanager needs to send alerts to your notification system.

By editing custom YAML in the Alertmanager or Receiver configuration, you can also send alerts to multiple notification systems. For more information, see the section on configuring [Receivers.](./configuration/receiver/#configuring-multiple-receivers)

# 4. How the Monitoring Application Works

Prometheus Operator introduces a set of [Custom Resource Definitions](https://github.com/prometheus-operator/prometheus-operator#customresourcedefinitions) that allow users to deploy and manage Prometheus and Alertmanager instances by creating and modifying those custom resources on a cluster.

Prometheus Operator will automatically update your Prometheus configuration based on the live state of the resources and configuration options that are edited in the Rancher UI.

### 4.1. Resources Deployed by Default

By default, a set of resources curated by the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) project are deployed onto your cluster as part of installing the Rancher Monitoring Application to set up a basic Monitoring/Alerting stack.

The resources that get deployed onto your cluster to support this solution can be found in the [`rancher-monitoring`](https://github.com/rancher/charts/tree/main/charts/rancher-monitoring) Helm chart, which closely tracks the upstream [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) Helm chart maintained by the Prometheus community with certain changes tracked in the [CHANGELOG.md](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring/CHANGELOG.md).

There are also certain special types of ConfigMaps and Secrets such as those corresponding to Grafana Dashboards, Grafana Datasources, and Alertmanager Configs that will automatically update your Prometheus configuration via sidecar proxies that observe the live state of those resources within your cluster.

### 4.2. PushProx

PushProx enhances the security of the monitoring application, allowing it to be installed on hardened Kubernetes clusters.

To expose Kubernetes metrics, PushProxes use a client proxy model to expose specific ports within default Kubernetes components. Node exporters  expose metrics to PushProx through an outbound connection.

The proxy allows `rancher-monitoring` to scrape metrics from processes on the hostNetwork, such as the `kube-api-server`, without opening up node ports to inbound connections.

PushProx is a DaemonSet that listens for clients that seek to register. Once registered, it proxies scrape requests through the established connection. Then the client executes the request to etcd.

All of the default ServiceMonitors, such as `rancher-monitoring-kube-controller-manager`, are configured to hit the metrics endpoint of the client using this proxy.

### 4.3. Default Exporters

`rancher-monitoring` deploys two exporters to expose metrics to prometheus: `node-exporter` and `windows-exporter`. Both are deployed as DaemonSets.

`node-exporter` exports container, pod and node metrics for CPU and memory from each Linux node. `windows-exporter` does the same, but for Windows nodes.

For more information on `node-exporter`, refer to the [upstream documentation.](https://prometheus.io/docs/guides/node-exporter/)

[kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) is also useful because it exports metrics for Kubernetes components.

# 5. Components Exposed in the Rancher UI

When the monitoring application is installed, you will be able to edit the following components in the Rancher UI:

| Component | Type of Component | Purpose and Common Use Cases for Editing |
|--------------|------------------------|---------------------------|
| ServiceMonitor | Custom resource | Set up targets to scrape custom metrics from. Automatically updates the scrape configuration in the Prometheus custom resource. |
| PodMonitor | Custom resource | Set up targets to scrape custom metrics from. Automatically updates the scrape configuration in the Prometheus custom resource. |
| Receiver | Configuration block (part of Alertmanager) | Set up a notification system to receive alerts. Automatically updates the Alertmanager custom resource. |
| Route | Configuration block (part of Alertmanager) | Add identifying information to make alerts more meaningful and direct them to individual teams. Automatically updates the Alertmanager custom resource. |
| PrometheusRule | Custom resource | For more advanced use cases, you may want to define what Prometheus metrics or time series database queries should result in alerts being fired.  Automatically updates the Prometheus custom resource. |
| Alertmanager | Custom resource | Edit this custom resource only if you need more advanced configuration options beyond what the Rancher UI exposes in the Routes and Receivers sections. For example, you might want to edit this resource to add a routing tree with more than two levels. |
| Prometheus | Custom resource | Edit this custom resource only if you need more advanced configuration beyond what can be configured using  ServiceMonitors, PodMonitors, or [Rancher monitoring Helm chart options.](./configuration/helm-chart-options) |