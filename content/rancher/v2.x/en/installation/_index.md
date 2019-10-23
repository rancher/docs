---
title: Installation
weight: 50
---
This section contains instructions for installing Rancher in development and production environments.

Before installing Rancher, make sure that your nodes fulfill all of the [installation requirements.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)

### Installation Options

- [Single Node Installation]({{< baseurl >}}/rancher/v2.x/en/installation/single-node/)

	Install Rancher on a single Linux host. Single node installs are recommended for development and test environments, as setup is simple and the server doesn't have to be readily available for a user base—only the developer or tester.

-  [High Availability Installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha/)

 	This install scenario creates a new Kubernetes cluster dedicated to running Rancher Server in a high-availability (HA) configuration, which runs Rancher Server on multiple hosts so that it's always accessible provided that one of your cluster nodes is running. We recommend high-availability installs in production environments, where your user base requires 24/7 access to your applications.
