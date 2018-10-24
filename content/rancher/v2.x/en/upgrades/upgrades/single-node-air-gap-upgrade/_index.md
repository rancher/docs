---
title: Single Node Upgrade - Air Gap
weight: 1011
aliases:
  - /rancher/v2.x/en/upgrades/air-gap-upgrade/
---
To upgrade an air gapped Rancher Server, update your private registry with the latest Docker images, and then run the upgrade command.

## Prerequisites

**Upgrades to v2.0.7+ only:** Starting in v2.0.7, Rancher introduced the `system` project, which is a project that's automatically created to store important namespaces that Kubernetes needs to operate. During upgrade to v2.0.7+, Rancher expects these namespaces to be unassigned from all projects. Before beginning upgrade, check your system namespaces to make sure that they're unassigned to [prevent cluster networking issues]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#preventing-cluster-networking-issues).


## Upgrading An Air Gapped Rancher Server

1. Follow the directions in Air Gap Installation to [pull the Docker images]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/#release-files) required for the new version of Rancher.

2. Follow the directions in [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/single-node-upgrade/) to complete upgrade of your air gapped Rancher Server.

	>**Note:**
	> While completing [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/single-node-upgrade/), prepend your private registry URL to the image when running the `docker run` command.
	>
	> Example: `<registry.yourdomain.com:port>/rancher/rancher:latest`

**Result:** Rancher is upgraded. Log back into Rancher to confirm that the  upgrade succeeded.

>**Having Network Issues Following Upgrade?**
>
> See  [Restoring Cluster Networking]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#restoring-cluster-networking).

## Rolling Back

If your upgrade does not complete successfully, you can roll Rancher Server and its data back to its last healthy state. For more information, see [Single Node Rollback]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/single-node-rollbacks/).
