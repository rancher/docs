---
title: Air-Gapped Helm CLI Install
weight: 1
---

This section is about using the Helm CLI to install the Rancher server in an air gapped environment. An air gapped environment could be where Rancher server will be installed offline, behind a firewall, or behind a proxy.

The installation steps differ depending on whether Rancher is installed on an RKE Kubernetes cluster, a K3s Kubernetes cluster, or a single Docker container.

For more information on each installation option, refer to [this page.](installation-and-upgrade.md)

Throughout the installation instructions, there will be _tabs_ for each installation option.

:::note Important:

If you install Rancher following the Docker installation guide, there is no upgrade path to transition your Docker Installation to a Kubernetes Installation.

:::

# Installation Outline

1. [Set up infrastructure and private registry](../getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install/infrastructure-private-registry.md)
2. [Collect and publish images to your private registry](../getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install/publish-images.md)
3. [Set up a Kubernetes cluster (Skip this step for Docker installations)](../getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install/install-kubernetes.md)
4. [Install Rancher](../getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install/install-rancher-ha.md)

# Upgrades

To upgrade Rancher with Helm CLI in an air gap environment, follow [this procedure.](../getting-started/installation-and-upgrade/install-upgrade-on-a-kubernetes-cluster/upgrades.md)

### [Next: Prepare your Node(s)](../getting-started/installation-and-upgrade/other-installation-methods/air-gapped-helm-cli-install/infrastructure-private-registry.md)
