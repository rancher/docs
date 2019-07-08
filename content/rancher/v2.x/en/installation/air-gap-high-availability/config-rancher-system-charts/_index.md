---
title: "6. Configure Rancher System Charts"
weight: 600
aliases:
---

## A. Prepare System Charts

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. To be able to use these features in an air gap install, you will need to mirror the `system-charts` repository to a location in your network that Rancher can reach and configure Rancher to use that repository.

Use the branch of `system-charts` that corresponds to your version of Rancher:

| Rancher Version | system-charts Repository Branch |
|-----------------|--------|
| v2.0.0 - v2.2.3 |	master |
| v2.2.4+ 	  | release-v2.2 |
| v2.3-alpha3 |	v2.3-preview1 |
| v2.3-alpha5 |	v2.3-preview2 |

## B. Configure System Charts

Rancher needs to be configured to use the Git mirror of the `system-charts` repository.

1. Log into Rancher.

1. Open `https://<your-rancher-server>/v3/catalogs/system-library` in your browser.

    ![Open]({{< baseurl >}}/img/rancher/airgap/system-charts-setting.png)

1. Click **Edit** on the upper right corner and update the value for **url** to the location of the Git mirror of the `system-charts` repository.

    ![Update]({{< baseurl >}}/img/rancher/airgap/system-charts-update.png)

1. Click **Show Request**

1. Click **Send Request**
