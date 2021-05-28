---
title: Upgrading and Rolling Back Kubernetes
weight: 70
---

Following an upgrade to the latest version of Rancher, downstream Kubernetes clusters can be upgraded to use the latest supported version of Kubernetes.

Rancher calls RKE (Rancher Kubernetes Engine) as a library when provisioning and editing RKE clusters. For more information on configuring the upgrade strategy for RKE clusters, refer to the [RKE documentation]({{<baseurl>}}/rke/latest/en/).

This section covers the following topics:

- [New Features](#new-features)
- [Tested Kubernetes Versions](#tested-kubernetes-versions)
- [How Upgrades Work](#how-upgrades-work)
- [Recommended Best Practice for Upgrades](#recommended-best-practice-for-upgrades)
- [Upgrading the Kubernetes Version](#upgrading-the-kubernetes-version)
- [Rolling Back](#rolling-back)
- [Configuring the Upgrade Strategy](#configuring-the-upgrade-strategy)
  - [Configuring the Maximum Unavailable Worker Nodes in the Rancher UI](#configuring-the-maximum-unavailable-worker-nodes-in-the-rancher-ui)
  - [Enabling Draining Nodes During Upgrades from the Rancher UI](#enabling-draining-nodes-during-upgrades-from-the-rancher-ui)
  - [Maintaining Availability for Applications During Upgrades](#maintaining-availability-for-applications-during-upgrades)
  - [Configuring the Upgrade Strategy in the cluster.yml](#configuring-the-upgrade-strategy-in-the-cluster-yml)
- [Troubleshooting](#troubleshooting)

# Tested Kubernetes Versions

Before a new version of Rancher is released, it's tested with the latest minor versions of Kubernetes to ensure compatibility. For example, Rancher v2.3.0 is was tested with Kubernetes v1.15.4, v1.14.7, and v1.13.11. For details on which versions of Kubernetes were tested on each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/all-supported-versions/rancher-v2.3.0/)

# How Upgrades Work

RKE v1.1.0 changed the way that clusters are upgraded.

In this section of the [RKE documentation,]({{<baseurl>}}/rke/latest/en/upgrades/how-upgrades-work) you'll learn what happens when you edit or upgrade your RKE Kubernetes cluster.


# Recommended Best Practice for Upgrades

When upgrading the Kubernetes version of a cluster, we recommend that you:

1. Take a snapshot.
1. Initiate a Kubernetes upgrade.
1. If the upgrade fails, revert the cluster to the pre-upgrade Kubernetes version. This is achieved by selecting the **Restore etcd and Kubernetes version** option. This will return your cluster to the pre-upgrade kubernetes version before restoring the etcd snapshot.

The restore operation will work on a cluster that is not in a healthy or active state.

# Upgrading the Kubernetes Version

> **Prerequisites:**
>
> - The options below are available only for [Rancher-launched RKE Kubernetes clusters]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/) and [Registered K3s Kubernetes clusters.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/registered-clusters/#additional-features-for-registered-k3s-clusters)
> - Before upgrading Kubernetes, [back up your cluster.]({{<baseurl>}}/rancher/v2.5/en/backups)

1. From the **Global** view, find the cluster for which you want to upgrade Kubernetes. Select **&#8942; > Edit**.

1. Expand **Cluster Options**.

1. From the **Kubernetes Version** drop-down, choose the version of Kubernetes that you want to use for the cluster.

1. Click **Save**.

**Result:** Kubernetes begins upgrading for the cluster.

# Rolling Back

A cluster can be restored to a backup in which the previous Kubernetes version was used. For more information, refer to the following sections:

- [Backing up a cluster]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/backing-up-etcd/#how-snapshots-work)
- [Restoring a cluster from backup]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/restoring-etcd/#restoring-a-cluster-from-a-snapshot)

# Configuring the Upgrade Strategy

As of RKE v1.1.0, additional upgrade options became available to give you more granular control over the upgrade process. These options can be used to maintain availability of your applications during a cluster upgrade if certain [conditions and requirements]({{<baseurl>}}/rke/latest/en/upgrades/maintaining-availability) are met.

The upgrade strategy can be configured in the Rancher UI, or by editing the `cluster.yml`. More advanced options are available by editing the `cluster.yml`.

### Configuring the Maximum Unavailable Worker Nodes in the Rancher UI

From the Rancher UI, the maximum number of unavailable worker nodes can be configured. During a cluster upgrade, worker nodes will be upgraded in batches of this size.

By default, the maximum number of unavailable worker is defined as 10 percent of all worker nodes. This number can be configured as a percentage or as an integer. When defined as a percentage, the batch size is rounded down to the nearest node, with a minimum of one node.

To change the default number or percentage of worker nodes,

1. Go to the cluster view in the Rancher UI.
1. Click **&#8942; > Edit.**
1. In the **Advanced Options** section, go to the **Maxiumum Worker Nodes Unavailable** field. Enter the percentage of worker nodes that can be upgraded in a batch. Optionally, select **Count** from the drop-down menu and enter the maximum unavailable worker nodes as an integer.
1. Click **Save.**

**Result:** The cluster is updated to use the new upgrade strategy.

### Enabling Draining Nodes During Upgrades from the Rancher UI

By default, RKE [cordons](https://kubernetes.io/docs/concepts/architecture/nodes/#manual-node-administration) each node before upgrading it. [Draining](https://kubernetes.io/docs/tasks/administer-cluster/safely-drain-node/) is disabled during upgrades by default. If draining is enabled in the cluster configuration, RKE will both cordon and drain the node before it is upgraded.

To enable draining each node during a cluster upgrade,

1. Go to the cluster view in the Rancher UI.
1. Click **&#8942; > Edit.**
1. In the **Advanced Options** section, go to the **Drain nodes** field and click **Yes.**
1. Choose a safe or aggressive drain option. For more information about each option, refer to [this section.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/nodes/#aggressive-and-safe-draining-options)
1. Optionally, configure a grace period. The grace period is the timeout given to each pod for cleaning things up, so they will have chance to exit gracefully. Pods might need to finish any outstanding requests, roll back transactions or save state to some external storage. If this value is negative, the default value specified in the pod will be used.
1. Optionally, configure a timeout, which is the amount of time the drain should continue to wait before giving up.
1. Click **Save.**

**Result:** The cluster is updated to use the new upgrade strategy.

> **Note:** As of Rancher v2.4.0, there is a [known issue](https://github.com/rancher/rancher/issues/25478) in which the Rancher UI doesn't show state of etcd and controlplane as drained, even though they are being drained.

### Maintaining Availability for Applications During Upgrades

_Available as of RKE v1.1.0_

In [this section of the RKE documentation,]({{<baseurl>}}/rke/latest/en/upgrades/maintaining-availability/) you'll learn the requirements to prevent downtime for your applications when upgrading the cluster.

### Configuring the Upgrade Strategy in the cluster.yml

More advanced upgrade strategy configuration options are available by editing the `cluster.yml`.

For details, refer to [Configuring the Upgrade Strategy]({{<baseurl>}}/rke/latest/en/upgrades/configuring-strategy) in the RKE documentation. The section also includes an example `cluster.yml` for configuring the upgrade strategy.

# Troubleshooting

If a node doesn't come up after an upgrade, the `rke up` command errors out.

No upgrade will proceed if the number of unavailable nodes exceeds the configured maximum.

If an upgrade stops, you may need to fix an unavailable node or remove it from the cluster before the upgrade can continue.

A failed node could be in many different states:

- Powered off
- Unavailable
- User drains a node while upgrade is in process, so there are no kubelets on the node
- The upgrade itself failed

If the max unavailable number of nodes is reached during an upgrade, Rancher user clusters will be stuck in updating state and not move forward with upgrading any other control plane nodes. It will continue to evaluate the set of unavailable nodes in case one of the nodes becomes available. If the node cannot be fixed, you must remove the node in order to continue the upgrade.
