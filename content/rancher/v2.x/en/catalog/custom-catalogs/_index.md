---
title: Adding Custom Catalogs
weight: 4015
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/adding-custom-catalogs/
---

You can create custom catalogs of charts for use in Rancher. Custom catalogs are helpful for fast deployment of applications unique to your environment.

>**Notes:**
>
>- Currently, you can only add custom catalogs to Rancher at the global level. Therefore, any catalog that you add is shared with all clusters and projects.
>
>- Currently, only unauthenticated catalogs are supported.
<br/>
<br/>

>**Prerequisites:**
>
>- Recommended: Read [Catalogs and Charts]({{< baseurl >}}/rancher/v2.x/en/catalog/).
>- Create a GitHub repository to serve as your custom catalog.


1. From the **Global** view, choose **Catalogs** from the main menu.
2. Click **Add Catalog**.
3. Complete the form and click **Create**.

**Result**: Your catalog is added to Rancher.

## What's Next?

Add native Helm charts, Rancher charts, or both to your repository. For more information, see [Customizing Charts]({{< baseurl >}}/rancher/v2.x/en/catalog/custom-charts/).
