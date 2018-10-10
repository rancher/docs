---
title: Migrating from Rancher v1.6 Cattle to v2.x
weight: 10000
---

Rancher 2.0 has been rearchitected and rewritten with the goal of providing a complete management solution for Kubernetes and Docker.  Due to these extensive changes, there is no direct upgrade path from 1.6.x to 2.x, but rather a migration of your 1.6 application workloads into the 2.0 Kubernetes equivalent.  In 1.6, the most common orchestration used was Rancher's own engine called Cattle. The following blogs (that will be converted in an official guide)  explain and educate our Cattle users on running workloads in a Kubernetes environment.  

If you are an existing Kubernetes user on Rancher 1.6, you only need to review the [Get Started](#1-get-started) section to prepare you on what to expect on a new 2.0 Rancher cluster.

## Kubernetes Basics

Rancher 2.0 is built on the [Kubernetes](https://kubernetes.io/docs/home/?path=users&persona=app-developer&level=foundational) container orchestrator. This shift in underlying technology for 2.0 is a large departure from 1.6, which supported several popular container orchestrators. Since Rancher is now based entirely on Kubernetes, it's helpful to learn the Kubernetes basics.

The following table introduces and defines some key Kubernetes concepts.

| **Concept** | **Definition**                                                                                                                                                                                |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cluster     | A collection of machines that run containerized applications managed by Kubernetes.                                                                                                             |
| Namespace   | A virtual cluster, multiple of which can be supported by a single physical cluster.                                                                                                           |
| Node        | One of the physical (or virtual) machines that make up a cluster.                                                                                                                                |
| Pod         | The smallest and simplest Kubernetes object. A pod represents a set of running [containers](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/#why-containers) on your cluster. |
| Deployment  | An API object that manages a replicated application.                                                                                                                                          |
| Workload    | Units of work that are running on the cluster, these can be pods or deployments.                                                                                                             |


## Migration Cheatsheet

Because Rancher 1.6 defaulted to our Cattle container orchestrator, it primarily used terminology related to Cattle. However, because Rancher 2.0 uses Kubernetes, it aligns with the Kubernetes naming standard. This shift could be confusing for people unfamiliar with Kubernetes, so we've created a table that maps terms commonly used in Rancher 1.6 to their equivalents in Rancher 2.0.

| **Rancher 1.6** | **Rancher 2.0** |
| --- | --- |
| Container | Pod | 
| Services | Workload |
| Load Balancer | Ingress |
| Stack | Namespace | 
| Environment | Project (Administration)/Cluster (Compute)
| Host | Node | 
| Catalog | Helm |
<br/>
More detailed information on Kubernetes concepts can be found in the
[Kubernetes Concepts Documentation](https://kubernetes.io/docs/concepts/).


## Migration Plan

<!-- TOC -->

- [1. Get Started](#1-get-started)
- [2. Migrate Applications](#2-migrate-applications)
- [3. Expose Your Services](#3-expose-your-services)
- [4. Monitor Your Applications](#4-monitor-your-applications)
- [5. Schedule Deployments](#5-schedule-deployments)
- [6. Service Discovery](#6-service-discovery)
- [7. Load Balancing](#7-load-balancing)
<!--- [7. Load Balancing](#7-load-balancing)-->


<!-- /TOC -->

## 1. Get Started

As a Rancher 1.6 user who's interested in moving to 2.0, how should you get started with migration? The following blog provides a short checklist to help with this transition.

Blog Post: [Migrating from Rancher 1.6 to Rancher 2.0—A Short Checklist](https://rancher.com/blog/2018/2018-08-09-migrate-1dot6-setup-to-2dot0/)

## 2. Migrate Applications

In Rancher 1.6, you launch applications as _services_ and organize them under _stacks_ in an _environment_, which represents a compute and administrative boundary. Rancher 1.6 supports the Docker compose standard and provides import/export for application configurations using the following files: `docker-compose.yml` and `rancher-compose.yml`. In 2.0 the environment concept doesn't exist. Instead it's replaced by:

- **Cluster:** The compute boundary.
- **Project:** An administrative boundary.

The following article explores how to map Cattle's stack and service design to Kubernetes. It also demonstrates how to migrate a simple application from Rancher 1.6 to 2.0 using either the Rancher UI or Docker Compose.

Blog Post: [A Journey from Cattle to Kubernetes!](https://rancher.com/blog/2018/2018-08-02-journey-from-cattle-to-k8s/)

## 3. Expose Your Services

In Rancher 1.6, you could provide external access to your applications using port mapping. This article explores how to publicly expose your services in Rancher 2.0. It explores both UI and CLI methods to transition the port mapping functionality.

Blog Post: [From Cattle to Kubernetes—How to Publicly Expose Your Services in Rancher 2.0](https://rancher.com/blog/2018/expose-and-monitor-workloads/)

## 4. Monitor Your Applications

Rancher 1.6 provided TCP and HTTP healthchecks using its own healthcheck microservice. Rancher 2.0 uses native Kubernetes healthcheck support instead. This article overviews how to configure it in Rancher 2.0.

Blog Post: [From Cattle to Kubernetes—Application Healthchecks in Rancher 2.0](https://rancher.com/blog/2018/2018-08-22-k8s-monitoring-and-healthchecks/)

## 5. Schedule Deployments

Scheduling application containers on available resources is a key container orchestration technique. The following blog reviews how to schedule containers in Rancher 2.0 for those familiar with 1.6 scheduling labels (such as affinity and anti-affinity). It also explores how to launch a global service in 2.0.

Blog Post: [From Cattle to Kubernetes—Scheduling Workloads in Rancher 2.0](https://rancher.com/blog/2018/2018-08-29-scheduling-options-in-2-dot-0/)

## 6. Service Discovery

Rancher 1.6 provides service discovery within and across stacks using its own internal DNS microservice. It also supports pointing to external services and creating aliases. Moving to Rancher 2.0, you can replicate this same service discovery behavior. The following blog reviews this topic and the solutions needed to achieve service discovery parity in Rancher 2.0.

Blog Post: [From Cattle to Kubernetes—Service Discovery in Rancher 2.0](https://rancher.com/blog/2018/2018-09-04-service_discovery_2dot0/)

## 7. Load Balancing

How to achieve TCP/HTTP load balancing and configure hostname/path-based routing in Rancher 2.0.

Blog Post: [From Cattle to Kubernetes-How to Load Balance Your Services in Rancher 2.0](https://rancher.com/blog/2018/2018-09-13-load-balancing-options-2dot0/)

In Rancher 1.6, a Load Balancer was used to expose your applications from within the Rancher environment for external access. In Rancher 2.0, the concept is the same. There is a Load Balancer option to expose your services. In the language of Kubernetes, this function is more often referred to as an **Ingress**. In short, Load Balancer and Ingress play the same role.


## Migration Helper Tool

Rancher has developed a tool to help with the Rancher 1.6 to Rancher 2.0 migration. Users can download the tool binary from here https://github.com/rancher/migration-tools/releases

This tool will:

- Accept the Rancher 1.6 Docker Compose config files [docker-compose.yml and rancher-compose.yml] that users can export from Rancher 1.6 Stacks

- Output of the tool is a list of constructs present in the compose files that cannot be supported onto Rancher 2.0 Kubernetes platform without special handling or some parameters that cannot be converted to Kubernetes YAML using tools like Kompose.

This should help users to run a quick check to see if their application running on Rancher 1.6 can be migrated to 2.0 and what is lacking to do the migration.

**Usage**:

```migration-tools --docker-file <path to docker-compose.yml> --rancher-file <path to rancher-compose.yml if available>```

**Options**:

-   `--docker-file value`   An absolute path to an alternate Docker compose file (default: "docker-compose.yml")
-   `--rancher-file value`  An absolute path to an alternate Rancher compose file (default: "rancher-compose.yml")
-   `--help, -h`           show help
-   `--version, -v`        print the version

**Output**

- output.txt
		This tool will generate `output.txt` file to list all constructs for each service in your docker-compose.yml file that will need to be handled specially to sucessfully migrate them to Rancher 2.0. Under the construct, a link to the relevant blog is placed where users can find help on how to implement it on Rancher 2.0.
- Kubernetes YAML specs
		This tool also invokes the [Kompose tool](https://github.com/kubernetes/kompose) internally, and using Kompose it generates some Kubernetes YAML specs for the services to get started with migration.



