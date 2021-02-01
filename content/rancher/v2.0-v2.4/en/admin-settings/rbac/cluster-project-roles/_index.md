---
title: Cluster and Project Roles
weight: 1127
---

Cluster and project roles define user authorization inside a cluster or project. You can manage these roles from the **Global > Security > Roles** page.

### Membership and Role Assignment

The projects and clusters accessible to non-administrative users is determined by _membership_. Membership is a list of users who have access to a specific cluster or project based on the roles they were assigned in that cluster or project. Each cluster and project includes a tab that a user with the appropriate permissions can use to manage membership.

When you create a cluster or project, Rancher automatically assigns you as the `Owner` for it. Users assigned the `Owner` role can assign other users roles in the cluster or project.

> **Note:** Non-administrative users cannot access any existing projects/clusters by default. A user with appropriate permissions (typically the owner) must explicitly assign the project and cluster membership.

### Cluster Roles

_Cluster roles_ are roles that you can assign to users, granting them access to a cluster. There are two primary cluster roles: `Owner` and `Member`.

- **Cluster Owner:**

    These users have full control over the cluster and all resources in it.

- **Cluster Member:**

    These users can view most cluster level resources and create new projects.

#### Custom Cluster Roles

Rancher lets you assign _custom cluster roles_ to a standard user instead of the typical `Owner` or `Member` roles. These roles can be either a built-in custom cluster role or one defined by a Rancher administrator. They are convenient for defining narrow or specialized access for a standard user within a cluster. See the table below for a list of built-in custom cluster roles.

#### Cluster Role Reference

The following table lists each built-in custom cluster role available and whether that level of access is included in the default cluster-level permissions, `Cluster Owner` and `Cluster Member`.

| Built-in Cluster Role                | Owner         | Member <a id="clus-roles"></a> |
| ---------------------------------- | ------------- | --------------------------------- |
| Create Projects                    | ✓             | ✓                                  |
| Manage Cluster Backups             | ✓             |                                   |
| Manage Cluster Catalogs            | ✓             |                                   |
| Manage Cluster Members             | ✓             |                                   |
| Manage Nodes                       | ✓             |                                   |
| Manage Storage                     | ✓             |                                   |
| View All Projects                  | ✓             |                                  |
| View Cluster Catalogs              | ✓             | ✓                                 |
| View Cluster Members               | ✓             | ✓                                 |
| View Nodes                         | ✓             | ✓                                 |

For details on how each cluster role can access Kubernetes resources, you can go to the **Global** view in the Rancher UI. Then click **Security > Roles** and go to the **Clusters** tab. If you click an individual role, you can refer to the **Grant Resources** table to see all of the operations and resources that are permitted by the role.

> **Note:**
>When viewing the resources associated with default roles created by Rancher, if there are multiple Kubernetes API resources on one line item, the resource will have `(Custom)` appended to it. These are not custom resources but just an indication that there are multiple Kubernetes API resources as one resource.

### Giving a Custom Cluster Role to a Cluster Member

After an administrator [sets up a custom cluster role,]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/default-custom-roles/) cluster owners and admins can then assign those roles to cluster members.

To assign a custom role to a new cluster member, you can use the Rancher UI. To modify the permissions of an existing member, you will need to use the Rancher API view.

To assign the role to a new cluster member,

1. Go to the **Cluster** view, then go to the **Members** tab.
1. Click **Add Member.** Then in the **Cluster Permissions** section, choose the custom cluster role that should be assigned to the member.
1. Click **Create.**

**Result:** The member has the assigned role.

To assign any custom role to an existing cluster member,

1. Go to the member you want to give the role to. Click the **&#8942; > View in API.**
1. In the **roleTemplateId** field, go to the drop-down menu and choose the role you want to assign to the member. Click **Show Request** and **Send Request.**

**Result:** The member has the assigned role.

### Project Roles

_Project roles_ are roles that can be used to grant users access to a project. There are three primary project roles: `Owner`, `Member`, and `Read Only`.

- **Project Owner:**

    These users have full control over the project and all resources in it.

- **Project Member:**

    These users can manage project-scoped resources like namespaces and workloads, but cannot manage other project members.

- **Read Only:**

    These users can view everything in the project but cannot create, update, or delete anything.

    >**Caveat:**
    >
    >Users assigned the `Owner` or `Member` role for a project automatically inherit the `namespace creation` role. However, this role is a [Kubernetes ClusterRole](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole), meaning its scope extends to all projects in the cluster. Therefore, users explicitly assigned the `owner` or `member` role for a project can create namespaces in other projects they're assigned to, even with only the `Read Only` role assigned.


#### Custom Project Roles

Rancher lets you assign _custom project roles_ to a standard user instead of the typical `Owner`, `Member`, or `Read Only` roles. These roles can be either a built-in custom project role or one defined by a Rancher administrator. They are convenient for defining narrow or specialized access for a standard user within a project. See the table below for a list of built-in custom project roles.

#### Project Role Reference

The following table lists each built-in custom project role available in Rancher and whether it is also granted by the `Owner`, `Member`, or `Read Only` role.

| Built-in Project Role                | Owner         | Member<a id="proj-roles"><a/> | Read Only     |
| ---------------------------------- | ------------- | ----------------------------- | ------------- |
| Manage Project Members             | ✓             |                               |               |
| Create Namespaces                  | ✓             | ✓                             |               |
| Manage Config Maps                 | ✓             | ✓                             |               |
| Manage Ingress                     | ✓             | ✓                             |               |
| Manage Project Catalogs            | ✓             |                               |               |
| Manage Secrets                     | ✓             | ✓                             |               |
| Manage Service Accounts            | ✓             | ✓                             |               |
| Manage Services                    | ✓             | ✓                             |               |
| Manage Volumes                     | ✓             | ✓                             |               |
| Manage Workloads                   | ✓             | ✓                             |               |
| View Secrets                       | ✓             | ✓                             |               |
| View Config Maps                   | ✓             | ✓                             | ✓             |
| View Ingress                       | ✓             | ✓                             | ✓             |
| View Project Members               | ✓             | ✓                             | ✓             |
| View Project Catalogs              | ✓             | ✓                             | ✓             |
| View Service Accounts              | ✓             | ✓                             | ✓             |
| View Services                      | ✓             | ✓                             | ✓             |
| View Volumes                       | ✓             | ✓                             | ✓             |
| View Workloads                     | ✓             | ✓                             | ✓             |

> **Notes:**
>
>- Each project role listed above, including `Owner`, `Member`, and `Read Only`, is comprised of multiple rules granting access to various resources. You can view the roles and their rules on the Global > Security > Roles page.
>- When viewing the resources associated with default roles created by Rancher, if there are multiple Kubernetes API resources on one line item, the resource will have `(Custom)` appended to it. These are not custom resources but just an indication that there are multiple Kubernetes API resources as one resource.
>- The `Manage Project Members` role allows the project owner to manage any members of the project **and** grant them any project scoped role regardless of their access to the project resources. Be cautious when assigning this role out individually.

### Defining Custom Roles
As previously mentioned, custom roles can be defined for use at the cluster or project level. The context field defines whether the role will appear on the cluster member page, project member page, or both.

When defining a custom role, you can grant access to specific resources or specify roles from which the custom role should inherit. A custom role can be made up of a combination of specific grants and inherited roles. All grants are additive. This means that defining a narrower grant for a specific resource **will not** override a broader grant defined in a role that the custom role is inheriting from.

### Default Cluster and Project Roles

By default, when a standard user creates a new cluster or project, they are automatically assigned an ownership role: either [cluster owner](#cluster-roles) or [project owner](#project-roles). However, in some organizations, these roles may overextend administrative access. In this use case, you can change the default role to something more restrictive, such as a set of individual roles or a custom role.

There are two methods for changing default cluster/project roles:

- **Assign Custom Roles**: Create a [custom role]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/default-custom-roles) for either your [cluster](#custom-cluster-roles) or [project](#custom-project-roles), and then set the custom role as default.

- **Assign Individual Roles**: Configure multiple [cluster](#cluster-role-reference)/[project](#project-role-reference) roles as default for assignment to the creating user.

    For example, instead of assigning a role that inherits other roles (such as `cluster owner`), you can choose a mix of individual roles (such as `manage nodes` and `manage storage`).

>**Note:**
>
>- Although you can [lock]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/locked-roles/) a default role, the system still assigns the role to users who create a cluster/project.
>- Only users that create clusters/projects inherit their roles. Users added to the cluster/project membership afterward must be explicitly assigned their roles.

### Configuring Default Roles for Cluster and Project Creators

You can change the cluster or project role(s) that are automatically assigned to the creating user.

1. From the **Global** view, select **Security > Roles** from the main menu. Select either the **Cluster** or **Project** tab.

1. Find the custom or individual role that you want to use as default. Then edit the role by selecting **&#8942; > Edit**.

1. Enable the role as default.
{{% accordion id="cluster" label="For Clusters" %}}
1. From **Cluster Creator Default**, choose **Yes: Default role for new cluster creation**.
1. Click **Save**.
{{% /accordion %}}
{{% accordion id="project" label="For Projects" %}}
1. From **Project Creator Default**, choose **Yes: Default role for new project creation**.
1. Click **Save**.
{{% /accordion %}}

1. If you want to remove a default role, edit the permission and select **No** from the default roles option.

**Result:** The default roles are configured based on your changes. Roles assigned to cluster/project creators display a check in the **Cluster/Project Creator Default** column.

### Cluster Membership Revocation Behavior

When you revoke the cluster membership for a standard user that's explicitly assigned membership to both the cluster _and_ a project within the cluster, that standard user [loses their cluster roles](#clus-roles) but [retains their project roles](#proj-roles). In other words, although you have revoked the user's permissions to access the cluster and its nodes, the standard user can still:

- Access the projects they hold membership in.
- Exercise any [individual project roles](#project-role-reference) they are assigned.

If you want to completely revoke a user's access within a cluster, revoke both their cluster and project memberships.
