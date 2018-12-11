---
title: Release v2.0.6
weight: 7
---

## Important

The default network selected when creating a Kubernetes cluster has reverted back from `flannel` to `canal`, which automatically enables network policy enforcements between projects.  In an upcoming release, we will be introducing the ability to select whether or not you want the network policy enforcements (no inter-project network communication) between projects.

Active Directory and OpenLDAP users: If you are using AD or openLDAP, please review the schema section on whether or not you want the nested group membership setting enabled. By enabling nested group membership, it will provide permissions to users that are in groups of groups, but due to this extensive user search, it could cause slower search results/log in.

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.6
- rancher/rancher-agent:v2.0.6

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

- Latest - v2.0.6 - `rancher/rancher:latest`
- Stable - v2.0.4 - `rancher/rancher:stable`

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to [upgrade](https://rancher.com/docs/rancher/v2.x/en/upgrades/) or [rollback](https://rancher.com/docs/rancher/v2.x/en/backups/rollbacks/) to change the Rancher version.

**Any upgrade after v2.0.3, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.
> **Note:** If you had the helm stable catalog enabled in v2.0.0, we've updated the catalog to start pointing directly to the kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]

## Enhancements

## Known Major Issues

- After upgrade, ingresses may have some issues with showing 503s or inability to target new workloads, the current workaround is to re-create the ingress [[#13611](https://github.com/rancher/rancher/issues/13611)]
- Authenticating with Active Directory: With v2.0.5 and v2.0.6, you are required to add in the domain as part of the service account username. [[#14708](https://github.com/rancher/rancher/issues/14708)]

## Major Bug Fixes since v2.0.5

- Fixed an issue where supporting nested group searching in Active Directory and openLDAP was having issues with taking long times to search by turning it off by default. This can be customized to be turned on when customizing your schema for configuring Active Directory and openLDAP. Note: AzureAD and FreeIPA automatically search for nested groups and do not have this customization option.  [[#14482](https://github.com/rancher/rancher/issues/14482)]
- Fixed an issue where during upgrade, if a cluster used OSes that do not have persistent directories (i.e. RancherOS, CoreOS, boot2docker), then their cluster would fail as kubelets wouldn't have been able to be started due to missing certificates [[#14454](https://github.com/rancher/rancher/issues/14454)]
- Fixed an issue where openLDAP was not doing a service account bind before trying to look up the user to authenticate openLDAP [[#12729](https://github.com/rancher/rancher/issues/12729), [#14456](https://github.com/rancher/rancher/issues/14456)]
- Changed the default networking back to `canal` until we introduce the ability to select either `canal` with  or without enabled network policies [[#14462](https://github.com/rancher/rancher/issues/14462)]

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.3