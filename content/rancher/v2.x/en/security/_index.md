---
title: Security
weight: 7505
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
<h4>Announcments</h4>
<p style="padding: 8px">Subscribe to the <a href="https://forums.rancher.com/c/announcements">Rancher announcements forum</a> for release updates.</p>
</td>
</tr>
</table>

### Rancher Hardening Guide

The Rancher Hardening Guide is based off of controls and best practices found in the [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/). The hardening guide provides prescriptive guidance for hardening a production installation of Rancher v2.1.x. See Rancher's [Self Assessment of the CIS Kubernetes Benchmark](#CIS-Benchmark-Rancher-Self-Assessment) for the full list of security controls.

* [CIS Kubernetes Benchmark 1.3.0 - Rancher 2.1.x with Kubernetes 1.11]({{< baseurl >}}/rancher/v2.x/en/security/hardening-2.1/)

### CIS Benchmark Rancher Self-Assessment

This document is a companion to the Rancher v2.1.x security hardening guide. While the hardening guide shows you how to harden the cluster, the benchmark guide is meant to help you evaluate the level of security of the hardened cluster.

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher created clusters. The original benchmark documents can be downloaded from the [CIS website](https://www.cisecurity.org/benchmark/kubernetes/).

* [CIS Kubernetes Benchmark 1.3.0 - Rancher 2.1.x with Kubernetes 1.11]({{< baseurl >}}/rancher/v2.x/en/security/benchmark-2.1/)

### Rancher CVEs and Resolutions

Rancher is committed to informing the community of security issues in our products. Rancher will publish CVEs (Common Vulnerabilities and Exposures) for issues we have resolved.

| ID | Description | Date | Resolution |
|----|-------------|------|------------|
| [CVE-2018-20321](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-20321) |  Any project member with access to the `default` namespace can mount the `netes-default` service account in a pod and then use that pod to execute administrative privileged commands against the Kubernetes cluster.  | 29 Jan 2019 | [Rancher v2.1.6](https://github.com/rancher/rancher/releases/tag/v2.1.6) and [Rancher v2.0.11](https://github.com/rancher/rancher/releases/tag/v2.0.11) - Rolling back from these versions or greater have specific [instructions]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/).  |
| [CVE-2019-6287](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-6287) | Project members continue to get access to namespaces from projects that they were removed from if they were added to more than one project. | 29 Jan 2019  |  [Rancher v2.1.6](https://github.com/rancher/rancher/releases/tag/v2.1.6) and [Rancher v2.0.11](https://github.com/rancher/rancher/releases/tag/v2.0.11)  |
| [CVE-2019-11202](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-11202) | The default admin, that is shipped with Rancher, will be re-created upon restart of Rancher despite being explicitly deleted. | 16 Apr 2019  |  [Rancher v2.2.2](https://github.com/rancher/rancher/releases/tag/v2.2.2), [Rancher v2.1.9](https://github.com/rancher/rancher/releases/tag/v2.1.9) and [Rancher v2.0.14](https://github.com/rancher/rancher/releases/tag/v2.0.14)  |
| [CVE-2019-12274](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-12274) | Nodes using the built-in node drivers using a file path option allows the machine to read arbitrary files including sensitive ones from inside the Rancher server container. | 5 Jun 2019  |  [Rancher v2.2.4](https://github.com/rancher/rancher/releases/tag/v2.2.4), [Rancher v2.1.10](https://github.com/rancher/rancher/releases/tag/v2.1.10) and [Rancher v2.0.15](https://github.com/rancher/rancher/releases/tag/v2.0.15)  |
| [CVE-2019-12303](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-12303) |  Project owners can inject extra fluentd logging configurations that makes it possible to read files or execute arbitrary commands inside the fluentd container. Reported by Tyler Welton from Untamed Theory. | 5 Jun 2019  |  [Rancher v2.2.4](https://github.com/rancher/rancher/releases/tag/v2.2.4), [Rancher v2.1.10](https://github.com/rancher/rancher/releases/tag/v2.1.10) and [Rancher v2.0.15](https://github.com/rancher/rancher/releases/tag/v2.0.15)   |
