---
title: Adding Users to Clusters
weight: 2020
aliases:
  - /rancher/v2.0-v2.4/en/tasks/clusters/adding-managing-cluster-members/
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/cluster-members/
  - /rancher/v2.0-v2.4/en/cluster-admin/cluster-members
---

If you want to provide a user with access and permissions to _all_ projects, nodes, and resources within a cluster, assign the user a cluster membership.

>**Tip:** Want to provide a user with access to a _specific_ project within a cluster? See [Adding Project Members]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/projects-and-namespaces/project-members/) instead.

There are two contexts where you can add cluster members:

- Adding Members to a New Cluster

    You can add members to a cluster as you create it (recommended if possible).

- [Adding Members to an Existing Cluster](#editing-cluster-membership)

    You can always add members to a cluster after a cluster is provisioned.

## Editing Cluster Membership

Cluster administrators can edit the membership for a cluster, controlling which Rancher users can access the cluster and what features they can use.

1. From the **Global** view, open the cluster that you want to add members to.

2. From the main menu, select **Members**. Then click **Add Member**.

3. Search for the user or group that you want to add to the cluster.

 	If external authentication is configured:

	-  Rancher returns users from your [external authentication]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/) source as you type.

		>**Using AD but can't find your users?**
		>There may be an issue with your search attribute configuration. See [Configuring Active Directory Authentication: Step 5]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/ad/).

	- A drop-down allows you to add groups instead of individual users. The drop-down only lists groups that you, the logged in user, are part of.

		>**Note:** If you are logged in as a local user, external users do not display in your search results. For more information, see [External Authentication Configuration and Principal Users]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

4. Assign the user or group **Cluster** roles.  

	[What are Cluster Roles?]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/)

	>**Tip:** For Custom Roles, you can modify the list of individual roles available for assignment.
	>
	> - To add roles to the list, [Add a Custom Role]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/default-custom-roles/).
	> - To remove roles from the list, [Lock/Unlock Roles]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/locked-roles).

**Result:** The chosen users are added to the cluster.

- To revoke cluster membership, select the user and click **Delete**. This action deletes membership, not the user.
- To modify a user's roles in the cluster, delete them from the cluster, and then re-add them with modified roles.
