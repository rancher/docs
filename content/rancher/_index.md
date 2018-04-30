---
title: Rancher 2.0 Documentation
shortTitle: Rancher 2.0
weight: 1
---

# Rancher 2.0 Documentation

## Rancher Overview

Rancher is a container management platform built for organizations that deploy containers in production. Rancher makes it easy to run Kubernetes everywhere, meet IT requirements, and empower DevOps teams.

Run Kubernetes Everywhere. Kubernetes is not only the de-facto container orchestration standard, it is rapidly becoming a form of standard infrastructure available from all cloud and virtualization vendors. Rancher users have the choice of creating Kubernetes clusters with Rancher Kubernetes Engine (RKE), cloud Kubernetes services like GKE, AKS, and EKS. Rancher users can also import and manage their existing Kubernetes clusters created using any Kubernetes distributions or installers.

Meet IT Requirements. Rancher supports centralized authentication for all Kubernetes clusters under management. An employee of a large enterprise, for example, can use his corporate Active Directory credential to gain access to Kubernetes clusters in GKE. IT administrators can setup and enforce access control and security policies across all users, groups, projects, clusters, and clouds. IT administrators have a single-pane-of-glass view of the health and capacity of all their Kubernetes clusters.

Empower DevOps Teams. Rancher provides an intuitive user interface for DevOps engineers to manage their application workload. The user does not need to have in-depth knowledge of Kubernetes concepts to start using Rancher. Rancher catalog contains a set of useful DevOps tools. Rancher is certified with a wide selection of cloud native ecosystem products, including, for example, security tools, monitoring systems, container registries, and storage and networking drivers.
The following figure illustrates the role Rancher plays in IT and DevOps organizations. Each team deploys their applications on the public or private clouds they choose. IT administrators gain visibility and enforce policies across all users, clusters, and clouds.

{{< figure src="assets/platform.png" title="Rancher Platform">}}

## What's New?

The previous version, Rancher 1.6, was a container management platform built on docker. Rancher 2.0 build on the success and experience of Rancher 1.6 but bulk of the system has been rearchitected to work on Kubernetes. Rancher 2.0 retains the ease-of-use of Rancher 1.6 UI and catalog. Rancher 2.0 includes many new features such as the built-in CI pipeline, alerts and log aggregation, multi-cluster management, RKE, and integration with cloud Kubernetes services such as GKE, EKS, and AKS.

# Rancher Architecture

Before explaining Rancher architecture, it is useful to present some background information on two fundamental technologies Rancher build on: Docker and Kubernetes.

## Docker

Docker is the de-facto container packaging and runtime standard. Developers build container images from Dockerfiles and distribute container images from Docker registries. Docker Hub (hub.docker.com) is the most popular public registry. Many organizations also setup private Docker registries.

Docker is primarily used to manage containers on individual nodes. The Docker Swarm clustering technology are not as widely used as Kubernetes. Rancher 1.6 supported Docker Swarm. Rancher 2.0 no longer does.

## Kubernetes

Kubernetes is the de-facto container cluster management standard. YAML files specify containers and other resources that form an application. Kubernetes performs functions such as scheduling, scaling, service discovery, health check, secret and configuration management.

A Kubernetes cluster consists of multiple nodes.

-   The etcd database. Although you can run etcd on just one node, it typically takes 3, 5 or more nodes to create an HA configuration.

-   Master nodes. Master nodes are stateless and are used to run the API server, scheduler, and controllers.

-   Worker nodes. Application workload runs on worker nodes.

## Rancher

We now cover high-level Rancher architecture.

Majority of Rancher 2.0 software runs on the Rancher server.  Rancher server includes all the software components used to manage the entire Rancher deployment.

Figure 2 illustrates the high-level architecture of Rancher 2.0. The figure depicts a Rancher server installation that manages two Kubernetes clusters: one Kubernetes cluster created by RKE and another Kubernetes cluster created by GKE.

{{< figure src="assets/rancher-architecture.png" title="Rancher Architecture">}}

In this section we describe the functionalities of each Rancher server components.

#### Rancher API Server

Rancher API server is built on top of an embedded Kubernetes API server and etcd database. It implements the following functionalities:

1.  User management. Rancher API server manages user identities that correspond to external authentication providers like Active Directory or GitHub.

2.  Authorization. Rancher API server manages access control and security policies.

3.  Projects. A project is a grouping of multiple namespaces and access control policies within a cluster.

4.  Nodes. Rancher API server tracks identities of all the nodes in all clusters.

#### Cluster Controller and Agents

The cluster controller and cluster agents implement the business logic required to manage Kubernetes clusters. All the logic that is global to the entire Rancher install is implemented by the cluster controller. A separate cluster agent instance implements the logic required for the corresponding cluster.

Cluster agents perform the following activities:

1.  Manage workload. This includes, for example, creating pods and deployments in each cluster.

2.  Applying roles and bindings that are defined in global policies into every cluster.

3.  Propagate information from cluster to rancher server: events, stats, node info, and health.

The cluster controller performs the following activities:

1.  Configures access control policies to clusters and projects.

2.  Provisions clusters by invoking the necessary Docker machine drivers and invoking Kubernetes engines like RKE and GKE.

#### Authentication Proxy

The authentication proxy proxies all Kubernetes API calls. It integrates with authentication services like local authentication, Active Directory, and GitHub. On every Kubernetes API call, the authentication proxy authenticates the caller and sets the proper Kubernetes impersonation headers before forwarding the call to Kubernetes masters. Rancher communicates with Kubernetes clusters using a service account.
