---
title: Namespaces
weight: 2520
---

Within Rancher, you can further divide projects into different [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/), which are virtual clusters within a project backed by a physical cluster. Should you require another level of organization beyond projects and the `default` namespace, you can use multiple namespaces to isolate applications and resources.

Although you assign resources at the project level so that each namespace in the project can use them, you can override this inheritance by assigning resources explicitly to a namespace.

Resources that you can assign directly to namespaces include:

- [Workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/)
- [Load Balancers/Ingress]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/load-balancers-and-ingress/)
- [Service Discovery Records]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/service-discovery/)
- [Persistent Volume Claims]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/persistent-volume-claims/)
- [Certificates]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/certificates/)
- [ConfigMaps]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/configmaps/)
- [Registries]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/registries/)
- [Secrets]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/secrets/)

>**Note:** Although you can assign role-based access to namespaces in the base version of Kubernetes, you cannot assign roles to namespaces in Rancher. Instead, assign role-based access at the project level.

### Creating Namespaces

Create a new namespace to isolate apps and resources in a project.

>**Tip:** When working with project resources that you can assign to a namespace (i.e., [workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/deploy-workloads/), [certificates]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/certificates/), [ConfigMaps]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/configmaps), etc.) you can create a namespace on the fly.

1. From the **Global** view, open the project where you want to create a namespace.

    >**Tip:** As a best practice, we recommend creating namespaces from the project level. However, cluster owners and members can can create them from the cluster level as well.

1. From the main menu, select **Namespace**. The click **Add Namespace**.

1. **Optional:** If your project has [Resource Quotas]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/resource-quotas) in effect, you can override the default resource **Limits** (which places a cap on the resources that the namespace can consume).  

1. Enter a **Name** and then click **Create**.

**Result:** Your namespace is added to the project. You can begin assigning cluster resources to the namespace.

### Moving Namespaces to Another Project

Cluster admins and members may occasionally need to move a namespace to another project, such as when you want a different team to start using the application.

1. From the **Global** view, open the cluster that contains the namespace you want to move.

1. From the main menu, select **Projects/Namespaces**.

1. Select the namespace(s) that you want to move to a different project. Then click **Move**. You can move multiple namespaces at one.

    >**Notes:**
    >
    >- Don't move the namespaces in the `System` project. Moving these namespaces can adversely affect cluster networking.
    >- You cannot move a namespace into a project that already has a [resource quota]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/resource-quotas/) configured.
    >- If you move a namespace from a project that has a quota set to a project with no quota set, the quota is removed from the namespace.

1. Choose a new project for the new namespace and then click **Move**. Alternatively, you can remove the namespace from all projects by selecting **None**.

**Result:** Your namespace is moved to a different project (or is unattached from all projects). If any project resources are attached to the namespace, the namespace releases them and then attached resources from the new project.

### Editing Namespace Resource Quotas

If there is a [resource quota]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/resource-quotas) configured for a project, you can override the namespace default limit to provide a specific namespace with access to more (or less) project resources.

1. From the **Global** view, open the cluster that contains the namespace for which you want to edit the resource quota.

1. From the main menu, select **Projects/Namespaces**.

1. Find the namespace for which you want to edit the resource quota. Select **Ellipsis (...) > Edit**.

1. Edit the Resource Quota **Limits**.  These limits determine the resources available to the namespace. The limits must be set within the configured project limits.

    For more information about each **Resource Type**, see [Resource Quota Types]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/resource-quotas/#resource-quota-types).

    >**Note:**
    >
    >- If a resource quota is not configured for the project, these options will not be available.
    >- If you enter limits that exceed the configured project limits, Rancher will not let you save your edits.

**Result:** The namespace's default resource quota is overwritten with your override.
