---
title: Port Requirements
description: Read about port requirements needed in order for Rancher to operate properly, both for Rancher nodes and downstream Kubernetes cluster nodes
weight: 300
---

To operate properly, Rancher requires a number of ports to be open on Rancher nodes and on downstream Kubernetes cluster nodes.

## Rancher Nodes

The following table lists the ports that need to be open to and from nodes that are running the Rancher server.

The port requirements differ based on whether Rancher is installed in a K3s Kubernetes cluster, an RKE Kubernetes cluster, or a single Docker container.

{{% tabs %}}
{{% tab "K3s" %}}

The K3s server needs port 6443 to be accessible by the nodes.

The nodes need to be able to reach other nodes over UDP port 8472 when Flannel VXLAN is used. The node should not listen on any other port. K3s uses reverse tunneling such that the nodes make outbound connections to the server and all kubelet traffic runs through that tunnel. However, if you do not use Flannel and provide your own custom CNI, then port 8472 is not needed by K3s.

If you wish to utilize the metrics server, you will need to open port 10250 on each node.

> **Important:** The VXLAN port on nodes should not be exposed to the world as it opens up your cluster network to be accessed by anyone. Run your nodes behind a firewall/security group that disables access to port 8472.

<figcaption>Inbound Rules for Rancher Server Nodes</figcaption>

| Protocol | Port | Source | Description
|-----|-----|----------------|---|
| TCP | 6443 | K3s server nodes | Kubernetes API
| UDP | 8472 | K3s server and agent nodes | Required only for Flannel VXLAN.
| TCP | 10250 | K3s server and agent nodes | kubelet

Typically all outbound traffic is allowed.

{{% /tab %}}
{{% tab "RKE" %}}
<figcaption>Inbound Rules for Rancher Nodes</figcaption>

| Protocol | Port | Source | Description |
|-----|-----|----------------|---|
| TCP | 80 | Load Balancer/Reverse Proxy | HTTP traffic to Rancher UI/API |
| TCP | 443 | <ul><li>Load Balancer/Reverse Proxy</li><li>IPs of all cluster nodes and other API/UI clients</li></ul> | HTTPS traffic to Rancher UI/API |

<figcaption>Outbound Rules for Rancher Nodes</figcaption>

| Protocol | Port | Destination | Description |
|-----|-----|----------------|---|
| TCP | 443 | `35.160.43.145`,`35.167.242.46`,`52.33.59.17` | Rancher catalog (git.rancher.io) |
| TCP | 22 | Any node created using a node driver | SSH provisioning of node by node driver |
| TCP | 2376 | Any node created using a node driver | Docker daemon TLS port used by node driver |
| TCP | Provider dependent | Port of the Kubernetes API endpoint in hosted cluster | Kubernetes API |

{{% /tab %}}
{{% tab "Docker" %}}

<figcaption>Inbound Rules for Rancher Node</figcaption>

| Protocol | Port | Source | Description
|-----|-----|----------------|---|
| TCP | 80 | Load balancer/proxy that does external SSL termination | Rancher UI/API when external SSL termination is used
| TCP | 443 | <ul><li>hosted/imported Kubernetes</li><li>any source that needs to be able to use the Rancher UI or API</li></ul> | Rancher agent, Rancher UI/API, kubectl

<figcaption>Outbound Rules for Rancher Node</figcaption>

| Protocol | Port | Source | Description |
|-----|-----|----------------|---|
| TCP | 22 | Any node IP from a node created using Node Driver | SSH provisioning of nodes using Node Driver |
| TCP | 443 | `35.160.43.145/32`,`35.167.242.46/32`,`52.33.59.17/32` | git.rancher.io (catalogs) |
| TCP | 2376 | Any node IP from a node created using a node driver | Docker daemon TLS port used by Docker Machine |
| TCP | 6443 | Hosted/Imported Kubernetes API | Kubernetes API server |

{{% /tab %}}
{{% /tabs %}}

> **Notes:**
>
> - Rancher nodes may also require additional outbound access for any external authentication provider which is configured (LDAP for example).
> - Kubernetes recommends TCP 30000-32767 for node port services.
> - For firewalls, traffic may need to be enabled within the cluster and pod CIDR.

## Downstream Kubernetes Cluster Nodes

Downstream Kubernetes clusters run your apps and services. This section describes what ports need to be opened on the nodes in downstream clusters so that Rancher can communicate with them.

The port requirements differ depending on how the downstream cluster was launched. Each of the tabs below list the ports that need to be opened for different [cluster types]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-options).

>**Tip:**
>
>If security isn't a large concern and you're okay with opening a few additional ports, you can use the table in [Commonly Used Ports](#commonly-used-ports) as your port reference instead of the comprehensive tables below.

{{% tabs %}}

{{% tab "Node Pools" %}}

The following table depicts the port requirements for [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with nodes created in an [Infrastructure Provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/).

>**Note:**
>The required ports are automatically opened by Rancher during creation of clusters in cloud providers like Amazon EC2 or DigitalOcean.

{{< ports-iaas-nodes >}}

{{% /tab %}}

{{% tab "Custom Nodes" %}}

The following table depicts the port requirements for [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with [Custom Nodes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/).

{{< ports-custom-nodes >}}

{{% /tab %}}

{{% tab "Hosted Clusters" %}}

The following table depicts the port requirements for [hosted clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters).

{{< ports-imported-hosted >}}

{{% /tab %}}

{{% tab "Imported Clusters" %}}

The following table depicts the port requirements for [imported clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/).

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
|    TCP    |       9796        | Default port required by Monitoring to scrape metrics |
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

When using the [AWS EC2 node driver]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/ec2/) to provision cluster nodes in Rancher, you can choose to let Rancher create a security group called `rancher-nodes`. The following rules are automatically added to this security group.

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
