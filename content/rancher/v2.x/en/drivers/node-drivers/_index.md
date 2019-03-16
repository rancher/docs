---
title: Node Drivers
weight: 2
aliases:
---

Node drivers are used to provision hosts. The availability of which node driver to display when creating node templates is defined based on the node driver's status. Only `active` node drivers will be displayed as an option for creating node templates. By default, Rancher is packaged with many existing Docker Machine drivers, but you can also create custom node drivers to add to Rancher.

If there are specific node drivers that you don't want to show to your users, you would need to de-activate these node drivers.

#### Managing Node Drivers

>**Prerequisites:** To create, edit, or delete drivers, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Node Drivers]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#global-permissions-reference) role assigned.

## Activating/Deactivating Node Drivers

By default, Rancher only activates drivers for the most popular cloud providers, Amazon EC2, Azure, DigitalOcean and vSphere. If you want to show or hide any node driver, you can change it's status.

1.  From the **Global** view, choose **Tools > Drivers** in the navigation bar. In version prior to v2.2.0, you can select **Drivers** directly in the navigation bar.

2.  From the **Drivers** page, select the **Node Drivers** tab.

3.	Select the driver that you wish to **Activate** or **Deactivate** and select the appropriate icon.


## Adding Custom Node Drivers

If you want to use a node driver that Rancher doesn't support out-of-the-box, you can add the provider's drivers in order to start using them to create node templates and eventually node pools.

1.  From the **Global** view, choose **Tools > Drivers** in the navigation bar. In version prior to v2.2.0, you can select **Drivers** directly in the navigation bar.

2.  From the **Drivers** page, select the **Node Drivers** tab

3.	Click **Add Node Driver**.

4.	Complete the **Add Node Driver** form. Then click **Create**.

### Developing your own node driver
Node drivers are implemented with [Docker Machine](https://docs.docker.com/machine/).