---
title: Rolling Back Workloads
weight: 3027
aliases:
  - /rancher/v2.5/en/tasks/workloads/rollback-workloads/
  - /rancher/v2.5/en/k8s-in-rancher/workloads/rollback-workloads
---

Sometimes there is a need to rollback to the previous version of the application, either for debugging purposes or because an upgrade did not go as planned.

1. From the **Global** view, open the project running the workload you want to rollback.

1. Find the workload that you want to rollback and select **Vertical &#8942; (... ) > Rollback**.

1. Choose the revision that you want to roll back to. Click **Rollback**.

**Result:** Your workload reverts to the previous version that you chose. Wait a few minutes for the action to complete.
