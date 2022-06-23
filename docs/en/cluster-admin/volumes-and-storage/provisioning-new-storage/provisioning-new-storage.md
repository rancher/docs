---
title: Dynamically Provisioning New Storage in Rancher
weight: 2
---

This section describes how to provision new persistent storage for workloads in Rancher.

This section assumes that you understand the Kubernetes concepts of storage classes and persistent volume claims. For more information, refer to the section on [how storage works.](../how-storage-works)

New storage is often provisioned by a cloud provider such as Amazon EBS. However, new storage doesn't have to be in the cloud.

If you have a pool of block storage, and you don't want to use a cloud provider, Longhorn could help you provide persistent storage to your Kubernetes cluster. For more information, see [this page.]({{<baseurl>}}/rancher/v2.6/en/longhorn)

To provision new storage for your workloads, follow these steps:

1. [Add a storage class and configure it to use your storage.](#1-add-a-storage-class-and-configure-it-to-use-your-storage)
2. [Use the Storage Class for Pods Deployed with a StatefulSet.](#2-use-the-storage-class-for-pods-deployed-with-a-statefulset)

### Prerequisites

- To set up persistent storage, the `Manage Volumes` [role]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/cluster-project-roles/#project-role-reference) is required.
- If you are provisioning storage for a cluster hosted in the cloud, the storage and cluster hosts must have the same cloud provider.
- The cloud provider must be enabled. For details on enabling cloud providers, refer to [this page.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/cloud-providers/)
- Make sure your storage provisioner is available to be enabled.

The following storage provisioners are enabled by default:

Name | Plugin
--------|----------
Amazon EBS Disk | `aws-ebs`
AzureFile | `azure-file`
AzureDisk | `azure-disk`
Google Persistent Disk | `gce-pd`
Longhorn | `flex-volume-longhorn`
VMware vSphere Volume |  `vsphere-volume`
Local | `local`
Network File System | `nfs`
hostPath | `host-path`

To use a storage provisioner that is not on the above list, you will need to use a [feature flag to enable unsupported storage drivers.]({{<baseurl>}}/rancher/v2.6/en/installation/resources/feature-flags/enable-not-default-storage-drivers/)

### 1. Add a storage class and configure it to use your storage

These steps describe how to set up a storage class at the cluster level.

1. Click **☰ > Cluster Management**.
1. Go to the cluster where you want to dynamically provision persistent storage volumes and click **Explore**.
1. Click **Storage > Storage Classes**.
1. Click **Create**.
1. Enter a name for your storage class.
1. From the **Provisioner** drop-down, select the service that you want to use to dynamically provision storage volumes. For example, if you have a Amazon EC2 cluster and you want to use cloud storage for it, use the `Amazon EBS Disk` provisioner.
1. In the **Parameters** tab, fill out the information required for the service to dynamically provision storage volumes. Each provisioner requires different information to dynamically provision storage volumes. Consult the service's documentation for help on how to obtain this information.
1. Click **Create**.

**Result:** The storage class is available to be consumed by a PVC.

For full information about the storage class parameters, refer to the official [Kubernetes documentation.](https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters).

### 2. Use the Storage Class for Pods Deployed with a StatefulSet

StatefulSets manage the deployment and scaling of Pods while maintaining a sticky identity for each Pod. In this StatefulSet, we will configure a VolumeClaimTemplate. Each Pod managed by the StatefulSet will be deployed with a PersistentVolumeClaim based on this VolumeClaimTemplate. The PersistentVolumeClaim will refer to the StorageClass that we created. Therefore, when each Pod managed by the StatefulSet is deployed, it will be bound to dynamically provisioned storage using the StorageClass defined in its PersistentVolumeClaim.

1. Click **☰ > Cluster Management**.
1. Go to the cluster where you want to add use the StorageClass for a workload and click **Explore**.
1. In the left navigation bar, click **Workload**.
1. Click **Create**.
1. Click **StatefulSet**.
1. In the **Volume Claim Templates** tab, click **Add Claim Template**.
1. Enter a name for the persistent volume.
1. In the **StorageClass* field, select the StorageClass that will dynamically provision storage for pods managed by this StatefulSet.
1. In the **Mount Point** field, enter the path that the workload will use to access the volume.
1. Click **Launch**.

**Result:** When each Pod managed by the StatefulSet is deployed, it will make a request for the specified amount of disk space to the Kubernetes master. If a PV with the specified resources is available when the workload is deployed, the Kubernetes master will bind the PV to Pod with a compatible PVC.

To attach the PVC to an existing workload,

1. Click **☰ > Cluster Management**.
1. Go to the cluster where you want to add use the StorageClass for a workload and click **Explore**.
1. In the left navigation bar, click **Workload**.
1. Go to the workload that will use storage provisioned with the StorageClass that you cared at click **⋮ > Edit Config**.
1. In the **Volume Claim Templates** section, click **Add Claim Template**.
1. Enter a persistent volume name.
1. In the **StorageClass* field, select the StorageClass that will dynamically provision storage for pods managed by this StatefulSet.
1. In the **Mount Point** field, enter the path that the workload will use to access the volume.
1. Click **Save**.

**Result:** The workload will make a request for the specified amount of disk space to the Kubernetes master. If a PV with the specified resources is available when the workload is deployed, the Kubernetes master will bind the PV to the PVC. If not, Rancher will provision new persistent storage.