---
title: How to Configure Out-of-tree vSphere Cloud Provider
shortTitle: Out-of-tree Cloud Provider
weight: 10
---

Kubernetes is moving away from maintaining cloud providers in-tree. vSphere has an out-of-tree cloud provider that can be used by installing the vSphere cloud provider and cloud storage plugins.

This page covers how to install the Cloud Provider Interface (CPI) and Cloud Storage Interface (CSI) plugins after bringing up a cluster.

# Prerequisites

The vSphere versions supported:

* 6.7u3
* 7.0u1 or higher. 

The Kubernetes version must be 1.19 or higher.

Using the vSphere out-of-tree cloud provider requires Linux nodes and is not supported on Windows.

# Installation

The Cloud Provider Interface (CPI) should be installed first before installing the Cloud Storage Interface (CSI).

### 1. Create a vSphere cluster

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create**.
1. Click **VMware vSphere** or **Custom**.
1. On the **Basics** tab in the **Cluster Configuration** section, set the **Cloud Provider** to **vSphere**.
1. In the **Add-On Config** tab, the vSphere Cloud Provider (CPI) and Storage Provider (CSI) options.
1. Finish creating your cluster.

### 2. Install the CPI plugin
 
1. Click **☰ > Cluster Management**.
1. Go to the cluster where the vSphere CPI plugin will be installed and click **Explore**.
1. Click **Apps & Marketplace > Charts**.
1. Click **vSphere CPI**.
1. Fill out the required vCenter details.
1. vSphere CPI initializes all nodes with ProviderID which is needed by the vSphere CSI driver. Check if all nodes are initialized with the ProviderID before installing CSI driver with the following command:

    ```
    kubectl describe nodes | grep "ProviderID"
    ```

### 3. Installing the CSI plugin

1. Click **☰ > Cluster Management**.
1. Go to the cluster where the vSphere CSI plugin will be installed and click **Explore**.
1. Click **Apps & Marketplace > Charts**.
1. Click **vSphere CSI**.
1. Click **Install**.
1. Fill out the required vCenter details. On the **Features** tab, set **Enable CSI Migration** to **false**.
3. On the **Storage** tab, fill out the details for the StorageClass. This chart creates a StorageClass with the `csi.vsphere.vmware.com` as the provisioner. 
1. Click **Install**.


# Using the CSI driver for provisioning volumes

The CSI chart by default creates a storageClass.

If that option was not selected while launching the chart, create a storageClass with the `csi.vsphere.vmware.com` as the provisioner.

All volumes provisioned using this StorageClass will get provisioned by the CSI driver.
