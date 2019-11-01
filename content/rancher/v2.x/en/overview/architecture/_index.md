---
title: Architecture
weight: 1
---

This section explains how Rancher interacts with the two fundamental technologies Rancher is built on: Docker and Kubernetes.

## Docker

Docker is the container packaging and runtime standard. Developers build container images from Dockerfiles and distribute container images from Docker registries. [Docker Hub](https://hub.docker.com) is the most popular public registry. Many organizations also setup private Docker registries. Docker is primarily used to manage containers on individual nodes.

>**Note:** Although Rancher 1.6 supported Docker Swarm clustering technology, it is no longer supported in Rancher 2.x due to the success of Kubernetes.

## Kubernetes

Kubernetes is the container cluster management standard. YAML files specify containers and other resources that form an application. Kubernetes performs functions such as scheduling, scaling, service discovery, health check, secret management, and configuration management.

A Kubernetes cluster consists of multiple nodes.

-   **etcd database**

 	Although you can run etcd on just one node, it typically takes 3, 5 or more nodes to create a High Availability (HA) configuration.

-   **Master nodes**

 	Master nodes are stateless and are used to run the API server, scheduler, and controllers.

-   **Worker nodes**

 	The application workload runs on worker nodes.

## Rancher

The majority of Rancher 2.x software runs on the Rancher Server.  Rancher Server includes all the software components used to manage the entire Rancher deployment.

The figure below illustrates the high-level architecture of Rancher 2.x. The figure depicts a Rancher Server installation that manages two Kubernetes clusters: one created by Rancher Kubernetes Engine (RKE) and another created by Amazon EKS (Elastic Kubernetes Service).

![Architecture]({{< baseurl >}}/img/rancher/rancher-architecture.svg)

In this section we describe the functionalities of each Rancher server components.

#### Single Node and High-Availability Installations of Rancher

You can install Rancher on a single node, or on a high-availability Kubernetes cluster.

A single-node installation is recommended for development and testing purposes, and a high-availability installation is recommended for production.

In a single-node installation of Rancher, the node running the Rancher server should be separate from your Kubernetes clusters.

In high-availability installations of Rancher, it is important to note the following:

- The Rancher server cluster should be separate from user clusters. A user cluster is a Kubernetes cluster  that runs your apps and services.
- The Rancher server cluster and user clusters have separate requirements for hardware and networking. The requirements for the Rancher server can be found [here]({{<baseurl>}}/rancher/v2.x/en/installation/requirements) and the requirements for user clusters can be found [here.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/requirements})
- We recommend installing Rancher on a Kubernetes cluster in which each node has all three Kubernetes roles: etcd, controlplane, and worker. However, when you set up the clusters that run your apps and services, we recommend that each node in the cluster should have a single role for stability and scalability. For details on the recommended best practices for user clusters, refer to the [production checklist]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/production) or our [best practices guide.]({{<baseurl>}}/rancher/v2.x/en/best-practices/management/#tips-for-scaling-and-reliability)

![Single Node vs. High-Availability Architecture]({{<baseurl>}}/img/rancher/rancher-single-node-and-ha-installations.svg)

#### Rancher API Server

Rancher API server is built on top of an embedded Kubernetes API server and etcd database. It implements the following functionalities:

-  **User Management**

	Rancher API server manages user identities that correspond to external authentication providers like Active Directory or GitHub.

-	**Authorization**

 	Rancher API server manages access control and security policies.

-	**Managing Projects**

 	A _project_ is a group of multiple namespaces and access control policies within a cluster.

-  **Tracking Nodes**

	Rancher API server tracks identities of all the nodes in all clusters.

#### Cluster Controller and Agents

The cluster controller and cluster agents implement the business logic required to manage Kubernetes clusters.

- The _cluster controller_ implements the logic required for the global Rancher install. It performs the following actions:

	-  Configuration of access control policies to clusters and projects.

	-  Provisioning of clusters by calling:

		- The required Docker machine drivers.
		- Kubernetes engines like RKE and GKE.


- A separate _cluster agent_ instance implements the logic required for the corresponding cluster. It performs the following activities:

	-  Workload Management, such as pod creation and deployment within each cluster.

	-  Application of the roles and bindings defined in each cluster's global policies.

	-  Communication between clusters and Rancher Server: events, stats, node info, and health.

#### Authentication Proxy

The _authentication proxy_ forwards all Kubernetes API calls. It integrates with authentication services like local authentication, Active Directory, and GitHub. On every Kubernetes API call, the authentication proxy authenticates the caller and sets the proper Kubernetes impersonation headers before forwarding the call to Kubernetes masters. Rancher communicates with Kubernetes clusters using a service account.
