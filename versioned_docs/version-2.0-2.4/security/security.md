---
title: Security
weight: 20
---

<table width="100%">
<tr style="vertical-align: top;">
<td width="30%" style="border: none;">
<h4>Security policy</h4>
<p style="padding: 8px">Rancher Labs supports responsible disclosure, and endeavours to resolve all issues in a reasonable time frame. </p>
</td>
<td width="30%" style="border: none;">
<h4>Reporting process</h4>
<p style="padding: 8px">Please submit possible security issues by emailing <a href="mailto:security@rancher.com">security@rancher.com</a></p>
</td>
<td width="30%" style="border: none;">
<h4>Announcements</h4>
<p style="padding: 8px">Subscribe to the <a href="https://forums.rancher.com/c/announcements">Rancher announcements forum</a> for release updates.</p>
</td>
</tr>
</table>

Security is at the heart of all Rancher features. From integrating with all the popular authentication tools and services, to an enterprise grade [RBAC capability,]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac) Rancher makes your Kubernetes clusters even more secure.

On this page, we provide security-related documentation along with resources to help you secure your Rancher installation and your downstream Kubernetes clusters:

- [Running a CIS security scan on a Kubernetes cluster](#running-a-cis-security-scan-on-a-kubernetes-cluster)
- [Guide to hardening Rancher installations](#rancher-hardening-guide)
- [The CIS Benchmark and self-assessment](#the-cis-benchmark-and-self-assessment)
- [Third-party penetration test reports](#third-party-penetration-test-reports)
- [Rancher CVEs and resolutions](#rancher-cves-and-resolutions)

### Running a CIS Security Scan on a Kubernetes Cluster

_Available as of v2.4.0_ 

Rancher leverages [kube-bench](https://github.com/aquasecurity/kube-bench) to run a security scan to check whether Kubernetes is deployed according to security best practices as defined in the CIS (Center for Internet Security) Kubernetes Benchmark.

The CIS Kubernetes Benchmark is a reference document that can be used to establish a secure configuration baseline for Kubernetes.

The Center for Internet Security (CIS) is a 501(c\)(3) non-profit organization, formed in October 2000, with a mission to "identify, develop, validate, promote, and sustain best practice solutions for cyber defense and build and lead communities to enable an environment of trust in cyberspace."

CIS Benchmarks are best practices for the secure configuration of a target system. CIS Benchmarks are developed through the generous volunteer efforts of subject matter experts, technology vendors, public and private community members, and the CIS Benchmark Development team.

The Benchmark provides recommendations of two types: Scored and Not Scored. We run tests related to only Scored recommendations.

When Rancher runs a CIS security scan on a cluster, it generates a report showing the results of each test, including a summary with the number of passed, skipped and failed tests. The report also includes remediation steps for any failed tests.

For details, refer to the section on [security scans.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cis-scans)

### Rancher Hardening Guide

The Rancher Hardening Guide is based on controls and best practices found in the <a href="https://www.cisecurity.org/benchmark/kubernetes/" target="_blank">CIS Kubernetes Benchmark</a> from the Center for Internet Security.

The hardening guide provides prescriptive guidance for hardening a production installation of Rancher v2.1.x, v2.2.x and v.2.3.x. See Rancher's guides for [Self Assessment of the CIS Kubernetes Benchmark](#the-cis-benchmark-and-self-sssessment) for the full list of security controls.

> The hardening guides describe how to secure the nodes in your cluster, and it is recommended to follow a hardening guide before installing Kubernetes.

Each version of the hardening guide is intended to be used with specific versions of the CIS Kubernetes Benchmark, Kubernetes, and Rancher:

Hardening Guide Version | Rancher Version | CIS Benchmark Version | Kubernetes Version
------------------------|----------------|-----------------------|------------------
[Hardening Guide v2.4]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/hardening-2.4/) | Rancher v2.4 | Benchmark v1.5 | Kubernetes v1.15
[Hardening Guide v2.3.5]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/hardening-2.3.5/) | Rancher v2.3.5 | Benchmark v1.5 | Kubernetes v1.15
[Hardening Guide v2.3.3]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/hardening-2.3.3/) | Rancher v2.3.3 | Benchmark v1.4.1 | Kubernetes v1.14, v1.15, and v1.16
[Hardening Guide v2.3]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/hardening-2.3/) | Rancher v2.3.0-v2.3.2 | Benchmark v1.4.1 | Kubernetes v1.15
[Hardening Guide v2.2]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/hardening-2.2/) | Rancher v2.2.x | Benchmark v1.4.1 and 1.4.0 | Kubernetes v1.13
[Hardening Guide v2.1]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/hardening-2.1/) | Rancher v2.1.x | Benchmark v1.3.0 | Kubernetes v1.11

### The CIS Benchmark and Self-Assessment

The benchmark self-assessment is a companion to the Rancher security hardening guide. While the hardening guide shows you how to harden the cluster, the benchmark guide is meant to help you evaluate the level of security of the hardened cluster.

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher created clusters. The original benchmark documents can be downloaded from the [CIS website](https://www.cisecurity.org/benchmark/kubernetes/).

Each version of Rancher's self-assessment guide corresponds to specific versions of the hardening guide, Rancher, Kubernetes, and the CIS Benchmark:

Self Assessment Guide Version | Rancher Version | Hardening Guide Version | Kubernetes Version | CIS Benchmark Version
---------------------------|----------|---------|-------|-----
[Self Assessment Guide v2.4]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/benchmark-2.4/#cis-kubernetes-benchmark-1-5-0-rancher-2-4-with-kubernetes-1-15) | Rancher v2.4 | Hardening Guide v2.4 | Kubernetes v1.15 | Benchmark v1.5
[Self Assessment Guide v2.3.5]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/benchmark-2.3.5/#cis-kubernetes-benchmark-1-5-0-rancher-2-3-5-with-kubernetes-1-15) | Rancher v2.3.5 | Hardening Guide v2.3.5 | Kubernetes v1.15 | Benchmark v1.5
[Self Assessment Guide v2.3.3]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/benchmark-2.3.3/#cis-kubernetes-benchmark-1-4-1-rancher-2-3-3-with-kubernetes-1-16) | Rancher v2.3.3 | Hardening Guide v2.3.3 | Kubernetes v1.16 | Benchmark v1.4.1
[Self Assessment Guide v2.3]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/rancher-2.3.x/rancher-v2.3.0/benchmark-2.3/) | Rancher v2.3.0-2.3.2 | Hardening Guide v2.3 | Kubernetes v1.15 | Benchmark v1.4.1
[Self Assessment Guide v2.2]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/benchmark-2.2/) | Rancher v2.2.x | Hardening Guide v2.2 | Kubernetes v1.13 | Benchmark v1.4.0 and v1.4.1
[Self Assessment Guide v2.1]({{<baseurl>}}/rancher/v2.0-v2.4/en/security/benchmark-2.1/) | Rancher v2.1.x | Hardening Guide v2.1 | Kubernetes v1.11 | Benchmark 1.3.0

### Third-party Penetration Test Reports

Rancher periodically hires third parties to perform security audits and penetration tests of the Rancher 2.x software stack. The environments under test follow the Rancher provided hardening guides at the time of the testing. Results are posted when the third party has also verified fixes classified MEDIUM or above.

Results:

- [Cure53 Pen Test - 7/2019](https://releases.rancher.com/documents/security/pen-tests/2019/RAN-01-cure53-report.final.pdf)
- [Untamed Theory Pen Test- 3/2019](https://releases.rancher.com/documents/security/pen-tests/2019/UntamedTheory-Rancher_SecurityAssessment-20190712_v5.pdf)

### Rancher CVEs and Resolutions

Rancher is committed to informing the community of security issues in our products. For the list of CVEs (Common Vulnerabilities and Exposures) for issues we have resolved, refer to [this page.](./cve)
