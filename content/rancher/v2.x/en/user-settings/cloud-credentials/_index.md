---
title: Managing Cloud Credentials
weight: 7010
---

When you create a cluster [hosted by an infrastructure provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools), [node templates]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) are used to provision the cluster nodes. These templates use Docker Machine configuration options to define an operating system image and settings/parameters for the node. 

Starting rancher v2.2.0, Node Templates use Cloud Credentials to access the credential information required to provision nodes in the cloud providers. The same cloud credential can be used by multiple node templates. This saves you the hassle of re-entering access keys for the cloud provider. Cloud Credentials are stored in Kubernetes Secrets.

You can create cloud credentials in two contexts:

- While [provisioning a node pool for a cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools).
- At any time, from your [user settings](#creating-a-node-template-from-user-settings).

When you create a cloud credential, it is bound to your user profile. Cloud Credentials cannot be shared among users.

## Creating a Cloud Credential from User Settings

1. From your user settings, select **User Avatar > Cloud Credentials**.
1. Click **Add Cloud Credential**.
1. Select one of the Cloud Credential Types from the drop down menu; these correspond to the available cloud providers for Node Templates. 
1. Enter required values for the type you've selected.

**Result:** The cloud credential is configured. You can use the cloud credential later when you [create a node template]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-templates).

## Updating a Cloud Credential

When your access credentials change or you want to rotate or invalidate credential data, you can update a cloud credential. 

1. From your user settings, select **User Avatar > Cloud Credentials**.
1. Choose the cloud credential you want to edit and click on the vertical ellipsis button at the end of the row and choose **Edit**.
1. Enter updated information and click **Save**.

**Result:** The cloud credential has been updated and configured. Existing node templates using this cloud credential will automatically use the updated information when [new nodes are added]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools).

## Deleting a Cloud Credential

When cloud credential is no longer used by any node template, you can delete it from your user settings.

1. From your user settings, select **User Avatar > Cloud Credentials**.
1. Select one or more cloud credentials from the list. Then click **Delete**. Confirm the delete when prompted.
