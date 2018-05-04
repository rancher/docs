---
title: HA Server Install
weight: 275
---
# High Availability Rancher Server Install

You have the option of installing Rancher Server in a High-Availability (HA) configuration. This configuration sets up 3-node Kubernetes cluster with two Rancher Server instances, which ensure that you can always access Rancher, even when one of your Rancher Servers is down.

Install Rancher in an HA configuration using the Rancher Kubernetes Engine (RKE). RKE is Rancher's own fast and light-weight Kubernetes installer. Use RKE to set up a new cluster that deploys Rancher as an addon.

SSL is required to secure Rancher communications. Before completing one of the procedures below, complete the procedure in its companion note.

Complete one of the following procedures to install Rancher in an HA configuration.


- [SSL Passthrough]({{< baseurl >}}/rancher/v2.x/en/installation/server-installation/ha-server-install/ssl-passthrough/)

	In this scenario, your High-Availability Rancher Servers handle SSL decryption rather than a Load Balancer.

	>**Note:**
	> Before you begin this procedure, you must complete [SSL Config: In the Rancher Container]({{< baseurl >}}/rancher/v2.x/en/installation/ssl-config/#certificate-host-inside-the-rancher-container).

- [SSL Termination]({{< baseurl >}}/rancher/v2.x/en/installation/server-installation/ha-server-install/ssl-termination/)

	In this scenario, your Load Balancer handles all SSL encryption, and then forwards on the communication within your Kubernetes cluster unencrypted.

	>**Note:**
	> Before you begin this procedure, you must complete [SSL Config: External Load Balancer or Proxy]({{< baseurl >}}/rancher/v2.x/en/installation/ssl-config/#instructions-for-the-loadbalancer-or-proxy).
