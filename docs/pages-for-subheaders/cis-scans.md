---
title: CIS Scans
weight: 17
---

Rancher can run a security scan to check whether Kubernetes is deployed according to security best practices as defined in the CIS Kubernetes Benchmark. The CIS scans can run on any Kubernetes cluster, including hosted Kubernetes providers such as EKS, AKS, and GKE.

The `rancher-cis-benchmark` app leverages <a href="https://github.com/aquasecurity/kube-bench" target="_blank">kube-bench,</a> an open-source tool from Aqua Security, to check clusters for CIS Kubernetes Benchmark compliance. Also, to generate a cluster-wide report, the application utilizes <a href="https://github.com/vmware-tanzu/sonobuoy" target="_blank">Sonobuoy</a> for report aggregation.

- [About the CIS Benchmark](#about-the-cis-benchmark)
- [About the Generated Report](#about-the-generated-report)
- [Test Profiles](#test-profiles)
- [About Skipped and Not Applicable Tests](#about-skipped-and-not-applicable-tests)
- [Roles-based Access Control](../explanations/integrations-in-rancher/cis-scans/rbac-for-cis-scans.md)
- [Configuration](../explanations/integrations-in-rancher/cis-scans/configuration-reference.md)

# About the CIS Benchmark

The Center for Internet Security is a 501(c\)(3) non-profit organization, formed in October 2000, with a mission to "identify, develop, validate, promote, and sustain best practice solutions for cyber defense and build and lead communities to enable an environment of trust in cyberspace". The organization is headquartered in East Greenbush, New York, with members including large corporations, government agencies, and academic institutions.

CIS Benchmarks are best practices for the secure configuration of a target system. CIS Benchmarks are developed through the generous volunteer efforts of subject matter experts, technology vendors, public and private community members, and the CIS Benchmark Development team.

The official Benchmark documents are available through the CIS website. The sign-up form to access the documents is 
<a href="https://learn.cisecurity.org/benchmarks" target="_blank">here.</a>

# About the Generated Report

Each scan generates a report can be viewed in the Rancher UI and can be downloaded in CSV format.

By default, the CIS Benchmark v1.6 is used.

The Benchmark version is included in the generated report.

The Benchmark provides recommendations of two types: Automated and Manual. Recommendations marked as Manual in the Benchmark are not included in the generated report.

Some tests are designated as "Not Applicable." These tests will not be run on any CIS scan because of the way that Rancher provisions RKE clusters. For information on how test results can be audited, and why some tests are designated to be not applicable, refer to Rancher's <a href="security/#the-cis-benchmark-and-self-assessment" target="_blank">self-assessment guide for the corresponding Kubernetes version.</a>

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

Refer to <a href="security/" target="_blank">the table in the cluster hardening guide</a> for information on which versions of Kubernetes, the Benchmark, Rancher, and our cluster hardening guide correspond to each other. Also refer to the hardening guide for configuration files of CIS-compliant clusters and information on remediating failed tests.

# Test Profiles

The following profiles are available:

- Generic CIS 1.5
- Generic CIS 1.6
- RKE permissive 1.5
- RKE hardened 1.5
- RKE permissive 1.6
- RKE hardened 1.6
- RKE2 permissive 1.5
- RKE2 hardened 1.5
- RKE2 permissive 1.6
- RKE2 hardened 1.6
- AKS
- EKS
- GKE

You also have the ability to customize a profile by saving a set of tests to skip.

All profiles will have a set of not applicable tests that will be skipped during the CIS scan. These tests are not applicable based on how a RKE cluster manages Kubernetes.

There are two types of RKE cluster scan profiles:

- **Permissive:** This profile has a set of tests that have been will be skipped as these tests will fail on a default RKE Kubernetes cluster. Besides the list of skipped tests, the profile will also not run the not applicable tests.
- **Hardened:** This profile will not skip any tests, except for the non-applicable tests.

The EKS and GKE cluster scan profiles are based on CIS Benchmark versions that are specific to those types of clusters.

In order to pass the "Hardened" profile, you will need to follow the steps on the <a href="security/#rancher-hardening-guide" target="_blank">hardening guide</a> and use the `cluster.yml` defined in the hardening guide to provision a hardened cluster.

The default profile and the supported CIS benchmark version depends on the type of cluster that will be scanned:

The `rancher-cis-benchmark` supports the CIS 1.6 Benchmark version.

- For RKE Kubernetes clusters, the RKE Permissive 1.6 profile is the default.
- EKS and GKE have their own CIS Benchmarks published by `kube-bench`. The corresponding test profiles are used by default for those clusters.
- For RKE2 Kubernetes clusters, the RKE2 Permissive 1.6 profile is the default.
- For cluster types other than RKE, RKE2, EKS and GKE, the Generic CIS 1.5 profile will be used by default.

# About Skipped and Not Applicable Tests

For a list of skipped and not applicable tests, refer to <a href="cis-scans/skipped-tests" target="_blank">this page.</a>

For now, only user-defined skipped tests are marked as skipped in the generated report.

Any skipped tests that are defined as being skipped by one of the default profiles are marked as not applicable.

# Roles-based Access Control

For information about permissions, refer to <a href="cis-scancis-scans/rbac" target="_blank">this page.</a>

# Configuration

For more information about configuring the custom resources for the scans, profiles, and benchmark versions, refer to <a href="cis-scancis-scans/configuration" target="_blank">this page.</a>