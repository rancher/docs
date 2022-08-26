---
title: Managing Cloud Credentials
weight: 7011
aliases:
  - /rancher/v2.x/en/user-settings/cloud-credentials/
---

When you create a cluster [hosted by an infrastructure provider](../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md), [node templates](../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-templates) are used to provision the cluster nodes. These templates use Docker Machine configuration options to define an operating system image and settings/parameters for the node.

Node templates can use cloud credentials to access the credential information required to provision nodes in the infrastructure providers. The same cloud credential can be used by multiple node templates. By using a cloud credential, you do not have to re-enter access keys for the same cloud provider. Cloud credentials are stored as Kubernetes secrets.

Cloud credentials are only used by node templates if there are fields marked as `password`. The default `active` node drivers have their account access fields marked as `password`, but there may be some `inactive` node drivers, which are not using them yet. These node drivers will not use cloud credentials.

You can create cloud credentials in two contexts:

- [During creation of a node template](../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-templates) for a cluster.
- In the **User Settings**

All cloud credentials are bound to the user profile of who created it. They **cannot** be shared across users.

## Creating a Cloud Credential from User Settings

1. From your user settings, select **User Avatar > Cloud Credentials**.
1. Click **Add Cloud Credential**.
1. Enter a name for the cloud credential.
1. Select a **Cloud Credential Type** from the drop down. The values of this dropdown is based on the `active` [node drivers](../../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/about-provisioning-drivers/manage-node-drivers.md) in Rancher.
1. Based on the selected cloud credential type, enter the required values to authenticate with the infrastructure provider.
1. Click **Create**.

**Result:** The cloud credential is created and can immediately be used to [create node templates](../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-templates).

## Updating a Cloud Credential

When access credentials are changed or compromised, updating a cloud credential allows you to rotate those credentials while keeping the same node template.  

1. From your user settings, select **User Avatar > Cloud Credentials**.
1. Choose the cloud credential you want to edit and click the **&#8942; > Edit**.
1. Update the credential information and click **Save**.

**Result:** The cloud credential is updated with the new access credentials. All existing node templates using this cloud credential will automatically use the updated information whenever [new nodes are added](../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md).

## Deleting a Cloud Credential

In order to delete cloud credentials, there must not be any node template associated with it. If you are unable to delete the cloud credential, [delete any node templates](manage-node-templates.md#deleting-a-node-template) that are still associated to that cloud credential.

1. From your user settings, select **User Avatar > Cloud Credentials**.
1. You can either individually delete a cloud credential or bulk delete.

	- To individually delete one, choose the cloud credential you want to edit and click the **&#8942; > Delete**.
	- To bulk delete cloud credentials, select one or more cloud credentials from the list. Click **Delete**.
1. Confirm that you want to delete these cloud credentials.
