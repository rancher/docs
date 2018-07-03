---
title: Adding Storage
weight: 3500
draft: true
---
<<<<<<< HEAD
=======

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Rancher allows the user to create Persistent volumes at the cluster level as well as Storage Classes for different cloud provisioners including Amazon EBS and Azure Disks.
>>>>>>> Adding storage task

=======
>>>>>>> adding docs on how to provision nfs storage
>**Prerequisites:** 
>
>- Working with storage requires the `Manage Volumes` [role](../../../concepts/global-configuration/users-permissions-roles/#project-role-reference).
>- You must have a storage medium provisioned. For more information, see [Provisioning Storage](provisioning-storage).
<<<<<<< HEAD

<<<<<<< HEAD
## Adding a Persistent Volume

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

## Adding Storage Classes

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

- During deployment of a workload (recommended if possible). For more information, see [Deploying Workloads](../../workloads/deploy-workloads/).
- Following workload creation. For more information, see [Adding Persistent Volume Claims](../../workloads/add-persistent-volume-claim/).
=======
Rancher support different volume plugins for persistent volumes, including Local Node Disks, Amazon EBS, Azure Disk and many more.
=======
Rancher supports two different types of storage for your containers: Persistent Volumes and Storage Classes.

- [Persistent Volumes](#adding-a-persistent-volume):
 
  Your Docker containers can store data within themselves, but if a container failes, that data is lost. To solve this issue, Kubernetes offers _persistent volumes_, which is external storage that your container can access. If a container goes down, it can recover data by accessing the persistent volume. Persistent volumes can either be created locally on your nodes, or externally by a vendor, such as Amazon EBS, Azure Disk, and many more.

- [Storage Classes](#adding-storage-classes):
 
  _StorageClasses_ are different categories of storage. For example, you can create different storage classes divide your services into different service level, or you can use them to create a backup storage category.
>>>>>>> initial commit for storage

=======
>>>>>>> updating instructions
### Adding a Persistent Volume
=======
In This Document:
>>>>>>> updating storage docs

<!-- TOC -->

- [Adding a Persistent Volume](#adding-a-persistent-volume)
- [Adding Storage Classes](#adding-storage-classes)
- [What's Next?](#whats-next)

<!-- /TOC -->

>**Prerequisite:** Completion of all tasks on this page require the `Manage Volumes` [role](../../../concepts/global-configuration/users-permissions-roles/#project-role-reference).
=======
>>>>>>> adding docs on how to provision nfs storage

## Adding a Persistent Volume

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

## Adding Storage Classes

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

<<<<<<< HEAD
```
root@nginx-6b8c57bbb7-hk2pc:/# lsblk
NAME    MAJ:MIN   RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0      0   16G  0 disk
`-xvda1 202:1      0   16G  0 part /etc/hosts
xvdcc   202:20480  0   10G  0 disk /tmp/test
```
>>>>>>> Adding storage task
=======
- During deployment of a workload (recommended if possible). For more information, see [Deploying Workloads](../../workloads/deploy-workloads/).
- Following workload creation. For more information, see [Adding Persistent Volume Claims](../../workloads/add-persistent-volume-claim/).
>>>>>>> updating storage docs
