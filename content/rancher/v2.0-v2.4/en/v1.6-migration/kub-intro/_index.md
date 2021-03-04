---
title: Kubernetes Introduction
weight: 1
---

Rancher v2.x is built on the [Kubernetes](https://kubernetes.io/docs/home/?path=users&persona=app-developer&level=foundational) container orchestrator. This shift in underlying technology for v2.x is a large departure from v1.6, which supported several popular container orchestrators. Since Rancher is now based entirely on Kubernetes, it's helpful to learn the Kubernetes basics.

The following table introduces and defines some key Kubernetes concepts.

| **Concept** | **Definition**                                                                                                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cluster     | A collection of machines that run containerized applications managed by Kubernetes.                                                                                                             |
| Namespace   | A virtual cluster, multiple of which can be supported by a single physical cluster.                                                                                                           |
| Node        | One of the physical or virtual machines that make up a cluster.                                                                                                                                |
| Pod         | The smallest and simplest Kubernetes object. A pod represents a set of running [containers](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/#why-containers) on your cluster. |
| Deployment  | An API object that manages a replicated application.                                                                                                                                          |
| Workload    | Workloads are objects that set deployment rules for pods.                                                                                                                                     |


## Migration Cheatsheet

Because Rancher v1.6 defaulted to our Cattle container orchestrator, it primarily used terminology related to Cattle. However, because Rancher v2.x uses Kubernetes, it aligns with the Kubernetes naming standard. This shift could be confusing for people unfamiliar with Kubernetes, so we've created a table that maps terms commonly used in Rancher v1.6 to their equivalents in Rancher v2.x.

| **Rancher v1.6** | **Rancher v2.x** |
| --- | --- |
| Container | Pod |
| Services | Workload |
| Load Balancer | Ingress |
| Stack | Namespace |
| Environment | Project (Administration)/Cluster (Compute)
| Host | Node |
| Catalog | Helm |
| Port Mapping | HostPort (Single Node)/NodePort (All Nodes) |

<br/>
More detailed information on Kubernetes concepts can be found in the
[Kubernetes Concepts Documentation](https://kubernetes.io/docs/concepts/).

### [Next: Get Started]({{<baseurl>}}/rancher/v2.0-v2.4/en/v1.6-migration/get-started/)
