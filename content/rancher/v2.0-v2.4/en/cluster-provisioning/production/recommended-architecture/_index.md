---
title: Recommended Cluster Architecture
weight: 1
---

There are three roles that can be assigned to nodes: `etcd`, `controlplane` and `worker`. 

# Separating Worker Nodes from Nodes with Other Roles

When designing your cluster(s), you have two options:

* Use dedicated nodes for each role. This ensures resource availability for the components needed for the specified role. It also strictly isolates network traffic between each of the roles according to the [port requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/node-requirements/#networking-requirements). 
* Assign the `etcd` and `controlplane` roles to the same nodes. These nodes must meet the hardware requirements for both roles.

In either case, the `worker` role should not be used or added to nodes with the `etcd` or `controlplane` role.

Therefore, each node should have one of the following role configurations:

  * `etcd`
  * `controlplane`
  * Both `etcd` and `controlplane`
  * `worker`

# Recommended Number of Nodes with Each Role

The cluster should have:

- At least three nodes with the role `etcd` to survive losing one node. Increase this count for higher node fault toleration, and spread them across (availability) zones to provide even better fault tolerance.
- At least two nodes with the role `controlplane` for master component high availability.
- At least two nodes with the role `worker` for workload rescheduling upon node failure.

For more information on what each role is used for, refer to the [section on roles for nodes in Kubernetes.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/production/nodes-and-roles)


### Number of Controlplane Nodes

Adding more than one node with the `controlplane` role makes every master component highly available.

### Number of etcd Nodes

The number of nodes that you can lose at once while maintaining cluster availability is determined by the number of nodes assigned the `etcd` role. For a cluster with n members, the minimum is (n/2)+1. Therefore, we recommend creating an  `etcd` node in 3 different availability zones within a region to survive the loss of one availability zone. If you use only two zones, you can only survive the loss of the zone where you don't lose the majority of nodes.

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

* [Official etcd documentation on optimal etcd cluster size](https://etcd.io/docs/v3.4.0/faq/#what-is-failure-tolerance)
* [Official Kubernetes documentation on operating etcd clusters for Kubernetes](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/)

### Number of Worker Nodes

Adding more than one node with the `worker` role will make sure your workloads can be rescheduled if a node fails.

### Why Production Requirements are Different for the Rancher Cluster and the Clusters Running Your Applications

You may have noticed that our [Kubernetes Install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/install-rancher-on-k8s/) instructions do not meet our definition of a production-ready cluster, as there are no dedicated nodes for the `worker` role. However, for your Rancher installation, this three node cluster is valid, because:

* It allows one `etcd` node failure.
* It maintains multiple instances of the master components by having multiple `controlplane` nodes.
* No other workloads than Rancher itself should be created on this cluster.

# References

* [Kubernetes: Master Components](https://kubernetes.io/docs/concepts/overview/components/#master-components)
