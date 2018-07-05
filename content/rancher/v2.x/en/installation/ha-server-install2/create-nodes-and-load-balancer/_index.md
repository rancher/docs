---
title: 1 - Create Nodes and Load Balancer
weight: 276
---

Use your provider of choice to provision 3 nodes and a Load Balancer endpoint for your RKE install.

You will need to provide SSH credentials and DNS/IP address for your nodes to RKE.

### Host Requirements

#### Operating System

{{< requirements_os >}}<br/>

#### Nodes

{{< requirements_hardware >}}<br/>

#### Software

{{< requirements_software >}}

{{< note_server-tags >}}

#### Ports

##### Cluster External Ports

These are ports that should be open between nodes and the external network for communication and management of Rancher.

| Protocol | Ports | Description |
| --- | --- | --- |
| tcp | 22 | SSH for RKE install |
| tcp | 80 | ingress controller - redirect to https |
| tcp | 443 | ingress controller - https traffic to Rancher |
| tcp | 6443 | https to kube-api, used by kubectl and helm |
| tcp | 30000 - 32767 | Kubernetes NodePorts for k8s workloads |

<br/>

##### Additional Ports Required Between Rancher Cluster Nodes

In addition to the ports listed above these ports must be open between nodes.

| Protocol | Ports | Description |
| --- | --- | --- |
| tcp | 2379-2380 | etcd |
| udp | 8472 | overlay networking |
| tcp | 10250 | kubelet |
<br/>

### Load Balancer

RKE will configure an Ingress-Controller pod, on each of your nodes. The ingress controller pods are bound to ports 80 and 443 tcp on the host network and are the entry point for https traffic to the Rancher server.

Configure a load balancer as a basic Layer 4 tcp forwarder. The exact configuration will vary depending on your environment.

#### Examples

* [Amazon NLB]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install2/create-nodes-and-load-balancer/nlb)

<br/>

### [Next: Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install2/rke/)