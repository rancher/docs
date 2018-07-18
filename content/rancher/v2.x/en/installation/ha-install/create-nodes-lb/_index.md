---
title: 1 - Create Nodes and Load Balancer
weight: 185
---

Use your provider of choice to provision 3 nodes and a Load Balancer endpoint for your RKE install.

> Note: These nodes must be in the same region/datacenter.  You may place these servers in separate availability zones.

Collect the SSH credentials and DNS or IP addresses for your nodes to provide to RKE in the next step.

### Host Requirements

#### Operating System

{{< requirements_os >}}<br/>

#### Nodes

{{< requirements_hardware >}}<br/>

#### Software

{{< requirements_software >}}

{{< note_server-tags >}}

#### Ports

{{< requirements_ports_rancher_rke >}}

<br/>

If you block ports internally on the nodes see the full [ports list]({{< baseurl >}}/rancher/v2.x/en/installation/references/) for all the communication details.

### Load Balancer

RKE will configure an ingress-controller pod, on each of your nodes. The ingress-controller pods are bound to ports 80 and 443 tcp on the host network and are the entry point for https traffic to the Rancher server.

Configure a load balancer as a basic Layer 4 tcp forwarder. The exact configuration will vary depending on your environment.

#### Examples

* [Amazon NLB](nlb/)

<br/>

### [Next: Install Kubernetes with RKE](../install-kubernetes-rke/)