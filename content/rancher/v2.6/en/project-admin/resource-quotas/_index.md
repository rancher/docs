---
title: Project Resource Quotas
weight: 2515
aliases:
  - /rancher/v2.5/en/k8s-in-rancher/projects-and-namespaces/resource-quotas 
---

In situations where several teams share a cluster, one team may overconsume the resources available: CPU, memory, storage, services, Kubernetes objects like pods or secrets, and so on.  To prevent this overconsumption, you can apply a _resource quota_, which is a Rancher feature that limits the resources available to a project or namespace.

This page is a how-to guide for creating resource quotas in existing projects.

Resource quotas can also be set when a new project is created. For details, refer to the section on [creating new projects.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/projects-and-namespaces/#creating-projects)

Resource quotas in Rancher include the same functionality as the [native version of Kubernetes](https://kubernetes.io/docs/concepts/policy/resource-quotas/). In Rancher, resource quotas have been extended so that you can apply them to projects. For details on how resource quotas work with projects in Rancher, refer to [this page.](./quotas-for-projects)

### Applying Resource Quotas to Existing Projects

Edit [resource quotas]({{<baseurl>}}/rancher/v2.5/en/k8s-in-rancher/projects-and-namespaces/resource-quotas) when:

- You want to limit the resources that a project and its namespaces can use.
- You want to scale the resources available to a project up or down when a research quota is already in effect.

1. From the **Global** view, open the cluster containing the project to which you want to apply a resource quota.

1. From the main menu, select **Projects/Namespaces**.

1. Find the project that you want to add a resource quota to. From that project, select **&#8942; > Edit**.

1. Expand **Resource Quotas** and click **Add Quota**. Alternatively, you can edit existing quotas.

1. Select a Resource Type. For more information on types, see the [quota type reference.](./quota-type-reference)

1. Enter values for the **Project Limit** and the **Namespace Default Limit**.

    | Field                   | Description                                                                                              |
    | ----------------------- | -------------------------------------------------------------------------------------------------------- |
    | Project Limit           | The overall resource limit for the project.                                                              |
    | Namespace Default Limit | The default resource limit available for each namespace. This limit is propagated to each namespace in the project. The combined limit of all project namespaces shouldn't exceed the project limit. |

1. **Optional:** Add more quotas.

1. Click **Create**.

**Result:** The resource quota is applied to your project and namespaces. When you add more namespaces in the future, Rancher validates that the project can accommodate the namespace. If the project can't allocate the resources, Rancher won't let you save your changes.
