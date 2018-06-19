---
title: Adding Project Members
weight: 
---

If you want to provide a user with access and permissions to _specific_ projects and resources within a cluster, assign the user a project membership.

>**Tip:** Want to provide a user with access to _all_ projects within a cluster? See [Adding Cluster Members]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/adding-managing-cluster-members) instead.

There are two contexts where you can add project members:

- [Adding Members to a New Project]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/create-project)

    You can add members to a project as you create it (recommended if possible).

- [Adding Members to an Existing Project](#adding-members-to-an-existing-project)

	You can always add members to a project later. See below.

### Adding Members to an Existing project

Following project creation, you can add users as project members so that they can access its resources.

1. From the **Global** view, open the project that you want to add members to.

2. From the main menu, select **Members**. Then click **Add Member**.

3. Search for the user or group that you want to add to the project.

 	If external authentication is configured:
	
	-  Rancher returns users from your external authentication source as you type.  
	
	- A drop-down allows you to add groups instead of individual users. The dropdown only lists groups that you, the logged in user, are included in.

	>**Note:** If you are logged in as a local user, external users do not display in your search results.

1. Assign the user or group **Project** roles.  

	[What are Project Roles?]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#cluster-roles)

	>**Tip:** For Custom Roles, you can modify the list of individual roles available for assignment.
	>
	> - To add roles to the list, [Add a Custom Role]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/roles/#adding-a-custom-role).
	> - To remove roles from the list, [Lock/Unlock Roles]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/roles/#locking-unlocking-roles).

**Result:** The chosen users are added to the project.

- To revoke project membership, select the user and click **Delete**. This action deletes membership, not the user.
- To modify a user's roles in the project, delete them from the project, and then re-add them with modified roles.
