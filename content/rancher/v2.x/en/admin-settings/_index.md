---
title: Global Configuration
weight: 1100
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/
  - /rancher/v2.x/en/tasks/global-configuration/
  - /rancher/v2.x/en/concepts/global-configuration/server-url/
  - /rancher/v2.x/en/tasks/global-configuration/server-url/
  - /rancher/v2.x/en/admin-settings/server-url/
  - /rancher/v2.x/en/admin-settings/log-in/
---

After installation, the [system administrator]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) should configure Rancher to configure authentication, authorization, security, default settings, security policies, drivers and global DNS entries.

## First Log In

After you log into Rancher for the first time, Rancher will prompt you for a **Rancher Server URL**.You should set the URL to the main entry point to the Rancher Server. When a load balancer sits in front a Rancher Server cluster, the URL should resolve to the load balancer. The system will automatically try to infer the Rancher Server URL from the IP address or host name of the host running the Rancher Server. This is only correct if you are running a single node Rancher Server installation. In most cases, therefore, you need to set the Rancher Server URL to the correct value yourself.

>**Important!** After you set the Rancher Server URL, we do not support updating it. Set the URL with extreme care.

## Authentication

One of the key features that Rancher adds to Kubernetes is centralized user authentication. This feature allows to set up local users and/or connect to an external authentication provider. By connecting to an external authentication provider, you can leverage that provider's user and groups.

For more information how authentication works and how to configure each provider, see [Authentication]({{< baseurl >}}/rancher/v2.x/en/admin-settings/authentication/).

## Authorization

Within Rancher, each person authenticates as a _user_, which is a login that grants you access to Rancher. Once the user logs in to Rancher, their _authorization_, or their access rights within the system, is determined by the user's role. Rancher provides built-in roles to allow you to easily configure a user's permissions to resources, but Rancher also provides the ability to customize the roles for each Kubernetes resource.

For more information how authorization works and how to customize roles, see [Roles Based Access Control (RBAC)]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/).

## Pod Security Policies

_Pod Security Policies_ (or PSPs) are objects that control security-sensitive aspects of pod specification, e.g. root privileges. If a pod does not meet the conditions specified in the PSP, Kubernetes will not allow it to start, and Rancher will display an error message.

For more information how to create and use PSPs, see [Pod Security Policies]({{< baseurl >}}/rancher/v2.x/en/admin-settings/pod-security-policies/).

## Provisioning Drivers

Drivers in Rancher allow you to manage which providers can be used to provision [hosted Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) or [nodes in an infrastructure provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/) to allow Rancher to deploy and manage Kubernetes.

For more information, see [Provisioning Drivers]({{< baseurl >}}/rancher/v2.x/en/admin-settings/drivers/).
