---
title: "Air Gap: High Availability Install"
weight: 280
---

## Prerequisites

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).

The following CLI tools are required for this install. Please make sure these tools are installed and available in your `$PATH`

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
* [rke]({{< baseurl >}}/rke/v0.1.x/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes.

## Caveats

In versions of Rancher prior to v2.1.0, registries with authentication are not supported when installing Rancher in HA or provisioning clusters, but after clusters are provisioned, registries with authentication can be used in the Kubernetes clusters.

As of v2.1.0, registries with authentication work for installing Rancher as well as provisioning clusters.


## Installation Outline

- [1. Create Nodes and Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/wip-air-gap-installation/air-gap-high-availability/provision-hosts/)
- [2. Collect and Publish Image Sources]({{< baseurl >}}/rancher/v2.x/en/installation/wip-air-gap-installation/air-gap-high-availability/prepare-private-registry/)
- [3. Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/wip-air-gap-installation/air-gap-high-availability/install-kube/)
- [4. Initialize Helm]({{< baseurl >}}/rancher/v2.x/en/installation/wip-air-gap-installation/air-gap-high-availability/helm-init/)
- [5. Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/wip-air-gap-installation/air-gap-high-availability/install-rancher/)
- [6. Configure Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/wip-air-gap-installation/air-gap-high-availability/config-rancher-for-private-reg/)