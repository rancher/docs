---
title: Roles
weight: 3100
---
Within Rancher, _roles_ determine what actions a user can make within a cluster or project.

Note that _roles_ are different from _permissions_, which determine what clusters and projects you can access.

>**Prerequisites:**
>
>To complete the tasks on this page, the following permissions are required:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#global-permissions).
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#custom-global-permissions) with the [Manage Roles]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#global-permissions-reference) role assigned.

## Adding A Custom Role

While Rancher comes out-of-the-box with a set of default user roles, you can also create custom roles to provide users with very specific permissions within Rancher.

1.    From the **Global** view, select **Security** > **Roles** from the main menu.

2.    Click **Add Role**.

3.	**Name** the role.

4.	Assign the role a **Context**. Context determines the scope of permissions assigned to the user. The contexts are:

	- **All**

		The user can use their assigned permissions regardless of context. The user's permissions are valid in all clusters and projects.

	- **Cluster**

		The user can use their assigned permissions within a selected cluster.

	- **Project**

		The user can use their assigned permissions within a selected project.

5.	Use the **Grant Resources** options to assign individual [Kubernetes API endpoints](https://kubernetes.io/docs/reference/) to the role.

	You can also choose the individual cURL methods (`Create`, `Delete`, `Get`, etc.) available for use with each endpoint you assign.

6.	Use the **Inherit from a Role** options to assign individual Rancher roles to your custom roles.

7.    Click **Create**.


Locking/Unlocking Roles 

When creating a role , "Locked" field is preselected to "No" which means the role is unlocked and is available to be assigned to users.

Users can choose to lock roles by choosing "Yes" for "Locked" field when creating Roles. When roles are locked , they will be not be available in the 
set of roles that can be assigned to users. 

Existing roles can also be locked/unlocked by editing the role and setting the locked field to "Yes/No".

