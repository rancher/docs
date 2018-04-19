---
title: Rancher Requirements
draft: true
tags: [ "tag", "tag", "tag", "tag" ]
layout: single-left
categories:
  - ""
  - ""
---

# Rancher Requirements

Before you install {{< product >}}, wrangle up these requirements. Yip! Yip! Yah!

## Operating System Requirements

-	Ubuntu 16.04 (64-bit)
-	Red Hat Enterprise Linux 7.5 (64-bit)
-	RancherOS

## Hardware Requirements

-	Memory: 4GB


## Software Requirements

-	Docker

	<a name="node-requirements"></a>**Supported Versions:**

	-	`1.12.6`
	-	`1.13.1`
	-	`17.03.2`

	>**Notes:**
	>
	> * For Docker installation instructions, visit their [documentation](https://docs.docker.com/install/).
	> * Docker requirements apply to both your Linux host and your cluster nodes.

## Port Requirements

When provisioning your Linux host, open the ports listed below so that your master and worker nodes can communicate.

### Master Nodes (etcd and controlplane nodes)

Protocol  | Direction  | Port Range  | Purpose  
--|---|---|--
TCP | Inbound | 22  |  SSH server
TCP | Inbound | 80  | ?
TCP | Inbound | 443  | ?
TCP | Inbound | 6443  | Kubernetes API server
TCP | Inbound | 2379-2380  | etcd server client API
TCP | Inbound | 10250  | kubelet API
TCP | Inbound | 10251  | scheduler
TCP | Inbound | 10252  | controller
TCP | Inbound | 10256  | kubeproxy
UDP | Inbound | 8472   | Canal

### Worker Nodes

Protocol  | Direction  | Port Range  | Purpose  
--|---|---|--
TCP | Inbound | 22  |  SSH Server
TCP | Inbound | 80  | ?
TCP | Inbound | 443  | ?
TCP | Inbound | 10250  |  kubelet API
TCP | Inbound | 10256  |  kubeproxy
TCP | Inbound | 30000-32767  |  NodePort Services
UDP | Inbound | 8472   | Canal

## Additional Requirements

### Non High Availability

### High Availability

### Optional: etcd
