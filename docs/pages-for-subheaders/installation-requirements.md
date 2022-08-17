---
title: Installation Requirements
description: Learn the node requirements for each node running Rancher server when you’re configuring  Rancher to run either in a Docker or Kubernetes setup
weight: 1
---

This page describes the software, hardware, and networking requirements for the nodes where the Rancher server will be installed. The Rancher server can be installed on a single node or a high-availability Kubernetes cluster.

:::note Important:

If you install Rancher on a Kubernetes cluster, requirements are different from the [node requirements for downstream user clusters,](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/node-requirements-for-rancher-managed-clusters.md) which will run your apps and services.

:::

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
- [Disks](#disks)
- [Networking Requirements](#networking-requirements)
  - [Node IP Addresses](#node-ip-addresses)
  - [Port Requirements](#port-requirements)
- [Dockershim Support](#dockershim-support)

For a list of best practices that we recommend for running the Rancher server in production, refer to the [best practices section.](../reference-guides/best-practices/rancher-server/tips-for-running-rancher.md)

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

If you plan to run Rancher on ARM64, see [Running on ARM64 (Experimental).](../getting-started/installation-and-upgrade/advanced-options/enable-experimental-features/rancher-on-arm64.md)

### RKE Specific Requirements

For the container runtime, RKE should work with any modern Docker version.

Note that the following sysctl setting must be applied:

```
net.bridge.bridge-nf-call-iptables=1
```

### K3s Specific Requirements

For the container runtime, K3s should work with any modern version of Docker or containerd.

Rancher needs to be installed on a supported Kubernetes version. To find out which versions of Kubernetes are supported for your Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/) To specify the K3s version, use the INSTALL_K3S_VERSION environment variable when running the K3s installation script.

If you are installing Rancher on a K3s cluster with **Raspbian Buster**, follow [these steps](https://rancher.com/docs/k3s/latest/en/advanced/#enabling-legacy-iptables-on-raspbian-buster) to switch to legacy iptables.

If you are installing Rancher on a K3s cluster with Alpine Linux, follow [these steps](https://rancher.com/docs/k3s/latest/en/advanced/#additional-preparation-for-alpine-linux-setup) for additional setup.



### RKE2 Specific Requirements

For details on which OS versions were tested with RKE2, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

Docker is not required for RKE2 installs.

### Installing Docker

Docker is required for Helm chart installs, and it can be installed by following the steps in the official [Docker documentation.](https://docs.docker.com/) Rancher also provides [scripts](../getting-started/installation-and-upgrade/installation-requirements/install-docker.md) to install Docker with one command.

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

Every use case and environment is different. Please [contact Rancher](https://rancher.com/contact/) to review yours.

### K3s Kubernetes

These CPU and memory requirements apply to each host in a [K3s Kubernetes cluster where the Rancher server is installed.](install-upgrade-on-a-kubernetes-cluster.md)

| Deployment Size | Clusters   | Nodes        | vCPUs  | RAM      | Database Size             |
| --------------- | ---------- | ------------ | -------| ---------| ------------------------- |
| Small           | Up to 150  | Up to 1500   | 2      | 8 GB     | 2 cores, 4 GB + 1000 IOPS |
| Medium          | Up to 300  | Up to 3000   | 4      | 16 GB    | 2 cores, 4 GB + 1000 IOPS |
| Large           | Up to 500  | Up to 5000   | 8      | 32 GB    | 2 cores, 4 GB + 1000 IOPS |
| X-Large         | Up to 1000 | Up to 10,000 | 16     | 64 GB    | 2 cores, 4 GB + 1000 IOPS |
| XX-Large        | Up to 2000 | Up to 20,000 | 32     | 128 GB   | 2 cores, 4 GB + 1000 IOPS |

Every use case and environment is different. Please [contact Rancher](https://rancher.com/contact/) to review yours.


### RKE2 Kubernetes

These CPU and memory requirements apply to each instance with RKE2 installed. Minimum recommendations are outlined here.

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 2     | 5 GB |
| Medium          | Up to 15 | Up to 200 | 3     | 9 GB |

### Docker

These CPU and memory requirements apply to a host with a [single-node](rancher-on-a-single-node-with-docker.md) installation of Rancher.

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 1     | 4 GB |
| Medium          | Up to 15 | Up to 200 | 2     | 8 GB |

# Ingress

Each node in the Kubernetes cluster that Rancher is installed on should run an Ingress.

The Ingress should be deployed as DaemonSet to ensure your load balancer can successfully route traffic to all nodes.

For RKE and K3s installations, you don't have to install the Ingress manually because it is installed by default.

For hosted Kubernetes clusters (EKS, GKE, AKS) and RKE2 Kubernetes installations, you will need to set up the ingress.

- **Amazon EKS:** For details on how to install Rancher on Amazon EKS, including how to install an ingress so that the Rancher server can be accessed, refer to [this page.](../getting-started/installation-and-upgrade/install-upgrade-on-a-kubernetes-cluster/rancher-on-amazon-eks.md)
- **AKS:** For details on how to install Rancher with Azure Kubernetes Service, including how to install an ingress so that the Rancher server can be accessed, refer to [this page.](../getting-started/installation-and-upgrade/install-upgrade-on-a-kubernetes-cluster/rancher-on-aks.md)
- **GKE:** For details on how to install Rancher with Google Kubernetes Engine, including how to install an ingress so that the Rancher server can be accessed, refer to [this page.](../getting-started/installation-and-upgrade/install-upgrade-on-a-kubernetes-cluster/rancher-on-gke.md)

# Disks

Rancher performance depends on etcd in the cluster performance. To ensure optimal speed, we recommend always using SSD disks to back your Rancher management Kubernetes cluster. On cloud providers, you will also want to use the minimum size that allows the maximum IOPS. In larger clusters, consider using dedicated storage devices for etcd data and wal directories.

# Networking Requirements

This section describes the networking requirements for the node(s) where the Rancher server is installed.

:::caution

If a server containing Rancher has the `X-Frame-Options=DENY` header, some pages in the new Rancher UI will not be able to render after upgrading from the legacy UI. This is because some legacy pages are embedded as iFrames in the new UI.

:::

### Node IP Addresses

Each node used should have a static IP configured, regardless of whether you are installing Rancher on a single node or on an HA cluster. In case of DHCP, each node should have a DHCP reservation to make sure the node gets the same IP allocated.

### Port Requirements

To operate properly, Rancher requires a number of ports to be open on Rancher nodes and on downstream Kubernetes cluster nodes. [Port Requirements](../getting-started/installation-and-upgrade/installation-requirements/port-requirements.md) lists all the necessary ports for Rancher and Downstream Clusters for the different cluster types.

# Dockershim Support

For more information on Dockershim support, refer to [this page](../getting-started/installation-and-upgrade/installation-requirements/dockershim.md).
