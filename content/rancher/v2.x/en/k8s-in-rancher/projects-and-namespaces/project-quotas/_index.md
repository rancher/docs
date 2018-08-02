---
title: Project Quotas
weight: 5000
---
_Project quotas_ are a Rancher feature that limits the resources available to a project.

In situations where several teams share a cluster, one team may overconsume the resources available. To prevent this overconsumption, you can apply a _project quota_, which creates a pool of resources that the project's namespaces can use, resources being things like data or processing power.

## Project Quotas vs. Resource Quotas

Project quotas, a feature exclusive to Rancher, work similarly to the Kubernetes feature, [Resource Quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/). The following table explains the key differences between the two quota types.


Project Quotas | Resource Quotas 
---------|----------
 Applied to projects. | Applied to namespaces. 
 Creates resource pool for all namespaces in project. | Applies static resource limits to individual namespaces. 
 Applies resource quotas to namespaces through inheritance. | Apply only to the assigned namespace.

## Project Quota Resource Pool

When you create a project quota, you are configuring the pool of resources available to the project. You can set limits on resources like:

- Memory
- CPU
- Storage
- Kubernetes Resources (i.e., Secrets)

>**Note:** In the quota, if you set CPU or Memory limit, all containers you create in the namespace must explicitly satisfy the quota. See the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/#requests-vs-limits) for more details.

## Quota Templates

When a project quota is in effect, the project assigns each namespace a _quota template_, which is a profile that describes what resources are available to the namespace.

When you create a project, you have the option of assigning each namespace one of three quota templates:

- **Small:** the namespace can access minimal resources.
- **Medium:** the namespace can access adequate resources.
- **Large:** the namespace can access performance resources.

When a project quota is in effect, each namespace must have a quota template assigned to it. You can assign quota templates one of two ways:

- **Inheritance**: Have Rancher apply a quota template automatically.
- **Direct assignment**: Apply the quota template yourself.

## Quota Inheritance

When setting up your project quota, you'll choose a default quota template for the project. Each namespace inherits this quota unless you assign it one directly, which overrides the default. We recommend assigning most quota templates this way.

>**Note:** When you apply a project quota, any resource quotas already applied to the project namespaces are replaced with the default quota template.

## Advantages of Project Quotas

Setting up project quotas instead of resource quotas has benefits:

- **Fewer Resource Quota Applications:** Instead of applying resource quotas to multiple namespaces, you can apply a single project quota to the entire project.
- **Resource Flexibility:** Quota templates allow you to quickly change the resources available for each namespace rather creating a resource quota from scratch.
- **Quota Template Inheritance:** Resource limits are automatically enforced when the namespace inherits a quote template from the project. Additionally, as new namespaces are created and deleted, the default quota template is automatically applied.
