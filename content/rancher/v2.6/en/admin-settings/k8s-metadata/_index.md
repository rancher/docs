---
title: Upgrading Kubernetes without Upgrading Rancher
weight: 1120
---

The RKE metadata feature allows you to provision clusters with new versions of Kubernetes as soon as they are released, without upgrading Rancher. This feature is useful for taking advantage of patch versions of Kubernetes, for example, if you want to upgrade to Kubernetes v1.14.7 when your Rancher server originally supported v1.14.6.

> **Note:** The Kubernetes API can change between minor versions. Therefore, we don't support introducing minor Kubernetes versions, such as introducing v1.15 when Rancher currently supports v1.14. You would need to upgrade Rancher to add support for minor Kubernetes versions.

Rancher's Kubernetes metadata contains information specific to the Kubernetes version that Rancher uses to provision [RKE clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/). Rancher syncs the data periodically and creates custom resource definitions (CRDs) for **system images,** **service options** and **addon templates.** Consequently, when a new Kubernetes version is compatible with the Rancher server version, the Kubernetes metadata makes the new version available to Rancher for provisioning clusters. The metadata gives you an overview of the information that the [Rancher Kubernetes Engine]({{<baseurl>}}/rke/latest/en/) (RKE) uses for deploying various Kubernetes versions.

This table below describes the CRDs that are affected by the periodic data sync. 

> **Note:** Only administrators can edit metadata CRDs. It is recommended not to update existing objects unless explicitly advised.

| Resource | Description | Rancher API URL |
|----------|-------------|-----------------|
| System Images | List of system images used to deploy Kubernetes through RKE. | `<RANCHER_SERVER_URL>/v3/rkek8ssystemimages` |
| Service Options | Default options passed to Kubernetes components like `kube-api`, `scheduler`, `kubelet`, `kube-proxy`, and `kube-controller-manager` | `<RANCHER_SERVER_URL>/v3/rkek8sserviceoptions` |
| Addon Templates | YAML definitions used to deploy addon components like Canal, Calico, Flannel, Weave, Kube-dns, CoreDNS, `metrics-server`, `nginx-ingress` | `<RANCHER_SERVER_URL>/v3/rkeaddons` |

Administrators might configure the RKE metadata settings to do the following:

- Refresh the Kubernetes metadata, if a new patch version of Kubernetes comes out and they want Rancher to provision clusters with the latest version of Kubernetes without having to upgrade Rancher
- Change the metadata URL that Rancher uses to sync the metadata, which is useful for air gap setups if you need to sync Rancher locally instead of with GitHub
- Prevent Rancher from auto-syncing the metadata, which is one way to prevent new and unsupported Kubernetes versions from being available in Rancher

### Refresh Kubernetes Metadata

The option to refresh the Kubernetes metadata is available for administrators by default, or for any user who has the **Manage Cluster Drivers** [global role.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/global-permissions/)

To force Rancher to refresh the Kubernetes metadata, a manual refresh action is available under **Tools > Drivers > Refresh Kubernetes Metadata** on the right side corner. 

You can configure Rancher to only refresh metadata when desired by setting `refresh-interval-minutes` to `0` (see below) and using this button to perform the metadata refresh manually when desired.

### Configuring the Metadata Synchronization

> Only administrators can change these settings.

The RKE metadata config controls how often Rancher syncs metadata and where it downloads data from. You can configure the metadata from the settings in the Rancher UI, or through the Rancher API at the endpoint `v3/settings/rke-metadata-config`.

The way that the metadata is configured depends on the Rancher version.

To edit the metadata config in Rancher,

1. Go to the **Global** view and click the **Settings** tab.
1. Go to the **rke-metadata-config** section. Click the **&#8942;** and click **Edit.**
1. You can optionally fill in the following parameters:

 - `refresh-interval-minutes`: This is the amount of time that Rancher waits to sync the metadata. To disable the periodic refresh, set `refresh-interval-minutes` to 0.
 - `url`: This is the HTTP path that Rancher fetches data from. The path must be a direct path to a JSON file. For example, the default URL for Rancher v2.4 is `https://releases.rancher.com/kontainer-driver-metadata/release-v2.4/data.json`.

If you don't have an air gap setup, you don't need to specify the URL where Rancher gets the metadata, because the default setting is to pull from [Rancher's metadata Git repository.](https://github.com/rancher/kontainer-driver-metadata/blob/dev-v2.5/data/data.json)

However, if you have an [air gap setup,](#air-gap-setups) you will need to mirror the Kubernetes metadata repository in a location available to Rancher. Then you need to change the URL to point to the new location of the JSON file.
### Air Gap Setups

Rancher relies on a periodic refresh of the `rke-metadata-config` to download new Kubernetes version metadata if it is supported with the current version of the Rancher server. For a table of compatible Kubernetes and Rancher versions, refer to the [service terms section.](https://rancher.com/support-maintenance-terms/all-supported-versions/rancher-v2.2.8/)

If you have an air gap setup, you might not be able to get the automatic periodic refresh of the Kubernetes metadata from Rancher's Git repository. In that case, you should disable the periodic refresh to prevent your logs from showing errors. Optionally, you can configure your metadata settings so that Rancher can sync with a local copy of the RKE metadata.

To sync Rancher with a local mirror of the RKE metadata, an administrator would configure the `rke-metadata-config` settings to point to the mirror. For details, refer to [Configuring the Metadata Synchronization.](#configuring-the-metadata-synchronization)

After new Kubernetes versions are loaded into the Rancher setup, additional steps would be required in order to use them for launching clusters. Rancher needs access to updated system images. While the metadata settings can only be changed by administrators, any user can download the Rancher system images and prepare a private Docker registry for them.

1. To download the system images for the private registry, click the Rancher server version at the bottom left corner of the Rancher UI.
1. Download the OS specific image lists for Linux or Windows.
1. Download `rancher-images.txt`.
1. Prepare the private registry using the same steps during the [air gap install]({{<baseurl>}}/rancher/v2.5/en/installation/other-installation-methods/air-gap/populate-private-registry), but instead of using the `rancher-images.txt` from the releases page, use the one obtained from the previous steps.

**Result:** The air gap installation of Rancher can now sync the Kubernetes metadata. If you update your private registry when new versions of Kubernetes are released, you can provision clusters with the new version without having to upgrade Rancher.
