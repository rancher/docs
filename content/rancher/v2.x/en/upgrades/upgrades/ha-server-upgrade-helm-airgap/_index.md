---
title: High Availability (HA) Upgrade - Air Gap
weight: 1021
---

The following instructions will guide you through upgrading a high-availability Rancher Server installed in an air gap environment.

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

## Chart Versioning Notes

Up until the initial helm chart release for v2.1.0, the helm chart version matched the Rancher version (i.e `appVersion`).

Since there are times where the helm chart will require changes without any changes to the Rancher version, we have moved to a `yyyy.mm.<build-number>` helm chart version.

Run `helm search rancher` to view which Rancher version will be launched for the specific helm chart version.  

```
NAME                      CHART VERSION    APP VERSION    DESCRIPTION                                                 
rancher-latest/rancher    2018.10.1            v2.1.0      Install Rancher Server to manage Kubernetes clusters acro...
```

## Upgrade Rancher

1. Update your local helm repo cache.

    ```
    helm repo update
    ```

1. Fetch the latest Rancher Server chart from the helm repository that you used during installation.

    This command will pull down the chart and save it in the current directory as a `.tgz` file. Replace `<CHART_REPO>` with the name of the repository that you used during installation (either `stable` or `latest`).

    >**Note:** During upgrades, you must fetch from the chart repo that you configured initial installation (either the `stable` or `latest` repository). For more information, see [Choosing a Version of Rancher: Rancher Chart Repositories]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#rancher-chart-repositories).

    ```plain
    helm fetch rancher-<CHART_REPO>/rancher
    ```

    

1. Render the upgrade template.

    Use the same `--set` values you used for the install. Remember to set the `--is-upgrade` flag for `helm`. This will create a `rancher` directory with the Kubernetes manifest files.

    ```plain
    helm template ./rancher-<version>.tgz --output-dir . --is-upgrade \
    --name rancher --namespace cattle-system \
    --set hostname=<RANCHER.YOURDOMAIN.COM> \
    --set rancherImage=<REGISTRY.YOURDOMAIN.COM:PORT>/rancher/rancher
    ```

1. Copy and apply the rendered manifests.

    Copy the files to a server with access to the Rancher server cluster and apply the rendered templates.

    ```plain
    kubectl -n cattle-system apply -R -f ./rancher
    ```

## Rolling Back

Should something go wrong, follow the [HA Rollback]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks/) instructions to restore the snapshot you took before you preformed the upgrade.
