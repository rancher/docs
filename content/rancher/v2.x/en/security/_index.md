---
title: Rancher Security
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

### Rancher Vulnerabilities

| ID | Description | Date | Resolution |
|----|-------------|------|------------|
| [CVE-2018-20321](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-20321) |  Any project member with access to the `default` namespace can mount the `netes-default` service account in a pod and then use that pod to execute administrative privileged commands against the Kubernetes cluster.  | 29 Jan 2019 | [Rancher v2.1.6](https://github.com/rancher/rancher/releases/tag/v2.1.6) and [Rancher v2.0.11](https://github.com/rancher/rancher/releases/tag/v2.0.11) - Rolling back from these versions or greater have specific [instructions]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/).  |
| [CVE-2019-6287](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-6287) | Project members continue to get access to namespaces from projects that they were removed from if they were added to more than one project. | 29 Jan 2019  |  [Rancher v2.1.6](https://github.com/rancher/rancher/releases/tag/v2.1.6) and [Rancher v2.0.11](https://github.com/rancher/rancher/releases/tag/v2.0.11)  |
