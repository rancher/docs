---
title: High Availability (HA) Upgrade
weight: 1020
aliases:
  - /rancher/v2.x/en/upgrades/upgrades/ha-server-upgrade-helm
  - /rancher/v2.x/en/upgrades/upgrades/ha-server-upgrade-helm-airgap
  - /rancher/v2.x/en/upgrades/air-gap-upgrade/
---

The following instructions will guide you through upgrading a high-availability (HA) Rancher server installation.  

>**Note:** If you installed Rancher using the RKE Add-on yaml, following the directions to [migrate or upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on).


>**Note:** [Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753) Upgrade cert-manager to the latest version by following [these instructions.]({{<baseurl>}}/rancher/v2.x/en/installation/options/upgrading-cert-manager)

## Prerequisites

- **Review the [Known Upgrade Issues]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/#known-upgrade-issues) and [Caveats]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/#caveats)**


- **[Air Gap Installs Only:]({{< baseurl >}}/rancher/v2.x/en/installations/air-gap/) Collect and Populate Images for the new Rancher server version**

    Follow the guide to [populate your private registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap/populate-private-registry/) with the images for the Rancher version that you want to upgrade to.

## Upgrade Outline

Follow the steps to upgrade Rancher server:

- A. Backup your Kubernetes Cluster that is running Rancher server
- B. Update the Helm chart repository
- C. Upgrade Rancher
- D. Verify the Upgrade

### A. Backup your Kubernetes Cluster that is running Rancher server

[Take a one-time snapshot]({{< baseurl >}}/rancher/v2.x/en/backups/backups/ha-backups/#option-b-one-time-snapshots)
of your Kubernetes cluster running Rancher server. You'll use the snapshot as a restoration point if something goes wrong during upgrade.

### B. Update the Helm chart repository

1. Update your local helm repo cache.

    ```
    helm repo update
    ```

1. Get the repository name that you used to install Rancher.

    For information about the repos and their differences, see [Helm Chart Repositories]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories).

    {{< release-channel >}}

    ```
    helm repo list

    NAME          	       URL
    stable        	       https://kubernetes-charts.storage.googleapis.com
    rancher-<CHART_REPO>	 https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

    > **Note:** If you want to switch to a different Helm chart repository, please follow the [steps on how to switch repositories]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#switching-to-a-different-helm-chart-repository). If you switch repositories, make sure to list the repositories again before continuing onto Step 3 to ensure you have the correct one added.


1. Fetch the latest chart to install Rancher from the Helm chart repository.

    This command will pull down the latest charts and save it in the current directory as a `.tgz` file.

    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```

### C. Upgrade Rancher

Choose from the following options:

* HA Upgrade
* HA Upgrade for Air Gap Installs

{{% tabs %}}
{{% tab "HA Upgrade" %}}

1. Get the values, that were passed with `--set`, from the current Rancher helm chart installed.

    ```
    helm get values rancher

    hostname: rancher.my.org
    ```

    > **Note:** There will be more values that are listed with this command. This is just an example of one of the values.

2. Upgrade Rancher to the latest version with all your settings.

    - Take all the values from the previous step and append them to the command using `--set key=value`.

    ```
    helm upgrade rancher rancher-<CHART_REPO>/rancher \
    --set hostname=rancher.my.org # Note: There will be many more options from the previous step that need to be appended.
    ```

{{% /tab %}}

{{% tab "HA Air Gap Upgrade" %}}

1. Render the Rancher template using the same chosen options that were used when installing Rancher. Use the reference table below to replace each placeholder. Rancher needs to be configured to use the private registry in order to provision any Rancher launched Kubernetes clusters or Rancher tools.

    Based on the choice you made during installation, complete one of the procedures below.

    Placeholder | Description
    ------------|-------------
    `<VERSION>` | The version number of the output tarball.
    `<RANCHER.YOURDOMAIN.COM>` | The DNS name you pointed at your load balancer.
    `<REGISTRY.YOURDOMAIN.COM:PORT>` | The DNS name for your private registry.

{{% accordion id="self-signed" label="Option A-Default Self-Signed Certificate" %}}

 ```plain
helm template ./rancher-<VERSION>.tgz --output-dir . \
 --name rancher \
 --namespace cattle-system \
 --set hostname=<RANCHER.YOURDOMAIN.COM> \
 --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher \
 --set systemDefaultRegistry=<REGISTRY.YOURDOMAIN.COM:PORT> \ # Available as of v2.2.0, set a default private registry to be used in Rancher
 --set useBundledSystemChart=true # Available as of v2.3.0, use the packaged Rancher system charts
```

{{% /accordion %}}
{{% accordion id="secret" label="Option B: Certificates From Files using Kubernetes Secrets" %}}

>**Note:** If you are using a Private CA signed cert, add `--set privateCA=true` following `--set ingress.tls.source=secret`.

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
> See [Restoring Cluster Networking]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#restoring-cluster-networking).

## Rolling Back

Should something go wrong, follow the [roll back]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks/) instructions to restore the snapshot you took before you preformed the upgrade.
