---
title: High Availability Upgrade
weight: 1020
---
To upgrade Rancher 2.x running in a high availability configuration, run an upgrade command that points to your upgrade config file.

>**Prerequisites:**
>
>- Take a [one-time etcd snapshot]({{< baseurl >}}/rancher/v2.x/en/installation/backups-and-restoration/ha-backup-and-restoration). This snapshot is a restore point in case something goes wrong during upgrade.
>- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your workstation.
>- Confirm that the following path exists on your workstation: `~/.kube/`. If it doesn't, create it yourself.
>- Copy `kube_config_rancher-cluster.yml`, which is automatically generated after [Rancher Server installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install#part-11-backup-kube-config-rancher-cluster-yml), to the `~/.kube/` directory.

1. From your workstation, open **Terminal**.

2. Enter the following command:

	```
kubectl --kubeconfig=kube_config-rancher-cluster.yml set image deployment/cattle cattle-server=rancher/rancher:<VERSION_TAG> -n cattle-system
	```
	Replace `<VERSION_TAG>` with the version that you want to upgrade to. For a list of tags available, see [DockerHub](https://hub.docker.com/r/rancher/rancher/tags/). However, don't use any tag suffixed with `-rc`, as they are used for testing and are not officially supported.

	**Step Result:** The upgrade begins. Rancher Server may be unavailable for a few minutes.

3. Log into Rancher. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

**Result:** Your Rancher Servers are upgraded.
