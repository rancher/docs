---
title: Sharing Templates
weight: 40
---

If you are a cluster template owner, you can share it with users, who can then use it to create clusters.

The cluster template owner can also share ownership of a template to delegate responsibility for updating the template.

Since cluster templates are specifically shared with users, admins can share different cluster templates with different sets of users.

You can share the cluster template with other users or groups in several ways:

- You can add members to a new cluster template during template creation
- You can add members to an existing cluster template
- You can make the cluster template public, sharing it with all users in the Rancher setup
- You can share template ownership with users who have the **Create Cluster Template** global permission

When you share a template with a user, you can choose one of two access levels:

- **Owner:** This user can update, delete, and share the templates that they own. Note: The **Create Cluster Templates** global role is required.
- **User:** These users can create clusters using the template and upgrade those clusters to new revisions of the template.

### Sharing Cluster Templates with Specific Users

1. Click **User Avatar > Cluster Templates.**
1. Choose the cluster template that you want to share and click the **Vertical Ellipsis (...) > Edit.**
1. Under **Share Template**, click on **Add Member** and search in the **Name** field for the user or group you want to share the template with. Then click **Save.**

### Sharing Cluster Templates with All Users

1. Click **User Avatar > Cluster Templates.**
1. Choose the cluster template that you want to share and click the **Vertical Ellipsis (...) > Edit.**
1. Under **Share Template,** click **Make Public (read-only).** Then click **Save.**


### Sharing Ownership of Templates

If you are the creator of a template, you might want to delegate responsibility for maintaining and updating a template to another user.

In that case, you can give users the Owner access type, which allows another user to update your template, delete it, or share access to it with other users.

> **Prerequisite:** Users can only have Owner access to a template if they have the <b>Create Cluster Templates</b> global role. This permission can only be [given by an administrator.]({{<baseurl>}}rancher/v2.x/en/user-settings/cluster-templates/owner-permissions/#allowing-a-user-to-create-and-revise-templates)

To give a user Owner access to a template,

1. Click **User Avatar > Cluster Templates.**
1. Choose the cluster template that you want to share and click the **Vertical Ellipsis (...) > Edit.**
1. Under **Share Template**, click on **Add Member** and search in the **Name** field for the user or group you want to share the template with.
1. In the **Access Type** field, click **Owner.**
1. Click **Save.**

**Result:** The user has the Owner access type for the template, but cannot use those privileges without the **Create Cluster Templates** global role. This permission can only be [given by an administrator.]({{<baseurl>}}rancher/v2.x/en/user-settings/cluster-templates/owner-permissions/#allowing-a-user-to-create-and-revise-templates)