---
title: Roles for Nodes in Kubernetes
weight: 1
---

This section describes the roles for etcd nodes, controlplane nodes, and worker nodes in Kubernetes, and how the roles work together in a cluster.

This diagram is applicable to Kubernetes clusters [launched with Rancher using RKE.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/).

![Cluster diagram]({{<baseurl>}}/img/rancher/clusterdiagram.svg)<br/>
<sup>Lines show the traffic flow between components. Colors are used purely for visual aid</sup>

# etcd

Nodes with the `etcd` role run etcd, which is a consistent and highly available key value store used as Kubernetes’ backing store for all cluster data. etcd replicates the data to each node.

>**Note:** Nodes with the `etcd` role are shown as `Unschedulable` in the UI, meaning no pods will be scheduled to these nodes by default.

# controlplane

Nodes with the `controlplane` role run the Kubernetes master components (excluding `etcd`, as it's a separate role). See [Kubernetes: Master Components](https://kubernetes.io/docs/concepts/overview/components/#master-components) for a detailed list of components.

>**Note:** Nodes with the `controlplane` role are shown as `Unschedulable` in the UI, meaning no pods will be scheduled to these nodes by default.

### kube-apiserver

The Kubernetes API server (`kube-apiserver`) scales horizontally. Each node with the role `controlplane` will be added to the NGINX proxy on the nodes with components that need to access the Kubernetes API server. This means that if a node becomes unreachable, the local NGINX proxy on the node will forward the request to another Kubernetes API server in the list.

### kube-controller-manager

The Kubernetes controller manager uses leader election using an endpoint in Kubernetes. One instance of the `kube-controller-manager` will create an entry in the Kubernetes endpoints and updates that entry in a configured interval. Other instances will see an active leader and wait for that entry to expire (for example, when a node is unresponsive).

### kube-scheduler

The Kubernetes scheduler uses leader election using an endpoint in Kubernetes. One instance of the `kube-scheduler` will create an entry in the Kubernetes endpoints and updates that entry in a configured interval. Other instances will see an active leader and wait for that entry to expire (for example, when a node is unresponsive).

# worker

Nodes with the `worker` role run the Kubernetes node components. See [Kubernetes: Node Components](https://kubernetes.io/docs/concepts/overview/components/#node-components) for a detailed list of components.

# References

* [Kubernetes: Node Components](https://kubernetes.io/docs/concepts/overview/components/#node-components)