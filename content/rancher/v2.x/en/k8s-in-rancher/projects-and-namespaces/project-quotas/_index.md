---
title: Project Quotas
weight: 5000
draft: true
---

_Available as of v2.1.0_

When you are creating or editing a project, you can configure a _resource quotas_, which is a Rancher feature that limits the resources available to a project and the namespaces within it.

In situations where several teams share a cluster, one team may overconsume the resources available. To prevent this overconsumption, you can apply a _project quota_, which creates a pool of resources that the project's namespaces can use, resources being things like data or processing power.

## Rancher Resource Quotas vs. Native Kubernetes Resource Quotas

Resource quotas in Rancher work similarly to how they do in the [native version of Kubernetes](https://kubernetes.io/docs/concepts/policy/resource-quotas/). However, Rancher's version of resource quotas have a few key differences from the Kubernetes version. 

In a standard Kubernetes deployment, resource quotas are applied to individual namespaces. However, you cannot apply the quota to multiple namespaces with a single action. Instead, the resource quota must be applied each namespace, which can be tedious. The following diagram depict resource quotas in a native Kubernetes deployment. Notice that:

- Resource quotas apply only to namespaces they are directly assigned to.
- Quotas are applied to individual namespaces, rather than collectively. Even though each quota sets the same limits, a unique quota is applied to each namespace.

![Native Kubernetes Resource Quota Implementation]({{< baseurl >}}/img/rancher/kubernetes-resource-quota.svg)
<sup>Native Kubernetes Resource Quota Implementation Example</sup>


In Rancher's implementation of resource quotas, the quota is applied to a [project]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#projects) instead. The resource quota includes two limits:

- **Project Limits:**

    This set of values is the overall limit for the project. When the overall limit for the project is exceeded, Kubernetes uses logic to determine which namespaces to stop to get back under the quota.

- **Namespace Default Limits:**

    This value is the default resource limit that an individual namespace inherits from the project. If an individual namespace exceeds its namespace limit, Kubernetes stops anything objects in the namespace from operating.

    Each namespace inherits this default limit unless you [override it](#namespace-default-limit-overrides).

The following diagram depict resource quotas in a native Kubernetes deployment. Notice that:

- The resource quota is applied to the entire project.
- The project limit sets what resources are available for the entire project.
- Each namespace in the project inherits the namespace default limit, which sets the cap for resources available for each individual namespace. The same namespace default limit is automatically applied to each namespace.

![Rancher Resource Quota Implementation]({{< baseurl >}}/img/rancher/rancher-resource-quota.svg)
<sup>Rancher Resource Quota Implementation Example</sup>

    
The following table explains the key differences between the two quota types.

Rancher Resource Quotas | Native Kubernetes Resource Quotas 
---------|----------
 Applied to projects. | Applied to namespaces. 
 Applies resource limits to the project and all its namespaces. | Applies resource limits to individual namespaces. 
 Applies resource quotas to namespaces through inheritance. | Apply only to the assigned namespace.

## Resource Quota Types

When you create a resource quota, you are configuring the pool of resources available to the project. You can set limits for a variety of different resources, for both your project and your namespaces.

### Namespace Default Limit Overrides

Although each namespace in a project inherits the **Namespace Default Limit**, you can also override this setting for specific namespaces that require additional (or fewer) resources.
