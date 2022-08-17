---
title: vSphere Storage
weight: 3055
---

To provide stateful workloads with vSphere storage, we recommend creating a vSphereVolume StorageClass. This practice dynamically provisions vSphere storage when workloads request volumes through a PersistentVolumeClaim.

In order to dynamically provision storage in vSphere, the vSphere provider must be [enabled.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/cloud-providers/vsphere)

- [Prerequisites](#prerequisites)
- [Creating a StorageClass](#creating-a-storageclass)
- [Creating a Workload with a vSphere Volume](#creating-a-workload-with-a-vsphere-volume)
- [Verifying Persistence of the Volume](#verifying-persistence-of-the-volume)
- [Why to Use StatefulSets Instead of Deployments](#why-to-use-statefulsets-instead-of-deployments)

### Prerequisites

In order to provision vSphere volumes in a cluster created with the [Rancher Kubernetes Engine (RKE)]({{< baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/), the [vSphere cloud provider]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/vsphere) must be explicitly enabled in the [cluster options]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/options/).

### Creating a StorageClass

> **Note:**
>
> The following steps can also be performed using the `kubectl` command line tool. See [Kubernetes documentation on persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for details.

1. Click **☰ > Cluster Management**.
1. Go to the cluster where you want to provide vSphere storage.
1. In the left navigation bar, click **Storage > StorageClasses**.
1. Click **Create**.
3. Enter a **Name** for the StorageClass.
4. Under **Provisioner**, select **VMWare vSphere Volume**.

    {{< img "/img/rancher/vsphere-storage-class.png" "vsphere-storage-class">}}

5. Optionally, specify additional properties for this storage class under **Parameters**. Refer to the [vSphere storage documentation](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/storageclass.html) for details.
5. Click **Create**.

### Creating a Workload with a vSphere Volume

1. In the left navigation bar, click **Workload**.
1. Click **Create**.
1. Click **StatefulSet**.
1. In the **Volume Claim Templates** tab, click **Add Claim Template**.
1. Enter a persistent volume name.
1. In the Storage Class field, select the vSphere StorageClass that you created.
6. Enter the required **Capacity** for the volume. Then click **Define**.
7. Assign a path in the **Mount Point** field. This is the full path where the volume will be mounted in the container file system, e.g. `/persistent`.
8. Click **Create**.

### Verifying Persistence of the Volume

1. In the left navigation bar, click **Workload > Pods**.
1. Go to the workload you just created and click **⋮ > Execute Shell**.
2. Note the directory at root where the volume has been mounted to (in this case `/persistent`).
3. Create a file in the volume by executing the command `touch /<volumeMountPoint>/data.txt`.
4. Close the shell window.
5. Click on the name of the workload to reveal detail information.
7. Click **⋮ > Delete**.
8. Observe that the pod is deleted. Then a new pod is scheduled to replace it so that the workload maintains its configured scale of a single stateful pod.
9. Once the replacement pod is running, click **Execute Shell**.
10. Inspect the contents of the directory where the volume is mounted by entering `ls -l /<volumeMountPoint>`. Note that the file you created earlier is still present.

    ![workload-persistent-data]({{<baseurl>}}/img/rancher/workload-persistent-data.png)

### Why to Use StatefulSets Instead of Deployments

You should always use [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) for workloads consuming vSphere storage, as this resource type is designed to address a VMDK block storage caveat.

Since vSphere volumes are backed by VMDK block storage, they only support an [access mode](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) of `ReadWriteOnce`. This setting restricts the volume so that it can only be mounted to a single pod at a time, unless all pods consuming that volume are co-located on the same node. This behavior makes a deployment resource unusable for scaling beyond a single replica if it consumes vSphere volumes.

Even using a deployment resource with just a single replica may result in a deadlock situation while updating the deployment. If the updated pod is scheduled to a node different from where the existing pod lives, it will fail to start because the VMDK is still attached to the other node.

### Related Links

- [vSphere Storage for Kubernetes](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
