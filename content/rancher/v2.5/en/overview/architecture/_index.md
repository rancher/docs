---
title: Architecture
weight: 1
---

This section focuses on the Rancher server, its components, and how Rancher communicates with downstream Kubernetes clusters.

For information on the different ways that Rancher can be installed, refer to the [overview of installation options.]({{<baseurl>}}/rancher/v2.5/en/installation/#overview-of-installation-options)

For a list of main features of the Rancher API server, refer to the [overview section.]({{<baseurl>}}/rancher/v2.5/en/overview/#features-of-the-rancher-api-server)

For guidance about setting up the underlying infrastructure for the Rancher server, refer to the [architecture recommendations.]({{<baseurl>}}/rancher/v2.5/en/overview/architecture-recommendations)

> This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts]({{<baseurl>}}/rancher/v2.5/en/overview/concepts) page.

This section covers the following topics:

- [Rancher server architecture](#rancher-server-architecture)
- [Communicating with downstream user clusters](#communicating-with-downstream-user-clusters)
  - [The authentication proxy](#1-the-authentication-proxy)
  - [Cluster controllers and cluster agents](#2-cluster-controllers-and-cluster-agents)
  - [Node agents](#3-node-agents)
  - [Authorized cluster endpoint](#4-authorized-cluster-endpoint)
- [Important files](#important-files)
- [Tools for provisioning Kubernetes clusters](#tools-for-provisioning-kubernetes-clusters)
- [Rancher server components and source code](#rancher-server-components-and-source-code)

# Rancher Server Architecture

The majority of Rancher 2.x software runs on the Rancher Server. Rancher Server includes all the software components used to manage the entire Rancher deployment.

The figure below illustrates the high-level architecture of Rancher 2.x. The figure depicts a Rancher Server installation that manages two downstream Kubernetes clusters: one created by RKE and another created by Amazon EKS (Elastic Kubernetes Service).

For the best performance and security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/) for running your workloads.

The diagram below shows how users can manipulate both [Rancher-launched Kubernetes]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) clusters and [hosted Kubernetes]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/) clusters through Rancher's authentication proxy:

<figcaption>Managing Kubernetes Clusters through Rancher's Authentication Proxy</figcaption>

![Architecture]({{<baseurl>}}/img/rancher/rancher-architecture-rancher-api-server.svg)

You can install Rancher on a single node, or on a high-availability Kubernetes cluster.

A high-availability Kubernetes installation is recommended for production.

A Docker installation of Rancher is recommended only for development and testing purposes. The ability to migrate Rancher to a high-availability cluster depends on the Rancher version:

The Rancher backup operator can be used to migrate Rancher from the single Docker container install to an installation on a high-availability Kubernetes cluster. For details, refer to the documentation on [migrating Rancher to a new cluster.]({{<baseurl>}}/rancher/v2.5/en/backups/migrating-rancher)

The Rancher server, regardless of the installation method, should always run on nodes that are separate from the downstream user clusters that it manages. If Rancher is installed on a high-availability Kubernetes cluster, it should run on a separate cluster from the cluster(s) it manages.

# Communicating with Downstream User Clusters

This section describes how Rancher provisions and manages the downstream user clusters that run your apps and services.

The below diagram shows how the cluster controllers, cluster agents, and node agents allow Rancher to control downstream clusters.

<figcaption>Communicating with Downstream Clusters</figcaption>

![Rancher Components]({{<baseurl>}}/img/rancher/rancher-architecture-cluster-controller.svg)

The following descriptions correspond to the numbers in the diagram above:

1. [The Authentication Proxy](#1-the-authentication-proxy)
2. [Cluster Controllers and Cluster Agents](#2-cluster-controllers-and-cluster-agents)
3. [Node Agents](#3-node-agents)
4. [Authorized Cluster Endpoint](#4-authorized-cluster-endpoint)

### 1. The Authentication Proxy

In this diagram, a user named Bob wants to see all pods running on a downstream user cluster called User Cluster 1. From within Rancher, he can run a `kubectl` command to see
the pods. Bob is authenticated through Rancher's authentication proxy.

The authentication proxy forwards all Kubernetes API calls to downstream clusters. It integrates with authentication services like local authentication, Active Directory, and GitHub. On every Kubernetes API call, the authentication proxy authenticates the caller and sets the proper Kubernetes impersonation headers before forwarding the call to Kubernetes masters.

Rancher communicates with Kubernetes clusters using a [service account,](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/) which provides an identity for processes that run in a pod.

By default, Rancher generates a [kubeconfig file]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/kubectl/) that contains credentials for proxying through the Rancher server to connect to the Kubernetes API server on a downstream user cluster. The kubeconfig file (`kube_config_rancher-cluster.yml`) contains full access to the cluster.

### 2. Cluster Controllers and Cluster Agents

Each downstream user cluster has a cluster agent, which opens a tunnel to the corresponding cluster controller within the Rancher server.

There is one cluster controller and one cluster agent for each downstream cluster. Each cluster controller:

- Watches for resource changes in the downstream cluster
- Brings the current state of the downstream cluster to the desired state
-  Configures access control policies to clusters and projects
-  Provisions clusters by calling the required Docker machine drivers and Kubernetes engines, such as RKE and GKE

By default, to enable Rancher to communicate with a downstream cluster, the cluster controller connects to the cluster agent. If the cluster agent is not available, the cluster controller can connect to a [node agent](#3-node-agents) instead.

The cluster agent, also called `cattle-cluster-agent`, is a component that runs in a downstream user cluster. It performs the following tasks:

-  Connects to the Kubernetes API of Rancher-launched Kubernetes clusters
- Manages workloads, pod creation and deployment within each cluster
-  Applies the roles and bindings defined in each cluster's global policies
- Communicates between the cluster and Rancher server (through a tunnel to the cluster controller) about events, stats, node info, and health

### 3. Node Agents

If the cluster agent (also called `cattle-cluster-agent`) is not available, one of the node agents creates a tunnel to the cluster controller to communicate with Rancher.

The `cattle-node-agent` is deployed using a [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) resource to make sure it runs on every node in a Rancher-launched Kubernetes cluster. It is used to interact with the nodes when performing cluster operations. Examples of cluster operations include upgrading the Kubernetes version and creating or restoring etcd snapshots.

### 4. Authorized Cluster Endpoint

An authorized cluster endpoint allows users to connect to the Kubernetes API server of a downstream cluster without having to route their requests through the Rancher authentication proxy.

> The authorized cluster endpoint only works on Rancher-launched Kubernetes clusters. In other words, it only works in clusters where Rancher [used RKE]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters) to provision the cluster. It is not available for registered clusters, or for clusters in a hosted Kubernetes provider, such as Amazon's EKS.

There are two main reasons why a user might need the authorized cluster endpoint:

- To access a downstream user cluster while Rancher is down
- To reduce latency in situations where the Rancher server and downstream cluster are separated by a long distance

The `kube-api-auth` microservice is deployed to provide the user authentication functionality for the authorized cluster endpoint. When you access the user cluster using `kubectl`, the cluster's Kubernetes API server authenticates you by using the `kube-api-auth` service as a webhook.

Like the authorized cluster endpoint, the `kube-api-auth` authentication service is also only available for Rancher-launched Kubernetes clusters.

> **Example scenario:** Let's say that the Rancher server is located in the United States, and User Cluster 1 is located in Australia. A user, Alice, also lives in Australia. Alice can manipulate resources in User Cluster 1 by using the Rancher UI, but her requests will have to be sent from Australia to the Rancher server in the United States, then be proxied back to Australia, where the downstream user cluster is. The geographical distance may cause significant latency, which Alice can reduce by using the authorized cluster endpoint.

With this endpoint enabled for the downstream cluster, Rancher generates an extra Kubernetes context in the kubeconfig file in order to connect directly to the cluster. This file has the credentials for `kubectl` and `helm`. 

You will need to use a context defined in this kubeconfig file to access the cluster if Rancher goes down. Therefore, we recommend exporting the kubeconfig file so that if Rancher goes down, you can still use the credentials in the file to access your cluster. For more information, refer to the section on accessing your cluster with [kubectl and the kubeconfig file.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/kubectl)

# Important Files

The files mentioned below are needed to maintain, troubleshoot and upgrade your cluster:

- `rancher-cluster.yml`: The RKE cluster configuration file.
- `kube_config_rancher-cluster.yml`: The Kubeconfig file for the cluster, this file contains credentials for full access to the cluster. You can use this file to authenticate with a Rancher-launched Kubernetes cluster if Rancher goes down.
- `rancher-cluster.rkestate`: The Kubernetes cluster state file. This file contains credentials for full access to the cluster. Note: This state file is only created when using RKE v0.2.0 or higher.

> **Note:** The "rancher-cluster" parts of the two latter file names are dependent on how you name the RKE cluster configuration file.

For more information on connecting to a cluster without the Rancher authentication proxy and other configuration options, refer to the [kubeconfig file]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/kubectl/) documentation.

# Tools for Provisioning Kubernetes Clusters

The tools that Rancher uses to provision downstream user clusters depends on the type of cluster that is being provisioned.

### Rancher Launched Kubernetes for Nodes Hosted in an Infrastructure Provider

Rancher can dynamically provision nodes in a provider such as Amazon EC2, DigitalOcean, Azure, or vSphere, then install Kubernetes on them.

Rancher provisions this type of cluster using [RKE](https://github.com/rancher/rke) and [docker-machine.](https://github.com/rancher/machine)

### Rancher Launched Kubernetes for Custom Nodes

When setting up this type of cluster, Rancher installs Kubernetes on existing nodes, which creates a custom cluster.

Rancher provisions this type of cluster using [RKE.](https://github.com/rancher/rke)

### Hosted Kubernetes Providers

When setting up this type of cluster, Kubernetes is installed by providers such as Google Kubernetes Engine, Amazon Elastic Container Service for Kubernetes, or Azure Kubernetes Service.

Rancher provisions this type of cluster using [kontainer-engine.](https://github.com/rancher/kontainer-engine)

### Registered Kubernetes Clusters

In this type of cluster, Rancher connects to a Kubernetes cluster that has already been set up. Therefore, Rancher does not provision Kubernetes, but only sets up the Rancher agents to communicate with the cluster.

# Rancher Server Components and Source Code

This diagram shows each component that the Rancher server is composed of:

![Rancher Components]({{<baseurl>}}/img/rancher/rancher-architecture-rancher-components.svg)

The GitHub repositories for Rancher can be found at the following links:

- [Main Rancher server repository](https://github.com/rancher/rancher)
- [Rancher UI](https://github.com/rancher/ui)
- [Rancher API UI](https://github.com/rancher/api-ui)
- [Norman,](https://github.com/rancher/norman) Rancher's API framework
- [Types](https://github.com/rancher/types)
- [Rancher CLI](https://github.com/rancher/cli)
- [Catalog applications](https://github.com/rancher/helm)

This is a partial list of the most important Rancher repositories. For more details about Rancher source code, refer to the section on [contributing to Rancher.]({{<baseurl>}}/rancher/v2.5/en/contributing/#repositories) To see all libraries and projects used in Rancher, see the [`go.mod` file](https://github.com/rancher/rancher/blob/master/go.mod) in the `rancher/rancher` repository.
