---
title: Cluster Drivers
weight: 1
---

_Available as of v2.2.0_

Cluster drivers are used to create clusters in a [hosted Kubernetes provider]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/hosted-kubernetes-clusters/), such as Google GKE. The availability of which cluster driver to display when creating clusters is defined by the cluster driver's status. Only `active` cluster drivers will be displayed as an option for creating clusters. By default, Rancher is packaged with several existing cloud provider cluster drivers, but you can also add custom cluster drivers to Rancher.

If there are specific cluster drivers that you do not want to show your users, you may deactivate those cluster drivers within Rancher and they will not appear as an option for cluster creation.

### Managing Cluster Drivers

>**Prerequisites:** To create, edit, or delete cluster drivers, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Cluster Drivers]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) role assigned.

## Activating/Deactivating Cluster Drivers

By default, Rancher only activates drivers for the most popular cloud providers, Google GKE, Amazon EKS and Azure AKS. If you want to show or hide any node driver, you can change its status.

1.  From the **Global** view, choose **Tools > Drivers** in the navigation bar.

2.  From the **Drivers** page, select the **Cluster Drivers** tab.

3.  Select the driver that you wish to **Activate** or **Deactivate** and select the appropriate icon.

## Adding Custom Cluster Drivers

If you want to use a cluster driver that Rancher doesn't support out-of-the-box, you can add the provider's driver in order to start using them to create _hosted_ kubernetes clusters.

1.  From the **Global** view, choose **Tools > Drivers** in the navigation bar.

2.  From the **Drivers** page select the **Cluster Drivers** tab.

3.  Click **Add Cluster Driver**.

4.  Complete the **Add Cluster Driver** form. Then click **Create**.


### Developing your own Cluster Driver

In order to develop cluster driver to add to Rancher, please refer to our [example](https://github.com/rancher-plugins/kontainer-engine-driver-example).
