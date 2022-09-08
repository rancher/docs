---
title: Persistent Grafana Dashboards
weight: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To allow the Grafana dashboard to persist after the Grafana instance restarts, add the dashboard configuration JSON into a ConfigMap. ConfigMaps also allow the dashboards to be deployed with a GitOps or CD based approach. This allows the dashboard to be put under version control.

- [Creating a Persistent Grafana Dashboard](#creating-a-persistent-grafana-dashboard)
- [Known Issues](#known-issues)

# Creating a Persistent Grafana Dashboard

<Tabs>
<TabItem value="Rancher v2.5.8+">

:::note Prerequisites:

- The monitoring application needs to be installed.
- To create the persistent dashboard, you must have at least the **Manage Config Maps** Rancher RBAC permissions assigned to you in the project or namespace that contains the Grafana Dashboards. This correlates to the `monitoring-dashboard-edit` or `monitoring-dashboard-admin` Kubernetes native RBAC Roles exposed by the Monitoring chart.
- To see the links to the external monitoring UIs, including Grafana dashboards, you will need at least a [project-member role.](../../../explanations/integrations-in-rancher/monitoring-and-alerting/rbac-for-monitoring.md#users-with-rancher-cluster-manager-based-permissions)

:::

### 1. Get the JSON model of the dashboard that you want to persist

To create a persistent dashboard, you will need to get the JSON model of the dashboard you want to persist. You can use a premade dashboard or build your own.

To use a premade dashboard, go to [https://grafana.com/grafana/dashboards](https://grafana.com/grafana/dashboards), open up its detail page, and click on the **Download JSON** button to get the JSON model for the next step.

To use your own dashboard:

1. Click on the link to open Grafana. On the cluster detail page, click **Monitoring**.
1. Log in to Grafana. Note: The default Admin username and password for the Grafana instance is `admin/prom-operator`. Alternative credentials can also be supplied on deploying or upgrading the chart.

    :::note

    Regardless of who has the password, in order to access the Grafana instance, you still need at least the <b>Manage Services</b> or <b>View Monitoring</b> permissions in the project that Rancher Monitoring is deployed into. Alternative credentials can also be supplied on deploying or upgrading the chart.

    :::

1. Create a dashboard using Grafana's UI. Once complete, go to the dashboard's settings by clicking on the gear icon in the top navigation menu. In the left navigation menu, click **JSON Model**.
1. Copy the JSON data structure that appears.

### 2. Create a ConfigMap using the Grafana JSON model

Create a ConfigMap in the namespace that contains your Grafana Dashboards (e.g. cattle-dashboards by default).

The ConfigMap should look like this:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    grafana_dashboard: "1"
  name: <dashboard-name>
  namespace: cattle-dashboards # Change if using a non-default namespace
data:
  <dashboard-name>.json: |-
    <copied-json>
```

By default, Grafana is configured to watch all ConfigMaps with the `grafana_dashboard` label within the `cattle-dashboards` namespace.

To specify that you would like Grafana to watch for ConfigMaps across all namespaces, refer to [this section.](#configuring-namespaces-for-the-grafana-dashboard-configmap)

To create the ConfigMap in the Rancher UI,

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to see the visualizations and click **Explore**.
1. Click **More Resources > Core > ConfigMaps**.
1. Click **Create**.
1. Set up the key-value pairs similar to the example above. When entering the value for `<dashboard-name>.json`, click **Read from File** to upload the JSON data model as the value.
1. Click **Create**.

**Result:** After the ConfigMap is created, it should show up on the Grafana UI and be persisted even if the Grafana pod is restarted.

Dashboards that are persisted using ConfigMaps cannot be deleted or edited from the Grafana UI.

If you attempt to delete the dashboard in the Grafana UI, you will see the error message "Dashboard cannot be deleted because it was provisioned." To delete the dashboard, you will need to delete the ConfigMap.

### Configuring Namespaces for the Grafana Dashboard ConfigMap

To specify that you would like Grafana to watch for ConfigMaps across all namespaces, set this value in the `rancher-monitoring` Helm chart:

```
grafana.sidecar.dashboards.searchNamespace=ALL
```

Note that the RBAC roles exposed by the Monitoring chart to add Grafana Dashboards are still restricted to giving permissions for users to add dashboards in the namespace defined in `grafana.dashboards.namespace`, which defaults to `cattle-dashboards`.

</TabItem>
<TabItem value="Rancher before v2.5.8">

:::note Prerequisites:

- The monitoring application needs to be installed.
- You must have the cluster-admin ClusterRole permission.

:::

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to configure the Grafana namespace and click **Explore**.
1. In the left navigation bar, click **Monitoring**.
1. Click **Grafana**.
1. Log in to Grafana. Note: The default Admin username and password for the Grafana instance is `admin/prom-operator`. Alternative credentials can also be supplied on deploying or upgrading the chart.

    :::note

    Regardless of who has the password, cluster administrator permission in Rancher is still required to access the Grafana instance.

    :::

1. Go to the dashboard that you want to persist. In the top navigation menu, go to the dashboard settings by clicking the gear icon.
1. In the left navigation menu, click **JSON Model**.
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

To prevent the persistent dashboard from being deleted when Monitoring v2 is uninstalled, add the following annotation to the `cattle-dashboards` namespace:

```
helm.sh/resource-policy: "keep"
```

</TabItem>
</Tabs>

# Known Issues

For users who are using Monitoring V2 v9.4.203 or below, uninstalling the Monitoring chart will delete the `cattle-dashboards` namespace, which will delete all persisted dashboards, unless the namespace is marked with the annotation `helm.sh/resource-policy: "keep"`.

This annotation will be added by default in the new monitoring chart released by Rancher v2.5.8, but it still needs to be manually applied for users of earlier Rancher versions.
