---
title: Adding a Sidecar
weight: 3029
---
A _sidecar_ is a container that extends or enhances the main container in a pod. The main container and the sidecar share a pod, and therefore share the same network space and storage. You can add sidecars to existing workloads by using the **Add a Sidecar** option.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to add a sidecar and click **Explore**.
1. In the left navigation bar, click **Workload**.

1. Find the workload that you want to extend. Select **⋮ > + Add Sidecar**.

1. Enter a **Name** for the sidecar.

1. In the **General** section, select a sidecar type. This option determines if the sidecar container is deployed before or after the main container is deployed.

    - **Standard Container:**

        The sidecar container is deployed after the main container.

    - **Init Container:**

        The sidecar container is deployed before the main container.

1. From the **Container Image** field, enter the name of the container image that you want to deploy in support of the main container. During deployment, Rancher pulls this image from [Docker Hub](https://hub.docker.com/explore/). Enter the name exactly as it appears on Docker Hub.

1. Set the remaining options. You can read about them in [Deploying Workloads](../deploy-workloads).

1. Click **Launch**.

**Result:** The sidecar is deployed according to your parameters. Following its deployment, you can view the sidecar by selecting **⋮ icon (...) > Edit** for the main deployment.

## Related Links

- [The Distributed System ToolKit: Patterns for Composite Containers](https://kubernetes.io/blog/2015/06/the-distributed-system-toolkit-patterns/)
