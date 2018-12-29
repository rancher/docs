---
title: Monitoring
weight: 10000
---

_Available as of v2.2.0_

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution. Prometheus provides a _time series_ of your data, which is, according to [Prometheus documentation](https://prometheus.io/docs/concepts/data_model/):

>A stream of timestamped values belonging to the same metric and the same set of labeled dimensions, along with comprehensive statistics and metrics of the monitored cluster.

In other words, Prometheus let's you view metrics from your different Rancher and Kubernetes objects. Using timestamps, Prometheus let's you query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or [Grafana](https://grafana.com/), which is an analytics viewing platform deployed along with Prometheus. By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, restore crashed servers, etc.  Multi-tenancy support in terms of cluster and project-only Prometheus instances are also supported.

<figcaption>Rancher Online Meetup Prometheus Support Demo</figcaption>

{{< youtube VS4ZRYAAPFQ >}}

## In This Document

<!-- TOC -->

- [Monitoring Scope](#monitoring-scope)
- [Cluster Monitoring](#cluster-monitoring)
- [Project Monitoring](#project-monitoring)
- [Configuring Cluster Monitoring](#configuring-cluster-monitoring)
- [Configuring Project Monitoring](#configuring-project-monitoring)
- [Prometheus Configuration Options](#prometheus-configuration-options)
- [Persistent Storage](#persistent-storage)
- [Viewing Metrics](#viewing-metrics)
- [Cluster Dashboard](#cluster-dashboard)
- [Cluster Dashboard Use](#cluster-dashboard-use)
- [Available Dashboard Metrics](#available-dashboard-metrics)
- [Grafana](#grafana)
- [Workload Metrics](#workload-metrics)
- [Updating Prometheus and Grafana](#updating-prometheus-and-grafana)


<!-- /TOC -->

## Monitoring Scope

Using Prometheus, you can monitor Rancher at both the cluster and project level. Rancher deploys an individual Prometheus server per cluster, and an additional Prometheus server per Rancher project for multi-tenancy.

[Cluster monitoring](#cluster-monitoring) allows you to view the health of a cluster's Kubernetes control plane and individual nodes. System administrators will likely be more interested in cluster monitoring, as administrators are more invested in the health of the Rancher control plane and cluster nodes.

[Project monitoring](#project-monitoring) lets you view the state of pods running in a given project. Users responsible for maintaining a project will be most interested in project monitoring, as it helps them keep their applications up and running for their users.

## Cluster Monitoring

When you enable monitoring for one of your Rancher clusters, Prometheus collects metrics from the cluster components below, which you can view in graphs and charts. We'll have more about the specific metrics collected later in this document.

- [Kubernetes control plane](#kubernetes-components-metrics)
- [etcd database](#etcd-metrics)
- [All nodes (including workers)](#cluster-metrics)

## Project Monitoring

When you enable monitoring for a Rancher project, Prometheus collects metrics from its deployed HTTP and TCP/UDP workloads. We'll have more about the specific metrics collected [later in this document](#workload-metrics).

## Configuring Cluster Monitoring

You can deploy Prometheus monitoring for a cluster by opening it and selecting **Tools > Monitoring** as depicted in the GIF below, which displays a user enabling cluster monitoring for a cluster named `digitalocean`. The only required action for deployment is to select the **Prometheus** tile and click **Save**, but you might want to [customize configuration options](#prometheus-configuration-options) for your environment.

<figcaption>Enabling Cluster Monitoring</figcaption>

![Enabling Cluster Monitoring]({{< baseurl >}}/img/rancher/enable-cluster-monitoring.gif)

Following Prometheus deployment, two monitoring applications are added to the cluster's `system` project's **Catalog Apps** page: `cluster-monitoring` and `system-monitoring`. You can use these catalog apps to [upgrade Prometheus](#updating-prometheus) when new versions are released or [log into the Grafana instance](#grafana-logging-in-for-clusters) for the cluster.

<figcaption>Cluster Monitoring: Deployed <code>cluster-monitoring</code> and <code>system-monitoring</code> Catalog Apps in <code>system</code> Project</figcaption>

![Cluster Monitoring: Catalog Apps]({{< baseurl >}}/img/rancher/cluster-monitoring-catalog-apps.png)

## Configuring Project Monitoring

>**Prerequisite:** Complete [Configuring Cluster Monitoring](#configuring-cluster-monitoring). You can't enable project-level monitoring until you enable it for the cluster.

After enabling cluster monitoring, you can enable project monitoring by opening the project and then selecting **Tools > Monitoring**. This menu option won't be available until cluster monitoring is enabled.

The GIF below displays a user enabling project monitoring for the `Default` project in a cluster named `digitalocean`.

<figcaption>Enabling Project Monitoring</figcaption>

![Enabling Project Monitoring]({{< baseurl >}}/img/rancher/enable-project-monitoring.gif)

After you enable project monitoring, a single application is added to the project's **Catalog Apps** page: `cluster-monitoring`. Use this catalog app to [upgrade Prometheus](#updating-prometheus) when a new version is released or [log into the Grafana instance](#grafana-logging-in-for-projects) for the project.

<figcaption>Project Monitoring: Deployed <code>project-monitoring</code> Catalog App</figcaption>

![Project Monitoring: Catalog App]({{< baseurl >}}/img/rancher/project-monitoring-catalog-apps.png)


## Prometheus Configuration Options

While configuring monitoring at either the cluster or project level, you can choose options to customize your monitoring settings. You can enable the options below while completing either [Configuring Cluster Monitoring](#configuring-cluster-monitoring) or [Configuring Project Monitoring](#configuring-project-monitoring).

![Prometheus Configuration Options for Cluster]({{< baseurl >}}/img/rancher/prometheus-configuration.png)

<figcaption>Prometheus Configuration Options</figcaption>

Option | Description
-------|-------------
Data Retention | Configures how long your Prometheus instance retains monitoring data scraped from Rancher objects before it's purged.
Node Exporter Host Port | Configures the port on which [node exporter](https://github.com/prometheus/node_exporter/blob/master/README.md) data is exposed (i.e., data that Prometheus collects from your node hardware).
Enable Persistent Storage for Prometheus | Let's you configure storage for Prometheus so that you can retain your analytics if your Prometheus pod fails. See [Persistent Storage](#persistent-storage).
Enable Persistent Storage for Grafana | Let's you configure storage so that you can retain your analytics if your Grafana pod fails. Because you can configure persistent storage for Prometheus (which Grafana draws from), configuring persistent storage for Grafana isn't as important as Prometheus. For more information, see [Persistent Storage](#persistent-storage).
Add Selector | If you want to deploy the Prometheus/Grafana pods to a specific node when enable monitoring, add selectors to the pods so that they're deployed to your selected node(s). To use this option, you must first apply labels to your nodes.

## Persistent Storage

>**Prerequisite:** Configure one or more [storage class]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#adding-storage-classes) to use as [persistent storage]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/) for your Prometheus/Grafana instance.

By default, when you enable Prometheus for either a cluster or project, all monitoring data that Prometheus collects is stored on its own pod. This local storage means that if your Prometheus/Grafana pods fail, you'll lose all your monitoring data. Therefore, we recommend configuring persistent storage external to your cluster. This way, if your Prometheus/Grafana pods fail, the new pods that replace them can recover using your persistent storage.

<figcaption>Enabling Persistent Storage for Cluster Monitoring</figcaption>

![Enabling Persistent Storage for Monitoring]({{< baseurl >}}/img/rancher/monitor-persistent-storage.png)

You can configure persistent storage for Prometheus and/or Grafana by using the radio buttons available when completing either [Configuring Cluster Monitoring](#configuring-cluster-monitoring) or [Configuring Project Monitoring](#configuring-project-monitoring). After enabling persistent storage, you'll then need to specify a [storage class]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#storage-classes) that's used to provision a [persistent volume]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#persistent-volumes), along with the size of the volume that's being provisioned.

## Viewing Metrics

After you've deployed Prometheus to a cluster or project, you can view that data in one of two places:

- [The Rancher Cluster Dashboard](#cluster-dashboard)
- [Grafana](#grafana)

### Cluster Dashboard

After deploying Prometheus to one of your clusters, you can view the data it collects from the cluster's Dashboard.

>**Note:** The cluster Dashboard only displays Prometheus analytics for the cluster, not individual projects. If you want to view analytics for a project, you must [log into the project's Grafana instance](#grafana-logging-in-for-projects).

<figcaption>Prometheus Metrics Displayed on Cluster Dashboard</figcaption>

![Cluster Dashboard]({{< baseurl >}}/img/rancher/cluster-dashboard.png)

#### Cluster Dashboard Use

Prometheus metrics are displayed below the main dashboard display, and are denoted with the Grafana icon as displayed below.

<figcaption>Grafana Icon Indicating Prometheus Metrics</figcaption>

![Grafana Icon]({{< baseurl >}}/img/rancher/grafana-icon.png)

>**Tip:** Click the icon to open the metrics in [Grafana](#grafana).

In each Prometheus metrics widget, you can toggle between a **Detail** view, which displays graphs and charts that let you view each event in a Prometheus time series, or a **Summary** view, which only lists events in a Prometheus time series out of the norm.

<figcaption>Toggle Between Detail and Summary View</figcaption>

![Toggle Between Detail and Summary View]({{< baseurl >}}/img/rancher/toggle-detail-summary.gif)

You can also change the range of the time series that you're viewing to see a more refined or expansive data sample.

<figcaption>Changing Time Series Range</figcaption>

![Changing Time Series Range]({{< baseurl >}}/img/rancher/time-series.gif)

Finally, you can customize the data sample to display data between chosen dates and times.

<figcaption>Custom Metric Range</figcaption>

![Custom Metric Range]({{< baseurl >}}/img/rancher/custom-metric-range.gif)

<!-- TODO: Come back and define while listening to video -->

#### Available Dashboard Metrics

After deploying Prometheus/Grafana to a cluster, you can view the metrics from its Dashboard.

When analyzing metrics, don't be concerned about any single standalone metric in the charts and graphs. Rather, you should establish a baseline for your metrics over the course of time (i.e., the range of values that your components usually operate within and are considered normal). After you establish this baseline, be on the lookout for large deltas in the charts and graphs, as these big changes usually indicate a problem that you need to investigate.

##### Cluster Metrics

These metrics display the hardware utilization for all nodes in your cluster, regardless of its Kubernetes Role.

- **CPU Utilization**

    High load either indicates that your cluster is running efficiently (😄) or that you're running out of CPU resources (😞).

- **Disk Utilization**

    Be on the lookout for increased read and write rates on nodes nearing their disk capacity. This advice is especially true for etcd nodes, as running out of storage on an etcd node leads to cluster failure.

- **Memory Utilization**

    Deltas in memory utilization usually indicate a memory leak.

- **Load Average**

     Generally, you want your load average to match your number of logical CPUs for the cluster. For example, if your cluster has 8 logical CPUs, the ideal load average would be 8 as well. If you load average is well under the number of logical CPUs for the cluster, you may want to reduce cluster resources. On the other hand, if your average is over 8, your cluster needs more resources.

##### Etcd Metrics

These metrics display the operations of the etcd database on each of your cluster nodes. After establishing a baseline of normal etcd operational metrics, observe them for abnormal deltas between metric refreshes, which indicate potential issues with etcd. Always address etcd issues immediately!

You should also pay attention to the text at the top of the etcd metrics, which displays leadership statistics. This text indicates if etcd currently has a leader, which is the etcd instance that coordinates the other etcd instances in your cluster. A large increase in leader changes implies etcd is unstable. If you notice a change in  leadership statistics, you should investigate them for issues.

<figcaption>etcd Leadership Statistics</figcaption>

![etcd Leadership Statistics]({{< baseurl >}}/img/rancher/etcd-leadership-stats.png)

Some of the biggest metrics to look out for:

- **Etcd has a leader: No**

    etcd is usually deployed on multiple nodes and elects a leader to coordinate its operations. If etcd does not have a leader, its operations are not being coordinated. 

- **Number of leader changes**

    If this statistic suddenly grows, it usually indicates network communication issues that constantly force the cluster to elect a new leader.

##### Kubernetes Components Metrics

These metrics display data about the cluster's individual Kubernetes components. Primarily, it displays information about connections and latency for each component: the API server, controller manager, scheduler, and ingress controller.

When analyzing Kubernetes component metrics, don't be concerned about any single standalone metric in the charts and graphs that display. Rather, you should establish a baseline for metrics considered normal following a period of observation (i.e., the range of values that your components usually operate within and are considered normal). After you establish this baseline, be on the lookout for large deltas in the charts and graphs, as these big changes usually indicate a problem that you need to investigate. 

Some of the more important component metrics to monitor are:

- **API Response Time**

    Increasing API response times indicate there's a generalized problem that requires investigation.

- **API Request Rate**

    Rising API request rates usually coincide with increased API response times. Increased request rates also indicate a generalized problem requiring investigation.

- **Scheduler Preemptions**
    
    If you see a spike in scheduler preemptions, it's an indication that you're running out of hardware resources, as Kubernetes is recognizing it doesn't have enough resources to run all your pods and is prioritizing the more important ones.

- **Scheduler Failed Pods**
    
    Failed pods can have a variety of causes, such as unbound persistent volume claims, exhausted hardware resources, non-responsive nodes, etc.


Also note that at the bottom of the widget, **Ingress Upstream Response Times** are listed. This section gives you an idea of how fast ingress is routing connections to your cluster services.

##### Rancher Logging Metrics

Although the Dashboard for a cluster primary displays data sourced from Prometheus, it also displays information for cluster logging, provided that you have configured Rancher to use a logging service.

For more information about enabling logging for a cluster, see [logging]({{< baseurl >}}/rancher/v2.x/en/tools/logging).


## Grafana

Your other option for viewing cluster data is Grafana, which is a leading open source platform for analytics and monitoring. When you deploy Prometheus for a cluster or project, Grafana is deployed along with it.

Using Grafana, you have access to its powerful feature set, which allows you to query, visualize, alert, and ultimately, understand your cluster and workload data.

For more information on Grafana and its capabilities, visit the [Grafana website](https://grafana.com/grafana).

### Logging into Grafana

To view your cluster or project analytics in Grafana, you must log into the Grafana instance that Rancher creates for the object. When you configure monitoring for either a cluster or project, Rancher automatically creates a link to access its newly deployed Grafana instance. Use this link to view monitoring data for the cluster or project.

#### Grafana and Authentication

When you deploy Prometheus to a cluster or project, Rancher automatically creates a Grafana instance for the object. Rancher determines which users can access the new Grafana instance, as well as the objects they can view within it, by validating them against cluster or project membership. Users that hold membership for the object will be able to access its Grafana instance. In other words, users' access in Grafana mirrors their access in Rancher.

#### Grafana: Logging in for Clusters

To log into an instance of Grafana displays monitoring analytics for a cluster, browse to the cluster's `system` project and open **Catalog Apps**. From the `cluster-monitoring` catalog app, click the `/index.html` link. Remember, you view data for your cluster by navigating to the cluster's `system` _project_, which is a little un-intuitive, considering you want to view cluster data.

<figcaption>Logging into Grafana: Cluster Monitoring Link</figcaption>

![Logging into Grafana: Cluster Monitoring Link]({{< baseurl >}}/img/rancher/cluster-monitoring-link.png)

#### Grafana: Logging in for Projects

To log into an instance of Grafana that's monitoring a project, browse to the applicable cluster and project. Then open **Catalog Apps**. From the `project-monitoring` catalog app, click the `/index.html` link.

<figcaption>Logging into Grafana: Project Monitoring Link</figcaption>

![Logging into Grafana: Project Monitoring Link]({{< baseurl >}}/img/rancher/project-monitor-link.png)

##### Workload Metrics

After logging into the Grafana instance for a project, you can view the metrics for its workloads. Grafana displays metrics for:

- **HTTP Workloads**

    When viewing metrics for HTTP workloads, be on the lookout for `500` errors (server errors) or any other non `200` code. In particular, look for spikes in `403` codes, which may indicate that an unauthorized user is trying to access the cluster.

- **TCP/UDP Workloads** 

    Look for increases in packet loss, which may indicate high network volume, network problems, or CNI plug-in issues.  

    Additionally, look for changes in response times. After observing your applications, you'll get a general idea of what its standard response times are. If the response times change, it could be indicative of a problem.

## Updating Prometheus and Grafana

Although Rancher makes it easy to deploy Prometheus to your clusters and projects, it does not self update. When a new version of Prometheus or Grafana is released, you must upgrade it manually.

### Upgrading Cluster Monitoring

To upgrade Prometheus/Grafana that's monitoring your entire cluster, browse to the cluster's `system` project and select **Catalog Apps**. Upgrade both `project-monitoring` _and_ `system-monitor`  by selecting  **Ellipsis (...) > Upgrade** for each.


### Upgrading Project Monitoring

To upgrade Prometheus/Grafana that's monitoring a single project, browse to that project and select **Catalog Apps**. Find the `project-monitoring` catalog app and select  **Ellipsis (...) > Upgrade**.