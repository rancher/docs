---
title: Installing Rancher
description: Learn how to install Rancher in development and production environments. Read about single node and high availability installation
weight: 50
---

This section provides an overview of the architecture options of installing Rancher, describing advantages of each option.

### Terminology

In this section,

**The Rancher server** manages and provisions Kubernetes clusters. You can interact with downstream Kubernetes clusters through the Rancher server's user interface.

**RKE (Rancher Kubernetes Engine)** is a certified Kubernetes distribution and CLI/library which creates and manages a Kubernetes cluster. When you create a cluster in the Rancher UI, it calls RKE as a library to provision Rancher-launched Kubernetes clusters.

### Overview of Installation Options

If you use Rancher to deploy Kubernetes clusters, it is important to ensure that the Rancher server doesn't fail, because if it goes down, you could lose access to the Kubernetes clusters that are managed by Rancher. For that reason, we recommend that for a production-grade architecture, you should set up a Kubernetes cluster with RKE, then install Rancher on it. After Rancher is installed, you can use Rancher to deploy and manage Kubernetes clusters.

For testing or demonstration purposes, you can install Rancher in single Docker container. In this installation, you can use Rancher to set up Kubernetes clusters out-of-the-box.

Our [instructions for installing Rancher on Kubernetes]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install) describe how to first use RKE to create and manage a cluster, then install Rancher onto that cluster. For this type of architecture, you will need to deploy three nodes - typically virtual machines - in the infrastructure provider of your choice. You will also need to configure a load balancer to direct front-end traffic to the three nodes. When the nodes are running and fulfill the [node requirements,]({{<baseurl>}}/rancher/v2.x/en/installation/requirements) you can use RKE to deploy Kubernetes onto them, then use Helm to deploy Rancher onto Kubernetes.

For a longer discussion of Rancher architecture, refer to the [architecture overview,]({{<baseurl>}}/rancher/v2.x/en/overview/architecture) [recommendations for production-grade architecture,]({{<baseurl>}}/rancher/v2.x/en/overview/architecture-recommendations) or our [best practices guide.]({{<baseurl>}}/rancher/v2.x/en/best-practices/deployment-types)

Rancher can be installed on these main architectures:

- **High-availability Kubernetes Install:** We recommend using [Helm,]({{<baseurl>}}/rancher/v2.x/en/overview/concepts/#about-helm) a Kubernetes package manager, to install Rancher on a dedicated Kubernetes cluster. We recommend using three nodes in the cluster because increased availability is achieved by running Rancher on multiple nodes.
- **Single-node Kubernetes Install:** Another option is to install Rancher with Helm on a Kubernetes cluster, but to only use a single node in the cluster. In this case, the Rancher server doesn't have high availability, which is important for running Rancher in production. However, this option is useful if you want to save resources by using a single node in the short term, while preserving a high-availability migration path. In the future, you can add nodes to the cluster to get a high-availability Rancher server.
- **Docker Install:** For test and demonstration purposes, Rancher can be installed with Docker on a single node. This installation works out-of-the-box, but there is no migration path from a Docker installation to a high-availability installation on a Kubernetes cluster. Therefore, you may want to use a Kubernetes installation from the start.

The single-node Kubernetes install is achieved by describing only one node in the `cluster.yml` when provisioning the Kubernetes cluster with RKE. The single node should have all three roles: `etcd`, `controlplane`, and `worker`. Then Rancher can be installed with Helm on the cluster in the same way that it would be installed on any other cluster.

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

In the Rancher installation instructions, we recommend using RKE (Rancher Kubernetes Engine) to set up a Kubernetes cluster before installing Rancher on the cluster. RKE has many configuration options for customizing the Kubernetes cluster to suit your specific environment. Please see the [RKE Documentation]({{<baseurl>}}/rke/latest/en/config-options/) for the full list of options and capabilities.

### More Options for Installations with Docker

Refer to the [Docker installation docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker) for details other configurations including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/#api-audit-log)
- With an [external load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/single-node-install-external-lb/)
- With a [persistent data store]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/#persistent-data)
