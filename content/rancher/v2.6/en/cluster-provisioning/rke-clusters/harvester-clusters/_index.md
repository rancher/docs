---
title: Launching Kubernetes on Harvester Clusters
weight: 2250
---

# Harvester Integration with Rancher v2.6.1

_Tech Preview_

New in Rancher v2.6.1, [Harvester](https://docs.harvesterhci.io/v0.3/rancher/rancher-integration/) is an open-source hyper-converged infrastructure (HCI) software built on Kubernetes. Harvester installs on bare metal server clusters and provides integrated virtualization and distributed storage capabilities. Although Harvester operates using Kubernetes, it does not require users to know Kubernetes concepts, making it a more user-friendly application. For more information on Harvester docs, go [here](https://docs.harvesterhci.io/v0.3/).

* [Installation](#installation)
* [Modes of Operation](#modes-of-operation)
* [Feature Flag](#feature-flag)
* [Filtering Harvester Clusters](#filtering-harvester-clusters)
* [Other Capabilities in Harvester Clusters](#other-capabilities-in-harvester-clusters)

### Installation

Harvester may be installed from [ISO](https://docs.harvesterhci.io/v0.3/install/iso-install/). Users may create new clusters or add a current node into an existing cluster during installation. Harvester will then automatically create a cluster based on the given information.

### Modes of Operation

**HCI:** The Harvester cluster may be attached to another cluster as a virtual machine (VM) hosting node
**Helm application:** A Helm application may be deployed into an existing Kubernetes cluster. The application can be installed and operated via a Helm chart and `custom resource definitions` (CRDs), providing the Rancher node with more flexibility.

### Feature Flag

The Harvester feature flag is used to manage access to the Virtualization Management (VM) page in Rancher where users can navigate directly to Harvester clusters and access the Harvester UI. The Harvester feature flag is enabled by default. Users must have access to provisioning clusters and have the Harvester feature flag enabled in order to see the Virtualization Management link. 

To navigate to the Harvester cluster, click **☰ > Virtualization Management > Harvester Listing Page.** From there, click one of the clusters listed to go to the single Harvester cluster view. 

### Filtering Harvester Clusters

With the Harvester integration, Harvester clusters can now be imported into Rancher as a `cluster of type` Harvester. Harvester host cluster = Kubernetes `cluster of type` Harvester. 

* **Importing Clusters:** Users may import a Harvester cluster only on the Virtualization Management page. Importing a cluster on the Cluster Management page is not supported, and a warning will advise you to return to the VM page to do so. 

* **Creating Clusters:** Users may create a Harvester cluster only from the Cluster Management page. Once you have created the cluster, you will then go to the Virtualization Management page to continue.

* **Enabled Feature Flag:** If the Harvester feature flag is enabled, users will need to filter Harvester host clusters from any pages or apps (such as Fleet, multi-cluster app) that list Kubernetes clusters.

* **Disabled Feature Flag:** If the Harvester feature flag is disabled, and a Harvester cluster is imported, the Harvester cluster will be shown in the Rancher `multi-cluster-management` (MCM) list. Harvester clusters will only be shown on the MCM list when the feature flag is off.

### Harvester Node Driver

The [Harvester node driver](https://docs.harvesterhci.io/v0.3/rancher/node-driver/) is marked as `tech preview` on RKE and RKE2 options in Rancher. This will be the case both on the Create page and once the driver is already enabled.

### Other Capabilities in Harvester clusters

* RBAC and enterprise authentication to log into Harvester clusters
* Rancher Projects in Harvester so teams can keep their VMs separate and organized
* Provisioning of Kubernetes clusters on Harvester. Users can use Harvester's built-in CSI driver and load balancer for their Kubernetes workloads (cloud provider).