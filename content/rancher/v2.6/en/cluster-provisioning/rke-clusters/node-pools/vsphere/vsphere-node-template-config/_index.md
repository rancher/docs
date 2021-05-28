---
title: VSphere Node Template Configuration
weight: 2
aliases:
  - /rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/node-template-reference
  - /rancher/v2.5/en/cluster-provisionin/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/enabling-uuids
---

The following node template configuration reference applies to Rancher v2.3.3+.

- [Account Access](#account-access)
- [Scheduling](#scheduling)
- [Instance Options](#instance-options)
- [Networks](#networks)
- [Node tags and custom attributes](#node-tags-and-custom-attributes)
- [cloud-init](#cloud-init)

# Account Access

| Parameter                | Required | Description |
|:----------------------|:--------:|:-----|
| Cloud Credentials   |   *      | Your vSphere account access information, stored in a [cloud credential.]({{<baseurl>}}/rancher/v2.5/en/user-settings/cloud-credentials/)  |

Your cloud credential has these fields:

| Credential Field | Description |
|-----------------|--------------|
| vCenter or ESXi Server |  Enter the vCenter or ESXi hostname/IP. ESXi is the virtualization platform where you create and run virtual machines and virtual appliances. vCenter Server is the service through which you manage multiple hosts connected in a network and pool host resources. |
| Port | Optional: configure configure the port of the vCenter or ESXi server. |
| Username and password | Enter your vSphere login username and password. |

# Scheduling

Choose what hypervisor the virtual machine will be scheduled to. 

The fields in the **Scheduling** section should auto-populate with the data center and other scheduling options that are available to you in vSphere.

| Field | Required | Explanation |
|---------|---------------|-----------|
| Data Center |  * | Choose the name/path of the data center where the VM will be scheduled.   |
| Resource Pool |    |  Name of the resource pool to schedule the VMs in. Resource pools can be used to partition available CPU and memory resources of a standalone host or cluster, and they can also be nested. Leave blank for standalone ESXi. If not specified, the default resource pool is used. |
| Data Store | * | If you have a data store cluster, you can toggle the **Data Store** field. This lets you select a data store cluster where your VM will be scheduled to. If the field is not toggled, you can select an individual disk. |
| Folder |    |  Name of a folder in the datacenter to create the VMs in. Must already exist. The VM folders in this dropdown menu directly correspond to your VM folders in vSphere. The folder name should be prefaced with `vm/` in your vSphere config file. |
| Host |  | The IP of the host system to schedule VMs in. Leave this field blank for a standalone ESXi or for a cluster with DRS (Distributed Resource Scheduler). If specified, the host system's pool will be used and the **Resource Pool** parameter will be ignored.   |

# Instance Options

In the **Instance Options** section, configure the number of vCPUs, memory, and disk size for the VMs created by this template.

| Parameter                | Required | Description |
|:----------------|:--------:|:-----------|
| CPUs                     |   *      | Number of vCPUS to assign to VMs. |
| Memory                   |   *      | Amount of memory to assign to VMs.  |
| Disk                     |   *      | Size of the disk (in MB) to attach to the VMs. |
| Creation method | * | The method for setting up an operating system on the node. The operating system can be installed from an ISO or from a VM template. Depending on the creation method, you will also have to specify a VM template, content library, existing VM, or ISO. For more information on creation methods, refer to [About VM Creation Methods.](#about-vm-creation-methods) |
| Cloud Init               |          | URL of a `cloud-config.yml` file or URL to provision VMs with. This file allows further customization of the operating system, such as network configuration, DNS servers, or system daemons. The operating system must support `cloud-init`. |
| Networks | | Name(s) of the network to attach the VM to. |
| Configuration Parameters used for guestinfo |          | Additional configuration parameters for the VMs. These correspond to the [Advanced Settings](https://kb.vmware.com/s/article/1016098) in the vSphere console. Example use cases include providing RancherOS [guestinfo]({{< baseurl >}}/os/v1.x/en/installation/cloud/vmware-esxi/#vmware-guestinfo) parameters or enabling disk UUIDs for the VMs (`disk.EnableUUID=TRUE`). |


### About VM Creation Methods

In the **Creation method** field, configure the method used to provision VMs in vSphere. Available options include creating VMs that boot from a RancherOS ISO or creating VMs by cloning from an existing virtual machine or [VM template](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.vm_admin.doc/GUID-F7BF0E6B-7C4F-4E46-8BBF-76229AEA7220.html).

The existing VM or template may use any modern Linux operating system that is configured with support for [cloud-init](https://cloudinit.readthedocs.io/en/latest/) using the [NoCloud datasource](https://cloudinit.readthedocs.io/en/latest/topics/datasources/nocloud.html).

Choose the way that the VM will be created:

- **Deploy from template: Data Center:** Choose a VM template that exists in the data center that you selected.
- **Deploy from template: Content Library:** First, select the [Content Library](https://docs.vmware.com/en/VMware-vSphere/6.5/com.vmware.vsphere.vm_admin.doc/GUID-254B2CE8-20A8-43F0-90E8-3F6776C2C896.html) that contains your template, then select the template from the populated list **Library templates.**
- **Clone an existing virtual machine:** In the **Virtual machine** field, choose an existing VM that the new VM will be cloned from.
- **Install from boot2docker ISO:** Ensure that the **OS ISO URL** field contains the URL of a VMware ISO release for RancherOS (`rancheros-vmware.iso`). Note that this URL must be accessible from the nodes running your Rancher server installation.

# Networks

The node template now allows a VM to be provisioned with multiple networks. In the **Networks** field, you can now click **Add Network** to add any networks available to you in vSphere.

# Node Tags and Custom Attributes

Tags allow you to attach metadata to objects in the vSphere inventory to make it easier to sort and search for these objects.

For tags, all your vSphere tags will show up as options to select from in your node template.

In the custom attributes, Rancher will let you select all the custom attributes you have already set up in vSphere. The custom attributes are keys and you can enter values for each one.

> **Note:** Custom attributes are a legacy feature that will eventually be removed from vSphere.

# cloud-init

[Cloud-init](https://cloudinit.readthedocs.io/en/latest/) allows you to initialize your nodes by applying configuration on the first boot. This may involve things such as creating users, authorizing SSH keys or setting up the network.

To make use of cloud-init initialization, create a cloud config file using valid YAML syntax and paste the file content in the the **Cloud Init** field. Refer to the [cloud-init documentation.](https://cloudinit.readthedocs.io/en/latest/topics/examples.html) for a commented set of examples of supported cloud config directives.

Note that cloud-init is not supported when using the ISO creation method.