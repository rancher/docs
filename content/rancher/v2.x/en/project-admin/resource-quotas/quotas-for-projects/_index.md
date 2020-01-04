---
title: How Resource Quotas Work in Rancher Projects
weight: 1
---

Resource quotas in Rancher include the same functionality as the [native version of Kubernetes](https://kubernetes.io/docs/concepts/policy/resource-quotas/). However, in Rancher, resource quotas have been extended so that you can apply them to [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#projects).

In a standard Kubernetes deployment, resource quotas are applied to individual namespaces. However, you cannot apply the quota to your namespaces simultaneously with a single action. Instead, the resource quota must be applied multiple times.

In the following diagram, a Kubernetes administrator is trying to enforce a resource quota without Rancher. The administrator wants to apply a resource quota that sets the same CPU and memory limit to every namespace in his cluster (`Namespace 1-4`) . However, in the base version of Kubernetes, each namespace requires a unique resource quota. The administrator has to create four different resource quotas that have the same specs configured (`Resource Quota 1-4`) and apply them individually.

<sup>Base Kubernetes: Unique Resource Quotas Being Applied to Each Namespace</sup>
![Native Kubernetes Resource Quota Implementation]({{< baseurl >}}/img/rancher/kubernetes-resource-quota.svg)

Resource quotas are a little different in Rancher. In Rancher, you apply a resource quota to the [project]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#projects), and then the quota propagates to each namespace, whereafter Kubernetes enforces your limits using the native version of resource quotas. If you want to change the quota for a specific namespace, you can [override it](#overriding-the-default-limit-for-a-namespace).

The resource quota includes two limits, which you set while creating or editing a project:
<a id="project-limits"></a>

- **Project Limits:**

    This set of values configures an overall resource limit for the project. If you try to add a new namespace to the project, Rancher uses the limits you've set to validate that the project has enough resources to accommodate the namespace.  In other words, if you try to move a namespace into a project near its resource quota, Rancher blocks you from moving the namespace.

- **Namespace Default Limits:**

    This value is the default resource limit available for each namespace. When the resource quota is set on the project level, this limit is automatically propagated to each namespace in the project. Each namespace is bound to this default limit unless you [override it](#namespace-default-limit-overrides).

In the following diagram, a Rancher administrator wants to apply a resource quota that sets the same CPU and memory limit for every namespace in their project (`Namespace 1-4`). However, in Rancher, the administrator can set a resource quota for the project (`Project Resource Quota`) rather than individual namespaces. This quota includes resource limits for both the entire project (`Project Limit`) and individual namespaces (`Namespace Default Limit`). Rancher then propagates the `Namespace Default Limit` quotas to each namespace (`Namespace Resource Quota`).

<sup>Rancher: Resource Quotas Propagating to Each Namespace</sup>
![Rancher Resource Quota Implementation]({{< baseurl >}}/img/rancher/rancher-resource-quota.svg)

The following table explains the key differences between the two quota types.

| Rancher Resource Quotas                                    | Kubernetes Resource Quotas                               |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| Applies to projects and namespace.                         | Applies to namespaces only.                              |
| Creates resource pool for all namespaces in project.       | Applies static resource limits to individual namespaces. |
| Applies resource quotas to namespaces through propagation. | Applies only to the assigned namespace.