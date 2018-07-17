---
title: Editing Clusters
weight: 3015
draft: true
---

## Increasing Number of nodes


## Adding a Pod Security Policy

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
