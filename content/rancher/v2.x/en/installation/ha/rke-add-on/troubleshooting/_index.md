---
title: Troubleshooting HA RKE Add-On Install
weight: 370
aliases:
- /rancher/v2.x/en/installation/troubleshooting-ha/
---

> ### 🛑 IMPORTANT: RKE Add-On install is Deprecated as of the 2.1.0 release.
>
>Please use the official Helm Chart to install HA Rancher. For details see the [HA Install - Installation Outline]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#installation-outline).
>
>If you are currently using the RKE Add-On install method see [Migrating from RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on moving to the Helm Chart.

This section contains common errors seen when setting up a High Availability Installation.

Choose from the following options:

- [Generic troubleshooting](generic-troubleshooting/)

	In this section, you can find generic ways to debug your Kubernetes cluster.

- [Failed to set up SSH tunneling for host](ssh-tunneling/)

	In this section, you can find errors related to SSH tunneling when you run the `rke` command to setup your nodes.

- [Failed to get job complete status](job-complete-status/)

	In this section, you can find errors related to deploying addons.

- [404 - default backend](404-default-backend/)

	In this section, you can find errors related to the `404 - default backend` page that is shown when trying to access Rancher.
