---
title: Global Configuration
weight: 2075
---

# Global Configuration

After installing Rancher 2.0, you should configure it to support your users and environment. This section describes the global configurations you should make after installation.

# Authentication

One of the key features that Rancher adds to Kubernetes is centralized user authentication. This feature allows your users to use one set of credentials to authenticate with any of your Kubernetes clusters.

This centralized user authentication is accomplished using the Rancher authentication proxy, which is installed with the rest of Rancher. This proxy authenticates your users and forwards their requests to your Kubernetes clusters using a service account.

## External vs. Local Authentication

The Rancher authentication proxy integrates with the following external authentication services.

-	Microsoft Active Directory
-	GitHub

However, Rancher also provides local authentication.

In most cases, you should use an external authentication service over local, as external authentication allows user management from a central location. However, you may want a few local authentication accounts for managing Rancher under rare circumstances, such as if Active Directory is down.

## Users and Roles

Within Rancher, each user autheticates as a _user_, which is an object that grants you access within the Rancher system. As mentioned in the previous sections, users can either be local or external.

Once the user logs in to Rancher, their _authorization_, or their access rights within the system, are determined by _roles_.  Roles are sets of permissions that the user can perform in Rancher

There are two types of roles in Rancher: default roles and custom roles.

### Default Roles

Out-of-the-box, Rancher comes with two default roles:

- **Administrator:**

	These users have full control over the entire Rancher system and all clusters within it.

- **Standard User:**

	These users can create new clusters or manage clusters and projects that an administrator has given them access to.

### Custom Roles

Rancher lets you create _custom roles_ that let you assing individual permissions to a user. These roles are convenient for defining narrow or specialized persmissions to user within Rancher.

### Membership

The projects and clusters accessible to a standard or custom users is determined by _membership_. Membership is a list of users who have access to a specific project or cluster. Each project and cluster includes a tab that Rancher administrators can use to assign membership.

Non-administrative users do not have access to any existing projects/clusters by default. An administrator must explicitly assign the user membership.

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

You can create new clusters within Rancher using _node templates_. A node template is a virtual machine image used to create a Kubernetes cluster. While creating a cluster, Rancher will prompt you for an image to use as a template. Follow the directions on screen to create the template. During cluster creation, Rancher clones the template and installs different Kubernettes components.

After you add a node template to Rancher, its stored by the system so that you can use it when creating another cluster later. Node templates are bound to your login. After you add a template, you can remove them from your user profile.
