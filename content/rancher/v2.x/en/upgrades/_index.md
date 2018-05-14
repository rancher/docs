---
title: Upgrades
weight: 1000
draft: true
---
- Upgrading from Rancher 2.x.x

	All Rancher 2.x.x will support upgrades from a previous version.  This section will be updated as soon as the first release post 2.0 is available.

- Migrating from Rancher 1.6.x

    By embarking on the Rancher 2.0 project, all of the legacy Rancher 1.6 Java modules were completely rewritten in Go, and in the process touched just about every other module in the system. As such, there will not be a direct upgrade  from 1.6.x to 2.0.

    Our next major milestone will be our 2.1 release that will include a tool that will convert Rancher Compose to Kubernetes YAML.  This will help our existing Cattle users from having to start the migration from scratch.  However, we know the biggest challenge will be having to leverage Cattle functionality in a Kubernetes environment as you deploy new workloads.  We plan to also release a guide that will act as a cheatsheet for those that enjoy Cattle's simplicity and want to quickly create those workloads in Kubernetes.

     We do plan to continue to support Rancher 1.6.x for at least another year after 2.1 has been released to give our users time to plan this migration.
