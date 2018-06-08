---
title: Workloads
weight: 2175
---
You can build any complex workload in Kubernetes using two basic constructs: pods and controllers.

## Workload Types

### Pods

A [_pod_](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) is one or more containers that share network namespaces and storage volumes. Most pods have only one container. Therefore when we discuss _pods_, the term is often synonymous with _containers_. You scale pods the same way you scale containers, by having multiple instances of the same pod that implement a service.

### Controllers

_Controllers_ contain the management logic for your application workload. The management logic encapsulated in controllers can include replication, upgrade, and self-healing.

Kubernetes provide a number of built-in controllers such as:

- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [DaemonSets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
- [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

You can also define your own controllers. Controllers have the job of taking a workload that you create and recreating on each of your cluster nodes. Controllers query the Kubernetes API for the state of the workload within the Kubernetes database. Then the controllers reproduce that workload state on each cluster node.


<!--## Service Types

Coming Soon-->
