---
title: Role-based Access Control
weight: 3
aliases:
  - /rancher/v2.5/en/cluster-admin/tools/istio/rbac
  - /rancher/v2.5/en/istio/v2.5/rbac
---

This section describes the permissions required to access Istio features.

The rancher istio chart installs three `ClusterRoles` 

## Cluster-Admin Access

By default, only those with the `cluster-admin` `ClusterRole` can:

- Install istio app in a cluster
- Configure resource allocations for Istio


## Admin and Edit access

By default, only Admin and Edit roles can:

- Enable and disable Istio sidecar auto-injection for namespaces
- Add the Istio sidecar to workloads
- View the traffic metrics and traffic graph for the cluster
- Configure Istio's resources (such as the gateway, destination rules, or virtual services)

## Summary of Default Permissions for Kubernetes Default roles

Istio creates three `ClusterRoles` and adds Istio CRD access to the following default K8s `ClusterRole`:

ClusterRole create by chart | Default K8s ClusterRole  | Rancher Role |
 ------------------------------:| ---------------------------:|---------:|
 `istio-admin` | admin| Project Owner | 
 `istio-edit`| edit | Project Member | 
 `istio-view` | view | Read-only | 

Rancher will continue to use cluster-owner, cluster-member, project-owner, project-member, etc as role names, but will utilize default roles to determine access. For each default K8s `ClusterRole` there are different Istio CRD permissions and K8s actions (Create ( C ), Get ( G ), List ( L ), Watch ( W ), Update ( U ), Patch ( P ), Delete( D ), All ( * )) that can be performed. 


|CRDs                        | Admin | Edit | View  
|----------------------------| ------| -----| -----
| <ul><li>`config.istio.io`</li><ul><li>`adapters`</li><li>`attributemanifests`<li>`handlers`</li><li>`httpapispecbindings`</li><li>`httpapispecs`</li><li>`instances`</li><li>`quotaspecbindings`</li><li>`quotaspecs`</li><li>`rules`</lli><li>`templates`</li></ul></ul>| GLW | GLW | GLW
|<ul><li>`networking.istio.io`</li><ul><li>`destinationrules`</li><li>`envoyfilters`<li>`gateways`</li><li>`serviceentries`</li><li>`sidecars`</li><li>`virtualservices`</li><li>`workloadentries`</li></ul></ul>| * | * | GLW 
|<ul><li>`security.istio.io`</li><ul><li>`authorizationpolicies`</li><li>`peerauthentications`<li>`requestauthentications`</li></ul></ul>| * | * | GLW 