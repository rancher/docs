---
title: Roles
weight: 100
---
Within Rancher, _roles_ determine what actions a user can make within a cluster or project.

Note that _roles_ are different from _permissions_, which determine what clusters and projects you can access.

>**Prerequisites:**
>
>To complete the tasks on this page, the following permissions are required:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#global-permissions).
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#custom-global-permissions) with the [Manage Roles]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#global-permissions-reference) role assigned.

## Adding A Custom Role

While Rancher comes out-of-the-box with a set of default user roles, you can also create custom roles to provide users with very specific permissions within Rancher.

1.    From the **Global** view, select **Security > Roles** from the main menu.

2.    Click **Add Role**.

3.	**Name** the role.

4.	Choose whether to set the role to a status of [locked]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#locked-roles).

	Locked roles cannot be assigned to users.

5.	Assign the role a **Context**. Context determines the scope of role assigned to the user. The contexts are:

	- **All**

		The user can use their assigned role regardless of context. This role is valid for assignment when adding/managing members to clusters or projects.

	- **Cluster**

		This role is valid for assignment when adding/managing members to _only_ clusters.

	- **Project**

		This role is valid for assignment when adding/managing members to _only_ projects.

6.	Use the **Grant Resources** options to assign individual [Kubernetes API endpoints](https://kubernetes.io/docs/reference/) to the role.

	You can also choose the individual cURL methods (`Create`, `Delete`, `Get`, etc.) available for use with each endpoint you assign.

7.	Use the **Inherit from a Role** options to assign individual Rancher roles to your custom roles.

8.    Click **Create**.

## Locking/Unlocking Roles

If you want to prevent a role from being assigned to users, you can set it to a status of `locked`. For more information about what this status means, see [Locked Roles]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#locked-roles).

You can lock roles in two contexts:

- When you're [adding a custom role](#adding-a-custom-role).
- When you editing an existing role (see below).


1. From the **Global** view, select **Security** > **Roles**.

2. From the role that you want to lock (or unlock), select **Vertical Ellipsis (...)** > **Edit**.

3. From the **Locked** option, choose the **Yes** or **No** radio button. Then click **Save**.
