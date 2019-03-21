---
title: Nodes Hosted in an Infrastructure Provider
weight: 2205
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/node-templates/
---

## Node Pools

Using Rancher, you can create pools of nodes based on a [node template](#node-templates). The benefit of using a node pool is that if a node loses connectivity with the cluster, Rancher will automatically create another node to join the cluster to ensure that the count of the node pool is as expected.

Each node pool is assigned with a [node component]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#node-components) to specify how these nodes should be configured for the Kubernetes cluster.

## Node Templates

A node template is the saved configuration for the parameters to use when provisioning nodes in a specific cloud provider. Rancher provides a nice UI to be able to launch these nodes and uses [Docker Machine](https://docs.docker.com/machine/) to provision these nodes. The available cloud providers to create node templates are based on the active node drivers in Rancher.

After you create a node template in Rancher, it's saved so that you can use this template again to create other node pools. Node templates are bound to your login. After you add a template, you can remove them from your user profile.

## Node Drivers

If you don't find the node driver that you want to use, you can see if it is available in Rancher's built-in [node drivers and activate it]({{< baseurl >}}/rancher/v2.x/en/tools/drivers/node-drivers/#activating-deactivating-node-drivers), or you can [add your own custom node driver]({{< baseurl >}}/rancher/v2.x/en/tools/drivers/node-drivers/#adding-custom-node-drivers).
