---
title: Installing Rancher in an Air Gapped Environment with Helm 2
weight: 2
aliases:
  - /rancher/v2.0-v2.4/en/installation/air-gap-installation/
  - /rancher/v2.0-v2.4/en/installation/air-gap-high-availability/
  - /rancher/v2.0-v2.4/en/installation/air-gap-single-node/
  - /rancher/v2.0-v2.4/en/installation/options/air-gap-helm2
---

> After Helm 3 was released, the Rancher installation instructions were updated to use Helm 3.
>
> If you are using Helm 2, we recommend [migrating to Helm 3](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/) because it is simpler to use and more secure than Helm 2.
>
> This section provides a copy of the older instructions for installing Rancher on a Kubernetes cluster using Helm 2 in an air air gap environment, and it is intended to be used if upgrading to Helm 3 is not feasible.

This section is about installations of Rancher server in an air gapped environment. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy.

Throughout the installations instructions, there will be _tabs_ for either a high availability Kubernetes installation or a single-node Docker installation.

### Air Gapped Kubernetes Installations

This section covers how to install Rancher on a Kubernetes cluster in an air gapped environment.

A Kubernetes installation is comprised of three nodes running the Rancher server components on a Kubernetes cluster. The persistence layer (etcd) is also replicated on these three nodes, providing redundancy and data duplication in case one of the nodes fails.

### Air Gapped Docker Installations

These instructions also cover how to install Rancher on a single node in an air gapped environment.

The Docker installation is for Rancher users that are wanting to test out Rancher. Instead of running on a Kubernetes cluster, you install the Rancher server component on a single node using a `docker run` command. Since there is only one node and a single Docker container, if the node goes down, there is no copy of the etcd data available on other nodes and you will lose all the data of your Rancher server.

> **Important:** If you install Rancher following the Docker installation guide, there is no upgrade path to transition your Docker Installation to a Kubernetes Installation.

Instead of running the Docker installation, you have the option to follow the Kubernetes Install guide, but only use one node to install Rancher. Afterwards, you can scale up the etcd nodes in your Kubernetes cluster to make it a Kubernetes Installation.

# Installation Outline

- [1. Prepare your Node(s)]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/prepare-nodes/)
- [2. Collect and Publish Images to your Private Registry]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/populate-private-registry/)
- [3. Launch a Kubernetes Cluster with RKE]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/launch-kubernetes/)
- [4. Install Rancher]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/install-rancher/)

### [Next: Prepare your Node(s)]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/other-installation-methods/air-gap/prepare-nodes/)
