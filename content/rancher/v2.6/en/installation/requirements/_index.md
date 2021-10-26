---
title: Installation Requirements
description: Learn the node requirements for each node running Rancher server when you’re configuring  Rancher to run either in a Docker or Kubernetes setup
weight: 1
---

This page describes the software, hardware, and networking requirements for the nodes where the Rancher server will be installed. The Rancher server can be installed on a single node or a high-availability Kubernetes cluster.

> It is important to note that if you install Rancher on a Kubernetes cluster, requirements are different from the [node requirements for downstream user clusters,]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/node-requirements/) which will run your apps and services.

Make sure the node(s) for the Rancher server fulfill the following requirements:

- [Operating Systems and Container Runtime Requirements](#operating-systems-and-container-runtime-requirements)
  - [RKE Specific Requirements](#rke-specific-requirements)
  - [K3s Specific Requirements](#k3s-specific-requirements)
  - [RKE2 Specific Requirements](#rke2-specific-requirements)
  - [Installing Docker](#installing-docker)
- [Hardware Requirements](#hardware-requirements)
- [CPU and Memory](#cpu-and-memory)
  - [RKE and Hosted Kubernetes](#rke-and-hosted-kubernetes)
  - [K3s Kubernetes](#k3s-kubernetes)
  - [RKE2 Kubernetes](#rke2-kubernetes)
  - [Docker](#docker)
- [Ingress](#ingress)
  - [Ingress for RKE2](#ingress-for-rke2)
  - [Ingress for EKS](#ingress-for-eks)
- [Disks](#disks)
- [Networking Requirements](#networking-requirements)
  - [Node IP Addresses](#node-ip-addresses)
  - [Port Requirements](#port-requirements)
- [Dockershim Support](#dockershim-support)

For a list of best practices that we recommend for running the Rancher server in production, refer to the [best practices section.]({{<baseurl>}}/rancher/v2.6/en/best-practices/rancher-server/deployment-types/)

The Rancher UI works best in Firefox or Chrome.

# Operating Systems and Container Runtime Requirements

Rancher should work with any modern Linux distribution.

Docker is required for nodes that will run RKE Kubernetes clusters. It is not required for Kubernetes installs.

Rancher needs to be installed on a supported Kubernetes version. To find out which versions of Kubernetes are supported for your Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

For details on which OS and Docker versions were tested with each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

All supported operating systems are 64-bit x86.

The `ntp` (Network Time Protocol) package should be installed. This prevents errors with certificate validation that can occur when the time is not synchronized between the client and server.

Some distributions of Linux may have default firewall rules that block communication with Helm. We recommend disabling firewalld. For Kubernetes v1.19, v1.20 and v1.21, firewalld must be turned off.

If you don't feel comfortable doing so you might check suggestions in the [respective issue](https://github.com/rancher/rancher/issues/28840). Some users were successful [creating a separate firewalld zone with a policy of ACCEPT for the Pod CIDR](https://github.com/rancher/rancher/issues/28840#issuecomment-787404822).

If you plan to run Rancher on ARM64, see [Running on ARM64 (Experimental).]({{<baseurl>}}/rancher/v2.6/en/installation/resources/advanced/arm64-platform/)

### RKE Specific Requirements

For the container runtime, RKE should work with any modern Docker version.

### K3s Specific Requirements

For the container runtime, K3s should work with any modern version of Docker or containerd.

Rancher needs to be installed on a supported Kubernetes version. To find out which versions of Kubernetes are supported for your Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/) To specify the K3s version, use the INSTALL_K3S_VERSION environment variable when running the K3s installation script. 

If you are installing Rancher on a K3s cluster with **Raspbian Buster**, follow [these steps]({{<baseurl>}}/k3s/latest/en/advanced/#enabling-legacy-iptables-on-raspbian-buster) to switch to legacy iptables.

If you are installing Rancher on a K3s cluster with Alpine Linux, follow [these steps]({{<baseurl>}}/k3s/latest/en/advanced/#additional-preparation-for-alpine-linux-setup) for additional setup.



### RKE2 Specific Requirements

For details on which OS versions were tested with RKE2, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

Docker is not required for RKE2 installs.

The Ingress should be deployed as DaemonSet to ensure your load balancer can successfully route traffic to all nodes. Currently, RKE2 deploys nginx-ingress as a deployment by default, so you will need to deploy it as a DaemonSet by following [these steps.]({{<baseurl>}}/rancher/v2.6/en/installation/resources/k8s-tutorials/ha-rke2/#5-configure-nginx-to-be-a-daemonset)

### Installing Docker

Docker is required for Helm chart installs, and it can be installed by following the steps in the official [Docker documentation.](https://docs.docker.com/) Rancher also provides [scripts]({{<baseurl>}}/rancher/v2.6/en/installation/requirements/installing-docker) to install Docker with one command.

# Hardware Requirements

The following sections describe the CPU, memory, and disk requirements for the nodes where the Rancher server is installed.

# CPU and Memory

Hardware requirements scale based on the size of your Rancher deployment. Provision each individual node according to the requirements. The requirements are different depending on if you are installing Rancher in a single container with Docker, or if you are installing Rancher on a Kubernetes cluster.

### RKE and Hosted Kubernetes

These CPU and memory requirements apply to each host in the Kubernetes cluster where the Rancher server is installed.

These requirements apply to RKE Kubernetes clusters, as well as to hosted Kubernetes clusters such as EKS.

| Deployment Size | Clusters   | Nodes        | vCPUs  | RAM     |
| --------------- | ---------- | ------------ | -------| ------- |
| Small           | Up to 150  | Up to 1500   | 2      | 8 GB    |
| Medium          | Up to 300  | Up to 3000   | 4      | 16 GB   |
| Large           | Up to 500  | Up to 5000   | 8      | 32 GB   |
| X-Large         | Up to 1000 | Up to 10,000 | 16     | 64 GB   |
| XX-Large        | Up to 2000 | Up to 20,000 | 32     | 128 GB  |

[Contact Rancher](https://rancher.com/contact/) for more than 2000 clusters and/or 20,000 nodes.

### K3s Kubernetes

These CPU and memory requirements apply to each host in a [K3s Kubernetes cluster where the Rancher server is installed.]({{<baseurl>}}/rancher/v2.6/en/installation/install-rancher-on-k8s/)

| Deployment Size | Clusters   | Nodes        | vCPUs  | RAM      | Database Size             |
| --------------- | ---------- | ------------ | -------| ---------| ------------------------- |
| Small           | Up to 150  | Up to 1500   | 2      | 8 GB     | 2 cores, 4 GB + 1000 IOPS |
| Medium          | Up to 300  | Up to 3000   | 4      | 16 GB    | 2 cores, 4 GB + 1000 IOPS |
| Large           | Up to 500  | Up to 5000   | 8      | 32 GB    | 2 cores, 4 GB + 1000 IOPS |
| X-Large         | Up to 1000 | Up to 10,000 | 16     | 64 GB    | 2 cores, 4 GB + 1000 IOPS |
| XX-Large        | Up to 2000 | Up to 20,000 | 32     | 128 GB   | 2 cores, 4 GB + 1000 IOPS |

[Contact Rancher](https://rancher.com/contact/) for more than 2000 clusters and/or 20,000 nodes.


### RKE2 Kubernetes

These CPU and memory requirements apply to each instance with RKE2 installed. Minimum recommendations are outlined here.

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 2     | 5 GB |
| Medium          | Up to 15 | Up to 200 | 3     | 9 GB |

### Docker

These CPU and memory requirements apply to a host with a [single-node]({{<baseurl>}}/rancher/v2.6/en/installation/other-installation-methods/single-node-docker) installation of Rancher.

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 1     | 4 GB |
| Medium          | Up to 15 | Up to 200 | 2     | 8 GB |

# Ingress

Each node in the Kubernetes cluster that Rancher is installed on should run an Ingress.

The Ingress should be deployed as DaemonSet to ensure your load balancer can successfully route traffic to all nodes.

For RKE and K3s installations, you don't have to install the Ingress manually because is is installed by default.

For hosted Kubernetes clusters (EKS, GKE, AKS) and RKE2 Kubernetes installations, you will need to set up the ingress.

### Ingress for RKE2

Currently, RKE2 deploys nginx-ingress as a deployment by default, so you will need to deploy it as a DaemonSet by following [these steps.]({{<baseurl>}}/rancher/v2.6/en/installation/resources/k8s-tutorials/ha-rke2/#5-configure-nginx-to-be-a-daemonset)

### Ingress for EKS
For an example of how to deploy an nginx-ingress-controller with a LoadBalancer service, refer to [this section.]({{<baseurl>}}/rancher/v2.6/en/installation/install-rancher-on-k8s/amazon-eks/#5-install-an-ingress)

# Disks

Rancher performance depends on etcd in the cluster performance. To ensure optimal speed, we recommend always using SSD disks to back your Rancher management Kubernetes cluster. On cloud providers, you will also want to use the minimum size that allows the maximum IOPS. In larger clusters, consider using dedicated storage devices for etcd data and wal directories.

# Networking Requirements

This section describes the networking requirements for the node(s) where the Rancher server is installed.

### Node IP Addresses

Each node used should have a static IP configured, regardless of whether you are installing Rancher on a single node or on an HA cluster. In case of DHCP, each node should have a DHCP reservation to make sure the node gets the same IP allocated.

### Port Requirements

To operate properly, Rancher requires a number of ports to be open on Rancher nodes and on downstream Kubernetes cluster nodes. [Port Requirements]({{<baseurl>}}/rancher/v2.6/en/installation/requirements/ports) lists all the necessary ports for Rancher and Downstream Clusters for the different cluster types.

# Dockershim Support

In Kubernetes v1.20, the dockershim became deprecated, and Docker became deprecated as a container runtime for Kubernetes. Dockershim was built into Kubernetes as a type of adapter that allowed Kubernetes to manage Docker containers. It was necessary because the Docker Daemon was not compliant with the CRI (Container Runtime Interface) that was created for Kubernetes. The dockershim is still included in the kubelet in Kubernetes v1.20. 

Rancher plans to implement the [upstream open source community Dockershim announced by Mirantis and Docker](https://www.mirantis.com/blog/mirantis-to-take-over-support-of-kubernetes-dockershim-2/) to ensure RKE clusters can continue to leverage Docker as their container runtime. Users of RKE will be able to continue upgrading and building new RKE clusters leveraging Docker as the runtime and install method.

For users looking to use another container runtime, Rancher has the edge-focused K3s and datacenter-focused RKE2 Kubernetes distributions that use containerd as the default runtime. Imported RKE2 and K3s Kubernetes clusters can then be upgraded and managed through Rancher going forward.

For more information on the deprecation of Docker as a container runtime for Kubernetes, see the [official Kubernetes blog post](https://kubernetes.io/blog/2020/12/02/dont-panic-kubernetes-and-docker/) and the [official blog post from Mirantis.](https://www.mirantis.com/blog/mirantis-to-take-over-support-of-kubernetes-dockershim-2/)

The dockershim deprecation schedule is tracked by the upstream Kubernetes community in [Kubernetes Enhancement Proposal (KEP) 1985.](https://github.com/kubernetes/enhancements/tree/master/keps/sig-node/1985-remove-dockershim) 