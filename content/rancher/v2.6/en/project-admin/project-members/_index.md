---
title: Adding Users to Projects
weight: 2505
---

If you want to provide a user with access and permissions to _specific_ projects and resources within a cluster, assign the user a project membership.

You can add members to a project as it is created, or add them to an existing project.

>**Tip:** Want to provide a user with access to _all_ projects within a cluster? See [Adding Cluster Members]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/cluster-project-roles/) instead.

### Adding Members to a New Project

You can add members to a project as you create it (recommended if possible). For details on creating a new project, refer to the [cluster administration section.]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/projects-and-namespaces/)

### Adding Members to an Existing Project

Following project creation, you can add users as project members so that they can access its resources.

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to add members to a project and click **Explore**.
1. Click **Cluster > Projects/Namespaces**.
1. Go to the project where you want to add members and click **⋮ > Edit Config**.
1. In the **Members** tab, click **Add**.
1. Search for the user or group that you want to add to the project.

 	If external authentication is configured:

	-  Rancher returns users from your external authentication source as you type.  

	- A drop-down allows you to add groups instead of individual users. The dropdown only lists groups that you, the logged in user, are included in.

	>**Note:** If you are logged in as a local user, external users do not display in your search results.

1. Assign the user or group **Project** roles.  

	[What are Project Roles?]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/cluster-project-roles/)

    >**Notes:**
    >
    >- Users assigned the `Owner` or `Member` role for a project automatically inherit the `namespace creation` role. However, this role is a [Kubernetes ClusterRole](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole), meaning its scope extends to all projects in the cluster. Therefore, users explicitly assigned the `Owner` or `Member` role for a project can create namespaces in other projects they're assigned to, even with only the `Read Only` role assigned.
    >
    >- For `Custom` roles, you can modify the list of individual roles available for assignment.
    >
    >    - To add roles to the list, [Add a Custom Role]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/default-custom-roles).
    >    - To remove roles from the list, [Lock/Unlock Roles]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/locked-roles/).

**Result:** The chosen users are added to the project.

- To revoke project membership, select the user and click **Delete**. This action deletes membership, not the user.
- To modify a user's roles in the project, delete them from the project, and then re-add them with modified roles.