---
title: Installation Requirements
description: Learn the node requirements for each node running Rancher server when you’re configuring  Rancher to run either in a Docker or Kubernetes setup
weight: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes the software, hardware, and networking requirements for the nodes where the Rancher server will be installed. The Rancher server can be installed on a single node or a high-availability Kubernetes cluster.

> It is important to note that if you install Rancher on a Kubernetes cluster, requirements are different from the [node requirements for downstream user clusters,](../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/node-requirements-for-rancher-managed-clusters.md) which will run your apps and services.

Make sure the node(s) for the Rancher server fulfill the following requirements:

- [Operating Systems and Container Runtime Requirements](#operating-systems-and-container-runtime-requirements)
- [Hardware Requirements](#hardware-requirements)
  - [CPU and Memory](#cpu-and-memory)
  - [CPU and Memory for Rancher before v2.4.0](#cpu-and-memory-for-rancher-before-v2-4-0)
  - [Disks](#disks)
- [Networking Requirements](#networking-requirements)
  - [Node IP Addresses](#node-ip-addresses)
  - [Port Requirements](#port-requirements)

For a list of best practices that we recommend for running the Rancher server in production, refer to the [best practices section.](../reference-guides/best-practices/deployment-types.md)

The Rancher UI works best in Firefox or Chrome.

# Operating Systems and Container Runtime Requirements

Rancher should work with any modern Linux distribution.

For details on which OS, Docker, and Kubernetes versions were tested with each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/)

All supported operating systems are 64-bit x86.

The `ntp` (Network Time Protocol) package should be installed. This prevents errors with certificate validation that can occur when the time is not synchronized between the client and server.

Some distributions of Linux may have default firewall rules that block communication with Helm. We recommend disabling firewalld. For Kubernetes 1.19, firewalld must be turned off.

If you plan to run Rancher on ARM64, see [Running on ARM64 (Experimental).](installation/options/arm64-platform/)

### RKE Specific Requirements

For the container runtime, RKE should work with any modern Docker version.

### K3s Specific Requirements

For the container runtime, K3s should work with any modern version of Docker or containerd.

Rancher needs to be installed on a supported Kubernetes version. To find out which versions of Kubernetes are supported for your Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/) To specify the K3s version, use the INSTALL_K3S_VERSION environment variable when running the K3s installation script.

If you are installing Rancher on a K3s cluster with **Raspbian Buster**, follow [these steps](https://rancher.com/docs/k3s/latest/en/advanced/#enabling-legacy-iptables-on-raspbian-buster) to switch to legacy iptables.

If you are installing Rancher on a K3s cluster with Alpine Linux, follow [these steps](https://rancher.com/docs/k3s/latest/en/advanced/#additional-preparation-for-alpine-linux-setup) for additional setup.


### Installing Docker

Docker is required for Helm chart installs, and it can be installed by following the steps in the official [Docker documentation.](https://docs.docker.com/) Rancher also provides [scripts](../getting-started/installation-and-upgrade/installation-requirements/install-docker.md) to install Docker with one command.
# Hardware Requirements

This section describes the CPU, memory, and disk requirements for the nodes where the Rancher server is installed.

### CPU and Memory

Hardware requirements scale based on the size of your Rancher deployment. Provision each individual node according to the requirements. The requirements are different depending on if you are installing Rancher in a single container with Docker, or if you are installing Rancher on a Kubernetes cluster.

<Tabs>
<TabItem value="RKE">

These requirements apply to each host in an [RKE Kubernetes cluster where the Rancher server is installed.](install-upgrade-on-a-kubernetes-cluster.md)

Performance increased in Rancher v2.4.0. For the requirements of Rancher before v2.4.0, refer to [this section.](#cpu-and-memory-for-rancher-before-v2-4-0)

| Deployment Size | Clusters   | Nodes        | vCPUs  | RAM     |
| --------------- | ---------- | ------------ | -------| ------- |
| Small           | Up to 150  | Up to 1500   | 2      | 8 GB    |
| Medium          | Up to 300  | Up to 3000   | 4      | 16 GB   |
| Large           | Up to 500  | Up to 5000   | 8      | 32 GB   |
| X-Large         | Up to 1000 | Up to 10,000 | 16     | 64 GB   |
| XX-Large        | Up to 2000 | Up to 20,000 | 32     | 128 GB  |

Every use case and environment is different. Please [contact Rancher](https://rancher.com/contact/) to review yours.


</TabItem>
<TabItem value="K3s">

These requirements apply to each host in a [K3s Kubernetes cluster where the Rancher server is installed.](install-upgrade-on-a-kubernetes-cluster.md)

| Deployment Size | Clusters   | Nodes        | vCPUs  | RAM      | Database Size             |
| --------------- | ---------- | ------------ | -------| ---------| ------------------------- |
| Small           | Up to 150  | Up to 1500   | 2      | 8 GB     | 2 cores, 4 GB + 1000 IOPS |
| Medium          | Up to 300  | Up to 3000   | 4      | 16 GB    | 2 cores, 4 GB + 1000 IOPS |
| Large           | Up to 500  | Up to 5000   | 8      | 32 GB    | 2 cores, 4 GB + 1000 IOPS |
| X-Large         | Up to 1000 | Up to 10,000 | 16     | 64 GB    | 2 cores, 4 GB + 1000 IOPS |
| XX-Large        | Up to 2000 | Up to 20,000 | 32     | 128 GB   | 2 cores, 4 GB + 1000 IOPS |

Every use case and environment is different. Please [contact Rancher](https://rancher.com/contact/) to review yours.


</TabItem>
<TabItem value="Docker">

These requirements apply to a host with a [single-node](rancher-on-a-single-node-with-docker.md) installation of Rancher.

| Deployment Size | Clusters | Nodes     | vCPUs | RAM  |
| --------------- | -------- | --------- | ----- | ---- |
| Small           | Up to 5  | Up to 50  | 1     | 4 GB |
| Medium          | Up to 15 | Up to 200 | 2     | 8 GB |


</TabItem>
</Tabs>

### CPU and Memory for Rancher before v2.4.0

<details>
  <summary>Click to expand</summary>

These requirements apply to installing Rancher on an RKE Kubernetes cluster before Rancher v2.4.0:

| Deployment Size | Clusters  | Nodes      | vCPUs                                           | RAM                                             |
| --------------- | --------- | ---------- | ----------------------------------------------- | ----------------------------------------------- |
| Small           | Up to 5   | Up to 50   | 2                                               | 8 GB                                            |
| Medium          | Up to 15  | Up to 200  | 4                                               | 16 GB                                           |
| Large           | Up to 50  | Up to 500  | 8                                               | 32 GB                                           |
| X-Large         | Up to 100 | Up to 1000 | 32                                              | 128 GB                                          |
| XX-Large        | 100+      | 1000+      | [Contact Rancher](https://rancher.com/contact/) | [Contact Rancher](https://rancher.com/contact/) |
</details>

### Disks

Rancher performance depends on etcd in the cluster performance. To ensure optimal speed, we recommend always using SSD disks to back your Rancher management Kubernetes cluster. On cloud providers, you will also want to use the minimum size that allows the maximum IOPS. In larger clusters, consider using dedicated storage devices for etcd data and wal directories.

# Networking Requirements

This section describes the networking requirements for the node(s) where the Rancher server is installed.

### Node IP Addresses

Each node used should have a static IP configured, regardless of whether you are installing Rancher on a single node or on an HA cluster. In case of DHCP, each node should have a DHCP reservation to make sure the node gets the same IP allocated.

### Port Requirements

To operate properly, Rancher requires a number of ports to be open on Rancher nodes and on downstream Kubernetes cluster nodes. [Port Requirements](../getting-started/installation-and-upgrade/installation-requirements/port-requirements.md) lists all the necessary ports for Rancher and Downstream Clusters for the different cluster types.