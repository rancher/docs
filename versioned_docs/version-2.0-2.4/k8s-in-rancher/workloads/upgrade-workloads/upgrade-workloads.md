---
title: Upgrading Workloads
weight: 3028
aliases:
  - /rancher/v2.0-v2.4/en/tasks/workloads/upgrade-workloads/
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/upgrade-workloads
---
When a new version of an application image is released on Docker Hub, you can upgrade any workloads running a previous version of the application to the new one.

1. From the **Global** view, open the project running the workload you want to upgrade.

1. Find the workload that you want to upgrade and select **Vertical &#8942; (... ) > Edit**.

1. Update the **Docker Image** to the updated version of the application image on Docker Hub.

1. Update any other options that you want to change.

1. Review and edit the workload's **Scaling/Upgrade** policy.

    These options control how the upgrade rolls out to containers that are currently running. For example, for scalable deployments, you can choose whether you want to stop old pods before deploying new ones, or vice versa, as well as the upgrade batch size.

1. Click **Upgrade**.

**Result:** The workload begins upgrading its containers, per your specifications. Note that scaling up the deployment or updating the upgrade/scaling policy won't result in the pods recreation.
