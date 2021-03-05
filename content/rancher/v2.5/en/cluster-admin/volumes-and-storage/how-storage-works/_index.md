---
title: How Persistent Storage Works
weight: 1
aliases:
  - /rancher/v2.5/en/tasks/workloads/add-persistent-volume-claim
---

A persistent volume (PV) is a piece of storage in the Kubernetes cluster, while a persistent volume claim (PVC) is a request for storage.

There are two ways to use persistent storage in Kubernetes:

- Use an existing persistent volume
- Dynamically provision new persistent volumes

To use an existing PV, your application will need to use a PVC that is bound to a PV, and the PV should include the minimum resources that the PVC requires.

For dynamic storage provisioning, your application will need to use a PVC that is bound to a storage class. The storage class contains the authorization to provision new persistent volumes.

![Setting Up New and Existing Persistent Storage]({{<baseurl>}}/img/rancher/rancher-storage.svg)

For more information, refer to the [official Kubernetes documentation on storage](https://kubernetes.io/docs/concepts/storage/volumes/)

This section covers the following topics:

- [About persistent volume claims](#about-persistent-volume-claims)
  - [PVCs are required for both new and existing persistent storage](#pvcs-are-required-for-both-new-and-existing-persistent-storage)
- [Setting up existing storage with a PVC and PV](#setting-up-existing-storage-with-a-pvc-and-pv)
 - [Binding PVs to PVCs](#binding-pvs-to-pvcs)
- [Provisioning new storage with a PVC and storage class](#provisioning-new-storage-with-a-pvc-and-storage-class)

# About Persistent Volume Claims

Persistent volume claims (PVCs) are objects that request storage resources from your cluster. They're similar to a voucher that your deployment can redeem for storage access. A PVC is mounted into a workloads as a volume so that the workload can claim its specified share of the persistent storage.

To access persistent storage, a pod must have a PVC mounted as a volume. This PVC lets your deployment application store its data in an external location, so that if a pod fails, it can be replaced with a new pod and continue accessing its data stored externally, as though an outage never occurred.

Each Rancher project contains a list of PVCs that you've created, available from **Resources > Workloads > Volumes.** You can reuse these PVCs when creating deployments in the future.

### PVCs are Required for Both New and Existing Persistent Storage

A PVC is required for pods to use any persistent storage, regardless of whether the workload is intended to use storage that already exists, or the workload will need to dynamically provision new storage on demand.

If you are setting up existing storage for a workload, the workload mounts a PVC, which refers to a PV, which corresponds to existing storage infrastructure.

If a workload should request new storage, the workload mounts PVC, which refers to a storage class, which has the capability to create a new PV along with its underlying storage infrastructure.

Rancher lets you create as many PVCs within a project as you'd like.

You can mount PVCs to a deployment as you create it, or later, after the deployment is running.

# Setting up Existing Storage with a PVC and PV

Your pods can store data in [volumes,](https://kubernetes.io/docs/concepts/storage/volumes/) but if the pod fails, that data is lost. To solve this issue, Kubernetes offers persistent volumes (PVs), which are Kubernetes resources that correspond to external storage disks or file systems that your pods can access. If a pod crashes, its replacement pod can access the data in persistent storage without any data loss.

PVs can represent a physical disk or file system that you host on premise, or a vendor-hosted storage resource, such as Amazon EBS or Azure Disk.

Creating a persistent volume in Rancher will not create a storage volume. It only creates a Kubernetes resource that maps to an existing volume. Therefore, before you can create a persistent volume as a Kubernetes resource, you must have storage provisioned.

> **Important:** PVs are created at the cluster level, which means that in a multi-tenant cluster, teams with access to separate namespaces could have access to the same PV.

### Binding PVs to PVCs

When pods are set up to use persistent storage, they mount a persistent volume claim (PVC) that is mounted the same way as any other Kubernetes volume. When each PVC is created, the Kubernetes master considers it to be a request for storage and binds it to a PV that matches the minimum resource requirements of the PVC. Not every PVC is guaranteed to be bound to a PV. According to the Kubernetes [documentation,](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)

> Claims will remain unbound indefinitely if a matching volume does not exist. Claims will be bound as matching volumes become available. For example, a cluster provisioned with many 50Gi PVs would not match a PVC requesting 100Gi. The PVC can be bound when a 100Gi PV is added to the cluster.

In other words, you can create unlimited PVCs, but they will only be bound to PVs if the Kubernetes master can find a sufficient PVs that has at least the amount of disk space required by the PVC.

To dynamically provision new storage, the PVC mounted in the pod would have to correspond to a storage class instead of a persistent volume.

# Provisioning New Storage with a PVC and Storage Class

Storage Classes allow you to create PVs dynamically without having to create persistent storage in an infrastructure provider first.

For example, if a workload is bound to a PVC and the PVC refers to an Amazon EBS Storage Class, the storage class can dynamically create an EBS volume and a corresponding PV.

The Kubernetes master will then bind the newly created PV to your workload's PVC, allowing your workload to use the persistent storage.

