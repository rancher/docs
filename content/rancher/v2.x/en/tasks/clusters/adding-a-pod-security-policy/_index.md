---
title: Adding a Pod Security Policy
weight: 3475
draft: true
---

_Pod Security Policies_ are objects that control security-sensitive aspects of pod specification (like root privileges).

You can add a Pod Security Policy (PSPs hereafter) in the following contexts:

- [When creating a cluster](#cluster-creation--adding-a-default-pod-security-policy)
- [When editing an existing cluster](#existing-cluster--adding-a-pod-security-policy)
- [When creating a project](#project-creation--adding-a-pod-security-policy)
- [When editing an existing project](#existing-project--adding-a-pod-security-policy)

> **Note:** We recommend adding PSPs during cluster and project creation instead of adding it to an existing one. 

For more information about PSPs, refer to [Pod Security Policy]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#pod-security-policies).

## Cluster Creation: Adding a Default Pod Security Policy

When you create a new cluster, you can configure it to apply a PSP immediately. As you create the cluster, use the **Cluster Options** to enable a PSP. The PSP assigned to the cluster will be the default PSP for projects within the cluster.

>**Prerequisite:**
>Create a Pod Security Policy within Rancher. Before you can assign a default PSP to a new cluster, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/).
>**Note:** 
>For security purposes, we recommend assiging a PSP as you create your clusters. 

To enable a default Pod Security Policy, set the **Pod Security Policy Support** option to  **Enabled**, and then make a selection from the **Default Pod Security Policy** drop-down.

When the cluster finishes provisioning, the PSP you selected is applied to all projects within the cluster.

For detailed instruction about assigning a PSP to a new cluster, see [Creating a Cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/).

## Existing Cluster: Adding a Pod Security Policy

If you don't apply a PSP as you create your cluster, you can always add one later.

>**Prerequisite:**
>Create a Pod Security Policy within Rancher. Before you can assign a default PSP to an existing cluster, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/).

1. From the from the **Global** view, find the cluster that you want apply your PSP to. Select **Vertical Ellipsis (...) > Edit** for the cluster you want to enable PSPs for.

2. Expand the **Cluster Options** accordion.

3. From **Pod Security Policy Support**, select **Enabled**.

    >**Note:** Not all cluster providers support PSPs, so this option may not be available.

    **Step Result:** The **Default Pod Security Policy** drop-down activates.

4. From **Default Pod Security Policy**, select the PSP you want to apply to the cluster.

5. Click **Save**.

**Result:** The PSP is applied to the cluster and any projects within the cluster.

>**Note:** Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked if it complies with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.

## Project Creation: Adding a Pod Security Policy

When you create a new project, you can assign a PSP directly to the project. Assigning a PSP to a project will:

- Override the cluster's default PSP.
- Apply the PSP to project.
- Apply the PSP to any namespaces you add to the project later.

>**Prerequisites:**
>- Create a Pod Security Policy within Rancher. Before you can assign a default PSP to a new project, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/).
>- Assign a default Pod Security Policy to the project's cluster. You can't assign a PSP to a project until one is already applied to the cluster. For more information, see [Existing Cluster: Adding a Pod Security Policy](#existing-cluster--adding-a-pod-security-policy).

As you create the project, make a selection from the **Pod Security Policy** drop-down to assign a PSP.

 <!--For more information, see [Creating a Project]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/#creating-a-project/-->

## Existing Project: Adding a Pod Security Policy

You can always assign a PSP to an existing project if you didn't assign one during creation.

>**Prerequisite:**
>Create a Pod Security Policy within Rancher. Before you can assign a default PSP to an existing project, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/).
>- Assign a default Pod Security Policy to the project's cluster. You can't assign a PSP to a project until one is already applied to the cluster. For more information, see [Existing Cluster: Adding a Pod Security Policy](#existing-cluster--adding-a-pod-security-policy).

1. From the navigation menu, browse to the cluster containing the project you want to apply a PSP to.

2. From the navigation menu, select **Projects/Namespaces**.

3. Find the project that you want to add a PSP to. From that project, select **Vertical Ellipsis (...) > Edit**.

4. From the **Pod Security Policy** drop-down, select the PSP you want to apply to the project.

5. Click **Save**.

**Result:** The PSP is applied to the project and any namespaces added to the project. 

>**Note:** Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked if it complies with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.
