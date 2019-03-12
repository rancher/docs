---
title: Cluster Drivers
weight: 1
aliases:
---
_Available as of v2.2_

Cluster drivers are used to create clusters in a [hosted Kubernetes provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/), such as Google GKE or [Rancher launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/)

A cluster driver is similar to a node driver but for provisioning kubernetes clusters. Rancher uses the cluster driver to provision and manage the cluster. The availability of which cluster driver to display when creating clusters is defined by the cluster driver's status. Only `active` cluster drivers will be displayed as an option for creating clusters. By default, Rancher is packaged with several existing cloud provider cluster drivers but you can also add custom cluster drivers to Rancher.

If there are specific cluster drivers that you do not want to show your users, you may deactivate those cluster drivers within Rancher and they will not appear as an option for cluster creation.

### Managing Cluster Drivers
>**Prerequisites:** To create, edit, or delete drivers, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Cluster Drivers]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#global-permissions-reference) role assigned.

## Activating/Deactivating Cluster Drivers

By default, Rancher activates drivers for some common Kubernetes providers. If you want to activate or deactivate additional drivers follow these steps:

1.  From the **Global** view, choose **Tools > Drivers** in the navigation bar. In version prior to v2.2.0, you can select **Drivers** directly in the navigation bar.

2.  From the **Drivers** page, select the **Cluster Drivers** tab.

3.  Select the driver that you wish to **Activate** or **Deactivate** and select the appropriate icon.



## Adding Custom Cluster Drivers

If you want to use a cluster driver that Rancher doesn't support out-of-the-box, you can add the provider's driver in order to start using them to create _hosted_ kubernetes clusters.

1.  From the **Global** view, choose **Tools > Drivers** in the navigation bar. In version prior to v2.2.0, you can select **Drivers** directly in the navigation bar.

2.  From the **Drivers** page select the **Cluster Drivers** tab

3.  Click **Add Cluster Driver**.

4.  Complete the **Add Cluster Driver** form. Then click **Create**


### Developing your own cluster driver
To develop your own pluggable cluster driver please see this [example](https://github.com/rancher-plugins/kontainer-engine-driver-example)
