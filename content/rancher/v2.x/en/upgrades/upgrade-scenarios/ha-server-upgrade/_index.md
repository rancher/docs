---
title: High Availability Upgrade
weight: 1020
---
To upgrade Rancher 2.x running in a high availability configuration, run an upgrade command that points to your upgrade config file.

>**Prerequisites:**
>
>- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your workstation.
>- Confirm that the following path exists on your workstation: `~/.kube/`. If it doesn't, create it yourself.
>- Copy `kube_config_rancher-cluster.yml`, which is automatically generated after [Rancher Server installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install#part-11-backup-kube-config-rancher-cluster-yml), to the `~/.kube/` directory.

1. From your workstation, open **Terminal**.

1. Change directory to the location of the RKE binary. Your `kube_config_rancher-cluster.yml` file must reside in the same directory.

1. <a id="snapshot"></a> Enter the following command. Replace `<SNAPSHOT.db>` with any name that you want to use for the snapshot (e.g. `upgrade.db`).

    ```
	# MacOS
	./rke_darwin-amd64 etcd snapshot-save --name <SNAPSHOT.db> --config kube_config_rancher-cluster.yml
	# Linux
    ./rke_linux-amd64 etcd snapshot-save --name <SNAPSHOT.db> --config kube_config_rancher-cluster.yml
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

>**Upgrade Issues?** You can restore your Rancher Server and data that was running prior to upgrade. For more information, see [Restoring Backups—High Availablity Installs]({{< baseurl >}}/rancher/v2.x/en/upgrades/rollbacks/ha-server-rollbacks).
