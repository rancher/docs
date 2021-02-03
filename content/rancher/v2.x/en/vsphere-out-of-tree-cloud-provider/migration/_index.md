---
title: Migrating vSphere in-tree volumes to CSI
weight: 28
---

Kubernetes is moving away from maintaining cloud providers in-tree. vSphere has an out-of-tree cloud provider that can be used by installing the vSphere Cloud Provider and Cloud Storage plugins. This page covers how to migrate from the in-tree vSphere cloud provider to out-of-tree, and manage the existing VMs post migration. It follows the steps provided in the official [vSphere migration documentation](https://vsphere-csi-driver.sigs.k8s.io/features/vsphere_csi_migration.html) and provides the steps to be performed in Rancher.

## Note
Existing volumes that were provisioned using the following cloud-config format will NOT get migrated due to an existing bug in vsphere CSI.
If the cloud-config has this format for datastore and resource pool path, vsphere CSI driver cannot recognize it
```
default-datastore: </datacenter>/datastore/<default-datastore-name>
resourcepool-path: "</datacenter>/host/<cluster-name>/Resources/<resource-pool-name>"
```
Volumes provisioned with in-tree provider using following format will get migrated correctly
```
default-datastore: <default-datastore-name>
resourcepool-path: "<cluster-name>/Resources/<resource-pool-name>"
```
Upstream bug: https://github.com/kubernetes-sigs/vsphere-csi-driver/issues/628
Rancher issue tracking this bug: https://github.com/rancher/rancher/issues/31105

## Pre-requisites
1. vSphere CSI Migration requires vSphere 7.0u1. In order to be able to manage exsiting in-tree vSphere volumes, upgrade vSphere to 7.0u1
2. Kubernetes version must be 1.19 or higher.

## Migration

1. If vSphere version is less that 7.0u1, upgrade vSphere to 7.0u1 or higher.
4. Install the CPI plugin
	1. Before installing CPI, we need to taint all nodes with `node.cloudprovider.kubernetes.io/uninitialized=true:NoSchedule`. This can be done by running the following commands
	```
	curl -O https://raw.githubusercontent.com/rancher/helm3-charts/56b622f519728378abeddfe95074f1b87ab73b1e/charts/vsphere-cpi/taints.sh 
	OR
	wget https://raw.githubusercontent.com/rancher/helm3-charts/56b622f519728378abeddfe95074f1b87ab73b1e/charts/vsphere-cpi/taints.sh
	chmod +x taints.sh
	./taints.sh <path_to_kubeconfig if running the command outside the cluster> 
	```
	2. Once all nodes are tainted by the running the script, launch the Helm vSphere CPI chart. Within a project, select **Apps** -> **Launch** and select the **vsphere-cpi** chart from the **helm3-library** catalog. Fill out the required vCenter details and click **Launch**.
	3. vSphere CPI initializes all nodes with ProviderID which is needed by the vSphere CSI driver. Check if all nodes are initialized with the ProviderID before installing CSI driver with the following command
	```
	kubectl describe nodes | grep "ProviderID"
	```
3. Install the CSI driver
	1. Within a project, select **Apps** -> **Launch** and select the **vsphere-csi** chart from the **helm3-library** catalog. Fill out the required vCenter details and click **Launch**.
	2. Set **Enable CSI Migration** to **true**.
	3. This chart creates a StorageClass with the `csi.vsphere.vmware.com` as the provisioner. You can provide the URL of the datastore to be used for CSI volume provisioning while creating this storageClass. The datastore URL can be found in the vSphere client by selecting the datastore and going to the Summary tab. Fill out the details for the StorageClass and click **Launch**.
4. Edit the cluster to enable CSI migration feature flags. 
	1. While editing the cluster, if the Kubernetes version is less than 1.19, select Kubernetes version 1.19 or higher from the **Kubernetes Version** dropdown.
	2. For enabling feature flags, click on "Edit as YAML", and add the following under kube-controller and kubelet:
	```
	      extra_args:
        	feature-gates: "CSIMigration=true,CSIMigrationvSphere=true" 
	```
	Make following changes in the cluster.yaml
	<screenshot>
	3. Worker nodes must be drained during the upgrade before changing the kubelet and kube-controller-manager args. Click on "Edit as Form" and then click on "Advanced Options"
		1. Set the field **Maximum Worker Nodes Unavailable** to count of 1.
		2. To drain the nodes during upgrade, select **Drain Nodes** -> **Yes**. 
		3. Set **Force** and **Delete Local Data** to **true**.
	<screenshot>
	4. Click "Save" to upgrade the cluster.
