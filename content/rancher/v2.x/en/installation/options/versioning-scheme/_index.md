---
title: Rancher Versioning Scheme
weight: 231
---

This page is a brief overview of how Rancher versions work, explaining the difference between major, minor, and maintenance releases.

For help choosing a Rancher version to install, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/options/server-tags)

There are four main types of release:

- **Major release:** A rare release with major, breaking changes. Rancher 2 was major release because it no longer supported the Cattle orchestration system.
- **Minor Release (2.x):** A release with major features and enhancements.
- **Maintenance Release (2.x.x):** A release with minor enhancements and bug fixes.
- **CVE Release:** Released on demand, when addressing a Rancher CVE or K8S CVE. For more information on Rancher CVEs and resolutions, refer to the [security]({{<baseurl>}}/rancher/v2.x/en/security/#rancher-cves-and-resolutions) section.

GA releases can be used in production.

Details about new features and enhancements in each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)

Releases marked as Alpha or `rc` (release candidate) should only be used for evaluation purposes.

### Release Branches

As of January 2020, four release branches are maintained for Rancher 2, and one release branch is maintained for Rancher 1.6.

- Rancher 2.4.x
- Rancher 2.3.x
- Rancher 2.2.x
- Rancher 2.1.x
- Rancher 1.6.x

All maintained release branches are updated with CVE releases.