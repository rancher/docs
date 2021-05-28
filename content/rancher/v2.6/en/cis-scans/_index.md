---
title: CIS Scans
weight: 17
aliases:
  - /rancher/v2.5/en/cis-scans/v2.5
---

Rancher can run a security scan to check whether Kubernetes is deployed according to security best practices as defined in the CIS Kubernetes Benchmark.

The `rancher-cis-benchmark` app leverages <a href="https://github.com/aquasecurity/kube-bench" target="_blank">kube-bench,</a> an open-source tool from Aqua Security, to check clusters for CIS Kubernetes Benchmark compliance. Also, to generate a cluster-wide report, the application utilizes <a href="https://github.com/vmware-tanzu/sonobuoy" target="_blank">Sonobuoy</a> for report aggregation.

- [Changes in Rancher v2.5](#changes-in-rancher-v2-5)
- [About the CIS Benchmark](#about-the-cis-benchmark)
- [About the Generated Report](#about-the-generated-report)
- [Test Profiles](#test-profiles)
- [About Skipped and Not Applicable Tests](#about-skipped-and-not-applicable-tests)
- [Roles-based Access Control](./rbac)
- [Configuration](./configuration)
- [How-to Guides](#how-to-guides)
  - [Installing rancher-cis-benchmark](#installing-rancher-cis-benchmark)
  - [Uninstalling rancher-cis-benchmark](#uninstalling-rancher-cis-benchmark)
  - [Running a Scan](#running-a-scan)
  - [Running a Scan Periodically on a Schedule](#running-a-scan-periodically-on-a-schedule)
  - [Skipping Tests](#skipping-tests)
  - [Viewing Reports](#viewing-reports)
  - [Enabling Alerting for rancher-cis-benchmark](#enabling-alerting-for-rancher-cis-benchmark)
  - [Configuring Alerts for a Periodic Scan on a Schedule](#configuring-alerts-for-a-periodic-scan-on-a-schedule)
  - [Creating a Custom Benchmark Version for Running a Cluster Scan](#creating-a-custom-benchmark-version-for-running-a-cluster-scan)

# Changes in Rancher v2.5

We now support running CIS scans on any Kubernetes cluster, including hosted Kubernetes providers such as EKS, AKS, and GKE. Previously it was only supported to run CIS scans on RKE Kubernetes clusters.

In Rancher v2.4, the CIS scan tool was available from the **cluster manager** in the Rancher UI. Now it is available in the **Cluster Explorer** and it can be enabled and deployed using a Helm chart. It can be installed from the Rancher UI, but it can also be installed independently of Rancher. It  deploys a CIS scan operator for the cluster, and deploys Kubernetes custom resources for cluster scans. The custom resources can be managed directly from the **Cluster Explorer.**

In v1 of the CIS scan tool, which was available in Rancher v2.4 through the cluster manager, recurring scans could be scheduled. The ability to schedule recurring scans is now also available for CIS v2 from Rancher v2.5.4.

Support for alerting for the cluster scan results is now also available from Rancher v2.5.4.

In Rancher v2.4, permissive and hardened profiles were included. In Rancher v2.5.0 and in v2.5.4, more profiles were included.

{{% tabs %}}
{{% tab "Profiles in v2.5.4" %}}
- Generic CIS 1.5
- Generic CIS 1.6
- RKE permissive 1.5
- RKE hardened 1.5
- RKE permissive 1.6
- RKE hardened 1.6
- EKS
- GKE
- RKE2 permissive 1.5
- RKE2 permissive 1.5
{{% /tab %}}
{{% tab "Profiles in v2.5.0-v2.5.3" %}}
- Generic CIS 1.5
- RKE permissive
- RKE hardened
- EKS
- GKE
{{% /tab %}}
{{% /tabs %}}
<br/>


The default profile and the supported CIS benchmark version depends on the type of cluster that will be scanned and the Rancher version:

{{% tabs %}}
{{% tab "v2.5.4" %}}

The `rancher-cis-benchmark` supports the CIS 1.6 Benchmark version.

- For RKE Kubernetes clusters, the RKE Permissive 1.6 profile is the default.
- EKS and GKE have their own CIS Benchmarks published by `kube-bench`. The corresponding test profiles are used by default for those clusters.
- For RKE2 Kubernetes clusters, the RKE2 Permissive 1.5 profile is the default.
- For cluster types other than RKE, RKE2, EKS and GKE, the Generic CIS 1.5 profile will be used by default.

{{% /tab %}}
{{% tab "v2.5.0-v2.5.3" %}}

The `rancher-cis-benchmark` supports the CIS 1.5 Benchmark version.

- For RKE Kubernetes clusters, the RKE permissive profile is the default.
- EKS and GKE have their own CIS Benchmarks published by `kube-bench`. The corresponding test profiles are used by default for those clusters.
- For cluster types other than RKE, EKS and GKE, the Generic CIS 1.5 profile will be used by default.

{{% /tab %}}
{{% /tabs %}}

> **Note:** CIS v1 cannot run on a cluster when CIS v2 is deployed. In other words, after `rancher-cis-benchmark` is installed, you can't run scans by going to the Cluster Manager view in the Rancher UI and clicking <b>Tools > CIS Scans.</b>

# About the CIS Benchmark

The Center for Internet Security is a 501(c\)(3) non-profit organization, formed in October 2000, with a mission to "identify, develop, validate, promote, and sustain best practice solutions for cyber defense and build and lead communities to enable an environment of trust in cyberspace". The organization is headquartered in East Greenbush, New York, with members including large corporations, government agencies, and academic institutions.

CIS Benchmarks are best practices for the secure configuration of a target system. CIS Benchmarks are developed through the generous volunteer efforts of subject matter experts, technology vendors, public and private community members, and the CIS Benchmark Development team.

The official Benchmark documents are available through the CIS website. The sign-up form to access the documents is 
<a href="https://learn.cisecurity.org/benchmarks" target="_blank">here.</a>

# About the Generated Report

Each scan generates a report can be viewed in the Rancher UI and can be downloaded in CSV format.

From Rancher v2.5.4, the scan uses the CIS Benchmark v1.6 by default. In Rancher v2.5.0-2.5.3, the CIS Benchmark v1.5. is used.

The Benchmark version is included in the generated report.

The Benchmark provides recommendations of two types: Scored and Not Scored. Recommendations marked as Not Scored in the Benchmark are not included in the generated report.

Some tests are designated as "Not Applicable." These tests will not be run on any CIS scan because of the way that Rancher provisions RKE clusters. For information on how test results can be audited, and why some tests are designated to be not applicable, refer to Rancher's <a href="{{<baseurl>}}/rancher/v2.5/en/security/#the-cis-benchmark-and-self-assessment" target="_blank">self-assessment guide for the corresponding Kubernetes version.</a>

The report contains the following information:

| Column in Report | Description |
|------------------|-------------|
| `id`               | The ID number of the CIS Benchmark. |
| `description`      | The description of the CIS Benchmark test. |
| `remediation`      | What needs to be fixed in order to pass the test. |
| `state`    | Indicates if the test passed, failed, was skipped, or was not applicable. |
| `node_type`        | The node role, which affects which tests are run on the node. Master tests are run on controlplane nodes, etcd tests are run on etcd nodes, and node tests are run on the worker nodes. |
| `audit` | This is the audit check that `kube-bench` runs for this test. |
| `audit_config` | Any configuration applicable to the audit script. |
| `test_info` | Test-related info as reported by `kube-bench`, if any. |
| `commands` | Test-related commands as reported by `kube-bench`, if any. |
| `config_commands` | Test-related configuration data as reported by `kube-bench`, if any. |
| `actual_value` | The test's actual value, present if reported by `kube-bench`. |
| `expected_result` | The test's expected result, present if reported by `kube-bench`. |

Refer to <a href="{{<baseurl>}}/rancher/v2.5/en/security/" target="_blank">the table in the cluster hardening guide</a> for information on which versions of Kubernetes, the Benchmark, Rancher, and our cluster hardening guide correspond to each other. Also refer to the hardening guide for configuration files of CIS-compliant clusters and information on remediating failed tests.

# Test Profiles

The following profiles are available:

{{% tabs %}}
{{% tab "Profiles in v2.5.4" %}}
- Generic CIS 1.5
- Generic CIS 1.6
- RKE permissive 1.5
- RKE hardened 1.5
- RKE permissive 1.6
- RKE hardened 1.6
- EKS
- GKE
- RKE2 permissive 1.5
- RKE2 permissive 1.5
{{% /tab %}}
{{% tab "Profiles in v2.5.0-v2.5.3" %}}
- Generic CIS 1.5
- RKE permissive
- RKE hardened
- EKS
- GKE
{{% /tab %}}
{{% /tabs %}}

You also have the ability to customize a profile by saving a set of tests to skip.

All profiles will have a set of not applicable tests that will be skipped during the CIS scan. These tests are not applicable based on how a RKE cluster manages Kubernetes.

There are two types of RKE cluster scan profiles:

- **Permissive:** This profile has a set of tests that have been will be skipped as these tests will fail on a default RKE Kubernetes cluster. Besides the list of skipped tests, the profile will also not run the not applicable tests.
- **Hardened:** This profile will not skip any tests, except for the non-applicable tests.

The EKS and GKE cluster scan profiles are based on CIS Benchmark versions that are specific to those types of clusters.

In order to pass the "Hardened" profile, you will need to follow the steps on the <a href="{{<baseurl>}}/rancher/v2.5/en/security/#rancher-hardening-guide" target="_blank">hardening guide</a> and use the `cluster.yml` defined in the hardening guide to provision a hardened cluster.

# About Skipped and Not Applicable Tests

For a list of skipped and not applicable tests, refer to <a href="{{<baseurl>}}/rancher/v2.5/en/cis-scans/skipped-tests" target="_blank">this page.</a>

For now, only user-defined skipped tests are marked as skipped in the generated report.

Any skipped tests that are defined as being skipped by one of the default profiles are marked as not applicable.

# Roles-based Access Control

For information about permissions, refer to <a href="{{<baseurl>}}/rancher/v2.5/en/cis-scans/rbac" target="_blank">this page.</a>

# Configuration

For more information about configuring the custom resources for the scans, profiles, and benchmark versions, refer to <a href="{{<baseurl>}}/rancher/v2.5/en/cis-scans/configuration" target="_blank">this page.</a>

# How-to Guides

- [Installing rancher-cis-benchmark](#installing-rancher-cis-benchmark)
- [Uninstalling rancher-cis-benchmark](#uninstalling-rancher-cis-benchmark)
- [Running a Scan](#running-a-scan)
- [Running a Scan Periodically on a Schedule](#running-a-scan-periodically-on-a-schedule)
- [Skipping Tests](#skipping-tests)
- [Viewing Reports](#viewing-reports)
- [Enabling Alerting for rancher-cis-benchmark](#enabling-alerting-for-rancher-cis-benchmark)
- [Configuring Alerts for a Periodic Scan on a Schedule](#configuring-alerts-for-a-periodic-scan-on-a-schedule)
- [Creating a Custom Benchmark Version for Running a Cluster Scan](#creating-a-custom-benchmark-version-for-running-a-cluster-scan)
### Installing rancher-cis-benchmark

1. In the Rancher UI, go to the **Cluster Explorer.**
1. Click **Apps.**
1. Click `rancher-cis-benchmark`.
1. Click **Install.**

**Result:** The CIS scan application is deployed on the Kubernetes cluster.

### Uninstalling rancher-cis-benchmark

1. From the **Cluster Explorer,** go to the top left dropdown menu and click **Apps & Marketplace.**
1. Click **Installed Apps.**
1. Go to the `cis-operator-system` namespace and check the boxes next to `rancher-cis-benchmark-crd` and `rancher-cis-benchmark`.
1. Click **Delete** and confirm **Delete.**

**Result:** The `rancher-cis-benchmark` application is uninstalled.

### Running a Scan

When a ClusterScan custom resource is created, it launches a new CIS scan on the cluster for the chosen ClusterScanProfile.

Note: There is currently a limitation of running only one CIS scan at a time for a cluster. If you create multiple ClusterScan custom resources, they will be run one after the other by the operator, and until one scan finishes, the rest of the ClusterScan custom resources will be in the "Pending" state.

To run a scan,

1. Go to the **Cluster Explorer** in the Rancher UI. In the top left dropdown menu, click **Cluster Explorer > CIS Benchmark.**
1. In the **Scans** section, click **Create.**
1. Choose a cluster scan profile. The profile determines which CIS Benchmark version will be used and which tests will be performed. If you choose the Default profile, then the CIS Operator will choose a profile applicable to the type of Kubernetes cluster it is installed on.
1. Click **Create.**

**Result:** A report is generated with the scan results. To see the results, click the name of the scan that appears.
### Running a Scan Periodically on a Schedule
_Available as of v2.5.4_

To run a ClusterScan on a schedule,

1. Go to the **Cluster Explorer** in the Rancher UI. In the top left dropdown menu, click **Cluster Explorer > CIS Benchmark.**
1. In the **Scans** section, click **Create.**
1. Choose a cluster scan profile. The profile determines which CIS Benchmark version will be used and which tests will be performed. If you choose the Default profile, then the CIS Operator will choose a profile applicable to the type of Kubernetes cluster it is installed on.
1. Choose the option **Run scan on a schedule.**
1. Enter a valid <a href="https://en.wikipedia.org/wiki/Cron#CRON_expression" target="_blank">cron schedule expression</a> in the field **Schedule.**
1. Choose a **Retention** count, which indicates the number of reports maintained for this recurring scan. By default this count is 3. When this retention limit is reached, older reports will get purged.
1. Click **Create.**

**Result:** The scan runs and reschedules to run according to the cron schedule provided. The **Next Scan** value indicates the next time this scan will run again. 

A report is generated with the scan results every time the scan runs. To see the latest results, click the name of the scan that appears.

You can also see the previous reports by choosing the report from the **Reports** dropdown on the scan detail page.

### Skipping Tests

CIS scans can be run using test profiles with user-defined skips.

To skip tests, you will create a custom CIS scan profile. A profile contains the configuration for the CIS scan, which includes the benchmark versions to use and any specific tests to skip in that benchmark.

1. In the **Cluster Explorer,** go to the top-left dropdown menu and click **CIS Benchmark.**
1. Click **Profiles.**
1. From here, you can create a profile in multiple ways. To make a new profile, click **Create** and fill out the form in the UI. To make a new profile based on an existing profile, go to the existing profile, click the three vertical dots, and click **Clone as YAML.**  If you are filling out the form, add the tests to skip using the test IDs, using the relevant CIS Benchmark as a reference. If you are creating the new test profile as YAML, you will add the IDs of the tests to skip in the `skipTests` directive. You will also give the profile a name:

    ```yaml
    apiVersion: cis.cattle.io/v1
    kind: ClusterScanProfile
    metadata:
      annotations:
        meta.helm.sh/release-name: clusterscan-operator
        meta.helm.sh/release-namespace: cis-operator-system
      labels:
        app.kubernetes.io/managed-by: Helm
      name: "<example-profile>"
    spec:
      benchmarkVersion: cis-1.5
      skipTests:
        - "1.1.20"
        - "1.1.21"
    ```
1. Click **Create.**

**Result:** A new CIS scan profile is created.

When you [run a scan](#running-a-scan) that uses this profile, the defined tests will be skipped during the scan. The skipped tests will be marked in the generated report as `Skip`.

### Viewing Reports

To view the generated CIS scan reports,

1. In the **Cluster Explorer,** go to the top left dropdown menu and click **Cluster Explorer > CIS Benchmark.**
1. The **Scans** page will show the generated reports. To see a detailed report, go to a scan report and click the name.

One can download the report from the Scans list or from the scan detail page.

### Enabling Alerting for rancher-cis-benchmark
_Available as of v2.5.4_

Alerts can be configured to be sent out for a scan that runs on a schedule.

> **Prerequisite:** 
>
> Before enabling alerts for `rancher-cis-benchmark`, make sure to install the `rancher-monitoring` application and configure the Receivers and Routes. For more information, see [this section.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/configuration/alertmanager/)
>
> While configuring the routes for `rancher-cis-benchmark` alerts, you can specify the matching using the key-value pair `job: rancher-cis-scan`. An example route configuration is [here.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/configuration/alertmanager/#example-route-config-for-cis-scan-alerts)

While installing or upgrading the `rancher-cis-benchmark` application, set the following flag to `true` in the `values.yaml`:

```yaml
alerts:
  enabled: true
```

### Configuring Alerts for a Periodic Scan on a Schedule
_Available as of v2.5.4_

From Rancher v2.5.4, it is possible to run a ClusterScan on a schedule.

A scheduled scan can also specify if you should receive alerts when the scan completes.

Alerts are supported only for a scan that runs on a schedule.

The `rancher-cis-benchmark` application supports two types of alerts:

- Alert on scan completion: This alert is sent out when the scan run finishes. The alert includes details including the ClusterScan's name and the ClusterScanProfile name.
- Alert on scan failure: This alert is sent out if there are some test failures in the scan run or if the scan is in a `Fail` state.

> **Prerequisite:** 
>
> Before enabling alerts for `rancher-cis-benchmark`, make sure to install the `rancher-monitoring` application and configure the Receivers and Routes. For more information, see [this section.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/configuration/alertmanager/)
>
> While configuring the routes for `rancher-cis-benchmark` alerts, you can specify the matching using the key-value pair `job: rancher-cis-scan`. An example route configuration is [here.]({{<baseurl>}}/rancher/v2.5/en/monitoring-alerting/v2.5/configuration/alertmanager/#example-route-config-for-cis-scan-alerts)

To configure alerts for a scan that runs on a schedule,

1. Please enable alerts on the `rancher-cis-benchmark` application (#enabling-alerting-for-rancher-cis-benchmark)
1. Go to the **Cluster Explorer** in the Rancher UI. In the top left dropdown menu, click **Cluster Explorer > CIS Benchmark.**
1. In the **Scans** section, click **Create.**
1. Choose a cluster scan profile. The profile determines which CIS Benchmark version will be used and which tests will be performed. If you choose the Default profile, then the CIS Operator will choose a profile applicable to the type of Kubernetes cluster it is installed on.
1. Choose the option **Run scan on a schedule.**
1. Enter a valid [cron schedule expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) in the field **Schedule.**
1. Check the boxes next to the Alert types under **Alerting.**
1. Optional: Choose a **Retention** count, which indicates the number of reports maintained for this recurring scan. By default this count is 3. When this retention limit is reached, older reports will get purged.
1. Click **Create.**

**Result:** The scan runs and reschedules to run according to the cron schedule provided. Alerts are sent out when the scan finishes if routes and receiver are configured under `rancher-monitoring` application.

A report is generated with the scan results every time the scan runs. To see the latest results, click the name of the scan that appears.

### Creating a Custom Benchmark Version for Running a Cluster Scan 
_Available as of v2.5.4_
 
There could be some Kubernetes cluster setups that require custom configurations of the Benchmark tests. For example, the path to the Kubernetes config files or certs might be different than the standard location where the upstream CIS Benchmarks look for them.

It is now possible to create a custom Benchmark Version for running a cluster scan using the `rancher-cis-benchmark` application.

For details, see [this page.](./custom-benchmark)