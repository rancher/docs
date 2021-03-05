---
title: CIS Scans
weight: 18
aliases:
 - /rancher/v2.0-v2.4/en/cis-scans/legacy
 - /rancher/v2.0-v2.4/en/cis-scans
---

_Available as of v2.4.0_

- [Prerequisites](#prerequisites)
- [Running a scan](#running-a-scan)
- [Scheduling recurring scans](#scheduling-recurring-scans)
- [Skipping tests](#skipping-tests)
- [Setting alerts](#setting-alerts)
- [Deleting a report](#deleting-a-report)
- [Downloading a report](#downloading-a-report)
- [List of skipped and not applicable tests](#list-of-skipped-and-not-applicable-tests)

# Prerequisites

To run security scans on a cluster and access the generated reports, you must be an [Administrator]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/global-permissions/) or [Cluster Owner.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/)

Rancher can only run security scans on clusters that were created with RKE, which includes custom clusters and clusters that Rancher created in an infrastructure provider such as Amazon EC2 or GCE. Imported clusters and clusters in hosted Kubernetes providers can't be scanned by Rancher.

The security scan cannot run in a cluster that has Windows nodes.

You will only be able to see the CIS scan reports for clusters that you have access to.

# Running a Scan

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Click **Run Scan.**
1. Choose a CIS scan profile.

**Result:** A report is generated and displayed in the **CIS Scans** page. To see details of the report, click the report's name.

# Scheduling Recurring Scans

Recurring scans can be scheduled to run on any RKE Kubernetes cluster.

To enable recurring scans, edit the advanced options in the cluster configuration during cluster creation or after the cluster has been created.

To schedule scans for an existing cluster:

1. Go to the cluster view in Rancher.
1. Click **Tools > CIS Scans.**
1. Click **Add Schedule.** This takes you to the section of the cluster editing page that is applicable to configuring a schedule for CIS scans. (This section can also be reached by going to the cluster view, clicking **&#8942; > Edit,** and going to the **Advanced Options.**)
1. In the **CIS Scan Enabled** field, click **Yes.**
1. In the **CIS Scan Profile** field, choose a **Permissive** or **Hardened** profile. The corresponding CIS Benchmark version is included in the profile name. Note: Any skipped tests [defined in a separate ConfigMap](#skipping-tests) will be skipped regardless of whether a **Permissive** or **Hardened** profile is selected. When selecting the the permissive profile, you should see which tests were skipped by Rancher (tests that are skipped by default for RKE clusters) and which tests were skipped by a Rancher user. In the hardened test profile, the only skipped tests will be skipped by users.
1. In the **CIS Scan Interval (cron)** job, enter a [cron expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) to define how often the cluster will be scanned.
1. In the **CIS Scan Report Retention** field, enter the number of past reports that should be kept.

**Result:** The security scan will run and generate reports at the scheduled intervals.

The test schedule can be configured in the `cluster.yml`:

```yaml
scheduled_cluster_scan:
    enabled: true
    scan_config:
        cis_scan_config:
            override_benchmark_version: rke-cis-1.4
            profile: permissive
    schedule_config:
        cron_schedule: 0 0 * * *
        retention: 24
```


# Skipping Tests

You can define a set of tests that will be skipped by the CIS scan when the next report is generated.

These tests will be skipped for subsequent CIS scans, including both manually triggered and scheduled scans, and the tests will be skipped with any profile.

The skipped tests will be listed alongside the test profile name in the cluster configuration options when a test profile is selected for a recurring cluster scan. The skipped tests will also be shown every time a scan is triggered manually from the Rancher UI by clicking **Run Scan.** The display of skipped tests allows you to know ahead of time which tests will be run in each scan.

To skip tests, you will need to define them in a Kubernetes ConfigMap resource. Each skipped CIS scan test is listed in the ConfigMap alongside the version of the CIS benchmark that the test belongs to.

To skip tests by editing a ConfigMap resource,

1. Create a `security-scan` namespace.
1. Create a ConfigMap named `security-scan-cfg`.
1. Enter the skip information under the key `config.json` in the following format:

    ```json
    {
      "skip": {
        "rke-cis-1.4": [ 
          "1.1.1", 
          "1.2.2"
        ]
      }
    }
    ```
    
    In the example above, the CIS benchmark version is specified alongside the tests to be skipped for that version.

**Result:** These tests will be skipped on subsequent scans that use the defined CIS Benchmark version.

# Setting Alerts

Rancher provides a set of alerts for cluster scans. which are not configured to have notifiers by default:

- A manual cluster scan was completed
- A manual cluster scan has failures
- A scheduled cluster scan was completed
- A scheduled cluster scan has failures

> **Prerequisite:** You need to configure a [notifier]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers/) before configuring, sending, or receiving alerts.

To activate an existing alert for a CIS scan result,

1. From the cluster view in Rancher, click **Tools > Alerts.**
1. Go to the section called **A set of alerts for cluster scans.**
1. Go to the alert you want to activate and click **&#8942; > Activate.**
1. Go to the alert rule group **A set of alerts for cluster scans** and click **&#8942; > Edit.**
1. Scroll down to the **Alert** section. In the **To** field, select the notifier that you would like to use for sending alert notifications.
1. Optional: To limit the frequency of the notifications, click on **Show advanced options** and configure the time interval of the alerts.
1. Click **Save.**

**Result:** The notifications will be triggered when the a scan is run on a cluster and the active alerts have satisfied conditions.

To create a new alert,

1. Go to the cluster view and click **Tools > CIS Scans.**
1. Click **Add Alert.**
1. Fill out the form. 
1. Enter a name for the alert.
1. In the **Is** field, set the alert to be triggered when a scan is completed or when a scan has a failure.
1. In the **Send a** field, set the alert as a **Critical,** **Warning,** or **Info** alert level.
1. Choose a [notifier]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/notifiers/) for the alert.

**Result:** The alert is created and activated. The notifications will be triggered when the a scan is run on a cluster and the active alerts have satisfied conditions.

For more information about alerts, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/tools/alerts/)

# Deleting a Report

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Go to the report that should be deleted.
1. Click the **&#8942; > Delete.**
1. Click **Delete.**

# Downloading a Report

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Go to the report that you want to download. Click **&#8942; > Download.**

**Result:** The report is downloaded in CSV format.

# List of Skipped and Not Applicable Tests

For a list of skipped and not applicable tests, refer to <a href="{{<baseurl>}}/rancher/v2.0-v2.4/en/cis-scans/legacy/skipped-tests" target="_blank">this page.</a>