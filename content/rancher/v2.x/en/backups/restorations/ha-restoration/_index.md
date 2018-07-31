---
title: Restoring Backups—High Availability Installs
weight: 370
aliases:
  - /rancher/v2.x/en/installation/after-installation/ha-backup-and-restoration/
---
This procedure describes how to restore your a snapshot of `etcd` if you lose your Rancher data in a disaster scenario.

## Restoration Outline

Following a disaster scenario, restoration of your HA Rancher installation requires you to pull your snapshot from your chosen external location and then restore it.

1. [Create New Nodes and Pull Snapshot and Certificates Bundle](#1-create-new-nodes-and-pull-snapshot-and-certificate-bundle)

  If `etcd` nodes failed or quorum lost for any reason, you can create new nodes and restore the etcd snapshot and certificate bundle to it, first create the new nodes and then pull the most recent `etcd` snapshot to that node, and the most recent certificates pki bundle `pki.bundle.tar.gz`

2. [Restore etcd Database](#2-restore-etcd-database)

	After you pull the snapshot and the certificates bundle, run the RKE command to restore the `etcd` database.

<br/>
### 1. Pull Snapshot and Certificates Bundle On New Nodes

If `etcd` nodes failed, you can either:

- Create a new nodes of your choice—baremetal, on-prem virtual machine, cloud-based virtual machine, and so on. Provision it according to our [requirements]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install/#host-requirements).

- Use the existing nodes, but you should be make sure to clean each node using the following commands:

```
docker rm -fv $(docker ps -qa)
docker volume ls -q | xargs docker volume rm
rm -rf /etc/kubernetes/ssl
rm -rf /etc/kubernetes/.tmp
rm -rf /var/lib/etcd
rm -rf /etc/cni
rm -rf /etc/kube-flannel/
```

in both cases you will need to pull the most recent working `etcd` snapshot and the certificates bundle to these nodes.

**To Pull the Latest Snapshot and Certificates Bundle:**

1.  Log in to each new node using a remote Terminal connection.

2.  Create a directory that mirrors your other nodes' snapshot directories:

	```
	root@newnode:~# mkdir -p /opt/rke/etcd-snapshots
	```

3. On each node, pull your most recent snapshot onto the node. Replace `<SNAPSHOT.db>` with the name of the snapshot you're restoring to.

	```
	root@newnode:~# s3cmd get s3://rke-etcd-snapshots/<SNAPSHOT.db> /opt/rke/etcd-snapshots/<SNAPSHOT.db>
	```

	>**Remember:** Our use of Amazon S3 is an example used for this documentation. The command for pulling your snapshot may vary.

4. On each node, pull the most recent certificates pki bundle to the `/opt/rke/etcd-snapshots`:

  ```
  root@newnode:~# s3cmd get s3://rke-etcd-snapshots/pki.bundle.tar.gz /opt/rke/etcd-snapshots/pki.bundle.tar.gz
  ```

### 2. Restore `etcd` Database

To restore the most recent `etcd` snapshot on your new nodes, run RKE the command `rke etcd snapshot-restore`. This command reverts to any snapshot stored in `/opt/rke/etcd-snapshots` that you explicitly define. When you run `rke etcd snapshot-restore`, RKE removes the old `etcd` container if it still exists. To restore operations, RKE creates a new `etcd` cluster using the snapshot you choose, and extracts the certificate bundle to be used on the next `rke up` run.

>**Warning:** Restoring an `etcd` snapshot deletes your current `etcd` cluster and replaces it with a new one. Before you run the `rke etcd snapshot-restore` command, backup any important data in your current cluster.
>
>**Prerequisites:** {{< requirements_rollback >}}


1. From your workstation, open `rancher-cluster.yml` in your favorite text editor.

2. Replace the unresponsive nodes (`1.1.1.1`, `2.2.2.2`, `3.3.3.3` in this example) with your new one (`4.4.4.4`, `5.5.5.5`, and `6.6.6.6`). You IP addresses will be different obviously:
```
		nodes:
		#	- address: 1.1.1.1  # UNRESPONSIVE NODE
		#	  user: root
		#	  role: [controlplane,etcd,worker]
		#	  ssh_key_path: ~/.ssh/id_rsa
		#	- address: 2.2.2.2  # UNRESPONSIVE NODE
		#	  user: root
		#	  role: [controlplane,etcd,worker]
		#	  ssh_key_path: ~/.ssh/id_rsa
		#	- address: 3.3.3.3  # UNRESPONSIVE NODE
		#	  user: root
		#	  role: [controlplane,etcd,worker]
		#	  ssh_key_path: ~/.ssh/id_rsa
			- address: 4.4.4.4  # NEW NODE
			  user: root
			  role: [controlplane,etcd,worker]
			  ssh_key_path: ~/.ssh/id_rsa
      - address: 5.5.5.5  # NEW NODE
			  user: root
			  role: [controlplane,etcd,worker]
			  ssh_key_path: ~/.ssh/id_rsa
      - address: 6.6.6.6  # NEW NODE
			  user: root
			  role: [controlplane,etcd,worker]
			  ssh_key_path: ~/.ssh/id_rsa  
```

3. Save and close `rancher-cluster.yml`.

4. Open **Terminal** and change directory to the location of the RKE binary. Your `rancher-cluster.yml` file must reside in the same directory.

5. Run one of the following commands to restore the `etcd` database:

	```
	# MacOS
	./rke_darwin-amd64 etcd snapshot-restore --name <SNAPSHOT.db> --config rancher-cluster.yml
	# Linux
	./rke_linux-amd64 etcd snapshot-restore --name <SNAPSHOT.db> --config rancher-cluster.yml
	```


6. Run one of the following commands to bring your cluster back up:

	```
	# MacOS
	./rke_darwin-amd64 up --config rancher-cluster.yml
	# Linux
	./rke_linux-amd64 up --config rancher-cluster.yml
	```

7. After restoring the cluster you have to restart the kubernetes components on all nodes, otherwise there will be some conflicts with resource versions of objects stored in `etcd`, this will include restart to kubernetes components and the network components, for more information please refer to [kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#etcd-upgrade-requirements), to do that you can run the following on each node:

    ```
    docker restart kube-apiserver kubelet kube-controller-manager kube-scheduler kube-proxy
    docker ps | grep flannel | cut -f 1 -d " " | xargs docker restart
    docker ps | grep calico | cut -f 1 -d " " | xargs docker restart
    ```
