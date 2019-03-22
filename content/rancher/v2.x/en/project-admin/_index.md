---
title: Project Administration
weight: 2500
---

_Projects_ are organizational objects introduced in Rancher that ease the administrative burden of your cluster. You can use projects to support multi-tenancy.

Projects provide an extra level of organization in your Kubernetes clusters beyond [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/). In terms of hierarchy:

- Clusters contain projects.
- Projects contain namespaces.

Within Rancher, projects allow you to manage multiple namespaces as a single entity. In the base version of Kubernetes, which does not include projects, features like role-based access rights or cluster resources are assigned to individual namespaces. In clusters where multiple namespaces require the same set of access rights, assigning these rights to each individual namespace can become tedious. Even though all namespaces require the same rights, there's no way to apply those rights to all of your namespaces in a single action. You'd have to repetitively assign these rights to each namespace!

Rancher projects resolve this issue by allowing you to apply resources and access rights at the project level. Each namespace in the project then inherits these resources and policies, so you only have to assign them to the project once, rather than assigning them to each namespace.

You can use projects to perform actions like:

- Assign users access to a group of namespaces (i.e., [project membership]({{< baseurl >}}/rancher/v2.x/en/project-admin/project-members)).
- Assign users specific roles in a project. A role can be owner, member, read-only, or [custom]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/default-custom-roles/).

### Authorization

Non-administrative users are only authorized for project access after an administrator, cluster owner or cluster member explicitly adds them to the project's **Members** tab.

>**Exception:**
> Non-administrative users can access projects that they create themselves.

## Switching between Projects

To switch between projects, use the drop-down available in the navigation bar.

Alternatively, you can switch between projects directly in the navigation bar. Open a cluster, and then select **Projects/Namespaces** from the main menu. Select the link for the project that you want to open.
