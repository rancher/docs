---
title: Kubernetes Rollback
weight: 1025
aliases:
  - /rancher/v2.x/en/upgrades/ha-server-rollbacks
  - /rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks
---

If you upgrade Rancher and the upgrade does not complete successfully, you may need to rollback your Rancher Server to its last healthy state.

To restore Rancher prior to v2.5, follow the procedure detailed here: [Restoring Backups — Kubernetes installs]({{<baseurl>}}/rancher/v2.x/en/backups/restorations/ha-restoration)

To restore Rancher v2.5, you can use the `rancher-backup` application and restore Rancher from backup according to [this section.]({{<baseurl>}}/rancher/v2.x/en/backups/restoring-rancher/)

Restoring a snapshot of the Rancher Server cluster will revert Rancher to the version and state at the time of the snapshot.

>**Note:** Managed cluster are authoritative for their state. This means restoring the rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.
