---
title: Clusters
weight: 2100
---

## What's a Cluster?

A cluster is a group of computing resources that work as a team to accomplish a goal. Each individual computer in a cluster is called a _node_.

## Cluster Creation

Rancher simplifies creation of Kubernetes clusters by allowing you to create them with the Rancher UI rather than a config file.

### Node Components

A Kubernetes cluster contains 3 types of nodes: etcd nodes, control plane nodes, and worker nodes.

#### etcd Nodes

The etcd nodes are used to run the etcd database. etcd is a key value store used as Kubernetes’ backing store for all cluster data. Even though you can run etcd on a single node, you need 3, 5, or 7 nodes for redundancy.

#### Control Plane Nodes

The control plane nodes are used to run the Kubernetes API server, scheduler, and controller manager. Control plane nodes are stateless since all cluster data are stored on etcd nodes. You can run control plane on 1 node, although 2 or more nodes are required for redundancy. You can also run control plane on etcd nodes.

#### Worker Nodes

Worker nodes are used to run the kubelet and the workload. It also runs the storage and networking drivers and ingress controllers when required. You create as many worker nodes as needed for your workload needs.

### Kubeconfig File

A kubeconfig file is used to configure access to kubernetes when using the kubectl commandline tool and other clients. For more details on how kubeconfig and kubectl work together, see the [Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/).

Rancher handles the creation of kubeconfig files for you. You can 

1. Navigate to the cluster dashboard page for the desired cluster cluster
1. Click the Kubeconfig File button
1. Copy the contents of the generated file using the Copy to Clipboard link
1. Paste the contents into a file on your local computer.

> **Note:** The default location that kubectl uses for the kubeconfig file is ~/.kube/config, but you can use any condition and specify it using the --kubeconfig flag like this:

> `kubectl --kubeconfig /custom/path/kube.config get pods`

This kubeconfig file will be specific to the cluster you were on when you copied the kubeconfig file contents. You will need a separate kubeconfig file for each cluster that you have access to in Rancher.
