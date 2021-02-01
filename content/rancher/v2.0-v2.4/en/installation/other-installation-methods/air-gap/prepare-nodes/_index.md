---
title: '1. Set up Infrastructure and Private Registry'
weight: 100
aliases:
  - /rancher/v2.0-v2.4/en/installation/air-gap-single-node/provision-host
---

In this section, you will provision the underlying infrastructure for your Rancher management server in an air gapped environment. You will also set up the private Docker registry that must be available to your Rancher node(s).

An air gapped environment is an environment where the Rancher server is installed offline or behind a firewall.

The infrastructure depends on whether you are installing Rancher on a K3s Kubernetes cluster, an RKE Kubernetes cluster, or a single Docker container. For more information on each installation option, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/)

{{% tabs %}}
{{% tab "K3s" %}}
We recommend setting up the following infrastructure for a high-availability installation:

- **Two Linux nodes,** typically virtual machines, in the infrastructure provider of your choice.
- **An external database** to store the cluster data. PostgreSQL, MySQL, and etcd are supported.
- **A load balancer** to direct traffic to the two nodes.
- **A DNS record** to map a URL to the load balancer. This will become the Rancher server URL, and downstream Kubernetes clusters will need to reach it.
- **A private Docker registry** to distribute Docker images to your machines.

### 1. Set up Linux Nodes

These hosts will be disconnected from the internet, but require being able to connect with your private registry.

Make sure that your nodes fulfill the general installation requirements for [OS, container runtime, hardware, and networking.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/requirements/)

For an example of one way to set up Linux nodes, refer to this [tutorial]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/ec2-node) for setting up nodes as instances in Amazon EC2.

### 2. Set up External Datastore

The ability to run Kubernetes using a datastore other than etcd sets K3s apart from other Kubernetes distributions. This feature provides flexibility to Kubernetes operators. The available options allow you to select a datastore that best fits your use case.

For a high-availability K3s installation, you will need to set up one of the following external databases:

* [PostgreSQL](https://www.postgresql.org/) (certified against versions 10.7 and 11.5)
* [MySQL](https://www.mysql.com/) (certified against version 5.7)
* [etcd](https://etcd.io/) (certified against version 3.3.15)

When you install Kubernetes, you will pass in details for K3s to connect to the database.

For an example of one way to set up the database, refer to this [tutorial]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/rds) for setting up a MySQL database on Amazon's RDS service.

For the complete list of options that are available for configuring a K3s cluster datastore, refer to the [K3s documentation.]({{<baseurl>}}/k3s/latest/en/installation/datastore/)

### 3. Set up the Load Balancer

You will also need to set up a load balancer to direct traffic to the Rancher replica on both nodes. That will prevent an outage of any single node from taking down communications to the Rancher management server.

When Kubernetes gets set up in a later step, the K3s tool will deploy a Traefik Ingress controller. This controller will listen on ports 80 and 443 of the worker nodes, answering traffic destined for specific hostnames.

When Rancher is installed (also in a later step), the Rancher system creates an Ingress resource. That Ingress tells the Traefik Ingress controller to listen for traffic destined for the Rancher hostname. The Traefik Ingress controller, when receiving traffic destined for the Rancher hostname, will forward that traffic to the running Rancher pods in the cluster.

For your implementation, consider if you want or need to use a Layer-4 or Layer-7 load balancer:

- **A layer-4 load balancer** is the simpler of the two choices, in which you are forwarding TCP traffic to your nodes. We recommend configuring your load balancer as a Layer 4 balancer, forwarding traffic to ports TCP/80 and TCP/443 to the Rancher management cluster nodes. The Ingress controller on the cluster will redirect HTTP traffic to HTTPS and terminate SSL/TLS on port TCP/443. The Ingress controller will forward traffic to port TCP/80 to the Ingress pod in the Rancher deployment.
- **A layer-7 load balancer** is a bit more complicated but can offer features that you may want. For instance, a layer-7 load balancer is capable of handling TLS termination at the load balancer, as opposed to Rancher doing TLS termination itself. This can be beneficial if you want to centralize your TLS termination in your infrastructure. Layer-7 load balancing also offers the capability for your load balancer to make decisions based on HTTP attributes such as cookies, etc. that a layer-4 load balancer is not able to concern itself with. If you decide to terminate the SSL/TLS traffic on a layer-7 load balancer, you will need to use the `--set tls=external` option when installing Rancher in a later step. For more information, refer to the [Rancher Helm chart options.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#external-tls-termination)

For an example showing how to set up an NGINX load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/nginx/)

For a how-to guide for setting up an Amazon ELB Network Load Balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/nlb/)

> **Important:**
> Do not use this load balancer (i.e, the `local` cluster Ingress) to load balance applications other than Rancher following installation. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps. We recommend dedicating the `local` cluster to Rancher and no other applications.

### 4. Set up the DNS Record

Once you have set up your load balancer, you will need to create a DNS record to send traffic to this load balancer.

Depending on your environment, this may be an A record pointing to the load balancer IP, or it may be a CNAME pointing to the load balancer hostname. In either case, make sure this record is the hostname that you intend Rancher to respond on.

You will need to specify this hostname in a later step when you install Rancher, and it is not possible to change it later. Make sure that your decision is a final one.

For a how-to guide for setting up a DNS record to route domain traffic to an Amazon ELB load balancer, refer to the [official AWS documentation.](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer)

### 5. Set up a Private Docker Registry

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machines.

In a later step, when you set up your K3s Kubernetes cluster, you will create a [private registries configuration file]({{<baseurl>}}/k3s/latest/en/installation/private-registry/) with details from this registry.

If you need help with creating a private registry, please refer to the [official Docker documentation.](https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry)
{{% /tab %}}
{{% tab "RKE" %}}

To install the Rancher management server on a high-availability RKE cluster, we recommend setting up the following infrastructure:

- **Three Linux nodes,** typically virtual machines, in an infrastructure provider such as Amazon's EC2, Google Compute Engine, or vSphere.
- **A load balancer** to direct front-end traffic to the three nodes.
- **A DNS record** to map a URL to the load balancer. This will become the Rancher server URL, and downstream Kubernetes clusters will need to reach it.
- **A private Docker registry** to distribute Docker images to your machines.

These nodes must be in the same region/data center. You may place these servers in separate availability zones.

### Why three nodes?

In an RKE cluster, Rancher server data is stored on etcd. This etcd database runs on all three nodes.

The etcd database requires an odd number of nodes so that it can always elect a leader with a majority of the etcd cluster. If the etcd database cannot elect a leader, etcd can suffer from [split brain](https://www.quora.com/What-is-split-brain-in-distributed-systems), requiring the cluster to be restored from backup. If one of the three etcd nodes fails, the two remaining nodes can elect a leader because they have the majority of the total number of etcd nodes.

### 1. Set up Linux Nodes

These hosts will be disconnected from the internet, but require being able to connect with your private registry.

Make sure that your nodes fulfill the general installation requirements for [OS, container runtime, hardware, and networking.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/requirements/)

For an example of one way to set up Linux nodes, refer to this [tutorial]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/ec2-node) for setting up nodes as instances in Amazon EC2.

### 2. Set up the Load Balancer

You will also need to set up a load balancer to direct traffic to the Rancher replica on both nodes. That will prevent an outage of any single node from taking down communications to the Rancher management server.

When Kubernetes gets set up in a later step, the RKE tool will deploy an NGINX Ingress controller. This controller will listen on ports 80 and 443 of the worker nodes, answering traffic destined for specific hostnames.

When Rancher is installed (also in a later step), the Rancher system creates an Ingress resource. That Ingress tells the NGINX Ingress controller to listen for traffic destined for the Rancher hostname. The NGINX Ingress controller, when receiving traffic destined for the Rancher hostname, will forward that traffic to the running Rancher pods in the cluster.

For your implementation, consider if you want or need to use a Layer-4 or Layer-7 load balancer:

- **A layer-4 load balancer** is the simpler of the two choices, in which you are forwarding TCP traffic to your nodes. We recommend configuring your load balancer as a Layer 4 balancer, forwarding traffic to ports TCP/80 and TCP/443 to the Rancher management cluster nodes. The Ingress controller on the cluster will redirect HTTP traffic to HTTPS and terminate SSL/TLS on port TCP/443. The Ingress controller will forward traffic to port TCP/80 to the Ingress pod in the Rancher deployment.
- **A layer-7 load balancer** is a bit more complicated but can offer features that you may want. For instance, a layer-7 load balancer is capable of handling TLS termination at the load balancer, as opposed to Rancher doing TLS termination itself. This can be beneficial if you want to centralize your TLS termination in your infrastructure. Layer-7 load balancing also offers the capability for your load balancer to make decisions based on HTTP attributes such as cookies, etc. that a layer-4 load balancer is not able to concern itself with. If you decide to terminate the SSL/TLS traffic on a layer-7 load balancer, you will need to use the `--set tls=external` option when installing Rancher in a later step. For more information, refer to the [Rancher Helm chart options.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/chart-options/#external-tls-termination)

For an example showing how to set up an NGINX load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/nginx/)

For a how-to guide for setting up an Amazon ELB Network Load Balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/nlb/)

> **Important:**
> Do not use this load balancer (i.e, the `local` cluster Ingress) to load balance applications other than Rancher following installation. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps. We recommend dedicating the `local` cluster to Rancher and no other applications.

### 3. Set up the DNS Record

Once you have set up your load balancer, you will need to create a DNS record to send traffic to this load balancer.

Depending on your environment, this may be an A record pointing to the LB IP, or it may be a CNAME pointing to the load balancer hostname. In either case, make sure this record is the hostname that you intend Rancher to respond on.

You will need to specify this hostname in a later step when you install Rancher, and it is not possible to change it later. Make sure that your decision is a final one.

For a how-to guide for setting up a DNS record to route domain traffic to an Amazon ELB load balancer, refer to the [official AWS documentation.](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer)

### 4. Set up a Private Docker Registry

Rancher supports air gap installs using a secure Docker private registry. You must have your own private registry or other means of distributing Docker images to your machines.

In a later step, when you set up your K3s Kubernetes cluster, you will create a [private registries configuration file]({{<baseurl>}}/k3s/latest/en/installation/private-registry/) with details from this registry.

If you need help with creating a private registry, please refer to the [official Docker documentation.](https://docs.docker.com/registry/deploying/#run-an-externally-accessible-registry)

{{% /tab %}}
{{% tab "Docker" %}}
> The Docker installation is for Rancher users that are wanting to test out Rancher. Since there is only one node and a single Docker container, if the node goes down, you will lose all the data of your Rancher server.
>
> For Rancher v2.0-v2.4, there is no migration path from a Docker installation to a high-availability installation. Therefore, you may want to use a Kubernetes installation from the start.

### 1. Set up a Linux Node

This host will be disconnected from the Internet, but needs to be able to connect to your private registry.

Make sure that your node fulfills the general installation requirements for [OS, Docker, hardware, and networking.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/requirements/)

For an example of one way to set up Linux nodes, refer to this [tutorial]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/ec2-node) for setting up nodes as instances in Amazon EC2.

### 2. Set up a Private Docker Registry

Rancher supports air gap installs using a Docker private registry on your bastion server. You must have your own private registry or other means of distributing Docker images to your machines.

In a later step, when you set up your K3s Kubernetes cluster, you will create a [private registries configuration file]({{<baseurl>}}/k3s/latest/en/installation/private-registry/) with details from this registry.

If you need help with creating a private registry, please refer to the [official Docker documentation.](https://docs.docker.com/registry/)

{{% /tab %}}
{{% /tabs %}}

### [Next: Collect and Publish Images to your Private Registry]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/populate-private-registry/)
