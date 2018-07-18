---
title: Nodes hosted in an Infrastructure Provider
weight: 2205
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/node-drivers/
  - /rancher/v2.x/en/tasks/global-configuration/node-drivers/
  - /rancher/v2.x/en/concepts/global-configuration/node-templates/
---

## Node Pools

Rancher calls <a href='https://docs.docker.com/machine/' target='_blank'>Docker Machine</a> to provision nodes from major IaaS providers in combination with Rancher RKE to provision a new Kubernetes cluster quickly and easily, all from the Rancher UI. There's no need to log directly into your infrastructure provider's portal.

Out-of-the-box, Rancher includes node pool options for the infrastructure providers that follow, although you can add options by adding or creating [Node Drivers](#node-drivers).

- Amazon EC2
- Microsoft Azure
- DigitalOcean
- VMWare Vsphere

### Node Drivers

Out-of-the-box, Rancher provides support for creating clusters using many popular cloud providers: Amazon EC2, Azure, DigitalOcean, and so on. However, you may want to create a cluster using another cloud provider. In these scenarios, you can create a custom node driver for the cloud provider and point Rancher toward it.

For more information on creating node drivers, see [https://github.com/rancher/ui-driver-skel](https://github.com/rancher/ui-driver-skel).

#### Managing Node Drivers

>**Prerequisites:** To create, edit, or delete drivers, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Node Drivers]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#global-permissions-reference) role assigned.

## Adding Custom Node Drivers

If you create a cluster using a cloud provider that {{< product >}} doesn't support out-of-the-box, you may need to add the provider's drivers (or create them yourself) so that your nodes function properly.

1.	From the **Global** view, select **Node Drivers** from the main menu.

2.	Click **Add Node Driver**.

3.	Complete the **Add Node Driver** form. Then click **Create**.

## Activating Node Drivers

Using the **Custom** option, you can create a cluster using virtually any cloud provider. However, by default, {{< product >}} only activates drivers for the most popular cloud providers. If you want to use another provider, you'll have to activate their drivers.

1.	From the **Global** view, select **Node Drivers** from the main menu.

2.	Select the inactive drivers that you want to use. Then click **Add Node Driver**.


### Node templates

You can create new clusters within Rancher using _node templates_. A node template is a virtual machine image used to create a Kubernetes cluster. While creating a cluster, Rancher will prompt you for an image to use as a template. Follow the directions on screen to create the template. During cluster creation, Rancher clones the template and installs different Kubernetes components.

After you add a node template to Rancher, its stored by the system so that you can use it when creating another cluster later. Node templates are bound to your login. After you add a template, you can remove them from your user profile.

You can create provider-hosted nodes from the Rancher UI by creating a node template. After providing Rancher with an access token from the vendor you're using, Rancher prompts you for specifications that it will send to your provider by API. The provider than provisions your nodes based on the template.
