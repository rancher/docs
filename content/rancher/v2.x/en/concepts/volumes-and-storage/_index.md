---
title: Volumes and Storage
weight: 2225
---
There are two ways to create volumes on Kubernetes: Persistent Volumes (PVs) and Storage Classes.

## Persistent Volumes

_Persistent Volumes_ are pre-provisioned storage volumes that you can bind to specific pods later. For example, in Amazon EC2, you might want to create a number of Elastic Block Store (EBS) volumes before you start running your application. Each pre-provisioned EBS volume corresponds to a Kubernetes persistent volume. When the application starts, it creates Persistent Volume Claims (PVCs) that bind to persistent volumes. A PVC corresponds to a Docker volume. Each PVC binds to one PV that includes the minimimum resources that the PVC requires. The following figure illustrates the relationship between pods, PVCs, PVs, and the underlying cloud storage.

![Persistent Volumes]({{< baseurl >}}/img/rancher/persistent-volume.png)

Rancher allows you to create PVs at cluster level and bind them to PVCs later. Volumes are managed on a per-project basis.

## Storage Classes

Storage classes allow you to create PVCs dynamically without having to create PVs first. For example, an EBS Storage Class will dynamically create EBS volumes and bind them to PVCs. A storage class is similar to the notion of a “storage driver.” The following figure illustrates how a PVC creation triggers the dynamic provisioning of an underlying EBS volume.

![Storage Classes]({{< baseurl >}}/img/rancher/storage-classes.png)

### Storage and Cloud Providers

Each storage class contains the fields `provisioner`, `parameters`, and `reclaimPolicy`, which are used when a PersistentVolume belonging to the class needs to be dynamically provisioned.

The `provisioner` determine which volume plugin will be used to provision the persistent volumes, Rancher allows the user to define storage classes for the following provisioners:

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

In addition to customizing each provisioner options for the storage class, Rancher allows the user to specify the `reclaimPolicy` of the volume, there are two options available:

- Delete volumes and underlying device when released by workloads.
- Retain the volume for manual cleanup.

Rancher also allow the user to specify custom `MountOptions` for the persistent volume created.

`parameters` are specific to each cloud storage provisioners, for full information about the storage classes provisioners parameters please refer to the official [Kubernetes documentation](https://kubernetes.io/docs/concepts/storage/storage-classes/#parameters)
