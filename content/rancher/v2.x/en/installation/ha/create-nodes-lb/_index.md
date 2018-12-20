---
title: 1—Create Nodes and Load Balancer
weight: 185
---

Use your provider of choice to provision 3 nodes and a Load Balancer endpoint for your RKE install.

> **Note:** These nodes must be in the same region/datacenter.  You may place these servers in separate availability zones.

### Node Requirements

View the supported operating systems and hardware/software/networking requirements for nodes running Rancher at [Node Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

View the OS requirements for RKE at [RKE Requirements]({{< baseurl >}}/rke/v0.1.x/en/os/)

### Load Balancer

RKE will configure an Ingress controller pod, on each of your nodes. The Ingress controller pods are bound to ports TCP/80 and TCP/443 on the host network and are the entry point for HTTPS traffic to the Rancher server.

Configure a load balancer as a basic Layer 4 TCP forwarder. The exact configuration will vary depending on your environment. 

>**Important:**
>Do not use this load balancer (i.e, the `local` cluster Ingress) to load balance applications other than Rancher following installation. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps. We recommend 1) dedicating the `local` cluster to Rancher and no other apps and 2) deploying applications only in clusters that you launch using Rancher.

#### Examples

* [NGINX]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/nginx/)
* [Amazon NLB]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/nlb/)

### [Next: Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/)
