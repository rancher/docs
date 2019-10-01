---
title: "1. Prepare your Node(s)"
weight: 100
aliases:
  - /rancher/v2.x/en/installation/air-gap-high-availability/provision-hosts
  - /rancher/v2.x/en/installation/air-gap-single-node/provision-host
---

This section is about how to prepare your node(s) to install Rancher for your air gapped environment. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy. There are _tabs_ for either a high availability (recommended) or a single node installation.

{{% tabs %}}
{{% tab "HA Install (Recommended)" %}}

Rancher recommends installing Rancher in a Highly Available (HA) configuration. An HA installation is comprised of three nodes running the Rancher server components on a Kubernetes cluster. The persistence layer (etcd) is also replicated on these three nodes, providing redundancy and data duplication in case one of the nodes fails.

### Recommended Architecture

- DNS for Rancher should resolve to a layer 4 load balancer
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>HA Rancher install with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)

### A. Provision three air gapped Linux hosts according to our requirements

These hosts will be disconnected from the internet, but require being able to connect with your private registry.

View hardware and software requirements for each of your cluster nodes in [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

### B. Set up your Load Balancer

When setting up the Kubernetes cluster that will run the Rancher server components, an Ingress controller pod will be deployed on each of your nodes. The Ingress controller pods are bound to ports TCP/80 and TCP/443 on the host network and are the entry point for HTTPS traffic to the Rancher server.

You will need to configure a load balancer as a basic Layer 4 TCP forwarder to direct traffic to these ingress controller pods. The exact configuration will vary depending on your environment.

>**Important:**
>Only use this load balancer (i.e, the `local` cluster Ingress) to load balance the Rancher server. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps.

**Load Balancer Configuration Samples:**

- [NGINX]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/nginx)
- [Amazon NLB]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/nlb)

{{% /tab %}}
{{% tab "Single Node Install" %}}

The single node installation is for Rancher users that are wanting to **test** out Rancher. Instead of running on a Kubernetes cluster, you install the Rancher server component on a single node using a `docker run` command. Since there is only one node and a single Docker container, if the node goes down, there is no copy of the etcd data available on other nodes and you will lose all the data of your Rancher server. **Important: If you install Rancher following the single node installation guide, there is no upgrade path to transition your single node installation to a HA installation.** Instead of running the single node installation, you have the option to follow the HA install guide, but only use one node to install Rancher. Afterwards, you can scale up the etcd nodes in your Kubernetes cluster to make it a HA installation.

### A. Provision a single, air gapped Linux host according to our Requirements

These hosts will be disconnected from the internet, but require being able to connect with your private registry.

View hardware and software requirements for each of your cluster nodes in [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

{{% /tab %}}
{{% /tabs %}}

### [Next: Collect and Publish Images to your Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap/populate-private-registry/)
