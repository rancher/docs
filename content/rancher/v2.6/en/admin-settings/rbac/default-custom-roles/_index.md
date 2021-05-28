---
title: Custom Roles
weight: 1128
aliases:
  - /rancher/v2.5/en/tasks/global-configuration/roles/
---

Within Rancher, _roles_ determine what actions a user can make within a cluster or project.

Note that _roles_ are different from _permissions_, which determine what clusters and projects you can access.

This section covers the following topics:

- [Prerequisites](#prerequisites)
- [Creating a custom role for a cluster or project](#creating-a-custom-role-for-a-cluster-or-project)
- [Creating a custom global role](#creating-a-custom-global-role)
- [Deleting a custom global role](#deleting-a-custom-global-role)
- [Assigning a custom global role to a group](#assigning-a-custom-global-role-to-a-group)

## Prerequisites

To complete the tasks on this page, one of the following permissions are required:

 - [Administrator Global Permissions]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/global-permissions/).
 - [Custom Global Permissions]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Roles]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/global-permissions/) role assigned.

## Creating A Custom Role for a Cluster or Project

While Rancher comes out-of-the-box with a set of default user roles, you can also create default custom roles to provide users with very specific permissions within Rancher.

The steps to add custom roles differ depending on the version of Rancher.

1.  From the **Global** view, select **Security > Roles** from the main menu.

1.  Select a tab to determine the scope of the roles you're adding. The tabs are:

  - **Cluster:** The role is valid for assignment when adding/managing members to _only_ clusters.
  - **Project:** The role is valid for assignment when adding/managing members to _only_ projects.

1.  Click **Add Cluster/Project Role.**

1.  **Name** the role.

1.  Optional: Choose the **Cluster/Project Creator Default** option to assign this role to a user when they create a new cluster or project. Using this feature, you can expand or restrict the default roles for cluster/project creators.

    > Out of the box, the Cluster Creator Default and the Project Creator Default roles are `Cluster Owner` and `Project Owner` respectively.

1.  Use the **Grant Resources** options to assign individual [Kubernetes API endpoints](https://kubernetes.io/docs/reference/) to the role.

    > When viewing the resources associated with default roles created by Rancher, if there are multiple Kubernetes API resources on one line item, the resource will have `(Custom)` appended to it. These are not custom resources but just an indication that there are multiple Kubernetes API resources as one resource.
    
    > The Resource text field provides a method to search for pre-defined Kubernetes API resources, or enter a custom resource name for the grant. The pre-defined or `(Custom)` resource must be selected from the dropdown, after entering a resource name into this field.

    You can also choose the individual cURL methods (`Create`, `Delete`, `Get`, etc.) available for use with each endpoint you assign.

1.  Use the **Inherit from a Role** options to assign individual Rancher roles to your custom roles. Note: When a custom role inherits from a parent role, the parent role cannot be deleted until the child role is deleted.

1.  Click **Create**.

## Creating a Custom Global Role

### Creating a Custom Global Role that Copies Rules from an Existing Role

If you have a group of individuals that need the same level of access in Rancher, it can save time to create a custom global role in which all of the rules from another role, such as the administrator role, are copied into a new role. This allows you to only configure the variations between the existing role and the new role.

The custom global role can then be assigned to a user or group so that the custom global role takes effect the first time the user or users sign into Rancher.

To create a custom global role based on an existing role,

1. Go to the **Global** view and click **Security > Roles.**
1. On the **Global** tab, go to the role that the custom global role will be based on. Click **&#8942; (…) > Clone.**
1. Enter a name for the role.
1. Optional: To assign the custom role default for new users, go to the **New User Default** section and click **Yes: Default role for new users.**
1. In the **Grant Resources** section, select the Kubernetes resource operations that will be enabled for users with the custom role.

    > The Resource text field provides a method to search for pre-defined Kubernetes API resources, or enter a custom resource name for the grant. The pre-defined or `(Custom)` resource must be selected from the dropdown, after entering a resource name into this field.

1. Click **Save.**

### Creating a Custom Global Role that Does Not Copy Rules from Another Role

Custom global roles don't have to be based on existing roles. To create a custom global role by choosing the specific Kubernetes resource operations that should be allowed for the role, follow these steps:

1. Go to the **Global** view and click **Security > Roles.**
1. On the **Global** tab, click **Add Global Role.**
1. Enter a name for the role.
1. Optional: To assign the custom role default for new users, go to the **New User Default** section and click **Yes: Default role for new users.**
1. In the **Grant Resources** section, select the Kubernetes resource operations that will be enabled for users with the custom role.

    > The Resource text field provides a method to search for pre-defined Kubernetes API resources, or enter a custom resource name for the grant. The pre-defined or `(Custom)` resource must be selected from the dropdown, after entering a resource name into this field.
    
1. Click **Save.**

## Deleting a Custom Global Role

When deleting a custom global role, all global role bindings with this custom role are deleted.

If a user is only assigned one custom global role, and the role is deleted, the user would lose access to Rancher. For the user to regain access, an administrator would need to edit the user and apply new global permissions.

Custom global roles can be deleted, but built-in roles cannot be deleted.

To delete a custom global role,

1. Go to the **Global** view and click **Security > Roles.**
2. On the **Global** tab, go to the custom global role that should be deleted and click **&#8942; (…) > Delete.**
3. Click **Delete.**

## Assigning a Custom Global Role to a Group

If you have a group of individuals that need the same level of access in Rancher, it can save time to create a custom global role. When the role is assigned to a group, the users in the group have the appropriate level of access the first time they sign into Rancher.

When a user in the group logs in, they get the built-in Standard User global role by default. They will also get the permissions assigned to their groups.

If a user is removed from the external authentication provider group, they would lose their permissions from the custom global role that was assigned to the group. They would continue to have their individual Standard User role.

> **Prerequisites:** You can only assign a global role to a group if:
>
> * You have set up an [external authentication provider]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/#external-vs-local-authentication)
> * The external authentication provider supports [user groups]({{<baseurl>}}/rancher/v2.5/en/admin-settings/authentication/user-groups/)
> * You have already set up at least one user group with the authentication provider

To assign a custom global role to a group, follow these steps:

1. From the **Global** view, go to **Security > Groups.**
1. Click **Assign Global Role.**
1. In the **Select Group To Add** field, choose the existing group that will be assigned the custom global role.
1. In the **Custom** section, choose any custom global role that will be assigned to the group.
1. Optional: In the **Global Permissions** or **Built-in** sections, select any additional permissions that the group should have.
1. Click **Create.**

**Result:** The custom global role will take effect when the users in the group log into Rancher.
