---
title: Resource Quotas
weight: 2515
aliases:
  - /rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/resource-quotas/
---

_Available as of v2.1.0_

In situations where several teams share a cluster, one team may overconsume the resources available: CPU, memory, storage, services, Kubernetes objects like pods or secrets, and so on.  To prevent this overconsumption, you can apply a _resource quota_, which is a Rancher feature that limits the resources available to a project or namespace.

## Resource Quotas in Rancher

Resource quotas in Rancher include the same functionality as the [native version of Kubernetes](https://kubernetes.io/docs/concepts/policy/resource-quotas/). However, in Rancher, resource quotas have been extended so that you can apply them to [projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#projects).

In a standard Kubernetes deployment, resource quotas are applied to individual namespaces. However, you cannot apply the quota to your namespaces simultaneously with a single action. Instead, the resource quota must be applied multiple times.

In the following diagram, a Kubernetes admin is trying to enforce a resource quota without Rancher. The admin wants to apply a resource quota that sets the same CPU and memory limit to every namespace in his cluster (`Namespace 1-4`) . However, in the base version of Kubernetes, each namespace requires a unique resource quota. The admin has to create four different resource quotas that have the same specs configured (`Resource Quota 1-4`) and apply them individually.

<sup>Base Kubernetes: Unique Resource Quotas Being Applied to Each Namespace</sup>
![Native Kubernetes Resource Quota Implementation]({{< baseurl >}}/img/rancher/kubernetes-resource-quota.svg)

Resource quotas are a little different in Rancher. In Rancher, you apply a resource quota to the [project]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#projects), and then the quota propagates to each namespace, whereafter Kubernetes enforces you limits using the native version of resource quotas. If you want to change the quota for a specific namespace, you can [override it](#overriding-the-default-limit-for-a-namespace).

The resource quota includes two limits, which you set while creating or editing a project:
<a id="project-limits"></a>

- **Project Limits:**

    This set of values configures an overall resource limit for the project. If you try to add a new namespace to the project, Rancher uses the limits you've set to validate that the project has enough resources to accommodate the namespace.  In other words, if you try to move a namespace into a project near its resource quota, Rancher blocks you from moving the namespace.

- **Namespace Default Limits:**

    This value is the default resource limit available for each namespace. When the resource quota is set on the project level, this limit is automatically propagated to each namespace in the project. Each namespace is bound to this default limit unless you [override it](#namespace-default-limit-overrides).

In the following diagram, a Rancher admin wants to apply a resource quota that sets the same CPU and memory limit for every namespace in their project (`Namespace 1-4`). However, in Rancher, the admin can set a resource quota for the project (`Project Resource Quota`) rather than individual namespaces. This quota includes resource limits for both the entire project (`Project Limit`) and individual namespaces (`Namespace Default Limit`). Rancher then propagates the `Namespace Default Limit` quotas to each namespace (`Namespace Resource Quota`).

<sup>Rancher: Resource Quotas Propagating to Each Namespace</sup>
![Rancher Resource Quota Implementation]({{< baseurl >}}/img/rancher/rancher-resource-quota.svg)

The following table explains the key differences between the two quota types.

| Rancher Resource Quotas                                    | Kubernetes Resource Quotas                               |
| ---------------------------------------------------------- | -------------------------------------------------------- |
| Applies to projects and namespace.                         | Applies to namespaces only.                              |
| Creates resource pool for all namespaces in project.       | Applies static resource limits to individual namespaces. |
| Applies resource quotas to namespaces through propagation. | Applies only to the assigned namespace.


## Creating Resource Quotas

You can create resource quotas in the following contexts:

- [While creating projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#creating-projects)
- [While editing projects]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/editing-projects/#editing-resource-quotas)

## Resource Quota Types

When you create a resource quota, you are configuring the pool of resources available to the project. You can set the following resource limits for the following resource types.

| Resource Type            | Description                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU Limit*                | The maximum amount of CPU (in [millicores](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)) allocated to the project/namespace.<sup>1</sup> |
| CPU Reservation*         | The minimum amount of CPU (in millicores) guaranteed to the project/namespace.<sup>1</sup>                                                                                                        |
| Memory Limit*           | The maximum amount of memory (in bytes) allocated to the project/namespace.<sup>1</sup>                                                                                                           |
| Memory Reservation*       | The minimum amount of memory (in bytes) guaranteed to the project/namespace.<sup>1</sup>                                                                                                          |
| Storage Reservation      | The minimum amount of storage (in gigabytes) guaranteed to the project/namespace.                                                                                                                 |
| Services Load Balancers  | The maximum number of load balancers services that can exist in the project/namespace.                                                                                                            |
| Services Node Ports      | The maximum number of node port services that can exist in the project/namespace.                                                                                                                 |
| Pods                     | The maximum number of pods that can exist in the project/namespace in a non-terminal state (i.e., pods with a state of `.status.phase in (Failed, Succeeded)` equal to true).                     |
| Services                 | The maximum number of services that can exist in the project/namespace.                                                                                                                           |
| ConfigMaps               | The maximum number of ConfigMaps that can exist in the project/namespace.                                                                                                                         |
| Persistent Volume Claims | The maximum number of persistent volume claims that can exist in the project/namespace.                                                                                                           |
| Replications Controllers | The maximum number of replication controllers that can exist in the project/namespace.                                                                                                            |
| Secrets                  | The maximum number of secrets that can exist in the project/namespace.                                                                                                                            |

>**<sup>*</sup>** When setting resource quotas, if you set anything related to CPU or Memory (i.e. limits or reservations) on a project / namespace, all containers will require a respective CPU or Memory field set during creation. As of v2.2.0, a [container default resource limit](#setting-container-default-resource-limit) can be set at the same time to avoid the need to explicitly set these limits for every workload. See the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/#requests-vs-limits) for more details on why this is required.

## Overriding the Default Limit for a Namespace

Although the **Namespace Default Limit** propagates from the project to each namespace, in some cases, you may need to increase (or decrease) the performance for a specific namespace. In this situation, you can override the default limits by editing the namespace.

In the diagram below, the Rancher admin has a resource quota in effect for their project. However, the admin wants to override the namespace limits for `Namespace 3` so that it performs better. Therefore, the admin [raises the namespace limits]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#editing-namespace-resource-quotas) for `Namespace 3` so that the namespace can access more resources.

<sup>Namespace Default Limit Override</sup>
![Namespace Default Limit Override]({{< baseurl >}}/img/rancher/rancher-resource-quota-override.svg)

How to: [Editing Namespace Resource Quotas]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#editing-namespace-resource-quotas)

### Editing Namespace Resource Quotas

You can always override the namespace default limit to provide a specific namespace with access to more (or less) project resources.

For more information, see how to [edit namespace resource quotas]({{< baseurl >}}/rancher/v2.x/en/project-admin/namespaces/#editing-namespace-resource-quota/).

## Setting Container Default Resource Limit

_Available as of v2.2.0_

When setting resource quotas, if you set anything related to CPU or Memory (i.e. limits or reservations) on a project / namespace, all containers will require a respective CPU or Memory field set during creation. See the [Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/#requests-vs-limits) for more details on why this is required.

To avoid setting these limits on each and every container during workload creation, a default container resource limit can be specified on the namespace.

When the default container resource limit is set at a project level, the parameter will be propagated to any namespace created in the project after the limit has been set. For any existing namespace in a project, this limit will not be automatically propagated. You will need to manually set the default container resource limit for any existing namespaces in the project in order for it to be used when creating any containers.

> **Note:** Prior to v2.2.0, you could not launch catalog applications that did not have any limits set. With v2.2.0, you will be able to set a default container resource limit on a project and launch any catalog applications.  

Once a container default resource limit is configured on a namespace, the default will be pre-populated for any containers created in that namespace. These limits/reservations can always be overridden during workload creation.

| Resource Type            | Description                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU Limit                | The maximum amount of CPU (in [millicores](https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/#meaning-of-cpu)) allocated to the container.|
| CPU Reservation          | The minimum amount of CPU (in millicores) guaranteed to the container.                                                                                                       |
| Memory Limit             | The maximum amount of memory (in bytes) allocated to the container.                                                                                                          |
| Memory Reservation       | The minimum amount of memory (in bytes) guaranteed to the container.
