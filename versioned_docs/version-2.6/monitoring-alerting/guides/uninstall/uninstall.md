---
title: Uninstall Monitoring
weight: 2
---

1.  Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. In the left navigation bar, click **Apps & Marketplace**.
1. Click **Installed Apps**.
1. Go to the `cattle-monitoring-system` namespace and check the boxes for `rancher-monitoring-crd` and `rancher-monitoring`.
1. Click **Delete**.
1. Confirm **Delete**.

**Result:** `rancher-monitoring` is uninstalled.

> **Note on Persistent Grafana Dashboards:** For users who are using Monitoring V2 v9.4.203 or below, uninstalling the Monitoring chart will delete the cattle-dashboards namespace, which will delete all persisted dashboards, unless the namespace is marked with the annotation `helm.sh/resource-policy: "keep"`. This annotation is added by default in Monitoring V2 v14.5.100+ but can be manually applied on the cattle-dashboards namespace before an uninstall if an older version of the Monitoring chart is currently installed onto your cluster.