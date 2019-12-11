---
title: Choosing an Installation Method
weight: 2
---

We recommend using [Helm,]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/concepts/#about-helm) a Kubernetes package manager, to install Rancher on a dedicated Kubernetes cluster. This is called a high-availability (HA) installation because increased avaialability is achieved by running Rancher on multiple nodes.

For testing and demonstration purposes, Rancher can be installed with Docker on a single node.

There are also separate instructions for installing Rancher in an air gap environment or behind an HTTP proxy:

Level of Internet Access | Installing on a Kubernetes Cluster - Strongly Recommended | Installing in a Single Docker Container
---------------------------|-----------------------------|------------------
With direct access to the Internet  | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/ha/) | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/)   
Behind an HTTP proxy  | These [docs,]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/) plus this [configuration]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/proxy/) | These [docs,]({{<baseurl>}}/rancher/v2.x/en/installation/ha/) plus this [configuration]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#http-proxy)
In an air gap environment | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap/) | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap/)

### Why We Recommend an HA Installation

An HA installation of Rancher is recommended for production because it protects the Rancher management server's data from being lost. A single-node installation may be used for development and testing purposes, but there is no migration path from a single-node to an HA installation. Therefore, you may want to use an HA installation from the start.

> For the best performance and greater security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

For more architecture recommendations, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture-recommendations)

### How an HA Rancher Installation Works

In a typical HA Rancher installation, Kubernetes is first installed on three nodes that are hosted in an infrastructure provider such as Amazon's EC2 or Google Compute Engine.

Then Helm is used to install Rancher on top of the Kubernetes cluster. Helm uses Rancher's Helm chart to install a replica of Rancher on each of the three nodes in the Kubernetes cluster. We recommend using a load balancer to direct traffic to each replica of Rancher in the cluster, in order to increase Rancher's availability.

The Rancher server data is stored on etcd. This etcd database also runs on all three nodes, and requires an odd number of nodes so that it can always elect a leader with a majority of the etcd cluster. If the etcd database cannot elect a leader, etcd can fail, requiring the cluster to be restored from backup.

For information on how Rancher works, regardless of the installation method, refer to the [overview section.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture)

# More Options for HA Installations

Refer to the [Helm chart options]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/) for details on installing HA Rancher with other configurations, including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#api-audit-log)
- With [TLS termination on a load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#external-tls-termination)
- With a [custom Ingress]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#customizing-your-ingress)

# More Options for Single Node Installations

Refer to the [single node installation docs]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/) for details other configurations including:

- With [API auditing to record all transactions]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/#api-audit-log)
- With an [external load balancer]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/single-node-install-external-lb/)
- With a [persistent data store]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/#persistent-data)

# More Kubernetes Options

In the Rancher installation instructions, we recommend using RKE (Rancher Kubernetes Engine) to set up a Kubernetes cluster before installing Rancher on the cluster. RKE has many configuration options for customizing the Kubernetes cluster to suit your specific environment. Please see the [RKE Documentation]({{<baseurl>}}/rke/latest/en/config-options/) for the full list of options and capabilities.