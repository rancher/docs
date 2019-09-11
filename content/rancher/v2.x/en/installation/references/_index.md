---
title: Port Requirements
weight: 300
aliases:
  - /rancher/v2.x/en/hosts/amazon/#required-ports-for-rancher-to-work/
---

To operate properly, Rancher requires a number of ports to be open on Rancher nodes and Kubernetes cluster nodes.

## Rancher Nodes

The following table lists the ports that need to be open to and from nodes that are running the Rancher server container for [single node installs]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install/) or pods for [high availability installs]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install/).

{{< ports-rancher-nodes >}}

**Note** Rancher nodes may also require additional outbound access for any external [authentication provider]({{< baseurl >}}rancher/v2.x/en/admin-settings/authentication/) which is configured (LDAP for example).

## Kubernetes Cluster Nodes

The ports required to be open for cluster nodes changes depending on how the cluster was launched. Each of the tabs below list the ports that need to be opened for different [cluster creation options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-options).

>**Tip:**
>
>If security isn't a large concern and you're okay with opening a few additional ports, you can use the table in [Commonly Used Ports](#commonly-used-ports) as your port reference instead of the comprehensive tables below.

{{% tabs %}}

{{% tab "Node Pools" %}}

The following table depicts the port requirements for [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with nodes created in an [Infrastructure Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/).

>**Note:**
>The required ports are automatically opened by Rancher during creation of clusters in cloud providers like Amazon EC2 or DigitalOcean.

{{< ports-iaas-nodes >}}

{{% /tab %}}

{{% tab "Custom Nodes" %}}

The following table depicts the port requirements for [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with [Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/).

{{< ports-custom-nodes >}}

{{% /tab %}}

{{% tab "Hosted Clusters" %}}

The following table depicts the port requirements for [hosted clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters).

{{< ports-imported-hosted >}}

{{% /tab %}}

{{% tab "Imported Clusters" %}}

The following table depicts the port requirements for [imported clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/).

{{< ports-imported-hosted >}}

{{% /tab %}}

{{% /tabs %}}


## Other Port Considerations

### Commonly Used Ports

These ports are typically opened on your Kubernetes nodes, regardless of what type of cluster it is.

| Protocol 	|       Port       	| Description                                     	|
|:--------:	|:----------------:	|-------------------------------------------------	|
|    TCP   	|        22        	| Node driver SSH provisioning                    	|
|    TCP   	|       2376       	| Node driver Docker daemon TLS port              	|
|    TCP   	|       2379       	| etcd client requests                           	|
|    TCP   	|       2380       	| etcd peer communication                         	|
|    UDP   	|       8472       	| Canal/Flannel VXLAN overlay networking          	|
|    UDP   	|       4789       	| Flannel VXLAN overlay networking on Windows cluster |
|    TCP   	|       9099       	| Canal/Flannel livenessProbe/readinessProbe      	|
|    TCP   	|       6783       	| Weave Port      	|
|    UDP   	|       6783-6784   | Weave UDP Ports      	|
|    TCP   	|       10250      	| kubelet API                                     	|
|    TCP   	|       10254      	| Ingress controller livenessProbe/readinessProbe 	|
| TCP/UDP  	| 30000-</br>32767 	| NodePort port range                             	|

----

### Local Node Traffic

Ports marked as `local traffic` (i.e., `9099 TCP`) in the above requirements are used for Kubernetes healthchecks (`livenessProbe` and`readinessProbe`).
These healthchecks are executed on the node itself. In most cloud environments, this local traffic is allowed by default.

However, this traffic may be blocked when:

- You have applied strict host firewall policies on the node.
- You are using nodes that have multiple interfaces (multihomed).

In these cases, you have to explicitly allow this traffic in your host firewall, or in case of public/private cloud hosted machines (i.e. AWS or OpenStack), in your security group configuration. Keep in mind that when using a security group as source or destination in your security group, explicitly opening ports only applies to the private interface of the nodes / instances.

### Rancher AWS EC2 security group

When using the [AWS EC2 node driver]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/ec2/) to provision cluster nodes in Rancher, you can choose to let Rancher create a security group called `rancher-nodes`. The following rules are automatically added to this security group.

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
| Custom TCP Rule |    TCP   | 30000-32767 | 0.0.0.0/0            | Inbound   |
| Custom UDP Rule |    UDP   | 30000-32767 | 0.0.0.0/0            | Inbound   |
| All traffic     |    All   | All         | 0.0.0.0/0              | Outbound  |
