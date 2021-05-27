---
title: Air Gapped Helm CLI Install
weight: 1
aliases:
  - /rancher/v2.5/en/installation/air-gap-installation/
  - /rancher/v2.5/en/installation/air-gap-high-availability/
  - /rancher/v2.5/en/installation/air-gap-single-node/
---

This section is about using the Helm CLI to install the Rancher server in an air gapped environment. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy.

The installation steps differ depending on whether Rancher is installed on an RKE Kubernetes cluster, a K3s Kubernetes cluster, or a single Docker container.

For more information on each installation option, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/installation/)

Throughout the installation instructions, there will be _tabs_ for each installation option.

> **Important:** If you install Rancher following the Docker installation guide, there is no upgrade path to transition your Docker Installation to a Kubernetes Installation.

# Installation Outline

1. [Set up infrastructure and private registry]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap/prepare-nodes/)
2. [Collect and publish images to your private registry]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap/populate-private-registry/)
3. [Set up a Kubernetes cluster (Skip this step for Docker installations)]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap/launch-kubernetes/)
4. [Install Rancher]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap/install-rancher/)

# Upgrades

To upgrade Rancher with Helm CLI in an air gap environment, follow [this procedure.]({{<baseurl>}}/rancher/v2.5/en/installation/install-rancher-on-k8s/upgrades/)

### [Next: Prepare your Node(s)]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap/prepare-nodes/)
