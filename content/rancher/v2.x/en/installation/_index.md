---
title: Installation
weight: 50
---
# Installation

This section contains instructions for installing Rancher in development and production environments. Review the section below to identify your use case. Then follow the linked procedures.

## Objectives

1. Install Rancher Server. We have instructions for these use cases. Pick the right one for you:

	-  [Single Node Installation]({{< baseurl >}}/rancher/v2.x/en/installation/server-installation/single-node-install): In this simple install scenario, you install Rancher on a single Linux host.

	-  [Single Node Install With External Loadbalancer]({{< baseurl >}}/rancher/v2.x/en/installation/server-installation/single-node-install-external-lb): In this scenario, you install Rancher on a single Linux host and access it using an external loadbalancer/proxy.

	-  [High Availablity Installation]({{< baseurl >}}/rancher/v2.x/en/installation/server-installation/ha-server-install/): This install scenario creates a new Kubernetes cluster dedicated to running Rancher Server in a high-availabilty (HA) configuration.

	-  [Air Gap Installation]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/): We also have instructions for a more specialized use case where you install Rancher Server in an environment without an Internet connection.

<!-- 2. **Optional:** Configure an external Load Balancer. A load balancer acts like a traffic cop for connections incoming to your Kubernetes cluster. You options are:

	a. [Amazon Application Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/load-balancing-config/config-amazon-alb/)

	b. [Amazon Network Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/load-balancing-config/config-amazon-nlb/)

	c. [Nginx]({{< baseurl >}}/rancher/v2.x/en/installation/load-balancing-config/config-Nginx/)

3. Configure SSL communication. Set up SSL by installing certificates on your Kubernetes nodes. You have a variety of options for [SSL Configuration]({{< baseurl >}}/rancher/v2.x/en/installation/ssl-config/). -->
