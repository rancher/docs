---
title: Adding Kubernetes Versions Support
weight: 1120
---

New Kubernetes versions will be automatically available without rancher server upgrades if they're compatible with the rancher server version. Rancher relies on kubernetes metadata in order to achieve this capability.

Rancher Kubernetes Metadata contains Kubernetes version specific information which Rancher uses to provision [RKE clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/).
Rancher syncs data periodically and creates custom resource definitions (CRDs) for _system images_, _service options_ and _addon templates_.

> **Note:** Only administrators can edit metadata CRDs. It is recommended not to update existing objects unless explicitly advised.

They give you an overview of information [Rancher Kubernetes Engine]({{< baseurl >}}/rke/latest/en/) (RKE) uses for deploying various Kubernetes versions.

- System Images:
List of system images used to deploy Kubernetes through RKE. (`v3/rkek8ssystemimages`)

- Service Options:
Default options passed to Kubernetes components like kube-api, scheduler, kubelet, kube-proxy and kube-controller-manager (`v3/rkek8sserviceoptions`)

- Addon Templates:
Yaml definitions used to deploy addon components like canal, calico, flannel, weave, kube-dns, core-dns, metrics-server, nginx-ingress. (`v3/rkeaddons`)

## Configuring RKE Metadata Config

RKE metadata config controls how often rancher syncs metadata and where it downloads data from. It is available under Settings in UI or `v3/settings/rke-metadata-config`.

`rke-metadata-config` contains:

- `refresh-interval-minutes`: how often Rancher syncs metadata

- `url`: http path rancher fetches data from

- `branch`: branch name if url is a git url

Setting `refresh-interval-minutes` to 0 disables the periodic refresh.

## Refresh Kubernetes Metadata

In order to force refresh in addition to the periodic refresh, a manual refresh action is available under Tools -> Drivers -> Refresh Kubernetes Metadata on the right side corner.

## Airgap Setups

Rancher relies on periodic refresh based on `rke-metadata-config` to download new kubernetes version metadata if they're compatible with current rancher server version. Airgap users need to either disable refresh or configure metadata config correctly to get newer kubernetes versions:

- Disable Refresh
Users can choose to disable periodic sync and work with inbuilt kubernetes versions. Newer versions won't be available without rancher server upgrade. Setting `refresh-interval-minutes` to 0 disables the periodic refresh.

- Configure Metadata Config
Airgap users need to update `url` and `branch` in `rke-metadata-config` under Settings to their Git which mirrors
`https://github.com/rancher/kontainer-driver-metadata.git`.

After new kubernetes versions are loaded in rancher setup, additional steps would be required in order to use them for launching clusters:

- Download images required for new Kubernetes versions:

	Click on the rancher server version at the bottom left of the UI.

- Download OS specific Linux/Windows Image Lists.
- The downloaded `rancher-images.txt` needs to be used following the same steps as Preparing private registry for [Single Node]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-single-node/prepare-private-registry/) or [HA]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/prepare-private-registry/)
