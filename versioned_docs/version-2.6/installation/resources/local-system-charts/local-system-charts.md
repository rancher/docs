---
title: Setting up Local System Charts for Air Gapped Installations
weight: 120
---

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS.

In an air gapped installation of Rancher, you will need to configure Rancher to use a local copy of the system charts. This section describes how to use local system charts using a CLI flag.

# Using Local System Charts

A local copy of `system-charts` has been packaged into the `rancher/rancher` container. To be able to use these features in an air gap install, you will need to run the Rancher install command with an extra environment variable, `CATTLE_SYSTEM_CATALOG=bundled`, which tells Rancher to use the local copy of the charts instead of attempting to fetch them from GitHub.

Example commands for a Rancher installation with a bundled `system-charts` are included in the [air gap installation]({{<baseurl>}}/rancher/v2.6/en/installation/other-installation-methods/air-gap) instructions for Docker and Helm installs.

