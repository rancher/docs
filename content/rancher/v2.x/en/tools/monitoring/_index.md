---
title: Monitoring
weight: 10000
---

_Available as of v2.2.0_

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution. Prometheus provides a _time series_ of your data, which is, according to [Prometheus documentation](https://prometheus.io/docs/concepts/data_model/):

>A stream of timestamped values belonging to the same metric and the same set of labeled dimensions, along with comprehensive statistics and metrics of the monitored cluster.

In other words, Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Using timestamps, Prometheus lets you query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or [Grafana](https://grafana.com/), which is an analytics viewing platform deployed along with Prometheus. By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, restore crashed servers, etc.  Multi-tenancy support in terms of cluster and project-only Prometheus instances are also supported.

## In This Document

<!-- TOC -->

- [Monitoring Scope](#monitoring-scope)

    + [Cluster Monitoring](#cluster-monitoring)
    + [Project Monitoring](#project-monitoring)
- [Configuring Cluster Monitoring](#configuring-cluster-monitoring)
- [Configuring Project Monitoring](#configuring-project-monitoring)
- [Prometheus Configuration Options](#prometheus-configuration-options)
    
    + [Enable Node Exporter](#enable-node-exporter)
    + [Persistent Storage](#persistent-storage)
    + [Advanced Options](#advanced-options)
- [Viewing Metrics](#viewing-metrics)

    + [Rancher Dashboard](#rancher-dashboard)
    + [Available Dashboard](#available-dashboard)
    + [Grafana](#grafana)
- [Cluster Metrics](#cluster-metrics)
- [Etcd Metrics](#etcd-metrics)
- [Kubernetes Components Metrics](#kubernetes-components-metrics)
- [Rancher Logging Metrics](#rancher-logging-metrics)
- [Workload Metrics](#workload-metrics)
- [Custom Metrics](#custom-metrics)

<!-- /TOC -->

## Monitoring Scope

Using Prometheus, you can monitor Rancher at both the cluster and project level. Rancher deploys an individual Prometheus server per cluster, and an additional Prometheus server per Rancher project for multi-tenancy.

[Cluster monitoring](#cluster-monitoring) allows you to view the health of a cluster's Kubernetes control plane and individual nodes. System administrators will likely be more interested in cluster monitoring, as administrators are more invested in the health of the Rancher control plane and cluster nodes.

[Project monitoring](#project-monitoring) lets you view the state of pods running in a given project. Users responsible for maintaining a project will be most interested in project monitoring, as it helps them keep their applications up and running for their users.

### Cluster Monitoring

When you enable monitoring for one of your Rancher clusters, Prometheus collects metrics from the cluster components below, which you can view in graphs and charts. We'll have more about the specific metrics collected later in this document.

- [Kubernetes control plane](#kubernetes-components-metrics)
- [etcd database](#etcd-metrics)
- [All nodes (including workers)](#cluster-metrics)

### Project Monitoring

When you enable monitoring for a Rancher project, Prometheus collects metrics from its deployed HTTP and TCP/UDP workloads. We'll have more about the specific metrics collected [later in this document](#custom-metrics).

## Configuring Cluster Monitoring

You can deploy Prometheus monitoring for a cluster, navigate to **Tools > Monitoring** as shown in the GIF below, which displays a user enabling cluster monitoring for a cluster named `local`. The only required action for deployment is to select the **Enable** option and click **Save**, but you might want to [customize configuration options](#prometheus-configuration-options) for your environment.

![EnableClusterMonitoring]({{< baseurl >}}/img/rancher/enable-cluster-monitoring.gif)

Following Prometheus deployment, two monitoring applications are added to the cluster's `system` project's **Apps** page: `cluster-monitoring` and `monitoring-operator`. You can use the `cluster-monitoring` catalog app to [access the Grafana instance](#grafana-accessing-for-clusters) for the cluster.

## Configuring Project Monitoring

You can enable project monitoring by opening the project and then selecting **Tools > Monitoring** as shown in the GIF below, which displays enabling the `default` project monitoring.

![EnableProjectMonitoring]({{< baseurl >}}/img/rancher/enable-project-monitoring.gif)

After you enable project monitoring, a single application is added to the project's **Apps** page: `project-monitoring`. Use this catalog app to [access the Grafana instance](#grafana-accessing-for-projects) for the project.

With enabling cluster monitoring, you can collect the [Workload metrics](#workload-metrics) for this project, otherwise, you can only collect the [Custom metrics](#custom-metrics) from this project.

## Prometheus Configuration Options

While configuring monitoring at either the cluster or project level, you can choose options to customize your monitoring settings. You can enable the options below while completing either [Configuring Cluster Monitoring](#configuring-cluster-monitoring) or [Configuring Project Monitoring](#configuring-project-monitoring).

Option | Description
-------|-------------
Data Retention | Configures how long your Prometheus instance retains monitoring data scraped from Rancher objects before it's purged.
Enable Node Exporter | Configures using [Node Exporter](https://github.com/prometheus/node_exporter/blob/master/README.md) or not, please take a look at the [notes](#enable-node-exporter).
Node Exporter Host Port | Configures the host port on which [Node Exporter](https://github.com/prometheus/node_exporter/blob/master/README.md) data is exposed (i.e., data that Prometheus collects from your node hardware), if enabling Node Exporter.
Enable Persistent Storage for Prometheus | Lets you configure storage for Prometheus so that you can retain your metric data if your Prometheus pod fails. See [Persistent Storage](#persistent-storage).
Enable Persistent Storage for Grafana | Lets you configure storage so that you can retain your dashboards and configuration if your Grafana pod fails. See [Persistent Storage](#persistent-storage).
Prometheus CPU Limit | Configures [the CPU resource limits](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu) of the Promehtues pod.
Prometheus CPU Reservation | Configures [the CPU resource requests](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu) of the Promehtues pod.
Prometheus Memory Limit | Configures [the Memory resource limits](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) of the Promehtues pod.
Prometheus Memory Reservation | Configures [the Memory resource requests](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-memory) of the Promehtues pod.
Add Selector | If you want to deploy the Prometheus/Grafana pods to a specific node when enable monitoring, add selectors to the pods so that they're deployed to your selected node(s). To use this option, you must first apply labels to your nodes.

### Enable Node Exporter

Node Exporter is a popular open source exporter which can expose the metrics for hardware and \*NIX kernels OS, it is designed to monitor the host system. However, there are still namespacing issues with running it in a container, mostly around filesystem mount spaces. So if we need to monitor the actual network stats for the container network, we must deploy it with `hostNetwork` mode.

Firstly, you need to consider which host port should expose to avoid port conflicts and fill into `Node Exporter Host Port` field. Secondly, you must open that port to allow the internal traffic from `Prometheus`.

### Persistent Storage

>**Prerequisite:** Configure one or more [storage class]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#adding-storage-classes) to use as [persistent storage]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/) for your Prometheus/Grafana instance.

By default, when you enable Prometheus for either a cluster or project, all monitoring data that Prometheus collects is stored on its own pod. This local storage means that if your Prometheus/Grafana pods fail, you'll lose all your monitoring data. Therefore, we recommend configuring persistent storage external to your cluster. This way, if your Prometheus/Grafana pods fail, the new pods that replace them can recover using your persistent storage.

You can configure persistent storage for Prometheus and/or Grafana by using the radio buttons available when completing either [Configuring Cluster Monitoring](#configuring-cluster-monitoring) or [Configuring Project Monitoring](#configuring-project-monitoring). After enabling persistent storage, you'll then need to specify a [storage class]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#storage-classes) that's used to provision a [persistent volume]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#persistent-volumes), along with the size of the volume that's being provisioned.

### Advanced Options

>**Warning:** Monitoring app is [a specially designed app](https://github.com/rancher/system-charts/tree/dev/charts/rancher-monitoring). Any modification without familiarizing the entire app can lead to catastrophic errors.

Monitoring is driven by [Rancher Catalog App]({{< baseurl >}}/rancher/v2.x/en/catalog), so you can expand all options by clicking the **Show advanced options** and then configure it as you wolud configure any other app.

## Viewing Metrics

After you've deployed Prometheus to a cluster or project, you can view that data in one of two places:

- [Rancher Dashboard](#cluster-dashboard)
- [Grafana](#grafana)

### Rancher Dashboard

After enabling cluster monitoring to one of your clusters, you can view the data it collects from the Rancher Dashboard.

>**Note:** The Rancher Dashboard only displays Prometheus analytics for the cluster, not individual projects. If you want to view analytics for a project, you must [access the project's Grafana instance](#grafana-accessing-for-projects).

#### Rancher Dashboard Use

Prometheus metrics are displayed below the main dashboard display, and are denoted with the Grafana icon as displayed below.

>**Tip:** Click the icon to open the metrics in [Grafana](#grafana).

In each Prometheus metrics widget, you can toggle between a **Detail** view, which displays graphs and charts that let you view each event in a Prometheus time series, or a **Summary** view, which only lists events in a Prometheus time series out of the norm.

You can also change the range of the time series that you're viewing to see a more refined or expansive data sample.

Finally, you can customize the data sample to display data between chosen dates and times.

### Available Dashboard

After deploying Prometheus to a cluster, you can view the metrics from its Dashboard.

When analyzing metrics, don't be concerned about any single standalone metric in the charts and graphs. Rather, you should establish a baseline for your metrics over the course of time (i.e., the range of values that your components usually operate within and are considered normal). After you establish this baseline, be on the lookout for large deltas in the charts and graphs, as these big changes usually indicate a problem that you need to investigate.

### Grafana

Your other option for viewing cluster data is Grafana, which is a leading open source platform for analytics and monitoring.

Grafana allows you to query, visualize, alert, and ultimately, understand your cluster and workload data.

For more information on Grafana and its capabilities, visit the [Grafana website](https://grafana.com/grafana).

#### Accessing Grafana

When enable monitoring, Rancher automatically creates a link to Grafana instance. Use this link to view monitoring data for the cluster or project.

##### Grafana and Authentication

When you deploy Prometheus to a cluster or project, Rancher automatically creates a Grafana instance for the object. Rancher determines which users can access the new Grafana instance, as well as the objects they can view within it, by validating them against cluster or project membership. Users that hold membership for the object will be able to access its Grafana instance. In other words, users' access in Grafana mirrors their access in Rancher.

##### Grafana: Accessing for Clusters

To access an instance of Grafana displays monitoring analytics for a cluster, browse to the cluster's `system` project and open **Apps**. From the `cluster-monitoring` catalog app, click the `/index.html` link. To view data for your cluster navigate to the cluster's _system_ project.

##### Grafana: Accessing for Projects

To access an instance of Grafana that's monitoring a project, browse to the applicable cluster and project. Then open **Apps**. From the `project-monitoring` catalog app, click the `/index.html` link.

#### Manage Grafana

To manage your cluster or project Grafana, you can sign into it by using `admin/admin`. For security, you should change the default password after first login.

The preset Grafana dashboards are imported via [Grafana provisioning mechanism](http://docs.grafana.org/administration/provisioning/#dashboards), so you cannot modify them directly. A workaround, for now, is to clone the original and then modify the new copy.

## Cluster Metrics

These metrics display the hardware utilization for all nodes in your cluster, regardless of its Kubernetes Role. They give you a global monitoring insight into the cluster.

Some of the biggest metrics to look out for:

- **CPU Utilization**

    High load either indicates that your cluster is running efficiently (😄) or that you're running out of CPU resources (😞).

- **Disk Utilization**

    Be on the lookout for increased read and write rates on nodes nearing their disk capacity. This advice is especially true for etcd nodes, as running out of storage on an etcd node leads to cluster failure.

- **Memory Utilization**

    Deltas in memory utilization usually indicate a memory leak.

- **Load Average**

     Generally, you want your load average to match your number of logical CPUs for the cluster. For example, if your cluster has 8 logical CPUs, the ideal load average would be 8 as well. If you load average is well under the number of logical CPUs for the cluster, you may want to reduce cluster resources. On the other hand, if your average is over 8, your cluster may need more resources.

To view the data for one node, browse into the **Nodes** and go into a node view to look for the **Node Metrics**.

[_Get expressions for Cluster Metrics_]({{< baseurl >}}/rancher/v2.x/en/tools/monitoring/expression/#cluster-metrics)

## Etcd Metrics

>**Note:** Supported in [the cluster launched by Rancher]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters).

These metrics display the operations of the etcd database on each of your cluster nodes. After establishing a baseline of normal etcd operational metrics, observe them for abnormal deltas between metric refreshes, which indicate potential issues with etcd. Always address etcd issues immediately!

You should also pay attention to the text at the top of the etcd metrics, which displays leadership statistics. This text indicates if etcd currently has a leader, which is the etcd instance that coordinates the other etcd instances in your cluster. A large increase in leader changes implies etcd is unstable. If you notice a change in  leadership statistics, you should investigate them for issues.

Some of the biggest metrics to look out for:

- **Etcd has a leader**

    etcd is usually deployed on multiple nodes and elects a leader to coordinate its operations. If etcd does not have a leader, its operations are not being coordinated.

- **Number of leader changes**

    If this statistic suddenly grows, it usually indicates network communication issues that constantly force the cluster to elect a new leader.

[_Get expressions for Etcd Metrics_]({{< baseurl >}}/rancher/v2.x/en/tools/monitoring/expression/#etcd-metrics)

## Kubernetes Components Metrics

These metrics display data about the cluster's individual Kubernetes components. Primarily, it displays information about connections and latency for each component: the API server, controller manager, scheduler, and ingress controller.

>**Note:** The metrics for the controller manager, scheduler and ingress controller are only supported in [the cluster launched by Rancher]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters).

When analyzing Kubernetes component metrics, don't be concerned about any single standalone metric in the charts and graphs that display. Rather, you should establish a baseline for metrics considered normal following a period of observation (i.e., the range of values that your components usually operate within and are considered normal). After you establish this baseline, be on the lookout for large deltas in the charts and graphs, as these big changes usually indicate a problem that you need to investigate.

Some of the more important component metrics to monitor are:

- **API Server Request Latency**

    Increasing API response times indicate there's a generalized problem that requires investigation.

- **API Server Request Rate**

    Rising API request rates usually coincide with increased API response times. Increased request rates also indicate a generalized problem requiring investigation.

- **Scheduler Preemption Attempts**

    If you see a spike in scheduler preemptions, it's an indication that you're running out of hardware resources, as Kubernetes is recognizing it doesn't have enough resources to run all your pods and is prioritizing the more important ones.

- **Scheduling Failed Pods**

    Failed pods can have a variety of causes, such as unbound persistent volume claims, exhausted hardware resources, non-responsive nodes, etc.

Also note that at the bottom of the widget, **Ingress Upstream Response Times** are listed. This section gives you an idea of how fast ingress is routing connections to your cluster services.

[_Get expressions for Kubernetes Component Metrics_]({{< baseurl >}}/rancher/v2.x/en/tools/monitoring/expression/#kubernetes-component-metrics)

## Rancher Logging Metrics

Although the Dashboard for a cluster primary displays data sourced from Prometheus, it also displays information for cluster logging, provided that you have configured Rancher to use a logging service.

For more information about enabling logging for a cluster, see [logging]({{< baseurl >}}/rancher/v2.x/en/tools/logging).

[_Get expressions for Rancher Logging Metrics_]({{< baseurl >}}/rancher/v2.x/en/tools/monitoring/expression/#rancher-logging-metrics)

## Workload Metrics

>**Note:** Supported by [enabling cluster monitoring](#configuring-cluster-monitoring).

These metrics display the hardware utilization for a Kubernetes workload. You can also view metrics for [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) and so on. 

To view the pod metrics, navigate into the pod view and click on **Pod Metrics**. You can also view the container metrics by navigating to **Container Metrics** option

[_Get expressions for Workload Metrics_]({{< baseurl >}}/rancher/v2.x/en/tools/monitoring/expression/#workload-metrics)

## Custom Metrics

>**Note:** Supported by [enabling project monitoring](#configuring-project-monitoring).

If you want to scrape the metrics from any [exporters](https://prometheus.io/docs/instrumenting/exporters/), you only need to set up some exposing endpoints on deploying but without configuring the project Prometheus directly.

Imagine that you have deployed a [Redis](https://redis.io/) app/cluster in the namespace `redis-app` of the project `Datacenter`, and you are going to monitor it via [Redis exporter](https://github.com/oliver006/redis_exporter). By enabling project monitoring, you only need to configure **Custom Metrics** under **Advanced Options** as shown in the GIF below, and set the correct `Container Port`, `Path` and `Protocol`.

![AddCustomMetrics]({{< baseurl >}}/img/rancher/add-custom-metrics.gif)
