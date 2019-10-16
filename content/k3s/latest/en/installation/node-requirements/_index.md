---
title: Node Requirements
weight: 1
---

k3s is very lightweight, but has some minimum requirements as outlined below.

Whether you're configuring a k3s cluster to run in a single-node or high-availability (HA) setup, each node running k3s should meet the following minimum requirements. You may need more resources to fit your needs.

## Operating Systems

k3s should run on just about any flavor of Linux. However, k3s is tested on the following operating systems and their subsequent non-major releases.

*    Ubuntu 16.04 (amd64)
*    Ubuntu 18.04 (amd64)
*    Raspian Buster (armhf)

## Hardware

Hardware requirements scale based on the size of your deployments. Minimum recommenedations are outlined here.

*    RAM: 512MB Minimum
*    CPU: 1 Minimum

#### Disks

k3s performance depends on the performance of the database. To ensure optimal speed, we recommend using an SSD when possible. Disk performance will vary on ARM devices utilizing an SD card or eMMC.

## Networking

The k3s server needs port 6443 to be accessible by the nodes. The nodes need to be able to reach other nodes over UDP port 8472 (Flannel VXLAN). If you do not use flannel and provide your own custom CNI, then port 8472 is not needed by k3s. The node should not listen on any other port. k3s uses reverse tunneling such that the nodes make outbound connections to the server and all kubelet traffic runs through that tunnel.

IMPORTANT: The VXLAN port on nodes should not be exposed to the world as it opens up your cluster network to be accessed by anyone. Run your nodes behind a firewall/security group that disabled access to port 8472.
