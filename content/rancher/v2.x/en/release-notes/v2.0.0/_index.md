---
title: Release v2.0.0
weight: 1
---

After many months of development, we are finally able to make Rancher 2.0 available to our users.  The previous version of Rancher, version 1.6, was a container management platform built on Docker. Rancher 2.0 builds on the success and experience of Rancher 1.6.  However, for version 2.0, most of Rancher has been redesigned to work on Kubernetes. Rancher 2.0 retains the user-friendly features of version 1.6, such as the UI and catalog, but now also includes many new features such as:

  - Built-in CI pipeline
  - Alerts and log aggregation
  - Multi-cluster management
  - Rancher Kubernetes Engine (RKE)
  - Integration with cloud Kubernetes services, such as GKE, EKS, and AKS.

> **NOTE** - Upgrades from previous preview versions are not supported.  All upgrades from this version will be supported.

## Helpful Links

[Quick Start Guide](https://rancher.com/docs/rancher/v2.x/en/quick-start-guide/)
[Rancher 2.0 Docs](https://rancher.com/docs/rancher/v2.x/en/)

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.0
- rancher/rancher-agent:v2.0.0

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

### Latest - v2.0.0 - `rancher/rancher:latest`

### Stable - Not tagged yet.  We'd like to give the latest build a week or two to iron out any remaining issues we may not have yet found.

## New Enhancements

- **Clusters and Node Management** - Rancher supports the ability to add your k8s cluster hosted by a cloud provider, create one using Rancher Kubernetes Engine (RKE), or simply by importing an existing cluster of your own.
  - Cloud Providers - Full integrated experience of creating and managing your nodes of your k8s cluster from one of the major cloud providers
    - Google Kubernetes Engine (GKE)
    - Azure Container Service (AKS)
    - Amazon's Elastic Kubernetes Service (EKS) - Experimental
  - Rancher Kubernetes Engine (RKE) - Allow you to create a Rancher supported k8s cluster anywhere, on any cloud or private infrastructure.  You will be able to scale your hosts for your k8s deployment as you see fit through Rancher.
  - Import - Import any existing k8s cluster.  Only v1.8+.
- **Authentication** - Support for local auth, Github, and ActiveDirectory.  After installing Rancher, you will be prompted to change your admin password.
- **User Management** - Rancher will support two default user types (admin and user) with respective default permissions.  A custom user type will also be supported.
  - Admin - Full global permissions (super admin)
  - Standard User - standard user permissions including:
    - only able to manage their own clusters including namespaces, user, projects, etc.
    - can view catalogs and node drivers, but cannot manage them.
    - cannot create roles but can assign them to users invited to their cluster and/or projects.
  - Custom - custom user type role that you can use to define your own user type

- **Role Based Access Control (RBAC)** - Rancher allows you to create your own global cluster roles that can be easily assigned to any users to manage k8s clusters and projects.  Rancher includes all out-of-box k8s roles and the ability to customize your own roles.  Each custom role can be assigned to be assignable at a global, cluster, or project level.
- **Project and Namespace Management** - Users can create namespaces and assign them to projects.  Projects are a new Rancher concepts that allows you to group a set of namespaces and assign a set of user permissions on those namespaces.
- **Workload Management** - Rancher is introducing a new Workload UX to create and manage their k8s workloads.  Supported workload features:
  - Ability to create workloads that will automatically translate into appropriate k8s resources (Pods, StatefulSets, Deployments, DaemonSets, etc.).  Rancher will also automatically create an appropriate k8s service (NodePort, LoadBalance Service, ClusterIP) based on how the user wants to publish their ports.  Rancher does the heavy lifting and translation for you.  You do not need to know or understand k8s constructs before using this.
  - Ability to create and use Ingress.
  - Ability to generate DNS records for k8s services or external IP addresses.
  - Ability to add authenticated registries
  - Ability to manage k8s secrets
  - Ability to manage your SSL certificates for Ingress.
  - Ability to generate a public endpoint based on ports exposed by NodePort Services, LoadBalancer Services, Ingress, and HostPorts.
- **Rancher CLI** - CLI support for all Rancher 2.0 feature set.
- **Pod Security Policies** - Allow users to create their own pod security policy or policies that can be applied to roles.
- **Catalog Support for Helm** - Helm charts will be supported in the updated 2.0 catalog.
- **HA and SSL support for Rancher server**
  - Rancher can be installed via `docker run`
  - Rancher can be installed into an existing k8s cluster.  This option will enable HA support as Rancher HA will be managed by the external k8s cluster.
- -*Alert Management**
  - Disabled by default.  Enabling will install Prometheus AlertManager
  - Support for basic out-of-box alert conditions (final list TBD)
  - Support for following notifiers (Slack, Email, PagerDuty, Webhooks)
  - Support for alert management including creating, deleting, disabling, and muting alerts
  - Support for out-of-box system alerts (system services, networking, etc.) that can be configured with a notifier
  - Support for selector labels on cluster and project-wide resources (pod, nodes, etc.)
  - Support for "Test" notifier feature
  - No support for "management" plane alerts (i.e Cluster 1 went down)
- **Logging**
  - Disabled by default.  Enabling will install Fluentd
  - Support for ability to configure cluster-wide logging of stdout/err of containers and workloads
  - Support for ability to configure project-wide logging of stdout/err of containers and workloads
  - Support for ability to configure workload logging of a specific directory
  - Support for following Log Targets
    - Rancher embedded logging - Experimental and used for testing
    - ElasticSearch
    - Splunk
    - Syslog
    - Kafka
- **CI Pipelines** - A simple integrated pipeline feature that allows users to create pipelines within projects for CI (CD will be available soon!)
  - Disabled by default.  Enabling will install Jenkins
  - Support for GitHub integration initially
  - Support for creating pipelines through UI wizard, importing a YAML configuration file, or reading it the pipeline YAML directly from a GitHub project.
  - Support for creating pipelines with multiple stages and steps within a stage.
  - Support for automatic detection of language used to default to a container image with corresponding compiler, if required.
  - Integrated with registries added into projects

## Migrating from Rancher 1.6

By embarking on the Rancher 2.0 project, all of the legacy Rancher 1.6 Java modules were completely rewritten in Go, and in the process touched just about every other module in the system. As such, there will not be a direct upgrade  from 1.6.x to 2.0.

We do plan to continue to support Rancher 1.6.x for at least another year after 2.1 has been released to give our users time to plan this migration.

## Known Major Issues

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.0