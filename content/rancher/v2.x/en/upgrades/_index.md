---
title: Upgrades and Rollbacks
weight: 150
aliases:
  - /rancher/v2.x/en/backups/rollbacks/
---

### Upgrading Rancher 2.x

- [Upgrades]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/)

### Rolling Back Unsuccessful Upgrades

In the event that your Rancher Server does not upgrade successfully, you can rollback to your installation prior to upgrade:

- [Single-Node Rollbacks]({{< baseurl >}}/rancher/v2.x/en/upgrades/single-node-rollbacks)
- [High-Availability Rollbacks]({{< baseurl >}}/rancher/v2.x/en/upgrades/ha-server-rollbacks)

### Migrating from Rancher 1.6.x

Since the underlying orchestration engine in Rancher is now Kubernetes, moving from 1.6 to 2.x is a migration process.

In general, we recommend creating a 2.x instance in parallel with your 1.6 instance. Launch new Kubernetes clusters for your workloads and migrate your workloads when they are ready. When all workloads are migrated retire the 1.6 instance and clusters.

See our [From Cattle to K8s](https://rancher.com/tags/cattle-to-k8s/) series of articles for tools and information to help you update your workloads to run on Rancher 2.x and Kubernetes.

We will continue support for Rancher 1.6.x for a minimum of one year after the 2.1 release so that 1.6.x users can plan and complete migration.