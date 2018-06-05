---
title: Workloads
weight: 2175
draft: true
---
You can build any complex containerized application in Kubernetes using two basic constructs: pods and workloads. Once application is built, it can be exposed for access either within the same cluster, or to the outside, using third construct - a service.

## Pods

A [_pod_](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/) is one or more containers that share network namespaces and storage volumes. Most pods have only one container. Therefore when we discuss _pods_, the term is often synonymous with _containers_. You scale pods the same way you scale containers, by having multiple instances of the same pod that implement a service. Usually pods get scaled and managed by the workload.

## Workloads

Workload is the entity that describes deployment rules for Kubernetes pods. Based on these rules, underlying Kubernetes controller will do the actual deployment, and update the workload object with the current application state.
Workload lets define the rules for application scheduling, scaling and upgrade.

Here are the most popular workload types supported by Kubernetes:

- [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [DaemonSets](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
- [Jobs](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/)
- [CronJobs](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)


Choose **Deployment** when your application is stateless, meaning you don't have to keep the state in your workload. Pods managed by this workload, are treated as independent and disposable - if one pod goes bad, it will be removed and recreated. Example of deployment application would be an nginx webserver.

And the opposite, go with the **StatefulSet** when your application needs to store the data, where an every pod has a sticky identity. Distributed stateful workload like Zookeeper, and database application like mysql would make a perfect candidate for a statefulset.

A **Daemonset** workload ensures that every node in the cluster would get a copy of the pod. For use cases where you have to do log collecting or node performance monitoring, this daemon-like workload is what works the best.

Sometimes you need to run a finite task to completion as opposed to managing an ongoing desired application state. You can do it with **Job** workload, which will launch one or more pods and ensure that a specified number of them successfully terminate.

**CronJob** is similar to job, only it runs to completion on a cron job based schedule.



## Services

In many cases, workload has to be accessed by other workloads in the cluster, or be exposed to the outside world. The most popular way to achieve that in Kubernetes is by creating a separate object called *Service*. Service gets mapped to the underlying workload's pods using [selector/label approach](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#service-and-replicationcontroller). Rancher UI simplifies it by automatically creating a service along with the workload, using service port and type specified by the user.

There are several types of services:

* [ClusterIP](https://kubernetes.io/docs/concepts/services-networking/service/#defining-a-service)
* [NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport)
* [LoadBalancer](https://kubernetes.io/docs/concepts/services-networking/service/#type-loadbalancer)

**ClusterIP** service enabled internal access to the application by programming clusterIP that proxies traffic to the underlying pods.

If the application needs to be accessed from the outside, it needs its port to be published on Kubernetes node. **NodePort** service is the most easy way to achieve that. Enabling NodePort service access for the workload, results in the port from 30000–32767 (configurable) range to be published on every node in Kubernetes cluster.

**LoadBalancer** service is another way to expose the service to the internet. It has to be backed up by Cloud Provider Load Balancer, so option is available on Kubernetes clusters like GKE, EKS, AKS and EC2 (with CloudProvider option explicitly set to Amazon in Rancher UI).
