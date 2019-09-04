---
title: Restoring Backups—High Availability Installs
weight: 370
aliases:
  - /rancher/v2.x/en/installation/after-installation/ha-backup-and-restoration/
---

This procedure describes how to use RKE to restore a snapshot of the Rancher Kubernetes cluster. The cluster snapshot will include Kubernetes configuration and the Rancher database and state.

Additionally, the `pki.bundle.tar.gz` file usage is no longer required as v0.2.0 has changed how the [Kubernetes cluster state is stored]({{< baseurl >}}/rke/latest/en/installation/#kubernetes-cluster-state).

## Restore Outline

<!-- TOC -->

- [1. Preparation](#1-preparation)
- [2. Place Snapshot](#2-place-snapshot)
- [3. Configure RKE](#3-configure-rke)
- [4. Restore Database](#4-restore-database)
- [5. Bring Up the Cluster](#5-bring-up-the-cluster)

<!-- /TOC -->

### 1. Preparation

You will need [RKE]({{< baseurl >}}/rke/latest/en/installation/) and [kubectl]({{< baseurl >}}/rancher/v2.x/en/faq/kubectl/) CLI utilities installed.

Prepare by creating 3 new nodes to be the target for the restored Rancher instance.  See [HA Install]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/) for node requirements.

We recommend that you start with fresh nodes and a clean state. Alternatively you can clear Kubernetes and Rancher configurations from the existing nodes. This will destroy the data on these nodes. See [Node Cleanup]({{< baseurl >}}/rancher/v2.x/en/faq/cleaning-cluster-nodes/) for the procedure.

> **IMPORTANT:** Before starting the restore make sure all the Kubernetes services on the old cluster nodes are stopped. We recommend powering off the nodes to be sure.

### 2. Place Snapshot
The snapshot used to restore your etcd cluster is handled differently based on your version of RKE.

#### RKE v0.2.0+

As of RKE v0.2.0, snapshots could be saved in an S3 compatible backend. To restore your cluster from the snapshot stored in S3 compatible backend, you can skip this step and retrieve the snapshot in [Step 4: Restore Database](#4-restore-database). Otherwise, you will need to place the snapshot directly on the nodes.

Pick one of the clean nodes. That node will be the "target node" for the initial restore. Place your snapshot in `/opt/rke/etcd-snapshots` on the target node.

#### RKE v0.1.x

When you take a snapshot, RKE saves a backup of the certificates, i.e. a file named `pki.bundle.tar.gz`, in the same location. The snapshot and PKI bundle file are required for the restore process, and they are expected to be in the same location.

Pick one of the clean nodes. That node will be the "target node" for the initial restore. Place the snapshot and PKI certificate bundle files in the `/opt/rke/etcd-snapshots` directory on the target node.

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

RKE will create an `etcd` container with the restored database on the target node. This container will not complete the `etcd` initialization and stay in a running state until the cluster brought up in the next step.

#### Restoring from a Local Snapshot

When restoring etcd from a local snapshot, the snapshot is assumed to be located on the target node in the directory `/opt/rke/etcd-snapshots`.

> **Note:** For RKE v0.1.x, the `pki.bundle.tar.gz` file is also expected to be in the same location.

```
rke etcd snapshot-restore --name <snapshot>.db --config ./rancher-cluster-restore.yml
```

#### Restoring from a Snapshot in S3

_Available as of RKE v0.2.0_

When restoring etcd from a snapshot located in an S3 compatible backend, the command needs the S3 information in order to connect to the S3 backend and retrieve the snapshot.

> **Note:** Ensure your `cluster.rkestate` is present before starting the restore, as this contains your certificate data for the cluster.

```
$ rke etcd snapshot-restore --config cluster.yml --name snapshot-name \
--s3 --access-key S3_ACCESS_KEY --secret-key S3_SECRET_KEY \
--bucket-name s3-bucket-name --s3-endpoint s3.amazonaws.com
```

#### Options for `rke etcd snapshot-restore`

S3 specific options are only available for RKE v0.2.0+.

| Option | Description | S3 Specific |
| --- | --- | ---|
| `--name` value            |  Specify snapshot name | |
| `--config` value          |  Specify an alternate cluster YAML file (default: "cluster.yml") [$RKE_CONFIG] | |
| `--s3`                    |  Enabled backup to s3 |* |
| `--s3-endpoint` value     |  Specify s3 endpoint url (default: "s3.amazonaws.com") | * |
| `--access-key` value      |  Specify s3 accessKey | *|
| `--secret-key` value      |  Specify s3 secretKey | *|
| `--bucket-name` value     |  Specify s3 bucket name | *|
| `--region` value          |  Specify the s3 bucket location (optional) | *|
| `--ssh-agent-auth`      |   [Use SSH Agent Auth defined by SSH_AUTH_SOCK]({{< baseurl >}}/rke/latest/en/config-options/#ssh-agent) | |
| `--ignore-docker-version`  | [Disable Docker version check]({{< baseurl >}}/rke/latest/en/config-options/#supported-docker-versions) |

### 5. Bring Up the Cluster

Use RKE and bring up the cluster on the single "target node."

> **Note:** For users running RKE v0.2.0+, ensure your `cluster.rkestate` is present before starting the restore, as this contains your certificate data for the cluster.

```
rke up --config ./rancher-cluster-restore.yml
```

#### Testing the Cluster

Once RKE completes it will have created a credentials file in the local directory.  Configure `kubectl` to use the `kube_config_rancher-cluster-restore.yml` credentials file and check on the state of the cluster. See [Installing and Configuring kubectl]({{< baseurl >}}/rancher/v2.x/en/faq/kubectl/#configuration) for details.

Your new cluster will take a few minutes to stabilize. Once you see the new "target node" transition to `Ready` and three old nodes in `NotReady` you are ready to continue.

```
kubectl get nodes

NAME            STATUS    ROLES                      AGE       VERSION
52.15.238.179   Ready     controlplane,etcd,worker    1m       v1.10.5
18.217.82.189   NotReady  controlplane,etcd,worker   16d       v1.10.5
18.222.22.56    NotReady  controlplane,etcd,worker   16d       v1.10.5
18.191.222.99   NotReady  controlplane,etcd,worker   16d       v1.10.5
```

#### Cleaning up Old Nodes

Use `kubectl` to delete the old nodes from the cluster.

```
kubectl delete node 18.217.82.189 18.222.22.56 18.191.222.99
```

#### Reboot the Target Node

Reboot the target node to ensure the cluster networking and services are in a clean state before continuing.

#### Check Kubernetes Pods

Wait for the pods running in `kube-system`, `ingress-nginx` and the `rancher` pod in `cattle-system` to return to the `Running` state.

> **Note:** `cattle-cluster-agent` and `cattle-node-agent` pods will be in an `Error` or `CrashLoopBackOff` state until Rancher server is up and the DNS/Load Balancer have been pointed at the new cluster.

```
kubectl get pods --all-namespaces

NAMESPACE       NAME                                    READY     STATUS    RESTARTS   AGE
cattle-system   cattle-cluster-agent-766585f6b-kj88m    0/1       Error     6          4m
cattle-system   cattle-node-agent-wvhqm                 0/1       Error     8          8m
cattle-system   rancher-78947c8548-jzlsr                0/1       Running   1          4m
ingress-nginx   default-http-backend-797c5bc547-f5ztd   1/1       Running   1          4m
ingress-nginx   nginx-ingress-controller-ljvkf          1/1       Running   1          8m
kube-system     canal-4pf9v                             3/3       Running   3          8m
kube-system     cert-manager-6b47fc5fc-jnrl5            1/1       Running   1          4m
kube-system     kube-dns-7588d5b5f5-kgskt               3/3       Running   3          4m
kube-system     kube-dns-autoscaler-5db9bbb766-s698d    1/1       Running   1          4m
kube-system     metrics-server-97bc649d5-6w7zc          1/1       Running   1          4m
kube-system     tiller-deploy-56c4cf647b-j4whh          1/1       Running   1          4m
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

Rancher should now be running and available to manage your Kubernetes clusters. Review the [recommended architecture]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#recommended-architecture) for HA installations and update the endpoints for Rancher DNS or the Load Balancer that you built during Step 1 of the HA install ([1. Create Nodes and Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/#load-balancer)) to target the new cluster. Once the endpoints are updated, the agents on your managed clusters should automatically reconnect. This may take 10-15 minutes due to reconnect back off timeouts.

> **IMPORTANT:** Remember to save your new RKE config (`rancher-cluster-restore.yml`) and `kubectl` credentials (`kube_config_rancher-cluster-restore.yml`) files in a safe place for future maintenance.
