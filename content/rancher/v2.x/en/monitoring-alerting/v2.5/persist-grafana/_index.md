---
title: Persistent Grafana Dashboards
weight: 4
---

To allow the Grafana dashboard to persist after the Grafana instance restarts, add the dashboard configuration JSON into a ConfigMap. ConfigMaps also allow the dashboards to be deployed with a GitOps or CD based approach. This allows the dashboard to be put under version control.

> **Prerequisites:**
> 
> - The monitoring application needs to be installed.
> - You must have the cluster-admin ClusterRole permission.

1. Open the Grafana dashboard. From the **Cluster Explorer,** click **Cluster Explorer > Monitoring.**
1. Log in to Grafana. Note: The default Admin username and password for the Grafana instance is `admin/prom-operator`. (Regardless of who has the password, cluster administrator permission in Rancher is still required access the Grafana instance.) Alternative credentials can also be supplied on deploying or upgrading the chart.
1. Go to the dashboard that you want to persist. In the top navigation menu, go to the dashboard settings by clicking the gear icon.
1. In the left navigation menu, click **JSON Model.**
1. Copy the JSON data structure that appears.
1. Create a ConfigMap in the `cattle-dashboards` namespace. The ConfigMap needs to have the label `grafana_dashboard: "1"`. Paste the JSON into the ConfigMap in the format shown in the example below:

    ```yaml
    apiVersion: v1
    kind: ConfigMap
    metadata:
      labels:
        grafana_dashboard: "1"
      name: <dashboard-name>
      namespace: cattle-dashboards
    data:
      <dashboard-name>.json: |-
        <copied-json>
	```

**Result:** After the ConfigMap is created, it should show up on the Grafana UI and be persisted even if the Grafana pod is restarted.

Dashboards that are persisted using ConfigMaps cannot be deleted from the Grafana UI. If you attempt to delete the dashboard in the Grafana UI, you will see the error message "Dashboard cannot be deleted because it was provisioned." To delete the dashboard, you will need to delete the ConfigMap.
