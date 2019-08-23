---
title: High Availability (HA) Upgrade - Air Gap
weight: 1021
---

The following instructions will guide you through upgrading a high-availability Rancher Server installed in an air gap environment.

<<<<<<< HEAD
>**Note:** [Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753) Upgrade cert-manager to the latest version by following [these instructions.]({{<baseurl>}}/rancher/v2.x/en/installation/options/upgrading-cert-manager)

> **Note:** If you are upgrading from from Rancher v2.0.13 or earlier, or v2.1.8 or earlier, and your cluster's certificates have expired, you will need to perform [additional steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/certificate-rotation/#rotating-expired-certificates-after-upgrading-older-rancher-versions) to rotate the certificates.
=======
>**Note:** [Let's Encrypt will be blocking cert-manager instances older than 0.8.0 starting November 1st 2019.](https://community.letsencrypt.org/t/blocking-old-cert-manager-versions/98753) In order to upgrade cert-manager to the newer version follow [these instructions.]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/upgrade-cert-manager-airgap)
>>>>>>> Add information for cert-manager

## Prerequisites

- **Populate Images**

    Follow the guide to [Prepare the Private Registry]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/prepare-private-reg/) with the images for the upgrade Rancher release.

- **Backup your Rancher Cluster**

    [Take a one-time snapshot]({{< baseurl >}}/rancher/v2.x/en/backups/backups/ha-backups/#option-b-one-time-snapshots)
    of your Rancher Server cluster. You'll use the snapshot as a restoration point if something goes wrong during upgrade.

- **kubectl**

    Follow the kubectl [configuration instructions]({{< baseurl >}}/rancher/v2.x/en/faq/kubectl) and confirm that you can connect to the Kubernetes cluster running Rancher server.

- **helm**

    [Install or update](https://docs.helm.sh/using_helm/#installing-helm) Helm to the latest version.

- **Upgrades to v2.0.7+ only: check system namespace locations**<br/>
     Starting in v2.0.7, Rancher introduced the `system` project, which is a project that's automatically created to store important namespaces that Kubernetes needs to operate. During upgrade to v2.0.7+, Rancher expects these namespaces to be unassigned from all projects. Before beginning upgrade, check your system namespaces to make sure that they're unassigned to [prevent cluster networking issues]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#preventing-cluster-networking-issues).

- **Upgrades to v2.2.0 only: mirror system-charts repository and configure Rancher**<br/>
    Starting in v2.2.0, Rancher introduced the [System Charts](https://github.com/rancher/system-charts) repository which contains all the catalog items required for features such as monitoring, logging, alerting and global DNS. To be able to use these features in an air gap install, you will need to mirror the `system-charts` repository locally and configure Rancher to use that repository. Please follow the instructions to [configure Rancher system charts]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-high-availability/config-rancher-system-charts/).

## Caveats
Upgrades _to_ or _from_ any chart in the  [rancher-alpha repository]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories/) aren't supported.

## Upgrade Rancher

1. Update your local helm repo cache.

    ```
    helm repo update
    ```


2. Get the repository name that you used to install Rancher.

    For information about the repos and their differences, see [Helm Chart Repositories]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories).

    {{< release-channel >}}

    ```
    helm repo list

    NAME          	      URL
    stable        	      https://kubernetes-charts.storage.googleapis.com
    rancher-<CHART_REPO>	https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

    > **Note:** If you want to switch to a different Helm chart repository, please follow the [steps on how to switch repositories]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#switching-to-a-different-helm-chart-repository). If you switch repositories, make sure to list the repositories again before continuing onto Step 3 to ensure you have the correct one added.


3. Fetch the latest chart to install Rancher from the Helm chart repository.

    This command will pull down the latest chart and save it in the current directory as a `.tgz` file.

    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```

3. Render the upgrade template.

    Use the same `--set` values that you used for the install. Remember to set the `--is-upgrade` flag for `helm`. This will create a `rancher` directory with the Kubernetes manifest files.

    ```plain
    helm template ./rancher-<version>.tgz --output-dir . --is-upgrade \
    --name rancher --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher
    ```

4. Copy and apply the rendered manifests.

    Copy the files to a server with access to the Rancher server cluster and apply the rendered templates.

    ```plain
    kubectl -n cattle-system apply -R -f ./rancher
    ```

**Result:** Rancher is upgraded. Log back into Rancher to confirm that the  upgrade succeeded.

>**Having Network Issues Following Upgrade?**
>
> See  [Restoring Cluster Networking]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#restoring-cluster-networking).

## Rolling Back

Should something go wrong, follow the [HA Rollback]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks/) instructions to restore the snapshot you took before you preformed the upgrade.
