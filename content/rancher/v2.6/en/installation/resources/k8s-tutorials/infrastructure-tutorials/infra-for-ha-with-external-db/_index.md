---
title: 'Set up Infrastructure for a High Availability K3s Kubernetes Cluster'
weight: 1
---

This tutorial is intended to help you provision the underlying infrastructure for a Rancher management server.

The recommended infrastructure for the Rancher-only Kubernetes cluster differs depending on whether Rancher will be installed on a K3s Kubernetes cluster, an RKE Kubernetes cluster, or a single Docker container.

For more information about each installation option, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/installation)

> **Note:** These nodes must be in the same region. You may place these servers in separate availability zones (datacenter).

To install the Rancher management server on a high-availability K3s cluster, we recommend setting up the following infrastructure:

- **Two Linux nodes,** typically virtual machines, in the infrastructure provider of your choice.
- **An external database** to store the cluster data. We recommend MySQL.
- **A load balancer** to direct traffic to the two nodes.
- **A DNS record** to map a URL to the load balancer. This will become the Rancher server URL, and downstream Kubernetes clusters will need to reach it.

### 1. Set up Linux Nodes

Make sure that your nodes fulfill the general installation requirements for [OS, container runtime, hardware, and networking.]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/)

For an example of one way to set up Linux nodes, refer to this [tutorial]({{<baseurl>}}/rancher/v2.5/en/installation/options/ec2-node) for setting up nodes as instances in Amazon EC2.

### 2. Set up External Datastore

The ability to run Kubernetes using a datastore other than etcd sets K3s apart from other Kubernetes distributions. This feature provides flexibility to Kubernetes operators. The available options allow you to select a datastore that best fits your use case.

For a high-availability K3s installation, you will need to set a [MySQL](https://www.mysql.com/) external database. Rancher has been tested on K3s Kubernetes clusters using MySQL version 5.7 as the datastore.

When you install Kubernetes using the K3s installation script, you will pass in details for K3s to connect to the database.

For an example of one way to set up the MySQL database, refer to this [tutorial]({{<baseurl>}}/rancher/v2.5/en/installation/options/rds/) for setting up MySQL on Amazon's RDS service.

For the complete list of options that are available for configuring a K3s cluster datastore, refer to the [K3s documentation.]({{<baseurl>}}/k3s/latest/en/installation/datastore/)

### 3. Set up the Load Balancer

You will also need to set up a load balancer to direct traffic to the Rancher replica on both nodes. That will prevent an outage of any single node from taking down communications to the Rancher management server.

When Kubernetes gets set up in a later step, the K3s tool will deploy a Traefik Ingress controller. This controller will listen on ports 80 and 443 of the worker nodes, answering traffic destined for specific hostnames.

When Rancher is installed (also in a later step), the Rancher system creates an Ingress resource. That Ingress tells the Traefik Ingress controller to listen for traffic destined for the Rancher hostname. The Traefik Ingress controller, when receiving traffic destined for the Rancher hostname, will forward that traffic to the running Rancher pods in the cluster.

For your implementation, consider if you want or need to use a Layer-4 or Layer-7 load balancer:

- **A layer-4 load balancer** is the simpler of the two choices, in which you are forwarding TCP traffic to your nodes. We recommend configuring your load balancer as a Layer 4 balancer, forwarding traffic to ports TCP/80 and TCP/443 to the Rancher management cluster nodes. The Ingress controller on the cluster will redirect HTTP traffic to HTTPS and terminate SSL/TLS on port TCP/443. The Ingress controller will forward traffic to port TCP/80 to the Ingress pod in the Rancher deployment.
- **A layer-7 load balancer** is a bit more complicated but can offer features that you may want. For instance, a layer-7 load balancer is capable of handling TLS termination at the load balancer, as opposed to Rancher doing TLS termination itself. This can be beneficial if you want to centralize your TLS termination in your infrastructure. Layer-7 load balancing also offers the capability for your load balancer to make decisions based on HTTP attributes such as cookies, etc. that a layer-4 load balancer is not able to concern itself with. If you decide to terminate the SSL/TLS traffic on a layer-7 load balancer, you will need to use the `--set tls=external` option when installing Rancher in a later step. For more information, refer to the [Rancher Helm chart options.]({{<baseurl>}}/rancher/v2.5/en/installation/options/chart-options/#external-tls-termination)

For an example showing how to set up an NGINX load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/installation/options/nginx/)

For a how-to guide for setting up an Amazon ELB Network Load Balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/installation/options/nlb/)

> **Important:**
> Do not use this load balancer (i.e, the `local` cluster Ingress) to load balance applications other than Rancher following installation. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps. We recommend dedicating the `local` cluster to Rancher and no other applications.

### 4. Set up the DNS Record

Once you have set up your load balancer, you will need to create a DNS record to send traffic to this load balancer.

Depending on your environment, this may be an A record pointing to the load balancer IP, or it may be a CNAME pointing to the load balancer hostname. In either case, make sure this record is the hostname that you intend Rancher to respond on.

You will need to specify this hostname in a later step when you install Rancher, and it is not possible to change it later. Make sure that your decision is a final one.

For a how-to guide for setting up a DNS record to route domain traffic to an Amazon ELB load balancer, refer to the [official AWS documentation.](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-elb-load-balancer)
