---
title: Editing Projects
weight: 3021
aliases:
  - /rancher/v2.x/en/tasks/projects/create-project/
---

After projects are created, there are certain aspects that can be changed later.

## Adding Members

Following project creation, you can add users as project members so that they can access its resources.

>**Ping Identity Provider Caveats:**
>
>- IdP does not support search or lookup. When adding users to projects, the exact IDs must be entered correctly.
>- When adding users to a project, group IDs are not supported unless the admin who turned on access control is a member of the group.

1. From the **Global** view, open the project that you want to add members to.

2. From the main menu, select **Members**. Then click **Add Member**.

3. Search for the user or group that you want to add to the project.

 	If external authentication is configured:

	-  Rancher returns users from your external authentication source as you type.  

	- A drop-down allows you to add groups instead of individual users. The dropdown only lists groups that you, the logged in user, are included in.

	>**Note:** If you are logged in as a local user, external users do not display in your search results.

1. Assign the user or group **Project** roles.  

	[What are Project Roles?]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/)

	>**Tip:** For Custom Roles, you can modify the list of individual roles available for assignment.
	>
	> - To add roles to the list, [Add a Custom Role]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/default-custom-roles).
	> - To remove roles from the list, [Lock/Unlock Roles]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/locked-roles/).

**Result:** The chosen users are added to the project.

- To revoke project membership, select the user and click **Delete**. This action deletes membership, not the user.
- To modify a user's roles in the project, delete them from the project, and then re-add them with modified roles.

## Editing the Pod Security Policy

>**Note:** These cluster options are only available for [clusters that Rancher has launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/).  

You can always assign a PSP to an existing project if you didn't assign one during creation.

>**Prerequisites:**
>
> - Create a Pod Security Policy within Rancher. Before you can assign a default PSP to an existing project, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/).
> - Assign a default Pod Security Policy to the project's cluster. You can't assign a PSP to a project until one is already applied to the cluster. For more information, see [Existing Cluster: Adding a Pod Security Policy]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters/#adding-changing-a-pod-security-policy).

1. From the **Global** view, find the cluster containing the project you want to apply a PSP to.

1. From the main menu, select **Projects/Namespaces**.

3. Find the project that you want to add a PSP to. From that project, select **Vertical Ellipsis (...) > Edit**.

4. From the **Pod Security Policy** drop-down, select the PSP you want to apply to the project.
  Assigning a PSP to a project will:

  - Override the cluster's default PSP.
  - Apply the PSP to the project.
  - Apply the PSP to any namespaces you add to the project later.

  >**Prerequisites:**
  >
  > - Create a Pod Security Policy within Rancher. Before you can assign a default PSP to a new project, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/).
  > - Assign a default Pod Security Policy to the project's cluster. You can't assign a PSP to a project until one is already applied to the cluster.

5. Click **Save**.

**Result:** The PSP is applied to the project and any namespaces added to the project.

>**Note:** Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked if it complies with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.
