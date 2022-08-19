---
title: Upgrades
weight: 2
aliases:
  - /rancher/v2.5/en/upgrades/upgrades
  - /rancher/v2.5/en/installation/upgrades-rollbacks/upgrades
  - /rancher/v2.5/en/upgrades/upgrades/ha-server-upgrade-helm-airgap
  - /rancher/v2.5/en/upgradeinstallation/install-rancher-on-k8s/upgrades/air-gap-upgrade/
  - /rancher/v2.5/en/upgrades/upgrades/ha
  - /rancher/v2.5/en/installation/install-rancher-on-k8s/upgrades/upgrades/ha
  - /rancher/v2.5/en/installation/upgrades-rollbacks/upgrades/
  - /rancher/v2.5/en/upgrades/upgrades/ha-server-upgrade-helm/
  - /rancher/v2.5/en/installation/upgrades-rollbacks/upgrades/ha
  - /rancher/v2.5/en/installation/install-rancher-on-k8s/upgrades-rollbacks/upgrades
  - /rancher/v2.5/en/installation/install-rancher-on-k8s/upgrades-rollbacks/upgrades/ha
  - /rancher/v2.5/en/installation/upgrades-rollbacks/
  - /rancher/v2.5/en/upgrades/
  - /rancher/v2.x/en/installation/install-rancher-on-k8s/upgrades/
---
The following instructions will guide you through upgrading a Rancher server that was installed on a Kubernetes cluster with Helm. These steps also apply to air gap installs with Helm.

For the instructions to upgrade Rancher installed on Kubernetes with RancherD, refer to [this page.](installation/install-rancher-on-linux/upgrades)

For the instructions to upgrade Rancher installed with Docker, refer to [this page.](../other-installation-methods/rancher-on-a-single-node-with-docker/upgrade-docker-installed-rancher.md)

To upgrade the components in your Kubernetes cluster, or the definition of the [Kubernetes services](https://rancher.com/docs/rke/latest/en/config-options/services/) or [add-ons](https://rancher.com/docs/rke/latest/en/config-options/add-ons/), refer to the [upgrade documentation for RKE](https://rancher.com/docs/rke/latest/en/upgrades/), the Rancher Kubernetes Engine.

- [Prerequisites](#prerequisites)
- [Upgrade Outline](#upgrade-outline)
- [Known Upgrade Issues](#known-upgrade-issues)
- [RKE Add-on Installs](#rke-add-on-installs)

# Prerequisites

### Access to kubeconfig

Helm should be run from the same location as your kubeconfig file, or the same location where you run your kubectl commands from.

If you installed Kubernetes with RKE, the config will have been created in the directory you ran `rke up` in. 

The kubeconfig can also be manually targeted for the intended cluster with the `--kubeconfig` tag (see: https://helm.sh/docs/helm/helm/)

### Review Known Issues

Review the list of known issues for each Rancher version, which can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)

Note that upgrades _to_ or _from_ any chart in the [rancher-alpha repository](../../../reference-guides/installation-references/helm-chart-options.md#helm-chart-repositories/) aren't supported.

### Helm Version

The upgrade instructions assume you are using Helm 3.

For migration of installs started with Helm 2, refer to the official [Helm 2 to 3 migration docs.](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/) The [Helm 2 upgrade page here]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/upgrades-rollbacks/upgrades/ha/helm2)provides a copy of the older upgrade instructions that used Helm 2, and it is intended to be used if upgrading to Helm 3 is not feasible.

### For air gap installs: Populate private registry

For [air gap installs only,](../../../pages-for-subheaders/air-gapped-helm-cli-install.md) collect and populate images for the new Rancher server version. Follow the guide to [populate your private registry](../other-installation-methods/air-gapped-helm-cli-install/publish-images.md) with the images for the Rancher version that you want to upgrade to.

### For upgrades from a Rancher server with a hidden local cluster

If you are upgrading to Rancher v2.5 from a Rancher server that was started with the Helm chart option `--add-local=false`, you will need to drop that flag when upgrading. Otherwise, the Rancher server will not start. The `restricted-admin` role can be used to continue restricting access to the local cluster. For more information, see [this section.](../../../how-to-guides/advanced-user-guides/authentication-permissions-and-global-configuration/manage-role-based-access-control-rbac/global-permissions.md#upgrading-from-rancher-with-a-hidden-local-cluster)

### For upgrades with cert-manager older than 0.8.0

[Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753) Upgrade cert-manager to the latest version by following [these instructions.](installation/options/upgrading-cert-manager)

# Upgrade Outline

Follow the steps to upgrade Rancher server:

- [1. Back up your Kubernetes cluster that is running Rancher server](#1-back-up-your-kubernetes-cluster-that-is-running-rancher-server)
- [2. Update the Helm chart repository](#2-update-the-helm-chart-repository)
- [3. Upgrade Rancher](#3-upgrade-rancher)
- [4. Verify the Upgrade](#4-verify-the-upgrade)

# 1. Back up Your Kubernetes Cluster that is Running Rancher Server

Use the [backup application](../../../how-to-guides/new-user-guides/backup-restore-and-disaster-recovery/back-up-rancher.md) to back up Rancher.

You'll use the backup as a restoration point if something goes wrong during upgrade.

# 2. Update the Helm chart repository

1. Update your local helm repo cache.

    ```
    helm repo update
    ```

1. Get the repository name that you used to install Rancher.

    For information about the repos and their differences, see [Helm Chart Repositories](../../../reference-guides/installation-references/helm-chart-options.md#helm-chart-repositories).

    {{< release-channel >}}

    ```
    helm repo list

    NAME          	       URL
    stable        	       https://charts.helm.sh/stable
    rancher-<CHART_REPO>	 https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

    > **Note:** If you want to switch to a different Helm chart repository, please follow the [steps on how to switch repositories](../resources/choose-a-rancher-version.md#switching-to-a-different-helm-chart-repository). If you switch repositories, make sure to list the repositories again before continuing onto Step 3 to ensure you have the correct one added.


1. Fetch the latest chart to install Rancher from the Helm chart repository.

    This command will pull down the latest charts and save it in the current directory as a `.tgz` file.

    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```
    You can fetch the chart for the specific version you are upgrading to by adding in the `--version=` tag.  For example:
    
    ```plain
    helm fetch rancher-<CHART_REPO>/rancher --version=v2.4.11
    ```

# 3. Upgrade Rancher

This section describes how to upgrade normal (Internet-connected) or air gap installations of Rancher with Helm.

> **Air Gap Instructions:** If you are installing Rancher in an air gapped environment, skip the rest of this page and render the Helm template by following the instructions on [this page.](air-gapped-upgrades.md)


Get the values, which were passed with `--set`, from the current Rancher Helm chart that is installed.

```
helm get values rancher -n cattle-system

hostname: rancher.my.org
```

> **Note:** There will be more values that are listed with this command. This is just an example of one of the values.

If you are also upgrading cert-manager to the latest version from a version older than 0.11.0, follow [Option B: Reinstalling Rancher and cert-manager.](#option-b-reinstalling-rancher-and-cert-manager)

Otherwise, follow [Option A: Upgrading Rancher.](#option-a-upgrading-rancher)

### Option A: Upgrading Rancher

Upgrade Rancher to the latest version with all your settings.

Take all the values from the previous step and append them to the command using `--set key=value`:

```
helm upgrade rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org
```

> **Note:** The above is an example, there may be more values from the previous step that need to be appended.

Alternatively, it's possible to export the current values to a file and reference that file during upgrade. For example, to only change the Rancher version:

```
helm get values rancher -n cattle-system -o yaml > values.yaml

helm upgrade rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  -f values.yaml \
  --version=2.4.5
```

### Option B: Reinstalling Rancher and cert-manager

If you are currently running the cert-manager whose version is older than v0.11, and want to upgrade both Rancher and cert-manager to a newer version, then you need to reinstall both Rancher and cert-manager due to the API change in cert-manager v0.11. 

1. Uninstall Rancher

    ```
    helm delete rancher -n cattle-system
    ```

2. Uninstall and reinstall `cert-manager` according to the instructions on the [Upgrading Cert-Manager](installation/options/upgrading-cert-manager) page.

3. Reinstall Rancher to the latest version with all your settings. Take all the values from the step 1 and append them to the command using `--set key=value`. Note: There will be many more options from the step 1 that need to be appended.

    ```
    helm install rancher rancher-<CHART_REPO>/rancher \
    --namespace cattle-system \
    --set hostname=rancher.my.org
    ```

# 4. Verify the Upgrade

Log into Rancher to confirm that the upgrade succeeded.

>**Having network issues following upgrade?**
>
> See [Restoring Cluster Networking]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/upgrades/namespace-migration).

# Known Upgrade Issues

A list of known issues for each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)
