---
title: Release v2.1.2
weight: 13
---

With this release, the following [versions](https://rancher.com/docs/rancher/v2.x/en/installation/server-tags/) are now latest and stable:

|Type | Rancher Version | Docker Tag |Helm Repo| Helm Chart Version |
|---|---|---|---|---|
| Latest | v2.1.2 | `rancher/rancher:latest` | server-charts/latest | 2018.11.1 |
| Stable | v2.1.1 | `rancher/rancher:stable` | server-charts/stable | 2018.10.2 |

## Enhancements

- **Rancher Server Helm Chart**
  - Added support to disable viewing the `local` cluster on Rancher via Helm chart. Since the `local` cluster is the Kubernetes cluster running Rancher server, we recommend not launching any workloads/applications in this cluster.  [[#16521](https://github.com/rancher/rancher/issues/16521)]

- **EKS Clusters**
  - Added the ability to use AWS session token when provisioning EKS clusters [[#16007](https://github.com/rancher/rancher/issues/16007)]
  - Enhanced EKS templates to support T3/R5 instances [[#16639](https://github.com/rancher/rancher/issues/16639)]

- **RKE Clusters**
  - etcd snapshots are turned on by default for new RKE clusters [[#888](https://github.com/rancher/rke/issues/888)]
  - Ability to enable/disable etcd snapshots for RKE clusters via UI [[#16415](https://github.com/rancher/rancher/issues/16415)]

- **Tools**
  - Added support for configurable TLS version for elastic search based logging [[#16276](https://github.com/rancher/rancher/issues/16276)]

- Added the ability to download container logs from the UI [[16253](https://github.com/rancher/rancher/issues/16253)]

## Known Major Issues

- Clusters created through Rancher can sometimes get stuck in provisioning [[#15970](https://github.com/rancher/rancher/issues/15970)] [[#15969](https://github.com/rancher/rancher/issues/15969)] [[#15695](https://github.com/rancher/rancher/issues/15695)]
- The upgrade for Rancher node-agent daemonset can sometimes get stuck due to pod removal failure on a Kubernetes side [[#16722](https://github.com/rancher/rancher/issues/16722)]

## Major Bug Fixes since v2.1.1

- Fixed an issue where user was getting random "Forbidden" errors on rancher standalone container setups behind ALB  [[16444](https://github.com/rancher/rancher/issues/16444)]
- Fixed an issue where private registry on RKE clusters was causing worker nodes to go down[[16304](https://github.com/rancher/rancher/issues/16304)]
- Fixed an issue with failed authentication on EC2 template creation when user was a part of large groups in an external auth provider  [[16203](https://github.com/rancher/rancher/issues/16203)]
- Fixed an issue where pulling an image from the private registry was failing on a workload upgrade [[16202](https://github.com/rancher/rancher/issues/16202)]
- Fixed an issue where workloads having owner references pointing to CRDs weren't showing up in the UI[[16277](https://github.com/rancher/rancher/issues/16277)]
- Fixed an issue where kubernetes 1.12 clusters were not working with flannel [[16281](https://github.com/rancher/rancher/issues/16281)]
- Fixed an issue where pipeline was crashing in a loop [[16351](https://github.com/rancher/rancher/issues/16351)]
- Fixed an issue where workloads failed to create using rancher API UI [[16336](https://github.com/rancher/rancher/issues/16336)]
- Fixed an issue where an answer having "=" sign in it was not being evaluated by the CLI [[16407](https://github.com/rancher/rancher/issues/16407)]
- Fixed an issue where some recommended admission controllers were missing on RKE clusters [[16404](https://github.com/rancher/rancher/issues/16404)]
- Fixed an issue where Rancher api UI was not available in airgapped setups [[16252](https://github.com/rancher/rancher/issues/16252)]
- Fixed an issue where site access configured for an auth provider was restricting local user login [[16399](https://github.com/rancher/rancher/issues/16399)]
- Fixed an issue where local cluster was still present in Rancher even after disabling it when launching Rancher server [[16523](https://github.com/rancher/rancher/issues/16523)]
- Fixed an issue where clusters running on hosts having upper case hostnames, failed to register in Rancher. Kubernetes requires lowercase hostnames for kubelet registration. [[16575](https://github.com/rancher/rancher/issues/16575)]
- Fixed an issue where clusters with flannel cni provider were missing flannel annotations on the nodes which resulted in a broken network[[16552](https://github.com/rancher/rancher/issues/16552)]
- Fixed an issue where etcd snapshots continued to be saved even after the snapshot option was changed from enabled to disabled on a cluster [[16531](https://github.com/rancher/rancher/issues/16531)]

### Helm chart related fixes and enhancements

- Added custom annotations support for ingress [[#16278](https://github.com/rancher/rancher/issues/16278)].

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be rancher/rancher and rancher/rancher-agent. If you are using v1.6, please continue to use rancher/server and rancher/agent.

### Images

- rancher/rancher:v2.1.2
- rancher/rancher-agent:v2.1.2

### Tools

- cli - [v2.0.6](https://github.com/rancher/cli/releases/tag/v2.0.6)
- rke - [v0.1.12](https://github.com/rancher/rke/releases/tag/v0.1.12)

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to [upgrade](https://rancher.com/docs/rancher/v2.x/en/upgrades/) or [rollback](https://rancher.com/docs/rancher/v2.x/en/backups/rollbacks/) to change the Rancher version.

Due to the HA improvements introduced in the v2.1.0 release, the Rancher helm chart is the only supported method for installing or upgrading Rancher. Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline](https://rancher.com/docs/rancher/v2.x/en/installation/ha/#installation-outline).

If you are currently using the RKE add-on install method, see [Migrating from a RKE add-on install](https://rancher.com/docs/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using a helm chart.

**Any upgrade from a version prior to v2.0.3, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.
> **Note:** If you had the helm stable catalog enabled in v2.0.0, we've updated the catalog to start pointing directly to the Kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]
