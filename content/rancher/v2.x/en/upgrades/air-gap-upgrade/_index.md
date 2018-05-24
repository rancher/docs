---
title: Air Gap Upgrade
weight: 1500
---
To upgrade an air gapped Rancher Server, update your private registry with the latest Docker images, and then run the upgrade command.

## Upgrading An Air Gapped Rancher Server

1. Follow the directions in Air Gap Installation to [pull the Docker images]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/#release-files) required for the new version of Rancher.

2. Follow the directions in [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/single-node-upgrade/) to complete upgrade of your air gapped Rancher Server.

	>**Note:**
	> While completing [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/single-node-upgrade/), prepend your private registry URL to the image when running the `docker run` command.
	>
	> Example: `<registry.yourdomain.com:port>/rancher/rancher:latest`
