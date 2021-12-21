---
title: Helm Charts in Rancher
weight: 11
---

In this section, you'll learn how to manage Helm chart repositories and applications in Rancher. Helm chart repositories are managed using **Apps & Marketplace**. It uses a catalog-like system to import bundles of charts from repositories and then uses those charts to either deploy custom Helm applications or Rancher's tools such as Monitoring or Istio. Rancher tools come as pre-loaded repositories which deploy as standalone Helm charts. Any additional repositories are only added to the current cluster.

### Charts

From the top-left menu select _"Apps & Marketplace"_ and you will be taken to the Charts page.

The charts page contains all Rancher, Partner, and Custom Charts.

* Rancher tools such as Logging or Monitoring are included under the Rancher label
* Partner charts reside under the Partners label
* Custom charts will show up under the name of the repository

All three types are deployed and managed in the same way.

> Apps managed by the Cluster Manager (the global view in the legacy Rancher UI) should continue to be managed only by the Cluster Manager, and apps managed with <b>Apps & Marketplace</b> in the new UI must be managed only by <b>Apps & Marketplace</b>.

### Repositories

From the left sidebar select _"Repositories"_.

These items represent helm repositories, and can be either traditional helm endpoints which have an index.yaml, or git repositories which will be cloned and can point to a specific branch. In order to use custom charts, simply add your repository here and they will become available in the Charts tab under the name of the repository.


### Helm Compatibility

Only Helm 3 compatible charts are supported.


### Deployment and Upgrades

From the _"Charts"_ tab select a Chart to install. Rancher and Partner charts may have extra configurations available through custom pages or questions.yaml files, but all chart installations can modify the values.yaml and other basic settings. Once you click install, a Helm operation job is deployed, and the console for the job is displayed.

To view all recent changes, go to the _"Recent Operations"_ tab. From there you can view the call that was made, conditions, events, and logs.

After installing a chart, you can find it in the _"Installed Apps"_ tab. In this section you can upgrade or delete the installation, and see further details. When choosing to upgrade, the form and values presented will be the same as installation.

Most Rancher tools have additional pages located in the toolbar below the _"Apps & Marketplace"_ section to help manage and use the features. These pages include links to dashboards, forms to easily add Custom Resources, and additional information.

> If you are upgrading your chart using _"Customize Helm options before upgrade"_ , please be aware that using the _"--force"_ option may result in errors if your chart has immutable fields. This is because some objects in Kubernetes cannot be changed once they are created. To ensure you do not get this error you can:
> 
>  * use the default upgrade option ( i.e do not use _"--force"_ option )
>  * uninstall the existing chart and install the upgraded chart
>  * delete the resources with immutable fields from the cluster before performing the _"--force"_ upgrade

#### Changes in Rancher v2.6.3

The upgrade button has been removed for legacy apps from the **Apps & Marketplace > Installed Apps** page.

If you have a legacy app installed and want to upgrade it:

- The legacy [feature flag]({{<baseurl>}}/rancher/v2.6/en/installation/resources/feature-flags/) must be turned on (if it's not turned on automatically because of having a legacy app before upgrading)
- You can upgrade the app from cluster explorer, from the left nav section **Legacy > Project > Apps**
- For multi-cluster apps, you can go to **≡ > Multi-cluster Apps** and upgrade the app from there