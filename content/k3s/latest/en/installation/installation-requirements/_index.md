---
title: Installation Requirements
weight: 1
aliases:
  - /k3s/latest/en/installation/node-requirements/
---

K3s is very lightweight, but has some minimum requirements as outlined below.

Whether you're configuring a K3s cluster to run in a Docker or Kubernetes setup, each node running K3s should meet the following minimum requirements. You may need more resources to fit your needs.

## Prerequisites

Two nodes cannot have the same hostname.

If all your nodes have the same hostname, use the `--with-node-id` option to append a random suffix for each node, or otherwise devise a unique name to pass with `--node-name` or `$K3S_NODE_NAME` for each node you add to the cluster.

## Operating Systems

K3s should run on just about any flavor of Linux.

K3s is officially supported and tested on the following operating systems and their subsequent non-major releases:

*    Ubuntu 16.04 (amd64)
*    Ubuntu 18.04 (amd64)
*    Raspbian Buster*

\* If you are using **Raspbian Buster**, follow [these steps]({{<baseurl>}}/k3s/latest/en/advanced/#enabling-legacy-iptables-on-raspbian-buster) to switch to legacy iptables.

If you are using **Alpine Linux**, follow [these steps]({{<baseurl>}}/k3s/latest/en/advanced/#additional-preparation-for-alpine-linux-setup) for additional setup.

## Hardware

Hardware requirements scale based on the size of your deployments. Minimum recommendations are outlined here.

*    RAM: 512MB Minimum (we recommend at least 1GB)
*    CPU: 1 Minimum

#### Disks

K3s performance depends on the performance of the database. To ensure optimal speed, we recommend using an SSD when possible. Disk performance will vary on ARM devices utilizing an SD card or eMMC.

## Networking

The K3s server needs port 6443 to be accessible by the nodes.

The nodes need to be able to reach other nodes over UDP port 8472 when Flannel VXLAN is used. The node should not listen on any other port. K3s uses reverse tunneling such that the nodes make outbound connections to the server and all kubelet traffic runs through that tunnel. However, if you do not use Flannel and provide your own custom CNI, then port 8472 is not needed by K3s.

If you wish to utilize the metrics server, you will need to open port 10250 on each node.

> **Important:** The VXLAN port on nodes should not be exposed to the world as it opens up your cluster network to be accessed by anyone. Run your nodes behind a firewall/security group that disables access to port 8472.

<figcaption>Inbound Rules for K3s Server Nodes</figcaption>

| Protocol | Port | Source | Description
|-----|-----|----------------|---|
| TCP | 6443 | K3s agent nodes | Kubernetes API
| UDP | 8472 | K3s server and agent nodes | Required only for Flannel VXLAN
| TCP | 10250 | K3s server and agent nodes | kubelet

Typically all outbound traffic is allowed.

## Large Clusters

Hardware requirements are based on the size of your K3s cluster. For production and large clusters, we recommend using a high-availability setup with an external database. The following options are recommended for the external database in production:

- MySQL
- PostgreSQL
- etcd

### CPU and Memory

The following are the minimum CPU and memory requirements for nodes in a high-availability K3s server:

| Deployment Size |   Nodes   | VCPUS |  RAM  |
|:---------------:|:---------:|:-----:|:-----:|
|      Small      |  Up to 10 |   2   |  4 GB |
|      Medium     | Up to 100 |   4   |  8 GB |
|      Large      | Up to 250 |   8   | 16 GB |
|     X-Large     | Up to 500 |   16  | 32 GB |
|     XX-Large    |   500+    |   32  | 64 GB |

### Disks

The cluster performance depends on database performance. To ensure optimal speed, we recommend always using SSD disks to back your K3s cluster. On cloud providers, you will also want to use the minimum size that allows the maximum IOPS.

### Network

You should consider increasing the subnet size for the cluster CIDR so that you don't run out of IPs for the pods. You can do that by passing the `--cluster-cidr` option to K3s server upon starting.

### Database

K3s supports different databases including MySQL, PostgreSQL, MariaDB, and etcd, the following is a sizing guide for the database resources you need to run large clusters:

| Deployment Size |   Nodes   | VCPUS |  RAM  |
|:---------------:|:---------:|:-----:|:-----:|
|      Small      |  Up to 10 |   1   |  2 GB |
|      Medium     | Up to 100 |   2   |  8 GB |
|      Large      | Up to 250 |   4   | 16 GB |
|     X-Large     | Up to 500 |   8   | 32 GB |
|     XX-Large    |   500+    |   16  | 64 GB |

