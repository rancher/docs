---
title: Overriding the Default Limit for a Namespace
weight: 2
---

Although the **Namespace Default Limit** propagates from the project to each namespace when created, in some cases, you may need to increase (or decrease) the quotas for a specific namespace. In this situation, you can override the default limits by editing the namespace.

In the diagram below, the Rancher administrator has a resource quota in effect for their project. However, the administrator wants to override the namespace limits for `Namespace 3` so that it has more resources available. Therefore, the administrator [raises the namespace limits]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/projects-and-namespaces/) for `Namespace 3` so that the namespace can access more resources.

<sup>Namespace Default Limit Override</sup>
![Namespace Default Limit Override]({{<baseurl>}}/img/rancher/rancher-resource-quota-override.svg)

How to: [Editing Namespace Resource Quotas]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/projects-and-namespaces/)

### Editing Namespace Resource Quotas

If there is a resource quota configured for a project, you can override the namespace default limit to provide a specific namespace with access to more (or less) project resources.

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to edit a namespace resource quota and click **Explore**.
1. Click **Cluster > Projects/Namespaces**.
1. Find the namespace for which you want to edit the resource quota. Click **⋮ > Edit Config**.
1. Edit the resource limits.  These limits determine the resources available to the namespace. The limits must be set within the configured project limits.

    For more information about each **Resource Type**, see [the type reference]({{<baseurl>}}/rancher/v2.6/en/project-admin/resource-quotas/quota-type-reference/).

    >**Note:**
    >
    >- If a resource quota is not configured for the project, these options will not be available.
    >- If you enter limits that exceed the configured project limits, Rancher will not let you save your edits.

**Result:** Your override is applied to the namespace's resource quota.
