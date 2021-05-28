---
title: Setting up Local System Charts for Air Gapped Installations
weight: 120
aliases:
  - /rancher/v2.5/en/installation/air-gap-single-node/config-rancher-system-charts/_index.md
  - /rancher/v2.5/en/installation/air-gap-high-availability/config-rancher-system-charts/_index.md
  - /rancher/v2.5/en/installation/options/local-system-charts
---

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS.

In an air gapped installation of Rancher, you will need to configure Rancher to use a local copy of the system charts. This section describes how to use local system charts using a CLI flag.

# Using Local System Charts

A local copy of `system-charts` has been packaged into the `rancher/rancher` container. To be able to use these features in an air gap install, you will need to run the Rancher install command with an extra environment variable, `CATTLE_SYSTEM_CATALOG=bundled`, which tells Rancher to use the local copy of the charts instead of attempting to fetch them from GitHub.

Example commands for a Rancher installation with a bundled `system-charts` are included in the [air gap Docker installation]({{<baseurl>}}/rancher/v2.5/en/installation/air-gap-single-node/install-rancher) instructions and the [air gap Kubernetes installation]({{<baseurl>}}/rancher/v2.5/en/installation/air-gap-high-availability/install-rancher/) instructions.

