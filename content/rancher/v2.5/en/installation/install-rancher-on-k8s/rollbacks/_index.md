---
title: Rollbacks
weight: 3
aliases:
  - /rancher/v2.5/en/upgrades/rollbacks
  - /rancher/v2.5/en/installation/upgrades-rollbacks/rollbacks
  - /rancher/v2.5/en/upgrades/ha-server-rollbacks
  - /rancher/v2.5/en/upgrades/rollbacks/ha-server-rollbacks
  - /rancher/v2.5/en/installation/upgrades-rollbacks/rollbacks/ha-server-rollbacks
  - /rancher/v2.5/en/installation/install-rancher-on-k8s/upgrades-rollbacks/rollbacks
---

### Rolling back to Rancher v2.5.0+

To roll back to Rancher v2.5.0+, use the `rancher-backup` application and restore Rancher from backup according to [this section.]({{<baseurl>}}/rancher/v2.5/en/backups/v2.5/restoring-rancher/) Rancher has to be started with the lower/previous version after a rollback using the Rancher backup operator.

### Rolling back to Rancher v2.2.x-v2.4.x

Follow the procedure detailed here: [Restoring Backups — Kubernetes installs]({{<baseurl>}}/rancher/v2.5/en/backups/restorations/ha-restoration) Restoring a snapshot of the Rancher Server cluster will revert Rancher to the version and state at the time of the snapshot.

For information on how to roll back Rancher installed with Docker, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/single-node-docker/single-node-rollbacks)

> Managed clusters are authoritative for their state. This means restoring the rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.
