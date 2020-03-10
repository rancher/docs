---
title: Enable Istio with Pod Security Policies
---

 >**Note:** The following guide is only for RKE provisioned clusters

If you have restrictive Pod Security Policies enabled, then istio may not be able to function correctly as it needs certain permissions in order to install itself and manage pod infrastructure. In this section we will configure a cluster with PSP's enabled for an Istio install, and also setup the Istio CNI plugin. 

The Istio CNI plugin removes the need for each application pod to have a priveleged `NET_ADMIN` container. For further information see the [Istio CNI Plugin docs](https://istio.io/docs/setup/additional-setup/cni). Please note that the [Istio CNI Plugin is in alpha](https://istio.io/about/feature-stages/).

#### Allow access to iptables

Configure the cluster to allow the CNI plugin to set networking rules via iptables modules

1. From the **Global** view, navigate to the **cluster** where you want to enable Istio.
1. Select the **Ellipsis (...) > Edit**.
1. Click "Edit as YAML", find the services block and edit to include:

```
services:
  kubelet:
    extra_binds:
      - '/lib/modules:/lib/modules'
```

#### Configure the System Project Policy to allow Istio install

1. From the main menu of the **Dashboard**, select **Projects/Namespaces**.
1. Find the **Project: System** project and select the **Ellipsis (...) > Edit**.
1. Change the Pod Security Policy option to be unrestricted, then click Save.


#### Install the CNI Plugin in the System Project

1. From the main menu of the **Dashboard**, select **Projects/Namespaces**.
1. Select the **Project: System** project.
1. Choose **Tools > Catalogs** in the navigation bar.
1. Add a catalog with the following:
	1. Name: istio-cni
	1. Catalog URL: https://github.com/istio/cni
	1. Branch: The branch that matches your current release, for example: `release-1.4`.
1. From the main menu select **Apps**
1. Click Launch and select istio-cni
1. Update the namespace to be "kube-system"
1. In the answers section, click "Edit as YAML", and paste in the following:
```
---
  logLevel: "info"
  excludeNamespaces:
    - "istio-system"
    - "kube-system"
```
1. Click Launch

#### Install Istio

Follow the [primary instructions]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/tools/istio/setup/enable-istio-in-cluster/), adding a custom answer: `istio_cni.enabled: true`.

After Istio has finished installing, the Apps page in System Projects should show both istio and istio-cni applications deployed successfully. Sidecar injection will now be functional.
