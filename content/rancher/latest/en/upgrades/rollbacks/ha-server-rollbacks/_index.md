---
title: Kubernetes Rollback
weight: 1025
aliases:
  - /rancher/latest/en/upgrades/ha-server-rollbacks
---

If you upgrade Rancher and the upgrade does not complete successfully, you may need to rollback your Rancher Server to its last healthy state.

To restore Rancher follow the procedure detailed here: [Restoring Backups — Kubernetes installs]({{<baseurl>}}/rancher/latest/en/backups/restorations/ha-restoration)

Restoring a snapshot of the Rancher Server cluster will revert Rancher to the version and state at the time of the snapshot.

>**Note:** Managed cluster are authoritative for their state. This means restoring the rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.
