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
<h4>Announcements</h4>
<p style="padding: 8px">Subscribe to the <a href="https://forums.rancher.com/c/announcements">Rancher announcements forum</a> for release updates.</p>
</td>
</tr>
</table>

### Rancher Hardening Guide

The Rancher Hardening Guide is based off of controls and best practices found in the [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes/) from the Center for Internet Security. The hardening guide provides prescriptive guidance for hardening a production installation of Rancher v2.1.x. and Rancher v2.2.x. See Rancher's [Self Assessment of the CIS Kubernetes Benchmark](#cis-benchmark-rancher-self-assessment) for the full list of security controls.

- [Hardening Guide for Rancher v2.1.x with Kubernetes 1.11]({{< baseurl >}}/rancher/v2.x/en/security/hardening-2.1/)
- [Hardening Guide for Rancher v2.2.x with Kubernetes 1.13]({{< baseurl >}}/rancher/v2.x/en/security/hardening-2.2/)

### CIS Benchmark Rancher Self-Assessment

The benchmark self-assessment is a companion to the Rancher security hardening guide. While the hardening guide shows you how to harden the cluster, the benchmark guide is meant to help you evaluate the level of security of the hardened cluster.

Because Rancher and RKE install Kubernetes services as Docker containers, many of the control verification checks in the CIS Kubernetes Benchmark don't apply. This guide will walk through the various controls and provide updated example commands to audit compliance in Rancher created clusters.  The original benchmark documents can be downloaded from the [CIS website](https://www.cisecurity.org/benchmark/kubernetes/).

* [CIS Kubernetes Benchmark 1.3.0 - Rancher 2.1.x with Kubernetes 1.11]({{< baseurl >}}/rancher/v2.x/en/security/benchmark-2.1/)
* [CIS Kubernetes Benchmark 1.4.0 - Rancher 2.2.x with Kubernetes 1.13]({{< baseurl >}}/rancher/v2.x/en/security/benchmark-2.2/#cis-kubernetes-benchmark-1-4-0-rancher-2-2-x-with-kubernetes-1-13/)
* [CIS Kubernetes Benchmark 1.4.1 - Rancher 2.2.x with Kubernetes 1.13]({{< baseurl >}}/rancher/v2.x/en/security/benchmark-2.2/#cis-kubernetes-benchmark-1-4-1-rancher-2-2-x-with-kubernetes-1-13)

### Rancher CVEs and Resolutions

Rancher is committed to informing the community of security issues in our products. Rancher will publish CVEs (Common Vulnerabilities and Exposures) for issues we have resolved.

| ID | Description | Date | Resolution |
|----|-------------|------|------------|
| [CVE-2018-20321](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-20321) |  Any project member with access to the `default` namespace can mount the `netes-default` service account in a pod and then use that pod to execute administrative privileged commands against the Kubernetes cluster.  | 29 Jan 2019 | [Rancher v2.1.6](https://github.com/rancher/rancher/releases/tag/v2.1.6) and [Rancher v2.0.11](https://github.com/rancher/rancher/releases/tag/v2.0.11) - Rolling back from these versions or greater have specific [instructions]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/).  |
| [CVE-2019-6287](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-6287) | Project members continue to get access to namespaces from projects that they were removed from if they were added to more than one project. | 29 Jan 2019  |  [Rancher v2.1.6](https://github.com/rancher/rancher/releases/tag/v2.1.6) and [Rancher v2.0.11](https://github.com/rancher/rancher/releases/tag/v2.0.11)  |
| [CVE-2019-11202](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-11202) | The default admin, that is shipped with Rancher, will be re-created upon restart of Rancher despite being explicitly deleted. | 16 Apr 2019  |  [Rancher v2.2.2](https://github.com/rancher/rancher/releases/tag/v2.2.2), [Rancher v2.1.9](https://github.com/rancher/rancher/releases/tag/v2.1.9) and [Rancher v2.0.14](https://github.com/rancher/rancher/releases/tag/v2.0.14)  |
| [CVE-2019-12274](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-12274) | Nodes using the built-in node drivers using a file path option allows the machine to read arbitrary files including sensitive ones from inside the Rancher server container. | 5 Jun 2019  |  [Rancher v2.2.4](https://github.com/rancher/rancher/releases/tag/v2.2.4), [Rancher v2.1.10](https://github.com/rancher/rancher/releases/tag/v2.1.10) and [Rancher v2.0.15](https://github.com/rancher/rancher/releases/tag/v2.0.15)  |
| [CVE-2019-12303](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-12303) |  Project owners can inject extra fluentd logging configurations that makes it possible to read files or execute arbitrary commands inside the fluentd container. Reported by Tyler Welton from Untamed Theory. | 5 Jun 2019  |  [Rancher v2.2.4](https://github.com/rancher/rancher/releases/tag/v2.2.4), [Rancher v2.1.10](https://github.com/rancher/rancher/releases/tag/v2.1.10) and [Rancher v2.0.15](https://github.com/rancher/rancher/releases/tag/v2.0.15)   |
| [CVE-2019-13209](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13209) |  The vulnerability is known as a [Cross-Site Websocket Hijacking attack](https://www.christian-schneider.net/CrossSiteWebSocketHijacking.html). This attack allows an exploiter to gain access to clusters managed by Rancher with the roles/permissions of a victim. It requires that a victim to be logged into a Rancher server and then access a third-party site hosted by the exploiter. Once that is accomplished, the exploiter is able to execute commands against the Kubernetes API with the permissions and identity of the victim. Reported by Matt Belisle and Alex Stevenson from Workiva. | 15 Jul 2019  |   [Rancher v2.2.5](https://github.com/rancher/rancher/releases/tag/v2.2.5), [Rancher v2.1.11](https://github.com/rancher/rancher/releases/tag/v2.1.11) and [Rancher v2.0.16](https://github.com/rancher/rancher/releases/tag/v2.0.16) |
| [CVE-2019-14436](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-14436) |  The vulnerability allows a member of a project that has access to edit role bindings to be able to assign themselves or others a cluster level role granting them admin access to that cluster. The issue was found and reported by Michal Lipinski at Nokia. | 5 Aug 2019  | [Rancher v2.2.7](https://github.com/rancher/rancher/releases/tag/v2.2.7) and [Rancher v2.1.12](https://github.com/rancher/rancher/releases/tag/v2.1.12) |
| [CVE-2019-14435](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-14435) |  This vulnerability allows authenticated users to potentially extract otherwise private data out of IPs reachable from system service containers used by Rancher. This can include but not only limited to services such as cloud provider metadata services. Although Rancher allow users to configure whitelisted domains for system service access, this flaw can still be exploited by a carefully crafted HTTP request. The issue was found and reported by Matt Belisle and Alex Stevenson at Workiva. | 5 Aug 2019  | [Rancher v2.2.7](https://github.com/rancher/rancher/releases/tag/v2.2.7) and [Rancher v2.1.12](https://github.com/rancher/rancher/releases/tag/v2.1.12) |
