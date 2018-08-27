---
title: High Availability (HA) Upgrade
weight: 1020
---

The following instructions will guide you through upgrading a high-availability Rancher Server that was [installed using Helm package manager]({{< baseurl >}}/rancher/v2.x/en/installation/ha/).

>**Note:** If you installed Rancher using the RKE Add-on yaml, see the following documents to migrate or upgrade.
>
>* [Migrating from RKE Add-On Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/migrating-from-rke-add-on)

    As of release v2.0.8, Rancher supports installation and upgrade by Helm chart, although RKE installs/upgrades are still supported as well. If you want to change upgrade method from RKE Add-on to Helm chart, follow this procedure.

>* [High Availability (HA) Upgrade - RKE Add-On Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/ha-server-upgrade)

    If you want to continue using RKE for upgrades, follow this procedure.

## Prerequisites

- **Backup your Rancher cluster**

    [Take a one-time snapshot]({{< baseurl >}}/rancher/v2.x/en/backups/backups/ha-backups/#option-b-one-time-snapshots)
    of your Rancher Server cluster. You'll use the snapshot as a restoration point if something goes wrong during upgrade.

- **kubectl**

    Follow the kubectl [configuration instructions]({{< baseurl >}}/rancher/v2.x/en/faq/kubectl) and confirm that you can connect to the Kubernetes cluster running Rancher server.

- **Helm** 

    [Install or update](https://docs.helm.sh/using_helm/#installing-helm) Helm to the latest version.

- **Tiller**

    Update the helm agent, Tiller, on your cluster.

    ```
    helm init --upgrade --service-account tiller
    ```

## Upgrade Rancher

1. Update your local helm repo cache.

    ```
    helm repo update
    ```

2. Get the set values from current Rancher release.

    ```
    helm get values rancher

    hostname: rancher.my.org
    ```

3. Take the values above and use `helm` with `--set` options to upgrade Rancher to the latest version.

    ```
    helm upgrade rancher rancher-stable/rancher --set hostname=rancher.my.org
    ```

## Rolling Back

Should something go wrong, follow the [HA Rollback]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks/) instructions to restore the snapshot you took before you preformed the upgrade.
