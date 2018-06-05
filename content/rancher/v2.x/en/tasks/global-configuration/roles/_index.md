---
title: Roles
weight: 3100
---
While _users_ determine who can log into Rancher, _roles_ determine which Kubernetes API endpoints and Rancher roles that a user can access after login. In other words, roles determine the user's _permissions_ when using Rancher.

## Adding A Custom Role

**Prerequisites:** 

Admin users have the ability to create custom roles. Standard Users do not have the ability to create custom roles. 
Users need to be created with global permission "Manage Roles" enabled to have the ability to create custom roles.


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

