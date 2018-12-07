---
title: Global Permissions
weight: 1126
---

Global Permissions define user authorization outside the scope of any particular cluster. Out-of-the-box, there are two default global permissions: `Administrator` and `Standard User`.

- **Administrator:**

    These users have full control over the entire Rancher system and all clusters within it.

- <a id="user"></a>**Standard User:**

    These users can create new clusters and use them. Standard users can also assign other users permissions to their clusters.

>**Note:** You cannot create, update, or delete Global Permissions.

### Global Permission Assignment

Assignment of global permissions to a user depends on their authentication source: external or local.

- **External Authentication**

    When a user logs into Rancher using an external authentication provider for the first time, they are automatically assigned the `Standard User` global permission.

- **Local Authentication**

    When you create a new local user, you assign them a global permission as you complete the **Add User** form.

### Custom Global Permissions

Rather than assigning users the default global permissions of `Administrator` or `Standard User`, you can assign them a custom set of permissions.

_Permissions_ are individual access rights that you can assign when selecting a custom permission for a user.

Using custom permissions is convenient for providing users with narrow or specialized access to Rancher. See the [table below](#global-permissions-reference) for a list of individual permissions available.

### Global Permissions Reference

The following table lists each custom global permission available and whether it is assigned to the default global permissions, `Administrator` and `Standard User`.

| Custom Global Permission           | Administrator | Standard User |
| ---------------------------------- | ------------- | ------------- |
| Manage Authentication              | ✓             |               |
| Manage Catalogs                    | ✓             |               |
| Manage Node Drivers                | ✓             |               |
| Manage PodSecurityPolicy Templates | ✓             |               |
| Manage Roles                       | ✓             |               |
| Manage Users                       | ✓             |               |
| Create Clusters                    | ✓             | ✓             |
| User Catalog Templates             | ✓             | ✓             |
| Login Access                       | ✓             | ✓             |

> **Notes:** 
>
>- Each permission listed above is comprised of multiple individual permissions not listed in the Rancher UI. For a full list of these permissions and the rules they are comprised of, access through the API at `/v3/globalRoles`.
>- When viewing the resources associated with default roles created by Rancher, if there are multiple Kuberenetes API resources on one line item, the resource will have `(Custom)` appended to it. These are not custom resources but just an indication that there are multiple Kubernetes API resources as one resource.

When a user from an [external authentication source]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/) signs into Rancher for the first time, they're automatically assigned a set of global permissions (hereafter, permissions). By default, new users are assigned the [user](#user) permissions. However, in some organizations, these permissions may extend too much access. In this use case, you can change the default permissions to something more restrictive, such as a set of individual permissions.

You can assign one or more default permissions. For example, the `user` permission assigns new users a [set of individual global permissions](#global-permissions-reference). If you want to restrict the default permissions for new users, you can remove the `user` permission as default role and then assign multiple individual permissions as default instead. Conversely, you can also add administrative permissions on top of a set of other standard permissions.

>**Note:** Default roles are only assigned to users added from an external authentication provider. For local users, you must explicitly assign global permissions when adding a user to Rancher. You can customize these global permissions when adding the user.

### Configuring Default Global Permissions

You can change the default global permissions that are assigned to external users upon their first log in.

1. From the **Global** view, select **Security > Roles** from the main menu. Make sure the **Global** tab is selected.

1. Find the permissions set that you want to use as default. Then edit the permission by selecting **Ellipsis > Edit**.

1. Select **Yes: Default role for new users** and then click **Save**.

1. If you want to remove a default permission, edit the permission and select **No** from **New User Default**.

**Result:** The default global permissions are configured based on your changes. Permissions assigned to new users display a check in the **New User Default** column.
