---
title: Release Notes
aliases:
  - /rancher/v2.5/en/cluster-admin/tools/istio/release-notes
  - /rancher/v2.5/en/istio/v2.5/release-notes
---

# Istio 1.5.9 release notes

**Bug fixes**

* The Kiali traffic graph is now working [#28109](https://github.com/rancher/rancher/issues/28109)

**Known Issues**

* The Kiali traffic graph is offset in the UI [#28207](https://github.com/rancher/rancher/issues/28207)


# Istio 1.5.8

### Important note on 1.5.x versions

When upgrading from any 1.4 version of Istio to any 1.5 version, the Rancher installer will delete several resources in order to complete the upgrade, at which point they will be immediately re-installed. This includes the `istio-reader-service-account`. If your Istio installation is using this service account be aware that any secrets tied to the service account will be deleted. Most notably this will **break specific [multi-cluster deployments](https://archive.istio.io/v1.4/docs/setup/install/multicluster/)**. Downgrades back to 1.4 are not possible.

See the official upgrade notes for additional information on the 1.5 release and upgrading from 1.4: https://istio.io/latest/news/releases/1.5.x/announcing-1.5/upgrade-notes/

> **Note:** Rancher continues to use the Helm installation method, which produces a different architecture from an istioctl installation.

### Known Issues

* The Kiali traffic graph is currently not working [#24924](https://github.com/istio/istio/issues/24924)