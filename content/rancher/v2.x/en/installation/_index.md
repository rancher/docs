---
title: Installation
weight: 50
---
This section contains instructions for installing Rancher in development and production environments.

Choose from the following installation options:

- [Single Node Installation]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install)

	In this simple install scenario, you install Rancher on a single Linux host.

- [Single Node Installation with External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/single-node-install-external-lb)

	In this scenario, you install Rancher on a single Linux host and access it using an external load balancer/proxy.

-  [High Availability Installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install/)

 	This install scenario creates a new Kubernetes cluster dedicated to running Rancher Server in a high-availabilty (HA) configuration.

-  [High Availability Installation with External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install-external-lb)

 	This install scenario creates a new Kubernetes cluster dedicated to running Rancher Server in a high-availabilty (HA) configuration. A load balancer is placed in front of the HA configuration.

-  [Air Gap Installation]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/)

 	We also have instructions for a more specialized use case where you install Rancher Server in an environment without an Internet connection.

This section also includes help content for Rancher configuration and maintenance.

-  [Backups and Rollbacks]({{< baseurl >}}/rancher/v2.x/en/backups/)

 	How to create and restore from backups.

-  [Port Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/references/)

 	This page lists the ports you must open to operate Rancher.

-  [HTTP Proxy Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/proxy-configuration/)

	If your Rancher installation runs behind a proxy, this page provides information on how to configure Rancher for your proxy.
