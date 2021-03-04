---
title: Adding a Sidecar
weight: 3029
aliases:
  - /rancher/v2.5/en/tasks/workloads/add-a-sidecar/
  - /rancher/v2.5/en/k8s-in-rancher/workloads/add-a-sidecar
---
A _sidecar_ is a container that extends or enhances the main container in a pod. The main container and the sidecar share a pod, and therefore share the same network space and storage. You can add sidecars to existing workloads by using the **Add a Sidecar** option.

1. From the **Global** view, open the project running the workload you want to add a sidecar to.

1. Click **Resources > Workloads.**

1. Find the workload that you want to extend. Select **&#8942; icon (...) > Add a Sidecar**.

1. Enter a **Name** for the sidecar.

1. Select a **Sidecar Type**. This option determines if the sidecar container is deployed before or after the main container is deployed.

    - **Standard Container:**

        The sidecar container is deployed after the main container.

    - **Init Container:**

        The sidecar container is deployed before the main container.

1. From the **Docker Image** field, enter the name of the Docker image that you want to deploy in support of the main container. During deployment, Rancher pulls this image from [Docker Hub](https://hub.docker.com/explore/). Enter the name exactly as it appears on Docker Hub.

1. Set the remaining options. You can read about them in [Deploying Workloads](../deploy-workloads).

1. Click **Launch**.

**Result:** The sidecar is deployed according to your parameters. Following its deployment, you can view the sidecar by selecting **&#8942; icon (...) > Edit** for the main deployment.

## Related Links

- [The Distributed System ToolKit: Patterns for Composite Containers](https://kubernetes.io/blog/2015/06/the-distributed-system-toolkit-patterns/)
