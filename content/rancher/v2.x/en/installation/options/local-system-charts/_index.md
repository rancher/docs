---
title: Local System Charts for Air Gap Installations
weight: 1120
aliases:
  - /rancher/v2.x/en/installation/air-gap-single-node/config-rancher-system-charts/_index.md
  - /rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-system-charts/_index.md
---

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS.

In an air gapped installation of Rancher, you will need to configure Rancher to use a local copy of the system charts. This section describes how to use local system charts using a CLI flag in Rancher v2.3.0, and using a Git mirror for Rancher versions prior to v2.3.0.

# Using Local System Charts in Rancher v2.3.0

In Rancher v2.3.0, a local copy of `system-charts` has been packaged into the `rancher/rancher` container. To be able to use these features in an air gap install, you will need to run the Rancher install command with an extra environment variable, `CATTLE_SYSTEM_CATALOG=bundled`, which tells Rancher to use the local copy of the charts instead of attempting to fetch them from GitHub.

Example commands for a Rancher installation with a bundled `system-charts` are included in the [air gap single node installation]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap-single-node/install-rancher) instructions and the [air gap high availability installation]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap-high-availability/install-rancher/#c-install-rancher) instructions.

# Setting Up System Charts for Rancher Prior to v2.3.0

### A. Prepare System Charts

The [System Charts](https://github.com/rancher/system-charts) repository contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. To be able to use these features in an air gap install, you will need to mirror the `system-charts` repository to a location in your network that Rancher can reach and configure Rancher to use that repository.

Refer to the release notes in the `system-charts` repository to see which branch corresponds to your version of Rancher.

### B. Configure System Charts

Rancher needs to be configured to use your Git mirror of the `system-charts` repository. You can configure the system charts repository either from the Rancher UI or from Rancher's API view.

{{% tabs %}}
{{% tab "Rancher UI" %}}

In the catalog management page in the Rancher UI, follow these steps: 

1. Go to the **Global** view.

1. Click **Tools > Catalogs.**

1. The system chart is displayed under the name `system-library`. To edit the configuration of the system chart, click **Ellipsis (...) > Edit.**

1. In the **Catalog URL** field, enter the location of the Git mirror of the `system-charts` repository.

1. Click **Save.**

**Result:** Rancher is configured to download all the required catalog items from your `system-charts` repository.

{{% /tab %}}
{{% tab "Rancher API" %}}

1. Log into Rancher.

1. Open `https://<your-rancher-server>/v3/catalogs/system-library` in your browser.

    ![Open]({{< baseurl >}}/img/rancher/airgap/system-charts-setting.png)

1. Click **Edit** on the upper right corner and update the value for **url** to the location of the Git mirror of the `system-charts` repository.

    ![Update]({{< baseurl >}}/img/rancher/airgap/system-charts-update.png)

1. Click **Show Request**

1. Click **Send Request**

**Result:** Rancher is configured to download all the required catalog items from your `system-charts` repository.

{{% /tab %}}
{{% /tabs %}}