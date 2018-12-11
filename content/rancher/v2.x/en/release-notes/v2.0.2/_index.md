---
title: Release v2.0.2
weight: 3
---

> **Note:** We found a major issue where Github Auth was not able to be turned on in v2.0.1 and released v2.0.2 to fix it. To review all the enhancements and bug fixes since v2.0.0, please review the [v2.0.1 release notes](https://github.com/rancher/rancher/releases/tag/v2.0.1).

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.2
- rancher/rancher-agent:v2.0.2

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

- Latest - v2.0.2 - `rancher/rancher:latest`
- Stable - v2.0.0 - `rancher/rancher:stable`

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to upgrade or rollback to and follow the [instructions](https://rancher.com/docs/rancher/v2.x/en/upgrades/) to change the Rancher version.

> **Note:** In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.

> **Note:** If you had the helm stable catalog enabled in previous releases, we've updated the catalog to start pointing directly to the kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]

## New Enhancements

## Migrating from Rancher 1.6

By embarking on the Rancher 2.0 project, all of the legacy Rancher 1.6 Java modules were completely rewritten in Go, and in the process touched just about every other module in the system. As such, there will not be a direct upgrade  from 1.6.x to 2.0.

We do plan to continue to support Rancher 1.6.x for at least another year after 2.1 has been released to give our users time to plan this migration.

## Known Major Issues

- After upgrade, ingresses may have some issues with showing 503s or inability to target new workloads, the current workaround is to re-create the ingress [[#13649](https://github.com/rancher/rancher/issues/13649), [#13611](https://github.com/rancher/rancher/issues/13611)]

## Major Bug Fixes since v2.0.1

- Fixed an issue where users were unable to authenticate Github [[#13665](https://github.com/rancher/rancher/issues/13665)]

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.1