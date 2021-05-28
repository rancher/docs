---
title: Managing Node Templates
weight: 7010
---

When you provision a cluster [hosted by an infrastructure provider]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools), [node templates]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) are used to provision the cluster nodes. These templates use Docker Machine configuration options to define an operating system image and settings/parameters for the node. You can create node templates in two contexts:

- While [provisioning a node pool cluster]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools).
- At any time, from your [user settings](#creating-a-node-template-from-user-settings).

When you create a node template, it is bound to your user profile. Node templates cannot be shared among users. You can delete stale node templates that you no longer user from your user settings.

## Creating a Node Template from User Settings

1. From your user settings, select **User Avatar > Node Templates**.
1. Click **Add Template**.
1. Select one of the cloud providers available. Then follow the instructions on screen to configure the template.

**Result:** The template is configured. You can use the template later when you [provision a node pool cluster]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools).

## Updating a Node Template

1. From your user settings, select **User Avatar > Node Templates**.
1. Choose the node template that you want to edit and click the **&#8942; > Edit**.

	   > **Note:** As of v2.2.0, the default `active` [node drivers]({{<baseurl>}}/rancher/v2.5/en/admin-settings/drivers/node-drivers/) and any node driver, that has fields marked as `password`, are required to use [cloud credentials]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/#cloud-credentials). If you have upgraded to v2.2.0, existing node templates will continue to work with the previous account access  information, but when you edit the node template, you will be required to create a cloud credential and the node template will start using it.

1. Edit the required information and click **Save**.

**Result:** The node template is updated. All node pools using this node template will automatically use the updated information when new nodes are added.

## Cloning Node Templates

When creating new node templates from your user settings, you can clone an existing template and quickly update its settings rather than creating a new one from scratch. Cloning templates saves you the hassle of re-entering access keys for the cloud provider.

1. From your user settings, select **User Avatar > Node Templates**.
1. Find the template you want to clone. Then select **&#8942; > Clone**.
1. Complete the rest of the form.

**Result:** The template is cloned and configured. You can use the template later when you [provision a node pool cluster]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools).

## Deleting a Node Template

When you no longer use a node template, you can delete it from your user settings.

1. From your user settings, select **User Avatar > Node Templates**.
1. Select one or more template from the list. Then click **Delete**. Confirm the delete when prompted.
