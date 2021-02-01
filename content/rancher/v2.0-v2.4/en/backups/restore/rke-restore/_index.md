---
title: Restoring Backups—Kubernetes installs
shortTitle: RKE Installs
weight: 2
aliases:
  - /rancher/v2.0-v2.4/en/installation/after-installation/ha-backup-and-restoration/
  - /rancher/v2.0-v2.4/en/backups/restorations/ha-restoration
  - /rancher/v2.0-v2.4/en/backups/restorations/k8s-restore/rke-restore
  - /rancher/v2.0-v2.4/en/backups/legacy/restore/k8s-restore/rke-restore/
  - /rancher/v2.0-v2.4/en/backups/legacy/restore/rke-restore
  - /rancher/v2.0-v2.4/en/backups/v2.0.x-v2.4.x/restore/rke-restore
---

This procedure describes how to use RKE to restore a snapshot of the Rancher Kubernetes cluster. 
This will restore the Kubernetes configuration and the Rancher database and state.

> **Note:** This document covers clusters set up with RKE >= v0.2.x, for older RKE versions refer to the [RKE Documentation]({{<baseurl>}}/rke/latest/en/etcd-snapshots/restoring-from-backup).

## Restore Outline

<!-- TOC -->

- [1. Preparation](#1-preparation)
- [2. Place Snapshot](#2-place-snapshot)
- [3. Configure RKE](#3-configure-rke)
- [4. Restore the Database and bring up the Cluster](#4-restore-the-database-and-bring-up-the-cluster)

<!-- /TOC -->

### 1. Preparation

It is advised that you run the restore from your local host or a jump box/bastion where your cluster yaml, rke statefile, and kubeconfig are stored.  You will need [RKE]({{<baseurl>}}/rke/latest/en/installation/) and [kubectl]({{<baseurl>}}/rancher/v2.0-v2.4/en/faq/kubectl/) CLI utilities installed locally.

Prepare by creating 3 new nodes to be the target for the restored Rancher instance.  We recommend that you start with fresh nodes and a clean state. For clarification on the requirements, review the [Installation Requirements](https://rancher.com/docs/rancher/v2.0-v2.4/en/installation/requirements/).  

Alternatively you can re-use the existing nodes after clearing Kubernetes and Rancher configurations. This will destroy the data on these nodes. See [Node Cleanup]({{<baseurl>}}/rancher/v2.0-v2.4/en/faq/cleaning-cluster-nodes/) for the procedure.

You must restore each of your etcd nodes to the same snapshot. Copy the snapshot you're using from one of your nodes to the others before running the `etcd snapshot-restore` command.

> **IMPORTANT:** Before starting the restore make sure all the Kubernetes services on the old cluster nodes are stopped. We recommend powering off the nodes to be sure.

### 2. Place Snapshot

As of RKE v0.2.0, snapshots could be saved in an S3 compatible backend. To restore your cluster from the snapshot stored in S3 compatible backend, you can skip this step and retrieve the snapshot in [4. Restore the Database and bring up the Cluster](#4-restore-the-database-and-bring-up-the-cluster). Otherwise, you will need to place the snapshot directly on one of the etcd nodes.

Pick one of the clean nodes that will have the etcd role assigned and place the zip-compressed snapshot file in `/opt/rke/etcd-snapshots` on that node.

> **Note:** Because of a current limitation in RKE, the restore process does not work correctly if `/opt/rke/etcd-snapshots` is a NFS share that is mounted on all nodes with the etcd role. The easiest options are to either keep `/opt/rke/etcd-snapshots` as a local folder during the restore process and only mount the NFS share there after it has been completed, or to only mount the NFS share to one node with an etcd role in the beginning.

### 3. Configure RKE

Use your original `rancher-cluster.yml` and `rancher-cluster.rkestate` files. If they are not stored in a version control system, it is a good idea to back them up before making any changes.

```
cp rancher-cluster.yml rancher-cluster.yml.bak
cp rancher-cluster.rkestate rancher-cluster.rkestate.bak
```

If the replaced or cleaned nodes have been configured with new IP addresses, modify the `rancher-cluster.yml` file to ensure the address and optional internal_address fields reflect the new addresses.

> **IMPORTANT:** You should not rename the `rancher-cluster.yml` or `rancher-cluster.rkestate` files. It is important that the filenames match each other.

### 4. Restore the Database and bring up the Cluster

You will now use the RKE command-line tool with the `rancher-cluster.yml` and the `rancher-cluster.rkestate` configuration files to restore the etcd database and bring up the cluster on the new nodes.

> **Note:** Ensure your `rancher-cluster.rkestate` is present in the same directory as the `rancher-cluster.yml` file before starting the restore, as this file contains the certificate data for the cluster.

#### Restoring from a Local Snapshot

When restoring etcd from a local snapshot, the snapshot is assumed to be located on the target node in the directory `/opt/rke/etcd-snapshots`.

```
rke etcd snapshot-restore --name snapshot-name --config ./rancher-cluster.yml
```

> **Note:** The --name parameter expects the filename of the snapshot without the extension.

#### Restoring from a Snapshot in S3

_Available as of RKE v0.2.0_

When restoring etcd from a snapshot located in an S3 compatible backend, the command needs the S3 information in order to connect to the S3 backend and retrieve the snapshot.

```
$ rke etcd snapshot-restore --config ./rancher-cluster.yml --name snapshot-name \
--s3 --access-key S3_ACCESS_KEY --secret-key S3_SECRET_KEY \
--bucket-name s3-bucket-name --s3-endpoint s3.amazonaws.com \
--folder folder-name # Available as of v2.3.0
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
| `--folder` value |  Specify s3 folder in the bucket name _Available as of v2.3.0_ | *|
| `--region` value          |  Specify the s3 bucket location (optional) | *|
| `--ssh-agent-auth`      |   [Use SSH Agent Auth defined by SSH_AUTH_SOCK]({{<baseurl>}}/rke/latest/en/config-options/#ssh-agent) | |
| `--ignore-docker-version`  | [Disable Docker version check]({{<baseurl>}}/rke/latest/en/config-options/#supported-docker-versions) |

#### Testing the Cluster

Once RKE completes it will have created a credentials file in the local directory.  Configure `kubectl` to use the `kube_config_rancher-cluster.yml` credentials file and check on the state of the cluster. See [Installing and Configuring kubectl]({{<baseurl>}}/rancher/v2.0-v2.4/en/faq/kubectl/#configuration) for details.

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

#### Finishing Up

Rancher should now be running and available to manage your Kubernetes clusters. 
> **IMPORTANT:** Remember to save your updated RKE config (`rancher-cluster.yml`) state file (`rancher-cluster.rkestate`) and `kubectl` credentials (`kube_config_rancher-cluster.yml`) files in a safe place for future maintenance for example in a version control system.
