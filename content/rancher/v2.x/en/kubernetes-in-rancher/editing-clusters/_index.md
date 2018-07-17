---
title: Editing Clusters
weight: 3015
draft: true
---

## Editing the Cluster Membership

Following cluster creation, you can add users as cluster members so that they can access its resources.

1. From the **Global** view, open the cluster that you want to add members to.

2. From the main menu, select **Members**. Then click **Add Member**.

3. Search for the user or group that you want to add to the cluster.

 	If external authentication is configured:

	-  Rancher returns users from your [external authentication]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/) source as you type.

		>**Using AD but can't find your users?**
		>There may be an issue with your search attribute configuration. See [Configuring Active Directory Authentication: Step 5]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/ad/).

	- A drop-down allows you to add groups instead of individual users. The drop-down only lists groups that you, the logged in user, are part of.

		>**Note:** If you are logged in as a local user, external users do not display in your search results. For more information, see [External Authentication Configuration and Principal Users]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/#external-authentication-configuration-and-principal-users).

4. Assign the user or group **Cluster** roles.  

	[What are Cluster Roles?]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/)

	>**Tip:** For Custom Roles, you can modify the list of individual roles available for assignment.
	>
	> - To add roles to the list, [Add a Custom Role]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/default-custom-roles/).
	> - To remove roles from the list, [Lock/Unlock Roles]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/locked-roles).

**Result:** The chosen users are added to the cluster.

- To revoke cluster membership, select the user and click **Delete**. This action deletes membership, not the user.
- To modify a user's roles in the cluster, delete them from the cluster, and then re-add them with modified roles.

## Cluster Options

>**Note:** These cluster options are only available for [clusters that Rancher has launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/).  

### Adding/Changing a Pod Security Policy

If you don't apply a PSP as you create your cluster, you can always add one later.

>**Prerequisite:**
>Create a Pod Security Policy within Rancher. Before you can assign a default PSP to an existing cluster, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/).

1. From the **Global** view, find the cluster that you want to apply your PSP to. Select **Vertical Ellipsis (...) > Edit** for the cluster you want to enable PSPs for.

2. Expand the **Cluster Options** accordion.

3. From **Pod Security Policy Support**, select **Enabled**.

    >**Note:** Not all cluster providers support PSPs, so this option may not be available.

    **Step Result:** The **Default Pod Security Policy** drop-down activates.

4. From **Default Pod Security Policy**, select the PSP you want to apply to the cluster.

5. Click **Save**.

**Result:** The PSP is applied to the cluster and any projects within the cluster.

>**Note:** Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked if it complies with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.

### Node pools

Changing the nodes in a RKE cluster
