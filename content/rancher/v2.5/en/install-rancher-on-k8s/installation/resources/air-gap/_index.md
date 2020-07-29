---
title: Installing Rancher in an Air Gapped Environment
weight: 2
---

> This section is under construction.

This section is about installations of Rancher server in an air gapped environment. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy.

The installation steps differ depending on whether Rancher is installed on an RKE Kubernetes cluster, a K3s Kubernetes cluster, or a single Docker container.

For more information on each installation option, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/)

Throughout the installation instructions, there will be _tabs_ for each installation option.

> **Important:** If you install Rancher following the Docker installation guide, there is no upgrade path to transition your Docker Installation to a Kubernetes Installation.

# Installation Outline

1. [Set up private registry]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap/prepare-nodes/)
2. [Collect and publish images to your private registry]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap/populate-private-registry/)
3. [Install Rancher]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap/install-rancher/)

### [Next: Prepare your Node(s)]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap/prepare-nodes/)
