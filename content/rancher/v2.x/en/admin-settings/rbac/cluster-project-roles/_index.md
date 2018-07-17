---
title: Cluster and Project Roles
weight: 1127
---

Cluster and project roles define user authorization inside a cluster or project. You can manage these roles from the **Global > Security > Roles** page.

### Membership and Role Assignment

The projects and clusters accessible to non-administrative users is determined by _membership_. Membership is a list of users who have access to a specific cluster or project based on the roles they were assigned in that cluster or project. Each cluster and project includes a tab that a user with the appropriate permissions can use to manage membership.

When you create a cluster or project, Rancher automatically assigns you as the `Owner` for it. Users assigned the `Owner` role can assign other users roles in the cluster or project.

> **Note:** Non-administrative users cannot access any existing projects/clusters by default. A user with appropriate permissions (typically the owner) must explicitly assign the user membership.

### Cluster Roles

_Cluster roles_ are roles that you can assign to users, granting them access to a cluster. There are two primary cluster roles: `Owner` and `Member`.

- **Owner:**

    These users have full control over the cluster and all resources in it.

- **Member:**

    These users can view most cluster level resources and create new projects.

#### Custom Cluster Roles

Rancher lets you assign _custom cluster roles_ to a user instead of the typical `Owner` or `Member` roles. These roles can be either a built-in custom cluster role or one defined by a Rancher administrator. They are convenient for defining narrow or specialized access for a user within a cluster. See the table below for a list of built-in custom cluster roles.

#### Cluster Role Reference

The following table lists each built-in custom cluster role available in Rancher and whether it is also granted by the `Owner` or `Member` role.

| Custom Cluster Role                | Owner         | Member        |
| ---------------------------------- | ------------- | ------------- |
| Manage Cluster Members             | ✓             |               |
| Manage Nodes                       | ✓             |               |
| Manage Storage                     | ✓             |               |
| View All Projects                  | ✓             |               |
| Create Project                     | ✓             | ✓             |
| View Cluster Members               | ✓             | ✓             |
| View Nodes                         | ✓             | ✓             |

> **Note:** Each cluster role listed above, including `Owner` and `Member`, is comprised of multiple rules granting access to various resources. You can view the roles and their rules on the Global > Security > Roles page.

### Project Roles

_Project roles_ are roles that can be used to grant users access to a project. There are three primary project roles: `Owner`, `Member`, and `Read Only`.

- **Owner:**

    These users have full control over the project and all resources in it.

- **Member:**

    These users can manage project-scoped resources like namespaces and workloads, but cannot manage other project members.

- **Read Only:**

    These users can view everything in the project but cannot create, update, or delete anything.

#### Custom Project Roles

Rancher lets you assign _custom project roles_ to a user instead of the typical `Owner`, `Member`, or `Read Only` roles. These roles can be either a built-in custom project role or one defined by a Rancher administrator. They are convenient for defining narrow or specialized access for a user within a project. See the table below for a list of built-in custom project roles.

#### Project Role Reference

The following table lists each built-in custom project role available in Rancher and whether it is also granted by the `Owner`, `Member`, or `Read Only` role.

| Custom Cluster Role                | Owner         | Member        | Read Only     |
| ---------------------------------- | ------------- | ------------- | ------------- |
| Manage Project Members             | ✓             |               |               |
| Create Namespaces                  | ✓             | ✓             |               |
| Manage Config Maps                 | ✓             | ✓             |               |
| Manage Ingress                     | ✓             | ✓             |               |
| Manage Secrets                     | ✓             | ✓             |               |
| Manage Service Accounts            | ✓             | ✓             |               |
| Manage Services                    | ✓             | ✓             |               |
| Manage Volumes                     | ✓             | ✓             |               |
| Manage Workloads                   | ✓             | ✓             |               |
| View Config Maps                   | ✓             | ✓             | ✓             |
| View Ingress                       | ✓             | ✓             | ✓             |
| View Project Members               | ✓             | ✓             | ✓             |
| View Secrets                       | ✓             | ✓             | ✓             |
| View Service Accounts              | ✓             | ✓             | ✓             |
| View Services                      | ✓             | ✓             | ✓             |
| View Volumes                       | ✓             | ✓             | ✓             |
| View Workloads                     | ✓             | ✓             | ✓             |

> **Note:** Each project role listed above, including Owner, Member, and Read Only, is comprised of multiple rules granting access to various resources. You can view the roles and their rules on the Global > Security > Roles page.

### Defining Custom Roles
As previously mentioned, custom roles can be defined for use at the cluster or project level. The context field defines whether the role will appear on the cluster member page, project member page, or both.

When defining a custom role, you can grant access to specific resources or specify roles from which the custom role should inherit. A custom role can be made up of a combination of specific grants and inherited roles. All grants are additive. This means that defining a narrower grant for a specific resource **will not** override a broader grant defined in a role that the custom role is inheriting from.
