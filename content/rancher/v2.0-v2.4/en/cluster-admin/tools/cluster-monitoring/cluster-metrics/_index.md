---
title: Cluster Metrics
weight: 3
aliases:
  - /rancher/v2.0-v2.4/en/project-admin/tools/monitoring/cluster-metrics
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/monitoring/cluster-metrics
  - /rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/cluster-metrics
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/cluster-metrics
---

_Available as of v2.2.0_

Cluster metrics display the hardware utilization for all nodes in your cluster, regardless of its role. They give you a global monitoring insight into the cluster.

Some of the biggest metrics to look out for:

- **CPU Utilization**

    High load either indicates that your cluster is running efficiently or that you're running out of CPU resources.

- **Disk Utilization**

    Be on the lookout for increased read and write rates on nodes nearing their disk capacity. This advice is especially true for etcd nodes, as running out of storage on an etcd node leads to cluster failure.

- **Memory Utilization**

    Deltas in memory utilization usually indicate a memory leak.

- **Load Average**

     Generally, you want your load average to match your number of logical CPUs for the cluster. For example, if your cluster has 8 logical CPUs, the ideal load average would be 8 as well. If you load average is well under the number of logical CPUs for the cluster, you may want to reduce cluster resources. On the other hand, if your average is over 8, your cluster may need more resources.

## Finding Node Metrics

1. From the **Global** view, navigate to the cluster that you want to view metrics.

1. Select **Nodes** in the navigation bar.

1. Select a specific node and click on its name.

1. Click on **Node Metrics**.

[_Get expressions for Cluster Metrics_]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/expression/#cluster-metrics)

### Etcd Metrics

>**Note:** Only supported for [Rancher launched Kubernetes clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/).

Etcd metrics display the operations of the etcd database on each of your cluster nodes. After establishing a baseline of normal etcd operational metrics, observe them for abnormal deltas between metric refreshes, which indicate potential issues with etcd. Always address etcd issues immediately!

You should also pay attention to the text at the top of the etcd metrics, which displays leader election statistics. This text indicates if etcd currently has a leader, which is the etcd instance that coordinates the other etcd instances in your cluster. A large increase in leader changes implies etcd is unstable. If you notice a change in leader election statistics, you should investigate them for issues.

Some of the biggest metrics to look out for:

- **Etcd has a leader**

    etcd is usually deployed on multiple nodes and elects a leader to coordinate its operations. If etcd does not have a leader, its operations are not being coordinated.

- **Number of leader changes**

    If this statistic suddenly grows, it usually indicates network communication issues that constantly force the cluster to elect a new leader.

[_Get expressions for Etcd Metrics_]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/expression/#etcd-metrics)

### Kubernetes Components Metrics

Kubernetes components metrics display data about the cluster's individual Kubernetes components. Primarily, it displays information about connections and latency for each component: the API server, controller manager, scheduler, and ingress controller.

>**Note:** The metrics for the controller manager, scheduler and ingress controller are only supported for [Rancher launched Kubernetes clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/).

When analyzing Kubernetes component metrics, don't be concerned about any single standalone metric in the charts and graphs that display. Rather, you should establish a baseline for metrics considered normal following a period of observation, e.g. the range of values that your components usually operate within and are considered normal. After you establish this baseline, be on the lookout for large deltas in the charts and graphs, as these big changes usually indicate a problem that you need to investigate.

Some of the more important component metrics to monitor are:

- **API Server Request Latency**

    Increasing API response times indicate there's a generalized problem that requires investigation.

- **API Server Request Rate**

    Rising API request rates usually coincide with increased API response times. Increased request rates also indicate a generalized problem requiring investigation.

- **Scheduler Preemption Attempts**

    If you see a spike in scheduler preemptions, it's an indication that you're running out of hardware resources, as Kubernetes is recognizing it doesn't have enough resources to run all your pods and is prioritizing the more important ones.

- **Scheduling Failed Pods**

    Failed pods can have a variety of causes, such as unbound persistent volume claims, exhausted hardware resources, non-responsive nodes, etc.

- **Ingress Controller Request Process Time**

    How fast ingress is routing connections to your cluster services.

[_Get expressions for Kubernetes Component Metrics_]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/expression/#kubernetes-components-metrics)

## Rancher Logging Metrics

Although the Dashboard for a cluster primarily displays data sourced from Prometheus, it also displays information for cluster logging, provided that you have [configured Rancher to use a logging service]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/logging/).

[_Get expressions for Rancher Logging Metrics_]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/expression/#rancher-logging-metrics)

## Finding Workload Metrics

Workload metrics display the hardware utilization for a Kubernetes workload. You can also view metrics for [deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [stateful sets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) and so on.

1. From the **Global** view, navigate to the project that you want to view workload metrics.

1. From the main navigation bar, choose **Resources > Workloads.** In versions before v2.3.0, choose **Workloads** on the main navigation bar.

1. Select a specific workload and click on its name.

1. In the **Pods** section, select a specific pod and click on its name.

    - **View the Pod Metrics:** Click on **Pod Metrics**.
    - **View the Container Metrics:** In the **Containers** section, select a specific container and click on its name. Click on **Container Metrics**.

[_Get expressions for Workload Metrics_]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-monitoring/expression/#workload-metrics)
