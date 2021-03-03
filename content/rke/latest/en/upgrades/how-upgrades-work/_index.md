---
title: How Upgrades Work
weight: 1
---

In this section, you'll learn what happens when you edit or upgrade your RKE Kubernetes cluster. The below sections describe how each type of node is upgraded by default when a cluster is upgraded using `rke up`.

{{% tabs %}}
{{% tab "RKE v1.1.0+" %}}

The following features are new in RKE v1.1.0:

- The ability to upgrade or edit a cluster without downtime for your applications.
- The ability to manually upgrade nodes of a certain role without upgrading others.
- The ability to restore a Kubernetes cluster to an older Kubernetes version by restoring it to a snapshot that includes the older Kubernetes version. This capability allows you to safely upgrade one type of node at a time, because if an upgrade cannot be completed by all nodes in the cluster, you can downgrade the Kubernetes version of the nodes that were already upgraded.

When a cluster is upgraded with `rke up`, using the default options, the following process is used:

1. The etcd plane gets get updated, one node at a time.
1. Controlplane nodes get updated, one node at a time. This includes the controlplane components and worker plane components of the controlplane nodes.
1. Worker plane components of etcd nodes get updated, one node at a time.
1. Worker nodes get updated in batches of a configurable size. The default configuration for the maximum number of unavailable nodes is ten percent, rounded down to the nearest node, with a minimum batch size of one node.
1. [Addons]({{<baseurl>}}/rke/latest/en/config-options/add-ons/) get upgraded one by one.

The following sections break down in more detail what happens when etcd nodes, controlplane nodes, worker nodes, and addons are upgraded. This information is intended to be used to help you understand the update strategy for the cluster, and may be useful when troubleshooting problems with upgrading the cluster.

### Upgrades of etcd Nodes

A cluster upgrade begins by upgrading the etcd nodes one at a time.

If an etcd node fails at any time, the upgrade will fail and no more nodes will be upgraded. The cluster will be stuck in an updating state and not move forward to upgrading controlplane or worker nodes.

### Upgrades of Controlplane Nodes

Controlplane nodes are upgraded one at a time by default. The maximum number of unavailable controlplane nodes can also be configured, so that they can be upgraded in batches.

As long as the maximum unavailable number or percentage of controlplane nodes has not been reached, Rancher will continue to upgrade other controlplane nodes, then the worker nodes.

If any controlplane nodes were unable to be upgraded, the upgrade will not proceed to the worker nodes.

### Upgrades of Worker Nodes

By default, worker nodes are upgraded in batches. The size of the batch is determined by the maximum number of unavailable worker nodes, configured as the `max_unavailable_worker` directive in the `cluster.yml`.

By default, the `max_unavailable_worker` nodes is defined as 10 percent of all worker nodes. This number can be configured as a percentage or as an integer. When defined as a percentage, the batch size is rounded down to the nearest node, with a minimum of one node.

For example, if you have 11 worker nodes and `max_unavailable_worker` is 25%, two nodes will be upgraded at once because 25% of 11 is 2.75. If you have two worker nodes and `max_unavailable_worker` is 1%, the worker nodes will be upgraded one at a time because the minimum batch size is one.

When each node in a batch returns to a Ready state, the next batch of nodes begins to upgrade. If `kubelet` and `kube-proxy` have started, the node is Ready. As long as the `max_unavailable_worker` number of nodes have not failed, Rancher will continue to upgrade other worker nodes.

RKE scans the cluster before starting the upgrade to find the powered down or unreachable hosts. The upgrade will stop if that number matches or exceeds the maximum number of unavailable nodes.

RKE will cordon each node before upgrading it, and uncordon the node afterward. RKE can also be configured to [drain](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/) nodes before upgrading them. 

RKE will handle all worker node upgrades before upgrading any add-ons. As long as the maximum number of unavailable worker nodes is not reached, RKE will attempt to upgrade the [addons.](#upgrades-of-addons) For example, if a cluster has two worker nodes and one worker node fails, but the maximum unavailable worker nodes is greater than one, the addons will still be upgraded.

### Upgrades of Addons

The availability of your applications partly depends on the availability of [RKE addons.]({{<baseurl>}}/rke/latest/en/config-options/add-ons/) Addons are used to deploy several cluster components, including network plug-ins, the Ingress controller, DNS provider, and metrics server.

Because RKE addons are necessary for allowing traffic into the cluster, they will need to be updated in batches to maintain availability. You will need to configure the maximum number of unavailable replicas for each addon in the `cluster.yml` to ensure that your cluster will retain enough available replicas during an upgrade.

For more information on configuring the number of replicas for each addon, refer to [this section.]({{<baseurl>}}/rke/latest/en/upgrades/configuring-strategy)

For an example showing how to configure the addons, refer to the [example cluster.yml.]({{<baseurl>}}/rke/latest/en/upgrades/configuring-strategy/#example-cluster-yml)

{{% /tab %}}
{{% tab "RKE before v1.1.0" %}}

When a cluster is upgraded with `rke up`, using the default options, the following process is used:

- etcd nodes get updated first, one at a time.
- Controlplane nodes get updated second, in batches of 50 or the total number of worker nodes, whichever is lower.
- Worker nodes and addons get updated third, in batches of 50 or the total number of worker nodes, whichever is lower.
- Addons get upgraded one by one.

### Upgrades of Controlplane and etcd Nodes

Controlplane and etcd nodes would be upgraded in batches of 50 nodes or the total number of controlplane nodes, whichever is lower.

If a node fails at any time, the upgrade will stop upgrading any other nodes and fail.

### Upgrades of Worker Nodes

Worker nodes are upgraded simultaneously, in batches of either 50 or the total number of worker nodes, whichever is lower. If a worker node fails at any time, the upgrade stops.

When a worker node is upgraded, it restarts several Docker processes, including the `kubelet` and `kube-proxy`. When `kube-proxy` comes up, it flushes `iptables`. When this happens, pods on this node can’t be accessed, resulting in downtime for the applications.

{{% /tab %}}
{{% /tabs %}}
