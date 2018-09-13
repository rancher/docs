---
title: Project Quotas
weight: 5000
---
<<<<<<< HEAD
_Project quotas_ are a Rancher feature that limits the resources available to a project.
=======
When you are creating or editing a project, you can configure a _resource quotas_, which is a Rancher feature that limits the resources available to a project and the namespaces within it.
>>>>>>> 9cf3cfa... adding more content

In situations where several teams share a cluster, one team may overconsume the resources available. To prevent this overconsumption, you can apply a _project quota_, which creates a pool of resources that the project's namespaces can use, resources being things like data or processing power.

## Project Quotas vs. Resource Quotas

<<<<<<< HEAD
Project quotas, a feature exclusive to Rancher, work similarly to the Kubernetes feature, [Resource Quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/). The following table explains the key differences between the two quota types.
=======
Resource quotas in Rancher work similarly to how they do in the [native version of Kubernetes](https://kubernetes.io/docs/concepts/policy/resource-quotas/). However, Rancher's version of resource quotas have a few key differences from the Kubernetes version. 

In a standard Kubernetes deployment, resource quotas are applied to individual namespaces. However, you cannot apply the quota to multiple namespaces with a single action. Instead, the resource quota must be applied each namespace, which can be tedious. The following diagram depict resource quotas in a native Kubernetes deployment. Notice that:

- Resource quotas apply only to namespaces they are directly assigned to.
- Quotas are applied to individual namespaces, rather than collectively.

<sup>Native Kubernetes Resource Quota Implementation Example</sup>
![Native Kubernetes Resource Quota Implementation]({{< baseurl >}}/img/rancher/kubernetes-resource-quota.svg)

In Rancher's implementation of resource quotas, the quota is applied to a [project]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#projects) instead. The resource quota includes two limits:

- **Project Limits:**

    This set of values is the overall limit for the project. When the overall limit for the project is exceeded, Kubernetes uses logic to determine which namespaces to stop to get back under the quota.

- **Namespace Default Limits:**

    This value is the default resource limit that an individual namespace inherits from the project. If an individual namespace exceeds its namespace limit, Kubernetes stops anything objects in the namespace from operating.

    Each namespace inherits this default limit unless you [override it](#namespace-default-limit-overrides).

The following diagram depict resource quotas in a native Kubernetes deployment. Notice that:

- The resource quota is applied to the entire project.
- The project limit sets what resources are available for the entire project.
- Each namespace in the project inherits namespace default limit, which sets the cap for resources available for each individual namespace. You don't have to apply it to each namespace.

<sup>Rancher Resource Quota Implementation Example</sup>
![Rancher Resource Quota Implementation]({{< baseurl >}}/img/rancher/rancher-resource-quota.svg)
    
The following table explains the key differences between the two quota types.
>>>>>>> 9cf3cfa... adding more content


Project Quotas | Resource Quotas 
---------|----------
 Applied to projects. | Applied to namespaces. 
 Creates resource pool for all namespaces in project. | Applies static resource limits to individual namespaces. 
 Applies resource quotas to namespaces through inheritance. | Apply only to the assigned namespace.

## Project Quota Resource Pool

<<<<<<< HEAD
When you create a project quota, you are configuring the pool of resources available to the project. You can set limits on resources like:

- Memory
- CPU
- Storage
- Kubernetes Resources (i.e., Secrets)

>**Note:** In the quota, if you set CPU or Memory limit, all containers you create in the namespace must explicitly satisfy the quota. See the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/#requests-vs-limits) for more details.
=======
When you create a resource quota, you are configuring the pool of resources available to the project. You can set limits for a variety of different resources, for both your project and your namespaces.

>>>>>>> 9cf3cfa... adding more content

## Quota Templates

When a project quota is in effect, the project assigns each namespace a _quota template_, which is a profile that describes what resources are available to the namespace.

<<<<<<< HEAD
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
=======

### Namespace Default Limit Overrides

Although each namespace in a project inherits the **Namespace Default Limit**, you can also override this setting for specific namespaces that require additional (or fewer) resources.
>>>>>>> 9cf3cfa... adding more content
