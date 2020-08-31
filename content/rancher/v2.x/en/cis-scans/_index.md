---
title: CIS Scans
weight: 18
---

_Available as of v2.4.0_

Rancher can run a security scan to check whether Kubernetes is deployed according to security best practices as defined in the CIS Kubernetes Benchmark.

The Center for Internet Security (CIS) is a 501(c)(3) nonprofit organization, formed in October 2000, with a mission is to "identify, develop, validate, promote, and sustain best practice solutions for cyber defense and build and lead communities to enable an environment of trust in cyberspace". The organization is headquartered in East Greenbush, New York, with members including large corporations, government agencies, and academic institutions.

CIS Benchmarks are best practices for the secure configuration of a target system. CIS Benchmarks are developed through the generous volunteer efforts of subject matter experts, technology vendors, public and private community members, and the CIS Benchmark Development team.

The Benchmark provides recommendations of two types: Scored and Not Scored. We run tests related to only Scored recommendations.

- [About the CIS Benchmark](#about-the-cis-benchmark)
- [About the generated report](#about-the-generated-report)
- [Test profiles](#test-profiles)
- [Skipped and not applicable tests](#skipped-and-not-applicable-tests)
  - [CIS Benchmark v1.4 skipped tests](#cis-benchmark-v1-4-skipped-tests)
  - [CIS Benchmark v1.4 not applicable tests](#cis-benchmark-v1-4-not-applicable-tests)


# About the CIS Benchmark

The Center for Internet Security is a 501(c)(3) nonprofit organization, formed in October 2000, with a mission is to "identify, develop, validate, promote, and sustain best practice solutions for cyber defense and build and lead communities to enable an environment of trust in cyberspace". The organization is headquartered in East Greenbush, New York, with members including large corporations, government agencies, and academic institutions.

CIS Benchmarks are best practices for the secure configuration of a target system. CIS Benchmarks are developed through the generous volunteer efforts of subject matter experts, technology vendors, public and private community members, and the CIS Benchmark Development team.

The official Benchmark documents are available through the CIS website. The sign-up form to access the documents is [here.](https://learn.cisecurity.org/benchmarks)

To check clusters for CIS Kubernetes Benchmark compliance, the security scan leverages [kube-bench,](https://github.com/aquasecurity/kube-bench) an open-source tool from Aqua Security.

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

Refer to [the table in the cluster hardening guide]({{<baseurl>}}/rancher/v2.x/en/security/#rancher-hardening-guide) for information on which versions of Kubernetes, the Benchmark, Rancher, and our cluster hardening guide correspond to each other. Also refer to the hardening guide for configuration files of CIS-compliant clusters and information on remediating failed tests.



# Test Profiles

For every CIS benchmark version, Rancher ships with two types of profiles. These profiles are named based on the type of cluster (e.g. `RKE`), the CIS benchmark version (e.g. CIS 1.4) and the profile type (e.g. `Permissive` or `Hardened`). For example, a full profile name would be `RKE-CIS-1.4-Permissive`

All profiles will have a set of not applicable tests that will be skipped during the CIS scan. These tests are not applicable based on how a RKE cluster manages Kubernetes.

There are 2 types of profiles:

- **Permissive:** This profile has a set of tests that have been will be skipped as these tests will fail on a default RKE Kubernetes cluster. Besides the list of skipped tests, the profile will also not run the not applicable tests.
- **Hardened:** This profile will not skip any tests, except for the non-applicable tests.

In order to pass the "Hardened" profile, you will need to follow the steps on the [hardening guide]({{<baseurl>}}/rancher/v2.x/en/security/#rancher-hardening-guide) and use the `cluster.yml` defined in the hardening guide to provision a hardened cluster.

# Skipped and Not Applicable Tests

### CIS Benchmark v1.4 Skipped Tests

Number | Description | Reason for Skipping
---|---|---
1.1.11 | "Ensure that the admission control plugin AlwaysPullImages is set (Scored)" | Enabling AlwaysPullImages can use significant bandwidth.
1.1.21 | "Ensure that the --kubelet-certificate-authority argument is set as appropriate (Scored)" | When generating serving certificates, functionality could break in conjunction with hostname overrides which are required for certain cloud providers.
1.1.24 | "Ensure that the admission control plugin PodSecurityPolicy is set (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
1.1.34 | "Ensure that the --encryption-provider-config argument is set as appropriate (Scored)" | Enabling encryption changes how data can be recovered as data is encrypted.
1.1.35 | "Ensure that the encryption provider is set to aescbc (Scored)" | Enabling encryption changes how data can be recovered as data is encrypted.
1.1.36 | "Ensure that the admission control plugin EventRateLimit is set (Scored)" | EventRateLimit needs to be tuned depending on the cluster.
1.2.2 | "Ensure that the --address argument is set to 127.0.0.1 (Scored)" | Adding this argument prevents Rancher's monitoring tool to collect metrics on the scheduler.
1.3.7 | "Ensure that the --address argument is set to 127.0.0.1 (Scored)" | Adding this argument prevents Rancher's monitoring tool to collect metrics on the controller manager.
1.4.12 | "Ensure that the etcd data directory ownership is set to etcd:etcd (Scored)" | A system service account is required for etcd data directory ownership. Refer to Rancher's hardening guide for more details on how to configure this ownership.
1.7.2 | "Do not admit containers wishing to share the host process ID namespace (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
1.7.3 | "Do not admit containers wishing to share the host IPC namespace (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
1.7.4 | "Do not admit containers wishing to share the host network namespace (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
1.7.5 | " Do not admit containers with allowPrivilegeEscalation (Scored)" | Enabling Pod Security Policy can cause applications to unexpectedly fail.
2.1.6 | "Ensure that the --protect-kernel-defaults argument is set to true (Scored)" | System level configurations are required prior to provisioning the cluster in order for this argument to be set to true.
2.1.10 | "Ensure that the --tls-cert-file and --tls-private-key-file arguments are set as appropriate (Scored)" | When generating serving certificates, functionality could break in conjunction with hostname overrides which are required for certain cloud providers.

### CIS Benchmark v1.4 Not Applicable Tests

Number | Description | Reason for being not applicable
---|---|---
1.1.9 | "Ensure that the --repair-malformed-updates argument is set to false (Scored)" | The argument --repair-malformed-updates has been removed as of Kubernetes version 1.14
1.3.6 | "Ensure that the RotateKubeletServerCertificate argument is set to true" | Cluster provisioned by RKE handles certificate rotation directly through RKE.
1.4.1 | "Ensure that the API server pod specification file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for kube-apiserver.
1.4.2 | "Ensure that the API server pod specification file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for kube-apiserver.
1.4.3 | "Ensure that the controller manager pod specification file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for controller-manager.
1.4.4 | "Ensure that the controller manager pod specification file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for controller-manager.
1.4.5 | "Ensure that the scheduler pod specification file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for scheduler.
1.4.6 | "Ensure that the scheduler pod specification file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for scheduler.
1.4.7 | "Ensure that the etcd pod specification file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for etcd.
1.4.8 | "Ensure that the etcd pod specification file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn't require or maintain a configuration file for etcd.
1.4.13 |  "Ensure that the admin.conf file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE does not store the kubernetes default kubeconfig credentials file on the nodes.
1.4.14 | "Ensure that the admin.conf file ownership is set to root:root (Scored)" | Cluster provisioned by RKE does not store the kubernetes default kubeconfig credentials file on the nodes.
2.1.8 | "Ensure that the --hostname-override argument is not set (Scored)" | Clusters provisioned by RKE clusters and most cloud providers require hostnames.
2.1.12 | "Ensure that the --rotate-certificates argument is not set to false (Scored)" | Cluster provisioned by RKE handles certificate rotation directly through RKE.
2.1.13 | "Ensure that the RotateKubeletServerCertificate argument is set to true (Scored)" | Cluster provisioned by RKE handles certificate rotation directly through RKE.
2.2.3 | "Ensure that the kubelet service file permissions are set to 644 or more restrictive (Scored)" | Cluster provisioned by RKE doesn’t require or maintain a configuration file for the kubelet service.
2.2.4 | "Ensure that the kubelet service file ownership is set to root:root (Scored)" | Cluster provisioned by RKE doesn’t require or maintain a configuration file for the kubelet service.
2.2.9 | "Ensure that the kubelet configuration file ownership is set to root:root (Scored)" | RKE doesn’t require or maintain a configuration file for the kubelet.
2.2.10 | "Ensure that the kubelet configuration file has permissions set to 644 or more restrictive (Scored)" | RKE doesn’t require or maintain a configuration file for the kubelet.

