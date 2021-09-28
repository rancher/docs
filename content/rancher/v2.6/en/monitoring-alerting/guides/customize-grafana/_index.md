---
title: Customizing Grafana Dashboards
weight: 5
---

In this section, you'll learn how to customize the Grafana dashboard to show metrics that apply to a certain container.

### Prerequisites

Before you can customize a Grafana dashboard, the `rancher-monitoring` application must be installed.

To see the links to the external monitoring UIs, including Grafana dashboards, you will need at least a [project-member role.]({{<baseurl>}}/rancher/v2.6/en/monitoring-alerting/rbac/#users-with-rancher-cluster-manager-based-permissions)

### Signing in to Grafana

1. In the Rancher UI, go to the cluster that has the dashboard you want to customize.
1. In the left navigation menu, click **Monitoring.**
1. Click **Grafana.** The Grafana dashboard should open in a new tab.
1. Go to the log in icon in the lower left corner and click **Sign In.**
1. Log in to Grafana. The default Admin username and password for the Grafana instance is `admin/prom-operator`. (Regardless of who has the password, cluster administrator permission in Rancher is still required access the Grafana instance.) Alternative credentials can also be supplied on deploying or upgrading the chart.


### Getting the PromQL Query Powering a Grafana Panel

For any panel, you can click the title and click **Explore** to get the PromQL queries powering the graphic.

For this example, we would like to get the CPU usage for the Alertmanager container, so we click **CPU Utilization > Inspect.**

The **Data** tab shows the underlying data as a time series, with the time in first column and the PromQL query result in the second column. Copy the PromQL query.
    
    ```
	(1 - (avg(irate({__name__=~"node_cpu_seconds_total|windows_cpu_time_total",mode="idle"}[5m])))) * 100

	```

You can then modify the query in the Grafana panel or create a new Grafana panel using the query. 

See also:

- [Grafana docs on editing a panel](https://grafana.com/docs/grafana/latest/panels/panel-editor/)
- [Grafana docs on adding a panel to a dashboard](https://grafana.com/docs/grafana/latest/panels/add-a-panel/)