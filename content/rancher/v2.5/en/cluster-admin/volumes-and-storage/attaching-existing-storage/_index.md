---
title: Setting up Existing Storage
weight: 1
aliases:
  - /rancher/v2.5/en/k8s-in-rancher/volumes-and-storage/persistent-volume-claims/
---

This section describes how to set up existing persistent storage for workloads in Rancher.

> This section assumes that you understand the Kubernetes concepts of persistent volumes and persistent volume claims. For more information, refer to the section on [how storage works.](../how-storage-works)

To set up storage, follow these steps:

1. [Set up persistent storage.](#1-set-up-persistent-storage)
2. [Add a persistent volume that refers to the persistent storage.](#2-add-a-persistent-volume-that-refers-to-the-persistent-storage)
3. [Add a persistent volume claim that refers to the persistent volume.](#3-add-a-persistent-volume-claim-that-refers-to-the-persistent-volume)
4. [Mount the persistent volume claim as a volume in your workload.](#4-mount-the-persistent-volume-claim-as-a-volume-in-your-workload)

### Prerequisites

- To create a persistent volume as a Kubernetes resource, you must have the `Manage Volumes` [role.]({{<baseurl>}}/rancher/v2.5/en/admin-settings/rbac/cluster-project-roles/#project-role-reference)
- If you are provisioning storage for a cluster hosted in the cloud, the storage and cluster hosts must have the same cloud provider.

### 1. Set up persistent storage

Creating a persistent volume in Rancher will not create a storage volume. It only creates a Kubernetes resource that maps to an existing volume. Therefore, before you can create a persistent volume as a Kubernetes resource, you must have storage provisioned.

The steps to set up a persistent storage device will differ based on your infrastructure. We provide examples of how to set up storage using [vSphere,](../examples/vsphere) [NFS,](../examples/nfs) or Amazon's [EBS.](../examples/ebs) 

If you have a pool of block storage, and you don't want to use a cloud provider, Longhorn could help you provide persistent storage to your Kubernetes cluster. For more information, see [this page.]({{<baseurl>}}/rancher/v2.5/en/longhorn)

### 2. Add a persistent volume that refers to the persistent storage

These steps describe how to set up a persistent volume at the cluster level in Kubernetes.

1. From the cluster view, select **Storage > Persistent Volumes**.

1. Click **Add Volume**.

1. Enter a **Name** for the persistent volume.

1. Select the **Volume Plugin** for the disk type or service that you're using. When adding storage to a cluster that's hosted by a cloud provider, use the cloud provider's plug-in for cloud storage. For example, if you have a Amazon EC2 cluster and you want to use cloud storage for it, you must use the `Amazon EBS Disk` volume plugin.

1. Enter the **Capacity** of your volume in gigabytes.

1. Complete the **Plugin Configuration** form. Each plugin type requires information specific to the vendor of disk type. For help regarding each plugin's form and the information that's required, refer to the plug-in's vendor documentation.

1. Optional: In the **Customize** form, configure the [access modes.](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) This options sets how many nodes can access the volume, along with the node read/write permissions. The [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) includes a table that lists which access modes are supported by the plugins available.

1. Optional: In the **Customize** form, configure the [mount options.](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options) Each volume plugin allows you to specify additional command line options during the mounting process. Consult each plugin's vendor documentation for the mount options available.

1. Click **Save**.

**Result:** Your new persistent volume is created.

### 3. Add a persistent volume claim that refers to the persistent volume

These steps describe how to set up a PVC in the namespace where your stateful workload will be deployed.

1. Go to the project containing a workload that you want to add a persistent volume claim to.

1. Then click the **Volumes** tab and click **Add Volume**.

1. Enter a **Name** for the volume claim.

1. Select the namespace of the workload that you want to add the persistent storage to.

1. In the section called **Use an existing persistent volume,** go to the **Persistent Volume** drop-down and choose the persistent volume that you created.

1. **Optional:** From **Customize**, select the [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) that you want to use.

1. Click **Create.**

**Result:** Your PVC is created. You can now attach it to any workload in the project.

### 4. Mount the persistent volume claim as a volume in your workload

Mount PVCs to stateful workloads so that your applications can store their data.

You can mount PVCs during the deployment of a workload, or following workload creation.

The following steps describe how to assign existing storage to a new workload that is a stateful set:

1. From the **Project** view, go to the **Workloads** tab.
1. Click **Deploy.**
1. Enter a name for the workload.
1. Next to the **Workload Type** field, click **More Options.**
1. Click **Stateful set of 1 pod.** Optionally, configure the number of pods.
1. Choose the namespace where the workload will be deployed.
1. Expand the **Volumes** section and click **Add Volume > Use an existing persistent volume (claim).**.
1. In the **Persistent Volume Claim** field, select the PVC that you created.
1. In the **Mount Point** field, enter the path that the workload will use to access the volume.
1. Click **Launch.**

**Result:** When the workload is deployed, it will make a request for the specified amount of disk space to the Kubernetes master. If a PV with the specified resources is available when the workload is deployed, the Kubernetes master will bind the PV to the PVC.

The following steps describe how to assign persistent storage to an existing workload:

1. From the **Project** view, go to the **Workloads** tab.
1. Go to the workload that you want to add the persistent storage to. The workload type should be a stateful set. Click **&#8942; > Edit.**
1. Expand the **Volumes** section and click **Add Volume > Use an existing persistent volume (claim).**.
1. In the **Persistent Volume Claim** field, select the PVC that you created.
1. In the **Mount Point** field, enter the path that the workload will use to access the volume.
1. Click **Save.**

**Result:** The workload will make a request for the specified amount of disk space to the Kubernetes master. If a PV with the specified resources is available when the workload is deployed, the Kubernetes master will bind the PV to the PVC.