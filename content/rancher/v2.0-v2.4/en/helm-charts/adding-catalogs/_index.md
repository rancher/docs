---
title: Creating Custom Catalogs
weight: 200
aliases:
  - /rancher/v2.0-v2.4/en/tasks/global-configuration/catalog/adding-custom-catalogs/
  - /rancher/v2.0-v2.4/en/catalog/custom/adding
  - /rancher/v2.0-v2.4/en/catalog/adding-catalogs
  - /rancher/v2.0-v2.4/en/catalog/custom/
  - /rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/adding-catalogs
---

Custom catalogs can be added into Rancher at a global scope, cluster scope, or project scope.

- [Adding catalog repositories](#adding-catalog-repositories)
  - [Add custom Git repositories](#add-custom-git-repositories)
  - [Add custom Helm chart repositories](#add-custom-helm-chart-repositories)
  - [Add private Git/Helm chart repositories](#add-private-git-helm-chart-repositories)
- [Adding global catalogs](#adding-global-catalogs)
- [Adding cluster level catalogs](#adding-cluster-level-catalogs)
- [Adding project level catalogs](#adding-project-level-catalogs)
- [Custom catalog configuration reference](#custom-catalog-configuration-reference)

# Adding Catalog Repositories

Adding a catalog is as simple as adding a catalog name, a URL and a branch name.

**Prerequisite:** An [admin]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) of Rancher has the ability to add or remove catalogs globally in Rancher.

### Add Custom Git Repositories
The Git URL needs to be one that `git clone` [can handle](https://git-scm.com/docs/git-clone#_git_urls_a_id_urls_a) and must end in `.git`. The branch name must be a branch that is in your catalog URL. If no branch name is provided, it will use the `master` branch by default. Whenever you add a catalog to Rancher, it will be available immediately.

### Add Custom Helm Chart Repositories

A Helm chart repository is an HTTP server that houses one or more packaged charts. Any HTTP server that can serve YAML files and tar files and can answer GET requests can be used as a repository server.

Helm comes with built-in package server for developer testing (helm serve). The Helm team has tested other servers, including Google Cloud Storage with website mode enabled, S3 with website mode enabled or hosting custom chart repository server using open-source projects like [ChartMuseum](https://github.com/helm/chartmuseum).

In Rancher, you can add the custom Helm chart repository with only a catalog name and the URL address of the chart repository.

### Add Private Git/Helm Chart Repositories
_Available as of v2.2.0_

Private catalog repositories can be added using credentials like Username and Password. You may also want to use the OAuth token if your Git or Helm repository server supports that.

For more information on private Git/Helm catalogs, refer to the [custom catalog configuration reference.]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/catalog-config)

 1. From the **Global** view, choose **Tools > Catalogs** in the navigation bar. In versions before v2.2.0, you can select **Catalogs** directly in the navigation bar.
 2. Click **Add Catalog**.
 3. Complete the form and click **Create**.

 **Result:** Your catalog is added to Rancher.

# Adding Global Catalogs

>**Prerequisites:** In order to manage the [built-in catalogs]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/built-in/) or manage global catalogs, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Catalogs]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) role assigned.

 1. From the **Global** view, choose **Tools > Catalogs** in the navigation bar. In versions before v2.2.0, you can select **Catalogs** directly in the navigation bar.
 2. Click **Add Catalog**.
 3. Complete the form. Select the Helm version that will be used to launch all of the apps in the catalog. For more information about the Helm version, refer to [this section.](
{{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/#catalog-helm-deployment-versions)
4. Click **Create**.

 **Result**: Your custom global catalog is added to Rancher. Once it is in `Active` state, it has completed synchronization and you will be able to start deploying [multi-cluster apps]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/multi-cluster-apps/) or [applications in any project]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/launching-apps/) from this catalog.

# Adding Cluster Level Catalogs

_Available as of v2.2.0_

>**Prerequisites:** In order to manage cluster scoped catalogs, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/)
>- [Cluster Owner Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles)
>- [Custom Cluster Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) with the [Manage Cluster Catalogs]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-role-reference) role assigned.

1. From the **Global** view, navigate to your cluster that you want to start adding custom catalogs.
2. Choose the **Tools > Catalogs** in the navigation bar.
2. Click **Add Catalog**.
3. Complete the form. By default, the form will provide the ability to select `Scope` of the catalog. When you have added a catalog from the **Cluster** scope, it is defaulted to `Cluster`. Select the Helm version that will be used to launch all of the apps in the catalog. For more information about the Helm version, refer to [this section.](
{{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/#catalog-helm-deployment-versions)
5. Click **Create**.

**Result**: Your custom cluster catalog is added to Rancher. Once it is in `Active` state, it has completed synchronization and you will be able to start deploying  [applications in any project in that cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/apps/) from this catalog.

# Adding Project Level Catalogs

_Available as of v2.2.0_

>**Prerequisites:** In order to manage project scoped catalogs, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/)
>- [Cluster Owner Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles)
>- [Project Owner Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-roles)
>- [Custom Project Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) with the [Manage Project Catalogs]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-role-reference) role assigned.

1. From the **Global** view, navigate to your project that you want to start adding custom catalogs.
2. Choose the **Tools > Catalogs** in the navigation bar.
2. Click **Add Catalog**.
3. Complete the form. By default, the form will provide the ability to select `Scope` of the catalog. When you have added a catalog from the **Project** scope, it is defaulted to `Cluster`. Select the Helm version that will be used to launch all of the apps in the catalog. For more information about the Helm version, refer to [this section.](
{{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/#catalog-helm-deployment-versions)
5. Click **Create**.

**Result**: Your custom project catalog is added to Rancher. Once it is in `Active` state, it has completed synchronization and you will be able to start deploying  [applications in that project]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/apps/) from this catalog.

# Custom Catalog Configuration Reference

Refer to [this page]({{<baseurl>}}/rancher/v2.0-v2.4/en/catalog/catalog-config) more information on configuring custom catalogs.