---
title: High Availability (HA) Upgrade
weight: 1020
---

The following instructions will guide you through upgrading a high-availability Rancher Server that was [installed using Helm package manager]({{< baseurl >}}/rancher/v2.x/en/installation/ha/).

>**Note:** If you installed Rancher using the RKE Add-on yaml, see the following documents to migrate or upgrade.
>
>* [Migrating from RKE Add-On Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on)
>
>       As of release v2.0.8, Rancher supports installation and upgrade by Helm chart, although RKE installs/upgrades are still supported as well. If you want to change upgrade method from RKE Add-on to Helm chart, follow this procedure.


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
- **Upgrades to v2.0.7+ only: check system namespace locations**
     Starting in v2.0.7, Rancher introduced the `System` project, which is a project that's automatically created to store important namespaces that Kubernetes needs to operate. During upgrade to v2.0.7+, Rancher expects these namespaces to be unassigned from all projects. Before beginning upgrade, check your system namespaces to make sure that they're unassigned to [prevent cluster networking issues]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#preventing-cluster-networking-issues).

## Caveats
Upgrades _to_ or _from_ any chart in the  [rancher-alpha repository]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories/) aren't supported.

## Upgrade Rancher

> **Note:** For Air Gap installs see [Upgrading HA Rancher - Air Gap]({{< baseurl >}}/rancher/v2.x/en/installation/air-gap-installation/install-rancher/#upgrading-rancher)

1. Update your local helm repo cache.

    ```
    helm repo update
    ```

2. Get the repository name that you used to install Rancher.

    For information about the repos and their differences, see [Helm Chart Repositories]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#helm-chart-repositories).

    ```
    helm repo list

    NAME          	      URL
    stable        	      https://kubernetes-charts.storage.googleapis.com
    rancher-<CHART_REPO>	https://releases.rancher.com/server-charts/<CHART_REPO>
    ```

    > **Note:** If you want to switch to a different Helm chart repository, please follow the [steps on how to switch repositories]({{< baseurl >}}/rancher/v2.x/en/installation/server-tags/#switching-to-a-different-helm-chart-repository). If you switch repositories, make sure to list the repositories again before continuing onto Step 3 to ensure you have the correct one added.

3. Upgrade Rancher to the latest version based on values from the previous steps.

    - Replace `<CHART_REPO>` with the repository that was listed (i.e. `latest` or `stable`).

    ```
    helm upgrade rancher rancher-<CHART_REPO>/rancher --reuse-values
    ```

**Result:** Rancher is upgraded. Log back into Rancher to confirm that the upgrade succeeded.

>**Having Network Issues Following Upgrade?**
>
> See [Restoring Cluster Networking]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/namespace-migration/#restoring-cluster-networking).

## Rolling Back

Should something go wrong, follow the [HA Rollback]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks/) instructions to restore the snapshot you took before you preformed the upgrade.
