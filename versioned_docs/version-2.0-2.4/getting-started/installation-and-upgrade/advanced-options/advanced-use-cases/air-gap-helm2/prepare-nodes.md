---
title: '1. Prepare your Node(s)'
weight: 100
aliases:
  - /rancher/v2.0-v2.4/en/installation/air-gap-high-availability/provision-hosts
  - /rancher/v2.0-v2.4/en/installation/air-gap-single-node/provision-host
  - /rancher/v2.0-v2.4/en/installation/options/air-gap-helm2/prepare-nodes
  - /rancher/v2.x/en/installation/resources/advanced/air-gap-helm2/prepare-nodes/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section is about how to prepare your node(s) to install Rancher for your air gapped environment. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy. There are _tabs_ for either a high availability (recommended) or a Docker installation.

# Prerequisites

<Tabs>
<TabItem value="Kubernetes Install (Recommended)">

### OS, Docker, Hardware, and Networking

Make sure that your node(s) fulfill the general [installation requirements.](../../../../../pages-for-subheaders/installation-requirements.md)

### Private Registry

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machines.

If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).

### CLI Tools

The following CLI tools are required for the Kubernetes Install. Make sure these tools are installed on your workstation and available in your `$PATH`.

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
- [rke](https://rancher.com/docs/rke/latest/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
- [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes. Refer to the [Helm version requirements](../../../resources/choose-a-rancher-version.md) to choose a version of Helm to install Rancher.


</TabItem>
<TabItem value="Docker Install">

### OS, Docker, Hardware, and Networking

Make sure that your node(s) fulfill the general [installation requirements.](../../../../../pages-for-subheaders/installation-requirements.md)

### Private Registry

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machines.

If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).

</TabItem>
</Tabs>

# Set up Infrastructure

<Tabs>
<TabItem value="Kubernetes Install (Recommended)">

Rancher recommends installing Rancher on a Kubernetes cluster. A highly available Kubernetes install is comprised of three nodes running the Rancher server components on a Kubernetes cluster. The persistence layer (etcd) is also replicated on these three nodes, providing redundancy and data duplication in case one of the nodes fails.

### Recommended Architecture

- DNS for Rancher should resolve to a layer 4 load balancer
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>Rancher installed on a Kubernetes cluster with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>

![Rancher HA](/img/ha/rancher2ha.svg)

### A. Provision three air gapped Linux hosts according to our requirements

These hosts will be disconnected from the internet, but require being able to connect with your private registry.

View hardware and software requirements for each of your cluster nodes in [Requirements](../../../../../pages-for-subheaders/installation-requirements.md).

### B. Set up your Load Balancer

When setting up the Kubernetes cluster that will run the Rancher server components, an Ingress controller pod will be deployed on each of your nodes. The Ingress controller pods are bound to ports TCP/80 and TCP/443 on the host network and are the entry point for HTTPS traffic to the Rancher server.

You will need to configure a load balancer as a basic Layer 4 TCP forwarder to direct traffic to these ingress controller pods. The exact configuration will vary depending on your environment.

> **Important:**
> Only use this load balancer (i.e, the `local` cluster Ingress) to load balance the Rancher server. Sharing this Ingress with other applications may result in websocket errors to Rancher following Ingress configuration reloads for other apps.

**Load Balancer Configuration Samples:**

- For an example showing how to set up an NGINX load balancer, refer to [this page.](../../../../../how-to-guides/new-user-guides/infrastructure-setup/amazon-elb-load-balancer.md)
- For an example showing how to set up an Amazon NLB load balancer, refer to [this page.](../../../../../how-to-guides/new-user-guides/infrastructure-setup/nginx-load-balancer.md)

</TabItem>
<TabItem value="Docker Install">

The Docker installation is for Rancher users that are wanting to test out Rancher. Instead of running on a Kubernetes cluster, you install the Rancher server component on a single node using a `docker run` command. Since there is only one node and a single Docker container, if the node goes down, there is no copy of the etcd data available on other nodes and you will lose all the data of your Rancher server.

> **Important:** If you install Rancher following the Docker installation guide, there is no upgrade path to transition your Docker installation to a Kubernetes Installation.

Instead of running the Docker installation, you have the option to follow the Kubernetes Install guide, but only use one node to install Rancher. Afterwards, you can scale up the etcd nodes in your Kubernetes cluster to make it a Kubernetes Installation.

### A. Provision a single, air gapped Linux host according to our Requirements

These hosts will be disconnected from the internet, but require being able to connect with your private registry.

View hardware and software requirements for each of your cluster nodes in [Requirements](../../../../../pages-for-subheaders/installation-requirements.md).

</TabItem>
</Tabs>

### [Next: Collect and Publish Images to your Private Registry](../../../other-installation-methods/air-gapped-helm-cli-install/publish-images.md)
