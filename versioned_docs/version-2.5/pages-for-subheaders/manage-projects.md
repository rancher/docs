---
title: Project Administration
weight: 9
aliases:
  - /rancher/v2.5/en/project-admin/editing-projects/
  - /rancher/v2.x/en/project-admin/
---

_Projects_ are objects introduced in Rancher that help organize namespaces in your Kubernetes cluster. You can use projects to create multi-tenant clusters, which allows a group of users to share the same underlying resources without interacting with each other's applications.

In terms of hierarchy:

- Clusters contain projects
- Projects contain namespaces

Within Rancher, projects allow you to manage multiple namespaces as a single entity. In native Kubernetes, which does not include projects, features like role-based access rights or cluster resources are assigned to individual namespaces. In clusters where multiple namespaces require the same set of access rights, assigning these rights to each individual namespace can become tedious. Even though all namespaces require the same rights, there's no way to apply those rights to all of your namespaces in a single action. You'd have to repetitively assign these rights to each namespace!

Rancher projects resolve this issue by allowing you to apply resources and access rights at the project level. Each namespace in the project then inherits these resources and policies, so you only have to assign them to the project once, rather than assigning them to each individual namespace.

You can use projects to perform actions like:

- [Assign users access to a group of namespaces](../how-to-guides/advanced-user-guides/manage-projects/add-users-to-projects.md)
- Assign users [specific roles in a project](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md#project-roles). A role can be owner, member, read-only, or [custom](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/custom-roles.md)
- [Set resource quotas](manage-project-resource-quotas.md)
- [Manage namespaces](../how-to-guides/advanced-user-guides/manage-projects/manage-namespaces.md)
- [Configure tools](../reference-guides/rancher-project-tools.md)
- [Set up pipelines for continuous integration and deployment](../how-to-guides/advanced-user-guides/manage-projects/ci-cd-pipelines.md)
- [Configure pod security policies](../how-to-guides/advanced-user-guides/manage-projects/manage-pod-security-policies.md)

### Authorization

Non-administrative users are only authorized for project access after an [administrator](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/global-permissions.md), [cluster owner or member](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md#cluster-roles), or [project owner](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md#project-roles) adds them to the project's **Members** tab.

Whoever creates the project automatically becomes a [project owner](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md#project-roles).

## Switching between Projects

To switch between projects, use the drop-down available in the navigation bar. Alternatively, you can switch between projects directly in the navigation bar.

1. From the **Global** view, navigate to the project that you want to configure.

1. Select **Projects/Namespaces** from the navigation bar.

1. Select the link for the project that you want to open.
