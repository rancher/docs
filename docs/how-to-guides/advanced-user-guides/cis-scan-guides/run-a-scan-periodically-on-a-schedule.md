---
title: Run a Scan Periodically on a Schedule
weight: 4
---

To run a ClusterScan on a schedule,

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to run a CIS scan and click **Explore**.
1. Click **CIS Benchmark > Scan**.
1. Choose a cluster scan profile. The profile determines which CIS Benchmark version will be used and which tests will be performed. If you choose the Default profile, then the CIS Operator will choose a profile applicable to the type of Kubernetes cluster it is installed on.
1. Choose the option **Run scan on a schedule**.
1. Enter a valid <a href="https://en.wikipedia.org/wiki/Cron#CRON_expression" target="_blank">cron schedule expression</a> in the field **Schedule**.
1. Choose a **Retention** count, which indicates the number of reports maintained for this recurring scan. By default this count is 3. When this retention limit is reached, older reports will get purged.
1. Click **Create**.

**Result:** The scan runs and reschedules to run according to the cron schedule provided. The **Next Scan** value indicates the next time this scan will run again. 

A report is generated with the scan results every time the scan runs. To see the latest results, click the name of the scan that appears.

You can also see the previous reports by choosing the report from the **Reports** dropdown on the scan detail page.