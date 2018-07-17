---
title: Global Permissions
weight: 1126
---

Global Permissions define user authorization outside the scope of any particular cluster. Out-of-the-box, there are two default global permissions: `Administrator` and `Standard User`.

- **Administrator:**

    These users have full control over the entire Rancher system and all clusters within it.

- **Standard User:**

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

> **Note:** Each permission listed above is comprised of multiple individual permissions not listed in the Rancher UI. For a full list of these permissions and the rules they are comprised of, access through the API at `/v3/globalroles`.
