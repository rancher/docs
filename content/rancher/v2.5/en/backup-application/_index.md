---
title: Backups and Disaster Recovery
weight: 200
---

> This section is under construction.

This section is devoted to protecting your data in a disaster scenario.

To protect yourself from a disaster scenario, you should create backups on a regular basis.

We recommend using the backup/restore application to back up Rancher and to restore it from backup.

The Helm chart for the application is available as in Rancher. After you have enabled the application, you will be able to use backup templates for Rancher, Fleet, and the Enterprise Cluster Manager.

### Special Scenarios for Rollbacks

Because of the changes necessary to address [CVE-2018-20321](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-20321), special steps are necessary if the user wants to roll back to a previous version of Rancher where this vulnerability exists, so they are needed for these situations:

- Rolling back from v2.1.6+ to any version between v2.1.0 - v2.1.5 or v2.0.0 - v2.0.10.
- Rolling back from v2.0.11+ to any version between v2.0.0 - v2.0.10.  