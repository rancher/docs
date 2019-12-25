---
title: Detaching Rancher from Downstream Clusters
weight: 7502
---

This section describes the options for disconnecting a downstream cluster from Rancher while still being able to use the cluster. For imported clusters, this result is achieved by deleting the cluster from the Rancher UI. For other types of clusters, we recommend using a third-party service to back up your Kubernetes applications, because the Rancher UI does not allow them to be deleted without also uninstalling Kubernetes from the cluster.

# Imported Clusters

If you use the Rancher UI to delete an imported cluster, the cluster is detached from Rancher, but not destroyed. You should still be able to use the cluster.

# Non-imported Clusters

For other types of clusters, if you use the Rancher UI to delete the cluster, Rancher uninstalls Kubernetes from the cluster and cleans the nodes so that they can be used for other purposes.

For clusters created in a hosted Kubernetes provider, such as EKS, GKE, or AKS, the ability to detach the cluster from Rancher without removing Kubernetes is a feature that will be added to Rancher in a future update.

For clusters in which Kubernetes was launched by Rancher, such as custom clusters, or clusters created in an infrastructure provider, it is not possible to detach the cluster from Rancher in a way that still allows you to use the cluster, and we don't plan to add that capability to Rancher. However, some third-party software solutions exist to help you backup and restore your cluster, such as Velero/Restic and Stashed.

If you need to detach non-imported clusters from Rancher while still being able to use the cluster, we recommend backing up the cluster, deleting it in Rancher, then restoring it from backup.

# Backing up Kubernetes Applications with Restic and Velero

Velero has support for backing up and restoring Kubernetes volumes using a free open-source backup tool called restic. This support is considered beta quality. Please see the list of limitations to understand if it currently fits your use case.

# Backing up Kubernetes Applications with Stash

Stash by AppsCode is a Kubernetes operator for restic. If you are running production workloads in Kubernetes, you might want to take backup of your disks. Traditional tools are too complex to setup and maintain in a dynamic compute environment like Kubernetes. restic is a backup program that is fast, efficient and secure with few moving parts. Stash is a CRD controller for Kubernetes built around restic to address these issues. Using Stash, you can backup Kubernetes volumes mounted in following types of workloads:

- Deployment
- DaemonSet
- ReplicaSet
- ReplicationController
- StatefulSet