---
title: Rancher and Downstream User Clusters
weight: 5
---

This section describes how Rancher provisions and manages the downstream user clusters that run your apps and services.

- [How Rancher Communicates with Downstream User Clusters](#how-rancher-communicates-with-downstream-user-clusters)
- [Authentication Proxy](#authentication-proxy)
  - [Connecting to a Cluster without the Rancher UI](#connecting-to-a-cluster-without-the-rancher-ui)
- [How Rancher Provisions Kubernetes Clusters](#how-rancher-provisions-kubernetes-clusters)

# How Rancher Communicates with Downstream User Clusters

Rancher communicates with downstream user clusters by using three types of components: the cluster controller, the cluster agent, and the node agent. These components are used for provisioning and managing Kubernetes clusters.

The cluster controller and cluster agents implement the business logic required to manage Kubernetes clusters.

Rancher installs the `cattle-node-agent` on each node in downstream user clusters in order to manage them.

<figcaption>Cluster Controller, Cluster Agent, and Node Agents Allow Rancher to Control Downstream Clusters</figcaption>

![Rancher Components]({{<baseurl>}}/img/rancher/rancher-architecture-cluster-controller.svg)

The following descriptions correspond to the numbers in the diagram above:

1. Let's say a user, Bob, wants to see all pods running on a downstream user cluster called User Cluster 1. From within Rancher, he can run a `kubectl` command to see
the pods. Bob is authenticated through Rancher's authentication proxy.

2. Each downstream user cluster has a cluster agent, which opens a tunnel connecting the user cluster with Rancher's corresponding cluster controller.

3. By default, the cluster controller connects to the cluster agent. If the cluster agent is not available, one of the node agents creates a tunnel to the cluster controller to communicate with Rancher.

4. Let's say that the Rancher server is located in the United States, and User Cluster 1 is located in China. A user, Alice, lives in China. Alice can manipulate resources in User Cluster 1 by using the Rancher UI, but she may experience latency due to the distance between US and China. To reduce latency, she can use Rancher's authorized cluster endpoint feature. By default, an authorized cluster endpoint is enabled, which allows Alice to be authenticated by calling the Kubernetes API server of the user cluster, without going through Rancher's authentication proxy. When Alice uses kubectl to access the user cluster, the cluster's Kubernetes API server authenticates Alice by using the `kube-api-auth` service as a webhook. The `kube-api-auth` authentication service and authorized cluster endpoint are only available for Rancher-launched Kubernetes clusters.

### The Cluster Controller

The _cluster controller_ implements the logic required for the global Rancher install. It performs the following actions:

-  Configures access control policies to clusters and projects
-  Provisions clusters by calling the required Docker machine drivers and Kubernetes engines, such as RKE and GKE

### The Cluster Agent

The `cattle-cluster-agent` is used to connect to the Kubernetes API of Rancher Launched Kubernetes clusters. The `cattle-cluster-agent` is deployed on the Rancher server using a deployment resource.

The cluster agent implements the logic required for the corresponding downstream user cluster. It performs the following activities:

-  Manages workloads, pod creation and deployment within each cluster
-  Applies the roles and bindings defined in each cluster's global policies
- Communicates between clusters and Rancher server about events, stats, node info, and health

### The Node Agent

The `cattle-node-agent` is deployed using a [DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/) resource to make sure it runs on every node in a Rancher-launched Kubernetes cluster. It is used to interact with the nodes when performing cluster operations. Examples of cluster operations include upgrading the Kubernetes version and creating or restoring etcd snapshots. 

The `cattle-node-agent` is also used as fallback option to connect to the Kubernetes API of Rancher Launched Kubernetes clusters when `cattle-cluster-agent` is unavailable.

# Authentication Proxy

The _authentication proxy_ forwards all Kubernetes API calls. It integrates with authentication services like local authentication, Active Directory, and GitHub. On every Kubernetes API call, the authentication proxy authenticates the caller and sets the proper Kubernetes impersonation headers before forwarding the call to Kubernetes masters.

Rancher communicates with Kubernetes clusters using a [service account,](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/), which provides an identity for processes that run in a pod.

### Connecting to a Cluster without the Rancher UI

By default, Rancher generates a kubeconfig file that will proxy through the Rancher server to connect to the Kubernetes API server on a cluster.

For [Rancher launched Kubernetes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters) clusters, which have an [authorized cluster endpoint]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/#authorized-cluster-endpoint) enabled, Rancher generates extra context(s) in the kubeconfig file in order to connect directly to the cluster. The authorized cluster endpoint is enabled by default.

When you want to use kubectl to access this cluster without Rancher, you will need to use a context defined in this kubeconfig file. This file has the credentials for `kubectl` and `helm`.

The `kube-api-auth` microservice is deployed to provide the user authentication functionality for the authorized cluster endpoint.

The files mentioned below are needed to maintain, troubleshoot and upgrade your cluster:

- `rancher-cluster.yml`: The RKE cluster configuration file.
- `kube_config_rancher-cluster.yml`: The Kubeconfig file for the cluster, this file contains credentials for full access to the cluster.
- `rancher-cluster.rkestate`: The Kubernetes Cluster State file. This file contains credentials for full access to the cluster. Note: This state file is only created when using RKE v0.2.0 or higher.

For more information on connecting to a cluster without the Rancher UI, refer to the [kubeconfig file]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/kubeconfig/) documentation.

# How Rancher Provisions Kubernetes Clusters

The tools that Rancher uses to provision downstream user clusters depends on the type of cluster that is being provisioned.

### Rancher Launched Kubernetes for Hodes Hosted in an Infrastructure Provider

Rancher can dynamically provision nodes in a provider such as Amazon EC2, DigitalOcean, Azure, or vSphere, then install Kubernetes on them.

Rancher provisions this type of cluster using [RKE](https://github.com/rancher/rke) and [docker-machine.](https://github.com/rancher/machine)

### Rancher Launched Kubernetes for Custom Nodes

When setting up this type of cluster, Rancher installs Kubernetes on existing nodes, which creates a custom cluster.

Rancher provisions this type of cluster using [RKE.](https://github.com/rancher/rke)

### Hosted Kubernetes Providers

When setting up this type of cluster, Kubernetes is installed by providers such as Google Kubernetes Engine, Amazon Elastic Container Service for Kubernetes, or Azure Kubernetes Service.

Rancher provisions this type of cluster using [kontainer-engine.](https://github.com/rancher/kontainer-engine)

### Imported Kubernetes Clusters

In this type of cluster, Rancher connects to a Kubernetes cluster that has already been set up. Therefore, Rancher does not provision Kubernetes, but only sets up the Rancher agents to communicate with the cluster.