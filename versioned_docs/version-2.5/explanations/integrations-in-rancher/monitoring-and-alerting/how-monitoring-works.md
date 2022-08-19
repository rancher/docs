---
title: How Monitoring Works
weight: 1
---

1. [Architecture Overview](#1-architecture-overview)
2. [How Prometheus Works](#2-how-prometheus-works)
3. [How Alertmanager Works](#3-how-alertmanager-works)
4. [Monitoring V2 Specific Components](#4-monitoring-v2-specific-components)
5. [Scraping and Exposing Metrics](#5-scraping-and-exposing-metrics)

# 1. Architecture Overview

_**The following sections describe how data flows through the Monitoring V2 application:**_

### Prometheus Operator

Prometheus Operator observes ServiceMonitors, PodMonitors, and PrometheusRules being created. When the Prometheus configuration resources are created, Prometheus Operator calls the Prometheus API to sync the new configuration. As the diagram at the end of this section shows, the Prometheus Operator acts as the intermediary between Prometheus and Kubernetes, calling the Prometheus API to synchronize Prometheus with the monitoring-related resources in Kubernetes.

### ServiceMonitors and PodMonitors

ServiceMonitors and PodMonitors declaratively specify targets, such as Services and Pods, that need to be monitored.

- Targets are scraped on a recurring schedule based on the configured Prometheus scrape interval, and the metrics that are scraped are stored into the Prometheus Time Series Database (TSDB).

- In order to perform the scrape, ServiceMonitors and PodMonitors are defined with label selectors that determine which Services or Pods should be scraped and endpoints that determine how the scrape should happen on the given target, e.g., scrape/metrics in TCP 10252, proxying through IP addr x.x.x.x.

- Out of the box, Monitoring V2 comes with certain pre-configured exporters that are deployed based on the type of Kubernetes cluster that it is deployed on. For more information, see [Scraping and Exposing Metrics](#5-scraping-and-exposing-metrics).

### How PushProx Works

- Certain internal Kubernetes components are scraped via a proxy deployed as part of Monitoring V2 called **PushProx**. The Kubernetes components that expose metrics to Prometheus through PushProx are the following:
`kube-controller-manager`, `kube-scheduler`, `etcd`, and `kube-proxy`.

- For each PushProx exporter, we deploy one PushProx client onto all target nodes. For example, a PushProx client is deployed onto all controlplane nodes for kube-controller-manager, all etcd nodes for kube-etcd, and all nodes for kubelet.

- We deploy exactly one PushProx proxy per exporter. The process for exporting metrics is as follows:

1. The PushProx Client establishes an outbound connection with the PushProx Proxy.
1. The client then polls the proxy for scrape requests that have come into the proxy.
1. When the proxy receives a scrape request from Prometheus, the client sees it as a result of the poll.
1. The client scrapes the internal component.
1. The internal component responds by pushing metrics back to the proxy.


<figcaption><br/>Process for Exporting Metrics with PushProx:<br/></figcaption>

![Process for Exporting Metrics with PushProx](/img/pushprox-process.svg)

### PrometheusRules

PrometheusRules allow users to define rules for what metrics or time series database queries should result in alerts being fired. Rules are evaluated on an interval.

- **Recording rules** create a new time series based on existing series that have been collected. They are frequently used to precompute complex queries.
- **Alerting rules** run a particular query and fire an alert from Prometheus if the query evaluates to a non-zero value.

### Alert Routing

Once Prometheus determines that an alert needs to be fired, alerts are forwarded to **Alertmanager**.

- Alerts contain labels that come from the PromQL query itself and additional labels and annotations that can be provided as part of specifying the initial PrometheusRule.

- Before receiving any alerts, Alertmanager will use the **routes** and **receivers** specified in its configuration to form a routing tree on which all incoming alerts are evaluated. Each node of the routing tree can specify additional grouping, labeling, and filtering that needs to happen based on the labels attached to the Prometheus alert. A node on the routing tree (usually a leaf node) can also specify that an alert that reaches it needs to be sent out to a configured Receiver, e.g., Slack, PagerDuty, SMS, etc. Note that Alertmanager will send an alert first to **alertingDriver**, then alertingDriver will send or forward alert to the proper destination.

- Routes and receivers are also stored in the Kubernetes API via the Alertmanager Secret. When the Secret is updated, Alertmanager is also updated automatically. Note that routing occurs via labels only (not via annotations, etc.).

<figcaption>How data flows through the monitoring application:</figcaption>


# 2. How Prometheus Works

### Storing Time Series Data

After collecting metrics from exporters, Prometheus stores the time series in a local on-disk time series database. Prometheus optionally integrates with remote systems, but `rancher-monitoring` uses local storage for the time series database.

Once stored, users can query this TSDB using PromQL, the query language for Prometheus.

PromQL queries can be visualized in one of two ways:

1. By supplying the query in Prometheus's Graph UI, which will show a simple graphical view of the data.
1. By creating a Grafana Dashboard that contains the PromQL query and additional formatting directives that label axes, add units, change colors, use alternative visualizations, etc.

### Defining Rules for Prometheus

Rules define queries that Prometheus needs to execute on a regular `evaluationInterval` to perform certain actions, such as firing an alert (alerting rules) or precomputing a query based on others existing in its TSDB (recording rules). These rules are encoded in PrometheusRules custom resources. When PrometheusRule custom resources are created or updated, the Prometheus Operator observes the change and calls the Prometheus API to synchronize the set of rules that Prometheus is currently evaluating on a regular interval.

A PrometheusRule allows you to define one or more RuleGroups. Each RuleGroup consists of a set of Rule objects that can each represent either an alerting or a recording rule with the following fields:

- The name of the new alert or record
- A PromQL expression for the new alert or record
- Labels that should be attached to the alert or record that identify it (e.g. cluster name or severity)
- Annotations that encode any additional important pieces of information that need to be displayed on the notification for an alert (e.g. summary, description, message, runbook URL, etc.). This field is not required for recording rules.

On evaluating a [rule](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/api.md#rule), Prometheus will execute the provided PromQL query, add additional provided labels (or annotations - only for alerting rules), and execute the appropriate action for the rule. For example, an Alerting Rule that adds `team: front-end` as a label to the provided PromQL query will append that label to the fired alert, which will allow Alertmanager to forward the alert to the correct Receiver.

### Alerting and Recording Rules

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

### Alerts Forwarded by alertingDrivers

When alertingDrivers are installed, this creates a `Service` that can be used as the receiver's URL for Teams or SMS, based on the alertingDriver's configuration. The URL in the Receiver points to the alertingDrivers; so the Alertmanager sends alert first to alertingDriver, then alertingDriver forwards or sends alert to the proper destination.

### Routing Alerts to Receivers

Alertmanager coordinates where alerts are sent. It allows you to group alerts based on labels and fire them based on whether certain labels are matched. One top-level route accepts all alerts. From there, Alertmanager continues routing alerts to receivers based on whether they match the conditions of the next route.

While the Rancher UI forms only allow editing a routing tree that is two levels deep, you can configure more deeply nested routing structures by editing the Alertmanager Secret.

### Configuring Multiple Receivers

By editing the forms in the Rancher UI, you can set up a Receiver resource with all the information Alertmanager needs to send alerts to your notification system.

By editing custom YAML in the Alertmanager or Receiver configuration, you can also send alerts to multiple notification systems. For more information, see the section on configuring [Receivers.](../../../reference-guides/monitoring-v2-configuration/receivers.md#configuring-multiple-receivers)

# 4. Monitoring V2 Specific Components

Prometheus Operator introduces a set of [Custom Resource Definitions](https://github.com/prometheus-operator/prometheus-operator#customresourcedefinitions) that allow users to deploy and manage Prometheus and Alertmanager instances by creating and modifying those custom resources on a cluster.

Prometheus Operator will automatically update your Prometheus configuration based on the live state of the resources and configuration options that are edited in the Rancher UI.

### Resources Deployed by Default

By default, a set of resources curated by the [kube-prometheus](https://github.com/prometheus-operator/kube-prometheus) project are deployed onto your cluster as part of installing the Rancher Monitoring Application to set up a basic Monitoring/Alerting stack.

The resources that get deployed onto your cluster to support this solution can be found in the [`rancher-monitoring`](https://github.com/rancher/charts/tree/main/charts/rancher-monitoring) Helm chart, which closely tracks the upstream [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) Helm chart maintained by the Prometheus community with certain changes tracked in the [CHANGELOG.md](https://github.com/rancher/charts/blob/main/charts/rancher-monitoring/CHANGELOG.md).

### Default Exporters

Monitoring V2 deploys three default exporters that provide additional metrics for Prometheus to store:

1. `node-exporter`: exposes hardware and OS metrics for Linux hosts. For more information on `node-exporter`, refer to the [upstream documentation](https://prometheus.io/docs/guides/node-exporter/).

1. `windows-exporter`: exposes hardware and OS metrics for Windows hosts (only deployed on Windows clusters). For more information on `windows-exporter`, refer to the [upstream documentation](https://github.com/prometheus-community/windows_exporter).

1. `kube-state-metrics`: expose additional metrics that track the state of resources contained in the Kubernetes API (e.g., pods, workloads, etc.). For more information on `kube-state-metrics`, refer to the [upstream documentation](https://github.com/kubernetes/kube-state-metrics/tree/master/docs).

ServiceMonitors and PodMonitors will scrape these exporters, as defined [here](#defining-what-metrics-are-scraped). Prometheus stores these metrics, and you can query the results via either Prometheus's UI or Grafana.

See the [architecture](#1-architecture-overview) section for more information on recording rules, alerting rules, and Alertmanager.

### Components Exposed in the Rancher UI

When the monitoring application is installed, you will be able to edit the following components in the Rancher UI:

| Component | Type of Component | Purpose and Common Use Cases for Editing |
|--------------|------------------------|---------------------------|
| ServiceMonitor | Custom resource | Sets up Kubernetes Services to scrape custom metrics from. Automatically updates the scrape configuration in the Prometheus custom resource. |
| PodMonitor | Custom resource | Sets up Kubernetes Pods to scrape custom metrics from. Automatically updates the scrape configuration in the Prometheus custom resource. |
| Receiver | Configuration block (part of Alertmanager) | Modifies information on where to send an alert (e.g., Slack, PagerDuty, etc.) and any necessary information to send the alert (e.g., TLS certs, proxy URLs, etc.). Automatically updates the Alertmanager custom resource. |
| Route | Configuration block (part of Alertmanager) | Modifies the routing tree that is used to filter, label, and group alerts based on labels and send them to the appropriate Receiver. Automatically updates the Alertmanager custom resource. |
| PrometheusRule | Custom resource | Defines additional queries that need to trigger alerts or define materialized views of existing series that are within Prometheus's TSDB.  Automatically updates the Prometheus custom resource. |

### PushProx

PushProx allows Prometheus to scrape metrics across a network boundary, which prevents users from having to expose metrics ports for internal Kubernetes components on each node in a Kubernetes cluster.

Since the metrics for Kubernetes components are generally exposed on the host network of nodes in the cluster, PushProx deploys a DaemonSet of clients that sit on the hostNetwork of each node and make an outbound connection to a single proxy that is sitting on the Kubernetes API. Prometheus can then be configured to proxy scrape requests through the proxy to each client, which allows it to scrape metrics from the internal Kubernetes components without requiring any inbound node ports to be open.

Refer to [Scraping Metrics with PushProx](#scraping-metrics-with-pushprox) for more.

# 5. Scraping and Exposing Metrics

### Defining what Metrics are Scraped

ServiceMonitors and PodMonitors define targets that are intended for Prometheus to scrape. The [Prometheus custom resource](https://github.com/prometheus-operator/prometheus-operator/blob/master/Documentation/design.md#prometheus) tells Prometheus which ServiceMonitors or PodMonitors it should use to find out where to scrape metrics from.

The Prometheus Operator observes the ServiceMonitors and PodMonitors. When it observes that they are created or updated, it calls the Prometheus API to update the scrape configuration in the Prometheus custom resource and keep it in sync with the scrape configuration in the ServiceMonitors or PodMonitors. This scrape configuration tells Prometheus which endpoints to scrape metrics from and how it will label the metrics from those endpoints.

Prometheus scrapes all of the metrics defined in its scrape configuration at every `scrape_interval`, which is one minute by default.

The scrape configuration can be viewed as part of the Prometheus custom resource that is exposed in the Rancher UI.

### How the Prometheus Operator Sets up Metrics Scraping

The Prometheus Deployment or StatefulSet scrapes metrics, and the configuration of Prometheus is controlled by the Prometheus custom resources. The Prometheus Operator watches for Prometheus and Alertmanager resources, and when they are created, the Prometheus Operator creates a Deployment or StatefulSet for Prometheus or Alertmanager with the user-defined configuration.

When the Prometheus Operator observes ServiceMonitors, PodMonitors, and PrometheusRules being created, it knows that the scrape configuration needs to be updated in Prometheus. It updates Prometheus by first updating the configuration and rules files in the volumes of Prometheus's Deployment or StatefulSet. Then it calls the Prometheus API to sync the new configuration, resulting in the Prometheus Deployment or StatefulSet to be modified in place.

### How Kubernetes Component Metrics are Exposed

Prometheus scrapes metrics from deployments known as [exporters,](https://prometheus.io/docs/instrumenting/exporters/) which export the time series data in a format that Prometheus can ingest. In Prometheus, time series consist of streams of timestamped values belonging to the same metric and the same set of labeled dimensions.

### Scraping Metrics with PushProx

Certain internal Kubernetes components are scraped via a proxy deployed as part of Monitoring V2 called PushProx. For detailed information on PushProx, refer [here](#how-pushprox-works) and to the above [architecture](#1-architecture-overview) section.

### Scraping Metrics

The following Kubernetes components are directly scraped by Prometheus:

- kubelet*
- ingress-nginx**
- coreDns/kubeDns
- kube-api-server

\* You can optionally use `hardenedKubelet.enabled` to use a PushProx, but that is not the default.

** For RKE and RKE2 clusters, ingress-nginx is deployed by default and treated as an internal Kubernetes component.


### Scraping Metrics Based on Kubernetes Distribution

Metrics are scraped differently based on the Kubernetes distribution. For help with terminology, refer [here](#terminology). For details, see the table below:

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

### Terminology

- **kube-scheduler:** The internal Kubernetes component that uses information in the pod spec to decide on which node to run a pod.
- **kube-controller-manager:** The internal Kubernetes component that is responsible for node management (detecting if a node fails), pod replication and endpoint creation.
- **etcd:** The internal Kubernetes component that is the distributed key/value store which Kubernetes uses for persistent storage of all cluster information.
- **kube-proxy:** The internal Kubernetes component that watches the API server for pods/services changes in order to maintain the network up to date.
- **kubelet:** The internal Kubernetes component that watches the API server for pods on a node and makes sure they are running.
- **ingress-nginx:** An Ingress controller for Kubernetes using NGINX as a reverse proxy and load balancer.
- **coreDns/kubeDns:** The internal Kubernetes component responsible for DNS.
- **kube-api-server:** The main internal Kubernetes component that is responsible for exposing APIs for the other master components.
