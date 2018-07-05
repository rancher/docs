---
title: Adding a Sidecar
weight: 
draft: true
---
A _sidecar_ is a container that extends or enhances the main container in a pod. You can add sidecars to existing workloads by using the **Add a Sidecar** option.

1. From the **Global** view, open the project running the workload you want to add a sidecar to.

1. Select the **Workloads** tab.

1. Find the workload that you want to extend. Select **Ellipsis icon (...) > Add a Sidecar**.

1. Enter a **Name** for the sidecar.

1. Select a **Sidecar Type**. This option determines if the sidecar container is deployed before or after the main container is deployed.

    - **Standard Container:**
        
        The sidecar container is deployed after the main container.

    - **Init Container:**
        
        The sidecar container is deployed before the mainer container.

1. Set the remaining options. You can read about them in [Deploying Workloads](../deploy-workloads).

1. Click **Launch**.

**Result:** The sidecar is deployed according to your parameters. Following its deployment, you can view the sidecar by selecting **Ellipsis icon (...) > Edit** for the main deployment.
