---
title: Setting up Existing Storage
weight: 1
---

This section describes how to set up existing persistent storage for workloads in Rancher.

> This section assumes that you understand the Kubernetes concepts of persistent volumes and persistent volume claims. For more information, refer to the section on [how storage works.](../how-storage-works)

To set up storage, follow these steps:

1. [Set up persistent storage.](#1-set-up-persistent-storage)
2. [Add a PersistentVolume that refers to the persistent storage.](#2-add-a-persistentvolume-that-refers-to-the-persistent-storage)
3. [Use the PersistentVolume for Pods Deployed with a StatefulSet.](#3-use-the-persistentvolume-for-pods-deployed-with-a-statefulset)

### Prerequisites

- To create a persistent volume as a Kubernetes resource, you must have the `Manage Volumes` [role.]({{<baseurl>}}/rancher/v2.6/en/admin-settings/rbac/cluster-project-roles/#project-role-reference)
- If you are provisioning storage for a cluster hosted in the cloud, the storage and cluster hosts must have the same cloud provider.

### 1. Set up persistent storage

Creating a persistent volume in Rancher will not create a storage volume. It only creates a Kubernetes resource that maps to an existing volume. Therefore, before you can create a persistent volume as a Kubernetes resource, you must have storage provisioned.

The steps to set up a persistent storage device will differ based on your infrastructure. We provide examples of how to set up storage using [vSphere,](../examples/vsphere) [NFS,](../examples/nfs) or Amazon's [EBS.](../examples/ebs) 

If you have a pool of block storage, and you don't want to use a cloud provider, Longhorn could help you provide persistent storage to your Kubernetes cluster. For more information, see [this page.]({{<baseurl>}}/rancher/v2.6/en/longhorn)

### 2. Add a PersistentVolume that refers to the persistent storage

These steps describe how to set up a PersistentVolume at the cluster level in Kubernetes.

1. Click **☰ > Cluster Management**.
1. Go to the cluster where you want to add a persistent volume and click **Explore**.
1. In the left navigation bar, click **Storage > Persistent Volumes**.
1. Click **Create**.
1. Enter a **Name** for the persistent volume.
1. Select the **Volume Plugin** for the disk type or service that you're using. When adding storage to a cluster that's hosted by a cloud provider, use the cloud provider's plug-in for cloud storage. For example, if you have a Amazon EC2 cluster and you want to use cloud storage for it, you must use the `Amazon EBS Disk` volume plugin.
1. Enter the **Capacity** of your volume in gigabytes.
1. Complete the **Plugin Configuration** form. Each plugin type requires information specific to the vendor of disk type. For help regarding each plugin's form and the information that's required, refer to the plug-in's vendor documentation.
1. Optional: In the **Customize** form, configure the [access modes.](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) This options sets how many nodes can access the volume, along with the node read/write permissions. The [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) includes a table that lists which access modes are supported by the plugins available.
1. Optional: In the **Customize** form, configure the [mount options.](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options) Each volume plugin allows you to specify additional command line options during the mounting process. Consult each plugin's vendor documentation for the mount options available.
1. Click **Create**.

**Result:** Your new persistent volume is created.


### 3. Use the Storage Class for Pods Deployed with a StatefulSet

StatefulSets manage the deployment and scaling of Pods while maintaining a sticky identity for each Pod. In this StatefulSet, we will configure a VolumeClaimTemplate. Each Pod managed by the StatefulSet will be deployed with a PersistentVolumeClaim based on this VolumeClaimTemplate. The PersistentVolumeClaim will refer to the PersistentVolume that we created. Therefore, when each Pod managed by the StatefulSet is deployed, it will be bound a PersistentVolume as defined in its PersistentVolumeClaim.

You can configure storage for the StatefulSet during or after workload creation.

The following steps describe how to assign existing storage to a new StatefulSet:

1. Click **☰ > Cluster Management**.
1. Go to the cluster where you want to configure storage for the StatefulSet and click **Explore**.
1. In the left navigation bar, click **Workload > StatefulSets**.
1. Click **Create**.
1. Choose the namespace where the workload will be deployed.
1. Enter a name for the StatefulSet.
1. On the **Volume Claim Templates** tab, click **Add Claim Template**.
1. Click **Use an existing Persistent Volume**.
1. In the Persistent Volumes field, select the Persistent Volume that you created.
1. In the **Mount Point** field, enter the path that the workload will use to access the volume.
1. Click **Launch**.

**Result:** When the workload is deployed, it will make a request for the specified amount of disk space to the Kubernetes master. If a PV with the specified resources is available when the workload is deployed, the Kubernetes master will bind the PV to the PVC.

The following steps describe how to assign persistent storage to an existing workload:

1. Click **☰ > Cluster Management**.
1. Go to the cluster where you want to configure storage for the StatefulSet and click **Explore**.
1. In the left navigation bar, click **Workload > StatefulSets**.
1. Go to the workload that you want to add the persistent storage to. Click **⋮ > Edit**.
1. On the **Volume Claim Templates** tab, click **Add Claim Template**.
1. Click **Use an existing Persistent Volume**.
1. In the Persistent Volumes field, select the Persistent Volume that you created.
1. In the **Mount Point** field, enter the path that the workload will use to access the volume.
1. Click **Launch**.

**Result:** The workload will make a request for the specified amount of disk space to the Kubernetes master. If a PV with the specified resources is available when the workload is deployed, the Kubernetes master will bind the PV to the PVC.