---
title: Installing Rancher
description: Learn how to install Rancher in development and production environments. Read about single node and high availability installation
weight: 50
---

This section contains instructions for installing Rancher in development and production environments.

Before installing Rancher, make sure that your nodes fulfill all of the [installation requirements.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)

### Overview of Installation Options

We recommend using [Helm,]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/concepts/#about-helm) a Kubernetes package manager, to install Rancher on a dedicated Kubernetes cluster. This is called a high-availability (HA) installation because increased availability is achieved by running Rancher on multiple nodes.

For testing and demonstration purposes, Rancher can also be installed with Docker on a single node. However, there is no migration path from a single-node Docker installation to an HA installation on a Kubernetes cluster. Therefore, you may want to use an HA installation from the start.

There are also separate instructions for installing Rancher in an air gap environment or behind an HTTP proxy:

| Level of Internet Access           | Installing on a Kubernetes Cluster - Strongly Recommended                | Installing in a Single Docker Container                             |
| ---------------------------------- | ------------------------------ | ---------- |
| With direct access to the Internet | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/ha/) | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node)                                                                                     |
| Behind an HTTP proxy                | These [docs,]({{<baseurl>}}/rancher/v2.x/en/installation/ha/) plus this [configuration]({{<baseurl>}}/rancher/v2.x/en/installation/options/chart-options/#http-proxy) |  These [docs,]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node) plus this [configuration]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node/proxy/) |
| In an air gap environment          | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap)                                                                                                                               | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap)                                                                                         |

> For the best performance and greater security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

For more architecture recommendations, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture-recommendations)

### More Options for High-availability Installations on a Kubernetes Cluster

Refer to the [Helm chart options]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/) for details on installing HA Rancher with other configurations, including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#api-audit-log)
- With [TLS termination on a load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination)
- With a [custom Ingress]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#customizing-your-ingress)

### More Options for Single Node Installations with Docker

Refer to the [single node installation docs]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node) for details other configurations including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node#api-audit-log)
- With an [external load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node/single-node-install-external-lb/)
- With a [persistent data store]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/single-node#persistent-data)

### More Kubernetes Options

In the Rancher installation instructions, we recommend using RKE (Rancher Kubernetes Engine) to set up a Kubernetes cluster before installing Rancher on the cluster. RKE has many configuration options for customizing the Kubernetes cluster to suit your specific environment. Please see the [RKE Documentation]({{<baseurl>}}/rke/latest/en/config-options/) for the full list of options and capabilities.
