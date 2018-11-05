---
title: "Air Gap: Single Node Install"
weight: 270
---

## Prerequisites

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).


## Caveats

In versions of Rancher prior to v2.1.0, registries with authentication are not supported when installing Rancher in HA or provisioning clusters, but after clusters are provisioned, registries with authentication can be used in the Kubernetes clusters.

As of v2.1.0, registries with authentication work for installing Rancher as well as provisioning clusters.

## Installation Outline

- [1. Provision Linux Host]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-install/air-gap-single-node/provision-host/)
- [2. Prepare Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-install/air-gap-single-node/prepare-private-registry/)
- [3. Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-install/air-gap-single-node/install-rancher/)
- [4. Configure Rancher for Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-install/air-gap-single-node/config-rancher-for-private-reg/)



### [Next: Provision Linux Host]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-install/air-gap-single-node/provision-host/)
