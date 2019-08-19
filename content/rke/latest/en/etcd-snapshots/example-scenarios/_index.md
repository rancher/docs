---
title: Example Scenarios
weight: 4
---

These example scenarios for backup and restore are different based on your version of RKE.

{{% tabs %}}
{{% tab "RKE v0.2.0+" %}}

This walkthrough will demonstrate how to restore an etcd cluster from a local snapshot with the following steps:

- [Take a local snapshot of a cluster](#back-up-the-etcd-cluster)
- [Simulate a node failure](#simulate-a-node-failure)
- [Add a new etcd node to the Cluster](#add-a-new-etcd-node-to-the-kubernetes-cluster)
- [Restore etcd on the new node from the backup](#restore-etcd-on-the-new-node-from-the-backup)
- [Restore Operations on the Cluster](#restore-operations-on-the-cluster)

In this example, the Kubernetes cluster was deployed on two AWS nodes.

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| node2 | 10.0.0.2 | [etcd]                 |


### Back up the etcd Cluster

Take a local snapshot of the Kubernetes cluster.

You can upload this snapshot directly to an S3 backend with the [S3 options]({{<baseurl>}}/rke/latest/en/etcd-snapshots/one-time-snapshots/#options-for-rke-etcd-snapshot-save).

```
$ rke etcd snapshot-save --name snapshot.db --config cluster.yml
```

![etcd snapshot]({{< baseurl >}}/img/rke/rke-etcd-backup.png)

### Simulate a Node Failure

To simulate the failure, let's power down `node2`.

```
root@node2:~# poweroff
```

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| ~~node2~~ | ~~10.0.0.2~~ | ~~[etcd]~~                 |
| node3 | 10.0.0.3 | [etcd]                 |

###  Add a New etcd Node to the Kubernetes Cluster

Before updating and restoring etcd, you will need to add the new node into the Kubernetes cluster with the `etcd` role. In the `cluster.yml`, comment out the old node and add in the new node.

```yaml
nodes:
    - address: 10.0.0.1
      hostname_override: node1
      user: ubuntu
      role:
        - controlplane
        - worker
#    - address: 10.0.0.2
#      hostname_override: node2
#      user: ubuntu
#      role:
#       - etcd
    - address: 10.0.0.3
      hostname_override: node3
      user: ubuntu
      role:
        - etcd
```

###  Restore etcd on the New Node from the Backup

> **Prerequisite:** Ensure your `cluster.rkestate` is present before starting the restore, because this contains your certificate data for the cluster.

After the new node is added to the `cluster.yml`, run the `rke etcd snapshot-restore` to launch `etcd` from the backup:

```
$ rke etcd snapshot-restore --name snapshot.db --config cluster.yml
```

The snapshot is expected to be saved at `/opt/rke/etcd-snapshots`.

If you want to directly retrieve the snapshot from S3, add in the [S3 options](#options-for-rke-etcd-snapshot-restore).

> **Note:** As of v0.2.0, the file `pki.bundle.tar.gz` is no longer required for the restore process because the certificates required to restore are preserved within the `cluster.rkestate`.

### Confirm that Cluster Operations are Restored

The `rke etcd snapshot-restore` command triggers `rke up` using the new `cluster.yml`. Confirm that your Kubernetes cluster is functional by checking the pods on your cluster.

```
> kubectl get pods                                                    
NAME                     READY     STATUS    RESTARTS   AGE
nginx-65899c769f-kcdpr   1/1       Running   0          17s
nginx-65899c769f-pc45c   1/1       Running   0          17s
nginx-65899c769f-qkhml   1/1       Running   0          17s
```

{{% /tab %}}
{{% tab "RKE prior to v0.2.0" %}}

### Example Scenario of restoring from a Local Snapshot

In this example, the Kubernetes cluster was deployed on two AWS nodes.

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| node2 | 10.0.0.2 | [etcd]                 |

### Back up the etcd Cluster

Take a local snapshot of the Kubernetes cluster:

```
$ rke etcd snapshot-save --name snapshot.db --config cluster.yml
```

![etcd snapshot]({{< baseurl >}}/img/rke/rke-etcd-backup.png)

### Store the Snapshot Externally in S3

After taking the etcd snapshot on `node2`, we recommend saving this backup in a persistence place. One of the options is to save the backup and `pki.bundle.tar.gz` file on an S3 bucket or tape backup.

> **Note:** As of v0.2.0, the file `pki.bundle.tar.gz` is no longer required for the restore process.

```
# If you're using an AWS host and have the ability to connect to S3
root@node2:~# s3cmd mb s3://rke-etcd-backup
root@node2:~# s3cmd \
  /opt/rke/etcd-snapshots/snapshot.db \
  /opt/rke/etcd-snapshots/pki.bundle.tar.gz \
  s3://rke-etcd-backup/
```

### Simulate a Node Failure

To simulate the failure, let's power down `node2`.

```
root@node2:~# poweroff
```

|  Name |    IP    |          Role          |
|:-----:|:--------:|:----------------------:|
| node1 | 10.0.0.1 | [controlplane, worker] |
| ~~node2~~ | ~~10.0.0.2~~ | ~~[etcd]~~                 |
| node3 | 10.0.0.3 | [etcd]                 |
|   |   |   |


### Remove the Kubernetes Cluster and Clean the Nodes

The following command removes your cluster and cleans the nodes so that the cluster can be restored without any conflicts:

```
rke remove --config rancher-cluster.yml
```

### Retrieve the Backup and Place it On a New Node

Before restoring etcd and running `rke up`, we need to retrieve the backup saved on S3 to a new node, e.g. `node3`. 

```
# Make a Directory
root@node3:~# mkdir -p /opt/rke/etcdbackup

# Get the Backup from S3
root@node3:~# s3cmd get \
  s3://rke-etcd-backup/snapshot.db \
  /opt/rke/etcd-snapshots/snapshot.db

# Get the pki bundle from S3
root@node3:~# s3cmd get \
  s3://rke-etcd-backup/pki.bundle.tar.gz \
  /opt/rke/etcd-snapshots/pki.bundle.tar.gz
```

> **Note:** If you had multiple etcd nodes, you would have to manually sync the snapshot and `pki.bundle.tar.gz` across all of the etcd nodes in the cluster.

###  Add a New etcd Node to the Kubernetes Cluster

Before updating and restoring etcd, you will need to add the new node into the Kubernetes cluster with the `etcd` role. In the `cluster.yml`, comment out the old node and add in the new node. `

```yaml
nodes:
    - address: 10.0.0.1
      hostname_override: node1
      user: ubuntu
      role:
        - controlplane
        - worker
#    - address: 10.0.0.2
#      hostname_override: node2
#      user: ubuntu
#      role:
#       - etcd
    - address: 10.0.0.3
      hostname_override: node3
      user: ubuntu
      role:
        - etcd
```

###  Restore etcd on the New Node from the Backup

After the new node is added to the `cluster.yml`, run the `rke etcd snapshot-restore` command to launch `etcd` from the backup:

```
$ rke etcd snapshot-restore --name snapshot.db --config cluster.yml
```

The snapshot and `pki.bundle.tar.gz` file are expected to be saved at `/opt/rke/etcd-snapshots` on each etcd node.

### Restore Operations on the Cluster

Finally, we need to restore the operations on the cluster. We will make the Kubernetes API point to the new `etcd` by running `rke up` again using the new `cluster.yml`.

```
$ rke up --config cluster.yml
```

Confirm that your Kubernetes cluster is functional by checking the pods on your cluster.

```
> kubectl get pods                                                    
NAME                     READY     STATUS    RESTARTS   AGE
nginx-65899c769f-kcdpr   1/1       Running   0          17s
nginx-65899c769f-pc45c   1/1       Running   0          17s
nginx-65899c769f-qkhml   1/1       Running   0          17s
```

{{% /tab %}}
{{% /tabs %}}