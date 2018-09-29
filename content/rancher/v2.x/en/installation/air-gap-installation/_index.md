---
title: Air Gap Install
weight: 300
---
In environments where security is high priority, you can set up Rancher in an air gap configuration. Air gap installs are more secure than standard single-node or HA deployments because the network that runs Rancher is disconnected from the Internet, reducing your security surface area. 

## Prerequisites

- Rancher supports air gap installs using a private registry. You must have your own private registry or other means of distributing docker images to your machine. If you need help with creating a private registry, please refer to the [Docker documentation](https://docs.docker.com/registry/).

    For each Rancher [release](https://github.com/rancher/rancher/releases), we provide the Docker images and scripts needed to mirror those images to your own registry. The Docker images are used when nodes are added to a cluster, or when you enable features like pipelines or logging.

- **Installation Option:** Before beginning your air gap installation, choose whether you want ~~a~~ [single-node install]({{< baseurl >}}/rancher/v2.x/en/installation/single-node) or a [high availability install]({{< baseurl >}}/rancher/v2.x/en/installation/ha). View your chosen configuration's introduction notes along with Rancher's [node requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

## Caveats

In Rancher v2.0.x, registries with authentication are not supported for installing from a private registry. The Docker images can only be pulled from a registry without authentication enabled. This limitation only applies to Docker images.

## Air Gap Installation Outline

While installing Rancher in an air gap configuration, you'll complete several different tasks.

- [1—Preparing the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/prepare-private-reg/)
- [2—Installing Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/)
- [3—Configuring Rancher for the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/config-rancher-for-private-reg/) 

 
### [Next: Prepare the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/prepare-private-reg/) 