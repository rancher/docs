---
title: Installation Options
weight: 2
---

Rancher can be installed on a single node or a high-availability cluster. 

A high-availability installation is recommended for production. A single-node installation may be used for development and testing purposes, but there is no migration path from a single-node to a high-availability installation. Therefore, you may want to use a high-availability installation from the start.

The Rancher server, regardless of the installation method, should always run on nodes that are separate from the downstream user clusters that it manages. If Rancher is installed on a high-availability Kubernetes cluster, it should run on a separate cluster from the cluster(s) it manages.

On a single node, Rancher is installed with Docker and many options are configured with Docker commands.

On a Kubernetes cluster, Rancher is installed with Helm, and Helm commands are used to pass in configuration options. [Helm]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/concepts/#about-helm) is a Kubernetes package manager.

The simplest way to install Rancher is on a single node with direct access to the Internet. Other options require more steps:

- For a high-availability installation, you need to first set up a Kubernetes cluster using the Rancher Kubernetes Engine, then install Rancher on the cluster.
- If the installation environment is behind an HTTP proxy or in an air gap environment, additional steps are required to work around the lack of direct access to DockerHub and GitHub.

Depending on your environment, the result of of the extra steps is the increased security and reliability of Rancher.

Basic options for installing Rancher include the following:

Level of Internet Access | Single Node Instructions | HA Instructions
---------------------------|-----------------------------|------------------
With direct access to the Internet | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/)                  | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/ha/)
Behind an HTTP proxy  | These [docs,]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/) plus this [configuration]({{<baseurl>}}/rancher/v2.x/en/installation/single-node/proxy/) | These [docs,]({{<baseurl>}}/rancher/v2.x/en/installation/ha/) plus this [configuration]({{<baseurl>}}/rancher/v2.x/en/installation/ha/helm-rancher/chart-options/#http-proxy)
In an air gap environment | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap/) | [Docs]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap/)

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