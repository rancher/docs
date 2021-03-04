---
title: Template Creator Permissions
weight: 10
---

Administrators have the permission to create RKE templates, and only administrators can give that permission to other users.

For more information on administrator permissions, refer to the [documentation on global permissions]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/global-permissions/).

# Giving Users Permission to Create Templates

Templates can only be created by users who have the global permission **Create RKE Templates.**

Administrators have the global permission to create templates, and only administrators can give that permission to other users.

For information on allowing users to modify existing templates, refer to [Sharing Templates.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rke-templates/template-access-and-sharing)

Administrators can give users permission to create RKE templates in two ways:

- By editing the permissions of an [individual user](#allowing-a-user-to-create-templates)
- By changing the [default permissions of new users](#allowing-new-users-to-create-templates-by-default)

### Allowing a User to Create Templates

An administrator can individually grant the role **Create RKE Templates** to any existing user by following these steps:

1. From the global view, click the **Users** tab. Choose the user you want to edit and click the **&#8942; > Edit.**
1. In the **Global Permissions** section, choose **Custom** and select the **Create RKE Templates** role along with any other roles the user should have. Click **Save.**

**Result:** The user has permission to create RKE templates.

### Allowing New Users to Create Templates by Default

Alternatively, the administrator can give all new users the default permission to create RKE templates by following the following steps. This will not affect the permissions of existing users.

1. From the **Global** view, click **Security > Roles.**
1. Under the **Global** roles tab, go to the role **Create RKE Templates** and click the **&#8942; > Edit**.
1. Select the option **Yes: Default role for new users** and click **Save.**

**Result:** Any new user created in this Rancher installation will be able to create RKE templates. Existing users will not get this permission.

### Revoking Permission to Create Templates

Administrators can remove a user's permission to create templates with the following steps:

1. From the global view, click the **Users** tab. Choose the user you want to edit and click the **&#8942; > Edit.**
1. In the **Global Permissions** section, un-check the box for **Create RKE Templates**. In this section, you can change the user back to a standard user, or give the user a different set of custom permissions.
1. Click **Save.**

**Result:** The user cannot create RKE templates.