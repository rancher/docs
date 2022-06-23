---
title: Node Drivers
weight: 2
---

Node drivers are used to provision hosts, which Rancher uses to launch and manage Kubernetes clusters. A node driver is the same as a [Docker Machine driver](https://docs.docker.com/machine/drivers/). The availability of which node driver to display when creating node templates is defined based on the node driver's status. Only `active` node drivers will be displayed as an option for creating node templates. By default, Rancher is packaged with many existing Docker Machine drivers, but you can also create custom node drivers to add to Rancher.

If there are specific node drivers that you don't want to show to your users, you would need to de-activate these node drivers.

#### Managing Node Drivers

>**Prerequisites:** To create, edit, or delete drivers, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Node Drivers]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/global-permissions/) role assigned.

## Activating/Deactivating Node Drivers

By default, Rancher only activates drivers for the most popular cloud providers, Amazon EC2, Azure, DigitalOcean and vSphere. If you want to show or hide any node driver, you can change its status.

1. In the upper left corner, click **☰ > Cluster Management**.

2.  In the left navigation menu, click **Drivers**.

2.	On the **Node Drivers** tab, select the driver that you wish to activate or deactivate and click **⋮ > Activate** or **⋮ > Deactivate**.

## Adding Custom Node Drivers

If you want to use a node driver that Rancher doesn't support out-of-the-box, you can add that provider's driver in order to start using them to create node templates and eventually node pools for your Kubernetes cluster.

1. In the upper left corner, click **☰ > Cluster Management**.
1. In the left navigation menu, click **Drivers**.
1. On **Node Drivers** tab, click **Add Node Driver**.
1.	Complete the **Add Node Driver** form. Then click **Create**.

### Developing your own node driver

Node drivers are implemented with [Docker Machine](https://docs.docker.com/machine/).
