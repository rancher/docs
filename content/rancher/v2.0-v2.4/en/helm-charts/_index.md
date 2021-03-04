---
title: Helm Charts in Rancher
weight: 12
description: Rancher enables the use of catalogs to repeatedly deploy applications easily. Catalogs are GitHub or Helm Chart repositories filled with deployment-ready apps.
aliases:
  - /rancher/v2.0-v2.4/en/concepts/global-configuration/catalog/
  - /rancher/v2.0-v2.4/en/concepts/catalogs/
  - /rancher/v2.0-v2.4/en/tasks/global-configuration/catalog/
  - /rancher/v2.0-v2.4/en/catalog
  - /rancher/v2.0-v2.4/en/catalog/apps
---

Rancher provides the ability to use a catalog of Helm charts that make it easy to repeatedly deploy applications.

- **Catalogs** are GitHub repositories or Helm Chart repositories filled with applications that are ready-made for deployment. Applications are bundled in objects called _Helm charts_.
- **Helm charts** are a collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

Rancher improves on Helm catalogs and charts. All native Helm charts can work within Rancher, but Rancher adds several enhancements to improve their user experience.

This section covers the following topics:

- [Catalog scopes](#catalog-scopes)
- [Catalog Helm Deployment Versions](#catalog-helm-deployment-versions)
- [When to use Helm 3](#when-to-use-helm-3)
- [Helm 3 Backwards Compatibility](#helm-3-backwards-compatibility)
- [Built-in global catalogs](#built-in-global-catalogs)
- [Custom catalogs](#custom-catalogs)
- [Creating and launching applications](#creating-and-launching-applications)
- [Chart compatibility with Rancher](#chart-compatibility-with-rancher)
- [Global DNS](#global-dns)

# Catalog Scopes

Within Rancher, you can manage catalogs at three different scopes. Global catalogs are shared across all clusters and project. There are some use cases where you might not want to share catalogs between different clusters or even projects in the same cluster. By leveraging cluster and project scoped catalogs, you will be able to provide applications for specific teams without needing to share them with all clusters and/or projects.

Scope |  Description | Available As of |
--- |  --- | --- |
Global | All clusters and all projects can access the Helm charts in this catalog | v2.0.0 |
Cluster | All projects in the specific cluster can access the Helm charts in this catalog | v2.2.0 |
Project | This specific cluster can access the Helm charts in this catalog |  v2.2.0 |

# Catalog Helm Deployment Versions

_Applicable as of v2.4.0_

In November 2019, Helm 3 was released, and some features were deprecated or refactored. It is not fully [backwards compatible]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/#helm-3-backwards-compatibility) with Helm 2. Therefore, catalogs in Rancher need to be separated, with each catalog only using one Helm version. This will help reduce app deployment issues as your Rancher users will not need to know which version of your chart is compatible with which Helm version - they can just select a catalog, select an app and deploy a version that has already been vetted for compatibility.

When you create a custom catalog, you will have to configure the catalog to use either Helm 2 or Helm 3. This version cannot be changed later. If the catalog is added with the wrong Helm version, it will need to be deleted and re-added.

When you launch a new app from a catalog, the app will be managed by the catalog's Helm version. A Helm 2 catalog will use Helm 2 to manage all of the apps, and a Helm 3 catalog will use Helm 3 to manage all apps.

By default, catalogs are assumed to be deployed using Helm 2. If you run an app in Rancher before v2.4.0, then upgrade to Rancher v2.4.0+, the app will still be managed by Helm 2. If the app was already using a Helm 3 Chart (API version 2) it will no longer work in v2.4.0+. You must either downgrade the chart's API version or recreate the catalog to use Helm 3.

Charts that are specific to Helm 2 should only be added to a Helm 2 catalog, and Helm 3 specific charts should only be added to a Helm 3 catalog.

# When to use Helm 3

_Applicable as of v2.4.0_

- If you want to ensure that the security permissions are being pulled from the kubeconfig file
- If you want to utilize apiVersion `v2` features such as creating a library chart to reduce code duplication, or moving your requirements from the `requirements.yaml` into the `Chart.yaml`

Overall Helm 3 is a movement towards a more standardized Kubernetes feel. As the Kubernetes community has evolved, standards and best practices have as well. Helm 3 is an attempt to adopt those practices and streamline how charts are maintained.

# Helm 3 Backwards Compatibility

_Applicable as of v2.4.0_

With the use of the OpenAPI schema to validate your rendered templates in Helm 3, you will find charts that worked in Helm 2 may not work in Helm 3. This will require you to update your chart templates to meet the new validation requirements. This is one of the main reasons support for Helm 2 and Helm 3 was provided starting in Rancher 2.4.x, as not all charts can be deployed immediately in Helm 3.

Helm 3 does not create a namespace for you, so you will have to provide an existing one. This can cause issues if you have integrated code with Helm 2, as you will need to make code changes to ensure a namespace is being created and passed in for Helm 3. Rancher will continue to manage namespaces for Helm to ensure this does not impact your app deployment.  

apiVersion `v2` is now reserved for Helm 3 charts. This apiVersion enforcement could cause issues as older versions of Helm 2 did not validate the apiVersion in the `Chart.yaml` file. In general, your Helm 2 chart’s apiVersion should be set to `v1` and your Helm 3 chart’s apiVersion should be set to `v2`. You can install charts with apiVersion `v1` with Helm 3, but you cannot install `v2` charts into Helm 2.

# Built-in Global Catalogs

Within Rancher, there are default catalogs packaged as part of Rancher. These can be enabled or disabled by an administrator. For details, refer to the section on managing [built-in global catalogs.]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/built-in)

# Custom Catalogs

There are two types of catalogs in Rancher: [Built-in global catalogs]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/built-in/) and [custom catalogs.]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/adding-catalogs/)

Any user can create custom catalogs to add into Rancher.  Custom catalogs can be added into Rancher at the global level, cluster level, or project level. For details, refer to the [section on adding custom catalogs]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/adding-catalogs) and the [catalog configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/catalog-config)

# Creating and Launching Applications

In Rancher, applications are deployed from the templates in a catalog. This section covers the following topics:

* [Multi-cluster applications]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/multi-cluster-apps/)
* [Creating catalog apps]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/creating-apps)
* [Launching catalog apps within a project]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/launching-apps)
* [Managing catalog apps]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/managing-apps)
* [Tutorial: Example custom chart creation]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/tutorial)

# Chart Compatibility with Rancher

Charts now support the fields `rancher_min_version` and `rancher_max_version` in the [`questions.yml` file](https://github.com/rancher/integration-test-charts/blob/master/charts/chartmuseum/v1.6.0/questions.yml) to specify the versions of Rancher that the chart is compatible with. When using the UI, only app versions that are valid for the version of Rancher running will be shown. API validation is done to ensure apps that don't meet the Rancher requirements cannot be launched. An app that is already running will not be affected on a Rancher upgrade if the newer Rancher version does not meet the app's requirements.

# Global DNS

_Available as v2.2.0_

When creating applications that span multiple Kubernetes clusters, a Global DNS entry can be created to route traffic to the endpoints in all of the different clusters. An external DNS server will need be programmed to assign a fully qualified domain name (a.k.a FQDN) to your application. Rancher will use the FQDN you provide and the IP addresses where your application is running to program the DNS. Rancher will gather endpoints from all the Kubernetes clusters running your application and program the DNS.

For more information on how to use this feature, see [Global DNS]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/globaldns/).
