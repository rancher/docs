---
title: Assigning Pod Security Policies
weight: 2260
---

_Pod Security Policies_ are objects that control security-sensitive aspects of pod specification (like root privileges).

## Adding a Default Pod Security Policy

When you create a new cluster with RKE, you can configure it to apply a PSP immediately. As you create the cluster, use the **Cluster Options** to enable a PSP. The PSP assigned to the cluster will be the default PSP for projects within the cluster.

>**Prerequisite:**
>Create a Pod Security Policy within Rancher. Before you can assign a default PSP to a new cluster, you must have a PSP available for assignment. For instruction, see [Creating Pod Security Policies]({{<baseurl>}}/rancher/v2.5/en/admin-settings/pod-security-policies/).
>**Note:**
>For security purposes, we recommend assigning a PSP as you create your clusters.

To enable a default Pod Security Policy, set the **Pod Security Policy Support** option to  **Enabled**, and then make a selection from the **Default Pod Security Policy** drop-down.

When the cluster finishes provisioning, the PSP you selected is applied to all projects within the cluster.
