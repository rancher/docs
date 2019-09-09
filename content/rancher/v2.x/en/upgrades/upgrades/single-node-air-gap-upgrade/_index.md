---
title: Single Node Upgrade - Air Gap
weight: 1011
aliases:
  - /rancher/v2.x/en/upgrades/air-gap-upgrade/
---
To upgrade an air gapped Rancher Server, update your private registry with the latest Docker images, and then run the upgrade command.

> **Note:** If you are upgrading from from Rancher v2.0.13 or earlier, or v2.1.8 or earlier, and your cluster's certificates have expired, you will need to perform [additional steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/certificate-rotation/#rotating-expired-certificates-after-upgrading-older-rancher-versions) to rotate the certificates.

## Prerequisites
**Upgrades to v2.0.7+ only:** Starting in v2.0.7, Rancher introduced the `system` project, which is a project that's automatically created to store important namespaces that Kubernetes needs to operate. During upgrade to v2.0.7+, Rancher expects these namespaces to be unassigned from all projects. Before beginning upgrade, check your system namespaces to make sure that they're unassigned to [prevent cluster networking issues]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#preventing-cluster-networking-issues).

**Upgrades to v2.2.0 only: mirror system-charts repository and configure Rancher**<br/>
Starting in v2.2.0, Rancher introduced the [System Charts](https://github.com/rancher/system-charts) repository which contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. To be able to use these features in an air gap install, you will need to mirror the `system-charts` repository locally and configure Rancher to use that repository. Please follow the instructions to [configure Rancher system charts]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/config-rancher-system-charts/).

## Caveats
Upgrades _to_ or _from_ any tag containing [alpha]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#server-tags) aren't supported.

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
