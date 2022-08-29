---
title: Rancher and NeuVector RBAC
weight: 3
---

This article is intended for users who need to provide access to the NeuVector app deployed via the Rancher app catalog with the Rancher chart. This will not work on deployments using the partner chart.

By default, a Rancher cluster admin and a global admin will automatically be mapped to be global admins within NeuVector. In order to map other personas, some access will need to be provided to the Rancher user/group depending on the desired access within NeuVector. Please note that adding the below permissions will not provide access to any Kubernetes resources beyond what is already given by existing Rancher roles, with one exception: the NeuVector service proxy.

The following table lists the NeuVector role and the Kubernetes RBAC from which it is derived. These RBAC mappings need to be created within Rancher RBAC.

|NeuVector Role|API Group|Resources|Verbs|Comment|
|-----|-----|-----|-----|-----|
|Cluster admin|read-only.neuvector.api.io|*|*| ClusterRole (with ClusterRoleBinding)|
|Cluster reader|read-only.neuvector.api.io|*|GET| ClusterRole(with ClusterRoleBinding)|
|Namespace admin|read-only.neuvector.api.io|*|*| ClusterRole/Role with RoleBinding) via project|
|Namespace readonly|read-only.neuvector.api.io|*|GET| ClusterRole/Role with RoleBinding) via project|
|N/A|neuvector.com|*|GET|Necessary along with any of the above for the nav link to appear|

### Creating the Rancher RBAC Roles for Cluster and Project Scope
>**Note:** This is applicable to users who are neither global admins nor cluster admins.

Three items are necessary for the mapped access:

1. Global, cluster, or project level role based on the above table.
1. GET permissions on the neuvector.com CRDs.
1. NeuVector project level services/proxy permission. This is used for UI proxy via Rancher.

The first two items above are highly dependent on your RBAC setup but can be done with either distinct NeuVector roles or by adding the permissions from the above tables to an existing set of custom roles. These can be given to users at global, cluster, or project level.

See [Rancher Custom Roles]({{<baseurl>}}rancher/v2.6/en/admin-settings/rbac/default-custom-roles/) for more information.

### NeuVector Project Level UI Proxy

>**Note:** This is necessary when a user does not have this permission already either via a global or cluster role.

1. Create a project for NeuVector prior to installing from the App catalog and install to this project. If install has already been done, create the project and move the namespace there.
1. Create a project level role with services/proxy access as shown in the below examples.
1. For the user/group in question who will need to access NeuVector, assign the project UI proxy role.
   
> **Warning:** Please be sure to scope this role to a NeuVector-only project. Otherwise, services/proxy access could be given to unintended workloads.

### Examples

#### Project Level:
![Project Admin]({{<baseurl>}}/img/rancher/neuvector-project-admin.png)
![Project Read-Only]({{<baseurl>}}/img/rancher/neuvector-project-ro.png)
![Project UI Proxy]({{<baseurl>}}/img/rancher/neuvector-proxy-role.png)

#### Cluster Level:
![Cluster Admin]({{<baseurl>}}/img/rancher/neuvector-cluster-admin.png)
![Cluster Read-Only]({{<baseurl>}}/img/rancher/neuvector-cluster-ro.png)
 
#### Project UI Proxy Permission:
![NeuVector Project UI]({{<baseurl>}}/img/rancher/neuvector-project-ro.png)
