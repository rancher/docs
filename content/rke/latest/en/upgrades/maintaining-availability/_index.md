---
title: Maintaining Availability for Applications During Upgrades
weight: 1
---
_Available as of v1.1.0_

In this section, you'll learn the requirements to prevent downtime for your applications when you upgrade the cluster using `rke up`.

An upgrade without downtime is one in which your workloads are available on at least a single node, and all critical addon services, such as Ingress and DNS, are available during the upgrade.

The way that clusters are upgraded changed in RKE v1.1.0. For details, refer to [How Upgrades Work.]({{<baseurl>}}/rke/latest/en/upgrades/how-upgrades-work)

This availability is achieved by upgrading worker nodes in batches of a configurable size, and ensuring that your workloads run on a number of nodes that exceeds that maximum number of unavailable worker nodes.

To avoid downtime for your applications during an upgrade, you will need to configure your workloads to continue running despite the rolling upgrade of worker nodes. There are also requirements for the cluster architecture and Kubernetes target version.

1. [Kubernetes Version Requirement](#1-kubernetes-version-requirement)
2. [Cluster Requirements](#2-cluster-requirements)
3. [Workload Requirements](#3-workload-requirements)

### 1. Kubernetes Version Requirement

When upgrading to a newer Kubernetes version, the upgrade must be from a minor release to the next minor version, or to within the same patch release series. 

### 2. Cluster Requirements

The following must be true of the cluster that will be upgraded:

1. The cluster has three or more etcd nodes.
1. The cluster has two or more controlplane nodes.
1. The cluster has two or more worker nodes.
1. The Ingress, DNS, and other addons are schedulable to a number of nodes that exceeds the maximum number of unavailable worker nodes, also called the batch size. By default, the minimum number of unavailable worker nodes is 10 percent of worker nodes, rounded down to the nearest node, with a minimum batch size of one node.

### 3. Workload Requirements

The following must be true of the cluster's applications:

1. The application and Ingress are deployed across a number of nodes exceeding the maximum number of unavailable worker nodes, also called the batch size. By default, the minimum number of unavailable worker nodes is 10 percent of worker nodes, rounded down to the nearest node, with a minimum batch size of one node.
1. The applications must make use of liveness and readiness probes.

For information on how to use node selectors to assign pods to nodes, refer to the [official Kubernetes documentation.](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/)

For information on configuring the number of replicas for each addon, refer to [this section.]({{<baseurl>}}/rke/latest/en/upgrades/configuring-strategy/)