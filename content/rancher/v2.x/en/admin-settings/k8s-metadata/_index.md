---
title: Upgrade Kubernetes without Upgrading Rancher
weight: 1120
---

_Available as of v2.3.0_

The RKE metadata feature allows you to provision clusters with new versions of Kubernetes as soon as they are released, without upgrading Rancher. This feature is useful for taking advantage of patch versions of Kubernetes, for example, if you want to upgrade to Kubernetes v1.14.7 if your Rancher server originally supported v1.14.6.

Rancher's Kubernetes metadata contains information specific to the Kubernetes version that Rancher uses to provision [RKE clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/). Rancher syncs the data periodically and creates custom resource definitions (CRDs) for **system images,** **service options** and **addon templates.**  Consequently, when a new Kubernetes version is compatible with the Rancher server version, the Kubernetes metadata makes the new version available to Rancher for provisioning clusters. The metadata gives you an overview of the information that the [Rancher Kubernetes Engine]({{< baseurl >}}/rke/latest/en/) (RKE) uses for deploying various Kubernetes versions.

This table describes the CRDs that are affected by the periodic data sync:

| Resource | Description | Rancher API URL |
|----------|-------------|-----------------|
| System Images | List of system images used to deploy Kubernetes through RKE. | `<RANCHER_SERVER_URL>/v3/rkek8ssystemimages` |
| Service Options | Default options passed to Kubernetes components like `kube-api`, `scheduler`, `kubelet`, `kube-proxy`, and `kube-controller-manager` | `<RANCHER_SERVER_URL>/v3/rkek8sserviceoptions` |
| Addon Templates | YAML definitions used to deploy addon components like Canal, Calico, Flannel, Weave, Kube-dns, CoreDNS, `metrics-server`, `nginx-ingress` | `<RANCHER_SERVER_URL>/v3/rkeaddons` |

Administrators might configure the RKE metadata settings to do the following:

- Force the metadata to refresh, if a new patch version of Kubernetes comes out and they want to Rancher to provision clusters with the latest version of Kubernetes without having to upgrade Rancher
- Change the metadata URL that Rancher uses to sync the metadata, which is useful for air gap setups if you need to sync Rancher with a private registry instead of GitHub
- Prevent Rancher from auto-syncing the metadata, which is one way to prevent new and unsupported Kubernetes versions from being available in Rancher

> **Note:** Only administrators can edit metadata CRDs. It is recommended not to update existing objects unless explicitly advised.

# Configuring the Metadata Synchronization

The RKE metadata config controls how often rancher syncs metadata and where it downloads data from. You can configure the metadata from the settings in the Rancher UI, or through the Rancher API at the endpoint `v3/settings/rke-metadata-config`.

> Only administrators can change these settings.

To edit the metadata config in Rancher,

1. Go to the **Global** view and click the **Settings** tab.
1. Go to the **rke-metadata-config** section. Click the **Ellipsis (...)** and click **Edit.**
1. You can optionally fill in the following parameters:

  - `refresh-interval-minutes`: This is the amount of time that Rancher waits to sync the metadata. To disable the periodic refresh, set `refresh-interval-minutes` to 0.
  - `url`: This is the HTTP path that Rancher fetches data from.
  - `branch`: This refers to the Git branch name if the URL is a Git URL. 

If you don't have an air gap setup, you don't need to specify the URL or Git branch where Rancher gets the metadata, because the default setting is to pull from [Rancher's metadata Git repository.](https://github.com/rancher/kontainer-driver-metadata.git)

However, if you have an [air gap setup,](#air-gap-setups) you will need to mirror the Kubernetes metadata repository in a location available to Rancher. Then you need to change the URL and Git branch in the `rke-metadata-config` settings to point to the new location of the repository.

# Refresh Kubernetes Metadata

To force Rancher to refresh the Kubernetes metadata, a manual refresh action is available under **Tools > Drivers > Refresh Kubernetes Metadata** on the right side corner. This option is only available for administrators.

# Air Gap Setups

Rancher relies on a periodic refresh of the `rke-metadata-config` to download new Kubernetes version metadata if it is supported with the current version of the Rancher server. For a table of compatible Kubernetes and Rancher versions, refer to the [service terms section.](https://rancher.com/support-maintenance-terms/all-supported-versions/rancher-v2.2.8/)

If you have an air gap setup, you might not be able to get the automatic periodic refresh of the Kubernetes metadata from Rancher's Git repository. In that case, you can disable the periodic refresh and manually configure the metadata to get newer Kubernetes versions.

Only administrators can edit the Kubernetes metadata, including the refresh period and configuration of the source URL. However, any user can download the system images and prepare the private registry with the mirror of the Kubernetes metadata repository.

After new Kubernetes versions are loaded into the Rancher setup, additional steps would be required in order to use them for launching clusters:

1. In the `rke-metadata-config` settings, update the `url` and `branch` to point to your mirror of the metadata repository.
1. To download the system images for the private registry, click the Rancher server version at the bottom left corner of the Rancher UI.
1. Download the OS specific image lists for Linux or Windows.
1. Download `rancher-images.txt`.
1. Prepare the private registry using the same steps that are used for preparing a registry for a [Single Node]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap-single-node/prepare-private-registry/) or [HA]({{<baseurl>}}/rancher/v2.x/en/installation/air-gap-high-availability/prepare-private-registry/) air gap installation of Rancher.

**Result:** The air gap installation of Rancher can now sync the Kubernetes metadata. If you update your private registry when new versions of Kubernetes are released, you can provision clusters with the new version without having to upgrade Rancher.
