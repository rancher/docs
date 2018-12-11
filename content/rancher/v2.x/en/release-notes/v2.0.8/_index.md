---
title: Release v2.0.8
weight: 9
---

## Important

### Network Policies

The default network selected when creating a Kubernetes cluster has been updated to `canal` with *no network policies*. With this change in default behavior, there are no network policy enforcements between projects, which means there *is* inter-project communication.

If you want to turn on network policies, which was the previous default behavior, then you would need to edit your cluster options to enable these network policies when deploying a cluster.

### Namespaces

As of v2.0.7, we introduced a "System Project", which has specific namespaces, i.e. `cattle-namesystem`. If these namespaces have been assigned to a project before upgrading, please move them out of the project before upgrading, so they can be appropriately moved into the system project.

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.8
- rancher/rancher-agent:v2.0.8

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

- Latest - v2.0.8 - `rancher/rancher:latest`
- Stable - v2.0.8 - `rancher/rancher:stable`

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to [upgrade](https://rancher.com/docs/rancher/v2.x/en/upgrades/) or [rollback](https://rancher.com/docs/rancher/v2.x/en/backups/rollbacks/) to change the Rancher version.

**Any upgrade after v2.0.3, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.

## Enhancements

## Known Major Issues

## Major Bug Fixes since v2.0.7

- Fixed an issue where Kubernetes 1.11.1 didn't have the correct cipher suite installed. All users using Kubernetes 1.11.1 is recommended to upgrade to Kubernetes 1.11.2  [[#15120](https://github.com/rancher/rancher/issues/15120)]
- Fixed an issue where a single node installation might fail to come up if etcd took longer than 10 seconds to start up [[#15077](https://github.com/rancher/rancher/issues/15077)]
- Fixed an issue where catalog refreshes would not back off if there was an error and cause installations to use up all the CPU and several GB of RAM [[#15103](https://github.com/rancher/rancher/issues/15103)]
- Fixed an issue where helm charts with required values would fail when trying to generate notes [[#15167](https://github.com/rancher/rancher/issues/15167)]
- Fixed an issue where a user was not completely being deleted from Rancher as a secret was still being stored for them [[#15067](https://github.com/rancher/rancher/issues/15067)]
- Fixed an issue where the default base user had read only permissions for principals and users, but only admins should have this ability unless explicitly added to the default base user [[#15061](https://github.com/rancher/rancher/issues/15061)]

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.4