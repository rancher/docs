---
title: Default Alerts for Cluster Monitoring
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/cluster-admin/tools/alerts/default-alerts
  - /rancher/v2.0-v2.4/en/monitoring-alerting/legacy/alerts/cluster-alerts/default-alerts
  - /rancher/v2.0-v2.4/en/monitoring-alerting/v2.0.x-v2.4.x/cluster-alerts/default-alerts
---

When you create a cluster, some alert rules are predefined. These alerts notify you about signs that the cluster could be unhealthy. You can receive these alerts if you configure a [notifier]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers) for them.

Several of the alerts use Prometheus expressions as the metric that triggers the alert. For more information on how expressions work, you can refer to the Rancher [documentation about Prometheus expressions]({{<baseurl>}}/rancher/v2.0-v2.4/en/monitoring-alerting/legacy/monitoring/cluster-monitoring/expression/) or the Prometheus [documentation about querying metrics](https://prometheus.io/docs/prometheus/latest/querying/basics/).

# Alerts for etcd
Etcd is the key-value store that contains the state of the Kubernetes cluster. Rancher provides default alerts if the built-in monitoring detects a potential problem with etcd. You don't have to enable monitoring to receive these alerts.

A leader is the node that handles all client requests that need cluster consensus. For more information, you can refer to this [explanation of how etcd works.](https://rancher.com/blog/2019/2019-01-29-what-is-etcd/#how-does-etcd-work)

The leader of the cluster can change in response to certain events. It is normal for the leader to change, but too many changes can indicate a problem with the network or a high CPU load. With longer latencies, the default etcd configuration may cause frequent heartbeat timeouts, which trigger a new leader election.

| Alert | Explanation |
|-------|-------------|
| A high number of leader changes within the etcd cluster are happening | A warning alert is triggered when the leader changes more than three times in one hour. |
| Database usage close to the quota 500M | A warning alert is triggered when the size of etcd exceeds 500M.|
| Etcd is unavailable | A critical alert is triggered when etcd becomes unavailable. |
| Etcd member has no leader | A critical alert is triggered when the etcd cluster does not have a leader for at least three minutes. |


# Alerts for Kubernetes Components
Rancher provides alerts when core Kubernetes system components become unhealthy.

Controllers update Kubernetes resources based on changes in etcd. The [controller manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) monitors the cluster desired state through the Kubernetes API server and makes the necessary changes to the current state to reach the desired state.

The [scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) service is a core component of Kubernetes. It is responsible for scheduling cluster workloads to nodes, based on various configurations, metrics, resource requirements and workload-specific requirements.

| Alert | Explanation |
|-------|-------------|
| Controller Manager is unavailable |  A critical warning is triggered when the cluster’s controller-manager becomes unavailable. |
| Scheduler is unavailable | A critical warning is triggered when the cluster’s scheduler becomes unavailable. |


# Alerts for Events
Kubernetes events are objects that provide insight into what is happening inside a cluster, such as what decisions were made by the scheduler or why some pods were evicted from the node. In the Rancher UI, from the project view, you can see events for each workload.

| Alert | Explanation |
|-------|-------------|
| Get warning deployment event | A warning alert is triggered when a warning event happens on a deployment. |


# Alerts for Nodes
Alerts can be triggered based on node metrics. Each computing resource in a Kubernetes cluster is called a node. Nodes can be either bare-metal servers or virtual machines.

| Alert | Explanation |
|-------|-------------|
| High CPU load | A warning alert is triggered if the node uses more than 100 percent of the node’s available CPU seconds for at least three minutes. |
| High node memory utilization | A warning alert is triggered if the node uses more than 80 percent of its available memory for at least three minutes. |
| Node disk is running full within 24 hours | A critical alert is triggered if the disk space on the node is expected to run out in the next 24 hours based on the disk growth over the last 6 hours. |

# Project-level Alerts
When you enable monitoring for the project, some project-level alerts are provided. For details, refer to the [section on project-level alerts.]({{<baseurl>}}/rancher/v2.0-v2.4/en/project-admin/tools/alerts/)
