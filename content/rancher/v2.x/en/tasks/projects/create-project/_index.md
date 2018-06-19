---
title: Creating Projects
weight: 
---

1. From the **Global** view, choose **Clusters** from the main menu. From the **Clusters** page, open the cluster from which you want to create a project.

1. From the main menu, choose **Projects/Namespaces**. Then click **Add Project**.

1. Enter a **Project Name**.

1. **Optional:** Select a **Pod Security Policy**.

    [What are Pod Security Policies?]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/pod-security-policies)

    >**Note:** This option is only available if you've already created a Pod Security Policy. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/#creating-pod-security-policies).

1. **Recommended:** Add project members.

    Use the **Members** accordion to provide other users with project access and roles.

    By default, your user is added as the project `Owner`.

    1. Click **Add Member**.

    1. From the **Name** combo box, search for a user or group that you want to assign project access.

        >**Note:** You can only search for groups if external authentication is enabled.

    1. From the **Role** drop-down, choose a role.

        [What are Roles?]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#cluster-and-project-roles)

        >**Tip:** Choose Custom to create a custom role on the fly: [Custom Project Roles]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/users-permissions-roles/#custom-project-roles).

    1. To add more members, repeat substeps a—c.
  

1. Click **Create**.

**Result:** Your project is created. You can view it from the cluster's **Projects/Namespaces** view.