---
title: "1. Create Nodes and Load Balancer"
weight: 100
aliases:
---
Provision three air gapped Linux hosts according to our requirements below to launch Rancher in an HA configuration.

These hosts should be disconnected from the internet, but should have connectivity with your private registry.

### Host Requirements

View hardware and software requirements for each of your cluster nodes in [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

### Recommended Architecture

- DNS for Rancher should resolve to a layer 4 load balancer
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>HA Rancher install with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)

### Load Balancer

RKE, the installer that provisions your air gapped cluster, will configure an Ingress controller pod on each of your nodes. The Ingress controller pods are bound to ports TCP/80 and TCP/443 on the host network and are the entry point for HTTPS traffic to the Rancher server.

Configure a load balancer as a basic Layer 4 TCP forwarder. The exact configuration will vary depending on your environment.
