---
title: "Kubernetes Workloads and Pods"
description: "Learn about the two constructs with which you can build any complex containerized application in Kubernetes: Kubernetes workloads and pods"
weight: 3025
aliases:
  - /rancher/v2.5/en/concepts/workloads/
  - /rancher/v2.5/en/tasks/workloads/
  - /rancher/v2.5/en/k8s-in-rancher/workloads
---

You can build any complex containerized application in Kubernetes using two basic constructs: pods and workloads. Once you build an application, you can expose it for access either within the same cluster or on the Internet using a third construct: services.

### Pods

[_Pods_](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) are one or more containers that share network namespaces and storage volumes. Most pods have only one container. Therefore when we discuss _pods_, the term is often synonymous with _containers_. You scale pods the same way you scale containers—by having multiple instances of the same pod that implement a service. Usually pods get scaled and managed by the workload.

### Workloads

_Workloads_ are objects that set deployment rules for pods. Based on these rules, Kubernetes performs the deployment and updates the workload with the current state of the application.
Workloads let you define the rules for application scheduling, scaling, and upgrade.

#### Workload Types

Kubernetes divides workloads into different types. The most popular types supported by Kubernetes are:

- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

    _Deployments_ are best used for stateless applications (i.e., when you don't have to maintain the workload's state). Pods managed by deployment workloads are treated as independent and disposable. If a pod encounters disruption, Kubernetes removes it and then recreates it. An example application would be an Nginx web server.

- [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)

    _StatefulSets_, in contrast to deployments, are best used when your application needs to maintain its identity and store data. An application would be something like Zookeeper—an application that requires a database for storage.

- [DaemonSets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)

    _Daemonsets_ ensures that every node in the cluster runs a copy of pod. For use cases where you're collecting logs or monitoring node performance, this daemon-like workload works best.

- [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/)

    _Jobs_ launch one or more pods and ensure that a specified number of them successfully terminate. Jobs are best used to run a finite task to completion as opposed to managing an ongoing desired application state.

- [CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

    _CronJobs_ are similar to jobs. CronJobs, however, runs to completion on a cron-based schedule.

### Services

In many use cases, a workload has to be either:

- Accessed by other workloads in the cluster.
- Exposed to the outside world.

You can achieve these goals by creating a _Service_. Services are mapped to the underlying workload's pods using a [selector/label approach (view the code samples)](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#service-and-replicationcontroller). Rancher UI simplifies this mapping process by automatically creating a service along with the workload, using the service port and type that you select.

#### Service Types

There are several types of services available in Rancher. The descriptions below are sourced from the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types).

- **ClusterIP**

    >Exposes the service on a cluster-internal IP. Choosing this value makes the service only reachable from within the cluster. This is the default `ServiceType`.

- **NodePort**

    >Exposes the service on each Node’s IP at a static port (the `NodePort`). A `ClusterIP` service, to which the `NodePort` service will route, is automatically created. You’ll be able to contact the `NodePort` service, from outside the cluster, by requesting `<NodeIP>:<NodePort>`.

- **LoadBalancer**

    >Exposes the service externally using a cloud provider’s load balancer. `NodePort` and `ClusterIP` services, to which the external load balancer will route, are automatically created.

## Workload Options

This section of the documentation contains instructions for deploying workloads and using workload options.

- [Deploy Workloads]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/workloads/deploy-workloads/)
- [Upgrade Workloads]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/workloads/upgrade-workloads/)
- [Rollback Workloads]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/workloads/rollback-workloads/)

## Related Links

### External Links

- [Services](https://kubernetes.io/docs/concepts/services-networking/service/)
