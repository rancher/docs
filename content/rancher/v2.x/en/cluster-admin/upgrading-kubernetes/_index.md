---
title: Upgrading Kubernetes
weight: 70
---

> **Prerequisite:** The options below are available only for clusters that are [launched using RKE.]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) 

Following an upgrade to the latest version of Rancher, you can update your existing clusters to use the latest supported version of Kubernetes.

Before a new version of Rancher is released, it's tested with the latest minor versions of Kubernetes to ensure compatibility. For example, Rancher v2.3.0 is was tested with Kubernetes v1.15.4, v1.14.7, and v1.13.11. For details on which versions of Kubernetes were tested on each Rancher version, refer to the [support maintenance terms.](https://rancher.com/support-maintenance-terms/all-supported-versions/rancher-v2.3.0/)

As of Rancher v2.3.0, the Kubernetes metadata feature was added, which allows Rancher to ship Kubernetes patch versions without upgrading Rancher. For details, refer to the [section on Kubernetes metadata.]({{<baseurl>}}/rancher/v2.x/en/admin-settings/k8s-metadata)

>**Recommended:** Before upgrading Kubernetes, [backup your cluster]({{< baseurl >}}/rancher/v2.x/en/backups).

1. From the **Global** view, find the cluster for which you want to upgrade Kubernetes. Select **Vertical Ellipsis (...) > Edit**.

1. Expand **Cluster Options**.

1. From the **Kubernetes Version** drop-down, choose the version of Kubernetes that you want to use for the cluster.

1. Click **Save**.

**Result:** Kubernetes begins upgrading for the cluster. During the upgrade, your cluster is unavailable.