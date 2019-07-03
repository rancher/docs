---
title: Adding and Removing Nodes
weight: 175
aliases:
  - /rke/latest/en/installation/managing-clusters/
---

### Adding/Removing Nodes

RKE supports adding/removing [nodes]({{< baseurl >}}/rke/latest/en/config-options/nodes/) for worker and controlplane hosts.

In order to add additional nodes, you update the original `cluster.yml` file with any additional nodes and specify their role in the Kubernetes cluster.

In order to remove nodes, remove the node information from the nodes list in the original `cluster.yml`.

After you've made changes to add/remove nodes, run `rke up` with the updated `cluster.yml`.

### Adding/Removing Worker Nodes

You can add/remove only worker nodes, by running `rke up --update-only`. This will ignore everything else in the `cluster.yml` except for any worker nodes.

### Removing Kubernetes Components from Nodes

In order to remove the Kubernetes components from nodes, you use the `rke remove` command.

> **Warning:** This command is irreversible and will destroy the Kubernetes cluster, including etcd snapshots on S3. If there is a disaster and your cluster is inaccessible, refer to the process for [restoring your cluster from a snapshot]({{< baseurl >}}rke/latest/en/etcd-snapshots/#etcd-disaster-recovery).

The `rke remove` command does the following to each node in the `cluster.yml`:

- Remove the Kubernetes component deployed on it
  - `etcd`
  - `kube-apiserver`
  - `kube-controller-manager`
  - `kubelet`
  - `kube-proxy`
  - `nginx-proxy`

> **Note:** Pods are not removed from the nodes. If the node is re-used, the pods will automatically be removed when the new Kubernetes cluster is created.

- Clean each host from the directories left by the services:
  - /etc/kubernetes/ssl
  - /var/lib/etcd
  - /etc/cni
  - /opt/cni
  - /var/run/calico
