---
title: Force Upgrade Catalog Apps
weight: 4040
aliases:
  - /rancher/v2.x/en/tasks/global-configuration/catalog/force-upgrade-catalog-apps/
---

_Available as of v2.2.0_

Force upgrade will force Rancher catalog apps to delete and recreate resources if needed during the upgrade.


### How to Force-upgrade Catalog Apps

For both upgrade and rollback, you can select the `Delete and recreate resources if needed during the upgrade` checkbox at the bottom of the catalog app details page to force-upgrade the app.

![force-upgrade.png]({{< baseurl >}}/img/rancher/catalog/force-upgrade.png)


### When to Use The Force-upgrade and Cautions

In Kubernetes, some fields are designed to be immutable or cannot be updated directly, e.g. changing Service type from NodePort to ClusterIP will result in:
```
Error: UPGRADE FAILED: Service "docker-registry" is invalid: spec.ports[0].nodePort: Forbidden: may not be used when `type` is 'ClusterIP'
```
and `force-upgrade` will be recreating resources for immutable fields when force is applied.

>**Cautions:**
>
>- Don't force-upgrade resources that contain persistent data, e.g. Statefulset or Deployment with Bounded PVC.

