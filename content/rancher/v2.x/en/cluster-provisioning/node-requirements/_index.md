---
title: Node Requirements for User Clusters
weight: 1
---

This page describes the requirements for the nodes where your apps and services will be installed.

In this section, "user cluster" refers to a cluster running your apps, which should be separate from the cluster (or single node) running Rancher.

> If Rancher is installed on a high-availability Kubernetes cluster, the Rancher server cluster and user clusters have different requirements. For Rancher installation requirements, refer to the node requirements in the [installation section.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)

Make sure the nodes for the Rancher server fulfill the following requirements:

- [Operating systems and container runtime requirements](#operating-systems-and-container-runtime-requirements)
- [Hardware Requirements](#hardware-requirements)
- [Networking Requirements](#networking-requirements)
- [Optional: Security Considerations](#optional-security-considerations)

# Operating Systems and Docker Requirements

Rancher should work with any modern Linux distribution and any modern Docker version. Linux is required for the etcd and controlplane nodes of all downstream clusters. Worker nodes may run Linux or [Windows Server.](#requirements-for-windows-nodes) The capability to use Windows worker nodes in downstream clusters was added in Rancher v2.3.0.

Rancher works has been tested and is supported with downstream clusters running Ubuntu, CentOS, Oracle Linux, RancherOS, and RedHat Enterprise Linux. For details on which OS and Docker versions were tested with each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

All supported operating systems are 64-bit x86.

If you plan to use ARM64, see [Running on ARM64 (Experimental).]({{<baseurl>}}/rancher/v2.x/en/installation/options/arm64-platform/)

For information on how to install Docker, refer to the official [Docker documentation.](https://docs.docker.com/)

Some distributions of Linux derived from RHEL, including Oracle Linux, may have default firewall rules that block communication with Helm. We recommend disabling firewalld. For Kubernetes 1.19, firewalld must be turned off.

SUSE Linux may have a firewall that blocks all ports by default. In that situation, follow [these steps](#opening-suse-linux-ports) to open the ports needed for adding a host to a custom cluster.

### Requirements for Windows Nodes

_Windows worker nodes can be used as of Rancher v2.3.0_

Nodes with Windows Server must run Docker Enterprise Edition.

Windows nodes can be used for worker nodes only. See [Configuring Custom Clusters for Windows]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/)

# Hardware Requirements

The hardware requirements for nodes with the `worker` role mostly depend on your workloads. The minimum to run the Kubernetes node components is 1 CPU (core) and 1GB of memory.

Regarding CPU and memory, it is recommended that the different planes of Kubernetes clusters (etcd, controlplane, and workers) should be hosted on different nodes so that they can scale separately from each other.

For hardware recommendations for large Kubernetes clusters, refer to the official Kubernetes documentation on [building large clusters.](https://kubernetes.io/docs/setup/best-practices/cluster-large/)

For hardware recommendations for etcd clusters in production, refer to the official [etcd documentation.](https://etcd.io/docs/v3.4.0/op-guide/hardware/)

# Networking Requirements

For a production cluster, we recommend that you restrict traffic by opening only the ports defined in the port requirements below.

The ports required to be open are different depending on how the user cluster is launched. Each of the sections below list the ports that need to be opened for different [cluster creation options]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-options).

For a breakdown of the port requirements for etcd nodes, controlplane nodes, and worker nodes in a Kubernetes cluster, refer to the [port requirements for the Rancher Kubernetes Engine.]({{<baseurl>}}/rke/latest/en/os/#ports)

Details on which ports are used in each situation are found in the following sections:

- [Commonly used ports](#commonly-used-ports)
- [Port requirements for custom clusters](#port-requirements-for-custom-clusters)
- [Port requirements for clusters hosted by an infrastructure provider](#port-requirements-for-clusters-hosted-by-an-infrastructure-provider)
  - [Security group for nodes on AWS EC2](#security-group-for-nodes-on-aws-ec2)
- [Port requirements for clusters hosted by a Kubernetes provider](#port-requirements-for-clusters-hosted-by-a-kubernetes-provider)
- [Port requirements for imported clusters](#port-requirements-for-imported-clusters)
- [Port requirements for local traffic](#port-requirements-for-local-traffic)

### Commonly Used Ports

If security isn't a large concern and you're okay with opening a few additional ports, you can use this table as your port reference instead of the comprehensive tables in the following sections.

These ports are typically opened on your Kubernetes nodes, regardless of what type of cluster it is.

<figcaption>Commonly Used Ports Reference</figcaption>

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

### Port Requirements for Custom Clusters

If you are launching a Kubernetes cluster on your existing infrastructure, refer to these port requirements.

The following table depicts the port requirements for [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with [custom nodes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/).

{{< ports-custom-nodes >}}

### Port Requirements for Clusters Hosted by an Infrastructure Provider

If you are launching a Kubernetes cluster on nodes that are in an infrastructure provider such as Amazon EC2, Google Container Engine, DigitalOcean, Azure, or vSphere, these port requirements apply.

These required ports are automatically opened by Rancher during creation of clusters using cloud providers.

The following table depicts the port requirements for [Rancher Launched Kubernetes]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) with nodes created in an [Infrastructure Provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/).

>**Note:**
>The required ports are automatically opened by Rancher during creation of clusters in cloud providers like Amazon EC2 or DigitalOcean.

{{< ports-iaas-nodes >}}

#### Security Group for Nodes on AWS EC2

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

### Port Requirements for Clusters Hosted by a Kubernetes Provider

If you are launching a cluster with a [hosted Kubernetes provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters). such as Google Kubernetes Engine, Amazon EKS, or Azure Kubernetes Service, refer to these port requirements.

{{< ports-imported-hosted >}}


### Port Requirements for Imported Clusters

The following table depicts the port requirements for [imported clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/).

{{< ports-imported-hosted >}}


### Port Requirements for Local Traffic

Ports marked as `local traffic` (i.e., `9099 TCP`) in the port requirements are used for Kubernetes healthchecks (`livenessProbe` and`readinessProbe`).
These healthchecks are executed on the node itself. In most cloud environments, this local traffic is allowed by default.

However, this traffic may be blocked when:

- You have applied strict host firewall policies on the node.
- You are using nodes that have multiple interfaces (multihomed).

In these cases, you have to explicitly allow this traffic in your host firewall, or in case of public/private cloud hosted machines (i.e. AWS or OpenStack), in your security group configuration. Keep in mind that when using a security group as source or destination in your security group, explicitly opening ports only applies to the private interface of the nodes/instances.

# Optional: Security Considerations

If you want to provision a Kubernetes cluster that is compliant with the CIS (Center for Internet Security) Kubernetes Benchmark, we recommend to following our hardening guide to configure your nodes before installing Kubernetes.

For more information on the hardening guide and details on which version of the guide corresponds to your Rancher and Kubernetes versions, refer to the [security section.]({{<baseurl>}}/rancher/v2.x/en/security/#rancher-hardening-guide)

# Opening SUSE Linux Ports

SUSE Linux may have a firewall that blocks all ports by default. To open the ports needed for adding the host to a custom cluster,

1. SSH into the instance.
1. Edit /`etc/sysconfig/SuSEfirewall2` and open the required ports. In this example, ports 9796 and 10250 are also opened for monitoring:
  ```
  FW_SERVICES_EXT_TCP="22 80 443 2376 2379 2380 6443 9099 9796 10250 10254 30000:32767"
  FW_SERVICES_EXT_UDP="8472 30000:32767"
  FW_ROUTE=yes
  ```
1. Restart the firewall with the new ports:
  ```
  SuSEfirewall2
  ```

**Result:** The node has the open ports required to be added to a custom cluster.

