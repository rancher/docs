---
title: Configure Alerts for Periodic Scan on a Schedule
weight: 8
---

It is possible to run a ClusterScan on a schedule.

A scheduled scan can also specify if you should receive alerts when the scan completes.

Alerts are supported only for a scan that runs on a schedule.

The CIS Benchmark application supports two types of alerts:

- Alert on scan completion: This alert is sent out when the scan run finishes. The alert includes details including the ClusterScan's name and the ClusterScanProfile name.
- Alert on scan failure: This alert is sent out if there are some test failures in the scan run or if the scan is in a `Fail` state.

:::note Prerequisite

Before enabling alerts for `rancher-cis-benchmark`, make sure to install the `rancher-monitoring` application and configure the Receivers and Routes. For more information, see [this section.](monitoring-alertincis-scans/configuration)

While configuring the routes for `rancher-cis-benchmark` alerts, you can specify the matching using the key-value pair `job: rancher-cis-scan`. An example route configuration is [here.](monitoring-alertincis-scans/configuration/receiver/#example-route-config-for-cis-scan-alerts)

:::

To configure alerts for a scan that runs on a schedule,

1. Please enable alerts on the `rancher-cis-benchmark` application (#enabling-alerting-for-rancher-cis-benchmark)
1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to run a CIS scan and click **Explore**.
1. Click **CIS Benchmark > Scan**.
1. Click **Create**.
1. Choose a cluster scan profile. The profile determines which CIS Benchmark version will be used and which tests will be performed. If you choose the Default profile, then the CIS Operator will choose a profile applicable to the type of Kubernetes cluster it is installed on.
1. Choose the option **Run scan on a schedule**.
1. Enter a valid [cron schedule expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) in the field **Schedule**.
1. Check the boxes next to the Alert types under **Alerting**.
1. Optional: Choose a **Retention Count**, which indicates the number of reports maintained for this recurring scan. By default this count is 3. When this retention limit is reached, older reports will get purged.
1. Click **Create**.

**Result:** The scan runs and reschedules to run according to the cron schedule provided. Alerts are sent out when the scan finishes if routes and receiver are configured under `rancher-monitoring` application.

A report is generated with the scan results every time the scan runs. To see the latest results, click the name of the scan that appears.