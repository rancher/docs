---
title: Architecture Recommendations
weight: 3
---

Kubernetes cluster. If you are installing Rancher on a single node, the main architecture recommendation that applies to your installation is that the cluster running Rancher should be [separate from downstream clusters.](#separation-of-rancher-and-user-clusters)

This section covers the following topics:

- [Separation of Rancher and User Clusters](#separation-of-rancher-and-user-clusters)
- [Why HA is Better for Rancher in Production](#why-ha-is-better-for-rancher-in-production)
- [Recommended Load Balancer Configuration for Kubernetes Installations](#recommended-load-balancer-configuration-for-kubernetes-installations)
- [Environment for Kubernetes Installations](#environment-for-kubernetes-installations)
- [Recommended Node Roles for Kubernetes Installations](#recommended-node-roles-for-kubernetes-installations)
- [Architecture for an Authorized Cluster Endpoint](#architecture-for-an-authorized-cluster-endpoint)

# Separation of Rancher and User Clusters

A user cluster is a downstream Kubernetes cluster that runs your apps and services.

If you have a Docker installation of Rancher, the node running the Rancher server should be separate from your downstream clusters.

In Kubernetes installations of Rancher, the Rancher server cluster should also be separate from the user clusters.

![Separation of Rancher Server from User Clusters]({{<baseurl>}}/img/rancher/rancher-architecture-separation-of-rancher-server.svg)

# Why HA is Better for Rancher in Production

We recommend installing the Rancher server on a high-availability Kubernetes cluster, primarily because it protects the Rancher server data. In a high-availability installation, a load balancer serves as the single point of contact for clients, distributing network traffic across multiple servers in the cluster and helping to prevent any one server from becoming a point of failure.

We don't recommend installing Rancher in a single Docker container, because if the node goes down, there is no copy of the cluster data available on other nodes and you could lose the data on your Rancher server.

As of v2.4, Rancher needs to be installed on either a high-availability [RKE (Rancher Kubernetes Engine)]({{<baseurl>}}/rke/latest/en/) Kubernetes cluster, or a high-availability [K3s (Lightweight Kubernetes)]({{<baseurl>}}/k3s/latest/en/) Kubernetes cluster. Both RKE and K3s are fully certified Kubernetes distributions.

Rancher versions before v2.4 need to be installed on an RKE cluster.

### K3s Kubernetes Cluster Installations

If you are installing Rancher v2.4 for the first time, we recommend installing it on a K3s Kubernetes cluster. One main advantage of this K3s architecture is that it allows an external datastore to hold the cluster data, allowing the K3s server nodes to be treated as ephemeral.

The option to install Rancher on a K3s cluster is a feature introduced in Rancher v2.4. K3s is easy to install, with half the memory of Kubernetes, all in a binary less than 100 MB.

<figcaption>Architecture of a K3s Kubernetes Cluster Running the Rancher Management Server</figcaption>
![Architecture of a K3s Kubernetes Cluster Running the Rancher Management Server]({{<baseurl>}}/img/rancher/k3s-server-storage.svg)

### RKE Kubernetes Cluster Installations

If you are installing Rancher before v2.4, you will need to install Rancher on an RKE cluster, in which the cluster data is stored on each node with the etcd role. As of Rancher v2.4, there is no migration path to transition the Rancher server from an RKE cluster to a K3s cluster. All versions of the Rancher server, including v2.4+, can be installed on an RKE cluster.

In an RKE installation, the cluster data is replicated on each of three etcd nodes in the cluster, providing redundancy and data duplication in case one of the nodes fails.

<figcaption>Architecture of an RKE Kubernetes Cluster Running the Rancher Management Server</figcaption>
![Architecture of an RKE Kubernetes cluster running the Rancher management server]({{<baseurl>}}/img/rancher/rke-server-storage.svg)

# Recommended Load Balancer Configuration for Kubernetes Installations

We recommend the following configurations for the load balancer and Ingress controllers:

* The DNS for Rancher should resolve to a Layer 4 load balancer (TCP)
* The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
* The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
* The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>Rancher installed on a Kubernetes cluster with layer 4 load balancer, depicting SSL termination at Ingress controllers</figcaption>
![Rancher HA]({{<baseurl>}}/img/rancher/ha/rancher2ha.svg)

# Environment for Kubernetes Installations

It is strongly recommended to install Rancher on a Kubernetes cluster on hosted infrastructure such as Amazon's EC2 or Google Compute Engine.

For the best performance and greater security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/) for running your workloads.

It is not recommended to install Rancher on top of a managed Kubernetes service such as Amazon’s EKS or Google Kubernetes Engine. These hosted Kubernetes solutions do not expose etcd to a degree that is manageable for Rancher, and their customizations can interfere with Rancher operations.

# Recommended Node Roles for Kubernetes Installations

Our recommendations for the roles of each node differ depending on whether Rancher is installed on a K3s Kubernetes cluster or an RKE Kubernetes cluster.

### K3s Cluster Roles

In K3s clusters, there are two types of nodes: server nodes and agent nodes. Both servers and agents can have workloads scheduled on them. Server nodes run the Kubernetes master.

For the cluster running the Rancher management server, we recommend using two server nodes. Agent nodes are not required.

### RKE Cluster Roles

If Rancher is installed on an RKE Kubernetes cluster, the cluster should have three nodes, and each node should have all three Kubernetes roles: etcd, controlplane, and worker.

### Contrasting RKE Cluster Architecture for Rancher Server and for Downstream Kubernetes Clusters

Our recommendation for RKE node roles on the Rancher server cluster contrasts with our recommendations for the downstream user clusters that run your apps and services.

Rancher uses RKE as a library when provisioning downstream Kubernetes clusters. Note: The capability to provision downstream K3s clusters will be added in a future version of Rancher.

For downstream Kubernetes clusters, we recommend that each node in a user cluster should have a single role for stability and scalability.

![Kubernetes Roles for Nodes in Rancher Server Cluster vs. User Clusters]({{<baseurl>}}/img/rancher/rancher-architecture-node-roles.svg)

RKE only requires at least one node with each role and does not require nodes to be restricted to one role. However, for the clusters that run your apps, we recommend separate roles for each node so that workloads on worker nodes don't interfere with the Kubernetes master or cluster data as your services scale.

We recommend that downstream user clusters should have at least:

- **Three nodes with only the etcd role** to maintain a quorum if one node is lost, making the state of your cluster highly available
- **Two nodes with only the controlplane role** to make the master component highly available
- **One or more nodes with only the worker role** to run the Kubernetes node components, as well as the workloads for your apps and services

With that said, it is safe to use all three roles on three nodes when setting up the Rancher server because:

* It allows one `etcd` node failure.
* It maintains multiple instances of the master components by having multiple `controlplane` nodes.
* No other workloads than Rancher itself should be created on this cluster.

Because no additional workloads will be deployed on the Rancher server cluster, in most cases it is not necessary to use the same architecture that we recommend for the scalability and reliability of downstream clusters.

For more best practices for downstream clusters, refer to the [production checklist]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/production) or our [best practices guide.]({{<baseurl>}}/rancher/v2.0-v2.4/en/best-practices/)

# Architecture for an Authorized Cluster Endpoint 

If you are using an [authorized cluster endpoint,]({{<baseurl>}}/rancher/v2.0-v2.4/en/overview/architecture/#4-authorized-cluster-endpoint) we recommend creating an FQDN pointing to a load balancer which balances traffic across your nodes with the `controlplane` role.

If you are using private CA signed certificates on the load balancer, you have to supply the CA certificate, which will be included in the generated kubeconfig file to validate the certificate chain. See the documentation on [kubeconfig files]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/kubeconfig/) and [API keys]({{<baseurl>}}/rancher/v2.0-v2.4/en/user-settings/api-keys/#creating-an-api-key) for more information.