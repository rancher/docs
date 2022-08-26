---
title: Rancher + NeuVector RBAC
weight: 3
---

This article is intended for users who need to provide access to the NeuVector app deployed via the Rancher App catalog with the Rancher chart. This will not work on deployments using the Partner chart.

By default, a Rancher cluster admin, and global admin will be automatically mapped to be global admins within NeuVector. In order to map other personas, some access will need to be provided to the Rancher user/group depending on the desired access within NeuVector. Please note that adding the below permissions will not provide access to any kubernetes resources beyond what is already given by existing Rancher roles. With one exception being the neuvector service proxy.

The following table lists the NeuVector role and the k8s RBAC from which it is derived. These rbac mappings need to be created within Rancher RBAC.

|NeuVector role|apiGroup |resources|verbs|comment|
|-----|-----|-----|-----|-----|
cluster admin|read-only.neuvector.api.io|*|*| clusterrole(with clusterrolebinding)|
cluster reader|read-only.neuvector.api.io|*|get| clusterrole(with clusterrolebinding)|
namespace admin|read-only.neuvector.api.io|*|*| clusterrole/role with rolebinding) via project|
namespace readonly|read-only.neuvector.api.io|*|get| clusterrole/role with rolebinding) via project|
n/a|neuvector.com|*|get|necessary along with any of the above for nav link to appear|

### Creating the rancher RBAC roles for cluster and project scope
_for users that are not global admins or cluster admins_

Three items are necessary for the mapped access:

1. Global, Cluster, or project level role based on the above table
1. GET permissions on the neuvector.com CRDs
2. NeuVector Project level services/proxy permission. This is used for UI proxy via rancher.

The first two items are highly dependent on your RBAC setup, but can be done with distinct NeuVector roles, or adding the permissions from the above tables to an existing set of custom roles. These can be given to users at Global, cluster, or project level.

See [Rancher Custom Roles]({{<baseurl>}}rancher/v2.6/en/admin-settings/rbac/default-custom-roles/) for more information.

### NeuVector Project Level UI Proxy
_Necessary when a user does not have this permission already either via a global or cluster role_

1. Create a project for NeuVector prior to installing from the App catalog, and install to this project. If install has already been done, create the project and move the namespace there.
1. Create a project level role with services/proxy access as shown in the below examples.
1. For the user/group in question that will need to access NeuVector, assign the project UI Proxy role.
   
> **Warning**
> Please be sure to scope this role to a NeuVector only project, otherwise services/proxy access could be given to unintended workloads.

### Examples

#### Project level:
![Project Admin]({{<baseurl>}}/img/rancher/neuvector-project-admin.png)
![Project Read-Only]({{<baseurl>}}/img/rancher/neuvector-project-ro.png)
![Project UI Proxy]({{<baseurl>}}/img/rancher/neuvector-proxy-role.png)
#### Cluster level:
![Cluster Admin]({{<baseurl>}}/img/rancher/neuvector-cluster-admin.png)
![Cluster Read-Only]({{<baseurl>}}/img/rancher/neuvector-cluster-ro.png)
 
#### Project UI proxy permission:
![NeuVector Project UI]({{<baseurl>}}/img/rancher/neuvector-project-ro.png)
