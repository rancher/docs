---
title: Air Gap Install
weight: 6
aliases:
  - /rancher/v2.x/en/installation/air-gap-installation/
  - /rancher/v2.x/en/installation/air-gap-high-availability/
  - /rancher/v2.x/en/installation/air-gap-single-node/
---

This section is about installations of Rancher server in an air gapped environment. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy. Throughout the installations instructions, there will be _tabs_ for either a high availability installation or a single node installation.

* **High Availability (HA) Installation:** Rancher recommends installing Rancher in a Highly Available (HA) configuration. An HA installation is comprised of three nodes running the Rancher server components on a Kubernetes cluster. The persistence layer (etcd) is also replicated on these three nodes, providing redundancy and data duplication in case one of the nodes fails.

* **Single Node Installation:** The single node installation is for Rancher users that are wanting to **test** out Rancher. Instead of running on a Kubernetes cluster, you install the Rancher server component on a single node using a `docker run` command. Since there is only one node and a single Docker container, if the node goes down, there is no copy of the etcd data available on other nodes and you will lose all the data of your Rancher server. **Important: If you install Rancher following the single node installation guide, there is no upgrade path to transition your single node installation to a HA installation.** Instead of running the single node installation, you have the option to follow the HA install guide, but only use one node to install Rancher. Afterwards, you can scale up the etcd nodes in your Kubernetes cluster to make it a HA installation.

## Prerequisites

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machines. If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).

{{% tabs %}}
{{% tab "HA Install" %}}

The following CLI tools are required for the HA install. Make sure these tools are installed on your workstation and available in your `$PATH`.

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
* [rke]({{< baseurl >}}/rke/latest/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes.

{{% /tab %}}
{{% /tabs %}}

## Installation Outline

- [1. Prepare your Node(s)]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap/prepare-nodes/)
- [2. Collect and Publish Images to your Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap/populate-private-registry/)
- [3. Launch a Kubernetes Cluster with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap/launch-kubernetes/)
- [4. Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap/install-rancher/)


### [Next: Prepare your Node(s)]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap/prepare-nodes/)
