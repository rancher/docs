---
title: Security Scans
weight: 1
---

_Available as of v2.4_

Rancher can run a security scan to check whether Kubernetes is deployed according to security best practices as defined in the CIS (Center for Internet Security) Kubernetes Benchmark.

The  CIS Kubernetes Benchmark is a reference document that can be used to establish a secure configuration baseline for Kubernetes.

When Rancher scans a cluster, it generates a report showing the results of each test, including the number of passed, skipped, and failed tests. The report also includes guidance on how to configure the cluster so that the failing tests will pass.

To check clusters for CIS Kubernetes Benchmark compliance, the security scan leverages [kube-bench,](https://github.com/aquasecurity/kube-bench) an open-source tool from Aqua Security.

When Rancher scans a cluster hosted in a managed Kubernetes provider such as GKE, EKS, or AKS, only worker nodes can be scanned.

### About the Generated Report

Each scan generates a report can be viewed in the Rancher UI and can be downloaded in CSV format.

The version of the [benchmark](https://www.cisecurity.org/benchmark/kubernetes/) that is used depends on the cluster's Kubernetes version. 

Each test in the resport is identified by its corresponding section of the benchmark. For example, if a cluster fails test 1.3.6, you can look up the description and rationale for the benchmark section 1.3.6 in the benchmark itself, or in Rancher's [hardening guide for the Kubernetes version that the cluster is using.]({{<baseurl>}}/rancher/v2.x/en/security/#rancher-hardening-guide)

Similarly, for information how to manually audit the test result, you could look up section 1.3.6 in Rancher's [self-assessment guide for the corresponding Kubernetes version.]({{<baseurl>}}/rancher/v2.x/en/security/#the-cis-benchmark-and-self-assessment)

### Prerequisites

To run security scans on a cluster and access the generated reports, you must be an [Administrator]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/global-permissions/) or [Cluster Owner.]({{<baseurl>}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/)

### Running a Scan

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Click **Run Scan.**

**Result:** A report is generated and displayed in the **CIS Scans** page. To see details of the report, click the report's name.

### Skipping a Test

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Click the name of the report that has tests you want to skip.
1. A **Skip** button is displayed next to each failed test. Click **Skip** for each test that should be skipped.

**Result:** The tests will be skipped on the next scan.

To re-run the security scan, go to the top of the page and click **Run Scan.**

### Un-skipping a Test

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Click the name of the report that has tests you want to un-skip.
1. An **Unskip** button is displayed next to each skipped test. Click **Unskip** for each test that should not be skipped.

**Result:** The tests will not be skipped on the next scan.

To re-run the security scan, go to the top of the page and click **Run Scan.**

### Deleting a Report

1. From the cluster view in Rancher, click **Tools > CIS Scans.**
1. Go to the report that should be deleted.
1. Click the **Ellipsis (...) > Delete.**
1. Click **Delete.**