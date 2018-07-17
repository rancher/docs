---
title: Projects and Namespaces
weight: 3020
aliases:
  - /rancher/v2.x/en/concepts/projects/
---

_Projects_ are a new concept introduced by Rancher. They are not a native Kubernetes construct. A project captures a set of policies for a set of namespaces. A user can be assigned a specific role in a project. A role can be owner, member, read-only, or [custom]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/default-custom-roles/). Policies include Kubernetes Role-Based Access Control (RBAC) policies and pod security policies. Rancher 2.0 also implements a canned network policy that isolates containers in different projects. Future versions of Rancher will implement more flexible network policies.

## Authorization

Non-administrative users are only authorized for project access after an administrator explicitly adds them to the project's **Members** tab.

>**Exception:**
> Non-administrative users can access projects that they create themselves.

## Pod Security Policies

Rancher extends Kubernetes to allow the application of [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) at the project level in addition to the cluster level. However, as a best practice, we recommend applying Pod Security Policies at the cluster level.

## Namespaces

Kubernetes resources belong to specific namespaces. Rancher 2.0 relies on namespaces to isolate resources among users and apps. When the user deploys an app from the catalog, for example, he can choose to deploy that app into its own namespace, so that resource names in one app will not conflict with resource names in another. Namespaces must be globally unique. It is often difficult for users to pick unique namespace names. Rancher therefore encourages the pattern where users work with projects, and the system generates unique namespace names automatically.

For more information, see the [Kubernetes Namespaces Documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

## Creating Projects

1. From the **Global** view, choose **Clusters** from the main menu. From the **Clusters** page, open the cluster from which you want to create a project.

1. From the main menu, choose **Projects/Namespaces**. Then click **Add Project**.

1. Enter a **Project Name**.

1. **Optional:** Select a **Pod Security Policy**. Assigning a PSP to a project will:

  - Override the cluster's default PSP.
  - Apply the PSP to the project.
  - Apply the PSP to any namespaces you add to the project later.

    >**Note:** This option is only available if you've already created a Pod Security Policy. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/).

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

## Switching Projects

To switch between clusters, use the **Global** drop-down available in the main menu.

![Global Menu]({{< baseurl >}}/img/rancher/global-menu.png)

Alternatively, you can switch between projects and clusters using the main menu.

- To switch between clusters, open the **Global** view and select **Clusters** from the main menu. Then open a cluster.
- To switch between projects, open a cluster, and then select **Projects/Namespaces** from the main menu. Select the link for the project that you want to open.
