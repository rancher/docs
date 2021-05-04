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

Security is at the heart of all Rancher features. From integrating with all the popular authentication tools and services, to an enterprise grade [RBAC capability,]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac) Rancher makes your Kubernetes clusters even more secure.

On this page, we provide security-related documentation along with resources to help you secure your Rancher installation and your downstream Kubernetes clusters:

- [Running a CIS security scan on a Kubernetes cluster](#running-a-cis-security-scan-on-a-kubernetes-cluster)
- [SELinux RPM](#selinux-rpm)
- [Guide to hardening Rancher installations](#rancher-hardening-guide)
- [The CIS Benchmark and self-assessment](#the-cis-benchmark-and-self-assessment)
- [Third-party penetration test reports](#third-party-penetration-test-reports)
- [Rancher CVEs and resolutions](#rancher-cves-and-resolutions)

### Running a CIS Security Scan on a Kubernetes Cluster

Rancher leverages [kube-bench](https://github.com/aquasecurity/kube-bench) to run a security scan to check whether Kubernetes is deployed according to security best practices as defined in the CIS (Center for Internet Security) Kubernetes Benchmark.

The CIS Kubernetes Benchmark is a reference document that can be used to establish a secure configuration baseline for Kubernetes.

The Center for Internet Security (CIS) is a 501(c\)(3) non-profit organization, formed in October 2000, with a mission to "identify, develop, validate, promote, and sustain best practice solutions for cyber defense and build and lead communities to enable an environment of trust in cyberspace."

CIS Benchmarks are best practices for the secure configuration of a target system. CIS Benchmarks are developed through the generous volunteer efforts of subject matter experts, technology vendors, public and private community members, and the CIS Benchmark Development team.

The Benchmark provides recommendations of two types: Scored and Not Scored. We run tests related to only Scored recommendations.

When Rancher runs a CIS security scan on a cluster, it generates a report showing the results of each test, including a summary with the number of passed, skipped and failed tests. The report also includes remediation steps for any failed tests.

For details, refer to the section on [security scans.]({{<baseurl>}}/rancher/v2.5/en/cis-scans)

### SELinux RPM

[Security-Enhanced Linux (SELinux)](https://en.wikipedia.org/wiki/Security-Enhanced_Linux) is a security enhancement to Linux. After being historically used by government agencies, SELinux is now industry standard and is enabled by default on CentOS 7 and 8.

We provide two RPMs (Red Hat packages) that enable Rancher products to function properly on SELinux-enforcing hosts: `rancher-selinux` and `rke2-selinux`. For details, see [this page.]({{<baseurl>}}/rancher/v2.5/en/security/selinux)

### Rancher Hardening Guide

The Rancher Hardening Guide is based on controls and best practices found in the <a href="https://www.cisecurity.org/benchmark/kubernetes/" target="_blank">CIS Kubernetes Benchmark</a> from the Center for Internet Security.

The hardening guides provide prescriptive guidance for hardening a production installation of Rancher. See Rancher's guides for [Self Assessment of the CIS Kubernetes Benchmark](#the-cis-benchmark-and-self-sssessment) for the full list of security controls.

> The hardening guides describe how to secure the nodes in your cluster, and it is recommended to follow a hardening guide before installing Kubernetes.

Each version of the hardening guide is intended to be used with specific versions of the CIS Kubernetes Benchmark, Kubernetes, and Rancher.

### The CIS Benchmark and Self-Assessment

The benchmark self-assessment is a companion to the Rancher security hardening guide. While the hardening guide shows you how to harden the cluster, the benchmark guide is meant to help you evaluate the level of security of the hardened cluster.

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher created clusters. The original benchmark documents can be downloaded from the [CIS website](https://www.cisecurity.org/benchmark/kubernetes/).

Each version of Rancher's self-assessment guide corresponds to specific versions of the hardening guide, Rancher, Kubernetes, and the CIS Benchmark.

### Third-party Penetration Test Reports

Rancher periodically hires third parties to perform security audits and penetration tests of the Rancher 2.x software stack. The environments under test follow the Rancher provided hardening guides at the time of the testing. Results are posted when the third party has also verified fixes classified MEDIUM or above.

Results:

- [Cure53 Pen Test - 7/2019](https://releases.rancher.com/documents/security/pen-tests/2019/RAN-01-cure53-report.final.pdf)
- [Untamed Theory Pen Test- 3/2019](https://releases.rancher.com/documents/security/pen-tests/2019/UntamedTheory-Rancher_SecurityAssessment-20190712_v5.pdf)

### Rancher CVEs and Resolutions

Rancher is committed to informing the community of security issues in our products. For the list of CVEs (Common Vulnerabilities and Exposures) for issues we have resolved, refer to [this page.](./cve)
