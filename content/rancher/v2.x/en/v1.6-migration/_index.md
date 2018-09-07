---
title: Migrating from Rancher v1.6 to v2.x
weight: 10000
draft: true
---

In Rancher 1.6, Cattle was the default container-orchestration platform. Rancher users preferred Cattle for creating and managing applications based on Docker containers. With the release of Rancher 2.0, Kubernetes replaces Cattle as the default orchestration platform, bringing new technology and specifications. Thus, Cattle users who want to upgrade to Rancher 2.0 must find ways to migrate their apps from 1.6 to 2.0.

In this blog series, we explore how you can map features from Cattle in Rancher 1.6 to Kubernetes in Rancher 2.0.

### Checklist for Migration from a 1.6 Setup to 2.0  

Rancher 2.0 differs from Rancher 1.6 because it brings in a new orchestration technology, Kubernetes. Currently, there is no straightforward upgrade path available between Rancher 1.6 and Rancher 2.0.

As a Rancher 1.6 user who’s interested in moving your setup to 2.0, what steps should you take? The following blog provides a short checklist to help with this transition.

Blog Post: https://rancher.com/blog/2018/2018-08-09-migrate-1dot6-setup-to-2dot0/

### Rancher 1.6 Stack, Service, Environment and the Parallels in Rancher 2.0

In Rancher 1.6, you launch applications as _services_, and you organize them under _stacks_ in an _environment_. Rancher 1.6 supports the Docker compose standard and provides import/export for application configurations using the following file types: `docker-compose.yml` and `rancher-compose.yml`.

The following article explores how to map Cattle's stack and service design to Kubernetes. It also demonstrates how to migrate a simple application from Rancher 1.6 to 2.0 using either the Rancher UI or Docker Compose.

Blog Post: https://rancher.com/blog/2018/2018-08-02-journey-from-cattle-to-k8s/

### Exposing Your Services Publicly—Port Mapping in Rancher 2.0

In Rancher 1.6, you could provide external access to your applications using port mapping. This article explores how to publicly expose your services in Rancher 2.0. It explores both UI and CLI methods to transition the port mapping functionality to 2.0.

Blog Post: https://rancher.com/blog/2018/expose-and-monitor-workloads/

### Monitoring Your Application using Healthchecks in Rancher 2.0

Rancher 1.6 provided TCP and HTTP healthchecks using its own healthcheck microservice. This article overviews healthcheck support and how to configure it in Rancher 2.0.

Blog Post: https://rancher.com/blog/2018/2018-08-22-k8s-monitoring-and-healthchecks/

### Scheduling Rules for Placement of Service Containers & Global Services in Rancher 2.0

Scheduling application containers on available resources is a key container orchestration technique. The following blog reviews how to schedule containers in Rancher 2.0 for those familiar with 1.6 scheduling labels (such as affinity and anti-affinity). It also explores how to launch a global service in 2.0.

Blog Post: Coming soon!

### Service Discovery: Rancher Internal DNS

Rancher 1.6 provides service discovery within and across stacks using its own internal DNS microservice. It also supports pointing to external services and creating aliases. Moving to Rancher 2.0, you can replicate this same service discovery behavior. The following blog reviews this topic and the solutions needed to achieve service discovery parity in Rancher 2.0.

Blog Post: Coming soon!

### Load Balancing

How to achieve TCP/HTTP load balancing and configure hostname/path-based routing in Rancher 2.0.

Blog Post: Coming soon!


s we near the end of the development process for Rancher 2.0, we thought it might be useful to provide a glossary of terms that will help Rancher users understand the fundamental concepts in Kubernetes and Rancher.

In the move from Rancher 1.6 to Rancher 2.0, we have aligned more with the Kubernetes naming standard. This shift could be confusing for people who have only used Cattle environments under Rancher 1.6.

This article aims to help you understand the new concepts in Rancher 2.0. It can also act as an easy reference for terms and concepts between the container orchestrators Cattle and Kubernetes.

## Rancher 1.6 Cattle compared with Rancher 2.0 Kubernetes

Rancher 1.6 offered Cattle as a container orchestrator and many users chose to use it. In Cattle, you have an **environment** , which is both an administrative and a compute boundary, i.e., the lowest level at which you can assign permissions; importantly, all hosts in that environment were dedicated to that environment and that environment alone. Then, to organize your containers, you had a **Stack** , which was a logical grouping of a collection of services, with a service being a particular running image.

So, how does this structure look under under 2.0?

 If you are working in the container space, then it is unlikely that you haven&#39;t heard some of the buzz words around Kubernetes, such as **pods, namespaces** and **nodes**. What this article aims to do is ease the transition from Cattle to Kubernetes by aligning the terms of both orchestrators. Along with some of the names changing, some of the capabilities have changed as well.

#### The following table gives a definition of some of the core Kubernetes concepts

| **Concept** | **Definition** |
| --- | --- |
| Cluster | Collection of machines that run containerized applications managed by Kubernetes |
| Namespace | A virtual cluster, multiple of which can be supported by a single physical cluster |
| Node | One of the physical (virtual) machines that make up a cluster |
| Pod | The smallest and simplest Kubernetes object. A Pod represents a set of running [containers](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/#why-containers) on your cluster |
| Deployment | An API object that manages a replicated application |
| Workload | Units of work that are running on the cluster, these can be pods, or deployments. |

>  _More detailed information on Kubernetes concepts can be found at
[https://kubernetes.io/docs/concepts/](https://kubernetes.io/docs/concepts/)_

### ENVIRONMENTS

The environment in Rancher 1.6 represented 2 things:

- The Compute boundary
- The administrative boundary

In 2.0 the environment concept doesn&#39;t exist, instead it becomes replaced by:

- **Cluster** – The compute boundary
- **Project** – An administrative boundary

A **Project** is an administrative layer introduced by Rancher to ease the burden of administration in Kubernetes.

### HOST

In Cattle, a host could only belong to one environment, things are similar in that **nodes** (the new name for hosts!) can only belong to one **cluster**. What used to be an environment with hosts, is now a cluster with nodes.

### STACK

A stack in Rancher 1.6 is a way to group a number of services. In Rancher 2.0 this is done via **namespaces**.

### SERVICE

In Rancher 1.6, a service was defined as one or more instances of the same container running. In Rancher 2.0, one or more instances of the same container running are defined as a **workload** , where a **workload** can be made up of a **pod** (s) running with a controller.

### CONTAINER

A container image is a lightweight, stand-alone, executable package of a piece of software that includes everything needed to run it: code, runtime, system tools, system libraries, settings, etc. Within Rancher 1.6, a container was the minimal definition required to run an application. Under Kubernetes, a pod is the minimal definition. A **pod** can be a single image, or it can be a number of images that all share the same storage/network and description of how they interact. **Pod** contents are always co-located and co-scheduled, and run in a shared context.

### LOAD BALANCER

In Rancher 1.6, a Load Balancer was used to expose your applications from within the Rancher environment for access externally. In Rancher 2.0, the concept is the same. There is a Load Balancer option to expose your services. In the language of Kubernetes, this function is more often referred to as an **Ingress**. In short, Load Balancer and Ingress play the same role.

## Conclusion

In terms of concepts, Cattle was the closest orchestrator to Kubernetes out of all of the orchestrators. Hopefully this article will act as an easy reference for people moving from Rancher 1.6 to 2.0. Plus, the similarity between the two orchestrators should allow for an easier transition.

#### The following table gives a quick reference for the old versus new terms.

| **Rancher 1.6** | **Rancher 2.0** |
| --- | --- |
| Container | Pod |
| Services | Workload |
| Load Balancer | Ingress |
| Stack | Namespace |
| Environment | Project (Administration)/Cluster (Compute) |
| Host | Node |
| Catalog | Helm |


> _For further reading and training, check out our free online training series: [Introduction to Kubernetes and Rancher](https://rancher.com/training/)._
