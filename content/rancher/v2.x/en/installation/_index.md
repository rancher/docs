---
title: Installation
weight: 50
---
# Installation

This section contains instructions for installing Rancher in development and production environments. Review the section below to identify your use case. Then follow the linked procedures.

## Objectives

1. Install Rancher Server. We have instructions for three use cases. Pick the right one for you:

	a.  [Single-Node Rancher Server Installation](/rancher/v2.x/en/installation/server-installation/single-node-install/): In this simple install scenario, you install Rancher on a single Linux host.

	b.  [High-Availablity Rancher Server Installation](/rancher/v2.x/en/installation/server-installation/ha-server-install/): In this scenario, you install multiple Rancher Servers so that Rancher is always available, even when one of your Rancher Servers is down.

	c.  [Air Gap Installation](/rancher/v2.x/en/installation/air-gap-installation/): We also have instructions for a more specialized use case where you install Rancher Server in an environment without an Internet connection.

2. **Optional:** Configure an external Load Balancer. A load balancer acts like a traffic cop for connections incoming to your Kubernetes cluster. You options are:

	a. [Amazon Application Load Balancer](rancher/v2.x/en/installation/load-balancing-config/config-amazon-alb/)

	b. [Amazon Network Load Balancer](rancher/v2.x/en/installation/load-balancing-config/config-amazon-nlb/)

	c. [Nginx](rancher/v2.x/en/installation/load-balancing-config/congiure-nginx/)

3. Configure SSL communication. Set up SSL by installing certificates on your Kubernetes nodes. You have a variety of options for [SSL Configuration](rancher/v2.x/en/installation/ssl-config/). 
