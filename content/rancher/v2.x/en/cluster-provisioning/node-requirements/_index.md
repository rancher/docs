---
title: Node Requirements for User Clusters
weight: 1
---

This page describes the requirements for the nodes where your apps and services will be installed.

> This section is about clusters that run your apps and services, not the cluster that runs the Rancher server. The OS and Docker requirements are the same for the Rancher cluster and user clusters, but the requirements for networking and hardware are different. For Rancher installation requirements, refer to the node requirements in the [installation section.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)Your workloads should not run in the same cluster as Rancher. 

Make sure the nodes for the Rancher server fulfill the following requirements:

- [Operating Systems and Docker Requirements](#operating-systems-and-docker)
- [Hardware Requirements](#hardware-requirements)
- [Networking Requirements](#networking-requirements)
  - [Port Requirements](#port-requirements)

# Operating Systems and Docker Requirements

For the nodes in the clusters that run your apps, the requirements for the operating system and Docker version are the same as the [OS and Docker requirements for the Rancher server cluster.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/#operating-systems-and-docker-requirements)

# Hardware Requirements

The basic hardware requirements for the nodes running your apps and services are the same as the hardware requirements for any Kubernetes cluster.

The hardware requirements for nodes with the `worker` role mostly depend on your workloads. The minimum to run the Kubernetes node components is 1 CPU (core) and 1GB of memory.

Regarding CPU and memory, it is recommended that the different planes of Kubernetes clusters (etcd, controplane, and workers) should be hosted on different nodes so that they can scale separately from each other.

For hardware recommendations for large Kubernetes clusters, refer to the official Kubernetes documentation on [building large clusters.](https://kubernetes.io/docs/setup/best-practices/cluster-large/)

For hardware recommendations for etcd clusters in production, refer to the official [etcd documentation.](https://etcd.io/docs/v3.4.0/op-guide/hardware/)

# Networking Requirements

### Port Requirements

The ports required to be open for user cluster nodes changes depending on how the cluster was launched. Each of the tabs below list the ports that need to be opened for different [cluster creation options]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-options).

- Port requirements for custom clusters
- Port requirements for clusters hosted by an infrastructure provider
- Port requirements for clusters hosted by a Kubernetes provider
- Port requirements for imported clusters

>**Tip:**
>
>If security isn't a large concern and you're okay with opening a few additional ports, you can use the table in [Commonly Used Ports]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/node-requirements/common-ports) as your port reference instead of the comprehensive tables in this section.




# ports_aws_securitygroup_nodedriver
{{< ports_aws_securitygroup_nodedriver >}}

# requirements_ports_rke
{{< requirements_ports_rke >}}

# Ports-rke-nodes
{{<ports-rke-nodes>}}

# requirements_ports_rancher_rke
{{<requirements_ports_rancher_rke>}}