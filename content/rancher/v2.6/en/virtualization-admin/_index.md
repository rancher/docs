---
title: Launching Kubernetes on Harvester Clusters
weight: 10
---

# Harvester Integration

##### _Tech Preview_

New in Rancher v2.6.1, [Harvester](https://docs.harvesterhci.io/v0.3/) is an open-source hyper-converged infrastructure (HCI) software built on Kubernetes. Harvester installs on bare metal server clusters and provides integrated virtualization and distributed storage capabilities. Although Harvester operates using Kubernetes, it does not require users to know Kubernetes concepts, making it a more user-friendly application.

### Feature Flag

The Harvester feature flag is used to manage access to the Virtualization Management (VM) page in Rancher where users can navigate directly to Harvester clusters and access the Harvester UI. The Harvester feature flag is enabled by default. Users must have access to provisioning clusters and have the Harvester feature flag enabled in order to see the Virtualization Management link. Click [here](https://rancher.com/docs/rancher/v2.6/en/installation/resources/feature-flags/) for more information on feature flags in Rancher.

To navigate to the Harvester cluster, click **☰ > Virtualization Management > Harvester Listing Page.** From there, click one of the clusters listed to go to the single Harvester cluster view. 

* If the Harvester feature flag is enabled, users will need to filter Harvester host clusters from any pages or apps (such as Fleet, multi-cluster app) that list Kubernetes clusters.

* If the Harvester feature flag is disabled, and a Harvester cluster is imported, the Harvester cluster will be shown in the Rancher `multi-cluster-management` (MCM) list. Harvester clusters will only be shown on the MCM list when the feature flag is off.

### Filtering Harvester Clusters

With the Harvester integration, Harvester clusters can now be imported into Rancher as a cluster type `Harvester`. 

* **Importing Clusters:** Users may import a Harvester cluster only on the Virtualization Management page. Importing a cluster on the Cluster Management page is not supported, and a warning will advise you to return to the VM page to do so. 

* **Creating Clusters:** Users may create an RKE or RKE2 cluster only from the Cluster Management page. Once you have created the cluster, you will then go to the Virtualization Management page to continue.

### Harvester Node Driver

The [Harvester node driver](https://docs.harvesterhci.io/v0.3/rancher/node-driver/) is marked as `tech preview` on RKE and RKE2 options in Rancher. This will be the case both on the Create page and once the driver is already enabled. Click [here](https://rancher.com/docs/rancher/v2.6/en/admin-settings/drivers/node-drivers/) for more information on node drivers in Rancher.