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

## Users and Roles

Within Rancher, each user authenticates as a _user_, which is an object that grants you access within the Rancher system. As mentioned in the previous sections, users can either be local or external.

Once the user logs in to Rancher, their _authorization_, or their access rights within the system, are determined by _permissions_.  Permissions are sets of access rights that you can perform in Rancher.

There are two types of roles in Rancher: default permissions and custom permissions.

<!-- ### Rancher Role Implementation

	Fill me in Craig!

-->

### Global Permissions

_Global Permissions_ define what actions a user can complete outside the scope of any particular cluster. There are two primary global permissions: `Administrator` and `Standard User`.

- **Administrator:**

    These users have full control over the entire Rancher system and all clusters within it.

- **Standard User:**

    These users can create new clusters and use them. Standard users can also assign other users permissions to their clusters.

>**Note:** You cannot create, update, or delete Global Permissions.

### Global Permission Assignment

- **External Authentication**

    When a user logs in using an external authentication provider for the first time, they are automatically assigned the `Standard User` global permission.

- **Local Authentication**

    When you create a new local user, you assign them one or more global permission(s) as you create complete the **Add User** form.

<!-- ### Projects and Clusters: Automatic Role Assignment 

Fill me in Craig!

-->

### Locked Roles

Roles can be set to a __Locked__ status by users with the __Administrator__ or __Manage Roles__ permission. When a role is set to __Locked__ that role cannot be assigned to any user (although existing assignments are unaffected). Locked roles will not appear in the __Member Roles__ dropdown when adding a user to a cluster or project.  This is useful when you want to prevent a role from being assigned to all users.

For instance, if your organization had a policy that users assigned to a cluster could not create new projects, then the standard __Cluster Member__ role would be inappropriate. A custom role could be created that mirrored the __Cluster Member__ role, but lacked the ability to create projects. The __Cluster Member__ role could then be marked as __Locked__ so that it could not be assigned to users, and the custom role could be used instead.

### Custom Permissions

Rancher lets you create _custom permissions_, which are sets of permissions where you can assign individual roles to users. _Roles_ are individual access rights that you can assign to a set of custom permissions. These permissions are convenient for defining narrow or specialized access to a user within Rancher. See the table below for a list of custom roles permission available.

![Custom Permissions]({{< baseurl >}}/img/rancher/permissions.png)

### Permissions Reference

The following table lists each role available in Rancher and whether it's assigned to Rancher's two global permissions, `Administrator` and `Standard User`.

| Role                               | Administrator | Standard User |
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

### Role Aggregation

Each Rancher permission listed above is comprised of multiple, smaller roles not available in the Rancher UI. For a full list of roles, access through the API at `/v3/globalroles`.

### Membership

The projects and clusters accessible to a standard or custom users is determined by _membership_. Membership is a list of users who have access to a specific project or cluster. Each project and cluster includes a tab that Rancher administrators can use to assign membership.

Non-administrative users do not have access to any existing projects/clusters by default. An administrator must explicitly assign membership to the user.

<!-- Craig! Add supplemental information about Role Context here is necessary (Different Roles for Cluster, Project) -->

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