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

For more information about PSPs, refer to [Pod Security Policy]({{< baseurl >}}/rancher/v2.x/en/concepts/global-configuration/#pod-security-policies).

## Cluster Creation: Adding a Default Pod Security Policy

When you create a new cluster, you can configure it to apply a PSP immediately. As you create the cluster, use the **Cluster Options** to enable a PSP. We recommend applying a PSP to your cluster as soon as possible for security purposes.

>**Note:** To add a default PSP to a new cluster, you must already have a PSP created. For more information, see [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/).

To enable a default Pod Security Policy, set the **Pod Security Policy Support** option to  **Enabled**, and then make a selection from the **Default Pod Security Policy** drop-down.

When the cluster finishes provisioning, the PSP you selected is applied to all projects within the cluster. For more information, see [Creating a Cluster]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/creating-a-cluster/).

## Existing Cluster: Adding a Pod Security Policy

If you don't apply a PSP as you create your cluster, you can always add one later.

>**Prerequisite:** Create a PSP. For more information, see [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/).

1. From the from the **Global** view, find the cluster that you want apply your PSP to. Select **Vertical Ellipsis (...) > Edit**. Edit next to the _Cluster_ you want to enable PSPs for.

2. Expand the **Cluster Options** accordion.

3. From **Pod Security Policy Support**, select **Enabled**.

    >**Note:** Not all cloud providers support PSPs, so this option may not be available.

    **Step Result:** The **Default Pod Security Policy** drop-down activates.

4. From **Default Pod Security Policy**, select the PSP you want to apply to the cluster.

5. Click **Save**.

**Result:** The PSP is applied to the cluster and any projects within the cluster.

## Project Creation: Adding a Pod Security Policy

When you create a new project, you can assign a PSP directly to the project. Assigning a PSP to a project will:

- Apply the PSP to project.
- Apply the PSP to any namespaces you add to the project later.
- Override the cluster's default PSP.

As you create the project, make a selection from the **Pod Security Policy** drop-down to apply a PSP.

>**Note:** To add a PSP to a new project, you must already have a PSP created. For more information, see [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/).

After you create the project, the PSP you selected is applied to the project and any namespaces added to the project. <!--For more information, see [Creating a Project]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/#creating-a-project/-->

## Existing Project: Adding a Pod Security Policy

You can always assign a PSP to an existing project if you didn't assign one during creation.

>**Prerequisite:** Create a PSP. For more information, see [Adding Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/tasks/global-configuration/pod-security-policies/).

1. From the navigation menu, browse to the cluster containing the project you want to apply a PSP to.

2. From the navigation menu, select **Projects/Namespaces**.

3. Find the project that you want to add a PSP to. From that project, select **Vertical Ellipsis (...) > Edit**.

4. From the **Pod Security Policy** drop-down, select the PSP you want to apply to the project.

5. Click **Save**.

**Result:** The PSP is applied to the project and any namespaces added to the project.
