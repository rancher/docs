---
title: 1 - Create Nodes and Load Balancer
weight: 185
---

Use your provider of choice to provision 3 nodes and a Load Balancer endpoint for your RKE install.

> **Note:** These nodes must be in the same region/datacenter.  You may place these servers in separate availability zones.

**Don't forget to collect the SSH credentials and DNS or IP addresses of your nodes to provide to RKE in the next step.**

### Host Requirements

View the requirements for nodes hosting Rancher at [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

### Load Balancer

RKE will configure an ingress-controller pod, on each of your nodes. The ingress-controller pods are bound to ports 80 and 443 TCP on the host network and are the entry point for HTTPS traffic to the Rancher server.

Configure a load balancer as a basic Layer 4 TCP forwarder. The exact configuration will vary depending on your environment.

#### Examples

* [Amazon NLB]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/nlb/)

<br/>

### [Next: Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/)