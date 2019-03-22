---
title: Catalogs and Apps
weight: 4000
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/catalog/
  - /rancher/v2.x/en/concepts/catalogs/
  - /rancher/v2.x/en/tasks/global-configuration/catalog/
---

## Catalogs

Rancher provides the ability to use a catalog of Helm charts that make it easy to repeatedly deploy applications.

_Catalogs_ are GitHub repositories or Helm Chart repositories filled with applications that are ready-made for deployment. Applications are bundled in objects called _Helm charts_.

_Helm Charts_ are a list of files packaged by a popular packaging format called [Helm](https://docs.helm.sh/). Think of them as templates for deployments. Per Helm, charts are:

>A collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

All native Helm charts work within Rancher, but [custom catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/custom/) can be created take advantage of existing Helm charts and extend it with additional files. With these additional files, Rancher can improve the user experience. 

### Catalog Scope

Within Rancher, you can manage catalogs at three different scopes. Global catalogs is shared across all clusters and project. There are some use cases where you might not want to share catalogs across between different clusters or even projects in the same cluster. By leveraging cluster and project scoped catalogs, you will be able to provide applications for specific teams without needing to share them with all clusters and/or projects.

Scope |  Description | Available As of |
--- |  --- | --- |
Global | All clusters and all projects can access the Helm charts in this catalog | v2.0.0 |
Cluster | All projects in the specific cluster can access the Helm charts in this catalog | v2.2.0 |
Project | This specific cluster can access the Helm charts in this catalog |  v2.2.0 |

### Working with catalogs

There are two types of catalogs in Rancher. Learn more about each type:

* [Built-in Global Catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/built-in/)
* [Custom Catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/custom/)

## Apps

In Rancher, applications are deployed from the templates in a catalog. Rancher supports two types of applications:

* [Multi-cluster applications]({{< baseurl >}}/rancher/v2.x/en/catalog/multi-cluster-apps/)
* [Applications deployed in a specific Project]({{< baseurl >}}/rancher/v2.x/en/catalog/apps)
