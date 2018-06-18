---
title: Adding Cluster Members
weight: 3525
---

Before a user can access a cluster and its resources, the cluster owner must explicitly assign that user a cluster _membership_ (or a project membership, which is out of scope for this topic). Assigning a user membership to a cluster provides them with access to and roles within the cluster.

<!-- TODO: add link to project membership after the topic is created-->

There are two contexts where you can add cluster members:

- [Adding Members to a New Cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster)

    You can add members to a cluster as you create it (recommended if possible).

- [Adding Members to an Existing Cluster](#adding-members-to-an-existing-cluster)

    You can always add members to a cluster later. See below.

### Adding Members to an Existing Cluster

Following cluster creation, you can add users as cluster members so that they can access its resources.

1. From the **Global** view, open the cluster that you want to add members to.

2. From the main menu, select **Members**. Then click **Add Member**.

3. Search for the user or group that you want to add to the cluster.

 	If external authentication is configured:
	
	-  Rancher returns users from your [external authentication]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/authentication/) source as you type.

		>**Using AD but can't find your users?**
		>There may be an issue with your search attribute configuration. See [Configuring Active Directory Authentication: Step 5]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/authentication/active-directory/).
	
	- A drop-down allows you to add groups instead of individual users. The drop-down only lists groups that you, the logged in user, are part of.

		>**Note:** If you are logged in as a local user, external users do not display in your search results. For more information, see [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/authentication/#external-authentication-configuration-and-principal-users).

4. Assign the user or group **Cluster** roles.  

	[What are Cluster Roles?]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#cluster-roles)

	>**Tip:** For Custom Roles, you can modify the list of individual roles available for assignment.
	>
	> - To add roles to the list, [Add a Custom Role]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/roles/#adding-a-custom-role).
	> - To remove roles from the list, [Lock/Unlock Roles]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/roles/#locking-unlocking-roles).

**Result:** The chosen users are added to the cluster. 

- To revoke cluster membership, select the user and click **Delete**. This action deletes membership, not the user.
- To modify a user's roles in the cluster, delete them from the cluster, and then re-add them with modified roles.