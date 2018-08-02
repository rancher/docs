---
title: Upgrades and Rollbacks
weight: 150
aliases:
  - /rancher/v2.x/en/backups/rollbacks/
---

### Upgrading from Rancher 2.x.x

Each new version of Rancher 2.x.x supports upgrades from previous versions of Rancher 2.x.x.  This section will be updated as soon as the first release post 2.0 is available.

Complete one of the upgrade procedures below based on your Rancher installation:

- [Single Node Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/single-node-upgrade)
- [High Availability Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/ha-server-upgrade)
- [Air Gap Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/air-gap-upgrade)

### Rolling Back Unsuccessful Upgrades

In the event that your Rancher Server does not upgrade successfully, you can rollback to your installation prior to upgrade:

- [Single-Node Rollbacks]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/single-node-rollbacks)
- [High-Availability Rollbacks]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks)

### Migrating from Rancher 1.6.x

Until Rancher 2.1 is released, migrating to from Rancher 1.6.x to 2.x.x is not supported due to major code rewrites.

For the 2.1 release, we plan to release a tool that converts Rancher Compose to Kubernetes YAML.  This tool will help our Cattle users migrate from Rancher 1.6.x to 2.x.x.  However, we understand that there is a learning curve switching from Cattle to Kubernetes as you deploy new workloads. Therefore, this release will include a cheatsheet for those that enjoy Cattle's simplicity but want to quickly create those workloads in Kubernetes.

We will continue support for Rancher 1.6.x for a minimum of one year after the 2.1 release so that 1.6.x users can plan and complete migration.