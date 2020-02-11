---
title: Installing Rancher
description: Learn how to install Rancher in development and production environments. Read about single node and high availability installation
weight: 50
---

This section provides an overview of the architecture options of installing Rancher, describing advantages of each option.

### Terminology

In this section,

- **The Rancher server** manages and provisions Kubernetes clusters. You can interact with downstream Kubernetes clusters through the Rancher server's user interface.
- **RKE (Rancher Kubernetes Engine)** is a certified Kubernetes distribution and CLI/library which creates and manages a Kubernetes cluster. When you create a cluster in the Rancher UI, it calls RKE as a library to provision Rancher-launched Kubernetes clusters.
- **K3s (5 less than K8s)** is also a fully compliant Kubernetes distribution. It is newer than RKE, easier to use, and more lightweight, with a binary size of less than 40 MB. As of Rancher v2.4, Rancher can be installed on a K3s cluster.

### Overview of Installation Options

If you use Rancher to deploy Kubernetes clusters, it is important to ensure that the Rancher server doesn't fail, because if it goes down, you could lose access to the Kubernetes clusters that are managed by Rancher. For that reason, we recommend that for a production-grade architecture, you should set up a high-availability Kubernetes cluster with RKE, then install Rancher on it. After Rancher is installed, you can use Rancher to deploy and manage Kubernetes clusters.

For testing or demonstration purposes, you can install Rancher in single Docker container. In this installation, you can use Rancher to set up Kubernetes clusters out-of-the-box.

Our [instructions for installing Rancher on Kubernetes]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install) describe how to first use K3s or RKE to create and manage a Kubernetes cluster, then install Rancher onto that cluster.

For a high-availability K3s cluster, we recommend setting up the following infrastructure:

- **Two Linux nodes,** typically virtual machines, in the infrastructure provider of your choice
- **A load balancer** to direct traffic to the two nodes.
- **An external database** to store the cluster data. PostgreSQL, MySQL, and etcd are supported.

For a high-availability RKE cluster, we recommend setting up the following infrastructure:

- **Three Linux nodes,** typically virtual machines, in the infrastructure provider of your choice.
- **A load balancer** to direct front-end traffic to the three nodes.

When the nodes in your Kubernetes cluster are running and fulfill the [node requirements,]({{<baseurl>}}/rancher/v2.x/en/installation/requirements) you will use RKE or K3s to deploy Kubernetes onto them. Then you will use Helm to deploy Rancher onto Kubernetes.

For a longer discussion of Rancher architecture, refer to the [architecture overview,]({{<baseurl>}}/rancher/v2.x/en/overview/architecture) [recommendations for production-grade architecture,]({{<baseurl>}}/rancher/v2.x/en/overview/architecture-recommendations) or our [best practices guide.]({{<baseurl>}}/rancher/v2.x/en/best-practices/deployment-types)

To summarize, Rancher can be installed on these main architectures:

- **High-availability Kubernetes Install:** We recommend using [Helm,]({{<baseurl>}}/rancher/v2.x/en/overview/concepts/#about-helm) a Kubernetes package manager, to install Rancher on multiple nodes on a dedicated Kubernetes cluster. For RKE clusters, three nodes are required to achieve a high-availability cluster. For K3s clusters, only two nodes are required.
- **Single-node Kubernetes Install:** Another option is to install Rancher with Helm on a Kubernetes cluster, but to only use a single node in the cluster. In this case, the Rancher server doesn't have high availability, which is important for running Rancher in production. However, this option is useful if you want to save resources by using a single node in the short term, while preserving a high-availability migration path. In the future, you can add nodes to the cluster to get a high-availability Rancher server.
- **Docker Install:** For test and demonstration purposes, Rancher can be installed with Docker on a single node. This installation works out-of-the-box, but there is no migration path from a Docker installation to a high-availability installation on a Kubernetes cluster. Therefore, you may want to use a Kubernetes installation from the start.

There are also separate instructions for installing Rancher in an air gap environment or behind an HTTP proxy:

| Level of Internet Access           | Kubernetes Installation - Strongly Recommended                | Docker Installation                             |
| ---------------------------------- | ------------------------------ | ---------- |
| With direct access to the Internet | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/) | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker)                                                                                     |
| Behind an HTTP proxy                | These [docs,]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/) plus this [configuration]({{<baseurl>}}/rancher/v2.x/en/installation/options/chart-options/#http-proxy) |  These [docs,]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node) plus this [configuration]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node/proxy/) |
| In an air gap environment          | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap)                                                                                                                               | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap)                                                                                         |

### Prerequisites
Before installing Rancher, make sure that your nodes fulfill all of the [installation requirements.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)

### Architecture Tip

For the best performance and greater security, we recommend a separate, dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

For more architecture recommendations, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture-recommendations)

### More Options for Installations on a Kubernetes Cluster

Refer to the [Helm chart options]({{<baseurl>}}/rancher/v2.x/en/installation/options/chart-options/) for details on installing Rancher on a Kubernetes cluster with other configurations, including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/options/chart-options/#api-audit-log)
- With [TLS termination on a load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/options/chart-options/#external-tls-termination)
- With a [custom Ingress]({{<baseurl>}}/rancher/v2.x/en/installation/options/chart-options/#customizing-your-ingress)

In the Rancher installation instructions, we recommend using K3s or RKE to set up a Kubernetes cluster before installing Rancher on the cluster. Both K3s and RKE have many configuration options for customizing the Kubernetes cluster to suit your specific environment. For the full list of their capabilities, refer to their documentation:

- [RKE configuration options]({{<baseurl>}}/rke/latest/en/config-options/)
- [K3s configuration options]({{<baseurl>}}/k3s/latest/en/installation/install-options/)

### More Options for Installations with Docker

Refer to the [Docker installation docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker) for details about other configurations including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/#api-audit-log)
- With an [external load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/single-node-install-external-lb/)
- With a [persistent data store]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/#persistent-data)
