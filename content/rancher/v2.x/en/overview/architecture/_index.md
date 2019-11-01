---
title: Rancher Server Architecture
weight: 1
---

This section focuses on the Rancher server and its components. The Rancher server includes all the software components used to manage the entire Rancher deployment.

- For the different ways that Rancher can be installed, refer to the [installation options section.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/installation-options)
- For guidance about setting up the underlying infrastructure for the Rancher server, refer to the [architecture recommendations.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/architecture-recommendations)
- For an explanation of how Rancher communicates with downstream Kubernetes clusters, refer to the section on [Rancher and downstream user clusters.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/rancher-and-downstream)

> This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts]({{<baseurl>}}/rancher/v2.x/en/overview/concepts) page.

# Features of the Rancher API Server

The Rancher API server is built on top of an embedded Kubernetes API server and an etcd database. It implements the following functionalities:

-  **User management:** The Rancher API server manages user identities that correspond to external authentication providers like Active Directory or GitHub.
-	**Authorization:** The Rancher API server manages access control and security policies.
-	**Managing projects:** A _project_ is a group of multiple namespaces and access control policies within a cluster.
-  **Tracking nodes:** The Rancher API server tracks identities of all the nodes in all clusters.
- **Provisioning Kubernetes Clusters:** The Rancher API server can provision Kubernetes clusters. Rancher can also set up Kubernetes on existing nodes, or import existing Kubernetes clusters into Rancher.
- **Setting up infrastructure:**  When configured to use a cloud provider, Rancher can dynamically provision new nodes and persistent storage in the cloud.

# Rancher Server Architecture

The majority of Rancher 2.x software runs on the Rancher Server. Rancher Server includes all the software components used to manage the entire Rancher deployment.

The figure below illustrates the high-level architecture of Rancher 2.x. The figure depicts a Rancher Server installation that manages two downstream Kubernetes clusters: one created by RKE and another created by Amazon EKS (Elastic Kubernetes Service).

For the best performance and security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

![Architecture]({{< baseurl >}}/img/rancher/rancher-architecture-rancher-api-server.svg)

You can install Rancher on a single node, or on a high-availability Kubernetes cluster.

A single-node installation is recommended for development and testing purposes, and a high-availability installation is recommended for production.

### Rancher Server Components

This diagram shows each component that the Rancher server is composed of:

![Rancher Components]({{<baseurl>}}/img/rancher/rancher-architecture-rancher-components.svg)

The GitHub repositories for each component of Rancher can be found at the following links:

- [Main Rancher server repository](https://github.com/rancher/rancher)
- [Rancher UI](https://github.com/rancher/ui)
- [Rancher API UI](https://github.com/rancher/api-ui)
- [Norman,](https://github.com/rancher/norman) Rancher's API framework
- [Types](https://github.com/rancher/types)
- [Rancher CLI](https://github.com/rancher/cli)
- [Catalog applications](https://github.com/rancher/helm)