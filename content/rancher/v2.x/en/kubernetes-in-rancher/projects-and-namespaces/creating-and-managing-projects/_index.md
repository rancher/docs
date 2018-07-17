---
title: Creating and Managing Projects
weight: 3021
aliases:
  - /rancher/v2.x/en/tasks/projects/create-project/
---


1. From the **Global** view, choose **Clusters** from the main menu. From the **Clusters** page, open the cluster from which you want to create a project.

1. From the main menu, choose **Projects/Namespaces**. Then click **Add Project**.

1. Enter a **Project Name**.

1. **Optional:** Select a **Pod Security Policy**. Assigning a PSP to a project will:

  - Override the cluster's default PSP.
  - Apply the PSP to the project.
  - Apply the PSP to any namespaces you add to the project later.

    [What are Pod Security Policies?]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies)


    >**Note:** This option is only available if you've already created a Pod Security Policy. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/#creating-pod-security-policies).

1. **Recommended:** Add project members.

    Use the **Members** accordion to provide other users with project access and roles.

    By default, your user is added as the project `Owner`.

    1. Click **Add Member**.

    1. From the **Name** combo box, search for a user or group that you want to assign project access.

        >**Note:** You can only search for groups if external authentication is enabled.

    1. From the **Role** drop-down, choose a role.

        [What are Roles?]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/)

        >**Tip:** Choose Custom to create a custom role on the fly: [Custom Project Roles]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#custom-project-roles).

    1. To add more members, repeat substeps a—c.


1. Click **Create**.

**Result:** Your project is created. You can view it from the cluster's **Projects/Namespaces** view.

## Switching projects

To switch between clusters, use the **Global** drop-down available in the main menu.

![Global Menu]({{< baseurl >}}/img/rancher/global-menu.png)

Alternatively, you can switch between projects and clusters using the main menu.

- To switch between clusters, open the **Global** view and select **Clusters** from the main menu. Then open a cluster.
- To switch between projects, open a cluster, and then select **Projects/Namespaces** from the main menu. Select the link for the project that you want to open.


## Editing the Pod Security Policy

You can always assign a PSP to an existing project if you didn't assign one during creation.

>**Prerequisites:**
>
> - Create a Pod Security Policy within Rancher. Before you can assign a default PSP to an existing project, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/).
> - Assign a default Pod Security Policy to the project's cluster. You can't assign a PSP to a project until one is already applied to the cluster. For more information, see [Existing Cluster: Adding a Pod Security Policy](#existing-cluster--adding-a-pod-security-policy).

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
