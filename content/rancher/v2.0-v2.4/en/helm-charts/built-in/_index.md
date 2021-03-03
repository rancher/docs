---
title: Enabling and Disabling Built-in Global Catalogs
weight: 100
aliases:
  - /rancher/v2.0-v2.4/en/tasks/global-configuration/catalog/enabling-default-catalogs/
  - /rancher/v2.0-v2.4/en/catalog/built-in
  - /rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/built-in
---

There are default global catalogs packaged as part of Rancher.

Within Rancher, there are default catalogs packaged as part of Rancher. These can be enabled or disabled by an administrator. 

>**Prerequisites:** In order to manage the built-in catalogs or manage global catalogs, you need _one_ of the following permissions:
>
>- [Administrator Global Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/)
>- [Custom Global Permissions]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/#custom-global-permissions) with the [Manage Catalogs]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/#custom-global-permissions-reference) role assigned.

1. From the **Global** view, choose **Tools > Catalogs** in the navigation bar. In versions before v2.2.0, you can select **Catalogs** directly in the navigation bar.

2. Toggle the default catalogs that you want to be enabled or disabled:

    - **Library:**	The Library Catalog includes charts curated by Rancher. Rancher stores charts in a Git repository to expedite the fetch and update of charts. This catalog features Rancher Charts, which include some [notable advantages]({{<baseurl>}}/rancher/v2.0-v2.4/en/helm-charts/legacy-catalogs/creating-apps/#rancher-charts) over native Helm charts.
    - **Helm Stable:** This catalog, which is maintained by the Kubernetes community, includes native [Helm charts](https://helm.sh/docs/chart_template_guide/). This catalog features the largest pool of apps.
    - **Helm Incubator:** Similar in user experience to Helm Stable, but this catalog is filled with applications in **beta**.

 **Result**: The chosen catalogs are enabled. Wait a few minutes for Rancher to replicate the catalog charts. When replication completes, you'll be able to see them in any of your projects by selecting **Apps** from the main navigation bar. In versions before v2.2.0, within a project, you can select **Catalog Apps** from the main navigation bar.
