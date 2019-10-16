---
title: Cluster Architecture
weight: 1
---

* Nodes should have one of the following role configurations:
  * `etcd`
  * `controlplane`
  * `etcd` and `controlplane`
  * `worker` (the `worker` role should not be used or added on nodes with the `etcd` or `controlplane` role)
* Have at least three nodes with the role `etcd` to survive losing one node. Increase this count for higher node fault toleration, and spread them across (availability) zones to provide even better fault tolerance.
* Assign two or more nodes the `controlplane` role for master component high availability.
* Assign two or more nodes the `worker` role for workload rescheduling upon node failure.

For more information on what each role is used for, refer to the [section on roles for nodes in Kubernetes.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/production/nodes-and-roles)

While Rancher makes it easy to create Kubernetes clusters, a production-ready cluster takes more consideration and planning. There are three roles that can be assigned to nodes: `etcd`, `controlplane` and `worker`. 

When designing your cluster(s), you have two options:

* Use dedicated nodes for each role. This ensures resource availability for the components needed for the specified role. It also strictly isolates network traffic between each of the roles according to the [Port Requirements]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/node-requirements/#port-requirements/).
* Assign the `etcd` and `controlplane` roles to the same nodes. These nodes must meet the hardware requirements for both roles.

>**Important:** Do not add the `worker` role to any node configured with either the `etcd` or `controlplane` role. This will make the nodes schedulable for regular workloads, which could interfere with critical cluster components running on the nodes with the `etcd` or `controlplane` role.

References:

* [Kubernetes: Master Components](https://kubernetes.io/docs/concepts/overview/components/#master-components)


### Count of controlplane Nodes

Adding more than one node with the `controlplane` role makes every master component highly available. See below for a breakdown of how high availability is achieved per component.

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

### Count of worker Nodes

Adding more than one node with the `worker` role will make sure your workloads can be rescheduled if a node fails.


# Differences Between Rancher Cluster and the Clusters Running Your Applications

You may have noticed that our [High Availability (HA) Install]({{<baseurl>}}/rancher/v2.x/en/installation/ha/) instructions do not meet our definition of a production-ready cluster, as there are no dedicated nodes for the `worker` role. However, for your Rancher installation, this three node cluster is valid, because:

* It allows one `etcd` node failure.
* It maintains multiple instances of the master components by having multiple `controlplane` nodes.
* No other workloads than Rancher itself should be created on this cluster.