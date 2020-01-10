---
title: High Availability with an External DB
weight: 30
---

>**Note:** Official support for High-Availability (HA) was introduced in our v1.0.0 release.

This section describes how to install a high-availability K3s cluster with an external database.

Single server clusters can meet a variety of use cases, but for environments where uptime of the Kubernetes control plane is critical, you can run K3s in an HA configuration. An HA K3s cluster is comprised of:

* Two or more **server nodes** that will serve the Kubernetes API and run other control plane services
* An **external datastore** (as opposed to the embedded SQLite datastore used in single-server setups)
* A **fixed registration address** that is placed in front of the server nodes to allow worker nodes to register with the cluster

For more details on how these components work together, refer to the [architecture section.]({{<baseurl>}}/k3s/latest/en/architecture/#high-availability-with-an-external-db)

Workers register through the fixed registration address, but after registration they establish a connection directly to one of the server nodes. This is a websocket connection initiated by the `k3s agent` process and it is maintained by a client-side load balancer running as part of the agent process.

# Installation Outline

Setting up an HA cluster requires the following steps:

1. [Create an external datastore](#1-create-an-external-datastore)
2. [Launch server nodes](#2-launch-server-nodes)
3. [Configure the fixed registration address](#3-configure-the-fixed-registration-address)
4. [Join worker nodes](#4-join-worker-nodes)

### 1. Create an External Datastore
You will first need to create an external datastore for the cluster. See the [Cluster Datastore Options]({{< baseurl >}}/k3s/latest/en/installation/datastore/) documentation for more details.

### 2. Launch Server Nodes
K3s requires two or more server nodes for this HA configuration. See the [Node Requirements]({{< baseurl >}}/k3s/latest/en/installation/node-requirements/) guide for minimum machine requirements.

When running the `k3s server` command on these nodes, you must set the `datastore-endpoint` parameter so that K3s knows how to connect to the external datastore. Please see the [datastore configuration guide]({{< baseurl >}}/k3s/latest/en/installation/datastore/#external-datastore-configuration-parameters) for information on configuring this parameter.

> **Note:** The same installation options available to single-server installs are also available for HA installs. For more details, see the [Installation and Configuration Options]({{< baseurl >}}/k3s/latest/en/installation/install-options/) documentation.

By default, server nodes will be schedulable and thus your workloads can get launched on them. If you wish to have a dedicated control plane where no user workloads will run, you can use taints. The <span style='white-space: nowrap'>`node-taint`</span> parameter will allow you to configure nodes with taints, for example <span style='white-space: nowrap'>`--node-taint k3s-controlplane=true:NoExecute`</span>.

Once you've launched the `k3s server` process on all server nodes, you can ensure that the cluster has come up properly by checking that the nodes are in the Ready state with `k3s kubectl get nodes`.

### 3. Configure the Fixed Registration Address
Worker nodes need a URL to register against. This can be the IP or hostname of any of the server nodes, but in many cases those may change over time. For example, if you are running your cluster in a cloud that supports scaling groups, you may scale the server node group up and down over time, causing nodes to be created and destroyed and thus having different IPs from the initial set of server nodes. Therefore, you should have a stable endpoint in front of the server nodes that will not change over time. This endpoint can be set up using any number approaches, such as:

* A layer-4 (TCP) load balancer
* Round-robin DNS
* Virtual or elastic IP addresses

This endpoint can also be used for accessing the Kubernetes API. So you can, for example, modify your [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) file to point to it instead of a specific node.

### 4. Join Worker Nodes
Joining worker nodes in an HA cluster is the same as joining worker nodes in a single server cluster. You just need to specify the URL the agent should register to and the token it should use.
```
K3S_TOKEN=SECRET k3s agent --server https://fixed-registration-address:6443
```
