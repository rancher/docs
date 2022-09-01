---
title: Installing/Upgrading Rancher
description: Learn how to install Rancher in development and production environments. Read about single node and high availability installation
weight: 3
---

This section provides an overview of the architecture options of installing Rancher, describing advantages of each option.

# Terminology

In this section,

- **The Rancher server** manages and provisions Kubernetes clusters. You can interact with downstream Kubernetes clusters through the Rancher server's user interface. The Rancher management server can be installed on any Kubernetes cluster, including hosted clusters, such as Amazon EKS clusters.
- **RKE (Rancher Kubernetes Engine)** is a certified Kubernetes distribution and CLI/library which creates and manages a Kubernetes cluster.
- **K3s (Lightweight Kubernetes)** is also a fully compliant Kubernetes distribution. It is newer than RKE, easier to use, and more lightweight, with a binary size of less than 100 MB.
- **RKE2** is a fully conformant Kubernetes distribution that focuses on security and compliance within the U.S. Federal Government sector.

Note the `restrictedAdmin` Helm chart option available for **the Rancher Server**. When this option is set to true, the initial Rancher user has restricted access to the local Kubernetes cluster to prevent privilege escalation. For more information, see the section about the [restricted-admin role.](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/global-permissions.md#restricted-admin)

# Overview of Installation Options

Rancher can be installed on these main architectures:

### High-availability Kubernetes Install with the Helm CLI

We recommend using Helm, a Kubernetes package manager, to install Rancher on multiple nodes on a dedicated Kubernetes cluster. For RKE clusters, three nodes are required to achieve a high-availability cluster. For K3s clusters, only two nodes are required.

### Automated Quickstart to Deploy Rancher on Amazon EKS

Rancher and Amazon Web Services collaborated on a quick start guide for deploying Rancher on an EKS Kubernetes cluster following AWS best practices. The deployment guide is [here.](https://aws-quickstart.github.io/quickstart-eks-rancher/)

### Single-node Kubernetes Install

Rancher can be installed on a single-node Kubernetes cluster. In this case, the Rancher server doesn't have high availability, which is important for running Rancher in production.

However, this option is useful if you want to save resources by using a single node in the short term, while preserving a high-availability migration path. In the future, you can add nodes to the cluster to get a high-availability Rancher server.

### Docker Install 

For test and demonstration purposes, Rancher can be installed with Docker on a single node. A local Kubernetes cluster is installed in the single Docker container, and Rancher is installed on the local cluster.

The Rancher backup operator can be used to migrate Rancher from the single Docker container install to an installation on a high-availability Kubernetes cluster. For details, refer to the documentation on [migrating Rancher to a new cluster.](../how-to-guides/new-user-guides/backup-restore-and-disaster-recovery/migrate-rancher-to-new-cluster.md)

### Other Options

There are also separate instructions for installing Rancher in an air gap environment or behind an HTTP proxy:

| Level of Internet Access           | Kubernetes Installation - Strongly Recommended                | Docker Installation                             |
| ---------------------------------- | ------------------------------ | ---------- |
| With direct access to the Internet | [Docs](install-upgrade-on-a-kubernetes-cluster.md) | [Docs](rancher-on-a-single-node-with-docker.md)                                                                                     |
| Behind an HTTP proxy                | [Docs](rancher-behind-an-http-proxy.md) |  These [docs,](rancher-on-a-single-node-with-docker.md) plus this [configuration](../reference-guides/single-node-rancher-in-docker/http-proxy-configuration.md) |
| In an air gap environment          | [Docs](air-gapped-helm-cli-install.md)                                                                                                                               | [Docs](air-gapped-helm-cli-install.md)                                                                                         |

We recommend installing Rancher on a Kubernetes cluster, because in a multi-node cluster, the Rancher management server becomes highly available. This high-availability configuration helps maintain consistent access to the downstream Kubernetes clusters that Rancher will manage.

For that reason, we recommend that for a production-grade architecture, you should set up a high-availability Kubernetes cluster, then install Rancher on it. After Rancher is installed, you can use Rancher to deploy and manage Kubernetes clusters.

For testing or demonstration purposes, you can install Rancher in single Docker container. In this Docker install, you can use Rancher to set up Kubernetes clusters out-of-the-box. The Docker install allows you to explore the Rancher server functionality, but it is intended to be used for development and testing purposes only.

Our [instructions for installing Rancher on Kubernetes](install-upgrade-on-a-kubernetes-cluster.md) describe how to first use K3s or RKE to create and manage a Kubernetes cluster, then install Rancher onto that cluster.

When the nodes in your Kubernetes cluster are running and fulfill the [node requirements,](installation-requirements.md) you will use Helm to deploy Rancher onto Kubernetes. Helm uses Rancher's Helm chart to install a replica of Rancher on each node in the Kubernetes cluster. We recommend using a load balancer to direct traffic to each replica of Rancher in the cluster.

For a longer discussion of Rancher architecture, refer to the [architecture overview,](rancher-manager-architecture.md) [recommendations for production-grade architecture,](../reference-guides/rancher-manager-architecture/architecture-recommendations.md) or our [best practices guide.](../reference-guides/best-practices/rancher-server/tips-for-running-rancher.md)

# Prerequisites
Before installing Rancher, make sure that your nodes fulfill all of the [installation requirements.](installation-requirements.md)

# Architecture Tip

For the best performance and greater security, we recommend a separate, dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters](kubernetes-clusters-in-rancher-setup.md) for running your workloads.

For more architecture recommendations, refer to [this page.](../reference-guides/rancher-manager-architecture/architecture-recommendations.md)

### More Options for Installations on a Kubernetes Cluster

Refer to the [Helm chart options](installation/resources/chart-options/) for details on installing Rancher on a Kubernetes cluster with other configurations, including:

- With [API auditing to record all transactions](../reference-guides/installation-references/helm-chart-options.md#api-audit-log)
- With [TLS termination on a load balancer](../reference-guides/installation-references/helm-chart-options.md#external-tls-termination)
- With a [custom Ingress](../reference-guides/installation-references/helm-chart-options.md#customizing-your-ingress)

In the Rancher installation instructions, we recommend using K3s or RKE to set up a Kubernetes cluster before installing Rancher on the cluster. Both K3s and RKE have many configuration options for customizing the Kubernetes cluster to suit your specific environment. For the full list of their capabilities, refer to their documentation:

- [RKE configuration options](https://rancher.com/docs/rke/latest/en/config-options/)
- [K3s configuration options](https://rancher.com/docs/k3s/latest/en/installation/install-options/)

### More Options for Installations with Docker

Refer to the [docs about options for Docker installs](rancher-on-a-single-node-with-docker.md) for details about other configurations including:

- With [API auditing to record all transactions](../reference-guides/single-node-rancher-in-docker/advanced-options.md#api-audit-log)
- With an [external load balancer](../getting-started/installation-and-upgrade/advanced-options/advanced-use-cases/configure-layer-7-nginx-load-balancer.md)
- With a [persistent data store](../reference-guides/single-node-rancher-in-docker/advanced-options.md#persistent-data)
