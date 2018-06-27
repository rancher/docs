---
title: Adding Storage
weight: 3500
draft: true
---

In This Document:

<!-- TOC -->

- [Adding a Persistent Volume](#adding-a-persistent-volume)
- [Adding Storage Classes](#adding-storage-classes)
- [What's Next?](#whats-next)

<!-- /TOC -->

>**Prerequisite:** Completion of all tasks on this page require the `Manage Volumes` [role](../../../concepts/global-configuration/users-permissions-roles/#project-role-reference):

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

  >**Note:** You can only use the `Amazon EBS Disk` volume plugin in an Amazon EKS or Amazon EC2 cluster.

1. Enter the **Capacity** of your volume in gigabytes.

1. Complete the **Plugin Configuration** form. Each plugin type requires information specific to the vendor of disk type. For more information about each plugin's form, refer to the reference table below.

1. **Optional:** Complete the **Customize** form. This form features:

    - [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes):

         This options sets how many nodes can access the volume, along with the node read/write permissions. The [Kubernetes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) includes a table that lists which access modes are supported by the plugins available.

    - [Mount Options](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options):

         Each volume plugin allows you to specify additional command line options during the mounting process. You can enter these options in the **Mount Option** fields. Consult each plugin's vendor documentation for the mount options available.

    - **Assign to Storage Class:**

         If you later want to automatically provision persistent volumes identical to the volume that you've specified here, assign it a storage class. Later, when you create a workload that includes persistent volume claims, Rancher automatically provisions a persistent volume for each container with a claim.

         >**Note:** You must [add a storage class](#adding-storage-classes) before you can assign it to a persistent volume.

1. Click **Save**.

**Result:** Your new persistent volume is created.

For example, this volume is a _hostPath_ volume in Kubernetes:

```
> kubectl get pv

NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM     STORAGECLASS   REASON    AGE
test      10Gi       RWO            Retain           Available                                      23m

> kubectl get pv/test -o yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  ...
spec:
  accessModes:
  - ReadWriteOnce
  capacity:
    storage: 10Gi
  hostPath:
    path: /tmp/test
    type: ""
  persistentVolumeReclaimPolicy: Retain
status:
  phase: Available
```

## Adding Storage Classes

_Storage Classes_ allow you to dynamically provision persistent volumes on demand. Think of storage classes as storage profiles that are created automatically upon a request (which is known as a _persistent volume claim_). 

1. From the **Global** view, open the cluster for which you want to dynamically provision persistent storage volumes.

1. From the main menu, select `Storage > Storage Classes`. Click `Add Class`.

1. Enter a `Name` for your storage class.

1. From the `Provisioner` drop-down, select the service that you want to use to dynamically provision storage volumes.

1. From the `Parameters` section, fill out the information required for the service to dynamically provision storage volumes. Each provisioner requires different information to dynamically provision storage volumes. Consult the service's documentation for help on how to obtain this information.

1. Click `Save`.

## What's Next?

Mount Persistent Volumes to workloads so that your applications can store their data. You can mount a either a manually created Persistent Volumes or a dynamically created Persistent Volume, which is created from a a Storage Class.

You can mount Persistent Volumes in one of two contexts:

- During deployment of a workload (recommended if possible). For more information, see [Deploying Workloads](../../workloads/deploy-workloads/).
- Following workload creation. For more information, see [Adding Persistent Volume Claims](../../workloads/add-persistent-volume-claim/).