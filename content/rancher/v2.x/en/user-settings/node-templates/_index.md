---
title: Managing Node Templates
weight: 7010
---

[Node templates]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) are operating system images and settings used to create nodes when you provision a [node pool]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools) cluster. You can create node templates in two contexts:

- While [provisioning a node pool cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools).
- At any time, from your [user settings](#creating-a-node-template-from-user-settings).

When you create a node template, it is bound to your user profile. Node templates cannot be shared among users. You can delete stale node templates that you no longer user from your user settings.

## Creating a Node Template from User Settings

1. From your user settings, select **User Avatar > Node Templates**.
1. Click **Add Template**.
1. Select one of the cloud providers available. Then follow the instructions on screen to configure the template.

**Result:** The template is configured. You can use the template later when you [provision a node pool cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools).

## Cloning Node Templates

When creating new node templates from your user settings, you can clone an existing template and quickly update its settings rather than creating a new one from scratch.

1. From your user settings, select **User Avatar > Node Templates**.
1. Find the template you want to clone. Then select **Ellipsis > Clone**.
1. Complete the rest of the form.

**Result:** The template is cloned and configured. You can use the template later when you [provision a node pool cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools).

## Deleting a Node Template

When you no longer use a node template, you can delete it from your user settings.

1. From your user settings, select **User Avatar > Node Templates**.
1. Select one or more template from the list. Then click **Delete**. Confirm the delete when prompted.