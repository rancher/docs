---
title: Nodes Hosted in an Infrastructure Provider
weight: 2205
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/node-templates/
---

## Node Pools

Using Rancher, you can create pools of nodes based on a [node template](#node-templates). The benefit of using a node pool is that if you delete an unhealthy node from the cluster, a new node will be created to keep the cluster count active.

By default, if you have a pool of nodes, but one loses connectivity and goes inactive, rancher does not automatically spin up a new node until the inactive node is deleted from Rancher. As of Rancher v2.3, you can configure a node pool so that a node is deleted and replaced if it becomes inactive for a specified number of minutes.

Each node pool is assigned with a [node component]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#node-components) to specify how these nodes should be configured for the Kubernetes cluster.

## Node Templates

A node template is the saved configuration for the parameters to use when provisioning nodes in a specific cloud provider. Rancher provides a nice UI to be able to launch these nodes and uses [Docker Machine](https://docs.docker.com/machine/) to provision these nodes. The available cloud providers to create node templates are based on the active node drivers in Rancher.

After you create a node template in Rancher, it's saved so that you can use this template again to create other node pools. Node templates are bound to your login. After you add a template, you can remove them from your user profile.

## Cloud Credentials

_Available as of v2.2.0_

Node templates can use cloud credentials to store credentials for launching nodes in your cloud provider, which has some benefits:

- Cloud credentials are stored as Kubernetes secrets for security. Credentials are no longer needed to be re-entered any time you want to edit a node template.

- After the cloud credential is created, it can be re-used to create additional node templates.

- When access and secret keys are expired or compromised, the cloud credential can be updated with the new information, which will automatically be updated for all the node templates referencing this cloud credential.

> **Note:** As of v2.2.0, the default `active` [node drivers]({{< baseurl >}}/rancher/v2.x/en/admin-settings/drivers/node-drivers/) and any node driver, that has fields marked as `password`, are required to use cloud credentials. If you have upgraded to v2.2.0, existing node templates will continue to work with the previous account access  information, but when you edit the node template, you will be required to create a cloud credential and the node template will start using it.

After cloud credentials are created, the user can start [managing the cloud credentials that they created]({{< baseurl >}}/rancher/v2.x/en/user-settings/cloud-credentials/).

## Node Drivers

If you don't find the node driver that you want to use, you can see if it is available in Rancher's built-in [node drivers and activate it]({{< baseurl >}}/rancher/v2.x/en/admin-settings/drivers/node-drivers/#activating-deactivating-node-drivers), or you can [add your own custom node driver]({{< baseurl >}}/rancher/v2.x/en/admin-settings/drivers/node-drivers/#adding-custom-node-drivers).
