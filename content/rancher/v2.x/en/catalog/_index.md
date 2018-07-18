---
title: Catalogs and Charts
weight: 4000
aliases:
  - /rancher/v2.x/en/concepts/global-configuration/catalog/
  - /rancher/v2.x/en/concepts/catalogs/
  - /rancher/v2.x/en/tasks/global-configuration/catalog/
  - /rancher/v2.x/en/tasks/global-configuration/catalog/enabling-default-catalogs/
  - /rancher/v2.x/en/tasks/global-configuration/catalog/adding-custom-catalogs/
---

Rancher provides a catalog of charts that make it easy to repeatedly deploy any applications.

_Catalogs_ are GitHub repositories filled with applications that are ready-made for deployment. Applications are bundled in objects called _charts_.

_Charts_ are a packaging format popularized by [Helm](https://docs.helm.sh/). Think of them as templates for deployments. Per Helm, charts are:

>A collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on.

Rancher improves on Helm catalogs and charts. All native Helm charts can work within Rancher, but Rancher adds several enhancements to improve their user experience.

## Enabling Built-in Catalogs

Within Rancher, there are default catalogs packaged as part of Rancher. These can be enabled or disabled by an administrator.

1. From the **Global** view, choose **Catalogs** from the main menu.
2. Toggle the default catalogs that you want use to a setting of **Enabled**.

    - **Library**

    	The Library Catalog includes charts curated by Rancher. Rancher stores charts in a Git repository to expedite the fetch and update of charts. In Rancher 2.0, only global catalogs are supported. Support for cluster-level and project-level charts will be added in the future.

    	This catalog features Rancher Charts, which include some [notable advantages](#chart-types) over native Helm charts.

    - **Helm Stable**

    	This catalog, , which is maintained by the Kubernetes community, includes native [Helm charts](https://github.com/kubernetes/helm/blob/master/docs/chart_template_guide/getting_started.md). This catalog features the largest pool of apps.

    - **Helm Incubator**

    	Similar in user experience to Helm Stable, but this catalog is filled with applications in **beta**.

 **Result**: The chosen catalogs are enabled. Wait a few minutes for Rancher to replicate the catalog charts. When replication completes, you'll be able to see them in any of your projects by selecting **Catalog Apps** from the main menu.

## Adding Custom Catalogs

Adding a catalog is as simple as adding a catalog name, a URL and a branch name. The URL needs to be one that `git clone` [can handle](https://git-scm.com/docs/git-clone#_git_urls_a_id_urls_a) and must end in `.git`. The branch name must be a branch that is in your catalog URL. If no branch name is provided, it will use the `master` branch by default. Whenever you add a catalog to Rancher, it will be available immediately.

>**Notes:**
>
>- Currently, you can only add custom catalogs to Rancher at the global level. Therefore, any catalog that you add is shared with all clusters and projects.
>
>- Currently, only unauthenticated catalogs are supported.
<br/>
<br/>

<!--There are two types of catalogs that can be added into Rancher. There are global catalogs and project catalogs. In a global catalog, the catalog templates are available in *all* projects. In a project catalog, the catalog charts are only available in the project that the catalog is added to.

An [admin]({{< baseurl >}}/rancher/v2.x/en/admin-settings/#global-Permissions) of Rancher has the ability to add or remove catalogs globally in Rancher.

NEEDS TO BE FIXED FOR 2.0: Any [users]({{site.baseurl}}/rancher/{{page.version}}/{{page.lang}}/configuration/accounts/#account-types) of a Rancher environment has the ability to add or remove environment catalogs in their respective Rancher environment in **Catalog** -> **Manage**.
 -->

 1. From the **Global** view, choose **Catalogs** from the main menu.
 2. Click **Add Catalog**.
 3. Complete the form and click **Create**.

 **Result**: Your catalog is added to Rancher.

## Launching Catalog Applications

After you've either enabled the built-in catalogs or added your own custom catalog, you can start launching any catalog application.

1. From the **Global** view, open the project that you want to deploy to.

2. From the main menu, choose **Catalog Apps**. Then click **Launch**.

3. Find the app that you want to launch, and then click **View Now**.

4. Under **Configuration Options** enter a **Name**. By default, this name is also used to create a Kubernetes namespace for the application.

    * If you would like to change the **Namespace**, click **Customize** and enter a new name.
    * If you want to use a different namespace that already exists, click **Customize**, and then click **Use an existing namespace**. Choose a namespace from the list.

5. Select a **Template Version**.

6. Complete the rest of the **Configuration Options**.

    * For native Helm charts (i.e., charts from the **Helm Stable** or **Helm Incubator** catalogs), answers are provided as key value pairs in the **Answers** section.
    * Keys and values are available within **Detailed Descriptions**.

7. Review the files in **Preview**. When you're satisfied, click **Launch**.

**Result**: Your application is deployed to your chosen namespace. You can view the application status from the project's:

- **Workloads** view
- **Catalog Apps** view
