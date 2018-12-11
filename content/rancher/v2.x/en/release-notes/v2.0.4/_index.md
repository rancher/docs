---
title: Release v2.0.4
weight: 5
---

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.4
- rancher/rancher-agent:v2.0.4

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

- Latest - v2.0.4 - `rancher/rancher:latest`
- Stable - v2.0.2 - `rancher/rancher:stable`

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to upgrade or rollback to and follow the [instructions](https://rancher.com/docs/rancher/v2.x/en/upgrades/) to change the Rancher version.

**Post upgrade, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.
> **Note:** If you had the helm stable catalog enabled in v2.0.0, we've updated the catalog to start pointing directly to the kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]

## Enhancements

Please refer to the [v2.0.3 release notes for all new enhancements and changes](https://github.com/rancher/rancher/releases/tag/v2.0.3)

## Known Major Issues

- After upgrade, ingresses may have some issues with showing 503s or inability to target new workloads, the current workaround is to re-create the ingress [[#13611](https://github.com/rancher/rancher/issues/13611)]

## Major Bug Fixes since v2.0.3

- Fixed an issue where you were unable to update catalog items [[#14186](https://github.com/rancher/rancher/issues/14186), [#14183](https://github.com/rancher/rancher/issues/14183)]

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.2