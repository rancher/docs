---
title: Installing Rancher
description: Learn how to install Rancher in development and production environments. Read about single node and high availability installation
weight: 50
---

This section provides an overview of the architecture options of installing Rancher, describing advantages of each option:

- **High-availability Kubernetes Install:** We recommend using [Helm,]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/concepts/#about-helm) a Kubernetes package manager, to install Rancher on a dedicated Kubernetes cluster. We recommend using three nodes in the cluster because increased availability is achieved by running Rancher on multiple nodes.
- **Single-node Kubernetes Install:** Another option is to install Rancher with Helm on a Kubernetes cluster, but to only use a single node in the cluster. In this case, the Rancher server doesn't have high availability, which is important for running Rancher in production. However, this option is useful if you want to save resources by using a single node in the short term, while preserving a high-availability migration path. In the future, you can add nodes to the cluster to get a high-availability Rancher server.
- **Docker Install:** For test and demonstration purposes, Rancher can be installed with Docker on a single node. This installation is simpler to set up, but there is no migration path from a Docker installation to a high-availability installation on a Kubernetes cluster. Therefore, you may want to use a Kubernetes installation from the start.

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

For the best performance and greater security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

For more architecture recommendations, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture-recommendations)

### More Options for Installations on a Kubernetes Cluster

Refer to the [Helm chart options]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/helm-rancher/chart-options/) for details on installing Rancher on a Kubernetes cluster with other configurations, including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/helm-rancher/chart-options/#api-audit-log)
- With [TLS termination on a load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/helm-rancher/chart-options/#external-tls-termination)
- With a [custom Ingress]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/helm-rancher/chart-options/#customizing-your-ingress)

In the Rancher installation instructions, we recommend using RKE (Rancher Kubernetes Engine) to set up a Kubernetes cluster before installing Rancher on the cluster. RKE has many configuration options for customizing the Kubernetes cluster to suit your specific environment. Please see the [RKE Documentation]({{<baseurl>}}/rke/latest/en/config-options/) for the full list of options and capabilities.

### More Options for Installations with Docker

Refer to the [Docker installation docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker) for details other configurations including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/#api-audit-log)
- With an [external load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/single-node-install-external-lb/)
- With a [persistent data store]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node-docker/#persistent-data)
