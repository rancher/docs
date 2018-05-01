---
title: Workloads
weight: 2175
draft: true
---

# Workloads

You can build any complex workload in Kubernetes using two basic constructs: pods and controllers.

## Workload Types

### Pods

A [_pod_](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) is one or more containers that share network namespaces and storage volumes. Most pods have just one container. For all practical purposes, therefore, you can think of a pod as a container. You scale pods the same way you scale containers, by having multiple instances of the same pod that implement a service.

### Controllers

_Controllers_ contain the management logic for your application workload. The management logic encapsulated in controllers can include replication, upgrade, and self-healing.

Kubernetes provide a number of built-in controllers such as:

- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [ReplicaSets](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [DaemonSets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
- [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

You can also define your own controllers. Controllers query the Kubernetes API and perform the necessary actions to make the actual state of the workload conform to the desired state of the workload specified in the Kubernetes database.


<!--## Service Types

Coming Soon-->
