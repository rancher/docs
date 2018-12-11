---
title: Release v2.0.1
weight: 2
---

> **Note:** There is a major issue where v2.0.1 cannot be authenticated with Github auth. We've released v2.0.2 to fix this issue.

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.1
- rancher/rancher-agent:v2.0.1

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

- Latest - v2.0.1 - `rancher/rancher:latest`
- Stable - v2.0.0 - `rancher/rancher:stable`

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.1.  Please note the version you would like to upgrade or rollback to and follow the [instructions](https://rancher.com/docs/rancher/v2.x/en/upgrades/) to change the Rancher version.

> **Note:** In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.
> **Note:** If you had the helm stable catalog enabled in previous releases, we've updated the catalog to start pointing directly to the kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]

## New Enhancements

- **Added ability to import/export Workloads/Services/Namespaces as a YAML [[#12371](https://github.com/rancher/rancher/issues/12371)]**
- **Added ability to mark RoleTemplates as `protected` [[#13418](https://github.com/rancher/rancher/issues/13418)]** - This will allow admins to control the ability to select when adding members to clusters and projects.
- **Rancher CLI Enhancements**
  - Added ability to inspect additional k8s resources [[#12831](https://github.com/rancher/rancher/issues/12831)]
  - Added ability to use catalog [[#13101](https://github.com/rancher/rancher/issues/13101)]
  - Added ability to change context [[#13235](https://github.com/rancher/rancher/issues/13235)]
  - Added ability to work with apps [[#13390](https://github.com/rancher/rancher/issues/13390)]
  - Added ability to install catalog helm charts from local file systems [[#13518](https://github.com/rancher/rancher/issues/13518)]

## Migrating from Rancher 1.6

By embarking on the Rancher 2.0 project, all of the legacy Rancher 1.6 Java modules were completely rewritten in Go, and in the process touched just about every other module in the system. As such, there will not be a direct upgrade  from 1.6.x to 2.0.

We do plan to continue to support Rancher 1.6.x for at least another year after 2.1 has been released to give our users time to plan this migration.

## Known Major Issues

- Unable to authenticate Github [[#13665](https://github.com/rancher/rancher/issues/13665)]
- After upgrade, ingresses may have some issues with showing 503s or inability to target new workloads, the current workaround is to re-create the ingress [[#13649](https://github.com/rancher/rancher/issues/13649), [#13611](https://github.com/rancher/rancher/issues/13611)]

## Major Bug Fixes since v2.0.0

- Fixed an issue where specifying address/internal-address wasn't working when adding a custom host [[#11365](https://github.com/rancher/rancher/issues/11365)]
- Fixed an issue where embedded elastic search does not start [[#13043](https://github.com/rancher/rancher/issues/13043)]
- Fixed an issue where active directory was slow to search for AD setups with a lot of users [[#13232](https://github.com/rancher/rancher/issues/13232), [#13300](https://github.com/rancher/rancher/issues/13300), [#13421](https://github.com/rancher/rancher/issues/13421)]
- Fixed an issue where azure with azure cloud provider wouldn't start correctly [[#13233](https://github.com/rancher/rancher/issues/13233)]
- Fixed an issue where rancher/agent wouldn't log errors if the configured cacerts were not equal to the retrieved certificate [[#13244](https://github.com/rancher/rancher/issues/13244)]
- Fixed a couple of issues relating to storage [[#13113](https://github.com/rancher/rancher/issues/13113), [#13198](https://github.com/rancher/rancher/issues/13198)]
- Fixed [multiple UI reported issues](https://github.com/rancher/rancher/issues?q=is%3Aissue+milestone%3Av2.0.1+is%3Aclosed+label%3Aarea%2Fui)

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.1