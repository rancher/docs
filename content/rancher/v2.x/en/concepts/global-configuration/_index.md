---
title: Global Configuration
weight: 2075
---
After installing Rancher 2.0, you should configure it to support your users and environment. This section describes the global configurations you should make after installation.

## Authentication
One of the key features that Rancher adds to Kubernetes is centralized user authentication. This feature allows your users to use one set of credentials to authenticate with any of your Kubernetes clusters.

This centralized user authentication is accomplished using the Rancher authentication proxy, which is installed with the rest of Rancher. This proxy authenticates your users and forwards their requests to your Kubernetes clusters using a service account.

### External vs. Local Authentication

The Rancher authentication proxy integrates with the following external authentication services.

- Microsoft Active Directory
- GitHub

However, Rancher also provides local authentication.

In most cases, you should use an external authentication service over local, as external authentication allows user management from a central location. However, you may want a few local authentication accounts for managing Rancher under rare circumstances, such as if Active Directory is down.

## Users, Global Permissions, and Roles

Within Rancher, each user authenticates as a _user_, which is an object that grants you access within the Rancher system. As mentioned in the previous sections, users can either be local or external.

Once the user logs in to Rancher, their _authorization_, or their access rights within the system, are determined by _global permissions_ and _cluster and project roles_.  

- _Global Permissions_ define what actions a user can complete outside the scope of any particular cluster.
- _Cluster and Project Roles_ define what actions a user can complete inside the specific cluster or project where they have been granted the role.

Both global permissions and cluster and project roles are implemented on top of [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/). So, all enforcement of these permissions and roles is performed by Kubernetes.

### Global Permissions

Global Permissions define what actions a user can complete outside the scope of any particular cluster. There are two primary global permissions: `Administrator` and `Standard User`.

- **Administrator:**

    These users have full control over the entire Rancher system and all clusters within it.

- **Standard User:**

    These users can create new clusters and use them. Standard users can also assign other users permissions to their clusters.

>**Note:** You cannot create, update, or delete Global Permissions.

#### Global Permission Assignment

- **External Authentication**

    When a user logs in using an external authentication provider for the first time, they are automatically assigned the `Standard User` global permission.

- **Local Authentication**

    When you create a new local user, you assign them one or more global permission(s) as you create complete the **Add User** form.

### Locked Roles

Roles can be set to a __locked__ status by users with the __Administrators__ global permission or  __Standard Users__ with the __Manage Roles__ role. When a role is set to __locked__ that role cannot be assigned to any user. Locked roles will not appear in the __Member Roles__ dropdown when adding a user to a [cluster](todomark) or [project](todomark). The ability to lock roles is useful in preventing a role from being assigned to any user.

> **Note:** Updating a role to a new status will not change any of the permissions if someone is already assigned that role. By locking a role, the user will still have access to the permissions associated with that role, but no new users will be able to be assigned that particular role.

For example, if your organization had a policy that users assigned to a cluster are not allowed to create new projects, then the __Cluster Owner__, __Cluster Member__ and __Create Projects__ role would need to be __locked__ to prevent anyone being assigned the permissions associated with creating a new project. Only administrators would be able to create new projects in clusters. To assign users to the cluster, the administrator would need to create a custom role that could have the same permissions as a __Cluster Member__ except for the ability to create projects. Then, the new custom role could be used when adding users to a cluster.

#### Custom Global Permissions

Rancher lets you assign _custom permissions_ to a user instead of the typical `Administrator` or `Standard User` permissions. These permissions are convenient for defining narrow or specialized access for a user within Rancher. See the table below for a list of custom global permission available.

#### Global Permissions Reference

The following table lists each custom global permission available in Rancher and whether it is also granted by Rancher's two global permissions, `Administrator` and `Standard User`.

| Custom Global Permission           | Administrator | Standard User |
| ---------------------------------- | ------------- | ------------- |
| Manage Authentication              | ✓             |               |
| Manage Catalogs                    | ✓             |               |
| Manage Node Drivers                | ✓             |               |
| Manage PodSecurityPolicy Templates | ✓             |               |
| Manage Roles                       | ✓             |               |
| Manage Users                       | ✓             |               |
| Create Clusters                    | ✓             | ✓             |
| User Catalog Templates             | ✓             | ✓             |
| Login Access                       | ✓             | ✓             |

> **Note:** Each Rancher permission listed above is comprised of multiple access rules not available in the Rancher UI. For a full list of these permissions and the rules they are comprised of, access through the API at `/v3/globalroles`.

### Cluster and Project Roles

Cluster and project roles define what actions a user can complete inside a cluster or project. These roles can be managed by administrators on the Global > Security > Roles page. From this page an adminisrator can:

- Lock/unlock roles so that they may not be used in any new role assignments (existing assignments will still be enforce)
- Create and manage new roles for use across all clusters and projects

#### Membership and Role Assignment

The projects and clusters accessible to non-administrative user is determined by _membership_. Membership is a list of users who have access to a specific cluster or project based on the roles they were assigned in that cluster or project. Each cluster and project includes a tab that a user with the appropriate permissions can use to manage membership.

When a user creates a cluster or project, Rancher automatically assigns them the Owner role in it. The owner can assign other users roles in the cluster or project while creating it or afterwards.

> **Note:** Non-administrative users do not have access to any existing projects/clusters by default. A user with appropriate permissions (typically the owner) must explicitly assign membership to the user.

#### Cluster Roles

_Cluster roles_ are roles that can be used to grant users access to a cluster. There are two primary cluster roles: `Owner` and `Member`.

- **Owner:**

    These users have full control over the cluster and all resources in it.

- **Member:**

    These users can view most cluster level resources and create new projects.


##### Custom Cluster Roles

Rancher lets you assign _custom cluster roles_ to a user instead of the typical `Owner` or `Member` roles. These roles can be either a built-in custom cluster role or one defined by a Rancher administrator. They are convenient for defining narrow or specialized access for a user within a cluster. See the table below for a list of built-in custom cluster roles.

##### Cluster Role Reference

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

> **Note:** Each cluster role listed above, including Owner and Member, is comprised of multiple rules granting access to various resources. You can view the roles and their rules on the Global > Security > Roles page.


#### Project Roles

_Project roles_ are roles that can be used to grant users access to a project. There are three primary project roles: `Owner`, `Member`, and `Read Only`.

- **Owner:**

    These users have full control over the projet and all resources in it.

- **Member:**

    These users can manage project-scoped resources like namespaces and workloads, but cannot manage other project members.

- **Read Only:**

    These users can view everything in the project but cannot create, update, or delete anything.


##### Custom Project Roles

Rancher lets you assign _custom project roles_ to a user instead of the typical `Owner`, `Member`, or `Read Only` roles. These roles can be either a built-in custom project roles or one defined by a Rancher administrator. They are convenient for defining narrow or specialized access for a user within a project. See the table below for a list of built-in custom project roles.

##### Project Role Reference

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


<!-- ### Protected Roles

Nathan! Fill me in! If 'global permissions' and 'protected roles' are synonymous, just add the info to 'global permissions'.

-->

## Rancher Server URL

This is the URL of your Rancher Server. All nodes in your cluster must resolve to this URL.

- You are prompted for this URL upon the very first Rancher login.
- You can edit this URL later by selecting **Settings**.

## Pod Security Policies

_Pod Security Policies_ are objects that control security-sensitive aspects of pod specification. Pods only run within Kubernetes if they meet the conditions specified in their assigned Pod Security Policy.

Read more about Pod Security Policies in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/policy/pod-security-policy/).

>**Best Practice:**
>Set Pod Security at the cluster level.

## Node Drivers

Out-of-the-box, Rancher provides support for creating clusters using many popular cloud providers: Amazon EC2, Azure, DigitalOcean, and so on. However, you may want to create a cluster using another cloud provider. In these scenarios, you can create a custom node driver for the cloud provider and point Rancher toward it.

For more information on creating node drivers, see [https://github.com/rancher/ui-driver-skel](https://github.com/rancher/ui-driver-skel).

## Node Templates

You can create new clusters within Rancher using _node templates_. A node template is a virtual machine image used to create a Kubernetes cluster. While creating a cluster, Rancher will prompt you for an image to use as a template. Follow the directions on screen to create the template. During cluster creation, Rancher clones the template and installs different Kubernetes components.

After you add a node template to Rancher, its stored by the system so that you can use it when creating another cluster later. Node templates are bound to your login. After you add a template, you can remove them from your user profile.

<!-- ## Rancher CLI Configuration

Dan! Fill me in!

-How to configure
-Common commands
-Command to view help
 
 -->
