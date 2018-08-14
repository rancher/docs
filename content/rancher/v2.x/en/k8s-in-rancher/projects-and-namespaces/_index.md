---
title: Projects and Namespaces
weight: 3020
aliases:
  - /rancher/v2.x/en/concepts/projects/
  - /rancher/v2.x/en/tasks/projects/
  - /rancher/v2.x/en/tasks/projects/create-project/
---

## Projects

To support multi-tenancy on a cluster, create different [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/). Projects allow you to group several [namespaces]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#namespaces) into a single object. You can set user access and pod security policies for each project, which allows groups of users to access different sets of namespaces while using the same cluster. Projects are a feature available in Rancher, but not the base version of Kubernetes.

You can use projects to perform actions like:

- Assigning users to access to a group of namespaces (i.e., [project membership]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/project-members))
- Assigning users specific roles in a project. A role can be owner, member, read-only, or [custom]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/default-custom-roles/). Policies include Kubernetes Role-Based Access Control (RBAC) policies.
- Assigning Pod Security Policies.

When you create a cluster, two project are automatically created within it:

- [Default Project](#default-project)
- [System Project](#system-project) 


### Default Project

When you provision a cluster, it automatically creates a `default` project for the cluster. This is a project you can use to get started with your cluster, but you can always delete it and replace it with projects that have more descriptive names.

### System Project

_available as of v2.0.7_

When troubleshooting, you can view the `system` project to check if important namespaces in the Kubernetes system are working properly. This easily accessible project saves you from troubleshooting individual system namespace containers.

To open it, open the **Global** menu, and then select the `system` project for your cluster. 

The `system` project:

- Is automatically created when you provision a cluster.
- Lists all namespaces that exist in `v3/settings/system-namespaces`, if they exist.
- Allows you to add more namespaces or move its namespaces to other projects.
- Cannot be deleted because it's required for cluster operations.

>**Note:** In clusters where both:
>
> - The [Canal network plug-in]({{< baseurl >}}\rancher\v2.x\en\cluster-provisioning\rke-clusters\options\#canal) is in use.
> - The Project Network Isolation option is enabled.
>
>The `system` project overrides the Project Network Isolation option so that it can communicate with other projects, collect logs, and check health. 

### Authorization

Non-administrative users are only authorized for project access after an administrator explicitly adds them to the project's **Members** tab.

>**Exception:**
> Non-administrative users can access projects that they create themselves.

### Pod Security Policies

Rancher extends Kubernetes to allow the application of [Pod Security Policies](https://kubernetes.io/docs/concepts/policy/pod-security-policy/) at the project level in addition to the cluster level. However, as a best practice, we recommend applying Pod Security Policies at the cluster level.

### Creating Projects

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

## Switching Clusters/Projects

To switch between clusters and projects, use the **Global** drop-down available in the main menu.

![Global Menu]({{< baseurl >}}/img/rancher/global-menu.png)

Alternatively, you can switch between projects and clusters using the main menu.

- To switch between clusters, open the **Global** view and select **Clusters** from the main menu. Then open a cluster.
- To switch between projects, open a cluster, and then select **Projects/Namespaces** from the main menu. Select the link for the project that you want to open.

## Namespaces

Kubernetes resources belong to specific [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/), which are virtual clusters backed by a physical cluster. Rancher 2.0 uses namespaces as objects that:

- Isolate users and apps within a cluster that is shared among other teams and apps. When a user deploys an app from the catalog, for example, they can deploy that app into its own namespace, so that resource names in one app will not conflict with resource names in another.

- Provide a unique name for an application. Namespaces must be globally unique. It is often difficult for users to pick unique namespace names. Rancher therefore encourages the pattern where users work with projects, and the system generates unique namespace names automatically.

- Divide hardware resources between multiple resources. Using [resource quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/), you can limit the vCPU and memory that each namespace can access so that performance is evenly distributed among the cluster.

For more information, see the [Kubernetes Namespaces Documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/).

### Creating Namespaces

Create a new namespace to isolate users and apps in a project.

Depending on your role within Rancher and your organization, the context in which you create a namespace changes. Expand one of the sections below based on your role in Rancher.

- If you're a cluster owner/member, you'll create namespaces in context of your cluster. Follow For **Cluster Owners/Members**.
- If you're a project owner/member, you'll create namespaces in the context of your project. Follow **For Project Owners/Members**.

>**Tip:** When working with project resources that you can assign to a namespace (i.e., [workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/deploy-workloads/), [certificates]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/certificates/), [ConfigMaps]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/configmaps), etc.) you can create a namespace on the fly.

{{% accordion id="cluster" label="For Cluster Owners/Members" %}}
1. From the **Global** view, open the cluster that you want to add a namespace to.

1. From the main menu, select **Projects/Namespaces**.

1. Find the project that you want to add the namespace to. Then click the corresponding **Add Namespace** button.

1. Enter a **Name** for the namespace. Then select the **Project** to which you want to add the namespace.

{{% /accordion %}}
{{% accordion id="project" label="For Project Owners/Members" %}}
1. From the **Global** view, open the project where you want to create a namespace.

1. From the main menu, select **Namespace**. The click **Add Namespace**.

1. Enter a **Name** and then click **Create**.

{{% /accordion %}}

**Result:** Your namespace is added to the project. You can begin assigning cluster resources to the namespace.

### Moving Namespaces to Another Project

Cluster admins and members may occasionally need to move a namespace to another project, such as when a project runs out of hardware resources to support all of its existing namespaces.

1. From the **Global** view, open the cluster that contains the namespace you want to move.

1. From the main menu, select **Projects/Namespaces**.

1. Select the namespace(s) that you want to move to a different project. Then click **Move**. You can move multiple namespaces at one.

1. Choose a new project for the new namespace and then click **Move**. Alternatively, you can remove the namespace from all projects by selecting **None**.

**Result:** Your namespace is moved to a different project (or is unattached from all projects). If any project resources are attached to the namespace, the namespace releases them and then attached resources from the new project. 
