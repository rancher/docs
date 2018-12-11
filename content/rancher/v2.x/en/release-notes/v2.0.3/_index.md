---
title: Release v2.0.3
weight: 4
---

> **NOTE** - Image Name Changes: Please note that as of v2.0.0, our images will be `rancher/rancher` and `rancher/rancher-agent`. If you are using v1.6, please continue to use `rancher/server` and `rancher/agent`.

- rancher/rancher:v2.0.3
- rancher/rancher-agent:v2.0.3

## Rancher Server Tags

Rancher server has 2 different tags. For each major release tag, we will provide documentation for the specific version.

- `rancher/rancher:latest` tag will be our latest development builds. These builds will have been validated through our CI automation framework. These releases are not meant for deployment in production.
- `rancher/rancher:stable` tag will be our latest stable release builds. This tag is the version that we recommend for production.

Please do not use releases with a `rc{n}` suffix. These `rc` builds are meant for the Rancher team to test builds.

- Latest - v2.0.3 - `rancher/rancher:latest`
- Stable - v2.0.2 - `rancher/rancher:stable`

## Upgrades and Rollbacks

Rancher supports both upgrade and rollback starting with v2.0.2.  Please note the version you would like to upgrade or rollback to and follow the [instructions](https://rancher.com/docs/rancher/v2.x/en/upgrades/) to change the Rancher version.

**Post upgrade, when scaling up workloads, new pods will be created [[#14136](https://github.com/rancher/rancher/issues/14136)]** - In order to update scheduling rules for workloads [[#13527](https://github.com/rancher/rancher/issues/13527)], a new field was added to all workloads on `update`, which will cause any pods in workloads from previous versions to re-create.

> **Note:** When rolling back, we are expecting you to rollback to the state at the time of your upgrade. Any changes post upgrade would not be reflected. In the case of rolling back using a [Rancher single-node install](https://rancher.com/docs/rancher/v2.x/en/installation/single-node-install/), you must specify the exact version you want to change the Rancher version to, rather than using the default `:latest` tag.
> **Note:** If you had the helm stable catalog enabled in v2.0.0, we've updated the catalog to start pointing directly to the kubernetes helm repo instead of an internal repo. Please delete the custom catalog that is now showing up and re-enable the helm stable. [[#13582](https://github.com/rancher/rancher/issues/13582)]

## Enhancements

- **Support for AzureAD [#12942]** - AzureAD has been implemented as an Oauth provider and can be selected as an option for authentication.
- **Support for Fully Customized Cluster Options [[#13816](https://github.com/rancher/rancher/issues/13816), [#13076](https://github.com/rancher/rancher/issues/13076), [#13115](https://github.com/rancher/rancher/issues/13115)]**- Rancher now allows users to fully customize cluster options when creating a Kubernetes cluster including the ability to set extra_args, environment variables, and other cloud providers that does not appear in the default Rancher UI. Please review the [RKE configuration options](http://staging.rancher.com/docs/rke/v0.1.x/en/config-options/) on how to customize your cluster options.
- **Updated support for AKS [#13395]** - Updated the existing AKS support to support the latest AKS update along with the ability to support different k8s versions, set basic DNS prefix, virtual networks, and subnets.
- **CLI Enhancements**
  - Added ability to pass in a RKE config when creating a Kubernetes cluster [#13701]

## Updates on Clusters

**Importing Existing Clusters** [[#14030](https://github.com/rancher/rancher/issues/14030)]

When importing existing Kubernetes clusters, if your Kubernetes distribution already has a `cluster-admin` role, you will need to have these permissions in order to import your cluster.

**Control Plane Nodes are no longer schedulable** [[#13524](https://github.com/rancher/rancher/issues/13524)]

In previous versions of Rancher, any control plane node was considered schedulable for workloads. Starting with this release, it is no longer considered schedulable. To move any existing workloads off of a control plane node, you will need to upgrade the workload to trigger a recreation. It will be moved to a node with the worker role.

## Known Major Issues

- Unable to update catalog items [[#14186](https://github.com/rancher/rancher/issues/14186), [#14183](https://github.com/rancher/rancher/issues/14183)]
- After upgrade, ingresses may have some issues with showing 503s or inability to target new workloads, the current workaround is to re-create the ingress [[#13611](https://github.com/rancher/rancher/issues/13611)]

## Major Bug Fixes since v2.0.2

- Fixed an issue that EKS was not working after EKS GA-ed due to cloud formation template changes and EKS wasn't passing in the actual UI values [[#14064](https://github.com/rancher/rancher/issues/14064)]
- Fixed an issue where nested groups were not working in AD [[#8317](https://github.com/rancher/rancher/issues/8317), [#12987](https://github.com/rancher/rancher/issues/12987)]
- Fixed an issue where giving permissions using AD groups were not providing correct permissions to users for kubectl [[#13778](https://github.com/rancher/rancher/issues/13778)]
- Fixed an issue where importing AKS clusters were failing [[#13642](https://github.com/rancher/rancher/issues/13642)]
- Fixed an issue where standard users with project level permissions were unable to create or access pipelines [[#13643](https://github.com/rancher/rancher/issues/13643)]
- Fixed an issue where project owners/members are not able to view cluster notifiers [[#13543](https://github.com/rancher/rancher/issues/13543)]
- Fixed an issue where kubelets wouldn't restart if Azure cloud provider isn't updated [[#13945](https://github.com/rancher/rancher/issues/13945)]
- Fixed an issue where cluster names were not required or required to be unique [[#13075](https://github.com/rancher/rancher/issues/13075)]
- Fixed an issue where trying to create an imported cluster with dots in the name would silently fail [[#14010](https://github.com/rancher/rancher/issues/14010)]
- Fixed an issue where there was no way to set the splunk HEC index if there were multiple ones available [[#13755](https://github.com/rancher/rancher/issues/13755)]
- Fixed an issue where you were unable to edit the upgrade policy of a workload [[#13584](https://github.com/rancher/rancher/issues/13584)]
- Fixed an issue where adding labels to the agent wasn't supported for custom nodes [[#12691](https://github.com/rancher/rancher/issues/12691)]
- Fixed an issue where port mapping was not updating in the UI after being updated [[#13426](https://github.com/rancher/rancher/issues/13426)]
- Fixed an issue where node scheduling couldn't be removed [[#13527](https://github.com/rancher/rancher/issues/13527)]
- Fixed an issue that HPA couldn't get metrics because there was no way to set the extra arguments needed for HPA [[#12711](https://github.com/rancher/rancher/issues/12711)]
- Fixed an issue where email notifier wasn't sending a test email when testing the notifier [[#12618](https://github.com/rancher/rancher/issues/12618)]
- Fixed many [UI issues](https://github.com/rancher/rancher/issues?q=is%3Aissue+milestone%3Av2.0.3+is%3Aclosed+label%3Aarea%2Fui)

## Rancher CLI Downloads

https://github.com/rancher/cli/releases/tag/v2.0.2