---
title: Upgrading the Rancher Helm Chart
weight: 2
---

> This page is under construction.

The following instructions will guide you through using Helm to upgrade a Rancher server that was installed on a Kubernetes cluster.

### Note on Upgrading the Rancher Server Kubernetes Cluster

If Rancher is installed on an RKE Kubernetes cluster, refer to the [RKE documentation on upgrading the cluster.](https://rancher.com/docs/rke/latest/en/upgrades/)

If Rancher is installed on a K3s Kubernetes cluster, refer to the [K3s documentation on upgrading the cluster.](https://rancher.com/docs/k3s/latest/en/upgrades/basic/)

If Rancher is installed on another type of Kubernetes cluster, refer to the official documentation about upgrades for that Kubernetes distribution.


### Known Upgrade Issues

A list of known issues for each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)

### Caveats
Upgrades _to_ or _from_ any chart in the [rancher-alpha repository]({{<baseurl>}}/rancher/v2.x/en/installation/options/server-tags/#helm-chart-repositories/) aren't supported.

### Recovering from Unsuccessful Upgrades

If you upgrade Rancher and the upgrade does not complete successfully, you may need to roll back your Rancher Server to its last healthy state.

Restoring a snapshot of the Rancher Server cluster will revert Rancher to the version and state at the time of the snapshot.

>**Note:** Managed cluster are authoritative for their state. This means restoring the Rancher server will not revert workload deployments or changes made on managed clusters after the snapshot was taken.

# Prerequisites

- **Review the [known upgrade issues]({{<baseurl>}}/rancher/v2.x/en/upgrades/upgrades/#known-upgrade-issues) and [caveats]({{<baseurl>}}/rancher/v2.x/en/upgrades/upgrades/#caveats)** in the Rancher documentation for the most noteworthy issues to consider when upgrading Rancher. A more complete list of known issues for each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)
- **For [air gap installs only,]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap) collect and populate images for the new Rancher server version.** Follow the guide to [populate your private registry]({{<baseurl>}}/rancher/v2.x/en/installation/other-installation-methods/air-gap/populate-private-registry/) with the images for the Rancher version that you want to upgrade to.

# Upgrade Outline

Follow the steps to upgrade Rancher server:

- [A. Back up your Kubernetes cluster that is running Rancher server](#a-backup-your-kubernetes-cluster-that-is-running-rancher-server)
- [B. Update the Helm chart repository](#b-update-the-helm-chart-repository)
- [C. Upgrade Rancher](#c-upgrade-rancher)
- [D. Verify the Upgrade](#d-verify-the-upgrade)

### A. Back up Your Kubernetes Cluster that is Running Rancher Server

[Take a one-time snapshot]({{<baseurl>}}/rancher/v2.x/en/backups/backups/ha-backups/#option-b-one-time-snapshots)
of your Kubernetes cluster running Rancher server. You'll use the snapshot as a restoration point if something goes wrong during upgrade.

### B. Update the Helm chart repository

1. Update your local helm repo cache.

    ```
    helm repo update
    ```

1. Get the repository name that you used to install Rancher.

    For information about the repos and their differences, see [Helm Chart Repositories]({{<baseurl>}}/rancher/v2.x/en/installation/options/server-tags/#helm-chart-repositories).

    {{< release-channel >}}

    ```
    helm repo list

    NAME          	       URL
    stable        	       https://kubernetes-charts.storage.googleapis.com
    rancher-<CHART_REPO>	 https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

    > **Note:** If you want to switch to a different Helm chart repository, please follow the [steps on how to switch repositories]({{<baseurl>}}/rancher/v2.x/en/installation/options/server-tags/#switching-to-a-different-helm-chart-repository). If you switch repositories, make sure to list the repositories again before continuing onto Step 3 to ensure you have the correct one added.


1. Fetch the latest chart to install Rancher from the Helm chart repository.

    This command will pull down the latest charts and save it in the current directory as a `.tgz` file.

    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```

### C. Upgrade Rancher

This section describes how to upgrade normal (Internet-connected) or air gap installations of Rancher with Helm.

{{% tabs %}}
{{% tab "Kubernetes Upgrade" %}}

Get the values, which were passed with `--set`, from the current Rancher Helm chart that is installed.

```
helm get values rancher -n cattle-system

hostname: rancher.my.org
```

> **Note:** There will be more values that are listed with this command. This is just an example of one of the values.

If you are also upgrading cert-manager to the latest version from a version older than 0.11.0, follow `Option B: Reinstalling Rancher and cert-manager`. Otherwise, follow `Option A: Upgrading Rancher`.

{{% accordion label="Option A: Upgrading Rancher" %}}

Upgrade Rancher to the latest version with all your settings.

Take all the values from the previous step and append them to the command using `--set key=value`:

```
helm upgrade rancher rancher-<CHART_REPO>/rancher \
  --namespace cattle-system \
  --set hostname=rancher.my.org
```

> **Note:** There will be many more options from the previous step that need to be appended.

{{% /accordion %}}

{{% accordion label="Option B: Reinstalling Rancher and cert-manager" %}}

If you are currently running the cert-manger whose version is older than v0.11, and want to upgrade both Rancher and cert-manager to a newer version, then you need to reinstall both Rancher and cert-manger due to the API change in cert-manger v0.11. 

1. Uninstall Rancher

    ```
    helm delete rancher -n cattle-system
    ```

2. Uninstall and reinstall `cert-manager` according to the instructions on the [Upgrading Cert-Manager]({{<baseurl>}}/rancher/v2.x/en/installation/options/upgrading-cert-manager) page.

3. Reinstall Rancher to the latest version with all your settings. Take all the values from the step 1 and append them to the command using `--set key=value`. Note: There will be many more options from the step 1 that need to be appended.

    ```
    helm install rancher rancher-<CHART_REPO>/rancher \
    --namespace cattle-system \
    --set hostname=rancher.my.org
    ```

{{% /accordion %}}

{{% /tab %}}

{{% tab "Kubernetes Air Gap Upgrade" %}}

1. Render the Rancher template using the same chosen options that were used when installing Rancher. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools.

    Based on the choice you made during installation, complete one of the procedures below.

    Placeholder | Description
    ------------|-------------
    `<VERSION>` | The version number of the output tarball.
    `<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
    `<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.
    `<CERTMANAGER_VERSION>` | Cert-manager version running on k8s cluster.

{{% accordion id="self-signed" label="Option A-Default Self-Signed Certificate" %}}

 ```plain
helm template ./rancher-<VERSION>.tgz --output-dir . \
 --name rancher \
 --namespace cattle-system \
 --set hostname=<RANCHER.YOURDOMAIN.COM> \
 --set certmanager.version=<CERTMANAGER_VERSION> \
 --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
 --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
 --set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
```

{{% /accordion %}}
{{% accordion id="secret" label="Option B: Certificates From Files using Kubernetes Secrets" %}}

```plain
helm template ./rancher-<VERSION>.tgz --output-dir . \
--name rancher \
--namespace cattle-system \
--set hostname=<RANCHER.YOURDOMAIN.COM> \
--set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
--set ingress.tls.source=secret \
--set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
--set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
```

If you are using a Private CA signed cert, add `--set privateCA=true` following `--set ingress.tls.source=secret`:

```plain
helm template ./rancher-<VERSION>.tgz --output-dir . \
--name rancher \
--namespace cattle-system \
--set hostname=<RANCHER.YOURDOMAIN.COM> \
--set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
--set ingress.tls.source=secret \
--set privateCA=true \
--set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
--set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
```

{{% /accordion %}}

2. Copy the rendered manifest directories to a system with access to the Rancher server cluster and apply the rendered templates.

    Use `kubectl` to apply the rendered manifests.

    ```plain
    kubectl -n cattle-system apply -R -f ./rancher
    ```

{{% /tab %}}
{{% /tabs %}}

### D. Verify the Upgrade

Log into Rancher to confirm that the upgrade succeeded.

>**Having network issues following upgrade?**
>
> See [Restoring Cluster Networking]({{<baseurl>}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#restoring-cluster-networking).

## Rolling Back

Should something go wrong, follow the [roll back]({{<baseurl>}}/rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks/) instructions to restore the snapshot you took before you preformed the upgrade.
