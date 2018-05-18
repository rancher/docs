---
title: High Availability Upgrade
weight: 1020
draft: true
---
To upgrade Rancher 2.x running in a high availablity configuration, run an upgrade command that points to your upgrade config file.

>**Prerequisites:**
>
>- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your workstation.
>- Confirm that the following path exists on your workstation: `~/.kube/`. If it doesn't, create it yourself.
>- Copy `kube_config_rancher-cluster.yml`, which is automatically generated after [Rancher Server installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install#part-11-backup-kube-config-rancher-cluster-yml), to the `~/.kube/` directory.

1. From your workstation, open **Terminal**.

2. Enter the following command:

	```
kubectl --kubeconfig=kube_config-rancher-cluster.yml set image deployment/cattle cattle-server=rancher/rancher:{{< tag_latest >}} -n cattle-system
	```
**Step Result:** The upgrade begins. Rancher Server may be unavailable for a few minutes.

3. Log into Rancher. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

**Result:** Your Rancher Servers are upgraded to {{< tag_latest >}}.
