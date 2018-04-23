---
layout: single-docs
title: Roles
weight: 3100
---

# Roles

While _users_ determine who can log into Rancher, _roles_ determine which Kubernetes API endpoints and Rancher roles that a user can access after login. In other words, roles determine the user's _permissions_ when using Rancher.

## Adding A Custom Role

While Rancher comes out-of-the-box with a set of default user roles, you can also create custom roles to provide users with very specific permissions within Rancher.

1.	From the **Global** view, select **Security** > **Roles** from the main menu.

2.	Click **Add Role**.

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

7.	Click **Create**.
