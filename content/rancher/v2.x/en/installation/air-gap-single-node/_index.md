---
title: "Air Gap: Single Node Install"
weight: 280
---

## Prerequisites

Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing Docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).

>**Note:** If you install Rancher on a single node in an air gap environment, you cannot transition to a HA configuration during future upgrades.

## Installation Outline

- [1. Provision Linux Host]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/provision-host/)
- [2. Prepare Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/prepare-private-registry/)
- [3. Choose an SSL Option and Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/install-rancher/)
- [4. Configure Rancher for Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/config-rancher-for-private-reg/)
- [5. Configure Rancher System Charts]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/config-rancher-system-charts/)

### [Next: Provision Linux Host]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/provision-host/)
