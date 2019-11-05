---
title: "Kubernetes Persistent Storage: Volumes and Storage Classes"
description: "Learn about the two ways with which you can creat persistent storage in Kubernetes: persistent volumes and storage classes"
weight: 2031
aliases:
  - /rancher/v2.x/en/concepts/volumes-and-storage/
  - /rancher/v2.x/en/tasks/clusters/adding-storage/
  - /rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/
---
When deploying an application that needs to retain data, you'll need to create persistent storage. Persistent storage allows you to store application data external from the pod running your application. This storage practice allows you to maintain application data, even if the application's pod fails.

There are two ways to create persistent storage in Kubernetes: Persistent Volumes (PVs) and Storage Classes.

## Persistent Volumes

_Persistent Volumes_ are pre-provisioned storage volumes that you can bind to pods later. Each pre-provisioned volume corresponds to a Kubernetes persistent volume. When you start your application, it creates Persistent Volume Claims (PVCs) that bind to persistent volumes. A PVC corresponds to a Docker volume. Each PVC binds to one PV that includes the minimum resources that the PVC requires. The following figure illustrates the relationship between pods, PVCs, PVs, and the underlying cloud storage.

![Persistent Volumes]({{< baseurl >}}/img/rancher/persistent-volume.png)

Rancher allows you to create PVs at the cluster level and bind them to PVCs later. Volumes are managed on a per-project basis.

## Storage Classes

Storage Classes allow you to create PVCs dynamically without having to create PVs first. For example, an Amazon EBS Storage Class will dynamically create EBS volumes and bind them to PVCs. A Storage Class is similar to the notion of a _storage driver_. The following figure illustrates how a PVC creation triggers the dynamic provisioning of an underlying EBS volume.

![Storage Classes]({{< baseurl >}}/img/rancher/storage-classes.png)


### Storage and Cloud Providers

When you provision persistent storage for a cluster [launched by RKE]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters), you must host your storage with the same provider that hosts the cluster. For example, if you're hosting your cluster on Amazon EC2, you must host your storage on Amazon EBS. To setup storage for your RKE-launched cluster, you must complete two tasks: enabling the **Cloud Provider** option for your cluster, and adding storage using the same provider.

<sup>Enabling Cloud Provider Option/Choosing Storage Provider</sup>
![Cloud Provider]({{< baseurl >}}/img/rancher/cloud-provider.png)

Before you set up storage for a cluster launched by RKE, make sure that the **Cloud Provider** option for the cluster is enabled. [Cloud providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) are modules that allow you to use the provider's features in Rancher (like provisioning persistent storage).

You can turn on the **Cloud Provider** option in one of two contexts:

- [When provisioning your cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning)
- [When editing your cluster]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/editing-clusters)

When you begin setting up a [persistent volume](#adding-persistent-volumes) or [storage class](#adding-storage-classes), you can choose the storage plugin or provisioner for your cloud provider.

#### Storage Classes and Cloud Providers

Additionally, storage classes feature a few extra settings for cloud providers.

Each storage class contains the fields `provisioner`, `parameters`, and `reclaimPolicy`, which are used when a persistent volume that belongs to the class needs to be dynamically provisioned.

The `provisioner` determines which volume plugin is used to provision the persistent volumes.

{{% accordion id="provisioners" label="Enabled Storage Class Provisioners" %}}
- Amazon EBS Disk
- AzureFile
- AzureDisk
- Google Persistent Disk
- Longhorn
- Vmware vSphere Volume
- Local

{{% /accordion %}}
<br/>

In addition to customizing each provisioner's options for the storage class, you can also define the volume `reclaimPolicy`. There are two options available:

- Delete volumes and underlying device when released by workloads.
- Retain the volume for manual cleanup.

Finally, you can define custom `MountOptions` for the persistent volume created.

`parameters` are specific to each cloud storage provisioner. For full information about the storage classes provisioner parameters, refer to the official [Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters).

### Adding Persistent Volumes

Your containers can store data on themselves, but if a container fails, that data is lost. To solve this issue, Kubernetes offers _persistent volumes_, which are external storage disks or file systems that your containers can access. If a container crashes, its replacement container can access the data in a persistent volume without any data loss.

Persistent volumes can either be a disk or file system that you host on premise, or they can be hosted by a vendor, such as Amazon EBS or Azure Disk.

>**Prerequisites:**
>
>- Permissions: `Manage Volumes` [role]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-role-reference)
>- You must have [storage provisioned]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/examples/).
>- If provisioning storage for a cluster hosted in the cloud:
>
>   - The storage and cluster hosts must be the [same provider](#storage-and-cloud-providers).
>   - The [cloud providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) option must be enabled.


1. From the **Global** view, open the cluster running the containers that you want to add persistent volume storage to.

1. From the main menu, select **Storage > Persistent Volumes**.

1. Click **Add Volume**.

1. Enter a **Name** for the persistent volume.

1. Select the **Volume Plugin** for the disk type or service that you're using.

    >**Note:** When adding storage to a cluster that's hosted by a cloud provider:
    >
    >- You must enable the [cloud provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) option for the cluster.
    >- You must use the cloud provider's plug-in for cloud storage. For example, if you have a Amazon EC2 cluster and you want to use cloud storage for it:
    >
    >   - You must enable the `cloud provider` option for the EC2 cluster.
    >   - You must use the `Amazon EBS Disk` volume plugin.

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


### Adding Storage Classes

_Storage Classes_ allow you to dynamically provision persistent volumes on demand. Think of storage classes as storage profiles that are created automatically upon a request (which is known as a _persistent volume claim_).

>**Prerequisites:**
>
>- Permissions: `Manage Volumes` [role]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#project-role-reference)
>- You must have [storage provisioned]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/examples/).
>- If provisioning storage for a cluster hosted in the cloud:
>
>   - The storage and cluster hosts must be the [same provider](#storage-and-cloud-providers).
>   - The [cloud providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) option must be enabled.

1. From the **Global** view, open the cluster for which you want to dynamically provision persistent storage volumes.

1. From the main menu, select `Storage > Storage Classes`. Click `Add Class`.

1. Enter a `Name` for your storage class.

1. From the `Provisioner` drop-down, select the service that you want to use to dynamically provision storage volumes.

    >**Note:** If the cluster you are adding a storage class for is a cloud service that also offers cloud storage, you must enable the `cloud provider` option for the cluster, and you must use the service's plug-in to use cloud storage. For example, if you have a Amazon EC2 cluster and you want to use cloud storage for it:
    >
    >   - You must enable the `cloud provider` option for the EC2 cluster.
    >   - You must use the `Amazon EBS Disk` provisioner.

1. From the `Parameters` section, fill out the information required for the service to dynamically provision storage volumes. Each provisioner requires different information to dynamically provision storage volumes. Consult the service's documentation for help on how to obtain this information.

1. Click `Save`.

## iSCSI Volumes With Rancher Launched Kubernetes Clusters

In [Rancher Launched Kubernetes clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) that store data on iSCSI volumes, you may experience an issue where kubelets fail to automatically connect with iSCSI volumes. This failure is likely due to an incompatibility issue involving the iSCSI initiator tool. You can resolve this issue by installing the iSCSI initiator tool on each of your cluster nodes.

Rancher Launched Kubernetes clusters storing data on iSCSI volumes leverage the [iSCSI initiator tool](http://www.open-iscsi.com/), which is embedded in the kubelet's `rancher/hyperkube` Docker image. From each kubelet (i.e., the _initiator_), the tool discovers and launches sessions with an iSCSI volume (i.e., the _target_). However, in some instances, the versions of the iSCSI initiator tool installed on the initiator and the target may not match, resulting in a connection failure.


If you encounter this issue, you can work around it by installing the initiator tool on each node in your cluster. You can install the iSCSI initiator tool by logging into your cluster nodes and entering one of the following commands:

| Platform      | Package Name            | Install Command                        |
| ------------- | ----------------------- | -------------------------------------- |
| Ubuntu/Debian | `open-iscsi`            | `sudo apt install open-iscsi`          |
| RHEL          | `iscsi-initiator-utils` | `yum install iscsi-initiator-utils -y` |


<br/>
After installing the initiator tool on your nodes, edit the YAML for your cluster, editing the kubelet configuration to mount the iSCSI binary and configuration, as shown in the sample below.

>**Note:**
>
>Before updating your Kubernetes YAML to mount the iSCSI binary and configuration, make sure either the `open-iscsi` (deb) or `iscsi-initiator-utils` (yum) package is installed on your cluster nodes. If this package isn't installed _before_ the bind mounts are created in your Kubernetes YAML, Docker will automatically create the directories and files on each node and will not allow the package install to succeed.

```
services:
  kubelet:
    extra_binds:
      - "/etc/iscsi:/etc/iscsi"
      - "/sbin/iscsiadm:/sbin/iscsiadm"
```


## What's Next?

Mount Persistent Volumes to workloads so that your applications can store their data. You can mount a either a manually created Persistent Volumes or a dynamically created Persistent Volume, which is created from a a Storage Class.

You can mount Persistent Volumes in one of two contexts:

- During deployment of a workload (recommended if possible). For more information, see [Deploying Workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/deploy-workloads/).
- Following workload creation. For more information, see [Adding Persistent Volume Claims]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/persistent-volume-claims/).

## Related Links

- [Kubernetes Documentation: Storage](https://kubernetes.io/docs/concepts/storage/)
