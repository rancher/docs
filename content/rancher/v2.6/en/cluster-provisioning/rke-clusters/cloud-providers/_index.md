---
title: Setting up Cloud Providers
weight: 2300
aliases:
  - /rancher/v2.5/en/concepts/clusters/cloud-providers/
  - /rancher/v2.5/en/cluster-provisioning/rke-clusters/options/cloud-providers
---
A _cloud provider_ is a module in Kubernetes that provides an interface for managing nodes, load balancers, and networking routes. For more information, refer to the [official Kubernetes documentation on cloud providers.](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/)

When a cloud provider is set up in Rancher, the Rancher server can automatically provision new nodes, load balancers or persistent storage devices when launching Kubernetes definitions, if the cloud provider you're using supports such automation.

Your cluster will not provision correctly if you configure a cloud provider cluster of nodes that do not meet the prerequisites.

By default, the **Cloud Provider** option is set to `None`.

The following cloud providers can be enabled:

* Amazon
* Azure
* GCE (Google Compute Engine)
* vSphere

### Setting up the Amazon Cloud Provider

For details on enabling the Amazon cloud provider, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/amazon)

### Setting up the Azure Cloud Provider

For details on enabling the Azure cloud provider, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/azure)

### Setting up the GCE Cloud Provider

For details on enabling the Google Compute Engine cloud provider, refer to [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/cloud-providers/gce)

### Setting up the vSphere Cloud Provider

For details on enabling the vSphere cloud provider, refer to [this page.](./vsphere)

### Setting up a Custom Cloud Provider

The `Custom` cloud provider is available if you want to configure any [Kubernetes cloud provider](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/).

For the custom cloud provider option, you can refer to the [RKE docs]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/) on how to edit the yaml file for your specific cloud provider. There are specific cloud providers that have more detailed configuration :

* [vSphere]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/vsphere/)
* [OpenStack]({{<baseurl>}}/rke/latest/en/config-options/cloud-providers/openstack/)
