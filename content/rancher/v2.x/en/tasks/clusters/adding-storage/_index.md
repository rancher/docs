---
title: Adding Storage
weight: 3500
draft: true
---

Rancher supports two different types of storage for your containers: Persistent Volumes and Storage Classes.

- [Persistent Volumes](#adding-a-persistent-volume):
 
  Your Docker containers can store data within themselves, but if a container failes, that data is lost. To solve this issue, Kubernetes offers _persistent volumes_, which is external storage that your container can access. If a container goes down, it can recover data by accessing the persistent volume. Persistent volumes can either be created locally on your nodes, or externally by a vendor, such as Amazon EBS, Azure Disk, and many more.

- [Storage Classes](#adding-storage-classes):
 
  _StorageClasses_ are different categories of storage. For example, you can create different storage classes divide your services into different service level, or you can use them to create a backup storage category.

### Adding a Persistent Volume

>**Note:** Rancher supports numerous persistent volumes plugins from a variety of different vendors. Therefore, we've written thorough documentation for the most popular plugins, but for plugins that aren't as popular, we wrote a generic procudure that points to external documents that can help.

#### Adding a Pesistent Volume: Generic Directions

1. From the **Global** view, open the cluster containing the nodes you want to add persistent volume storage to.

1. From the main menu, select **Storage > Persistent Volumes**.

1. Click **Add Volume**.

1. Enter a **Name** for the persistent volume.

1. Select a **Volume Plugin**.

1. Complete the **Plugin Configuration** form. Each plugin type requires information specific to the vendor. For more information about each plugin's form, refer to the reference table below.

1. Complete the **Customize** form. This form features

    - [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes): This options sets how many nodes can access the volume, along with the node read/write permissions. The [Kubernettes Documentation](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) includes a table that lists which access modes are supported by the plugins available.
    - [Mount Options](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#mount-options): Each volume plugin allows you to specify additional command line options during the mounting process. You can enter these options in the **Mount Option** fields. Consult each plugin's documentation for the mount options available.
    - [Assign to Storage Class]():

1. Use the desired **Capacity** for the persistent volume in **Gib**.

1. Choose the **Path** where this volume will be mounted on the node.

1. Select  From **The Path on the Node must be** drop-down select the type of the host path:

  - AnyThing: do not check the target path
  - A directory, or create if doesn't exist
  - An existing directory
  - An existing file
  - An existing socket_
  - An existing character device
  - An existing block device

1. FThe volume can be customized with advanced options including:

  - Access Modes: this option can be one of the following:
    - Single Node Read-Write
    - Many Nodes Read-Only
    - Many Nodes Read-Write

  - **Mount Options:** this option include any extra mount options for the volume mount.

1. Click **Save**.

After clicking **Save** a new persistent volume will be created with the specified name, this volume is a _hostPath_ volume in Kubernetes:
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

### Adding a Local Volume

1. From the **Global** view, open the cluster containing the nodes you want to add persistent volume storage to.

1. From the main menu, select **Storage > Persistent Volumes**.

1. Click **Add Volume**.

1. From **Add Volume**, enter a **Name** for the persistent volume.

1. Select **Local Node Path** from the **Volume Plugin** drop down.

1. Use the desired **Capacity** for the persistent volume in **Gib**.

1. Choose the **Path** where this volume will be mounted on the node.

1. From **The Path on the Node must be** drop-down select the type of the host path:

  - AnyThing: do not check the target path
  - A directory, or create if doesn't exist
  - An existing directory
  - An existing file
  - An existing socket_
  - An existing character device
  - An existing block device

1. The volume can be customized with advanced options including:

  - **Access Modes:** this option can be one of the following:

    - Single Node Read-Write
    - Many Nodes Read-Only
    - Many Nodes Read-Write

  - **Mount Options:** this option include any extra mount options for the volume mount.

1. Click **Save**.

After clicking **Save** a new persistent volume will be created with the specified name, this volume is a _hostPath_ volume in Kubernetes:
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
### Amazon EBS Disk

To Create an Amazon EBS persistent volume use the following steps:

1. From the **Cluster** View select **Storage** > **Persistent Volumes**.
2. Click **Add Volume**.
3. In the **Add Volume** view choose the **Name** of the persistent volume.
4. Select the **Amazon EBS Disk** from the **Volume Plugin** drop down.
5. Use the desired **Capacity** for the persistent volume in **Gib**.
6. In **Plugin Configuration** menu Enter the following:
  - **Filesystem Type**: for example ext4.
  - **Partition**: number of partitions for this EBS disk.
  - **Read Only**: specify the read-write options for the disk.
  - **Volume ID**: id of the EBS disk eg: `vol-0768676b73d2f5b60`.
7. The volume can be customized with advanced options including:
  - **Access Modes:** this option can be one of the following:
    - _Single Node Read-Write_
    - _Many Nodes Read-Only_
    - _Many Nodes Read-Write_
  - **Mount Options:** this option include any extra mount options for the volume mount.
8. Click **Save**

After Clicking **Save** a Persistent volume of type `awsElasticBlockStore` will be created:
```
> kubectl get pv/ebsdisk
NAME      CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM     STORAGECLASS   REASON    AGE
ebsdisk   10Gi       RWO            Retain           Available                                      4m

> kubectl get pv/ebsdisk -o yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  ...
  name: ebsdisk
  ...
spec:
  accessModes:
  - ReadWriteOnce
  awsElasticBlockStore:
    fsType: ext4
    volumeID: vol-0768676b73d2f5b60
  capacity:
    storage: 10Gi
  persistentVolumeReclaimPolicy: Retain
status:
  phase: Available
```


## Adding Storage Classes

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
