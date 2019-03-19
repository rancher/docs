---
title: Adding Custom Catalogs
weight: 4005
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/adding-custom-catalogs/
---

[Custom catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/custom/) can be added into Rancher at any [scope of Rancher]({{< baseurl >}}/rancher/v2.x/en/catalog/#catalog-scope).

## Adding Global Catalogs

>**Prerequisites:** In order to manage the [built-in catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/built-in/) or [manage global catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/custom-adding/#adding-global-catalogs), you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Catalogs]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/#global-permissions-reference) role assigned.

 1. From the **Global** view, choose **Tools > Catalogs** in the navigation bar. In versions prior to v2.2.0, you can select **Catalogs** directly in the navigation bar.
 2. Click **Add Catalog**.
 3. Complete the form and click **Create**.

 **Result**: Your custom global catalog is added to Rancher. Once it is in `Active` state, it has completed synchronization and you will be able to start deploying [multi-cluster apps]({{< baseurl >}}/rancher/v2.x/en/catalog/multi-cluster-apps/) or [applications in any project]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) from this catalog.

## Adding Cluster Catalogs

_Available as of v2.2.0_

>**Prerequisites:** In order to [manage cluster scoped catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/custom-adding/#adding-cluster-catalogs), you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/)
>- [Cluster Owner Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles)
>- [Custom Cluster Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) with the [Manage Cluster Catalogs]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-role-reference) role assigned.

1. From the **Global** view, navigate to your cluster that you want to start adding custom catalogs.
2. Choose the **Tools > Catalogs** in the navigation bar.
2. Click **Add Catalog**.
3. Complete the form. By default, the form will provide the ability to select `Scope` of the catalog. When you have added a catalog from the **Cluster** scope, it is defaulted to `Cluster`.
5. Click **Create**.

**Result**: Your custom cluster catalog is added to Rancher. Once it is in `Active` state, it has completed synchronization and you will be able to start deploying  [applications in any project in that cluster]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) from this catalog.

## Adding Project Level Catalogs

_Available as of v2.2.0_

>**Prerequisites:** In order to [manage project scoped catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog/custom-adding/#adding-project-catalogs), you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/)
>- [Cluster Owner Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles)
>- [Project Owner Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-roles)
>- [Custom Project Permissions]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) with the [Manage Project Catalogs]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-role-reference) role assigned.

1. From the **Global** view, navigate to your project that you want to start adding custom catalogs.
2. Choose the **Tools > Catalogs** in the navigation bar.
2. Click **Add Catalog**.
3. Complete the form. By default, the form will provide the ability to select `Scope` of the catalog. When you have added a catalog from the **Project** scope, it is defaulted to `Cluster`.
5. Click **Create**.

**Result**: Your custom project catalog is added to Rancher. Once it is in `Active` state, it has completed synchronization and you will be able to start deploying  [applications in that project]({{< baseurl >}}/rancher/v2.x/en/catalog/apps/) from this catalog.
