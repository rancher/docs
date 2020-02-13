---
title: Architecture Recommendations
weight: 3
---

Kubernetes cluster. If you are installing Rancher on a single node, the main architecture recommendation that applies to your installation is that the node running Rancher should be [separate from downstream clusters.](#separation-of-rancher-and-user-clusters)

This section covers the following topics:

- [Separation of Rancher and User Clusters](#separation-of-rancher-and-user-clusters)
- [Why HA is Better for Rancher in Production](#why-ha-is-better-for-rancher-in-production)
- [Recommended Load Balancer Configuration for Kubernetes Installations](#recommended-load-balancer-configuration-for-ha-installations)
- [Environment for Kubernetes Installations](#environment-for-ha-installations)
- [Recommended Node Roles for Kubernetes Installations](#recommended-node-roles-for-ha-installations)
- [Architecture for an Authorized Cluster Endpoint](#architecture-for-an-authorized-cluster-endpoint)

# Separation of Rancher and User Clusters

A user cluster is a downstream Kubernetes cluster that runs your apps and services.

If you have a Docker installation of Rancher, the node running the Rancher server should be separate from your downstream clusters.

In Kubernetes Installations of Rancher, the Rancher server cluster should also be separate from the user clusters.

![Separation of Rancher Server from User Clusters]({{<baseurl>}}/img/rancher/rancher-architecture-separation-of-rancher-server.svg)

# Why HA is Better for Rancher in Production

We recommend installing the Rancher server on a three-node Kubernetes cluster for production, primarily because it protects the Rancher server data. The Rancher server stores its data in etcd in both single-node and Kubernetes Installations.

When Rancher is installed on a single node, if the node goes down, there is no copy of the etcd data available on other nodes and you could lose the data on your Rancher server.

By contrast, in the high-availability installation,

- The etcd data is replicated on three nodes in the cluster, providing redundancy and data duplication in case one of the nodes fails.
- A load balancer serves as the single point of contact for clients, distributing network traffic across multiple servers in the cluster and helping to prevent any one server from becoming a point of failure. Note: This [example]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/nginx/) of how to configure an NGINX server as a basic layer 4 load balancer (TCP).

# Recommended Load Balancer Configuration for Kubernetes Installations

We recommend the following configurations for the load balancer and Ingress controllers:

* The DNS for Rancher should resolve to a Layer 4 load balancer (TCP)
* The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
* The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
* The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>Rancher installed on a Kubernetes cluster with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>
![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)
<sup>Rancher installed on a Kubernetes cluster with Layer 4 load balancer (TCP), depicting SSL termination at ingress controllers</sup>

# Environment for Kubernetes Installations

It is strongly recommended to install Rancher on a Kubernetes cluster on hosted infrastructure such as Amazon's EC2 or Google Compute Engine.

For the best performance and greater security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

It is not recommended to install Rancher on top of a managed Kubernetes service such as Amazon’s EKS or Google Kubernetes Engine. These hosted Kubernetes solutions do not expose etcd to a degree that is manageable for Rancher, and their customizations can interfere with Rancher operations.

# Recommended Node Roles for Kubernetes Installations 

We recommend installing Rancher on a Kubernetes cluster in which each node has all three Kubernetes roles: etcd, controlplane, and worker.

### Comparing Node Roles for the Rancher Server Cluster and User Clusters

Our recommendation for node roles on the Rancher server cluster contrast with our recommendations for the downstream user clusters that run your apps and services. We recommend that each node in a user cluster should have a single role for stability and scalability.

![Kubernetes Roles for Nodes in Rancher Server Cluster vs. User Clusters]({{<baseurl>}}/img/rancher/rancher-architecture-node-roles.svg)

Kubernetes only requires at least one node with each role and does not require nodes to be restricted to one role. However, for the clusters that run your apps, we recommend separate roles for each node so that workloads on worker nodes don't interfere with the Kubernetes master or cluster data as your services scale.

We recommend that downstream user clusters should have at least:

- **Three nodes with only the etcd role** to maintain a quorum if one node is lost, making the state of your cluster highly available
- **Two nodes with only the controlplane role** to make the master component highly available
- **One or more nodes with only the worker role** to run the Kubernetes node components, as well as the workloads for your apps and services

With that said, it is safe to use all three roles on three nodes when setting up the Rancher server because:

* It allows one `etcd` node failure.
* It maintains multiple instances of the master components by having multiple `controlplane` nodes.
* No other workloads than Rancher itself should be created on this cluster.

Because no additional workloads will be deployed on the Rancher server cluster, in most cases it is not necessary to use the same architecture that we recommend for the scalability and reliability of user clusters.

For more best practices for user clusters, refer to the [production checklist]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/production) or our [best practices guide.]({{<baseurl>}}/rancher/v2.x/en/best-practices/management/#tips-for-scaling-and-reliability)

# Architecture for an Authorized Cluster Endpoint

If you are using an [authorized cluster endpoint,]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/#4-authorized-cluster-endpoint) we recommend creating an FQDN pointing to a load balancer which balances traffic across your nodes with the `controlplane` role.

If you are using private CA signed certificates on the load balancer, you have to supply the CA certificate, which will be included in the generated kubeconfig file to validate the certificate chain. See the documentation on [kubeconfig files]({{<baseurl>}}/rancher/v2.x/en/k8s-in-rancher/kubeconfig/) and [API keys]({{<baseurl>}}/rancher/v2.x/en/user-settings/api-keys/#creating-an-api-key) for more information.