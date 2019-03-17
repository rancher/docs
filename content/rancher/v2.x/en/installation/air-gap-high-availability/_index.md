---
title: "Air Gap: High Availability Install"
weight: 290
aliases:
  - /rancher/v2.x/en/installation/air-gap-installation/
---

## Prerequisites

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machines. If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).

The following CLI tools are required for this install. Make sure these tools are installed on your workstation and available in your `$PATH`.

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
* [rke]({{< baseurl >}}/rke/v0.1.x/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes.

>**Note:** If you install Rancher in an HA configuration in an air gap environment, you cannot transition to a single-node setup during future upgrades.

## Installation Outline

- [1. Create Nodes and Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/provision-hosts/)
- [2. Collect and Publish Image Sources]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/prepare-private-registry/)
- [3. Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/install-kube/)
- [4. Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/install-rancher/)
- [5. Configure Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-for-private-reg/)
- [6. Configure Rancher System Charts]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-system-charts/)

### [Next: Create Nodes and Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/provision-hosts/) 
