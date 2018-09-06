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

- **Cluster Owner:**

    These users have full control over the cluster and all resources in it.

- **Cluster Member:**

    These users can view most cluster level resources and create new projects.

#### Custom Cluster Roles

Rancher lets you assign _custom cluster roles_ to a user instead of the typical `Owner` or `Member` roles. These roles can be either a built-in custom cluster role or one defined by a Rancher administrator. They are convenient for defining narrow or specialized access for a user within a cluster. See the table below for a list of built-in custom cluster roles.

#### Cluster Role Reference

The following table lists each built-in custom cluster role available in Rancher and whether it is also granted by the `Owner` or `Member` role.

| Custom Cluster Role                | Owner         | Member <a id="clus-roles"></a> |
| ---------------------------------- | ------------- | --------------------------------- |
| Manage Cluster Members             | ✓             |                                   |
| Manage Nodes                       | ✓             |                                   |
| Manage Storage                     | ✓             |                                   |
| View All Projects                  | ✓             |                                   |
| Create Project                     | ✓             | ✓                                 |
| View Cluster Members               | ✓             | ✓                                 |
| View Nodes                         | ✓             | ✓                                 |

> **Note:** Each cluster role listed above, including `Owner` and `Member`, is comprised of multiple rules granting access to various resources. You can view the roles and their rules on the Global > Security > Roles page.

### Project Roles

_Project roles_ are roles that can be used to grant users access to a project. There are three primary project roles: `Owner`, `Member`, and `Read Only`.

- **Project Owner:**

    These users have full control over the project and all resources in it.

- **Project Member:**

    These users can manage project-scoped resources like namespaces and workloads, but cannot manage other project members.

- **Read Only:**

    These users can view everything in the project but cannot create, update, or delete anything.

#### Custom Project Roles

Rancher lets you assign _custom project roles_ to a user instead of the typical `Owner`, `Member`, or `Read Only` roles. These roles can be either a built-in custom project role or one defined by a Rancher administrator. They are convenient for defining narrow or specialized access for a user within a project. See the table below for a list of built-in custom project roles.

#### Project Role Reference

The following table lists each built-in custom project role available in Rancher and whether it is also granted by the `Owner`, `Member`, or `Read Only` role.

| Custom Cluster Role                | Owner         | Member<a id="proj-roles"><a/> | Read Only     |
| ---------------------------------- | ------------- | ----------------------------- | ------------- |
| Manage Project Members             | ✓             |                               |               |
| Create Namespaces                  | ✓             | ✓                             |               |
| Manage Config Maps                 | ✓             | ✓                             |               |
| Manage Ingress                     | ✓             | ✓                             |               |
| Manage Secrets                     | ✓             | ✓                             |               |
| Manage Service Accounts            | ✓             | ✓                             |               |
| Manage Services                    | ✓             | ✓                             |               |
| Manage Volumes                     | ✓             | ✓                             |               |
| Manage Workloads                   | ✓             | ✓                             |               |
| View Config Maps                   | ✓             | ✓                             | ✓             |
| View Ingress                       | ✓             | ✓                             | ✓             |
| View Project Members               | ✓             | ✓                             | ✓             |
| View Secrets                       | ✓             | ✓                             | ✓             |
| View Service Accounts              | ✓             | ✓                             | ✓             |
| View Services                      | ✓             | ✓                             | ✓             |
| View Volumes                       | ✓             | ✓                             | ✓             |
| View Workloads                     | ✓             | ✓                             | ✓             |

> **Note:** Each project role listed above, including Owner, Member, and Read Only, is comprised of multiple rules granting access to various resources. You can view the roles and their rules on the Global > Security > Roles page.

### Defining Custom Roles
As previously mentioned, custom roles can be defined for use at the cluster or project level. The context field defines whether the role will appear on the cluster member page, project member page, or both.

When defining a custom role, you can grant access to specific resources or specify roles from which the custom role should inherit. A custom role can be made up of a combination of specific grants and inherited roles. All grants are additive. This means that defining a narrower grant for a specific resource **will not** override a broader grant defined in a role that the custom role is inheriting from.

### Default Cluster and Project Roles

By default, when a user creates a new cluster or project, they are automatically assigned an ownership role: either [cluster owner](#cluster-roles) or [project owner](#project-roles). However, in some organizations, these roles may overextend administrative access. In this use case, you can change the default role to something more restrictive, such as a set of individual roles or a custom role.

There are two methods for changing default cluster/project roles:

- **Assign Custom Roles**: Create a [custom role]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/default-custom-roles) for either your [cluster](#custom-cluster-roles) or [project](#custom-project-roles), and then set the custom role as default.

- **Assign Individual Roles**: Configure multiple [cluster](#cluster-role-reference)/[project](#project-role-reference) roles as default for assignment to the creating user.

    For example, instead of assigning a role that inherits other roles (such as `cluster owner`), you can choose a mix of individual roles (such as `manage nodes` and `manage storage`).

>**Note:** 
>
>- Although you can [lock]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/locked-roles/) a default role, the system still assigns the role to users who create a cluster/project.
>- Only users that create clusters/projects inherit their roles. Users added to the cluster/project membership afterward must be explicitly assigned their roles.

### Configuring Default Roles

You can change the cluster or project role(s) that are automatically assigned to the creating user.

1. From the **Global** view, select **Security > Roles** from the main menu. Select either the **Cluster** or **Project** tab.

1. Find the custom or individual role that you want to use as default. Then edit the role by selecting **Ellipsis > Edit**.

1. Enable the role as default.
{{% accordion id="cluster" label="For Clusters" %}}
1. From **Clustor Creator Default**, choose **Yes: Default role for new cluster creation**.
1. Click **Save**. 
{{% /accordion %}}
{{% accordion id="project" label="For Projects" %}}
1. From **Project Creator Default**, choose **Yes: Default role for new project creation**.
1. Click **Save**.  
{{% /accordion %}}

1. If you want to remove a default role, edit the permission and select **No** from the default roles option.

**Result:** The default roles are configured based on your changes. Roles assigned to cluster/project creators display a check in the **Cluster/Project Creator Default** column.

### Cluster Membership Revocation Behavior

When you revoke the cluster membership for a user that's explicitly assigned membership to both the cluster _and_ a project within the cluster, that user [loses their cluster roles](#clus-roles) but [retains their project roles](#proj-roles). In other words, although you have revoked the user's permissions to access the cluster and its nodes, the user can still access and manage:

- The projects they hold membership in.
- The namespaces that they've created.

This functionality is intended to prevent project and namespace owners from being locked out of their own projects and namespaces. If you want to completely revoke a user's access within a cluster, revoke both their cluster and project memberships.