---
title: Migrating from Rancher v1.6 Cattle to v2.x
weight: 10000
---

Rancher 2.x has been rearchitected and rewritten with the goal of providing a complete management solution for Kubernetes and Docker.  Due to these extensive changes, there is no direct upgrade path from 1.6.x to 2.x, but rather a migration of your 1.6 application workloads into the 2.x Kubernetes equivalent.  In 1.6, the most common orchestration used was Rancher's own engine called Cattle. The following blogs (that will be converted in an official guide)  explain and educate our Cattle users on running workloads in a Kubernetes environment.

If you are an existing Kubernetes user on Rancher 1.6, you only need to review the [Get Started](#1-get-started) section to prepare you on what to expect on a new 2.x Rancher cluster.

## Kubernetes Basics

Rancher 2.x is built on the [Kubernetes](https://kubernetes.io/docs/home/?path=users&persona=app-developer&level=foundational) container orchestrator. This shift in underlying technology for 2.x is a large departure from 1.6, which supported several popular container orchestrators. Since Rancher is now based entirely on Kubernetes, it's helpful to learn the Kubernetes basics.

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

Because Rancher 1.6 defaulted to our Cattle container orchestrator, it primarily used terminology related to Cattle. However, because Rancher 2.x uses Kubernetes, it aligns with the Kubernetes naming standard. This shift could be confusing for people unfamiliar with Kubernetes, so we've created a table that maps terms commonly used in Rancher 1.6 to their equivalents in Rancher 2.x.

| **Rancher 1.6** | **Rancher 2.x** |
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
- [2. Run Migration-Tools CLI](#2-run-migration-tools-cli)
- [3. Migrate Applications](#3-migrate-applications)
- [4. Expose Your Services](#4-expose-your-services)
- [5. Monitor Your Applications](#5-monitor-your-applications)
- [6. Schedule Deployments](#6-schedule-deployments)
- [7. Service Discovery](#7-service-discovery)
- [8. Load Balancing](#8-load-balancing)

<!-- /TOC -->

## 1. Get Started

As a Rancher 1.6 user who's interested in moving to 2.x, how should you get started with migration? The following blog provides a short checklist to help with this transition.

Blog Post: [Migrating from Rancher 1.6 to Rancher 2.x—A Short Checklist](https://rancher.com/blog/2018/2018-08-09-migrate-1dot6-setup-to-2dot0/)

## 2. Run Migration-Tools CLI

The migration-tools CLI is a tool that helps you recreate your applications in Rancher v2.x. This tool exports your Rancher v1.6 applications as Compose files and converts them to a Kubernetes manifest that Rancher 2.x can consume.

This command line interface tool:

- Exports Compose files (i.e., `docker-compose.yml` and `rancher-compose.yml`) for all your stacks that are Cattle environments in your Rancher 1.6 server. For every stack, files are exported to a `<EXPORT_DIR>/<ENV_NAME>/<STACK_NAME>` folder.

- Parses Compose files that you've exported from your Rancher 1.6 stack and converts them to a Kubernetes manifest that Rancher v2.x can consume. The tool also outputs a list of constructs present in the Compose files that cannot be converted automatically to Rancher 2.x. These are directives that you'll have to manually configure in the Kubernetes YAML.

### A. Download Migration-Tools CLI

The migration-tools CLI for your platform can be downloaded from our [GitHub releases page](https://github.com/rancher/migration-tools/releases). The tools are available for Linux, Mac, and Windows platforms.


### B. Configure Migration-Tools CLI

After you download migration-tools CLI, rename it and make it executable.


1. Open Terminal and change to the directory that contains the migration-tools file.

1. Rename the file to `migration-tools` so that it no longer includes the platform name.

1. Enter the following command to make `migration-tools` an executable:

    ```
    chmod +x migration-tools
    ```

### C. Run Migration-Tools CLI

Next, use the migration-tools CLI to export all stacks in all of the Cattle environments into Compose files. Then, for stacks that you want to migrate to Rancher 2.x, convert the Compose files into Kubernetes YAML.

>**Want full usage and options for the migration-tools CLI?** See the [Migration-Tools CLI Reference]({{< baseurl >}}/rancher/v2.x/en/v1.6-migration/migration-tools-ref).

1. Export the Compose files for all stacks in all of the Cattle environments in your Rancher 1.6 server.

    Execute the following command, replacing each placeholder with your values. The access key and secret key are Account API keys, which will allow you to export from all Cattle environments.

    ```
    migration-tools export --url <RANCHER_URL> --access-key <RANCHER_ACCESS_KEY> --secret-key <RANCHER_SECRET_KEY> --export-dir <EXPORT_DIR>
    ```

    **Step Result:** The migration-tools CLI exports Compose files for each stack in every Cattle environments in the `--export-dir` directory. If you omitted this option, the files are saved to your current directory.


1. Convert the exported Compose files for a stack to Kubernetes YAML.

    Execute the following command, replacing each placeholder with the absolute path to your stack's Compose files. For each stack, you'll have to re-run the command for each pair of Compose files that was exported.

    ```
    migration-tools parse --docker-file <DOCKER_COMPOSE_ABSOLUTE_PATH> --rancher-file <RANCHER_COMPOSE_ABSOLUTE_PATH>
    ```

    >**Note:** If you omit the `--docker-file` and `--rancher-file` options from your command, the migration-tools CLI checks its home directory for these Compose files.

    **Step Result:** The migration-tools CLI parses your Compose files and outputs Kubernetes YAML specs as well as an `output.txt` file. For each service in the stack, a YAML spec file is created and named the same as your service. The `output.txt` file lists all constructs for each service in `docker-compose.yml` that requires special handling to be successfully migrated to Rancher 2.x. Each construct links to the relevant blog articles on how to implement it in Rancher 2.x (these articles are also listed below). 

## 3. Migrate Applications

In Rancher 1.6, you launch applications as _services_ and organize them under _stacks_ in an _environment_, which represents a compute and administrative boundary. Rancher 1.6 supports the Compose standard and provides import/export for application configurations using the following files: `docker-compose.yml` and `rancher-compose.yml`. In 2.x the environment concept doesn't exist. Instead it's replaced by:

- **Cluster:** The compute boundary.
- **Project:** An administrative boundary.

The following article explores how to map Cattle's stack and service design to Kubernetes. It also demonstrates how to migrate a simple application from Rancher 1.6 to 2.x using either the Rancher UI or Docker Compose.

Blog Post: [A Journey from Cattle to Kubernetes!](https://rancher.com/blog/2018/2018-08-02-journey-from-cattle-to-k8s/)

## 4. Expose Your Services

In Rancher 1.6, you could provide external access to your applications using port mapping. This article explores how to publicly expose your services in Rancher 2.x. It explores both UI and CLI methods to transition the port mapping functionality.

Blog Post: [From Cattle to Kubernetes—How to Publicly Expose Your Services in Rancher 2.x](https://rancher.com/blog/2018/expose-and-monitor-workloads/)

## 5. Monitor Your Applications

Rancher 1.6 provided TCP and HTTP healthchecks using its own healthcheck microservice. Rancher 2.x uses native Kubernetes healthcheck support instead. This article overviews how to configure it in Rancher 2.x.

Blog Post: [From Cattle to Kubernetes—Application Healthchecks in Rancher 2.x](https://rancher.com/blog/2018/2018-08-22-k8s-monitoring-and-healthchecks/)

## 6. Schedule Deployments

Scheduling application containers on available resources is a key container orchestration technique. The following blog reviews how to schedule containers in Rancher 2.x for those familiar with 1.6 scheduling labels (such as affinity and anti-affinity). It also explores how to launch a global service in 2.x.

Blog Post: [From Cattle to Kubernetes—Scheduling Workloads in Rancher 2.x](https://rancher.com/blog/2018/2018-08-29-scheduling-options-in-2-dot-0/)

## 7. Service Discovery

Rancher 1.6 provides service discovery within and across stacks using its own internal DNS microservice. It also supports pointing to external services and creating aliases. Moving to Rancher 2.x, you can replicate this same service discovery behavior. The following blog reviews this topic and the solutions needed to achieve service discovery parity in Rancher 2.x.

Blog Post: [From Cattle to Kubernetes—Service Discovery in Rancher 2.x](https://rancher.com/blog/2018/2018-09-04-service_discovery_2dot0/)

## 8. Load Balancing

How to achieve TCP/HTTP load balancing and configure hostname/path-based routing in Rancher 2.x.

Blog Post: [From Cattle to Kubernetes-How to Load Balance Your Services in Rancher 2.x](https://rancher.com/blog/2018/2018-09-13-load-balancing-options-2dot0/)

In Rancher 1.6, a load balancer was used to expose your applications from within the Rancher environment for external access. In Rancher 2.x, the concept is the same. There is a Load Balancer option to expose your services. In the language of Kubernetes, this function is more often referred to as an _Ingress_. In short, load balancer and Ingress play the same role.
