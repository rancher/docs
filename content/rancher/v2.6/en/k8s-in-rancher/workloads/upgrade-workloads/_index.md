---
title: Upgrading Workloads
weight: 3028
---
When a new version of an application image is released on Docker Hub, you can upgrade any workloads running a previous version of the application to the new one.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to upgrade a workload and click **Explore**.
1. In the left navigation bar, click **Workload**.

1. Find the workload that you want to upgrade and select **⋮ > Edit Config**.

1. Update the **Container Image** and any options that you want to change.

1. Review and edit the workload's **Scaling and Upgrade Policy**.

    These options control how the upgrade rolls out to containers that are currently running. For example, for scalable deployments, you can choose whether you want to stop old pods before deploying new ones, or vice versa, as well as the upgrade batch size.

1. Click **Upgrade**.

**Result:** The workload begins upgrading its containers, per your specifications. Note that scaling up the deployment or updating the upgrade/scaling policy won't result in the pods recreation.
