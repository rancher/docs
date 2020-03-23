---
title: '1. Create Nodes and Load Balancer'
weight: 185
aliases:
  - /rancher/v2.x/en/installation/ha/create-nodes-lb
---

Use your infrastructure provider of choice to provision three nodes and a load balancer endpoint for your RKE install.

> **Note:** These nodes must be in the same region. You may place these servers in separate availability zones (datacenter).

### Requirements for OS, Docker, Hardware, and Networking

Make sure that your nodes fulfill the general [installation requirements.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)

View the OS requirements for RKE at [RKE Requirements.]({{<baseurl>}}/rke/latest/en/os/)

### Load Balancer

RKE will configure an Ingress controller pod, on each of your nodes. The Ingress controller pods are bound to ports TCP/80 and TCP/443 on the host network and are the entry point for HTTPS traffic to the Rancher server.

Configure a load balancer as a basic Layer 4 TCP forwarder. The exact configuration will vary depending on your environment.

> **Important:**
> Do not use this load balancer (i.e, the `local` cluster Ingress) to load balance applications other than Rancher following installation. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps. We recommend dedicating the `local` cluster to Rancher and no other applications.

#### How-to Guides

- For an example showing how to set up an NGINX load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/nginx/)
- For an example showing how to setup an Amazon NLB load balancer, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/nlb/)

### [Next: Install Kubernetes with RKE]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/kubernetes-rke/)
