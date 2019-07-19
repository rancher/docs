---
title: Default Alerts
weight: 1
---

# Overview of Default Alerts for Cluster Monitoring

When you enable monitoring for a cluster, Rancher provides several alerts by default. These alerts notify you about signs that the cluster could be unhealthy.

Several of the alerts use Prometheus expressions as the metric that triggers the alert. For more information on how expressions work, you can refer to the Rancher [documentation about Prometheus expressions]({{< baseurl >}}
/rancher/v2.x/en/cluster-admin/tools/monitoring/expression/) or the Prometheus [documentation about querying metrics](https://prometheus.io/docs/prometheus/latest/querying/basics/).

>**Prerequisite:** Before you can receive cluster alerts, you must [add a notifier]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/notifiers/#adding-notifiers).

# Alerts for etcd
Etcd is the key-value store that contains the state of the Kubernetes cluster. If you provide monitoring on your cluster, Rancher provides default alerts if the monitoring detects a potential problem with etcd.

A leader is the node that handles all client requests that need cluster consensus. For more information, you can refer to this [explanation of how etcd works.](https://rancher.com/blog/2019/2019-01-29-what-is-etcd/#how-does-etcd-work)

### Alert: A high number of leader changes within the etcd cluster are happening
A warning alert is triggered when the leader changes more than three times in one hour.

The leader of the cluster can change in response to certain events. It is normal for the leader to change, but too many changes can indicate a problem with the network or a high CPU load. With longer latencies, the default etcd configuration may cause frequent heartbeat timeouts, which trigger a new leader election.

### Alert: Database usage close to the quota 500M
A warning alert is triggered when the size of etcd exceeds 524,288,000 bytes.

### Alert: Etcd is unavailable
A critical alert is triggered when etcd becomes unavailable.

### Alert: Etcd member has no leader
A critical alert is triggered when etcd does not have a leader for at least three minutes.

# Alerts for Kube Components
Rancher provides alerts when core Kubernetes system components become unhealthy.

### Alert: Controller Manager is unavailable
A critical warning is triggered when the cluster’s controller-manager becomes unavailable.

Controllers update Kubernetes resources based on changes in etcd. The [controller manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) monitors the cluster desired state through the Kubernetes API server and makes the necessary changes to the current state to reach the desired state.

### Alert: Scheduler is unavailable
A critical warning is triggered when the cluster’s scheduler becomes unavailable.

The [scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) service is a core component of Kubernetes. It is responsible for scheduling cluster workloads to nodes, based on various configurations, metrics, resource requirements and workload-specific requirements.

# Alerts for Events
Events can trigger alerts. 

### Alert: Get warning deployment event
A warning alert is triggered when a deployment event happens.

# Alerts for Node
Alerts can be triggered based on node metrics.

### Alert: High CPU load
A warning alert is triggered if the node uses more than 100 percent of the node’s available CPU seconds for at least three minutes.

### Alert: High node memory utilization
A warning alert is triggered if the node uses more than 80 percent of its available memory for at least three minutes.

### Alert: Node disk is running full within 24 hours
A critical alert is triggered if the disk space on the node is expected to run out in the next 24 hours based on the disk growth over the last 6 hours. 


# Project-level Alerts
When you enable monitoring for the project, some project-level alerts are provided.

### Alert: Less than half workload available
A critical alert is triggered if less than half of a workload is available, based on workloads where the key is `app` and the value is `workload.`

### Alert: Memory usage close to the quota
A warning alert is triggered if the project's memory usage exceeds the memory resource limits for the project.

