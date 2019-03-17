---
title: "6. Configure Rancher System Charts"
weight: 600
aliases:
---

## A. Prepare System Charts

The [System Charts](https://github.com/rancher/system-charts) contains all the catalog items required for features such as moniotring, logging, alerting and global DNS. To keep these features working, you will need to make that the `rancher/rancher` container can either access `https://git.rancher.io/system-charts.git` or that you configure the system charts to be updated from your own mirrored Git repository.

## B. Configure System Charts

Rancher needs to be configured to use the mirrored Git repository if the `rancher/rancher` container cannot access `https://git.rancher.io/system-charts.git`

1. Log into Rancher.

1. Open `https://<your-rancher-server>/v3/catalogs/system-library` in your browser.

    ![Open]({{< baseurl >}}/img/rancher/airgap/system-charts-setting.png)

1. Click **Edit** on the upper right corner and update the **url**.

    ![Update]({{< baseurl >}}/img/rancher/airgap/system-charts-update.png)

1. Click **Show Request**

1. Click **Send Request**
