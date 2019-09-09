---
title: Local System Charts for Air Gap Installations
weight: 1120
---

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. As of Rancher v2.3.0, a local copy of `system-charts` has been packaged into the `rancher/rancher` container. To be able to use these features in an air gap install, you will need to run the Rancher install command with an extra environment variable, `CATTLE_SYSTEM_CATALOG=bundled`, which tells Rancher to use the local copy of the charts instead of attempting to fetch them from GitHub.

Example commands for a Rancher installation with a bundled `system-charts` are included in the [air gap single node installation]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap-single-node/install-rancher) instructions and the [air gap high availability installation]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap-high-availability/install-rancher/#c-install-rancher) instructions.

Local system charts can also be used to provision custom clusters in air gap environments. You can use the `CATTLE_SYSTEM_CATALOG=bundled` option when you [install the Rancher agent]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/agent-options) on a node to add it to a custom cluster.
