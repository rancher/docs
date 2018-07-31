---
title: Rolling Back—High Availability Installs
weight: 50
aliases:
  - /rancher/v2.x/en/backups/rollbacks/ha-server-rollbacks
---

If you upgrade Rancher, but the upgrade does not complete successfully, you may need to roll back your Rancher Server to its last healthy state before upgrade. To restore Rancher:

- Restore the `etcd` snapshot taken before upgrade.
- Run the command to revert to your prior version of Rancher.

>**Warning!**
>
> Rolling back to a previous version of Rancher destroys any changes made to Rancher following the upgrade. Unrecoverable data loss may occur.

>
>**Prerequisites:** {{< requirements_rollback >}}

1. Open **Terminal** and change directory to the location of the RKE binary that you used during upgrade.

1. Run one of the following commands to restore the `etcd` snapshot [that you took]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrade-scenarios/ha-server-upgrade/#snapshot) before your unsuccessful upgrade. Replace the `<SNAPSHOT.db>` placeholder with your snapshot.

	```
	# MacOS
	./rke_darwin-amd64 etcd snapshot-restore --name <SNAPSHOT.db> --config rancher-cluster.yml
	# Linux
	./rke_linux-amd64 etcd snapshot-restore --name <SNAPSHOT.db> --config rancher-cluster.yml
	```

1. Run one of the following commands to bring your cluster back up:

	```
	# MacOS
	./rke_darwin-amd64 up --config rancher-cluster.yml
	# Linux
	./rke_linux-amd64 up --config rancher-cluster.yml
	```

1. Lastly, restart the Kubernetes components on all cluster nodes to prevent potential `etcd` conflicts. Run this command on each of your nodes.

    ```
    docker restart kube-apiserver kubelet kube-controller-manager kube-scheduler kube-proxy
    docker ps | grep flannel | cut -f 1 -d " " | xargs docker restart
    docker ps | grep calico | cut -f 1 -d " " | xargs docker restart
    ```
1. Enter the following command:

    ```
kubectl --kubeconfig=kube_config_rancher-cluster.yml set image deployment/cattle cattle-server=rancher/rancher:<PRIOR_VERSION> -n cattle-system
    ```
    Replace `<VERSION_TAG>` with the version that you were running before upgrade. For a list of tags available, see the [Rancher Forum Announcements](https://forums.rancher.com/c/announcements).

    **Step Result:** The rollback begins. Rancher Server may be unavailable for a few minutes.

1. Log into Rancher. Confirm that the rollback succeeded by checking the version displayed in the bottom-left corner of the browser window.

## Troubleshooting

With **RKE v0.1.8** and below, the **rke-bundle-cert** container is left over from a failed etcd restore. If you are having an issue with restoring an **etcd snapshot** then you can do the following on each etcd nodes before attempting to do another restore:

```
docker container rm --force rke-bundle-cert
```

The rke-bundle-cert container is usually removed when a backup or restore of **etcd** succeeds.
Whenever something goes wrong, the **rke-bundle-cert** container will be left over. You can look
at the logs or inspect the container to see what the issue is.

```
docker container logs --follow rke-bundle-cert
docker container inspect rke-bundle-cert
```

The important thing to note is the mounts of the container and location of the **pki.bundle.tar.gz**.

As of **RKE v0.1.9**, the **rke-bundle-cert** container is removed on both success and
failure of a restore. To debug any issues, you will need to look at the **logs** generated from rke. 
