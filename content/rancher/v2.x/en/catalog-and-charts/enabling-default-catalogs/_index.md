---
title: Enabling Default Catalogs
weight: 4005
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/enabling-default-catalogs/
---

Out-of-the-box, you can enable several different catalog repositories to simplify deployment of applications.

1. From the **Global** view, choose **Catalogs** from the main menu.
2. Toggle the default catalogs that you want use to a setting of **Enabled**. The [default catalogs]({{< baseurl >}}/rancher/v2.x/en/concepts/catalogs/#catalog-types) are:

    - **Library**
    - **Helm Stable**
    - **Helm Incubator**

    >**Note:** If you want to use a custom catalog, see [Adding Custom Catalogs]({{< baseurl >}}/rancher/v2.x/en/catalog-and-charts/adding-custom-catalogs) instead of this topic.

**Result:** The chosen catalogs are enabled. Wait a few minutes for Rancher to replicate the catalog charts. When replication completes, you'll be able to see them in any of your projects by selecting **Catalog Apps** from the main menu.

## What's Next?

Deploy catalog applications to your cluster nodes. For more information, see [Launching a Catalog App]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/launch-a-catalog-app).
