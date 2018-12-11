---
title: Release v2.0.9
weight: 10
---

## Important

### Security fixes

This release updates to the latest Kubernetes versions (i.e. v1.10.11 and v1.11.5) for clusters launched by Rancher to address [Kubernetes CVE-2018-1002105](https://github.com/kubernetes/kubernetes/issues/71411). We recommend upgrading your Kubernetes clusters to these versions.

### Network Policies

The default network selected when creating a Kubernetes cluster has been updated to `canal` with *no network policies*. With this change in default behavior, there are no network policy enforcements between projects, which means there *is* inter-project communication.

If you want to turn on network policies, which was the previous default behavior, then you would need to edit your cluster options to enable these network policies when deploying a cluster.

### Namespaces

As of v2.0.7, we introduced a "System Project", which has specific namespaces, i.e. `cattle-namesystem`. If these namespaces have been assigned to a project before upgrading, please move them out of the project before upgrading, so they can be appropriately moved into the system project.

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.9
- rancher/rancher-agent:v2.0.9

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

- Latest - v2.1.3 - `rancher/rancher:latest`
- Stable - v2.1.3 - `rancher/rancher:stable`

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to [upgrade](https://rancher.com/docs/rancher/v2.x/en/upgrades/) or [rollback](https://rancher.com/docs/rancher/v2.x/en/backups/rollbacks/) to change the Rancher version.

**Any upgrade after v2.0.3, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.

## Enhancements

## Known Major Issues

- Sometimes new Kubernetes version doesn't get updated right away on the upgraded Kubernetes clusters; it gets fixed as soon as user application gets deployed on the node [[15831](https://github.com/rancher/rancher/issues/15831)]

## Major Bug Fixes since v2.0.8

- Added updated Kubernetes versions (i.e. v1.10.11 and v1.11.5) to address [Kubernetes CVE-2018-1002105](https://github.com/kubernetes/kubernetes/issues/71411) for clusters launched by Rancher. The default Kubernetes version is v1.11.5. [[16835](https://github.com/rancher/rancher/issues/16835)]

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.4