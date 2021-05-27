---
title: Longhorn - Cloud native distributed block storage for Kubernetes
shortTitle: Longhorn Storage
weight: 19
---

[Longhorn](https://longhorn.io/) is a lightweight, reliable and easy-to-use distributed block storage system for Kubernetes.

Longhorn is free, open source software. Originally developed by Rancher Labs, it is now being developed as a sandbox project of the Cloud Native Computing Foundation. It can be installed on any Kubernetes cluster with Helm, with kubectl, or with the Rancher UI. You can learn more about its architecture [here.](https://longhorn.io/docs/1.0.2/concepts/)

With Longhorn, you can:

- Use Longhorn volumes as persistent storage for the distributed stateful applications in your Kubernetes cluster
- Partition your block storage into Longhorn volumes so that you can use Kubernetes volumes with or without a cloud provider
- Replicate block storage across multiple nodes and data centers to increase availability
- Store backup data in external storage such as NFS or AWS S3
- Create cross-cluster disaster recovery volumes so that data from a primary Kubernetes cluster can be quickly recovered from backup in a second Kubernetes cluster
- Schedule recurring snapshots of a volume, and schedule recurring backups to NFS or S3-compatible secondary storage
- Restore volumes from backup
- Upgrade Longhorn without disrupting persistent volumes

<figcaption>Longhorn Dashboard</figcaption>
![Longhorn Dashboard]({{<baseurl>}}/img/rancher/longhorn-screenshot.png)

### New in Rancher v2.5

Before Rancher v2.5, Longhorn could be installed as a Rancher catalog app. In Rancher v2.5, the catalog system was replaced by the **Apps & Marketplace,** and it became possible to install Longhorn as an app from that page.

The **Cluster Explorer** now allows you to manipulate Longhorn's Kubernetes resources from the Rancher UI. So now you can control the Longhorn functionality with the Longhorn UI, or with kubectl, or by manipulating Longhorn's Kubernetes custom resources in the Rancher UI.

These instructions assume you are using Rancher v2.5, but Longhorn can be installed with earlier Rancher versions. For documentation about installing Longhorn as a catalog app using the legacy Rancher UI, refer to the [Longhorn documentation.](https://longhorn.io/docs/1.0.2/deploy/install/install-with-rancher/)

### Installing Longhorn with Rancher

1. Fulfill all [Installation Requirements.](https://longhorn.io/docs/1.1.0/deploy/install/#installation-requirements)
1. Go to the **Cluster Explorer** in the Rancher UI.
1. Click **Apps.**
1. Click `longhorn`.
1. Optional: To customize the initial settings, click **Longhorn Default Settings** and edit the configuration. For help customizing the settings, refer to the [Longhorn documentation.](https://longhorn.io/docs/1.0.2/references/settings/)
1. Click **Install.**

**Result:** Longhorn is deployed in the Kubernetes cluster.

### Accessing Longhorn from the Rancher UI

1. From the **Cluster Explorer," go to the top left dropdown menu and click **Cluster Explorer > Longhorn.**
1. On this page, you can edit Kubernetes resources managed by Longhorn. To view the Longhorn UI, click the **Longhorn** button in the **Overview** section.

**Result:** You will be taken to the Longhorn UI, where you can manage your Longhorn volumes and their replicas in the Kubernetes cluster, as well as secondary backups of your Longhorn storage that may exist in another Kubernetes cluster or in S3.

### Uninstalling Longhorn from the Rancher UI

1. Click **Cluster Explorer > Apps & Marketplace.**
1. Click **Installed Apps.**
1. Go to the `longhorn-system` namespace and check the boxes next to the `longhorn` and `longhorn-crd` apps.
1. Click **Delete,** and confirm **Delete.**

**Result:** Longhorn is uninstalled.

### GitHub Repository

The Longhorn project is available [here.](https://github.com/longhorn/longhorn)

### Documentation

The Longhorn documentation is [here.](https://longhorn.io/docs/)

### Architecture

Longhorn creates a dedicated storage controller for each volume and synchronously replicates the volume across multiple replicas stored on multiple nodes.

The storage controller and replicas are themselves orchestrated using Kubernetes.

You can learn more about its architecture [here.](https://longhorn.io/docs/1.0.2/concepts/)

<figcaption>Longhorn Architecture</figcaption>
![Longhorn Architecture]({{<baseurl>}}/img/rancher/longhorn-architecture.svg)
