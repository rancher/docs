---
title: Nodes hosted in an Infrastructure Provider
weight: 2205
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/node-drivers/
  - /rancher/v2.x/en/tasks/global-configuration/node-drivers/
  - /rancher/v2.x/en/concepts/global-configuration/node-templates/
---

## Node Pools

Using Rancher, you can create pools of nodes based on a [node template](#node-templates). The benefit of using a node pool is that if a node loses connectivity with the cluster, Rancher will automatically create another node to join the cluster to ensure that the count of the node pool is as expected.

Each node pool is assigned with a [node component]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#node-components) to specify how these nodes should be configured for the Kubernetes cluster.

## Node Templates

A node template is the saved configuration for the parameters to use when provisioning nodes in a specific cloud provider. Rancher provides a nice UI to be able to launch these nodes and uses [Docker Machine](https://docs.docker.com/machine/) to provision these nodes. The available cloud providers to create node templates are based on the active node drivers in Rancher.

After you create a node template in Rancher, it's saved so that you can use this template again to create other node pools. Node templates are bound to your login. After you add a template, you can remove them from your user profile.

## Node Drivers

A node driver is the same as a [Docker Machine driver](https://docs.docker.com/machine/drivers/). The availability of which node driver to display when creating node templates is defined based on the node driver's status. Only `active` node drivers will be displayed as an option for creating node templates. By default, Rancher is packaged with many existing Docker Machine drivers, but you can also create custom node drivers to add to Rancher.

If there are specific node drivers that you don't want to show to your users, you would need to de-activate these node drivers.

#### Managing Node Drivers

>**Prerequisites:** To create, edit, or delete drivers, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Node Drivers]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#global-permissions-reference) role assigned.

## Adding Custom Node Drivers

If you want to use a node driver that Rancher doesn't support out-of-the-box, you can add the provider's drivers in order to start using them to create node templates and eventually node pools.

1.	From the **Global** view, select **Node Drivers** from the main menu.

2.	Click **Add Node Driver**.

3.	Complete the **Add Node Driver** form. Then click **Create**.

## Activating/Deactivating Node Drivers

By default, Rancher only activates drivers for the most popular cloud providers, Amazon EC2, Azure, DigitalOcean and vSphere. If you want to show or hide any node driver, you can change it's status.

1.	From the **Global** view, select **Node Drivers** from the main menu.

2.	Find the driver that you want to activate or deactivate and select **Vertical Elipsis (...) > Edit**. Choose either **Activate** or **Deactivate**.
