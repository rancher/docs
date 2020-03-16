---
title: Security Scans
weight: 1
---

_Available as of v2.4.0-alpha1_

Rancher can run a security scan to check whether a downstream RKE Kubernetes cluster is deployed according to security best practices as defined in the CIS (Center for Internet Security) Kubernetes Benchmark.

When Rancher runs a CIS security scan on a cluster, a report is generated showing the results of each test, including a summary with the number of passed, skipped and failed tests. The report also includes remediation steps for any failed tests.

- [About the CIS Benchmark](#about-the-cis-benchmark)
- [About the generated report](#about-the-generated-report)
- [Permissive and hardened test profiles](#permissive-and-hardened-test-profiles)
- [Prerequisites](#prerequisites)
- [Running a scan](#running-a-scan)
- [Scheduling recurring scans](#scheduling-recurring-scans)
- [Skipping tests](#skipping-tests)
- [Setting alerts](#setting-alerts)
- [Deleting a report](#deleting-a-report)
- [Downloading a report](#downloading-a-report)

### About the CIS Benchmark

The Center for Internet Security is a 501(c)(3) nonprofit organization, formed in October 2000, with a mission is to "identify, develop, validate, promote, and sustain best practice solutions for cyber defense and build and lead communities to enable an environment of trust in cyberspace". The organization is headquartered in East Greenbush, New York, with members including large corporations, government agencies, and academic institutions.

CIS Benchmarks are best practices for the secure configuration of a target system. CIS Benchmarks are developed through the generous volunteer efforts of subject matter experts, technology vendors, public and private community members, and the CIS Benchmark Development team.

The official Benchmark documents are available through the CIS website. The sign-up form to access the documents is [here.](https://learn.cisecurity.org/benchmarks)

To check clusters for CIS Kubernetes Benchmark compliance, the security scan leverages [kube-bench,](https://github.com/aquasecurity/kube-bench) an open-source tool from Aqua Security.

### About the Generated Report

Each scan generates a report can be viewed in the Rancher UI and can be downloaded in CSV format.

As of Rancher v2.4, the CIS scan will use either the Benchmark v1.4 or v1.5, depending on the Kubernetes version.

To determine which version of the [Benchmark](https://www.cisecurity.org/benchmark/kubernetes/) to use in the scan, Rancher chooses a version that is appropriate for the cluster's Kubernetes version. The Benchmark version is included in the generated report.

The Benchmark provides recommendations of two types: Scored and Not Scored. Recommendations marked as Not Scored in the Benchmark are not included in the generated report.

Some tests are designated as "Not Applicable." These tests will not be run on any CIS scan because of the way that Rancher provisions RKE clusters. For information on how test results can be audited, and why some tests are designated to be not applicable, refer to Rancher's [self-assessment guide for the corresponding Kubernetes version.]({{<baseurl>}}/rancher/v2.x/en/security/#the-cis-benchmark-and-self-assessment)

The report contains the following information:

| Column in Report | Description |
|------------------|-------------|
| ID               | The ID number of the CIS Benchmark. |
| Description      | The description of the CIS Benchmark test. |
| Remediation      | What needs to be fixed in order to pass the test. |
| State of Test    | Indicates if the test passed, failed, was skipped, or was not applicable. |
| Node type        | The node role, which affects which tests are run on the node. Master tests are run on controlplane nodes, etcd tests are run on etcd nodes, and node tests are run on the worker nodes. |
| Nodes            | The name(s) of the node that the test was run on. |
| Passed_Nodes | The name(s) of the nodes that the test passed on. |
| Failed_Nodes | The name(s) of the nodes that the test failed on. |

Refer to [the table in the cluster hardening guide]({{<baseurl>}}/rancher/v2.x/en/security/#rancher-hardening-guide) for information on which versions of Kubernetes, the Benchmark, Rancher, and our cluster hardening guide correspond to each other. Also refer to the hardening guide for configuration files of CIS-compliant clusters and information on remediating failed tests.

### Permissive and Hardened Test Profiles

Rancher ships with two types of profiles to run for each version of the CIS scan. 

- **Permissive:** By default, this profile has a set of tests that have been configured to skip certain tests that fail on a default RKE Kubernetes cluster. These tests can be updated to pass based on following the steps on the [hardening guide]({{<baseurl>}}/rancher/v2.x/en/security/#rancher-hardening-guide)
 and using the `cluster.yml` defined in the hardening guide.
- **Hardened:** This profile will not skip any tests by default, except for the non-applicable tests.

### Prerequisites

To run security scans on a cluster and access the generated reports, you must be an [Administrator]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [Cluster Owner.]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/)

Rancher can only run security scans on clusters that were created with RKE, which includes custom clusters and clusters that Rancher created in an infrastructure provider such as Amazon EC2 or GCE. Imported clusters and clusters in hosted Kubernetes providers can't be scanned by Rancher.

The security scan cannot run in a cluster that has Windows nodes.

You will only be able to see the CIS scan reports for clusters that you have access to.

### Running a Scan

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Click **Run Scan.**
1. Choose a CIS scan profile.

**Result:** A report is generated and displayed in the **CIS Scans** page. To see details of the report, click the report's name.

### Scheduling Recurring Scans

Recurring scans can be scheduled to run on any RKE Kubernetes cluster.

To enable recurring scans, edit the advanced options in the cluster configuration during cluster creation or after the cluster has been created.

To schedule scans for an existing cluster:

1. Go to the cluster view in Rancher.
1. Click **Ellipsis (...) > Edit.**
1. Go to the **Advanced Options** section. In the **CIS Scan Enabled** field, click **Yes.**
1. In the **CIS Scan Profile** field, choose a **Permissive** or **Hardened** profile. The corresponding CIS Benchmark version is included in the profile name. Any skipped tests [defined in a separate ConfigMap](#skipping-tests) will be skipped regardless of whether a **Permissive** or **Hardened** profile is selected. When selecting the the permissive profile, you should see which tests were skipped by Rancher (tests that are skipped by default for RKE clusters) and which tests were skipped by a Rancher user. In the hardened test profile, the only skipped tests will be skipped by users.
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


### Skipping Tests

You can define a set of tests that will be skipped by the CIS scan when the next report is generated.

These tests will be skipped for subsequent CIS scans, including both manually triggered and scheduled scans, and the tests will be skipped in both the permissive and hardened CIS scan profiles.

The skipped tests will be listed alongside the test profile name in the cluster configuration options when a test profile is selected for a recurring cluster scan. The skipped tests will also be shown every time a scan is triggered manually from the Rancher UI by clicking **Run Scan.** The display of skipped tests allows you to know ahead of time which tests will be run in each scan.

To skip tests, you will need to define them in a Kubernetes ConfigMap resource. Each skipped CIS scan test is listed in the ConfigMap alongside the version of the CIS benchmark that the test belongs to.

To skip tests by editing a ConfigMap resource,

1. Create a `security-scan` namespace.
1. Create a ConfigMap named `security-scan-cfg`. 
1. Enter the skip information under the key `config.json` in the following format. The CIS benchmark version is specified alongside the tests to be skipped for that version:

```json
{
    "config.json": {
        "skip": { 
            "rke-cis-1.4": [ "1.1.1", "1.2.2"] 
        }
    }
}
```

**Result:** These tests will be skipped on subsequent scans that use the defined CIS Benchmark version.

### Setting Alerts

Rancher provides a set of alerts for cluster scans. which are not configured to have notifiers by default:

- A manual cluster scan was completed
- A manual cluster scan has failures
- A scheduled cluster scan was completed
- A scheduled cluster scan has failures

> **Prerequisite:** You need to configure a [notifier]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/notifiers/) before configuring, sending, or receiving alerts.

To activate an alert for a CIS scan result,

1. From the cluster view in Rancher, click **Tools > Alerts.**
1. Go to the section called **A set of alerts for cluster scans.**
1. Go to the alert you want to activate and click **Ellipsis (...) > Activate.**
1. Go to the alert rule group **A set of alerts for cluster scans** and click **Ellipsis (...) > Edit.**
1. Scroll down to the **Alert** section. In the **To** field, select the notifier that you would like to use for sending alert notifications.
1. Optional: To limit the frequency of the notifications, click on **Show advanced options** and configure the time interval of the alerts.
1. Click **Save.**

**Result:** The notifications will be triggered when the a scan is run on a cluster and the active alerts have satisfied conditions.

### Deleting a Report

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Go to the report that should be deleted.
1. Click the **Ellipsis (...) > Delete.**
1. Click **Delete.**

### Downloading a Report

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Go to the report that you want to download. Click **Ellipsis (...) > Download.**

**Result:** The report is downloaded in CSV format. For more information on each columns, refer to the [section about the generated report.](#about-the-generated-report)