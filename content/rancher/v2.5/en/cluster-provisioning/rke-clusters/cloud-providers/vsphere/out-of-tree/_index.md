---
title: How to Configure Out-of-tree vSphere Cloud Provider
shortTitle: Out-of-tree Cloud Provider
weight: 10
---
_Available as of v2.5+_

Kubernetes is moving away from maintaining cloud providers in-tree. vSphere has an out-of-tree cloud provider that can be used by installing the vSphere cloud provider and cloud storage plugins.

This page covers how to install the Cloud Provider Interface (CPI) and Cloud Storage Interface (CSI) plugins after bringing up a cluster.

# Prerequisites

The vSphere version must be 7.0u1 or higher. 

The Kubernetes version must be 1.19 or higher.

Using the vSphere out-of-tree cloud provider requires Linux nodes and is not supported on Windows.

# Installation

The Cloud Provider Interface (CPI) should be installed first before installing the Cloud Storage Interface (CSI).

### 1. Create a vSphere cluster

1. On the Clusters page, click on **Add Cluster** and select the **vSphere** option or **Existing Nodes** option.
1. Under **Cluster Options > Cloud Provider** select **External (Out-of-tree)**. This sets the cloud provider option on the Kubernetes cluster to `external` which sets your Kubernetes cluster up to be configured with an out-of-tree cloud provider. 
1. Finish creating your cluster.

### 2. Install the CPI plugin
 
1. From the **Cluster Explorer** view, go to the top left dropdown menu and click **Apps & Marketplace.**
1. Select the **vSphere CPI** chart. Fill out the required vCenter details.
1. vSphere CPI initializes all nodes with ProviderID which is needed by the vSphere CSI driver. Check if all nodes are initialized with the ProviderID before installing CSI driver with the following command:

	```
	kubectl describe nodes | grep "ProviderID"
	```

### 3. Installing the CSI plugin

 1. From the **Cluster Explorer** view, go to the top left dropdown menu and click **Apps & Marketplace.**
1. Select the **vSphere CSI** chart. Fill out the required vCenter details.
2. Set **Enable CSI Migration** to **false**.
3. This chart creates a StorageClass with the `csi.vsphere.vmware.com` as the provisioner. Fill out the details for the StorageClass and launch the chart.


# Using the CSI driver for provisioning volumes

The CSI chart by default creates a storageClass.

If that option was not selected while launching the chart, create a storageClass with the `csi.vsphere.vmware.com` as the provisioner.

All volumes provisioned using this StorageClass will get provisioned by the CSI driver.
