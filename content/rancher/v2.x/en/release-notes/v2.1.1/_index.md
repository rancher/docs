---
title: Release v2.1.1
weight: 12
---

With this release, the following [versions](https://rancher.com/docs/rancher/v2.x/en/installation/server-tags/) are now latest and stable:

|Type | Rancher Version | Docker Tag |Helm Repo| Helm Chart Version |
|---|---|---|---|---|
| Latest | v2.1.1 | `rancher/rancher:latest` | server-charts/latest | 2018.10.2 |
| Stable | v2.1.1 | `rancher/rancher:stable` | server-charts/stable | 2018.10.2 |

## Enhancements

- Added support for TLS Ingress creation without specifying the certificate [[#16021](https://github.com/rancher/rancher/issues/16021)]
- Added support for configurable AssociatePublicIpAddress in EKS clusters [[16006](https://github.com/rancher/rancher/issues/16006)]

## Known Major Issues

- Clusters created through Rancher can sometimes get stuck in provisioning [[#15970](https://github.com/rancher/rancher/issues/15970)] [[#15969](https://github.com/rancher/rancher/issues/15969)] [[#15695](https://github.com/rancher/rancher/issues/15695)]
- An issue with Flannel can break pods' cross-host communication [[#13644](https://github.com/rancher/rancher/issues/13644)]
- Flannel does not work with Kubernetes 1.12 (EXPERIMENTAL) clusters [[#15955](https://github.com/rancher/rancher/issues/15955)]

## Major Bug Fixes since v2.1.0

- Fixed an issue with incorrect caching on client side resulting in older UI version being used for upgraded Rancher setups [[16041](https://github.com/rancher/rancher/issues/16041)]
- Fixed an issue where logging in as Azure AD user with lots of groups was slow [[15952](https://github.com/rancher/rancher/issues/15952)]
- Fixed an issue where large LDAP Database caused Rancher LDAP query timeouts [[15950](https://github.com/rancher/rancher/issues/15950)]
- Fixed an issue where charts from helm-stable repository having `tillerVersion` parameter set, failed to deploy [[16008](https://github.com/rancher/rancher/issues/16008)]
- Fixed an issue where panic was observed in Alert controller [[16001](https://github.com/rancher/rancher/issues/16001)], [[16003](https://github.com/rancher/rancher/issues/16003)]
- Fixed an issue where server-url could not be updated via UI [[16140](https://github.com/rancher/rancher/issues/16140)]
- Fixed an issue where EKS cluster could not be created with a custom role [[16068](https://github.com/rancher/rancher/issues/16068)]
- Fixed an issue where annotations were not allowed to be set via UI on Ingress create [[16112](https://github.com/rancher/rancher/issues/16112)]

### Helm chart related fixes

- Fixed an issue where upgrading a Rancher HA installation when there is only 1 or 2 nodes with the "worker" role will result in the upgrade failing because the new default scale for Rancher server replicas is 3 [[#16068](https://github.com/rancher/rancher/issues/16068)].
- Fixed an issue where Rancher server upgrade was broken for setups having SSL termination configured on External Load Balancer [[16030](https://github.com/rancher/rancher/issues/16030)]
- Fixed an issue where Rancher server upgrade was broken for installs having `privateCA`set to `true` [[16053](https://github.com/rancher/rancher/issues/16053)]
- Fixed an issue where an upgrade was failing for a single node Rancher cluster [[16068](https://github.com/rancher/rancher/issues/16068)]

## Versions

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be rancher/rancher and rancher/rancher-agent. If you are using v1.6, please continue to use rancher/server and rancher/agent.

### Images

- rancher/rancher:v2.1.1
- rancher/rancher-agent:v2.1.1

### Tools

- cli - [v2.0.5](https://github.com/rancher/cli/releases/tag/v2.0.5)
- rke - [v0.1.11](https://github.com/rancher/rke/releases/tag/v0.1.11)

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to [upgrade](https://rancher.com/docs/rancher/v2.x/en/upgrades/) or [rollback](https://rancher.com/docs/rancher/v2.x/en/backups/rollbacks/) to change the Rancher version.

Due to the HA improvements introduced in the v2.1.0 release, the Rancher helm chart is the only supported method for installing or upgrading Rancher. Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline](https://rancher.com/docs/rancher/v2.x/en/installation/ha/#installation-outline).

If you are currently using the RKE add-on install method, see [Migrating from a RKE add-on install](https://rancher.com/docs/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using a helm chart.

**Any upgrade from a version prior to v2.0.3, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.
> **Note:** If you had the helm stable catalog enabled in v2.0.0, we've updated the catalog to start pointing directly to the Kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]
