---
title: Port Requirements
weight: 280
aliases:
  - /rancher/v2.x/en/hosts/amazon/#required-ports-for-rancher-to-work/
---

To operate properly, Rancher requires a number of ports to be open on Rancher nodes and Kubernetes cluster nodes.

## Rancher Nodes

The following table lists the ports that need to be open to/from nodes that are running the `rancher/rancher` container ([Single Node Install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/)) or `cattle` deployment pods ([High Availability Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install/)).

| Protocol |        Port       | Source                                                                                                   | Destination                                              | Description                                |
|:--------:|:-----------------:|----------------------------------------------------------------------------------------------------------|----------------------------------------------------------|--------------------------------------------|
|    TCP   |         80        | Load balancer/reverse proxy                                                                              | -                                                        | HTTP traffic to Rancher UI/API             |
|    TCP   |        443        | Load balancer/reverse proxy </br> Otherwise IPs of all cluster nodes and other Rancher API/UI clients.  | -                                                         | HTTPS traffic to Rancher UI/API            |
|    TCP   |        443        | -                                                                                                        | 35.160.43.145</br>35.167.242.46</br>52.33.59.17          | Rancher catalog (git.rancher.io)           |
|    TCP   |         22        | -                                                                                                        | Any node created using Node Driver                       | SSH provisioning of node by Node Driver    |
|    TCP   |        2376       | -                                                                                                        | Any node created using Node Driver                       | Docker daemon TLS port used by Node Driver |
|    TCP   | Provider dependent| -                                                                                                        | Port of the Kubernetes API Endpoint in Hosted Clusters   | Kubernetes API                             |

----

## Kubernetes Cluster Nodes

The required ports for cluster nodes vary across different methods for creating clusters.

### Hosted/Imported Kubernetes Clusters

The following table depicts the port requirements for [Hosted]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters) and [Imported]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/) clusters.

![Hosted/Imported Port Requirements]({{< baseurl >}}/img/rancher/port-table-hosted-imported.png)

### Rancher Launched Kubernetes Cluster (Instrastructure Nodes)

The following table depicts the port requirements for [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with nodes created in an [Infrastructure Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/).

>**Note:**
>The required ports are automatically opened by Rancher during creation of clusters in cloud providers like Amazon EC2 or DigitalOcean.

![RKE Infrastructure Port Requirements]({{< baseurl >}}/img/rancher/port-table-infrastructure-nodes.png)

### Rancher Launched Kubernetes Cluster (Custom Nodes)

The following table depicts the port requirements for [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with [Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/).

![RKE Custom Port Requirements]({{< baseurl >}}/img/rancher/port-table-custom-nodes.png)

## Annex

### Port Descriptions

Description of common ports referenced in the above requirements.

| Protocol 	|       Port       	| Description                                     	|
|:--------:	|:----------------:	|-------------------------------------------------	|
|    TCP   	|        22        	| Node driver SSH provisioning                    	|
|    TCP   	|       2376       	| Node driver Docker daemon TLS port              	|
|    TCP   	|       2379       	| etcd client requests                           	|
|    TCP   	|       2380       	| etcd peer communication                         	|
|    UDP   	|       8472       	| Canal/Flannel VXLAN overlay networking          	|
|    TCP   	|       9099       	| Canal/Flannel livenessProbe/readinessProbe      	|
|    TCP   	|       10250      	| kubelet API                                     	|
|    TCP   	|       10254      	| Ingress controller livenessProbe/readinessProbe 	|
| TCP/UDP  	| 30000-</br>32767 	| NodePort port range                             	|

----

### Local Node Traffic

Ports marked as `local traffic` in the above requirements (e.g. `9099/tcp`) are used for Kubernetes healthchecks (`livenessProbe` and`readinessProbe`).
These healthchecks are executed on the node itself. In most cloud environments, this local traffic is allowed by default. When you have applied strict host firewall policies on the node, or when you are using nodes that have multiple interfaces (multihomed), this traffic may get blocked. In this case, you have to explicitely allow this traffic in your host firewall, or in case of public/private cloud hosted machines (i.e. AWS or OpenStack), in your security group configuration. Keep in mind that when using a security group as Source or Destination in your security group, that this only applies to the private interface of the nodes/instances.

### Rancher AWS EC2 security group

When using the [AWS EC2 node driver]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/ec2/) to provision cluster nodes in Rancher
you can choose to let Rancher create a Security Group called `rancher-nodes`. The following rules are automatically added to this Security Group.

|       Type      | Protocol |  Port Range | Source/Destination     | Rule Type |
|-----------------|:--------:|:-----------:|------------------------|:---------:|
|       SSH       |    TCP   | 22          | 0.0.0.0/0              | Inbound   |
|       HTTP      |    TCP   | 80          | 0.0.0.0/0              | Inbound   |
| Custom TCP Rule |    TCP   | 443         | 0.0.0.0/0              | Inbound   |
| Custom TCP Rule |    TCP   | 2376        | 0.0.0.0/0              | Inbound   |
| Custom TCP Rule |    TCP   | 2379-2380   | sg-xxx (rancher-nodes) | Inbound   |
| Custom UDP Rule |    UDP   | 4789        | sg-xxx (rancher-nodes) | Inbound   |
| Custom TCP Rule |    TCP   | 6443        | 0.0.0.0/0              | Inbound   |
| Custom UDP Rule |    UDP   | 8472        | sg-xxx (rancher-nodes) | Inbound   |
| Custom TCP Rule |    TCP   | 10250-10252 | sg-xxx (rancher-nodes) | Inbound   |
| Custom TCP Rule |    TCP   | 10256       | sg-xxx (rancher-nodes) | Inbound   |
| Custom TCP Rule |    TCP   | 30000-32767 | 30000-32767            | Inbound   |
| Custom UDP Rule |    UDP   | 30000-32767 | 30000-32767            | Inbound   |
| All traffic     |    All   | All         | 0.0.0.0/0              | Outbound  |

----