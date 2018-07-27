---
title: vSphere Storage
weight: 3055
aliases:
  - /rancher/v2.x/en/tasks/clusters/adding-storage/provisioning-storage/vsphere/
---

>**Prerequisites:**
>
>- Provisioning vSphere volumes requires the corresponding cloud provider to be enabled in the cluster, if you are having [Rancher provision Kubernetes for your cluster]({{< baseurl>}}/cluster-provisioning/rke-clusters/), please make sure to set the [cluster options]({{< baseurl >}}/http://localhost:9001/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/) with the [vSphere cloud provider]({{< baseurl >}}/rke/v0.1.x/en/config-options/cloud-providers/vsphere).

The recommended approach for providing vSphere storage to stateful workloads is creating a vSphereVolume [storage class]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/#storage-classes). This allows for dynamic provisioning of vSphere storage when workloads request volumes trough a [persistent volume claim]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/volumes-and-storage/persistent-volume-claims/).

## Steps

Let's walk through the steps of creating the storage class and then deploy a stateful workload in the Rancher UI.

> **Note:**
>
> These steps can also be performed using the `kubectl` command line tool. See [Kubernetes documentation on persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) for details.

### Create A Storage Class

Storage classes for vSphereVolumes may be created with a number of different properties. Refer to the [vSphere  documentation](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/storageclass.htm) for the available options.

1. Navigate to **Storage** > **Storage Classes** while on the cluster level in the Rancher UI.
2. Click on **Add Class**.
3. Assign a **Name** and select **VMWare vSphere Volume** under **Provisioner**.

    ![vsphere-storage-class]({{< baseurl >}}/img/rancher/vsphere-storage-class.png)

4. Click **Save**.

### Create a Workload with a vSphere Volume

1. Navigate to a project in your cluster and under **Workloads** click on **Deploy**.
2. Under **Workload Type** click **More Options** and select **Stateful set of 1 pod**.
3. Assing a **Name** and Docker image.
4. Expand the **Volumes** section and click **Add Volume**.
5. Choose **Add a new persistent volume (claim)**. This will implicitly create the claim once you deploy the workload.
6. Assign a **Name** for the claim, ie. `test-volume` and select the vSphere storage class created in the previous step.
7. Enter the required **Capacity** for the volume. Then click **Define**.

    ![workload-add-volume]({{< baseurl >}}/img/rancher/workload-add-volume.png)

8. Assign a path in the **Mount Point** field. This is the full path where the volume will be mounted in the container file system, e.g. `/persistent`.
9. Click **Launch** to create the workload.

### Verify Persistence of the Volume

1. In the context menu for the created workload, click on **Execute Shell**.
2. Note the directory in the root (in this case `/persistent`) where the volume has been mounted to.
3. Create a file in the volume by executing the command `touch /<volumeMountPoint>/data.txt`.
4. **Close** the shell window.
5. Click on the name of the workload to reveal detail information.
6. Open the context menu next to the Pod in the *Running* state.
7. Delete the Pod by selecting **Delete** and confirming the prompt.
8. Observe how Kubernetes takes care of deleting it, then schedules a replacement pod in order to satsify the desired scale of the workload (= 1 replica).
10. Once the replacement pod is running, click on **Execute Shell** for it.
11. Inspect the content of the directory where the volume is mounted, ie. `ls -l /<volumeMountPoint>`. Note how the `file that was created in the now deleted pod is still present.

    ![workload-persistent-data]({{< baseurl >}}/img/rancher/workload-persistent-data.png)

## Why you should use StatefulSets and not Deployments

Since vSphere volumes are backed by VMDK block storage they only support an [access mode](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) of `ReadWriteOnce`, meaning that the volume can only be mounted to a single pod at a time, unless all pods consuming that volume are colocated on the same node. This makes a deployment resource unusable for scaling beyond a single replica if it consumes vSphere volumes.

Even using a deployment resource with just a single replica may result in a deadlock situation while updating the deployment: If the updated pod is scheduled to a node different from where the existing pod lives, it will fail to start because the VMDK is still attached to the other node.

That being said: You should always use [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) for workloads consuming vSphere storage as this resource type has been designed to handle the caveats of `ReadWriteOnce` volumes.

## Related Links

- [vSphere Storage for Kubernetes](https://vmware.github.io/vsphere-storage-for-kubernetes/documentation/)
- [Kubernetes Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
