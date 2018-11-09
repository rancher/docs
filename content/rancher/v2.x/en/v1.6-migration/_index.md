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
- [2. Run Migration-Tools CLI](#2-run-migration-tools-cli)
- [3. Migrate Applications](#3-migrate-applications)
- [4. Expose Your Services](#4-expose-your-services)
- [5. Monitor Your Applications](#5-monitor-your-applications)
- [6. Schedule Deployments](#6-schedule-deployments)
- [7. Service Discovery](#7-service-discovery)
- [8. Load Balancing](#8-load-balancing)

<!-- /TOC -->

## 1. Get Started

As a Rancher 1.6 user who's interested in moving to 2.0, how should you get started with migration? The following blog provides a short checklist to help with this transition.

Blog Post: [Migrating from Rancher 1.6 to Rancher 2.0—A Short Checklist](https://rancher.com/blog/2018/2018-08-09-migrate-1dot6-setup-to-2dot0/)

## 2. Run Migration-Tools CLI

The migration-tools CLI is a tool that helps you recreate your applications in Rancher v2.0. This tool exports your Rancher v1.6 applications as Docker Compose files and converts them to a Kubernetes manifest that Rancher 2.0 can consume. 

This command line interface tool:

- Exports Docker Compose files (i.e., `docker-compose.yml` and `rancher-compose.yml`) from your stacks running on `cattle` environments in your Rancher 1.6 system. For every stack, files are exported to the `<EXPORT_DIR>/<ENV_NAME>/<STACK_NAME>` folder.

- Parses Docker Compose files that you've exported from your Rancher 1.6 Stacks and converts them to a Kubernetes manifest that Rancher v2.0 can consume. The tool also outputs a list of constructs present in the Compose files that cannot be ported automatically to Rancher 2.0—you'll have to port them manually.

### A. Download Migration-Tools CLI

The migration-tools CLI for your platform can be downloaded from our [GitHub releases page](https://github.com/rancher/migration-tools/releases). The tools are  available for Linux, Mac, and Windows platforms.


### B. Configure Migration-Tools CLI

After the tools are downloaded, you need to make some configurations to run them.

1. Modify the migration-tools CLI file to make it an executable.

    1. Open Terminal and change to the directory that contains the migration-tool file.

    1. Rename the file to `migration-tools` so that it no longer includes the platform name.

    1. Enter the following command to make `migration-tools` an executable:

        ```
        chmod +x migration-tools
        ```

### C. Run Migration-Tools CLI

Next, use the migration-tools CLI to export your Cattle environments from Rancher 1.6 as Docker Compose files. Then, for environments that you want to migrate to Rancher 2.0, convert its Compose file into Kubernetes YAML.

>**Want full usage and options for the migration-tools CLI?** See the [Migration-Tools CLI Reference]({{< baseurl >}}/rancher/v2.x/en/v1.6-migration/migration-tools-ref).

1. Export the Docker Compose files for your Cattle environments from Rancher 1.6.

    From Terminal, execute the following command, replacing each placeholder with your values.

    ```
    migration-tools export --url <RANCHER_URL> --access-key <RANCHER_ACCESS_KEY> --secret-key <RANCHER_SECRET_KEY> --export-dir <EXPORT_DIR>
    ```

    **Step Result:** The migration-tools CLI exports Compose files for each of your Cattle environments in the `--export-dir` directory. If you omitted this option, Compose files are output to your current directory.


1. Convert the exported Compose files to Kubernetes YAML. 

    Execute the following command, replacing each placeholder with the absolute path to your Stack's Compose files. If you want to migrate multiple stacks, you'll have to re-run the command for each pair of Compose files that you exported.

    ```
    migration-tools parse --docker-file <DOCKER_COMPOSE_ABSOLUTE_PATH> --rancher-file <RANCHER_COMPOSE_ABSOLUTE_PATH>
    ```

    >**Note:** If you omit the `--docker-file` and `--rancher-file` options from your command, the migration-tools CLI checks its home directory for Compose files.


#### Output

After you run the migration-tools cli `parse` command, the following files are output to your target directory.

| Output                | Description                                                                                                                                                                                                                                                                                                                      |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `output.txt`          | This file lists all constructs for each service in `docker-compose.yml` that requires special handling to be successfully migrated to Rancher 2.0. Each construct links to the relevant blog articles on how to implement it in Rancher 2.0 (these articles are also listed below). |
| Kubernetes YAML specs | Mirgation-tools internally invokes [Kompose](https://github.com/kubernetes/kompose) to generate Kubernetes YAML specs for each service you're migrating to 2.0. Each YAML spec file is named for the service you're migrating.

## 3. Migrate Applications

In Rancher 1.6, you launch applications as _services_ and organize them under _stacks_ in an _environment_, which represents a compute and administrative boundary. Rancher 1.6 supports the Docker compose standard and provides import/export for application configurations using the following files: `docker-compose.yml` and `rancher-compose.yml`. In 2.0 the environment concept doesn't exist. Instead it's replaced by:

- **Cluster:** The compute boundary.
- **Project:** An administrative boundary.

The following article explores how to map Cattle's stack and service design to Kubernetes. It also demonstrates how to migrate a simple application from Rancher 1.6 to 2.0 using either the Rancher UI or Docker Compose.

Blog Post: [A Journey from Cattle to Kubernetes!](https://rancher.com/blog/2018/2018-08-02-journey-from-cattle-to-k8s/)

## 4. Expose Your Services

In Rancher 1.6, you could provide external access to your applications using port mapping. This article explores how to publicly expose your services in Rancher 2.0. It explores both UI and CLI methods to transition the port mapping functionality.

Blog Post: [From Cattle to Kubernetes—How to Publicly Expose Your Services in Rancher 2.0](https://rancher.com/blog/2018/expose-and-monitor-workloads/)

## 5. Monitor Your Applications

Rancher 1.6 provided TCP and HTTP healthchecks using its own healthcheck microservice. Rancher 2.0 uses native Kubernetes healthcheck support instead. This article overviews how to configure it in Rancher 2.0.

Blog Post: [From Cattle to Kubernetes—Application Healthchecks in Rancher 2.0](https://rancher.com/blog/2018/2018-08-22-k8s-monitoring-and-healthchecks/)

## 6. Schedule Deployments

Scheduling application containers on available resources is a key container orchestration technique. The following blog reviews how to schedule containers in Rancher 2.0 for those familiar with 1.6 scheduling labels (such as affinity and anti-affinity). It also explores how to launch a global service in 2.0.

Blog Post: [From Cattle to Kubernetes—Scheduling Workloads in Rancher 2.0](https://rancher.com/blog/2018/2018-08-29-scheduling-options-in-2-dot-0/)

## 7. Service Discovery

Rancher 1.6 provides service discovery within and across stacks using its own internal DNS microservice. It also supports pointing to external services and creating aliases. Moving to Rancher 2.0, you can replicate this same service discovery behavior. The following blog reviews this topic and the solutions needed to achieve service discovery parity in Rancher 2.0.

Blog Post: [From Cattle to Kubernetes—Service Discovery in Rancher 2.0](https://rancher.com/blog/2018/2018-09-04-service_discovery_2dot0/)

## 8. Load Balancing

How to achieve TCP/HTTP load balancing and configure hostname/path-based routing in Rancher 2.0.

Blog Post: [From Cattle to Kubernetes-How to Load Balance Your Services in Rancher 2.0](https://rancher.com/blog/2018/2018-09-13-load-balancing-options-2dot0/)

In Rancher 1.6, a Load Balancer was used to expose your applications from within the Rancher environment for external access. In Rancher 2.0, the concept is the same. There is a Load Balancer option to expose your services. In the language of Kubernetes, this function is more often referred to as an **Ingress**. In short, Load Balancer and Ingress play the same role.

