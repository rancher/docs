---
title: CIS Scans
weight: 18
---

_Available as of v2.4.0_

Rancher can run a security scan to check whether Kubernetes is deployed according to security best practices as defined in the CIS Kubernetes Benchmark.

The `rancher-cis-application` leverages [kube-bench,](https://github.com/aquasecurity/kube-bench) an open-source tool from Aqua Security, to check clusters for CIS Kubernetes Benchmark compliance. Also, to generate a cluster-wide report, the application utilizes [Sonobuoy](https://github.com/vmware-tanzu/sonobuoy) for report aggregation.

> The CIS scan feature was improved in Rancher v2.5. If you are using Rancher v2.4, refer to the older version of the CIS scan documentation [here.](./legacy)

- [Changes in Rancher v2.5](#changes-in-rancher-v2-5)
- [About the CIS Benchmark](#about-the-cis-benchmark)
- [Installing rancher-cis-benchmark](#installing-rancher-cis-benchmark)
- [Uninstalling rancher-cis-benchmark](#uninstalling-rancher-cis-benchmark)
- [Running a Scan](#running-a-scan)
- [Skipping Tests](#skipping-tests)
- [Viewing Reports](#viewing-reports)
- [About the generated report](#about-the-generated-report)
- [Test Profiles](#test-profiles)
- [About Skipped and Not Applicable Tests](#about-skipped-and-not-applicable-tests)
- [Roles-based access control](./rbac)
- [Configuration](./configuration)

### Changes in Rancher v2.5

We now support running CIS scans on any Kubernetes cluster, including hosted Kubernetes providers such as EKS, AKS, and GKE. Previously it was only supported to run CIS scans on RKE Kubernetes clusters.

In Rancher v2.4, the CIS scan tool was available from the **cluster manager** in the Rancher UI. Now it is available in the **Cluster Explorer** and it can be enabled and deployed using a Helm chart. It can be installed from the Rancher UI, but it can also be installed independently of Rancher. It  deploys a CIS scan operator for the cluster, and deploys Kubernetes custom resources for cluster scans. The custom resources can be managed directly from the **Cluster Explorer.**

In v1 of the CIS scan tool, which was available in Rancher v2.4 through the cluster manager, recurring scans could be scheduled. The ability to schedule recurring scans is not yet available in Rancher v2.5.

Support for alerting for the cluster scan results is not available for Rancher v2.5 yet.

More test profiles were added. In Rancher v2.4, permissive and hardened profiles were included. In Rancher v2.5, the following profiles are available:

- Generic CIS 1.5 (default)
- RKE permissive
- RKE hardened
- EKS
- GKE

EKS and GKE have their own CIS Benchmarks published by `kube-bench`. The corresponding test profiles are used by default for those clusters.

The `rancher-cis-benchmark` currently supports the CIS 1.5 Benchmark version.

> **Note:** The old and new versions of monitoring shouldn't run on the cluster at the same time.

# About the CIS Benchmark

The Center for Internet Security is a 501(c)(3) nonprofit organization, formed in October 2000, with a mission is to "identify, develop, validate, promote, and sustain best practice solutions for cyber defense and build and lead communities to enable an environment of trust in cyberspace". The organization is headquartered in East Greenbush, New York, with members including large corporations, government agencies, and academic institutions.

CIS Benchmarks are best practices for the secure configuration of a target system. CIS Benchmarks are developed through the generous volunteer efforts of subject matter experts, technology vendors, public and private community members, and the CIS Benchmark Development team.

The official Benchmark documents are available through the CIS website. The sign-up form to access the documents is [here.](https://learn.cisecurity.org/benchmarks)

# Installing rancher-cis-benchmark

The application can be installed with the Rancher UI or with Helm.

### Installing with the Rancher UI

1. In the Rancher UI, go to the **Cluster Explorer.**
1. Click **Apps.**
1. Click `rancher-cis-benchmark`.
1. Click **Install.**

**Result:** The CIS scan application is deployed on the Kubernetes cluster.

### Installing with Helm

There are two Helm charts for the application:

- `rancher-cis-benchmark-crds`, the custom resource definition chart
- `rancher-cis-benchmark`, the chart deploying [rancher/cis-operator](https://github.com/rancher/cis-operator)

To install the charts, run the following commands:
```
helm install clusterscan-operator-crds \
  ./rancher-cis-benchmark-crds/charts/ \
  --kubeconfig <cluster-kubeconfig>
helm install clusterscan-operator \
  ./rancher-cis-benchmark/charts/ \
  --create-namespace=true \
  -n cis-operator-system \
  --kubeconfig <cluster-kubeconfig>
```

# Uninstalling rancher-cis-benchmark

The application can be uninstalled with the Rancher UI or with Helm.

### Uninstalling with the Rancher UI

1. From the **Cluster Explorer,** go to the top left dropdown menu and click **Apps & Marketplace.**
1. Click **Installed Apps.**
1. Go to the `cis-operator-system` namespace and check the boxes next to `rancher-cis-benchmark-crd` and `rancher-cis-benchmark`.
1. Click **Delete** and confirm **Delete.**

**Result:** The `rancher-cis-benchmark` application is uninstalled.

### Uninstalling with Helm

Run the following commands:

```
helm uninstall clusterscan-operator -n cis-operator-system --kubeconfig <cluster-kubeconfig>
helm uninstall clusterscan-operator-crds --kubeconfig <cluster-kubeconfig>
```

# Running a Scan

When a ClusterScan custom resource is created, it launches a new CIS scan on the cluster for the chosen ClusterScanProfile.

Note: There is currently a limitation of running only one CIS scan at a time for a cluster.

To run a scan,

1. Go to the **Cluster Explorer** in the Rancher UI. In the top left dropdown menu, click **Cluster Explorer > CIS Benchmark.**
1. In the **Scans** section, click **Create.**
1. Choose a cluster scan profile. The profile determines which CIS Benchmark version will be used and which tests will be performed. The CIS Operator will choose a default profile applicable to the type of Kubernetes cluster it is installed on.
1. Click **Create.**

**Result:** A report is generated with the scan results. To see the results, click the name of the scan that appears.

# Skipping Tests

CIS scans can be run using test profiles with user-defined skips.

To skip tests, you will create a custom CIS scan profile. A profile contains the configuration for the CIS scan, which includes the benchmark versions to use and any specific tests to skip in that benchmark.

1. In the **Cluster Explorer,** go to the top-left dropdown menu and click **CIS Benchmark.**
1. Click **Profiles.**
1. From here, you can create a profile in multiple ways. To make a new profile, click **Create** and fill out the form in the UI. To make a new profile based on an existing profile, go to the existing profile, click the three vertical dots, and click **Clone as YAML.**  If you are filling out the form, add the tests to skip using the tests IDs, using the relevant CIS Benchmark as a reference. If you are creating the new test profile as YAML, you will add the IDs of the tests to skip in the `skipTests` directive. You will also give the profile a name:

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

# Viewing Reports

To view the generated CIS scan reports,

1. In the **Cluster Explorer,** go to the top left dropdown menu and click **Cluster Explorer > CIS Benchmark.**
1. The **Scans** page will show the generated reports. To see a detailed report, go to a scan report and click the name.

# About the Generated Report

Each scan generates a report can be viewed in the Rancher UI and can be downloaded in CSV format.

As of Rancher v2.4, the scan will use the CIS Benchmark v1.4. The Benchmark version is included in the generated report.

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

Refer to [the table in the cluster hardening guide]({{<baseurl>}}/rancher/v2.x/en/security/) for information on which versions of Kubernetes, the Benchmark, Rancher, and our cluster hardening guide correspond to each other. Also refer to the hardening guide for configuration files of CIS-compliant clusters and information on remediating failed tests.

# Test Profiles

The following profiles are available:

- Generic CIS 1.5 (default)
- RKE permissive
- RKE hardened
- EKS
- GKE

You also have the ability to customize a profile by saving a set of tests to skip.

All profiles will have a set of not applicable tests that will be skipped during the CIS scan. These tests are not applicable based on how a RKE cluster manages Kubernetes.

There are 2 types of RKE cluster scan profiles:

- **Permissive:** This profile has a set of tests that have been will be skipped as these tests will fail on a default RKE Kubernetes cluster. Besides the list of skipped tests, the profile will also not run the not applicable tests.
- **Hardened:** This profile will not skip any tests, except for the non-applicable tests.

The EKS and GKE cluster scan profiles are based on CIS Benchmark versions that are specific to those types of clusters.

In order to pass the "Hardened" profile, you will need to follow the steps on the [hardening guide]({{<baseurl>}}/rancher/v2.x/en/security/#rancher-hardening-guide) and use the `cluster.yml` defined in the hardening guide to provision a hardened cluster.



# About Skipped and Not Applicable Tests

For a list of skipped and not applicable tests, refer to [this page.](./skipped-tests)

For now, only user-defined skipped tests are marked as skipped in the generated report.

Any skipped tests that are defined as being skipped by one of the default profiles are marked as not applicable.

# Roles-based Access Control

For information about permissions, refer to [this page.](./rbac)

# Configuration

For more information about configuring the custom resources for the scans, profiles, and benchmark versions, refer to [this page.](./configuration)