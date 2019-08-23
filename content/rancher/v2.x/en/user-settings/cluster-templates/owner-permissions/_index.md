---
title: Template Owner Permissions
weight: 10
---

There are two components that give a user control over a template: the **Create Cluster Templates** global role, which gives a user permission to manipulate templates in general, and the role of a template owner, which gives a user permission to control a specific template. 

If you create a template, you automatically become an owner of that template. 

The owner of a template can revise it, share it, and delete it. The owner can also share the template with other users who have the **Create Cluster Templates** global role.

Administrators automatically have the permission to create and own cluster templates, and only administrators can give that permission to other users.

> **Important:** If you create a cluster template and add another user as an owner, that user must also have the <b>Create Cluster Templates</b> global role in order to manage the cluster template.

For more information on administrator permissions, refer to the [documentation on global permissions]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/).

# Giving Users Permission to Be Template Owners

Users with the global permission **Create Cluster Templates** can do the following:

- Create templates
- Be template owners, who have full control over a template (includes sharing, updating, and deleting templates)
- Share ownership of a template with users who also have the **Create Cluster Templates** permission

Administrators have the global permission to create templates, and only administrators can give that permission to other users.

For more information on sharing templates, including sharing ownership of templates, refer to [Sharing Templates.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cluster-templates/sharing-templates)

Administrators can give users permission to create cluster templates in two ways:

- By editing the permissions of an [individual user](#allowing-a-user-to-create-and-revise-templates)
- By changing the [default permissions of new users](#allowing-new-users-to-create-and-revise-templates-by-default)

### Allowing a User to Create and Revise Templates

An administrator can individually grant the role **Create Cluster Templates** to any existing user by following these steps:

1. From the global view, click the **Users** tab. Choose the user you want to edit and click the **Vertical Ellipsis (...) > Edit.**
1. In the **Global Permissions** section, choose **Custom** and select the **Create Cluster Templates** role along with any other roles the user should have. Click **Save.**

**Result:** The user has permission to create cluster templates. The user can also be a template owner, which allows updating a template and sharing it with other users.

### Allowing New Users to Create and Revise Templates by Default

Alternatively, the administrator can give all new users the default permission to create cluster templates by following the following steps. This will not affect the permissions of existing users.

1. From the global view, click **Security > Roles.**
1. Under the **Global** roles tab, go to the role **Create Cluster Templates** and click the **Vertical Ellipsis (...) > Edit**.
1. Select the option **Yes: Default role for new users** and click **Save.**

**Result:** Any new user created in this Rancher installation will be able to create cluster templates. The users can also be template owners, which allows updating templates and sharing them with other users. Existing users will not get this permission.

# Revoking Permission to Create and Revise Templates

Administrators can remove a user's permission to create templates with the following steps:

1. From the global view, click the **Users** tab. Choose the user you want to edit and click the **Vertical Ellipsis (...) > Edit.**
1. In the **Global Permissions** section, un-check the box for **Create Cluster Templates**. In this section, you can change the user back to a standard user, or give the user a different set of custom permissions.
1. Click **Save.**

**Result:** The user cannot create cluster templates. If this user is given owner privileges for a template, they won't be able to use those privileges.










