---
title: Restoring Backups—High Availability Installs
weight: 370
aliases:
  - /rancher/v2.x/en/installation/after-installation/ha-backup-and-restoration/
---

This procedure describes how to use RKE to restore a snapshot of the Rancher Kubernetes cluster. The cluster snapshot will include Kubernetes configuration and the Rancher database and state.

## Restore Outline

1. [Preparation](#1-preparation)

	Install utilities and create new or clean existing nodes to prepare for restore.

2. [Place Snapshot and PKI Bundle](#2-place-snapshot-and-pki-bundle)

	Pick a node and place snapshot `.db` and `pki.bundle.tar.gz` files.

3. [Configure RKE](#3-configure-rke)

	Configure RKE `cluster.yml`. Remove `addons:` section and point configuration to the clean nodes.

4. [Restore Database](#4-restore-database)

	Run RKE command to restore the `etcd` database to a single node.

5. [Bring Up the Cluster](#5-bring-up-the-cluster)

	Run RKE commands to bring up cluster one a single node. Clean up old nodes. Verify and add additional nodes.

<br/>

### 1. Preparation

You will need [RKE]({{< baseurl >}}/rke/v0.1.x/en/installation/) and [kubectl]({{< baseurl >}}/rancher/v2.x/en/faq/kubectl/) CLI utilities installed.

Prepare by creating 3 new nodes to be the target for the restored Rancher instance.  See [HA Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/) for node requirements.

We recommend that you start with fresh nodes and a clean state. Alternatively you can clear Kubernetes and Rancher configurations from the existing nodes. This will destroy the data on these nodes. See [Node Cleanup]({{< baseurl >}}/rancher/v2.x/en/faq/cleaning-cluster-nodes/) for the procedure.

### 2. Place Snapshot and PKI Bundle

Pick a one of the clean nodes. That node will be the "target node" for the initial restore.  Place the snapshot and PKI certificate bundle files in the `/opt/rke/etcd-snapshots` directory on the "target node".

* Snapshot - `<snapshot>.db`
* PKI Bundle - `pki.bundle.tar.gz`

### 3. Configure RKE

Make a copy of your original `rancher-cluster.yml` file.

```
cp rancher-cluster.yml rancher-cluster-restore.yml
```

Modify the copy and make the following changes.

* Remove or comment out entire the `addons:` section. The Rancher deployment and supporting configuration is already in the `etcd` database.
* Change your `nodes:` section to point to the restore nodes.
* Comment out the nodes that are not your "target node". We want the cluster to only start on that one node.

*Example* `rancher-cluster-restore.yml`

```yaml
nodes:
- address: 52.15.238.179     # New Target Node
  user: ubuntu
  role: [ etcd, controlplane, worker ]
# - address: 52.15.23.24
#   user: ubuntu
#   role: [ etcd, controlplane, worker ]
# - address: 52.15.238.133
#   user: ubuntu
#   role: [ etcd, controlplane, worker ]

# addons: |-
#   ---
#   kind: Namespace
#   apiVersion: v1
#   metadata:
#     name: cattle-system
#   ---
...

```

### 4. Restore Database

Use RKE with the new `rancher-cluster-restore.yml` configuration and restore the database to the single "target node".

```
rke etcd snapshot-restore --name <snapshot>.db --config ./rancher-cluster-restore.yml
```

> **NOTE:** RKE will create an `etcd` container with the restored database on the "target node". This container will not complete the `etcd` initialization and stay in a running state until the cluster brought up in the next step.

### 5. Bring Up the Cluster

Use RKE and bring up the cluster on the single "target node".

```
rke up --config ./rancher-cluster-restore.yml
```

#### Testing the Cluster

Once RKE completes, the cluster should now be up and Rancher should be running. RKE will have created a credentials file in the local directory.  Configure `kubectl` to use the `kube_config_rancher-cluster-restore.yml` credentials file and check on the state of the cluster. See [Installing and Configuring kubectl]({{< baseurl >}}/rancher/v2.x/en/faq/kubectl/#configuration) for details.

You should see your new "target node" in `Ready` and three old nodes in `NotReady`.

```
kubectl get nodes

NAME            STATUS    ROLES                      AGE       VERSION
52.15.238.179   Ready     controlplane,etcd,worker    1m       v1.10.5
18.217.82.189   NotReady  controlplane,etcd,worker   16d       v1.10.5
18.222.22.56    NotReady  controlplane,etcd,worker   16d       v1.10.5
18.191.222.99   NotReady  controlplane,etcd,worker   16d       v1.10.5
```

#### Cleaning up Old Nodes

Use `kubectl` to delete the old nodes from the cluster. Repeat for each old node.

```
kubectl delete node 18.217.82.189
```

#### Adding in Additional Nodes

Edit the `rancher-cluster-restore.yml` RKE config file and uncomment the additional nodes.

*Example* `rancher-cluster-restore.yml`

```yaml
nodes:
- address: 52.15.238.179     # New Target Node
  user: ubuntu
  role: [ etcd, controlplane, worker ]
- address: 52.15.23.24
  user: ubuntu
  role: [ etcd, controlplane, worker ]
- address: 52.15.238.133
  user: ubuntu
  role: [ etcd, controlplane, worker ]

# addons: |-
#   ---
#   kind: Namespace
...

```

Run RKE and add the nodes to the new cluster.

```
rke up --config ./rancher-cluster-restore.yml
```

#### Finishing Up

Rancher should now be running and available to manage your Kubernetes clusters.  Swap your Rancher DNS or Load Balancer endpoints to target the new cluster.  Once this is done the agents on your managed clusters should automatically reconnect.  This may take 10-15 minutes due to reconnect back off timeouts.

> **IMPORTANT:** Remember to save your new RKE config (`rancher-cluster-restore.yml`) and `kubectl` credentials (`kube_config_rancher-cluster-restore.yml`) files in a safe place for future maintenance.
