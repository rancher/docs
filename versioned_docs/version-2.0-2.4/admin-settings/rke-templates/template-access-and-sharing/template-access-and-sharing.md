---
title: Access and Sharing
weight: 31
---

If you are an RKE template owner, you can share it with users or groups of users, who can then use the template to create clusters.

Since RKE templates are specifically shared with users and groups, owners can share different RKE templates with different sets of users.

When you share a template, each user can have one of two access levels:

- **Owner:** This user can update, delete, and share the templates that they own. The owner can also share the template with other users.
- **User:** These users can create clusters using the template. They can also upgrade those clusters to new revisions of the same template. When you share a template as **Make Public (read-only),** all users in your Rancher setup have the User access level for the template.

If you create a template, you automatically become an owner of that template. 

If you want to delegate responsibility for updating the template, you can share ownership of the template. For details on how owners can modify templates, refer to the [documentation about revising templates.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rke-templates/creating-and-revising)

There are several ways to share templates:

- Add users to a new RKE template during template creation
- Add users to an existing RKE template
- Make the RKE template public, sharing it with all users in the Rancher setup
- Share template ownership with users who are trusted to modify the template

### Sharing Templates with Specific Users or Groups

To allow users or groups to create clusters using your template, you can give them the basic **User** access level for the template.

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the template that you want to share and click the **&#8942; > Edit.**
1. In the **Share Template** section, click on **Add Member**.
1. Search in the **Name** field for the user or group you want to share the template with.
1. Choose the **User** access type.
1. Click **Save.**

**Result:** The user or group can create clusters using the template.

### Sharing Templates with All Users

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the template that you want to share and click the **&#8942; > Edit.**
1. Under **Share Template,** click **Make Public (read-only).** Then click **Save.**

**Result:** All users in the Rancher setup can create clusters using the template.

### Sharing Ownership of Templates

If you are the creator of a template, you might want to delegate responsibility for maintaining and updating a template to another user or group.

In that case, you can give users the Owner access type, which allows another user to update your template, delete it, or share access to it with other users.

To give Owner access to a user or group,

1. From the **Global** view, click **Tools > RKE Templates.**
1. Go to the RKE template that you want to share and click the **&#8942; > Edit.**
1. Under **Share Template**, click on **Add Member** and search in the **Name** field for the user or group you want to share the template with.
1. In the **Access Type** field, click **Owner.**
1. Click **Save.**

**Result:** The user or group has the Owner access type, and can modify, share, or delete the template.