---
title: Node Drivers
weight: 3050
---

>**Prerequisites:** To create, edit, or delete drivers, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#global-permissions)
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#custom-global-permissions) with the [Manage Node Drivers]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#global-permissions-reference) role assigned.

## Adding Custom Node Drivers

If you create a cluster using a cloud provider that {{< product >}} doesn't support out-of-the-box, you may need to add the provider's drivers (or create them yourself) so that your nodes function properly.

1.	From the **Global** view, select **Node Drivers** from the main menu.

2.	Click **Add Node Driver**.

3.	Complete the **Add Node Driver** form. Then click **Create**.

## Activating Node Drivers

Using the **Custom** option, you can create a cluster using virtually any cloud provider. However, by default, {{< product >}} only activates drivers for the most popular cloud providers. If you want to use another provider, you'll have to activate their drivers.

1.	From the **Global** view, select **Node Drivers** from the main menu.

2.	Select the inactive drivers that you want to use. Then click **Add Node Driver**.
