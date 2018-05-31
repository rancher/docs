---
title: Global Configuration
weight: 2075
---
After installing Rancher 2.0, you should configure it to support your users and environment. This section describes the global configurations you should make after installation.

## Authentication
One of the key features that Rancher adds to Kubernetes is centralized user authentication. This feature allows your users to use one set of credentials to authenticate with any of your Kubernetes clusters.

This centralized user authentication is accomplished using the Rancher authentication proxy, which is installed along with the rest of Rancher. This proxy authenticates your users and forwards their requests to your Kubernetes clusters using a service account.

<!-- todomark add diagram -->

### External vs. Local Authentication

The Rancher authentication proxy integrates with the following external authentication services.

- Microsoft Active Directory
- GitHub

However, Rancher also provides local authentication.

In most cases, you should use an external authentication service over local, as external authentication allows user management from a central location. However, you may want a few local authentication accounts for managing Rancher under rare circumstances, such as if Active Directory is down.

<<<<<<< HEAD
## Users, Global Permissions, and Roles

Within Rancher, each user authenticates as a _user_, which is a login that grants you access to Rancher. As mentioned previously, users can either be local or external.
=======
You should know a few things about external authentication:

- When you configure AD or GitHub authentication, Rancher binds your current user account to the AD or GitHub account you're using to authenticate with Rancher. In other words, if you want to log into Rancher using the AD or GitHub account that you used to configure external authentication, you must use the local user account that's bound to your AD/GitHub account.

- If you are signed into Rancher with a local user account, AD/GitHub accounts are not listed on the **Users** page. You must be assigned with an AD/GitHub account to view AD/GitHub users in Rancher. Additionally, The AD/GitHub account

## Users and Roles
>>>>>>> documenting user account behavior during external auth setup

Once the user logs in to Rancher, their _authorization_, or their access rights within the system, is determined by _global permissions_, and _cluster and project roles_.  

- **Global Permissions:**

    Define user authorization outside the scope of any particular cluster.

- **Cluster and Project Roles:**

    Define user authorization inside the specific cluster or project where they are assigned the role.

Both global permissions and cluster and project roles are implemented on top of [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/). Therefore, enforcement of permissions and roles is performed by Kubernetes.

### Global Permissions

Global Permissions define user authorization outside the scope of any particular cluster. Out-of-the-box, there are two default global permissions: `Administrator` and `Standard User`.

- **Administrator:**

    These users have full control over the entire Rancher system and all clusters within it.

- **Standard User:**

    These users can create new clusters and use them. Standard users can also assign other users permissions to their clusters.

>**Note:** You cannot create, update, or delete Global Permissions.

#### Global Permission Assignment

Assignment of global permissions to a user depends on their authentication source: external or local.

- **External Authentication**

    When a user logs into Rancher using an external authentication provider for the first time, they are automatically assigned the `Standard User` global permission.

- **Local Authentication**

    When you create a new local user, you assign them a global permission as you create complete the **Add User** form.

#### Custom Global Permissions

Rather than assigning users the default global permissions of `Administrator` or `Standard User`, you can assign them _custom permissions_. Custom permissions are sets of global permissions composed of individual _permissions_ that you select.

_Permissions_ are individual access rights that you can assign to a custom global permissions.

Custom permissions are convenient for providing users with narrow or specialized access to Rancher. See the [table](#global-permissions-reference) below for a list of individual permissions available.

#### Global Permissions Reference

The following table lists each custom global permission available and whether it is assigned to the default global permissions, `Administrator` and `Standard User`.

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

> **Note:** Each permission listed above is comprised of multiple individual permissions not listed in the Rancher UI. For a full list of these permissions and the rules they are comprised of, access through the API at `/v3/globalroles`.

### Cluster and Project Roles

Cluster and project roles define user authorization inside a cluster or project. You can manage these roles from the **Global > Security > Roles** page. From this page you can:

- Lock/unlock roles so that they may not be used in any new role assignments (existing assignments will still be enforce).
- Create and manage new roles for use across all clusters and projects.

#### Membership and Role Assignment

The projects and clusters accessible to non-administrative user is determined by _membership_. Membership is a list of users who have access to a specific cluster or project based on the roles they were assigned in that cluster or project. Each cluster and project includes a tab that a user with the appropriate permissions can use to manage membership.

When you create a cluster or project, Rancher automatically assigns you the `Owner` for it. Users assigned the `Owner` role can assign other users roles in the cluster or project.

> **Note:** Non-administrative users cannot access any existing projects/clusters by default. A user with appropriate permissions (typically the owner) must explicitly assign the user membership.

#### Cluster Roles

_Cluster roles_ are roles that you can assign to users, granting them access to a cluster. There are two primary cluster roles: `Owner` and `Member`.

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

#### Locked Roles

You can set roles to a status of `locked`. Locking roles prevent them from being assigned users in the future.

Locked roles:

- Cannot be assigned to users that don't already have it assigned.
- Are not listed in the **Member Roles** drop-down when you are adding a user to a cluster or project.
- Do not affect users assigned the role before you lock the role. These users retain access that the role provides.

    **Example:** let's say your organization creates an internal policy that users assigned to a cluster are prohibited from creating new projects. It's your job to enforce this policy.

    To enforce it, before you add new users to the cluster, you should lock the following roles: `Cluster Owner`, `Cluster Member`, and `Create Projects`. Then you could create a new custom role that includes the same permissions as a __Cluster Member__, except the ability to create projects. Then, you use this new custom role when adding users to a cluster.

Roles can be locked by the following users:

- Any user assigned the `Administrator` global permission.
- Any user assigned the `Custom Users` permission, along with the `Manage Roles` role.

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
