---
title: Adding a Persistent Volume Claim
weight: 100
---

_Persistent Volume Claims_ (or PVCs) are objects that request storage resources from your cluster. They're similar to a voucher that your deployment can redeem for storage access. When you create a deployment, you should usually attach a PVC so that your application can lay claim to persistent storage. This claim lets your deployment application store its data in an external location, so that if one of the application's containers fails, it can be replaced with a new container and continue accessing its data stored externally, as though an outage never occured.

- Rancher lets you create as many PVCs within a project as you'd like.
- You can mount PVCs to a deployment as you create it, or later after its running.
- Each Rancher project contains a list of PVCs that you've created, available from the **Volumes** tab. You can reuse these PVCs when creating deployments in the future.

>**Prerequisite:**
> You must have a pre-provisioned [persistent volume]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/adding-storage/#adding-a-persistent-volume) available for use, or you must have a [storage class created]({{< baseurl >}}/rancher/v2.x/en/tasks/clusters/adding-storage/#adding-storage-classes) that dynamically creates a volume upon request from the workload.

1. From the **Global** view, open the project containing a workload that you want to add a PVC to.

1. From the main menu, make sure that **Workloads** is selected. Then select the **Volumes** tab. Click **Add Volume**.

1. Enter a **Name** for the volume claim.

1. Select the **Namespace** of the volume claim.

1. Select a **Source** option:

    - **To dynamically provision a storage volume for the deployment:**

        1. Choose **Use a Storage Class to provision a new persistent volume**

        1. From the **Storage Class** drop-down, choose a pre-created storage class.

        1. Enter a volume **Capacity**.

    - **To use an existing persistent volume:**

        1. Choose **Use an existing persistent volume:**

        1. From the **Persistent Volume** drop-down, choose a pre-created persistent volume.

7. **Optional:** From **Customize**, select the [Access Modes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes) that you want to use.

**Result:** Your PVC is created. You can now attach it to any workload in the project.

