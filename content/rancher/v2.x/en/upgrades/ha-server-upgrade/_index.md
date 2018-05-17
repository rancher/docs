---
title: High Availability Upgrade
weight: 1020
draft: true
---
To upgrade Rancher 2.x running in a high availablity configuration, download your cluster's Kubeconfig file and run an upgrade command.

1. Log into Rancher and browse to the cluster that your're using to run Rancher.

2. From the cluster dashboard, click **Kubeconfig File**.

	**Step Result:** The Kubeconfig file opens in a new window.

3. Copy the YAML that's displayed to your clipboard. Then close the window.

4. From your workstation, create a new path of `~/.kube/config`. Open your home directory, create a directory named `.kube`, and then create a file named `config`.

5. Paste the contents of your clipboard in the empty `config` file and save.

6. From the cluster dashboard, click **Launch kubectl**.

	>**Tip:** If you don't have kubectl, you can get it by clicking the Kubeconfig File button and selecting the Download link at the bottom of the window.

7. From the kubectl **Shell**, enter the following command:

 	```
kubectl set image deployment/cattle cattle-server=rancher/rancher:{{< tag_latest >}} -n cattle-system
	```
8. Confirm that the upgrade succeeded by checking the version displayed in the bottom-left corner of the browser window.

**Result:** Your Rancher Servers are upgraded to the latest version.
