---
title: Monitoring
weight: 4
---

_Available as of v2.2.0_

Using Rancher, you can monitor the state and processes of your cluster nodes, Kubernetes components, and software deployments through integration with [Prometheus](https://prometheus.io/), a leading open-source monitoring solution. Prometheus provides a _time series_ of your data, which is, according to [Prometheus documentation](https://prometheus.io/docs/concepts/data_model/):

>A stream of timestamped values belonging to the same metric and the same set of labeled dimensions, along with comprehensive statistics and metrics of the monitored cluster.

In other words, Prometheus lets you view metrics from your different Rancher and Kubernetes objects. Using timestamps, Prometheus lets you query and view these metrics in easy-to-read graphs and visuals, either through the Rancher UI or [Grafana](https://grafana.com/), which is an analytics viewing platform deployed along with Prometheus. By viewing data that Prometheus scrapes from your cluster control plane, nodes, and deployments, you can stay on top of everything happening in your cluster. You can then use these analytics to better run your organization: stop system emergencies before they start, develop maintenance strategies, restore crashed servers, etc.  Multi-tenancy support in terms of cluster and project-only Prometheus instances are also supported.

## Monitoring Scope

Using Prometheus, you can monitor Rancher at both the cluster level and [project level]({{< baseurl >}}/rancher/v2.x/en/project-admin/tools/monitoring/). For each cluster and project that is enabled for monitoring, Rancher deploys a Prometheus server.

- Cluster monitoring allows you to view the health of your Kubernetes cluster. Prometheus collects metrics from the cluster components below, which you can view in graphs and charts.

    - [Kubernetes control plane]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#kubernetes-components-metrics)
    - [etcd database]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#etcd-metrics)
    - [All nodes (including workers)]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/#cluster-metrics)

- [Project monitoring]({{< baseurl >}}/rancher/v2.x/en/project-admin/tools/monitoring/) allows you to view the state of pods running in a given project. Prometheus collects metrics from the project's deployed HTTP and TCP/UDP workloads.

## Enabling Cluster Monitoring

As an [administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [cluster owner]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles), you can configure Rancher to deploy Prometheus to monitor your Kubernetes cluster.

1. From the **Global** view, navigate to the cluster that you want to configure cluster monitoring.

1. Select **Tools > Monitoring** in the navigation bar.

1. Select **Enable** to show the [Prometheus configuration options]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/prometheus/). Review the [resource consumption recommendations](#resource-consumption) to ensure you have enough resources for Prometheus and on your worker nodes to enable monitoring. Enter in your desired configuration options.

1. Click **Save**.

**Result:** The Prometheus server will be deployed as well as two monitoring applications. The two monitoring applications, `cluster-monitoring` and `monitoring-operator`, are added as an [application]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) to the cluster's `system` project.  After the applications are `active`, you can start viewing [cluster metrics]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/cluster-metrics/) through the [Rancher dashboard]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/viewing-metrics/#rancher-dashboard) or directly from [Grafana]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/monitoring/#grafana).

### Resource Consumption

When enabling cluster monitoring, you need to ensure your worker nodes and Prometheus pod have enough resources. The tables below provides a guide of how much resource consumption will be used.

#### Prometheus Pod Resource Consumption

This table is the resource consumption of the Prometheus pod, which is based on the number of all the nodes in the cluster. The count of nodes includes the worker, control plane and etcd nodes. Total disk space allocation should be approximated by the `rate * retention` period set at the cluster level. When enabling cluster level monitoring, you should adjust the CPU and Memory limits and reservation.

Number of Cluster Nodes | CPU (milli CPU) | Memory | Disk
------------------------|-----|--------|------
5 | 500 | 650 MB | ~1 GB/Day
50| 2000 | 2 GB | ~5 GB/Day
256| 4000 | 6 GB | ~18 GB/Day

#### Other Pods Resource Consumption

Besides the Prometheus pod, there are components that are deployed that require additional resources on the worker nodes.

Pod | CPU (milli CPU) | Memory (MB)
----|-----------------|------------
Node Exporter (Per Node) | 100 | 30
Kube State Cluster Monitor | 100 | 130
Grafana | 100 | 150
Prometheus Cluster Monitoring Nginx | 50 | 50
