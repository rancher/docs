---
title: Custom Roles
weight: 1128
---

Within Rancher, _roles_ determine what actions a user can make within a cluster or project.

Note that _roles_ are different from _permissions_, which determine what clusters and projects you can access.

> It is possible for a custom role to enable privilege escalation. For details, see [this section.](#privilege-escalation)

This section covers the following topics:

- [Prerequisites](#prerequisites)
- [Creating a custom role](#creating-a-custom-role)
- [Creating a custom role that inherits from another role](#creating-a-custom-role-that-inherits-from-another-role)
- [Deleting a custom role](#deleting-a-custom-role)
- [Assigning a custom role to a group](#assigning-a-custom-role-to-a-group)
- [Privilege escalation](#privilege-escalation)

# Prerequisites

To complete the tasks on this page, one of the following permissions are required:

 - [Administrator Global Permissions]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/global-permissions/).
 - [Custom Global Permissions]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Roles]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/global-permissions/) role assigned.

# Creating A Custom Role

While Rancher comes out-of-the-box with a set of default user roles, you can also create default custom roles to provide users with very specific permissions within Rancher.

The steps to add custom roles differ depending on the version of Rancher.

1. In the upper left corner, click **☰ > Users & Authentication**.
1. In the left navigation bar, click **Roles**.
1.  Select a tab to determine the scope of the role you're adding. The tabs are:

  - **Global:** The role is valid for allowing members to manage global scoped resources.
  - **Cluster:** The role is valid for assignment when adding/managing members to clusters.
  - **Project/Namespaces:** The role is valid for assignment when adding/managing members to projects or namespaces.

1.  Click **Create Global Role,** **Create Cluster Role** or **Create Project/Namespaces Role,** depending on the scope.
1. Enter a **Name** for the role.
1.  Optional: Choose the **Cluster/Project Creator Default** option to assign this role to a user when they create a new cluster or project. Using this feature, you can expand or restrict the default roles for cluster/project creators.

    > Out of the box, the Cluster Creator Default and the Project Creator Default roles are `Cluster Owner` and `Project Owner` respectively.

1.  Use the **Grant Resources** options to assign individual [Kubernetes API endpoints](https://kubernetes.io/docs/reference/) to the role.

    > When viewing the resources associated with default roles created by Rancher, if there are multiple Kubernetes API resources on one line item, the resource will have `(Custom)` appended to it. These are not custom resources but just an indication that there are multiple Kubernetes API resources as one resource.
    
    > The Resource text field provides a method to search for pre-defined Kubernetes API resources, or enter a custom resource name for the grant. The pre-defined or `(Custom)` resource must be selected from the dropdown, after entering a resource name into this field.

    You can also choose the individual cURL methods (`Create`, `Delete`, `Get`, etc.) available for use with each endpoint you assign.

1.  Use the **Inherit from** options to assign individual Rancher roles to your custom roles. Note: When a custom role inherits from a parent role, the parent role cannot be deleted until the child role is deleted.

1.  Click **Create**.

# Creating a Custom Role that Inherits from Another Role

If you have a group of individuals that need the same level of access in Rancher, it can save time to create a custom role in which all of the rules from another role, such as the administrator role, are copied into a new role. This allows you to only configure the variations between the existing role and the new role.

The custom role can then be assigned to a user or group so that the role takes effect the first time the user or users sign into Rancher.

To create a custom role based on an existing role,

1. In the upper left corner, click **☰ > Users & Authentication**.
1. In the left navigation bar, click **Roles**.
1. Click the **Cluster** or **Project/Namespaces** tab. Click **Create Cluster Role** or **Create Project/Namespaces Role** depending on the scope. Note: Only cluster roles and project/namespace roles can inherit from another role.
1. Enter a name for the role.
1. In the **Inherit From** tab, select the role(s) that the custom role will inherit permissions from.
1. In the **Grant Resources** tab, select the Kubernetes resource operations that will be enabled for users with the custom role.

    > The Resource text field provides a method to search for pre-defined Kubernetes API resources, or enter a custom resource name for the grant. The pre-defined or `(Custom)` resource must be selected from the dropdown, after entering a resource name into this field.
1. Optional: Assign the role as default.
1. Click **Create**.

# Deleting a Custom Role

When deleting a custom role, all global role bindings with this custom role are deleted.

If a user is only assigned one custom role, and the role is deleted, the user would lose access to Rancher. For the user to regain access, an administrator would need to edit the user and apply new global permissions.

Custom roles can be deleted, but built-in roles cannot be deleted.

To delete a custom role,

1. In the upper left corner, click **☰ > Users & Authentication**.
1. In the left navigation bar, click **Roles**.
2. Go to the custom global role that should be deleted and click **⋮ (…) > Delete**.
3. Click **Delete**.

# Assigning a Custom Role to a Group

If you have a group of individuals that need the same level of access in Rancher, it can save time to create a custom role. When the role is assigned to a group, the users in the group have the appropriate level of access the first time they sign into Rancher.

When a user in the group logs in, they get the built-in Standard User global role by default. They will also get the permissions assigned to their groups.

If a user is removed from the external authentication provider group, they would lose their permissions from the custom role that was assigned to the group. They would continue to have their individual Standard User role.

> **Prerequisites:** You can only assign a global role to a group if:
>
> * You have set up an [external authentication provider]({{<baseurl>}}/rancher/v2.6/en/admin-settings/authentication/#external-vs-local-authentication)
> * The external authentication provider supports [user groups]({{<baseurl>}}/rancher/v2.6/en/admin-settings/authentication/user-groups/)
> * You have already set up at least one user group with the authentication provider

To assign a custom role to a group, follow these steps:

1. In the upper left corner, click **☰ > Users & Authentication**.
1. In the left navigation bar, click **Groups**.
1. Go to the existing group that will be assigned the custom role and click **⋮ > Edit Config**.
1. If you have created roles, they will show in the **Custom** section. Choose any custom role that will be assigned to the group.
1. Optional: In the **Global Permissions** or **Built-in** sections, select any additional permissions that the group should have.
1. Click **Save.**.

**Result:** The custom role will take effect when the users in the group log into Rancher.

# Privilege Escalation

The `Configure Catalogs` custom permission is powerful and should be used with caution. When an admin assigns the  `Configure Catalogs` permission to a standard user, it could result in privilege escalation in which the user could give themselves admin access to Rancher provisioned clusters. Anyone with this permission should be considered equivalent to an admin.