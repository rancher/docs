---
title: Custom Roles
weight: 1128
aliases:
    -/rancher/v2.x/en/tasks/global-configuration/roles/
---

Within Rancher, _roles_ determine what actions a user can make within a cluster or project.

Note that _roles_ are different from _permissions_, which determine what clusters and projects you can access.

>**Prerequisites:**
>
>To complete the tasks on this page, the following permissions are required:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/).
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Roles]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#global-permissions-reference) role assigned.

## Adding A Custom Role

While Rancher comes out-of-the-box with a set of default user roles, you can also create default custom roles to provide users with very specific permissions within Rancher.

1.    From the **Global** view, select **Security > Roles** from the main menu.

2.    Click **Add Role**.

3.	**Name** the role.

4.	Choose whether to set the role to a status of [locked]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/locked-roles/).

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
