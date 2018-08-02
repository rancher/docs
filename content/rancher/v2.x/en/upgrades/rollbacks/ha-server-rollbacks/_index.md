---
title: Rolling Back—High Availability Installs
weight: 200
aliases:
  - /rancher/v2.x/en/backups/rollbacks/ha-server-rollbacks/
---

If you upgrade Rancher, but the upgrade does not complete successfully, you may need to roll back your Rancher Server to its last healthy state before upgrade.

To restore Rancher follow the procedure detailed here: [Restoring Backups — High Availability Installs](/rancher/v2.x/en/backups/restorations/ha-restoration)

Restoring a snapshot of the Rancher Server cluster will revert Rancher to the version and state at the time of the snapshot.

> **NOTE:** Managed cluster are authoritative for their state. This means that restoring the rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.
