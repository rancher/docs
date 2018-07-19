---
title: Volumes and Storage
weight: 3050
aliases:
  - /rancher/v2.x/en/concepts/volumes-and-storage/
  - /rancher/v2.x/en/tasks/clusters/adding-storage/
---
There are two ways to create volumes on Kubernetes: Persistent Volumes (PVs) and Storage Classes.

## Persistent Volumes

_Persistent Volumes_ are pre-provisioned storage volumes that you can bind to specific pods later. For example, in Amazon EC2, you might want to create a number of Elastic Block Store (EBS) volumes before you start running your application. Each pre-provisioned EBS volume corresponds to a Kubernetes persistent volume. When the application starts, it creates Persistent Volume Claims (PVCs) that bind to persistent volumes. A PVC corresponds to a Docker volume. Each PVC binds to one PV that includes the minimum resources that the PVC requires. The following figure illustrates the relationship between pods, PVCs, PVs, and the underlying cloud storage.

![Persistent Volumes]({{< baseurl >}}/img/rancher/persistent-volume.png)

Rancher allows you to create PVs at cluster level and bind them to PVCs later. Volumes are managed on a per-project basis.

### Adding a Persistent Volume

>**Prerequisites:**
>
>- Working with storage requires the `Manage Volumes` [role]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-role-reference).
>- You must have a storage medium provisioned. For more information, see [Provisioning Storage]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/volumes-and-storage/examples/).

Your containers can store data on themselves, but if a container fails, that data is lost. To solve this issue, Kubernetes offers _persistent volumes_, which are external storage disks or file systems that your containers can access. If a container crashes, its replacement container can access the data in a persistent volume without any data loss.

Persistent volumes can either be a disk or file system that you host on premise, or they can be hosted by a vendor, such as Amazon EBS or Azure Disk.

>**Prerequisite:**
>
>- Create a storage volume either on premise or in the cloud, using one of the vendor services listed in [Types of Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#types-of-persistent-volumes).
>- Gather metadata about your storage volume after you create it. You'll need to enter this information into Rancher.

1. From the **Global** view, open the cluster running the containers that you want to add persistent volume storage to.

1. From the main menu, select **Storage > Persistent Volumes**.

1. Click **Add Volume**.

1. Enter a **Name** for the persistent volume.

1. Select the **Volume Plugin** for the disk type or service that you're using.

  >**Note:** If the cluster you are adding storage for is a cloud service that also offers cloud storage, you must enable the `cloud provider` option for the cluster, and you must use the service's plug-in to use cloud storage. For example, if you have a Amazon EC2 cluster and you want to use cloud storage for it:

      1. You must enable the `cloud provider` option for the EC2 cluster.
      2. You must use the `Amazon EBS Disk` volume plugin.

1. Enter the **Capacity** of your volume in gigabytes.

1. Complete the **Plugin Configuration** form. Each plugin type requires information specific to the vendor of disk type. For help regarding each plugin's form and the information that's required, refer to the plug-in's vendor documentation.

1. **Optional:** Complete the **Customize** form. This form features:

    - [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes):

         This options sets how many nodes can access the volume, along with the node read/write permissions. The [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) includes a table that lists which access modes are supported by the plugins available.

    - [Mount Options](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options):

         Each volume plugin allows you to specify additional command line options during the mounting process. You can enter these options in the **Mount Option** fields. Consult each plugin's vendor documentation for the mount options available.

    - **Assign to Storage Class:**

         If you later want to automatically provision persistent volumes identical to the volume that you've specified here, assign it a storage class. Later, when you create a workload, you can assign it a persistent volume claim that references the storage class, which will provision a persistent volume identical to the volume you've specified here.

         >**Note:** You must [add a storage class](#adding-storage-classes) before you can assign it to a persistent volume.

1. Click **Save**.

**Result:** Your new persistent volume is created.

## Storage Classes

Storage Classes allow you to create PVCs dynamically without having to create PVs first. For example, an Amazon EBS Storage Class will dynamically create EBS volumes and bind them to PVCs. A Storage Class is similar to the notion of a _storage driver_. The following figure illustrates how a PVC creation triggers the dynamic provisioning of an underlying EBS volume.

![Storage Classes]({{< baseurl >}}/img/rancher/storage-classes.png)

### Storage and Cloud Providers

Each storage class contains the fields `provisioner`, `parameters`, and `reclaimPolicy`, which are used when a persistent volume that belongs to the class needs to be dynamically provisioned.

The `provisioner` determines which volume plugin is used to provision the persistent volumes. You can define storage classes for the following provisioners:

- Amazon EBS Disk
- AzureFile
- AzureDisk
- Ceph RBD
- Gluster Volume
- Google Persistent Disk
- Longhorn
- Openstack Cinder Volume
- Portworx Volume
- Quobyte Volume
- ScaleIO Volume
- StorageOS
- Vmware vSphere Volume

In addition to customizing each provisioner's options for the storage class, you can also define the volume `reclaimPolicy`. There are two options available:

- Delete volumes and underlying device when released by workloads.
- Retain the volume for manual cleanup.

Finally, you can define custom `MountOptions` for the persistent volume created.

`parameters` are specific to each cloud storage provisioner. For full information about the storage classes provisioner parameters, refer to the official [Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters).

### Adding Storage Classes

_Storage Classes_ allow you to dynamically provision persistent volumes on demand. Think of storage classes as storage profiles that are created automatically upon a request (which is known as a _persistent volume claim_).

1. From the **Global** view, open the cluster for which you want to dynamically provision persistent storage volumes.

1. From the main menu, select `Storage > Storage Classes`. Click `Add Class`.

1. Enter a `Name` for your storage class.

1. From the `Provisioner` drop-down, select the service that you want to use to dynamically provision storage volumes.

  >**Note:** If the cluster you are adding a storage class for is a cloud service that also offers cloud storage, you must enable the `cloud provider` option for the cluster, and you must use the service's plug-in to use cloud storage. For example, if you have a Amazon EC2 cluster and you want to use cloud storage for it:

      1. You must enable the `cloud provider` option for the EC2 cluster.
      2. You must use the `Amazon EBS Disk` provisioner.


1. From the `Parameters` section, fill out the information required for the service to dynamically provision storage volumes. Each provisioner requires different information to dynamically provision storage volumes. Consult the service's documentation for help on how to obtain this information.

1. Click `Save`.

## What's Next?

Mount Persistent Volumes to workloads so that your applications can store their data. You can mount a either a manually created Persistent Volumes or a dynamically created Persistent Volume, which is created from a a Storage Class.

You can mount Persistent Volumes in one of two contexts:

- During deployment of a workload (recommended if possible). For more information, see [Deploying Workloads]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/deploy-workloads/).
- Following workload creation. For more information, see [Adding Persistent Volume Claims]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/volumes-and-storage/persistent-volume-claims/).

## Related Links

### External Docs

- [Storage](https://kubernetes.io/docs/concepts/storage/)
