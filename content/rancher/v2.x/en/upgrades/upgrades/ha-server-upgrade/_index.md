---
title: HA Upgrade - RKE Add-on
weight: 1040
aliases:
  - /rancher/v2.x/en/upgrades/ha-server-upgrade/
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#installation-outline).
>
>If you are currently using the RKE add-on install method, see [Migrating from a RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

This document is for upgrading Rancher HA installed with the RKE Add-On yaml. See these docs to migrate to or upgrade Rancher installed with the Helm chart.

* [Migrating from a High Availability RKE Add-on Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/)
* [High Availability (HA) Upgrade]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/ha-server-upgrade-helm/)

>**Prerequisites:**
{{< requirements_rollback >}}

>- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your workstation.
>- Confirm that the following path exists on your workstation: `~/.kube/`. If it doesn't, create it yourself.
>- Copy `kube_config_rancher-cluster.yml`, which is automatically generated after [Rancher Server installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install#part-11-backup-kube-config-rancher-cluster-yml), to the `~/.kube/` directory.

1. From your workstation, open **Terminal**.

1. Change directory to the location of the RKE binary. Your `rancher-cluster.yml` file must reside in the same directory.

    >**Want records of all transactions with the Rancher API?**
    >
    >Enable the [API Auditing]({{< baseurl >}}/rancher/v2.x/en/installation/api-auditing) feature by editing your RKE config file (`rancher-cluster.yml`). For more information, see how to enable it in [your RKE config file]({{< baseurl >}}/rancher/v2.x/en/installation/ha/rke-add-on/api-auditing/).

1. <a id="snapshot"></a> Enter the following command. Replace `<SNAPSHOT.db>` with any name that you want to use for the snapshot (e.g. `upgrade.db`).

    ```
    rke etcd snapshot-save --name <SNAPSHOT.db> --config rancher-cluster.yml
    ```

    **Result:** RKE takes a snapshot of `etcd` running on each `etcd` node. The file is saved to `/opt/rke/etcd-snapshots`.

1. Enter the following command:

    ```
kubectl --kubeconfig=kube_config_rancher-cluster.yml set image deployment/cattle cattle-server=rancher/rancher:<VERSION_TAG> -n cattle-system
    ```
    Replace `<VERSION_TAG>` with the version that you want to upgrade to. For a list of tags available, see the [Rancher Forum Announcements](https://forums.rancher.com/c/announcements).

    **Step Result:** The upgrade begins. Rancher Server may be unavailable for a few minutes.

1. Log into Rancher. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

**Result:** Your Rancher Servers are upgraded.

>**Upgrade Issues?** You can restore your Rancher Server and data that was running prior to upgrade. For more information, see [Rolling Back—High Availability Installs]({{< baseurl >}}/rancher/v2.x/en/backups/rollbacks/ha-server-rollbacks).
