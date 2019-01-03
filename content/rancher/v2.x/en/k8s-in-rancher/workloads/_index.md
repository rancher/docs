---
title: Workloads
weight: 3025
aliases:
  - /rancher/v2.x/en/concepts/workloads/
  - /rancher/v2.x/en/tasks/workloads/
---

You can build any complex containerized application in Kubernetes using two basic constructs: pods and workloads. Once you build an application, you can expose it for access either within the same cluster or on the Internet using a third construct: services.

## In This Document

<!-- TOC -->

- [Pods](#pods)
- [Workloads](#workloads)

    - [Workload Types](#workload-types)
    - [Multi-Cluster Applications](#multi-cluster-applications)

        - [Multi-Cluster Application Notes](#multi-cluster-application-notes)
        - [Multi-Cluster Application Upgrades](#multi-cluster-application-upgrades)
- [Workload Step-by-Step](#workload-step-by-step)
- [Services](#services)

    - [Service Types](#service-types)

<!-- /TOC -->

## Pods

[_Pods_](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) are one or more containers that share network namespaces and storage volumes. Most pods have only one container. Therefore when we discuss _pods_, the term is often synonymous with _containers_. You scale pods the same way you scale containers—by having multiple instances of the same pod that implement a service. Usually pods get scaled and managed by the workload.

## Workloads

_Workloads_ are objects that set deployment rules for pods. Based on these rules, Kubernetes performs the deployment and updates the workload with the current state of the application.

Workloads let you define the rules for application scheduling, scaling, and upgrade.

### Workload Types

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

### Multi-Cluster Applications

_Available as of v2.2.0_

In use cases where you need to deploy a common workload to multiple clusters or projects, deploy it using a multi-cluster application. A multi-cluster application is a Helm chart template that stores a unique workload configuration. When you deploy a multi-cluster application, this template replicates a unique workload for each deployment target (i.e., clusters or projects) that you choose.

Multi-cluster applications are beneficial because they reduce the repetition of deploying individual workloads to each target. They also reduce the likelihood of user error during workload configuration, as you only have to configure a single object rather than a unique object for each target. Additionally, because multi-cluster workloads are a single object, they simplify routine maintenance. For example, rather than upgrading several unique workloads, you can upgrade the multi-cluster application, which then replicates to each target. 

You can deploy a multi-cluster application using either a regular deployment or a catalog deployment. Multi-cluster workloads deployed by Helm chart can be upgraded or reconfigured by editing its catalog application object. 


#### Multi-Cluster Application Notes

- When deploying a multi-cluster application, you can schedule it to either individual clusters/projects or _all_ of your clusters/projects.

- Before you can connect to a multi-cluster workload using a hostname or alias, you must first configure global DNS, which enables service discovery across clusters, allowing services from different clusters to be mapped.

- Using RBAC, you can configure multi-cluster apps to share them among users holding membership in different clusters or projects. 

#### Multi-Cluster Application Upgrades

When upgrading a multi-cluster application, you can configure an upgrade strategy to optimize network speed and upgrade reliability for your environment. 

The batch size option lets you choose how many target-side workloads can upgraded simultaneously during rolling waves, optimizing network speed and upgrade reliability for your environment, just as you can with any other workload.

## Workload Step-by-Step

Follow the links below for step-by-step instructions on deploying workloads and using workload options.

- [Deploy Workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/deploy-workloads/)
- [Upgrade Workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/upgrade-workloads/)
- [Rollback Workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/rollback-workloads/)

## Services

In many use cases, a workload has to be either:

- Accessed by other workloads in the cluster.
- Exposed to the outside world.

You can achieve these goals by creating a _Service_. Services are mapped to the underlying workload's pods using a [selector/label approach (view the code samples)](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#service-and-replicationcontroller). Rancher UI simplifies this mapping process by automatically creating a service along with the workload, using the service port and type that you select.

### Service Types

There are several types of services available in Rancher. The descriptions below are sourced from the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/services-networking/service/#publishing-services-service-types).

- **ClusterIP**

    >Exposes the service on a cluster-internal IP. Choosing this value makes the service only reachable from within the cluster. This is the default `ServiceType`.

- **NodePort**

    >Exposes the service on each Node’s IP at a static port (the `NodePort`). A `ClusterIP` service, to which the `NodePort` service will route, is automatically created. You’ll be able to contact the `NodePort` service, from outside the cluster, by requesting `<NodeIP>:<NodePort>`.

- **LoadBalancer**

    >Exposes the service externally using a cloud provider’s load balancer. `NodePort` and `ClusterIP` services, to which the external load balancer will route, are automatically created.


## Related Links

- [Services](https://kubernetes.io/docs/concepts/services-networking/service/)
