---
title: Production Ready Cluster
weight: 2510
---

While Rancher makes it easy to create Kubernetes clusters, a production-ready cluster takes more consideration and planning. There are three roles that can be assigned to nodes: `etcd`, `controlplane` and `worker`. In a production setup, each role will have dedicated nodes. The primary reason for this practice is to have dedicated resources available for the role. If you place multiple roles on a single node, their processes can interfere with each other, or pods may be scheduled to nodes that are critical to your cluster. The second reason is to have proper network isolation between the roles. Only certain roles need access to other roles.

## etcd

Nodes with the `etcd` role run etcd. etcd is a consistent and highly available key value store used as Kubernetes’ backing store for all cluster data. etcd replicates the data to each node.

>**Note:** Nodes with the `etcd` role are shown as `Unschedulable` in the UI, meaning no pods will be scheduled to these nodes by default.

### Hardware Requirements

Please see [Kubernetes: Building Large Clusters](https://kubernetes.io/docs/setup/cluster-large/) and [etcd: Hardware Recommendations](https://coreos.com/etcd/docs/latest/op-guide/hardware.html) for the hardware requirements.

### Count of etcd Nodes

The number of nodes that you can lose at once while maintaining cluster availability is determined by the number of nodes assigned the `etcd` role. For a cluster with n members, the minimum is (n/2)+1. Therefore, we recommend creating an  `etcd` node in 3 different availability zones to survive the loss of one availability zone within a region. If you use only two zones, you can only survive the loss of the zone where you don't lose the majority of nodes.

| Nodes with `etcd` role | Majority   | Failure Tolerance |
|--------------|------------|-------------------|
| 1 | 1 | 0 |
| 2 | 2 | 0 |
| 3 | 2 | **1** |
| 4 | 3 | 1 |
| 5 | 3 | **2** |
| 6 | 4 | 2 |
| 7 | 4 | **3** |
| 8 | 5 | 3 |
| 9 | 5 | **4** |

References:

* [etcd cluster size](https://coreos.com/etcd/docs/latest/v2/admin_guide.html#optimal-cluster-size)
* [Operating etcd clusters for Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/)

### Network Latency

Rancher recommends minimizing latency between the etcd nodes. The default setting for `heartbeat-interval` is `500`, and the default setting for `election-timeout` is `5000`. These settings allow etcd to run in most networks (except really high latency networks).

References:

* [etcd Tuning](https://coreos.com/etcd/docs/latest/tuning.html)

### Backups

etcd is the location where the state of your cluster is stored. Losing etcd data means losing your cluster. Make sure you configure [etcd Recurring Snapshots]({{< baseurl >}}/rancher/v2.x/en/backups/backups/ha-backups/#option-a-recurring-snapshots) for your cluster(s), and make sure the snapshots are stored externally (off the node) as well.

## controlplane

Nodes with the `controlplane` role run the Kubernetes master components (excluding `etcd`, as it's a separate role). See [Kubernetes: Master Components](https://kubernetes.io/docs/concepts/overview/components/#master-components) for a detailed list of components.

>**Note:** Nodes with the `controlplane` role are shown as `Unschedulable` in the UI, meaning no pods will be scheduled to these nodes by default.

References:

* [Kubernetes: Master Components](https://kubernetes.io/docs/concepts/overview/components/#master-components)

### Hardware Requirements

Please see [Kubernetes: Building Large Clusters](https://kubernetes.io/docs/setup/cluster-large/) for the hardware requirements.

### Count of controlplane Nodes

Adding more than one node with the `controlplane` role makes every master component highly available. See below for a breakdown of how high availability is achieved per component.

#### kube-apiserver

The Kubernetes API server (`kube-apiserver`) scales horizontally. Each node with the role `controlplane` will be added to the NGINX proxy on the nodes with components that need to access the Kubernetes API server. This means that if a node becomes unreachable, the local NGINX proxy on the node will forward the request to another Kubernetes API server in the list.

#### kube-controller-manager

The Kubernetes controller manager uses leader election using a lease in etcd. Other instances will see an active leader and wait for that lease to expire (when a node is unresponsive) to elect a new leader.

#### kube-scheduler

The Kubernetes scheduler uses leader election using a lease in etcd. Other instances will see an active leader and wait for that lease to expire (when a node is unresponsive) to elect a new leader.

## worker

Nodes with the `worker` role run the Kubernetes node components. See [Kubernetes: Node Components](https://kubernetes.io/docs/concepts/overview/components/#node-components) for a detailed list of components.

References:

* [Kubernetes: Node Components](https://kubernetes.io/docs/concepts/overview/components/#node-components)

### Hardware Requirements

The hardware requirements for nodes with the `worker` role mostly depend on your workloads. The minimum to run the Kubernetes node components is 1 CPU (core) and 1GB of memory.

### Count of worker Nodes

Adding more than one node with the `worker` role will make sure your workloads can be rescheduled if a node fails.

## Networking

Cluster nodes should be located within a single region. Most cloud providers provide multiple availability zones within a region, which can be used to create higher availability for your cluster. Using multiple availability zones is fine for nodes with any role. If you are using [Kubernetes Cloud Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) resources, consult the documentation for any restrictions (i.e. zone storage restrictions)

## Cluster Diagram

This diagram is applicable to Kubernetes clusters built using RKE or [Rancher Launched Kubernetes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/).

![Cluster diagram]({{< baseurl >}}/img/rancher/clusterdiagram.svg)

## Production Checklist

* Nodes have dedicated roles.
* Network traffic is strictly controlled according to [Port Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/references/).
* At least three nodes are assigned the `etcd` role to survive losing one node. Increase for higher node fault toleration, and spread them across availability zones to provide even better fault tolerance.
* At least two nodes are assigned the `controlplane` role to make the Kubernetes master components highly available.
* At least two nodes are assigned the `worker` role to facilitate reschedule of workloads upon node failure.
* Enable etcd snapshots, check the created snapshots, and run a disaster recovery scenario.
* Configure alerts/notifiers for Kubernetes components (System Service).
* Configure logging for cluster event analysis and post-mortem examination.
