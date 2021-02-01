---
title: Adding a Pod Security Policy
weight: 80
---

> **Prerequisite:** The options below are available only for clusters that are [launched using RKE.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/) 

When your cluster is running pods with security-sensitive configurations, assign it a [pod security policy]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/pod-security-policies/), which is a set of rules that monitors the conditions and settings in your pods. If a pod doesn't meet the rules specified in your policy, the policy stops it from running.

You can assign a pod security policy when you provision a cluster. However, if you need to relax or restrict security for your pods later, you can update the policy while editing your cluster.

1. From the **Global** view, find the cluster to which you want to apply a pod security policy. Select **&#8942; > Edit**.

2. Expand **Cluster Options**.

3. From **Pod Security Policy Support**, select **Enabled**.

    >**Note:** This option is only available for clusters [provisioned by RKE]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/).

4. From the **Default Pod Security Policy** drop-down, select the policy you want to apply to the cluster.

	Rancher ships with [policies]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/pod-security-policies/#default-pod-security-policies) of `restricted` and `unrestricted`, although you can [create custom policies]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/pod-security-policies/#default-pod-security-policies) as well.

5. Click **Save**.

**Result:** The pod security policy is applied to the cluster and any projects within the cluster.

>**Note:** Workloads already running before assignment of a pod security policy are grandfathered in. Even if they don't meet your pod security policy, workloads running before assignment of the policy continue to run.
>
>To check if a running workload passes your pod security policy, clone or upgrade it.