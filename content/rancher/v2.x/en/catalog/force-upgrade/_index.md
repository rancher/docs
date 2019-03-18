---
title: Force Upgrade Catalog Apps
weight: 4040
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/force-upgrade-catalog-apps/
---

_Available as of v2.2.0_

In Kubernetes, some fields are designed to be immutable or cannot be updated directly. Force upgrade will force Rancher catalog apps to delete and recreate resources if needed during the upgrade.


### How to Force-upgrade Catalog Apps

For both upgrade and rollback, you can select the `Delete and recreate resources if needed during the upgrade` checkbox at the bottom of the catalog app details page to force-upgrade the app.

![force-upgrade.png]({{< baseurl >}}/img/rancher/catalog/force-upgrade.png)
