---
title: Helm Charts in Rancher
weight: 11
aliases:
  - /rancher/v2.x/en/helm-charts/apps-marketplace
  - /rancher/v2.5/en/catalog/
  - /rancher/v2.5/en/catalog/apps
  - /rancher/v2.5/en/catalog/launching-apps
---

In this section, you'll learn how to manage Helm chart repositories and applications in Rancher.

### Changes in Rancher v2.5

In Rancher v2.5, the Apps and Marketplace feature replaced the catalog system. 

In the cluster manager, Rancher uses a catalog system to import bundles of charts and then uses those charts to either deploy custom helm applications or Rancher's tools such as Monitoring or Istio. The catalog system is still available in the cluster manager in Rancher v2.5, but it is deprecated.

Now in the Cluster Explorer, Rancher uses a similar but simplified version of the same system. Repositories can be added in the same way that catalogs were, but are specific to the current cluster. Rancher tools come as pre-loaded repositories which deploy as standalone helm charts.

### Charts

From the top-left menu select _"Apps & Marketplace"_ and you will be taken to the Charts page. 

The charts page contains all Rancher, Partner, and Custom Charts. 

* Rancher tools such as Logging or Monitoring are included under the Rancher label
* Partner charts reside under the Partners label
* Custom charts will show up under the name of the repository

All three types are deployed and managed in the same way.

> Apps managed by the Cluster Manager should continue to be managed only by the Cluster Manager, and apps managed with the Cluster Explorer must be managed only by the Cluster Explorer.

### Repositories

From the left sidebar select _"Repositories"_. 

These items represent helm repositories, and can be either traditional helm endpoints which have an index.yaml, or git repositories which will be cloned and can point to a specific branch. In order to use custom charts, simply add your repository here and they will become available in the Charts tab under the name of the repository.


### Helm Compatibility

The Cluster Explorer only supports Helm 3 compatible charts. 


### Deployment and Upgrades

From the _"Charts"_ tab select a Chart to install. Rancher and Partner charts may have extra configurations available through custom pages or questions.yaml files, but all chart installations can modify the values.yaml and other basic settings. Once you click install, a Helm operation job is deployed, and the console for the job is displayed. 

To view all recent changes, go to the _"Recent Operations"_ tab. From there you can view the call that was made, conditions, events, and logs.

After installing a chart, you can find it in the _"Installed Apps"_ tab. In this section you can upgrade or delete the installation, and see further details. When choosing to upgrade, the form and values presented will be the same as installation.

Most Rancher tools have additional pages located in the toolbar below the _"Apps & Marketplace"_ section to help manage and use the features. These pages include links to dashboards, forms to easily add Custom Resources, and additional information. 
