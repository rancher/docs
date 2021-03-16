---
title: Backups and Disaster Recovery
weight: 5
aliases:
  - /rancher/v2.5/en/backups/v2.5
---

In this section, you'll learn how to create backups of Rancher, how to restore Rancher from backup, and how to migrate Rancher to a new Kubernetes cluster. 

As of Rancher v2.5, the `rancher-backup` operator is used to backup and restore Rancher. The `rancher-backup` Helm chart is [here.](https://github.com/rancher/charts/tree/main/charts/rancher-backup)

The backup-restore operator needs to be installed in the local cluster, and only backs up the Rancher app. The backup and restore operations are performed only in the local Kubernetes cluster.

- [Changes in Rancher v2.5](#changes-in-rancher-v2-5)
  - [Backup and Restore for Rancher v2.5 installed with Docker](#backup-and-restore-for-rancher-v2-5-installed-with-docker)
- [How Backups and Restores Work](#how-backups-and-restores-work)
- [Installing the rancher-backup Operator](#installing-the-rancher-backup-operator)
  - [Installing rancher-backup with the Rancher UI](#installing-rancher-backup-with-the-rancher-ui)
  - [Installing rancher-backup with the Helm CLI](#installing-rancher-backup-with-the-helm-cli)
  - [RBAC](#rbac)
- [Backing up Rancher](#backing-up-rancher)
- [Restoring Rancher](#restoring-rancher)
- [Migrating Rancher to a New Cluster](#migrating-rancher-to-a-new-cluster)
- [Default Storage Location Configuration](#default-storage-location-configuration)
  - [Example values.yaml for the rancher-backup Helm Chart](#example-values-yaml-for-the-rancher-backup-helm-chart)

# Changes in Rancher v2.5

The new `rancher-backup` operator allows Rancher to be backed up and restored on any Kubernetes cluster. This application is a Helm chart, and it can be deployed through the Rancher **Apps & Marketplace** page, or by using the Helm CLI.

Previously, the way that cluster data was backed up depended on the type of Kubernetes cluster that was used. 

In Rancher v2.4, it was only supported to install Rancher on two types of Kubernetes clusters: an RKE cluster, or a K3s cluster with an external database. If Rancher was installed on an RKE cluster, RKE would be used to take a snapshot of the etcd database and restore the cluster. If Rancher was installed on a K3s cluster with an external database, the database would need to be backed up and restored using the upstream documentation for the database.

In Rancher v2.5, it is now supported to install Rancher hosted Kubernetes clusters, such as Amazon EKS clusters, which do not expose etcd to a degree that would allow snapshots to be created by an external tool. etcd doesn't need to be exposed for `rancher-backup` to work, because the operator gathers resources by making calls to `kube-apiserver`.

### Backup and Restore for Rancher v2.5 installed with Docker

For Rancher installed with Docker, refer to the same steps used up till 2.5 for [backups](./docker-installs/docker-backups) and [restores.](./docker-installs/docker-restores)

# How Backups and Restores Work

The `rancher-backup` operator introduces three custom resources: Backups, Restores, and ResourceSets. The following cluster-scoped custom resource definitions are added to the cluster:

- `backups.resources.cattle.io`
- `resourcesets.resources.cattle.io`
- `restores.resources.cattle.io`

The ResourceSet defines which Kubernetes resources need to be backed up. The ResourceSet is not available to be configured in the Rancher UI because the values required to back up Rancher are predefined. This ResourceSet should not be modified.

When a Backup custom resource is created, the `rancher-backup` operator calls the `kube-apiserver` to get the resources in the ResourceSet (specifically, the predefined `rancher-resource-set`) that the Backup custom resource refers to.

The operator then creates the backup file in the .tar.gz format and stores it in the location configured in the Backup resource.

When a Restore custom resource is created, the operator accesses the backup .tar.gz file specified by the Restore, and restores the application from that file.

The Backup and Restore custom resources can be created in the Rancher UI, or by using `kubectl apply`.

# Installing the rancher-backup Operator

The `rancher-backup` operator can be installed from the Rancher UI, or with the Helm CLI. In both cases, the `rancher-backup` Helm chart is installed on the Kubernetes cluster running the Rancher server. It is a cluster-admin only feature and available only for the **local** cluster.  (*If you do not see `rancher-backup` in the Rancher UI, you may have selected the wrong cluster.*)

### Installing rancher-backup with the Rancher UI

1. In the Rancher UI's Cluster Manager, choose the cluster named **local**
1. On the upper-right click on the **Cluster Explorer.**
1. Click **Apps.**
1. Click the `rancher-backup` operator.
1. Optional: Configure the default storage location. For help, refer to the [configuration section.](./configuration/storage-config)

**Result:** The `rancher-backup` operator is installed.

From the **Cluster Explorer,** you can see the `rancher-backup` operator listed under **Deployments.**

To configure the backup app in Rancher, click **Cluster Explorer** in the upper left corner and click **Rancher Backups.**

### Installing rancher-backup with the Helm CLI

Install the backup app as a Helm chart:

```
helm repo add rancher-charts https://charts.rancher.io
helm repo update
helm install rancher-backup-crd rancher-charts/rancher-backup-crd -n cattle-resources-system --create-namespace
helm install rancher-backup rancher-charts/rancher-backup -n cattle-resources-system
```

### RBAC

Only the rancher admins and the local cluster’s cluster-owner can:

* Install the Chart
* See the navigation links for Backup and Restore CRDs
* Perform a backup or restore by creating a Backup CR and Restore CR respectively
* List backups/restores performed so far

# Backing up Rancher

A backup is performed by creating a Backup custom resource. For a tutorial, refer to [this page.](./back-up-rancher)

# Restoring Rancher

A restore is performed by creating a Restore custom resource. For a tutorial, refer to [this page.](./restoring-rancher)

# Migrating Rancher to a New Cluster

A migration is performed by following [these steps.]({{<baseurl>}}/rancher/v2.5/en/backups/migrating-rancher)

# Default Storage Location Configuration

Configure a storage location where all backups are saved by default. You will have the option to override this with each backup, but will be limited to using an S3-compatible or Minio object store.

For information on configuring these options, refer to [this page.](./configuration/storage-config)

### Example values.yaml for the rancher-backup Helm Chart

The example [values.yaml file](./configuration/storage-config/#example-values-yaml-for-the-rancher-backup-helm-chart) can be used to configure the `rancher-backup` operator when the Helm CLI is used to install it.
