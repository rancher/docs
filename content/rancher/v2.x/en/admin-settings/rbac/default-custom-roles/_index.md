---
title: Custom Roles
weight: 1128
aliases:
    - /rancher/v2.x/en/tasks/global-configuration/roles/
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

1.	**v2.0.7 and later only:** Select a tab to determine the scope of the roles you're adding. The tabs are:

	- **Cluster**

		The role is valid for assignment when adding/managing members to _only_ clusters.

	- **Project**

		The role is valid for assignment when adding/managing members to _only_ projects.

        >**Note:** You cannot edit the Global tab.

1.    Click **Add Cluster/Project Role**.

1.	**Name** the role.

1.	Choose whether to set the role to a status of [locked]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/locked-roles/).

	Locked roles cannot be assigned to users.

1.  **v2.0.7 and later only:** Choose a **Cluster/Project Creator Default** option setting. Use this option to set if the role is assigned to a user when they create a new cluster or project. Using this feature, you can expand or restrict the default roles for cluster/project creators.

    >**Note:** Out of the box, the Cluster Creator Default and the Project Creator Default roles are `Cluster Owner` and `Project Owner` respectively.

1.	**v2.0.6 and earlier only:** Assign the role a **Context**. Context determines the scope of role assigned to the user. The contexts are:

	- **All**

		The user can use their assigned role regardless of context. This role is valid for assignment when adding/managing members to clusters or projects.

	- **Cluster**

		This role is valid for assignment when adding/managing members to _only_ clusters.

	- **Project**

		This role is valid for assignment when adding/managing members to _only_ projects.

6.	Use the **Grant Resources** options to assign individual [Kubernetes API endpoints](https://kubernetes.io/docs/reference/) to the role.

    >**Note:** When viewing the resources associated with default roles created by Rancher, if there are multiple Kuberenetes API resources on one line item, the resource will have `(Custom)` appended to it. These are not custom resources but just an indication that there are multiple Kubernetes API resources as one resource.

	You can also choose the individual cURL methods (`Create`, `Delete`, `Get`, etc.) available for use with each endpoint you assign.

7.	Use the **Inherit from a Role** options to assign individual Rancher roles to your custom roles.

8.    Click **Create**.
