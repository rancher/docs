---
title: How Monitoring Works
weight: 1
---

1. [Architecture Overview](#1-architecture-overview)
2. [How Prometheus Works](#2-how-prometheus-works)
3. [How Alertmanager Works](#3-how-alertmanager-works)
4. [Monitoring V2 Specific Components](#4-monitoring-v2-specific-components)
5. [Scraping and Exposing Metrics](#5-scraping-and-exposing-metrics)
6. [Monitoring on RKE2 Clusters](#6-monitoring-on-rke2-clusters)

# 1. Architecture Overview

This diagram shows how data flows through the Monitoring V2 application:

{{% row %}}
{{% column %}}

![How data flows through the monitoring application]({{<baseurl>}}/img/rancher/monitoring-v2-architecture-overview.svg)

{{% /column %}}
{{% column %}}


1. Rules define what Prometheus metrics or time series database queries should result in alerts being fired.
2. ServiceMonitors and PodMonitors declaratively specify how services and pods should be monitored. They use labels to scrape metrics from pods.
3. Prometheus Operator observes ServiceMonitors, PodMonitors and PrometheusRules being created.
4. When the Prometheus configuration resources are created, Prometheus Operator calls the Prometheus API to sync the new configuration.
5. Recording Rules are not directly used for alerting. They create new time series of precomputed queries. These new time series data can then be queried to generate alerts.
6. Prometheus scrapes all targets in the scrape configuration on a recurring schedule based on the scrape interval, storing the results in its time series database.Depending on the Kubernetes master component and Kubernetes distribution, the metrics from a certain Kubernetes component could be directly exposed to Prometheus, proxied through PushProx, or not available. For details, see Scraping and Exposing Metrics.
7. Prometheus evaluates the alerting rules against the time series database. It fires alerts to Alertmanager whenever an alerting rule evaluates to a positive number.
8. Alertmanager uses routes to group, label and filter the fired alerts to translate them into useful notifications.
9. Alertmanager uses the  Receiver configuration to send notifications to Slack, PagerDuty, SMS, or other types of receivers.

{{% /column %}}
{{% /row %}}




# 2. How Prometheus Works

### 2.1. Storing Time Series Data

After collecting metrics from exporters, Prometheus stores the time series in a local on-disk time series database. Prometheus optionally integrates with remote systems, but `rancher-monitoring` uses local storage for the time series database.

The database can then be queried using PromQL, the query language for Prometheus. Grafana dashboards use PromQL queries to generate data visualizations.

### 2.2. Querying the Time Series Database

The PromQL query language is the primary tool to query Prometheus for time series data.

In Grafana, you can right-click a CPU utilization and click Inspect. This opens a panel that shows the [raw query results.](https://grafana.com/docs/grafana/latest/panels/inspect-panel/#inspect-raw-query-results)The raw results demonstrate how each dashboard is powered by PromQL queries.

### 2.3. Defining Rules for when Alerts Should be Fired

Rules define the conditions for Prometheus to fire alerts. When PrometheusRule custom resources are created or updated, the Prometheus Operator observes the change and calls the Prometheus API to synchronize the rule configuration with the Alerting Rules and Recording Rules in Prometheus.

When you define a Rule (which is declared within a RuleGroup in a PrometheusRule resource), the [spec of the Rule itself](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/api.md#rule) contains labels that are used by Alertmanager to figure out which Route should receive this Alert. For example, an Alert with the label `team: front-end` will be sent to all Routes that match on that label.

A PrometheusRule allows you to define one or more RuleGroups. Each RuleGroup consists of a set of Rule objects that can each represent either an alerting or a recording rule with the following fields:

- The name of the new alert or record
- A PromQL expression for the new alert or record
- Labels that should be attached to the alert or record that identify it (e.g. cluster name or severity)
- Annotations that encode any additional important pieces of information that need to be displayed on the notification for an alert (e.g. summary, description, message, runbook URL, etc.). This field is not required for recording rules.

### 2.4. Firing Alerts

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

Alertmanager coordinates where alerts are sent. It allows you to group alerts based on labels and fire them based on whether certain labels are matched. One top-level route accepts all alerts. From there, Alertmanager continues routing alerts to receivers based on whether they match the conditions of the next route.

While the Rancher UI forms only allow editing a routing tree that is two levels deep, you can configure more deeply nested routing structures by editing the Alertmanager custom resource YAML.

### 3.2. Configuring Multiple Receivers

By editing the forms in the Rancher UI, you can set up a Receiver resource with all the information Alertmanager needs to send alerts to your notification system.

By editing custom YAML in the Alertmanager or Receiver configuration, you can also send alerts to multiple notification systems. For more information, see the section on configuring [Receivers.](../configuration/receiver/#configuring-multiple-receivers)

# 4. Monitoring V2 Specific Components

Prometheus Operator introduces a set of [Custom Resource Definitions](https://github.com/prometheus-operator/prometheus-operator#customresourcedefinitions) that allow users to deploy and manage Prometheus and Alertmanager instances by creating and modifying those custom resources on a cluster.

Prometheus Operator will automatically update your Prometheus configuration based on the live state of the resources and configuration options that are edited in the Rancher UI.

### 4.1. Resources Deployed by Default

By default, a set of resources curated by the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) project are deployed onto your cluster as part of installing the Rancher Monitoring Application to set up a basic Monitoring/Alerting stack.

The resources that get deployed onto your cluster to support this solution can be found in the [`rancher-monitoring`](https://github.com/rancher/charts/tree/main/charts/rancher-monitoring) Helm chart, which closely tracks the upstream [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) Helm chart maintained by the Prometheus community with certain changes tracked in the [CHANGELOG.md](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring/CHANGELOG.md).

There are also certain special types of ConfigMaps and Secrets such as those corresponding to Grafana Dashboards, Grafana Datasources, and Alertmanager Configs that will automatically update your Prometheus configuration via sidecar proxies that observe the live state of those resources within your cluster.

### 4.2. PushProx

PushProx enhances the security of the monitoring application, allowing it to be installed on hardened Kubernetes clusters.

To expose Kubernetes metrics, PushProxes use a client proxy model to expose specific ports within default Kubernetes components. Node exporters expose metrics to PushProx through an outbound connection.

The proxy allows `rancher-monitoring` to scrape metrics from processes on the hostNetwork, such as the `kube-api-server`, without opening up node ports to inbound connections.

PushProx is a DaemonSet that listens for clients that seek to register. Once registered, it proxies scrape requests through the established connection. Then the client executes the request to etcd.

All of the default ServiceMonitors, such as `rancher-monitoring-kube-controller-manager`, are configured to hit the metrics endpoint of the client using this proxy.

For more details about how PushProx works, refer to [Scraping Metrics with PushProx.](#5-5-scraping-metrics-with-pushprox)


### 4.3. Default Exporters

`rancher-monitoring` deploys two exporters to expose metrics to prometheus: `node-exporter` and `windows-exporter`. Both are deployed as DaemonSets.

`node-exporter` exports container, pod and node metrics for CPU and memory from each Linux node. `windows-exporter` does the same, but for Windows nodes.

For more information on `node-exporter`, refer to the [upstream documentation.](https://prometheus.io/docs/guides/node-exporter/)

[kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) is also useful because it exports metrics for Kubernetes components.

# 4.4. Components Exposed in the Rancher UI

When the monitoring application is installed, you will be able to edit the following components in the Rancher UI:

| Component | Type of Component | Purpose and Common Use Cases for Editing |
|--------------|------------------------|---------------------------|
| ServiceMonitor | Custom resource | Set up targets to scrape custom metrics from. Automatically updates the scrape configuration in the Prometheus custom resource. |
| PodMonitor | Custom resource | Set up targets to scrape custom metrics from. Automatically updates the scrape configuration in the Prometheus custom resource. |
| Receiver | Configuration block (part of Alertmanager) | Set up a notification system to receive alerts. Automatically updates the Alertmanager custom resource. |
| Route | Configuration block (part of Alertmanager) | Add identifying information to make alerts more meaningful and direct them to individual teams. Automatically updates the Alertmanager custom resource. |
| PrometheusRule | Custom resource | For more advanced use cases, you may want to define what Prometheus metrics or time series database queries should result in alerts being fired.  Automatically updates the Prometheus custom resource. |
| Alertmanager | Custom resource | Edit this custom resource only if you need more advanced configuration options beyond what the Rancher UI exposes in the Routes and Receivers sections. For example, you might want to edit this resource to add a routing tree with more than two levels. |
| Prometheus | Custom resource | Edit this custom resource only if you need more advanced configuration beyond what can be configured using  ServiceMonitors, PodMonitors, or [Rancher monitoring Helm chart options.](../configuration/helm-chart-options) |

# 5. Scraping and Exposing Metrics

### 5.1. Defining what Metrics are Scraped

ServiceMonitors define targets that are intended for Prometheus to scrape. The [Prometheus custom resource tells](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md#prometheus) Prometheus which ServiceMonitors it should use to find out where to scrape metrics from.

The Prometheus Operator observes the ServiceMonitors. When it observes that ServiceMonitors are created or updated, it calls the Prometheus API to update the scrape configuration in the Prometheus custom resource and keep it in sync with the scrape configuration in the ServiceMonitors. This scrape configuration tells Prometheus which endpoints to scrape metrics from and how it will label the metrics from those endpoints.

Prometheus scrapes all of the metrics defined in its scrape configuration at every `scrape_interval`, which is one minute by default.

The scrape configuration can be viewed as part of the Prometheus custom resource that is exposed in the Rancher UI.

### 5.2. How the Prometheus Operator Sets up Metrics Scraping

The Prometheus Deployment or StatefulSet scrapes metrics, and the configuration of Prometheus is controlled by the Prometheus custom resources. The Prometheus Operator watches for Prometheus and Alertmanager resources, and when they are created, the Prometheus Operator creates a Deployment or StatefulSet for Prometheus or Alertmanager with the user-defined configuration.

<figcaption>How the Prometheus Operator Sets up Metrics Scraping</figcaption>

![How the Prometheus Operator sets up metrics scraping]({{<baseurl>}}/img/rancher/set-up-scraping.svg)

When the Prometheus Operator observes ServiceMonitors, PodMonitors and PrometheusRules being created, it knows that the scrape configuration needs to be updated in Prometheus. It updates Prometheus by first updating the configuration and rules files in the volumes of Prometheus's Deployment or StatefulSet. Then it calls the Prometheus API to sync the new configuration, resulting in the Prometheus Deployment or StatefulSet to be modified in place.

![How the Prometheus Operator Updates Scrape Configuration]({{<baseurl>}}/img/rancher/update-scrape-config.svg)

### 5.3. How Kubernetes Component Metrics are Exposed

Prometheus scrapes metrics from deployments known as [exporters,](https://prometheus.io/docs/instrumenting/exporters/) which export the time series data in a format that Prometheus can ingest. In Prometheus, time series consist of streams of timestamped values belonging to the same metric and the same set of labeled dimensions.

To allow monitoring to be installed on hardened Kubernetes clusters, `rancher-monitoring` application proxies the communication between Prometheus and the exporter through PushProx for some Kubernetes master components.

### 5.4. Scraping Metrics without PushProx

The Kubernetes components that directly expose metrics to Prometheus are the following:

- kubelet
- ingress-nginx*
- coreDns/kubeDns
- kube-api-server

\* For RKE and RKE2 clusters, ingress-nginx is deployed by default and treated as an internal Kubernetes component.

### 5.5. Scraping Metrics with PushProx

The purpose of this architecture is to allow us to scrape internal Kubernetes components without exposing those ports to inbound requests. As a result, Prometheus can scrape metrics across a network boundary.

The Kubernetes components that expose metrics to Prometheus through PushProx are the following:

- kube-controller-manager
- kube-scheduler
- etcd
- kube-proxy

For each PushProx exporter, we deploy one PushProx client onto all target nodes. For example, a PushProx client is deployed onto all controlplane nodes for kube-controller-manager, all etcd nodes for kube-etcd, and all nodes for kubelet. We deploy exactly one PushProx proxy per exporter.

The process for exporting metrics is as follows:

1. The PushProx Client establishes an outbound connection with the PushProx Proxy.
2. The client then polls the proxy for scrape requests that have come into the proxy.
3. When the proxy receives a scrape request from Prometheus, the client sees it as a result of the poll.
4. The client scrapes the internal component.
5. The internal component responds by pushing metrics back to the proxy.

<figcaption>Process for Exporting Metrics with PushProx</figcaption>

![Process for Exporting Metrics with PushProx]({{<baseurl>}}/img/rancher/pushprox-process.svg)

Metrics are scraped differently based on the Kubernetes distribution. For help with terminology, see Terminology(#terminology). For details, see the table below:

<figcaption>How Metrics are Exposed to Prometheus</figcaption>

| Kubernetes Component | RKE | RKE2 | KubeADM | K3s |
|-----|-----|-----|-----|-----|
| kube-controller-manager	| rkeControllerManager.enabled	|rke2ControllerManager.enabled |	kubeAdmControllerManager.enabled |	k3sServer.enabled |
| kube-scheduler	| rkeScheduler.enabled |	rke2Scheduler.enabled	|kubeAdmScheduler.enabled	| k3sServer.enabled |
| etcd	| rkeEtcd.enabled	| rke2Etcd.enabled	| kubeAdmEtcd.enabled |	Not available |
| kube-proxy	| rkeProxy.enabled	| rke2Proxy.enabled	| kubeAdmProxy.enabled |	k3sServer.enabled |
| kubelet	| Collects metrics directly exposed by kubelet	| Collects metrics directly exposed by kubelet	| Collects metrics directly exposed by kubelet	| Collects metrics directly exposed by kubelet |
| ingress-nginx*	| Collects metrics directly exposed by kubelet, exposed by rkeIngressNginx.enabled	| Collects metrics directly exposed by kubelet, Exposed by rke2IngressNginx.enabled	| Not available	| Not available |
| coreDns/kubeDns	| Collects metrics directly exposed by coreDns/kubeDns	| Collects metrics directly exposed by coreDns/kubeDns	| Collects metrics directly exposed by coreDns/kubeDns	| Collects metrics directly exposed by coreDns/kubeDns |
| kube-api-server	| Collects metrics directly exposed by kube-api-server	|Collects metrics directly exposed by kube-api-server	| Collects metrics directly exposed by kube-appi-server	| Collects metrics directly exposed by kube-api-server |

\* For RKE and RKE2 clusters, ingress-nginx is deployed by default and treated as an internal Kubernetes component.

### 5.6. Terminology

- **kube-scheduler:** The internal Kubernetes component that uses information in the pod spec to decide on which node to run a pod.
- **kube-controller-manager:** The internal Kubernetes component that is responsible for node management (detecting if a node fails), pod replication and endpoint creation.
- **etcd:** The internal Kubernetes component that is the distributed key/value store which Kubernetes uses for persistent storage of all cluster information.
- **kube-proxy:** The internal Kubernetes component that watches the API server for pods/services changes in order to maintain the network up to date.
- **kubelet:** The internal Kubernetes component that watches the API server for pods on a node and makes sure they are running.
- **ingress-nginx:** An Ingress controller for Kubernetes using NGINX as a reverse proxy and load balancer.
- **coreDns/kubeDns:** The internal Kubernetes component responsible for DNS.
- **kube-api-server:** The main internal Kubernetes component that is responsible for exposing APIs for the other master components.

# 6. Monitoring on RKE2 Clusters

Rancher v2.6 introduced the ability to provision new Kubernetes clusters with [RKE2,](https://docs.rke2.io/) which is Rancher's fully conformant Kubernetes distribution that focuses on security and compliance within the U.S. Federal Government sector. To allow Monitoring V2 to be installed on RKE2 Kubernetes clusters, the `rkeIngressNginx` and `rke2IngressNginx` sub-charts were introduced to scrape metrics from the `ingress-nginx` Deployment/DaemonSet in RKE and RKE2 clusters respectively.

The PushProx pod needs to run on the same nodes as the `ingress-nginx` pod.

When the RKE2 cluster's Kubernetes version is <= 1.20,  the workload type of `ingress-nginx` is a Deployment. The `pushprox-ingress-nginx-client` is deployed as a Deployment, and the Rancher UI sets the Helm chart value `rke2IngressNginx.deployment.enabled=true`.

For Kubernetes >= 1.21, the workload type of `ingress-nginx` is a DaemonSet. The `pushprox-ingress-nginx-client` is deployed as a DaemonSet, which is the default behavior.