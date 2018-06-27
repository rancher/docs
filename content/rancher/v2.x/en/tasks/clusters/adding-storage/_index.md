---
title: Adding Storage
weight: 3500
draft: true
---

### Adding a Persistent Volume

Your containers can store data on themselves, but if a container fails, that data is lost. To solve this issue, Kubernetes offers _persistent volumes_, which are external storage disks or filesystems that your container can access. If a container goes down, the container that replaces it can access the data in a persistent volume without any data loss. Persistent volumes can either be a disk hosted by you on premise, or externally by a vendor, such as Amazon EBS, Azure Disk, and many more.

>**Prerequisite:**
>
>Create a storage volume either on premise or using one of the vendor services listed in the `Volume Plugin` drop-down.

1. From the **Global** view, open the cluster running the containers that you want to add persistent volume storage to.

1. From the main menu, select **Storage > Persistent Volumes**.

1. Click **Add Volume**.

1. Enter a **Name** for the persistent volume.

1. Select the **Volume Plugin** for the disk type or service that you're using.

1. Enter the **Capacity** of your volume in gigabytes.

1. Complete the **Plugin Configuration** form. Each plugin type requires information specific to the vendor of disk type. For more information about each plugin's form, refer to the reference table below.

1. **Optional:** Complete the **Customize** form. This form features:

    - [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes): 
    
         This options sets how many nodes can access the volume, along with the node read/write permissions. The [Kubernettes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) includes a table that lists which access modes are supported by the plugins available.

    - [Mount Options](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options): 
    
         Each volume plugin allows you to specify additional command line options during the mounting process. You can enter these options in the **Mount Option** fields. Consult each plugin's documentation for the mount options available.

    - **Assign to Storage Class:** 
    
         If you want to automatically provision persistent volumes identical to volume that you've specified here, assign it a storage class. Later, when you create a workload that includes persistent volume claims, Rancher will automatically provision a persistent volume for each container with a claim.

         >**Note:** You must [add a storage class](#adding-storage-classes) before you can assign it to a persistent volume.

1. Click **Save**.

**Result:** Your new persistent volume is created. For example, this volume is a _hostPath_ volume in Kubernetes:
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

_Storage Classes_ allow you to automate the creation of persistent volumes.

To add a storage class in Rancher:

1. From the **Cluster** View select **Storage** > **Storage Classes**.
2. Click on **Add Class**.
3. Select **Name** of the class.
4. Select one of the available **Provisioners**.
5. Each provisioner has its own options, for example Amazon EBS:
  - **Volume Type**: this can be `gp2`, `io1`, `st1`, and `sc1`
  - **Availability Zone**: can be `Automatic` or `Manual`.
  - **Encryption**: whether to `enable` or `disable` encryption.
6. Click on **Save**.


## Mounting Persistent volumes

Persistent volumes can be mounted by either adding persistent volume claim or mount the persistent volume directly into a workload:

### Create Persistent Volume Claim and mount it to Workload

1. In Project view, for example **Default** go to **Volumes**.
2. Click on **Add Volume**.
3. Select a **Name** for the volume claim.
4. Select the **Namespace** of the volume claim.
5. Select **Use an existing persistent volume**.
6. From the drop down menu of **Persistent Volume**, select the pre-created persistent volume or storage class.
7. Click **Create**

After creating a pvc, it can be used in any workload:
```
> kubectl get pvc
NAME             STATUS    VOLUME    CAPACITY   ACCESS MODES   STORAGECLASS   AGE
ebsvolumeclaim   Bound     ebsdisk   10Gi       RWO                           1m
```

To use it in a workload:

1. In Project view, for example **Default** go to **Workloads**.
2. Click on **Deploy**.
3. In **Deploy Workload** view select **Volumes**.
4. Click on **Add Volume**.
5. Select **Use an existing persistent Volume (claim)**.
6. Specify **Mount Point** path.
7. Optionally **Subpath** can be specified.

>**Note:**
>
> For EBS volumes to be mounted, the nodes must be in the same AZ and have the IAM permission to attach/unattach volumes and more importantly the Cluster must be using AWS cloud provider to be able to use ebs-volume plugin

The volume be seen mounted within the pods:

```
root@nginx-6b8c57bbb7-hk2pc:/# lsblk
NAME    MAJ:MIN   RM  SIZE RO TYPE MOUNTPOINT
xvda    202:0      0   16G  0 disk
`-xvda1 202:1      0   16G  0 part /etc/hosts
xvdcc   202:20480  0   10G  0 disk /tmp/test
```
