---
title: '1. Set up Infrastructure'
weight: 185
aliases:
  - /rancher/v2.x/en/installation/ha/create-nodes-lb
---

In this section, you will provision the underlying infrastructure for your Rancher management server.

The recommended infrastructure for the Rancher-only Kubernetes cluster differs depending on whether K3s or RKE is used to install Kubernetes.

{{% tabs %}}
{{% tab "K3s" %}}
To install the Rancher management server on a high-availability K3s cluster, we recommend setting up the following infrastructure:

- **Two Linux nodes,** typically virtual machines, in the infrastructure provider of your choice.
- **An external database** to store the cluster data. PostgreSQL, MySQL, and etcd are supported.
- **A load balancer** to direct traffic to the two nodes.

### 1. Set up Linux Nodes

Make sure that your nodes fulfill the general installation requirements for [OS, Docker, hardware, and networking.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)

For an example of one way to set up Linux nodes, refer to this [tutorial](./ec2-node) for setting up nodes as instances in Amazon EC2.

### 2. Set up External Datastore

The ability to run Kubernetes using a datastore other than etcd sets K3s apart from other Kubernetes distributions. This feature provides flexibility to Kubernetes operators. The available datastore options allow you to select a datastore that best fits your use case.

For a high-availability K3s installation, you will need to set up one of the following external databases:

* [PostgreSQL](https://www.postgresql.org/) (certified against versions 10.7 and 11.5)
* [MySQL](https://www.mysql.com/) (certified against version 5.7)
* [etcd](https://etcd.io/) (certified against version 3.3.15)

When you install Kubernetes using the K3s installation script, you will pass in details for K3s to connect to the database.

For an example of one way to set up the database, refer to this [tutorial](./rds) for setting up a MySQL database on Amazon's RDS service.

For the complete list of options that are available for configuring a K3s cluster datastore, refer to the [K3s documentation.]({{<baseurl>}}/k3s/latest/en/installation/datastore/)

### 3. Set up the Load Balancer

You will also need to set up a load balancer to direct traffic to the Rancher replica on both nodes.

Configure a load balancer as a basic Layer 4 TCP forwarder. The exact configuration will vary depending on your environment.

External traffic will enter the Rancher management server cluster through an Ingress controller pod on each node. The Ingress controller pods are bound to ports TCP/80 and TCP/443 on the host network and are the entry point for HTTPS traffic to the Rancher server. In a later step, you will use the Helm package manager to install Rancher's Helm chart on the Kubernetes cluster. This Helm chart will set up a replica of Rancher on each node in the cluster. Therefore, we recommend using a load balancer to direct traffic to ports 80 and 443 on each replica of Rancher in the cluster.

- The DNS for Rancher should resolve to a layer 4 load balancer.
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the Ingress pod in the Rancher deployment.

For an example showing how to set up an NGINX load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/nginx/)

For a how-to guide for setting up an Amazon NLB load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/nlb/)

> **Important:**
> Do not use this load balancer (i.e, the `local` cluster Ingress) to load balance applications other than Rancher following installation. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps. We recommend dedicating the `local` cluster to Rancher and no other applications.

{{% /tab %}}
{{% tab "RKE" %}}
To install the Rancher management server on a high-availability RKE cluster, we recommend setting up the following infrastructure:

- **Three Linux nodes,** typically virtual machines, in an infrastructure provider such as Amazon's EC2 or Google Compute Engine.
- **A load balancer** to direct front-end traffic to the three nodes.

These nodes must be in the same region/data center. You may place these servers in separate availability zones.

### Why three nodes?

In an RKE cluster, Rancher server data is stored on etcd. This etcd database runs on all three nodes.

The etcd database requires an odd number of nodes is so that it can always elect a leader with a majority of the etcd cluster. If the etcd database cannot elect a leader, etcd can fail, requiring the cluster to be restored from backup. If one of the three etcd nodes fails, the two remaining nodes can safely elect a leader because they have the majority of the total number of etcd nodes.

### 1. Set up Linux Nodes

Make sure that your nodes fulfill the general installation requirements for [OS, Docker, hardware, and networking.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)

For an example of one way to set up Linux nodes, refer to this [tutorial](./ec2-node) for setting up nodes as instances in Amazon EC2.

### 2. Set up the Load Balancer

You will also need to set up a load balancer to direct traffic to the Rancher replica on each of the three nodes.

Configure a load balancer as a basic Layer 4 TCP forwarder. The exact configuration will vary depending on your environment.

RKE will configure an Ingress controller pod on each node. The Ingress controller pods are bound to ports TCP/80 and TCP/443 on the host network and are the entry point for HTTPS traffic to the Rancher server. In a later step, you will use the Helm package manager to install Rancher's Helm chart on the Kubernetes cluster. This Helm chart will set up a replica of Rancher on each node in the cluster. Therefore, we recommend using a load balancer to direct traffic to ports 80 and 443 on each replica of Rancher in the cluster.

- The DNS for Rancher should resolve to a layer 4 load balancer
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>Kubernetes Rancher install with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>
![High-availability Kubernetes Installation of Rancher]({{<baseurl>}}/img/rancher/ha/rancher2ha.svg)
<sup>Kubernetes Rancher install with Layer 4 load balancer (TCP), depicting SSL termination at ingress controllers</sup>

> **Important:**
> Do not use this load balancer (i.e, the `local` cluster Ingress) to load balance applications other than Rancher following installation. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps. We recommend dedicating the `local` cluster to Rancher and no other applications.

For an example showing how to set up an NGINX load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/nginx/)

For a how-to guide for setting up an Amazon NLB load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/nlb/)
{{% /tab %}}
{{% /tabs %}}

### [Next: Set up a Kubernetes Cluster]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/kubernetes-rke/)