---
title: Creating a vSphere Cluster
shortTitle: vSphere
description: Use Rancher to create a vSphere cluster. It may consist of groups of VMs with distinct properties which allow for fine-grained control over the sizing of nodes. 
weight: 2225
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-vsphere/
---
Use {{< product >}} to create a Kubernetes cluster in vSphere.

## Introduction

When creating a vSphere cluster, Rancher first provisions the specified amount of virtual machines by communicating with the vCenter API. Then it installs Kubernetes on top of them. A vSphere cluster may consist of multiple groups of VMs with distinct properties, such as the amount of memory or the number of vCPUs. This grouping allows for fine-grained control over the sizing of nodes for the data, control, and worker plane respectively.

>**Note:**
>The vSphere node driver included in Rancher currently only supports the provisioning of VMs with [RancherOS]({{< baseurl >}}/os/v1.x/en/) as the guest operating system.

## Prerequisites

### vSphere API permissions

Before proceeding to create a cluster, you must ensure that you have a vSphere user with sufficient permissions. If you are planning to make use of vSphere volumes for persistent storage in the cluster, there are [additional requirements]({{< baseurl >}}/rke/latest/en/config-options/cloud-providers/vsphere/) that must be met.

### Network permissions

You must ensure that the hosts running Rancher servers are able to establish network connections to the following network endpoints:

- vCenter server (usually port 443/TCP)
- Every ESXi host that is part of the datacenter to be used to provision virtual machines for your clusters (port 443/TCP).


## Provisioning a vSphere Cluster

The following steps create a role with the required privileges and then assign it to a new user in the vSphere console:

1. From the **vSphere** console, go to the **Administration** page.

2. Go to the **Roles** tab.

3. Create a new role.  Give it a name and select the privileges listed in the [permissions table](#annex-vsphere-permissions).

	![image]({{< baseurl >}}/img/rancher/rancherroles1.png)

4. Go to the **Users and Groups** tab.

5. Create a new user. Fill out the form and then click **OK**. Make sure to note the username and password, as you will need it when configuring node templates in Rancher.

	![image]({{< baseurl >}}/img/rancher/rancheruser.png)

6. Go to the **Global Permissions** tab.

7. Create a new Global Permission.  Add the user you created earlier and assign it the role you created earlier. Click **OK**.

	![image]({{< baseurl >}}/img/rancher/globalpermissionuser.png)

	![image]({{< baseurl >}}/img/rancher/globalpermissionrole.png)

## Creating vSphere Clusters

### Create a vSphere Node Template

To create a cluster, you need to create at least one vSphere [node template]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/#node-templates)  that specifies how VMs are created in vSphere.

>**Note:**
>Once you create a node template, it is saved, and you can re-use it whenever you create additional vSphere clusters.

1. Log in with an admin account to the Rancher UI.

2. From the user settings menu, select **Node Templates**.

3. Click **Add Template** and then click on the **vSphere** icon.

4. Under [Account Access](#account-access) enter the vCenter FQDN or IP address and the credentials for the vSphere user account (see [Prerequisites](#prerequisites)).

	{{< step_create-cloud-credential >}}

5. Under [Instance Options](#instance-options), configure the number of vCPUs, memory, and disk size for the VMs created by this template.

6. **Optional:** Enter the URL pointing to a [RancherOS]({{< baseurl >}}/os/v1.x/en/) cloud-config file in the [Cloud Init](#instance-options) field.

7. Ensure that the [OS ISO URL](#instance-options) contains the URL of a VMware ISO release for RancherOS (`rancheros-vmware.iso`).

	![image]({{< baseurl >}}/img/rancher/vsphere-node-template-1.png)

8. **Optional:** Provide a set of [Configuration Parameters](#instance-options) for the VMs.

9. Under **Scheduling**, enter the name/path of the **Data Center** to create the VMs in, the name of the **VM Network** to attach to, and the name/path of the **Datastore** to store the disks in.

	![image]({{< baseurl >}}/img/rancher/vsphere-node-template-2.png)

10. **Optional:** Assign labels to the VMs that can be used as a base for scheduling rules in the cluster.

11. **Optional:** Customize the configuration of the Docker daemon on the VMs that will be created.

10. Assign a descriptive **Name** for this template and click **Create**.

___

### Create a vSphere Cluster

After you've created a template, you can use it stand up the vSphere cluster itself.

1. From the **Global** view, click **Add Cluster**.

2. Choose **vSphere**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	![image]({{< baseurl >}}/img/rancher/vsphere-cluster-create-1.png)

7. Review your configuration, then click **Create**.

> **Note:**
> 
> If you have a cluster with DRS enabled, setting up [VM-VM Affinity Rules](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.resmgmt.doc/GUID-7297C302-378F-4AF2-9BD6-6EDB1E0A850A.html) is recommended. These rules allow VMs  assigned the etcd and control-plane roles to operate on separate ESXi hosts when they are assigned to different node pools. This practice ensures that the failure of a single physical machine does not affect the availability of those planes.

{{< result_create-cluster >}}

## Annex - Node Template Configuration Reference

The tables below describe the configuration options available in the vSphere node template.

### Account Access

| Parameter                | Required | Description |
|:------------------------:|:--------:|:------------------------------------------------------------:|
| vCenter or ESXi Server   |   *      | IP or FQDN of the vCenter or ESXi server used for managing VMs. |
| Port                     |   *      | Port to use when connecting to the server. Defaults to `443`.  |
| Username                 |   *      | vCenter/ESXi user to authenticate with the server. |
| Password                 |   *      | User's password. |

___

### Instance Options

| Parameter                | Required | Description |
|:------------------------:|:--------:|:------------------------------------------------------------:|
| CPUs                     |   *      | Number of vCPUS to assign to VMs. |
| Memory                   |   *      | Amount of memory to assign to VMs.  |
| Disk                     |   *      | Size of the disk (in MB) to attach to the VMs. |
| Cloud Init               |          | URL of a [RancherOS cloud-config]({{< baseurl >}}/os/v1.x/en/installation/configuration/) file to provision VMs with. This file allows further customization of the RancherOS operating system, such as network configuration, DNS servers, or system daemons.|
| OS ISO URL               |   *      | URL of a RancherOS vSphere ISO file to boot the VMs from. You can find URLs for specific versions in the [Rancher OS GitHub Repo](https://github.com/rancher/os). |
| Configuration Parameters |          | Additional configuration parameters for the VMs. These correspond to the [Advanced Settings](https://kb.vmware.com/s/article/1016098) in the vSphere console. Example use cases include providing RancherOS [guestinfo]({{< baseurl >}}/os/v1.x/en/installation/running-rancheros/cloud/vmware-esxi/#vmware-guestinfo) parameters or enabling disk UUIDs for the VMs (`disk.EnableUUID=TRUE`). |

___

### Scheduling Options

| Parameter                | Required | Description |
|:------------------------:|:--------:|:------------------------------------------------------------:|
| Data Center              |   *      | Name/path of the datacenter to create VMs in.          |
| Pool                     |          | Name/path of the resource pool to schedule the VMs in. If not specified, the default resource pool is used.  |
| Host                     |          | Name/path of the host system to schedule VMs in. If specified, the host system's pool will be used and the *Pool* parameter will be ignored. |
| Network                  |   *      | Name of the VM network to attach VMs to. |
| Data Store               |   *      | Datastore to store the VM disks. |
| Folder                   |          | Name/path of folder in the datastore to create the VMs in. Must already exist. |

___

## Annex - vSphere Permissions

The following table lists the permissions required for the vSphere user account configured in the node templates:

| Privilege Group       | Operations  |
|:----------------------|:-----------------------------------------------------------------------|
| Datastore             | AllocateSpace </br> Browse </br> FileManagement (Low level file operations) </br> UpdateVirtualMachineFiles </br> UpdateVirtualMachineMetadata |
| Network               | Assign |
| Resource              | AssignVMToPool |
| Virtual Machine       | Config (All) </br> GuestOperations (All) </br> Interact (All) </br> Inventory (All) </br> Provisioning (All) |
