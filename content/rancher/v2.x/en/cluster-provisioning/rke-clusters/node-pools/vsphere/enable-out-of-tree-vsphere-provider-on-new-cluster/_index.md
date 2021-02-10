---
title: Enable Out-of-tree vSphere CPI and CSI on a New Cluster
weight: 4
---
_Available as of v2.5.6_

Kubernetes is moving away from maintaining cloud providers in-tree. vSphere has an out-of-tree cloud provider that can be used by installing the vSphere cloud provider and cloud storage plugins.

This page covers how to install the CPI and CSI plugins after bringing up a cluster.

# Prerequisites

The vSphere version must be 6.7U3 or higher. 

# Installation

The Cloud Provider Interface (CPI) should be installed first before installing the Cloud Storage Interface (CSI).

### 1. Create a vSphere custer

1. On the Clusters page, click on **Add Cluster** and select the **vSphere** option.
1. Under **Cluster Options > In-Tree Cloud Provider** select **External**.
1. Click **Create**.

### 2. Install the CPI plugin

1. Within a project, go to **Apps > Launch** and select the **vsphere-cpi** chart from the **helm3-library** catalog. Fill out the required vCenter details.
1. vSphere CPI initializes all nodes with ProviderID which is needed by the vSphere CSI driver. Check if all nodes are initialized with the ProviderID before installing CSI driver with the following command:

	```
	kubectl describe nodes | grep "ProviderID"
	```

### 3. Installing the CSI plugin

1. Within a project, go to **Apps > Launch** and select the **vsphere-csi** chart from the **helm3-library** catalog. Fill out the required vCenter details.
2. Set **Enable CSI Migration** to **false**.
3. This chart creates a StorageClass with the `csi.vsphere.vmware.com` as the provisioner. Fill out the details for the StorageClass and launch the chart.


# Using the CSI driver for provisioning volumes

The CSI chart by default creates a storageClass.

If that option was not selected while launching the chart, create a storageClass with the `csi.vsphere.vmware.com` as the provisioner.

All volumes provisioned using this StorageClass will get provisioned by the CSI driver.