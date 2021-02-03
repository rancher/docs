---
title: Enable out-of-tree vSphere CPI and CSI on a new cluster
weight: 28
---

Kubernetes is moving away from maintaining cloud providers in-tree. vSphere has an out-of-tree cloud provider that can be used by installing the vSphere Cloud Provider and Cloud Storage plugins. This page covers how to install the CPI and CSI plugins after bringing up a cluster.

## Pre-requisites
1. vSphere version must be 6.7U3 or higher. 

## Installation steps

1. The Cloud Provider Interface (CPI) should be installed first before installing the Cloud Storage Interface (CSI).
2. On the Clusters page, click on **Add Cluster** and select the **vSphere** option.
3. Under **Cluster Options** -> **In-Tree Cloud Provider** select **External**. Click **Create**.
4. Installing the CPI plugin
	1. Within a project, go to **Apps** -> **Launch** and select the **vsphere-cpi** chart from the **helm3-library** catalog. Fill out the required vCenter details.
	2. vSphere CPI initializes all nodes with ProviderID which is needed by the vSphere CSI driver. Check if all nodes are initialized with the ProviderID before installing CSI driver with the following command
	```
	kubectl describe nodes | grep "ProviderID"
	```
5. Installing the CSI plugin
	1. Within a project, go to **Apps** -> **Launch** and select the **vsphere-csi** chart from the **helm3-library** catalog and fill out the required vCenter details.
	2. Set **Enable CSI Migration** to **false**.
	3. This chart creates a StorageClass with the `csi.vsphere.vmware.com` as the provisioner. Fill out the details for the StorageClass and launch the chart.


## Using the CSI driver for provisioning volumes
1. The CSI chart by default creates a storageClass. If that option was not selected while launching the chart, create a storageClass with the `csi.vsphere.vmware.com` as the provisioner.
2. All volumes provisioned using this storageClass will get provisioned by the CSI driver.