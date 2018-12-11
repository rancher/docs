---
title: Release v2.0.7
weight: 8
---

## Important

The default network selected when creating a Kubernetes cluster has been updated to `canal` with *no network policies*. With this change in default behavior, there are no network policy enforcements between projects, which means there *is* inter-project communication.

If you want to turn on network policies, which was the previous default behavior, then you would need to edit your cluster options to enable these network policies when deploying a cluster.

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.7
- rancher/rancher-agent:v2.0.7

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

- Latest - v2.0.7 - `rancher/rancher:latest`
- Stable - v2.0.6 - `rancher/rancher:stable`

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to [upgrade](https://rancher.com/docs/rancher/v2.x/en/upgrades/) or [rollback](https://rancher.com/docs/rancher/v2.x/en/backups/rollbacks/) to change the Rancher version.

**Any upgrade after v2.0.3, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.

> **Note:** If you had the helm stable catalog enabled in v2.0.0, we've updated the catalog to start pointing directly to the kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]

## Enhancements

- **Performance Improvements [[#14372](https://github.com/rancher/rancher/issues/14372), [#14402](https://github.com/rancher/rancher/issues/14402), [#14409](https://github.com/rancher/rancher/issues/14409)]** - In this release, we've added enhancements to improve the performance of Rancher.
- **Ability to turn on and off network policies for canal networking [[#14462](https://github.com/rancher/rancher/issues/14462)]** - For new clusters, network policies are now off by default and we've exposed the ability to turn the feature on and off.
- **Support for Ping Federate [[#11169](https://github.com/rancher/rancher/issues/11169)]** - Ping Federate has been implemented as an authentication provider and can be selected as an option.
- **Support for ADFS [[#14609](https://github.com/rancher/rancher/issues/14609)]** - Ping Federate has been implemented as an authentication provider and can be selected as an option.
- **Ability to configure the default user role [[#12737](https://github.com/rancher/rancher/issues/12737)]** - Rancher admins can now specify the global role(s) a user receives when they log in for the first time and what role(s) a user is assigned when they create a cluster or project.
- **Ability to Collect Audit Logs [[#12733](https://github.com/rancher/rancher/issues/12733)]** - Rancher can now be configured to collect and expose via a REST API an audit log of all activities performed by users in the Rancher API.
- **System Project [[#12706](https://github.com/rancher/rancher/issues/12706)]** - All clusters will now have a system project into which all Kubernetes and Rancher system namespaces will be place. This is to allow Rancher to properly manage these important namespaces.
- **Added Default Pod Security Policies [[#12832](https://github.com/rancher/rancher/issues/12832)]** - There are now 2 default pod security policies in Rancher, `restricted` and `unrestricted`.
- **Added ability to deploy metrics server  [[#13745](https://github.com/rancher/rancher/issues/13745)]** - Clusters using RKE (custom nodes or node pools) have the ability to deploy a metrics server
- **Added additional fields for GKE and EKS [[#14566](https://github.com/rancher/rancher/issues/14566), [#13789](https://github.com/rancher/rancher/issues/13789)]** - New fields have been exposed for GKE and EKS to allow better control over cluster creation

- **Version Changes**
  - **Added Kubernetes 1.11 Support [[#13837](https://github.com/rancher/rancher/issues/13837)] and dropped Kubernetes 1.8 as an option during cluster creation [[#14517](https://github.com/rancher/rancher/issues/14517)]**
  - **Updated Docker Machine to v0.15.0**
    - Adds cn-northwest support in for AWS [[#11192](https://github.com/rancher/rancher/issues/11192)]
  - **NGINX ingress controller updated to v1.16 [[#13294](https://github.com/rancher/rancher/issues/13294)]**
  - **Helm updated to v2.9.1 [[14023](https://github.com/rancher/rancher/issues/14023)]**

## Known Major Issues

## Major Bug Fixes since v2.0.6

- Fixed an issue where project alerts using workload selectors were not project specific [[#13183](https://github.com/rancher/rancher/issues/13183)]
- Fixed an issue where logging wasn't able to work if you had a custom docker root directory. You can now specify where the docker root directory is when creating your cluster [[#13304](https://github.com/rancher/rancher/issues/13304)]
- Fixed an issue where there was no way to specify a namespace in catalog.yml files [[#13519](https://github.com/rancher/rancher/issues/13519)]
- Fixed an issue where after upgrade, ingresses might have thrown 503s or inability to target new workloads [[#13611](https://github.com/rancher/rancher/issues/13611)]
- Fixed an issue where defunct processes wouldn't be cleaned up [[#13858](https://github.com/rancher/rancher/issues/13858)]
- Fixed an issue where you couldn't add a persistent volume with the local node disk option [[#13864](https://github.com/rancher/rancher/issues/13864)]
- Fixed an issue where if you had multiple private registries, you couldn't clone or upgrade the workload to use a different private registry [[#13872](https://github.com/rancher/rancher/issues/13872)]
- Fixed an issue where you couldn't use `kubectl top` in our kubectl shell [[#14025](https://github.com/rancher/rancher/issues/14025)]
- Fixed an issue where subpaths for volume mounts were not being validated before creating workloads [[#14061](https://github.com/rancher/rancher/issues/14061)]
- Fixed an issue where you couldn't change a worker and control plane node into a control plane only node [[#14133](https://github.com/rancher/rancher/issues/14133)]
- Fixed an issue where service accounts were not getting the Pod Security Police role bindings assigned [[#14441](https://github.com/rancher/rancher/issues/14441)]
- Fixed an issue where there was no easy way to disable the default nginx ingress controller [[#14516](https://github.com/rancher/rancher/issues/14516)]
- Fixed an issue where you had to add the domain as part of service account username when configuring Active Directory [[#14708](https://github.com/rancher/rancher/issues/14708)]
- Fixed an issue where cluster, apps/workloads could get stuck in deleting [[#11991](https://github.com/rancher/rancher/issues/11991)]
- Fixed an issue where if one of the control planes was unavailable, then you couldn't add any worker or control plane nodes into the cluster [[#13706](https://github.com/rancher/rancher/issues/13706)]
- Fixed an issue where kubelt containers are removed from worker nodes if duplicate binds are in the cluster config yaml [[#14470](https://github.com/rancher/rancher/issues/14470)]
- Fixed an issue where adding members to a cluster with multiple custom roles were creating multiple user accounts and making it impossible for the user to log in [[#14822](https://github.com/rancher/rancher/issues/14822)]
- Fixed an issue where control node taint might be missing on nodes after bringing up different nodes at different times with different roles [[#14896](https://github.com/rancher/rancher/issues/14896)]

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.4