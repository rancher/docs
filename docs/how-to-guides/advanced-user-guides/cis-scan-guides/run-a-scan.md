---
title: Run a Scan
weight: 3
---

When a ClusterScan custom resource is created, it launches a new CIS scan on the cluster for the chosen ClusterScanProfile.

:::note

There is currently a limitation of running only one CIS scan at a time for a cluster. If you create multiple ClusterScan custom resources, they will be run one after the other by the operator, and until one scan finishes, the rest of the ClusterScan custom resources will be in the "Pending" state.

:::

To run a scan,

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, go to the cluster where you want to run a CIS scan and click **Explore**.
1. Click **CIS Benchmark > Scan**.
1. Click **Create**.
1. Choose a cluster scan profile. The profile determines which CIS Benchmark version will be used and which tests will be performed. If you choose the Default profile, then the CIS Operator will choose a profile applicable to the type of Kubernetes cluster it is installed on.
1. Click **Create**.

**Result:** A report is generated with the scan results. To see the results, click the name of the scan that appears.