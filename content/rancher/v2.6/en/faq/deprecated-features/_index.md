---
title: Deprecated Features in Rancher
weight: 100
---

### What is Rancher's Deprecation policy?

We have published our official deprecation policy in the support [terms of service](https://www.rancher.com/support-maintenance-terms).

### Where can I find out which features have been deprecated in Rancher?

Rancher will publish deprecated features as part of the [release notes](https://github.com/rancher/rancher/releases) for Rancher found on GitHub. Please consult the following patch releases for deprecated features:

| Patch Version |  Release Date |
|---------------|---------------|
| [2.6.0](https://github.com/rancher/rancher/releases/tag/v2.6.0) |  Aug 31, 2021  |
| [2.6.1](https://github.com/rancher/rancher/releases/tag/v2.6.1) |  Oct 11, 2021  |
| [2.6.2](https://github.com/rancher/rancher/releases/tag/v2.6.2) |  Oct 19, 2021  |
| [2.6.3](https://github.com/rancher/rancher/releases/tag/v2.6.3) |  Dec 21, 2021  |
| [2.6.4](https://github.com/rancher/rancher/releases/tag/v2.6.4) |  Mar 31, 2022  |
| [2.6.5](https://github.com/rancher/rancher/releases/tag/v2.6.5) |  May 12, 2022  |


### What can I expect when a feature is marked for deprecation?

In the release where functionality is marked as "Deprecated", it will still be available and supported allowing upgrades to follow the usual procedure. Once upgraded, users/admins should start planning to move away from the deprecated functionality before upgrading to the release it marked as removed. The recommendation for new deployments is to not use the deprecated feature.