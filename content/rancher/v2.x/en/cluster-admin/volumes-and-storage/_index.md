---
title: "Kubernetes Persistent Storage: Volumes and Storage Classes"
description: "Learn about the two ways with which you can create persistent storage in Kubernetes: persistent volumes and storage classes"
weight: 2031
aliases:
  - /rancher/v2.x/en/concepts/volumes-and-storage/
  - /rancher/v2.x/en/tasks/clusters/adding-storage/
  - /rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/
  - /rancher/v2.x/en/cluster-admin/volumes-and-storage/persistent-volume-claims/
---
When deploying an application that needs to retain data, you'll need to create persistent storage. Persistent storage allows you to store application data external from the pod running your application. This storage practice allows you to maintain application data, even if the application's pod fails.

Rancher can only manage storage in clusters [created with RKE.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/)

The documents in this section assume that you understand the Kubernetes concepts of persistent volumes, persistent volume claims, and storage classes. For more information, refer to the section on [how storage works.](./how-storage-works)

### Setting up Existing Storage

The overall workflow for setting up existing storage is as follows:

1. Set up persistent storage in an infrastructure provider.
2. Add a persistent volume (PV) that refers to the persistent storage.
3. Add a persistent volume claim (PVC) that refers to the PV.
4. Mount the PVC as a volume in your workload.

For details and prerequisites, refer to [this page.](./attaching-existing-storage)

### Dynamically Provisioning New Storage in Rancher

The overall workflow for provisioning new storage is as follows:

1. Add a storage class and configure it to use your storage provider.
2. Add a persistent volume claim (PVC) that refers to the storage class.
3. Mount the PVC as a volume for your workload.

For details and prerequisites, refer to [this page.](./provisioning-new-storage)

### Provisioning Storage Examples

We provide examples of how to provision storage with [NFS,](./examples/nfs) [vSphere,](./examples/vsphere) and [Amazon's EBS.](./examples/nfs)

### GlusterFS Volumes

In clusters that store data on GlusterFS volumes, you may experience an issue where pods fail to mount volumes after restarting the `kubelet`. For details on preventing this from happening, refer to [this page.](./glusterfs-volumes)

### iSCSI Volumes

In [Rancher Launched Kubernetes clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) that store data on iSCSI volumes, you may experience an issue where kubelets fail to automatically connect with iSCSI volumes. For details on resolving this issue, refer to [this page.](./iscsi-volumes)

### Related Links

- [Kubernetes Documentation: Storage](https://kubernetes.io/docs/concepts/storage/)