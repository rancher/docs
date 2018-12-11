---
title: Release v2.1.0
weight: 11
---

Rancher v2.1.0 introduces new improvements to Kubernetes cluster operations and app management, as well as a migration path for users moving from Rancher's Cattle orchestrator introduced in 1.x to Rancher Kubernetes.  Please refer to the following [link](https://rancher.com/docs/rancher/v2.x/en/v1.6-migration/) for guides, blogs, and how-tos to moving a 1.6 Cattle application into the next generation 2.0 Kubernetes equivalent.

With this release, the follow versions are now latest and stable:

- **Latest - v2.1.0 - `rancher/rancher:latest`**
- **Stable - v2.0.8 - `rancher/rancher:stable`**

**`v2.1.0`** or a patched version of it will be promoted to stable after a period of hardening and bake-in in our open source community.

Below is a list of the major items addressed in this release. For a comprehensive list of all features, enhancements, improvements, and bug fixes, see the [v2.1 GitHub Milestone](https://github.com/rancher/rancher/milestone/121).

## Major Features and Enhancements

- **Support for project quotas [[#13277](https://github.com/rancher/rancher/issues/13277)]** - Cluster and project owners can now set quotas on Kubernetes resources at the cluster and project level. For more information, see [the Rancher documentation](https://rancher.com/docs/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/resource-quotas/) and [the Kubernetes documentation](https://kubernetes.io/docs/concepts/policy/resource-quotas/).
- **Rancher HA improvements** - Administrators can now configure an HA setup with more than one Rancher server. This provides better redundancy and horizontal scalability.
- **Support for draining nodes [[#14265](https://github.com/rancher/rancher/issues/14265)]** - Cluster owners can now drain nodes in order to perform maintenance or other disruptive tasks on them. For more information, see [the Rancher documentation](https://rancher.com/docs/rancher/v2.x/en/k8s-in-rancher/nodes/#draining-a-node) and [the Kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/).
- **CI/CD pipeline UX improvements [[#14282](https://github.com/rancher/rancher/issues/14282)]** - Users will find the CI/CD pipeline more intuitive, easier to use, and with more features. For more information, see [the Rancher documentation]( https://rancher.com/docs/rancher/v2.x/en/tools/pipelines/).
- **Support for GitLab in CI pipelines [[#12608](https://github.com/rancher/rancher/issues/12608)]** - Users can now configure Rancher Pipelines to integrate with GitLab.
- **Support for Keycloak as an authentication provider [[#14730](https://github.com/rancher/rancher/issues/14730)]** - Administrators can now configure [Keycloak](https://www.keycloak.org/) as an authentication provider. For more information, see [the Rancher documentation](https://rancher.com/docs/rancher/v2.x/en/admin-settings/authentication/keycloak/).
- **Support for EKS Platform Version 2 [[#15487](https://github.com/rancher/rancher/issues/15487)]** - Version 2 is now used for all newly created EKS clusters. For more information on the improvements in this version, see [the AWS announcement](https://aws.amazon.com/about-aws/whats-new/2018/08/introducing-amazon-eks-platform-version-2/).
- **Support for editing Helm values.yaml in Rancher catalogs [[#13064](https://github.com/rancher/rancher/issues/13064)] [[#14844](https://github.com/rancher/rancher/issues/14844)]** - User can now achieve a higher degree of customization with Rancher catalog items by directly editing their Helm values.yaml file in the Rancher UI or by uploading a custom values.yaml file.
- **Created a tool to clean up Rancher installations on Kubernetes Clusters [[#13505](https://github.com/rancher/rancher/issues/13505)]** - The [system-tools utility](https://github.com/rancher/system-tools) removes all Rancher installation components installed on a Kubernetes cluster. For more information, see [the Rancher documentation](https://rancher.com/docs/rancher/v2.x/en/admin-settings/removing-rancher/rancher-cluster-nodes/)
- **EXPERIMENTAL support for Windows Kubernetes clusters** - Administrators can now create EXPERIMENTAL Windows Kubernetes clusters. For more information, see [the Rancher documentation](https://rancher.com/docs//rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/).
- **EXPERIMENTAL support for Kubernetes 1.12 [[#15872](https://github.com/rancher/rancher/issues/15872)]** - Users can now create EXPERIMENTAL Kubernetes 1.12 clusters. For more information, see [the Kubernetes release notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG-1.12.md).

## Major Bug Fixes since v2.0.8

- Fixed an issue where Rancher would panic when creating a node via the API [[#14867](https://github.com/rancher/rancher/issues/14867)]
- Fixed an issue ingress controllers would not pick up updated certificates [[#15073](https://github.com/rancher/rancher/issues/15073)]
- Fixed an issue where a user would get stuck in removing state [[#15188](https://github.com/rancher/rancher/issues/15188)]
- Fixed an issue where node labels could not be changed [[#15709](https://github.com/rancher/rancher/issues/15709)]
- Fixed a memory leak in the logic that controls the connection between Rancher server and user clusters [[#15719](https://github.com/rancher/rancher/issues/15719)]
- Fixed an issue where labels could not be updated Service Discovery resources  [[#14650](https://github.com/rancher/rancher/issues/14650)]
- Fixed an issue where custom certs used to secure the Rancher server would fail if they had multiple new lines at the end [[#13831](https://github.com/rancher/rancher/issues/13831)]
- Fixed an issue where LDAP users could not be retrieved because of unnecessary case-sensitivity in our logic [[#15757](https://github.com/rancher/rancher/issues/15757)]
- Fixed an issue in the AD FS auth provider where users could not login if the configuration was edited [[#15724](https://github.com/rancher/rancher/issues/15724)]
- Fixed an issue where sticky sessions would not work on ingress controllers [[#13702](https://github.com/rancher/rancher/issues/13702)]
- Fixed a issue where the TLS secret for an ingress would be lost upon edit [[#14934](https://github.com/rancher/rancher/issues/14934)]
- Fixed an issue where ElasticSearch could not be configured with TLS in our logging integration [[#13760](https://github.com/rancher/rancher/issues/13760)]
- Fixed an issue where custom clusters could not be reimported into Rancher after being removed [[#14848](https://github.com/rancher/rancher/issues/14848)] [[#13512](https://github.com/rancher/rancher/issues/13512)] [[#14207](https://github.com/rancher/rancher/issues/14207)]
- Fixed an issue where the proxy-read-timeout property of the ingress configured for RKE clusters would not be respected [[#15044](https://github.com/rancher/rancher/issues/15044)]
- Fixed an issue where network policies would not be removed from a namespace when it was moved out of a project [[#15029](https://github.com/rancher/rancher/issues/15029)]
- Fixed an issue where RBAC was not being turned on in AKS clusters [[#15230](https://github.com/rancher/rancher/issues/15230)]
- Fixed an issue with AKS clusters where containers could not communicate across hosts under some configurations [[#15231](https://github.com/rancher/rancher/issues/15231)] [[#15135](https://github.com/rancher/rancher/issues/15135)]
- Fixed an issue where long log statements were truncated when using syslog in our logging integration [[#15631](https://github.com/rancher/rancher/issues/15631)]
- Fixed an issue where alerts for a workload availability would be fired even when the workload was fully available [[#14790](https://github.com/rancher/rancher/issues/14790)]
- Fixed an issue where Rancher catalog would not execute Helm pre-hooks [[#14316](https://github.com/rancher/rancher/issues/14316)]

## Important Notes

### High Availability

The default number of replicas of the Rancher server in our Helm template has changed from 1 to 3. If you are running Rancher in HA mode, we recommend having three nodes available for the Rancher server pods to run on.

### RKE add-on install is only supported up to Rancher v2.0.8

Due to the HA improvements introduced in the v2.1.0 release, the Rancher helm chart is the only supported method for installing or upgrading Rancher. Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline](https://rancher.com/docs/rancher/v2.x/en/installation/ha/#installation-outline).

If you are currently using the RKE add-on install method, see [Migrating from a RKE add-on install](https://rancher.com/docs/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using a helm chart.

### Known Major Issues

- Clusters created through Rancher can sometimes get stuck in provisioning [[#15970](https://github.com/rancher/rancher/issues/15970)] [[#15969](https://github.com/rancher/rancher/issues/15969)] [[#15695](https://github.com/rancher/rancher/issues/15695)]
- An issue with Flannel can break pods' cross-host communication [[#13644](https://github.com/rancher/rancher/issues/13644)]
- Flannel does not work with Kubernetes 1.12 (EXPERIMENTAL) clusters [[#15955](https://github.com/rancher/rancher/issues/15955)]
- Upgrading a Rancher HA installation when there is only 1 or 2 nodes with the "worker" role will result in the upgrade failing because the new default scale for Rancher server replicas is 3 [[#16068](https://github.com/rancher/rancher/issues/16068)]. To workaround this issue, ensure at least 3 nodes have the worker role before upgrading. For details on Rancher HA in general, see the [HA Install - Installation Outline](https://rancher.com/docs/rancher/v2.x/en/installation/ha/#installation-outline).

## Versions

**NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

### Images

- rancher/rancher:v2.1.0
- rancher/rancher-agent:v2.1.0

### Tools

- cli - [v2.0.5](https://github.com/rancher/cli/releases/tag/v2.0.5)
- rke - [v0.1.10](https://github.com/rancher/rke/releases/tag/v0.1.10)

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- **`rancher/rancher:latest`** tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- **`rancher/rancher:stable`** tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to [upgrade](https://rancher.com/docs/rancher/v2.x/en/upgrades/) or [rollback](https://rancher.com/docs/rancher/v2.x/en/backups/rollbacks/) to change the Rancher version.

**Any upgrade after v2.0.3, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.
> **Note:** If you had the helm stable catalog enabled in v2.0.0, we've updated the catalog to start pointing directly to the Kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]

- **Version Changes**
  - **Made Kubernetes 1.11.3 the default version for RKE clusters [[#15595](https://github.com/rancher/rancher/issues/15595)]**
  - **Added Kubernetes 1.12 Experimental Support [[#13837](https://github.com/rancher/rancher/issues/13837)]**
  - **Helm updated to v2.10.0 [[15309](https://github.com/rancher/rancher/issues/15309)]**
  - **Deprecated Kubernetes 1.8** - With the release, support for Kubernetes 1.8 is deprecated. In a future release, support will be completely dropped and 1.8 clusters will need to be upgraded in order to integrate with Rancher