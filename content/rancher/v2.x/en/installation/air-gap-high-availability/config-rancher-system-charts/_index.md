---
title: "5. Configure Rancher System Charts"
weight: 600
aliases:
    - /rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-for-private-reg/
---

# A. Prepare System Charts

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. To be able to use these features in an air gap install, you will need to mirror the `system-charts` repository to a location in your network that Rancher can reach and configure Rancher to use that repository.

Refer to the release notes in the `system-charts` repository to see which branch corresponds to your version of Rancher.

# B. Configure System Charts

Rancher needs to be configured to use your Git mirror of the `system-charts` repository. You can configure the system charts repository either from the Rancher UI or from Rancher's API view.

### Configuring the Registry from the Rancher UI

In the catalog management page in the Rancher UI, follow these steps: 

1. Go to the **Global** view.

1. Click **Tools > Catalogs.**

1. The system chart is displayed under the name `system-library`. To edit the configuration of the system chart, click **Ellipsis (...) > Edit.**

1. In the **Catalog URL** field, enter the location of the Git mirror of the `system-charts` repository.

1. Click **Save.**

**Result:** Rancher is configured to download all the required catalog items from your `system-charts` repository.

### Configuring the Registry in Rancher's API View

1. Log into Rancher.

1. Open `https://<your-rancher-server>/v3/catalogs/system-library` in your browser.

    ![Open]({{< baseurl >}}/img/rancher/airgap/system-charts-setting.png)

1. Click **Edit** on the upper right corner and update the value for **url** to the location of the Git mirror of the `system-charts` repository.

    ![Update]({{< baseurl >}}/img/rancher/airgap/system-charts-update.png)

1. Click **Show Request**

1. Click **Send Request**

**Result:** Rancher is configured to download all the required catalog items from your `system-charts` repository.

### Finishing Up

That's it. You should have a functional Rancher server. Point a browser at the hostname you picked and you should be greeted by the colorful login page.

Doesn't work? Take a look at the [Troubleshooting]({{< baseurl >}}/rancher/v2.x/en/installation/troubleshooting/) Page.