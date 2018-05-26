---
title: High Availability Backup and Restoration
weight: 370
aliases:
  - /rancher/v2.x/en/installation/after-installation/ha-backup-and-restoration/
---
This section describes how to:

- Create backups of your high-availability Rancher install.
- Restore the backups in a disaster scenario.

## Backup Workflow

Backing up your high-availability Rancher cluster is process that invovles completing multiple tasks.

1.  [Meet Backup Prerequisites](#1-meet-backup-prerequisites)

	Before starting, make sure you have the files needed to create backups.

2.  [Take Snapshots](#2-take-snapshots)

	Take snapshots of your current etcd database using Rancher Kubernetes Engine (RKE).

3.  [Store Snapshot(s) Externally](#3-store-snapshots-externally)

	After taking your snapshots, move them to a safe location that won't be affected if your cluster encounters issues.

<br/>
### 1. Meet Backup Prerequisites

Begin by gathering the files that you need to create backups of your Rancher install.

#### Prerequisites

- Rancher Kubernetes Engine v0.1.7 or later

	The commands for taking etcd snapshots are only available in RKE v0.1.7 and later.

- rancher-cluster.yml

	You'll need the RKE config file you used for Rancher install, `rancher-cluster.yml`. You created this file during your chosen installation scenario:
<br/>
<br/>
	- [High Availability Installation]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install)
	- [High Availability Installation with External Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install-external-lb)

<br/>
### 2. Take Snapshots

Take snapshots of your `etcd` database. You can use these snapshots later to recover from a disaster scenario. There are two ways to take snapshots: recurringly, or as a one-off.  Each option is better suited to a specific use case. Read the short description below each link to know when to use each option.

- [Option A: Recurring Snapshots](#option-a-recurring-snapshots)

	After you stand up a high-availability Rancher install, we recommend configuring RKE to automatically take recurring snapshots so that you always have a safe restoration point available.

- [Option B: One-Time Snapshots](#option-b-one-time-snapshots)

	We advise taking one-time snapshots before events like upgrades or restoration of another snapshot.

#### Option A: Recurring Snapshots

For all high-availability Rancher installs, we recommend taking recurring snapshots so that you always have a safe restoration point available.

To take recurring snapshots, enable the `etcd-snapshot` service, which is a service that's included with RKE. This service runs in a service container alongside the `etcd` container. You can enable this service by adding some code to `rancher-cluster.yml`.

**To Enable Recuring Snapshots:**

1. Open `rancher-cluster.yml` with your favorite text editor.

2. Add the following code block to the bottom of the file:

	```
	services:
	  etcd:
	    snapshot: true # enables recurring etcd snapshots
	    creation: 5m0s # time increment between shapshots
	    retention: 24h # time increment before snapshot purge
	```

3. Edit the code according to your requirements.

4. Save and close `rancher-cluster.yml`.

5. Open **Terminal** and change directory to the location of the RKE binary. Your `rancher-cluster.yml` file must reside in the same directory.

6. Run one of the following commands:

	```
	# MacOS
	./rke_darwin-amd64 up --config rancher-cluster.yml
	# Linux
	./rke_linux-amd64 up --config rancher-cluster.yml
	```


**Result:** RKE is configured to take recurring snapshots of `etcd` on all nodes running the etcd role. Snapshots are saved to the following directory: `/opt/rke/etcd-snapshots/`.

#### Option B: One-Time Snapshots

When you're about to upgrade Rancher or restore it to a previous snapshot, you should snapshot your live image so that you have a backup of `etcd` in its last known state.

**To Take a One-Time Snapshot:**

1. Open **Terminal** and change directory to the location of the RKE binary. Your `rancher-cluster.yml` file must reside in the same directory.

2. Enter the following command. Replace `<SNAPSHOT.db>` with any name that you want to use for the snapshot (e.g. `upgrade.db`).

	```
	# MacOS
	./rke_darwin-amd64 etcd snapshot-save --name <SNAPSHOT.db> --config rancher-cluster.yml
	# Linux
	./rke_linux-amd64 etcd snapshot-save --name <SNAPSHOT.db> --config rancher-cluster.yml
	```

**Result:** RKE takes a snapshot of `etcd` running on each etcd node. The file is saved to `/opt/rke/etcd-snapshots`.

### 3. Backup Snapshots to a Safe Location

After taking the etcd snapshots, save them to a safe location so that they're unaffected if your cluster experiences a disaster scenrio. This location should be persistent.

In this documentation, as an example, we're using Amazon S3 as our safe location, and [S3cmd](http://s3tools.org/s3cmd) as our tool to create the backups. The backup location and tool that you use are ultimately your decision.

**Example:**

```
root@node:~# s3cmd mb s3://rke-etcd-snapshots
root@node:~# s3cmd /opt/rke/etcd-snapshots/snapshot.db s3://rke-etcd-snapshots/
```


## Restoration Workflow

Following a disaster scenario, restoration of your HA Rancher installation requires you to pull your snapshot from your chosen external location and then restore it.

1. [Create New Node and Pull Snapshot](#1-create-new-node-and-pull-snapshot)

	If one of your `etcd` nodes goes down, create a new node, and then pull the most recent `etcd` snapshot to that node.

2. [Restore ETCD Database](#2-restore-etcd-database)

	After you pull the snapshot, run the RKE command to restore the `etcd` database.

<br/>
### 1. Create New Node and Pull Snapshot

If one of your etcd nodes go down, you need to replace it with a new node, and then pull the most recent working to that node.

**To Create a New Node and Pull the Latest Snapshot:**

1. Create a new node of your choice—baremetal, on-prem virtual machine, cloud-based virtual machine, and so on. Provision it according to our [requirements]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install/# host-requirements).

2.  Log in to your new node using your preferred shell, such as PuTTy or a remote Terminal connection.


3.  Create a directory that mirrors your other nodes' snapshot directories:

	```
	root@newnode:~# mkdir -p /opt/rke/etcd-snapshots
	```

4. Pull your most recent snapshot onto the node. Replace `<SNAPSHOT.db>` with the name of the snapshot you're restoring to.

	```
	root@newnode:~# s3cmd get s3://rke-etcd-snapshots/<SNAPSHOT.db> /opt/rke/etcd-snapshots/<SNAPSHOT.db>
	```

	>**Remember:** Our use of Amazon S3 is an example used for this documentation. The command for pulling your snapshot may vary.


After restoring the cluster you have to restart the kubernetes components on all nodes, otherwise there will be some conflicts with resource versions of objects stored in etcd, this will include restart to kubernetes components and the network components, for more information please refer to [kubernetes documentation](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#etcd-upgrade-requirements), to do that you can run the following on each node:
```
docker restart kube-apiserver kubelet kube-controller-manager kube-scheduler kube-proxy
docker ps | grep flannel | cut -f 1 -d " " | xargs docker restart
docker ps | grep calico | cut -f 1 -d " " | xargs docker restart
```

### 2. Restore ETCD Database

To restore the most recent `etcd` snapshot on your new node, run RKE's `etcd snapshot-restore` command. This command reverts to any snapshot stored in `/opt/rke/etcd-snapshots` that you explicitly define. When you run `etcd snapshot-restore`, RKE removes the old etcd container if it still exists. To restore operations, RKE creates a new etcd cluster using the snapshot you choose.

>**Important:** When restoring the etcd database, you must restore each etcd to the _same_ snapshot, this means the exact same copy, so to restore you have to copy the snapshot from one of the nodes to the others before doing the `etcd snapshot-restore`

>**Warning:** Restoring an etcd snapshot deletes your current etcd cluster and replaces it with a new one. Before you run the `etcd snapshot-restore` command, backup any important data in your current cluster.


1. From your workstation, open `rancher-cluster.yml` in your favorite text editor.

2. Replace the unresponsive node (`3.3.3.3` in this example) with your new one (`4.4.4.4`). You IP addresses will be different obviously:

		nodes:
			- address: 1.1.1.1
			  user: root
			  role: [controlplane,etcd,worker]
			  ssh_key_path: ~/.ssh/id_rsa
			- address: 2.2.2.2
			  user: root
			  role: [controlplane,etcd,worker]
			  ssh_key_path: ~/.ssh/id_rsa
		#	- address: 3.3.3.3  # UNRESPONSIVE NODE
		#	  user: root
		#	  role: [controlplane,etcd,worker]
		#	  ssh_key_path: ~/.ssh/id_rsa
			- address: 4.4.4.4  # NEW NODE
			  user: root
			  role: [controlplane,etcd,worker]
			  ssh_key_path: ~/.ssh/id_rsa

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

7. Lastly, restart the Kubernetes components on all cluster nodes to prevent potential `etcd` conflicts. Run this command on each of your nodes.

	```
	docker restart kube-apiserver kubelet kube-controller-manager kube-scheduler kube-proxy
	docker ps | grep flannel | cut -f 1 -d " " | xargs docker restart
	docker ps | grep calico | cut -f 1 -d " " | xargs docker restart
  	```
