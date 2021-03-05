---
title: Troubleshooting HA RKE Add-On Install
weight: 370
aliases:
- /rancher/v2.0-v2.4/en/installation/troubleshooting-ha/
- /rancher/v2.0-v2.4/en/installation/options/helm2/rke-add-on/troubleshooting
- /rancher/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting/404-default-backend/
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher Helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install ]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/).
>
>If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

This section contains common errors seen when setting up a Kubernetes installation.

Choose from the following options:

- [Generic troubleshooting](generic-troubleshooting/)

	In this section, you can find generic ways to debug your Kubernetes cluster.

- [Failed to set up SSH tunneling for host]({{<baseurl>}}/rke/latest/en/troubleshooting/ssh-connectivity-errors/)

	In this section, you can find errors related to SSH tunneling when you run the `rke` command to setup your nodes.

- [Failed to get job complete status](./job-complete-status/)

	In this section, you can find errors related to deploying addons.

- [404 - default backend]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/resources/advanced/helm2/rke-add-on/troubleshooting/404-default-backend/)

	In this section, you can find errors related to the `404 - default backend` page that is shown when trying to access Rancher.
