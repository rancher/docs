---
title: Global Permissions
weight: 1126
---

_Permissions_ are individual access rights that you can assign when selecting a custom permission for a user.

Global Permissions define user authorization outside the scope of any particular cluster. Out-of-the-box, there are three default global permissions: `Administrator`, `Standard User` and `User-base`.

- **Administrator:** These users have full control over the entire Rancher system and all clusters within it.

- <a id="user"></a>**Standard User:** These users can create new clusters and use them. Standard users can also assign other users permissions to their clusters.

- **User-Base:** User-Base users have login-access only.

You cannot update or delete the built-in Global Permissions.

This section covers the following topics:

- [Global permission assignment](#global-permission-assignment)
  - [Global permissions for new local users](#global-permissions-for-new-local-users)
  - [Global permissions for users with external authentication](#global-permissions-for-users-with-external-authentication)
- [Custom global permissions](#custom-global-permissions)
  - [Custom global permissions reference](#custom-global-permissions-reference)
  - [Configuring default global permissions for new users](#configuring-default-global-permissions)
  - [Configuring global permissions for existing individual users](#configuring-global-permissions-for-existing-individual-users)
  - [Configuring global permissions for groups](#configuring-global-permissions-for-groups)
  - [Refreshing group memberships](#refreshing-group-memberships)

### List of `restricted-admin` Permissions

The `restricted-admin` permissions are as follows:

- Has full admin access to all downstream clusters managed by Rancher.
- Has very limited access to the local Kubernetes cluster. Can access Rancher custom resource definitions, but has no access to any Kubernetes native types.
- Can add other users and assign them to clusters outside of the local cluster.
- Can create other restricted admins.
- Cannot grant any permissions in the local cluster they don't currently have. (This is how Kubernetes normally operates)


### Changing Global Administrators to Restricted Admins

If Rancher already has a global administrator, they should change all global administrators over to the new `restricted-admin` role.

This can be done through **Security > Users** and moving any Administrator role over to Restricted Administrator.

Signed-in users can change themselves over to the `restricted-admin` if they wish, but they should only do that as the last step, otherwise they won't have the permissions to do so.

# Global Permission Assignment

Global permissions for local users are assigned differently than users who log in to Rancher using external authentication.

### Global Permissions for New Local Users

When you create a new local user, you assign them a global permission as you complete the **Add User** form.

To see the default permissions for new users, go to the **Global** view and click **Security > Roles.** On the **Global** tab, there is a column named **New User Default.** When adding a new local user, the user receives all  default global permissions that are marked as checked in this column. You can [change the default global permissions to meet your needs.](#configuring-default-global-permissions)

### Global Permissions for Users with External Authentication

When a user logs into Rancher using an external authentication provider for the first time, they are automatically assigned the  **New User Default** global permissions. By default, Rancher assigns the **Standard User** permission for new users.

To see the default permissions for new users, go to the **Global** view and click **Security > Roles.** On the **Global** tab, there is a column named **New User Default.** When adding a new local user, the user receives all default global permissions that are marked as checked in this column, and you can [change them to meet your needs.](#configuring-default-global-permissions)

Permissions can be assigned to an individual user with [these steps.](#configuring-global-permissions-for-existing-individual-users)

As of Rancher v2.4.0, you can [assign a role to everyone in the group at the same time](#configuring-global-permissions-for-groups) if the external authentication provider supports groups.

# Custom Global Permissions

Using custom permissions is convenient for providing users with narrow or specialized access to Rancher.

When a user from an [external authentication source]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/) signs into Rancher for the first time, they're automatically assigned a set of global permissions (hereafter, permissions). By default, after a user logs in for the first time, they are created as a user and assigned the default `user` permission. The standard `user` permission allows users to login and create clusters.

However, in some organizations, these permissions may extend too much access. Rather than assigning users the default global permissions of `Administrator` or `Standard User`, you can assign them a more restrictive set of custom global permissions.

The default roles, Administrator and Standard User, each come with multiple global permissions built into them. The Administrator role includes all global permissions, while the default user role includes three global permissions: Create Clusters, Use Catalog Templates, and User Base, which is equivalent to the minimum permission to log in to Rancher. In other words, the custom global permissions are modularized so that if you want to change the default user role permissions, you can choose which subset of global permissions are included in the new default user role.

Administrators can enforce custom global permissions in multiple ways:

- [Changing the default permissions for new users](#configuring-default-global-permissions)
- [Configuring global permissions for individual users](#configuring-global-permissions-for-individual-users)
- [Configuring global permissions for groups](#configuring-global-permissions-for-groups)

### Custom Global Permissions Reference

The following table lists each custom global permission available and whether it is included in the default global permissions, `Administrator`, `Standard User` and `User-Base`.

| Custom Global Permission           | Administrator | Standard User | User-Base |
| ---------------------------------- | ------------- | ------------- |-----------|
| Create Clusters                    | ✓             | ✓             |           |
| Create RKE Templates               | ✓             | ✓             |           |
| Manage Authentication              | ✓             |               |           |
| Manage Catalogs                    | ✓             |               |           |
| Manage Cluster Drivers             | ✓             |               |           |
| Manage Node Drivers                | ✓             |               |           |
| Manage PodSecurityPolicy Templates | ✓             |               |           |
| Manage Roles                       | ✓             |               |           |
| Manage Settings                    | ✓             |               |           |
| Manage Users                       | ✓             |               |           |
| Use Catalog Templates              | ✓             | ✓             |           |
| User Base\* (Basic log-in access)  | ✓             | ✓             |           |

> \*This role has two names:
>
> - When you go to the <b>Users</b> tab and edit a user's global role, this role is called <b>Login Access</b> in the custom global permissions list.
> - When you go to the <b>Security</b> tab and edit the roles from the roles page, this role is called <b>User Base.</b>

For details on which Kubernetes resources correspond to each global permission, you can go to the **Global** view in the Rancher UI. Then click **Security > Roles** and go to the **Global** tab. If you click an individual role, you can refer to the **Grant Resources** table to see all of the operations and resources that are permitted by the role.

> **Notes:**
>
> - Each permission listed above is comprised of multiple individual permissions not listed in the Rancher UI. For a full list of these permissions and the rules they are comprised of, access through the API at `/v3/globalRoles`.
> - When viewing the resources associated with default roles created by Rancher, if there are multiple Kubernetes API resources on one line item, the resource will have `(Custom)` appended to it. These are not custom resources but just an indication that there are multiple Kubernetes API resources as one resource.

### Configuring Default Global Permissions

If you want to restrict the default permissions for new users, you can remove the `user` permission as default role and then assign multiple individual permissions as default instead. Conversely, you can also add administrative permissions on top of a set of other standard permissions.

> **Note:** Default roles are only assigned to users added from an external authentication provider. For local users, you must explicitly assign global permissions when adding a user to Rancher. You can customize these global permissions when adding the user.

To change the default global permissions that are assigned to external users upon their first log in, follow these steps:

1. From the **Global** view, select **Security > Roles** from the main menu. Make sure the **Global** tab is selected.

1. Find the permissions set that you want to add or remove as a default. Then edit the permission by selecting **&#8942; > Edit**.

1. If you want to add the permission as a default, Select **Yes: Default role for new users** and then click **Save**.

1. If you want to remove a default permission, edit the permission and select **No** from **New User Default**.

**Result:** The default global permissions are configured based on your changes. Permissions assigned to new users display a check in the **New User Default** column.

### Configuring Global Permissions for Individual Users

To configure permission for a user,

1. Go to the **Users** tab.

1. On this page, go to the user whose access level you want to change and click **&#8942; > Edit.**

1. In the **Global Permissions** section, click **Custom.**

1. Check the boxes for each subset of permissions you want the user to have access to.

1. Click **Save.**

> **Result:** The user's global permissions have been updated.

### Configuring Global Permissions for Groups

_Available as of v2.4.0_

If you have a group of individuals that need the same level of access in Rancher, it can save time to assign permissions to the entire group at once, so that the users in the group have the appropriate level of access the first time they sign into Rancher.

After you assign a custom global role to a group, the custom global role will be assigned to a user in the group when they log in to Rancher.

For existing users, the new permissions will take effect when the users log out of Rancher and back in again, or when an administrator [refreshes the group memberships.](#refreshing-group-memberships)

For new users, the new permissions take effect when the users log in to Rancher for the first time. New users from this group will receive the permissions from the custom global role in addition to the **New User Default** global permissions. By default, the **New User Default** permissions are equivalent to the **Standard User** global role, but the default permissions can be [configured.](#configuring-default-global-permissions)

If a user is removed from the external authentication provider group, they would lose their permissions from the custom global role that was assigned to the group. They would continue to have any remaining roles that were assigned to them, which would typically include the roles marked as **New User Default.** Rancher will remove the permissions that are associated with the group when the user logs out, or when an administrator [refreshes group memberships,](#refreshing-group-memberships) whichever comes first.

> **Prerequisites:** You can only assign a global role to a group if:
>
> * You have set up an [external authentication provider]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/#external-vs-local-authentication)
> * The external authentication provider supports [user groups]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/user-groups/)
> * You have already set up at least one user group with the authentication provider

To assign a custom global role to a group, follow these steps:

1. From the **Global** view, go to **Security > Groups.**
1. Click **Assign Global Role.**
1. In the **Select Group To Add** field, choose the existing group that will be assigned the custom global role.
1. In the **Global Permissions,** **Custom,** and/or **Built-in** sections, select the permissions that the group should have.
1. Click **Create.**

**Result:** The custom global role will take effect when the users in the group log into Rancher.

### Refreshing Group Memberships

When an administrator updates the global permissions for a group, the changes take effect for individual group members after they log out of Rancher and log in again.

To make the changes take effect immediately, an administrator or cluster owner can refresh group memberships.

An administrator might also want to refresh group memberships if a user is removed from a group in the external authentication service. In that case, the refresh makes Rancher aware that the user was removed from the group.

To refresh group memberships,

1. From the **Global** view, click **Security > Users.**
1. Click **Refresh Group Memberships.**

**Result:** Any changes to the group members' permissions will take effect.
