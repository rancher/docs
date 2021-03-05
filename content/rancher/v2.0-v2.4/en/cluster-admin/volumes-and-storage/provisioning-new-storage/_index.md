---
title: Dynamically Provisioning New Storage in Rancher
weight: 2
---

This section describes how to provision new persistent storage for workloads in Rancher.

This section assumes that you understand the Kubernetes concepts of storage classes and persistent volume claims. For more information, refer to the section on [how storage works.](../how-storage-works)

New storage is often provisioned by a cloud provider such as Amazon EBS. However, new storage doesn't have to be in the cloud.

If you have a pool of block storage, and you don't want to use a cloud provider, Longhorn could help you provide persistent storage to your Kubernetes cluster.

To provision new storage for your workloads, follow these steps:

1. [Add a storage class and configure it to use your storage.](#1-add-a-storage-class-and-configure-it-to-use-your-storage)
2. [Add a persistent volume claim that refers to the storage class.](#2-add-a-persistent-volume-claim-that-refers-to-the-storage-class)
3. [Mount the persistent volume claim as a volume for your workload.](#3-mount-the-persistent-volume-claim-as-a-volume-for-your-workload)

### Prerequisites

- To set up persistent storage, the `Manage Volumes` [role]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/#project-role-reference) is required.
- If you are provisioning storage for a cluster hosted in the cloud, the storage and cluster hosts must have the same cloud provider.
- The cloud provider must be enabled. For details on enabling cloud providers, refer to [this page.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/options/cloud-providers/)
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

To use a storage provisioner that is not on the above list, you will need to use a [feature flag to enable unsupported storage drivers.]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/feature-flags/enable-not-default-storage-drivers/)

### 1. Add a storage class and configure it to use your storage

These steps describe how to set up a storage class at the cluster level.

1. Go to the cluster for which you want to dynamically provision persistent storage volumes.

1. From the cluster view, select `Storage > Storage Classes`. Click `Add Class`.

1. Enter a `Name` for your storage class.

1. From the `Provisioner` drop-down, select the service that you want to use to dynamically provision storage volumes. For example, if you have a Amazon EC2 cluster and you want to use cloud storage for it, use the `Amazon EBS Disk` provisioner.

1. From the `Parameters` section, fill out the information required for the service to dynamically provision storage volumes. Each provisioner requires different information to dynamically provision storage volumes. Consult the service's documentation for help on how to obtain this information.

1. Click `Save`.

**Result:** The storage class is available to be consumed by a PVC.

For full information about the storage class parameters, refer to the official [Kubernetes documentation.](https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters).

### 2. Add a persistent volume claim that refers to the storage class

These steps describe how to set up a PVC in the namespace where your stateful workload will be deployed.

1. Go to the project containing a workload that you want to add a PVC to.

1. From the main navigation bar, choose **Resources > Workloads.** (In versions before v2.3.0, choose **Workloads** on the main navigation bar.) Then select the **Volumes** tab. Click **Add Volume**.

1. Enter a **Name** for the volume claim.

1. Select the namespace of the volume claim.

1. In the **Source** field, click **Use a Storage Class to provision a new persistent volume.**

1. Go to the **Storage Class** drop-down and select the storage class that you created.

1. Enter a volume **Capacity**.

1. Optional: Expand the **Customize** section and select the [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) that you want to use.

1. Click **Create.**

**Result:** Your PVC is created. You can now attach it to any workload in the project.

### 3. Mount the persistent volume claim as a volume for your workload

Mount PVCs to workloads so that your applications can store their data.

You can mount PVCs during the deployment of a workload, or following workload creation.

To attach the PVC to a new workload,

1. Create a workload as you would in [Deploying Workloads]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads/).
1. For **Workload Type**, select **Stateful set of 1 pod**.
1. Expand the **Volumes** section and click **Add Volume > Add a New Persistent Volume (Claim).**
1. In the **Persistent Volume Claim** section, select the newly created persistent volume claim that is attached to the storage class.
1. In the **Mount Point** field, enter the path that the workload will use to access the volume.
1. Click **Launch.**

**Result:** When the workload is deployed, it will make a request for the specified amount of disk space to the Kubernetes master. If a PV with the specified resources is available when the workload is deployed, the Kubernetes master will bind the PV to the PVC.

To attach the PVC to an existing workload,

1. Go to the project that has the workload that will have the PVC attached.
1. Go to the workload that will have persistent storage and click **&#8942; > Edit.**
1. Expand the **Volumes** section and click **Add Volume > Add a New Persistent Volume (Claim).**
1. In the **Persistent Volume Claim** section, select the newly created persistent volume claim that is attached to the storage class.
1. In the **Mount Point** field, enter the path that the workload will use to access the volume.
1. Click **Save.**

**Result:** The workload will make a request for the specified amount of disk space to the Kubernetes master. If a PV with the specified resources is available when the workload is deployed, the Kubernetes master will bind the PV to the PVC. If not, Rancher will provision new persistent storage.