---
title: Upgrading and Rolling Back Kubernetes
weight: 70
---

Following an upgrade to the latest version of Rancher, you can update your existing clusters to use the latest supported version of Kubernetes.

Before a new version of Rancher is released, it's tested with the latest minor versions of Kubernetes to ensure compatibility. For example, Rancher v2.3.0 is was tested with Kubernetes v1.15.4, v1.14.7, and v1.13.11. For details on which versions of Kubernetes were tested on each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/all-supported-versions/rancher-v2.3.0/)

As of Rancher v2.3.0, the Kubernetes metadata feature was added, which allows Rancher to ship Kubernetes patch versions without upgrading Rancher. For details, refer to the [section on Kubernetes metadata.]({{<baseurl>}}/rancher/v2.x/en/admin-settings/k8s-metadata)

As of Rancher v2.4.0, the ability to import K3s Kubernetes clusters into Rancher was added, along with the ability to upgrade Kubernetes when editing those clusters.

### Zero-downtime Upgrades

_Available as of v2.4_

It is now possible to upgrade or edit an RKE Kubernetes cluster without downtime for your applications.

A zero-downtime upgrade is one in which your workloads are available on at least a single node, and all critical addon services, such as Ingress and DNS, are available during the upgrade.

For details, refer to [this section.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/zero-downtime)

### Recommended Best Practice for Upgrades

{{% tabs %}}
{{% tab "Rancher v2.4+" %}}
When upgrading the Kubernetes version of a cluster, we recommend that you:

1. Take a snapshot.
1. Initiate a Kubernetes upgrade.
1. If the upgrade fails, revert the Kubernetes upgrade to the pre-upgrade version. Before restoring the cluster from the snapshot in the etcd datastore, the cluster should be running the pre-upgrade Kubernetes version.
1. Restore the cluster from the etcd snapshot.

The restore operation will work on a cluster that is not in a healthy or active state.
{{% /tab %}}
{{% tab "Rancher prior to v2.4" %}}
When upgrading the Kubernetes version of a cluster, we recommend that you:

1. Take a snapshot.
1. Initiate a Kubernetes upgrade.
1. If the upgrade fails, restore the cluster from the etcd snapshot.

> The cluster cannot be downgraded to a previous Kubernetes version.
{{% /tab %}}
{{% /tabs %}}

### Upgrading Kubernetes

> **Prerequisites:**
>
> The options below are available only for [Rancher-launched RKE Kubernetes clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) and [imported K3s Kubernetes clusters.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/imported-clusters/#additional-features-for-imported-k3s-clusters)
>
> Before upgrading Kubernetes, [back up your cluster]({{<baseurl>}}/rancher/v2.x/en/backups).

1. From the **Global** view, find the cluster for which you want to upgrade Kubernetes. Select **Vertical Ellipsis (...) > Edit**.

1. Expand **Cluster Options**.

1. From the **Kubernetes Version** drop-down, choose the version of Kubernetes that you want to use for the cluster.

1. Click **Save**.

**Result:** Kubernetes begins upgrading for the cluster.

### Rolling Back Kubernetes

_Available as of v2.4_

A cluster can be restored to a backup in which the previous Kubernetes version was used.