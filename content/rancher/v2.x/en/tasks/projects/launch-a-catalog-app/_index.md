---
title: Launching a Catalog App
weight: 
draft: true
---
After you've enabled default catalogs or setup a custom catalog, you can launch apps using a catalog instead of a standard deployment. 

>**Prerequisite:** Enable a catalog. For more information, see [Catalogs and Charts]({{< baseurl >}}/rancher/v2.x/en/concepts/catalogs).

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
