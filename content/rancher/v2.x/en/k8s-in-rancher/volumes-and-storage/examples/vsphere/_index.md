---
title: vSphere Storage
weight: 3055
aliases:
  - /rancher/v2.x/en/tasks/clusters/adding-storage/provisioning-storage/vsphere/
---

To provide stateful workloads with vSphere storage, we recommend creating a vSphereVolume [storage class]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#storage-classes). This practice dynamically provisions vSphere storage when workloads request volumes through a [persistent volume claim]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/persistent-volume-claims/).

>**Prerequisites:**
>
>If you [provisioned your cluster using RKE]({{< baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/), its [cluster options]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/) must have the [vSphere cloud provider]({{< baseurl >}}/rke/v0.1.x/en/config-options/cloud-providers/vsphere) enabled.
>
> **Note:**
>
> These steps can also be performed using the `kubectl` command line tool. See [Kubernetes documentation on persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for details.

### Creating A Storage Class

Storage classes for vSphereVolumes may be created with a number of different properties. Refer to the [vSphere  documentation](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/storageclass.htm) for the available options.

1. From the Global view, open the cluster where you want to provide vSphere storage.

1. From the main menu, select **Storage > Storage Classes**. Then click **Add Class**.

1. Enter a **Name** for the class. 

1. Under **Provisioner**, select **VMWare vSphere Volume**.

    ![vsphere-storage-class]({{< baseurl >}}/img/rancher/vsphere-storage-class.png)

4. Click **Save**.

### Creating a Workload with a vSphere Volume

1. From the cluster where you configured vSphere storage, begin creating a workload as you would in [Deploying Workloads]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/workloads/deploy-workloads/).

1. For **Workload Type**, select **Stateful set of 1 pod**.

1. Expand the **Volumes** section and click **Add Volume**.

1. Choose **Add a new persistent volume (claim)**. This option will implicitly create the claim once you deploy the workload.

1. Assign a **Name** for the claim, ie. `test-volume` and select the vSphere storage class created in the previous step.

1. Enter the required **Capacity** for the volume. Then click **Define**.

    ![workload-add-volume]({{< baseurl >}}/img/rancher/workload-add-volume.png)

1. Assign a path in the **Mount Point** field. This is the full path where the volume will be mounted in the container file system, e.g. `/persistent`.

1. Click **Launch** to create the workload.

### Verifing Persistence of the Volume

1. From the context menu of the workload you just created, click **Execute Shell**.

1. Note the directory at root where the volume has been mounted to (in this case `/persistent`).

1. Create a file in the volume by executing the command `touch /<volumeMountPoint>/data.txt`.

1. **Close** the shell window.

1. Click on the name of the workload to reveal detail information.

1. Open the context menu next to the Pod in the *Running* state.

1. Delete the Pod by selecting **Delete**.  

1. Observe that the pod is deleted. Then a new pod is scheduled to replace it so that the workload maintains its configured scale of a single stateful pod.

1. Once the replacement pod is running, click **Execute Shell**.

1. Inspect the contents of the directory where the volume is mounted by entering `ls -l /<volumeMountPoint>`. Note that the file you created earlier is still present.

    ![workload-persistent-data]({{< baseurl >}}/img/rancher/workload-persistent-data.png)

## Why to Use StatefulSets Instead of Deployments

You should always use [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) for workloads consuming vSphere storage, as this resource type is designed to address a VMDK block storage caveat.

Since vSphere volumes are backed by VMDK block storage, they only support an [access mode](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) of `ReadWriteOnce`. This setting restricts the volume so that it can only be mounted to a single pod at a time, unless all pods consuming that volume are co-located on the same node. This behavior makes a deployment resource unusable for scaling beyond a single replica if it consumes vSphere volumes.

Even using a deployment resource with just a single replica may result in a deadlock situation while updating the deployment. If the updated pod is scheduled to a node different from where the existing pod lives, it will fail to start because the VMDK is still attached to the other node.

## Related Links

- [vSphere Storage for Kubernetes](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
