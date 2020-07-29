---
title: Rolling Back the Rancher Helm Chart
weight: 1
---

> This page is under construction.

If you upgrade Rancher and the upgrade does not complete successfully, you may need to [restore Rancher from backup.](../../backups/restores)

Restoring a snapshot of the Rancher Server cluster will revert Rancher to the version and state at the time of the snapshot.

>**Note:** Managed clusters are authoritative for their state. This means restoring the rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.
