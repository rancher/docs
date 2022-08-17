---
title: Pod Security Policies
weight: 5600
---

> These cluster options are only available for [clusters in which Rancher has launched Kubernetes]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/).  

You can always assign a pod security policy (PSP) to an existing project if you didn't assign one during creation.

### Prerequisites

- Create a Pod Security Policy within Rancher. Before you can assign a default PSP to an existing project, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/pod-security-policies/).
- Assign a default Pod Security Policy to the project's cluster. You can't assign a PSP to a project until one is already applied to the cluster. For more information, see [the documentation about adding a pod security policy to a cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/pod-security-policy). 

### Applying a Pod Security Policy

1. From the **Global** view, find the cluster containing the project you want to apply a PSP to.
1. From the main menu, select **Projects/Namespaces**.
1. Find the project that you want to add a PSP to. From that project, select **&#8942; > Edit**.
1. From the **Pod Security Policy** drop-down, select the PSP you want to apply to the project.
  Assigning a PSP to a project will:

  - Override the cluster's default PSP.
  - Apply the PSP to the project.
  - Apply the PSP to any namespaces you add to the project later.

1. Click **Save**.

**Result:** The PSP is applied to the project and any namespaces added to the project.

>**Note:** Any workloads that are already running in a cluster or project before a PSP is assigned will not be checked to determine if they comply with the PSP. Workloads would need to be cloned or upgraded to see if they pass the PSP.