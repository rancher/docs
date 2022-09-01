---
title: Configuring Persistent Data for Pipeline Components
weight: 600
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The pipelines' internal Docker registry and the Minio workloads use ephemeral volumes by default. This default storage works out-of-the-box and makes testing easy, but you lose the build images and build logs if the node running the Docker Registry or Minio fails. In most cases this is fine. If you want build images and logs to survive node failures, you can configure the Docker Registry and Minio to use persistent volumes.

This section assumes that you understand how persistent storage works in Kubernetes. For more information, refer to the section on [how storage works.](../../how-to-guides/advanced-user-guides/manage-clusters/create-kubernetes-persistent-storage/manage-persistent-storage/about-persistent-storage.md)

:::note Prerequisites for both parts A and B:

[Persistent volumes](../../pages-for-subheaders/create-kubernetes-persistent-storage.md) must be available for the cluster.

:::

### A. Configuring Persistent Data for Docker Registry

1.  Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. Click **Workload**.

1. Find the `docker-registry` workload and select **⋮ > Edit**.

1. Scroll to the **Volumes** section and expand it. Make one of the following selections from the **Add Volume** menu, which is near the bottom of the section:

    - **Add Volume > Add a new persistent volume (claim)**
    - **Add Volume > Use an existing persistent volume (claim)**

1.  Complete the form that displays to choose a persistent volume for the internal Docker registry.
    <Tabs>
      <TabItem value="Add a new persistent volume">

        1. Enter a **Name** for the volume claim.
        1. Select a volume claim **Source**:
            - If you select **Use a Storage Class to provision a new persistent volume**, select a storage class and enter a **Capacity**.
            - If you select **Use an existing persistent volume**, choose a **Persistent Volume** from the drop-down.
        1. From the **Customize** section, choose the read/write access for the volume.
        1. Click **Define**.

      </TabItem>
      <TabItem value="Use an existing persistent volume">

        1. Enter a **Name** for the volume claim.
        1. Choose a **Persistent Volume Claim** from the dropdown.
        1. From the **Customize** section, choose the read/write access for the volume.
        1. Click **Define**.

      </TabItem>
    </Tabs>

1. From the **Mount Point** field, enter `/var/lib/registry`, which is the data storage path inside the Docker registry container.

1. Click **Upgrade**.

### B. Configuring Persistent Data for Minio

1.  Click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **Explore**.
1. Click **Workload**.
1. Go to the `minio` workload and select **⋮ > Edit**.

1. Scroll to the **Volumes** section and expand it. Make one of the following selections from the **Add Volume** menu, which is near the bottom of the section:

    - **Add Volume > Add a new persistent volume (claim)**
    - **Add Volume > Use an existing persistent volume (claim)**

1.  Complete the form that displays to choose a persistent volume for the internal Docker registry.
    <Tabs>
      <TabItem value="Add a new persistent volume">

        1. Enter a **Name** for the volume claim.
        1. Select a volume claim **Source**:
            - If you select **Use a Storage Class to provision a new persistent volume**, select a storage class and enter a **Capacity**.
            - If you select **Use an existing persistent volume**, choose a **Persistent Volume** from the drop-down.
        1. From the **Customize** section, choose the read/write access for the volume.
        1. Click **Define**.

      </TabItem>
      <TabItem value="Use an existing persistent volume">

        1. Enter a **Name** for the volume claim.
        1. Choose a **Persistent Volume Claim** from the drop-down.
        1. From the **Customize** section, choose the read/write access for the volume.
        1. Click **Define**.

      </TabItem>
    </Tabs>

1. From the **Mount Point** field, enter `/data`, which is the data storage path inside the Minio container.

1. Click **Upgrade**.

**Result:** Persistent storage is configured for your pipeline components.
