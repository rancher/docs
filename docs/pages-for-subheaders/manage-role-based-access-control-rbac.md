---
title: Role-Based Access Control (RBAC)
weight: 20
---

Within Rancher, each person authenticates as a _user_, which is a login that grants you access to Rancher. As mentioned in [Authentication](about-authentication.md), users can either be local or external.

After you configure external authentication, the users that display on the **Users** page changes.

- If you are logged in as a local user, only local users display.

- If you are logged in as an external user, both external and local users display.

## Users and Roles

Once the user logs in to Rancher, their _authorization_, or their access rights within the system, is determined by _global permissions_, and _cluster and project roles_.  

- [Global Permissions](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/global-permissions.md):

    Define user authorization outside the scope of any particular cluster.

- [Cluster and Project Roles](../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/cluster-and-project-roles.md):

    Define user authorization inside the specific cluster or project where they are assigned the role.

Both global permissions and cluster and project roles are implemented on top of [Kubernetes RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/). Therefore, enforcement of permissions and roles is performed by Kubernetes.
