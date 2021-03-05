---
title: vSphere Node Template Configuration in Rancher before v2.0.4
shortTitle: Before v2.0.4
weight: 5
---

- [Account access](#account-access)
- [Scheduling](#scheduling)
- [Instance options](#instance-options)
- [Disk UUIDs](#disk-uuids)
- [Node Tags and Custom Attributes](#node-tags-and-custom-attributes)
- [Cloud Init](#cloud-init)

# Account Access
In the **Account Access** section, enter the vCenter FQDN or IP address and the credentials for the vSphere user account.

| Parameter                | Required | Description |
|:------------------------|:--------:|:------------------------------------------------------------|
| vCenter or ESXi Server   |   *      | IP or FQDN of the vCenter or ESXi server used for managing VMs. Enter the vCenter or ESXi hostname/IP. ESXi is the virtualization platform where you create and run virtual machines and virtual appliances. vCenter Server is the service through which you manage multiple hosts connected in a network and pool host resources. |
| Port                     |   *      | Port to use when connecting to the server. Defaults to `443`.  |
| Username                 |   *      | vCenter/ESXi user to authenticate with the server. |
| Password                 |   *      | User's password. |


# Scheduling

Choose what hypervisor the virtual machine will be scheduled to. 

| Parameter                | Required | Description |
|:------------------------|:--------:|:------------------------------------------------------------|
| Data Center              |   *      | Name/path of the datacenter to create VMs in.          |
| Pool                     |          | Name/path of the resource pool to schedule the VMs in. If not specified, the default resource pool is used.  |
| Host                     |          | Name/path of the host system to schedule VMs in. If specified, the host system's pool will be used and the *Pool* parameter will be ignored. |
| Network                  |   *      | Name of the VM network to attach VMs to. |
| Data Store               |   *      | Datastore to store the VM disks. |
| Folder                   |          | Name of a folder in the datacenter to create the VMs in. Must already exist. The folder name should be prefaced with `vm/` in your vSphere config file. |

# Instance Options
In the **Instance Options** section, configure the number of vCPUs, memory, and disk size for the VMs created by this template.

Only VMs booting from RancherOS ISO are supported.

Ensure that the OS ISO URL contains the URL of the VMware ISO release for RancherOS: `rancheros-vmware.iso`.


| Parameter                | Required | Description |
|:------------------------|:--------:|:------------------------------------------------------------|
| CPUs                     |   *      | Number of vCPUS to assign to VMs. |
| Memory                   |   *      | Amount of memory to assign to VMs.  |
| Disk                     |   *      | Size of the disk (in MB) to attach to the VMs. |
| Cloud Init               |          | URL of a [RancherOS cloud-config]({{< baseurl >}}/os/v1.x/en/configuration/) file to provision VMs with. This file allows further customization of the RancherOS operating system, such as network configuration, DNS servers, or system daemons.|
| OS ISO URL               |   *      | URL of a RancherOS vSphere ISO file to boot the VMs from. You can find URLs for specific versions in the [Rancher OS GitHub Repo](https://github.com/rancher/os). |
| Configuration Parameters |          | Additional configuration parameters for the VMs. These correspond to the [Advanced Settings](https://kb.vmware.com/s/article/1016098) in the vSphere console. Example use cases include providing RancherOS [guestinfo]({{< baseurl >}}/os/v1.x/en/installation/cloud/vmware-esxi/#vmware-guestinfo) parameters or enabling disk UUIDs for the VMs (`disk.EnableUUID=TRUE`). |

# Disk UUIDs

In order to provision nodes with RKE, all nodes must be configured with disk UUIDs. Follow these instructions to enable UUIDs for the nodes in your vSphere cluster.

To enable disk UUIDs for all VMs created for a cluster,

1. Navigate to the **Node Templates** in the Rancher UI while logged in as an administrator.
2. Add or edit an existing vSphere node template.
3. Under **Instance Options** click on **Add Parameter**.
4. Enter `disk.enableUUID` as key with a value of **TRUE**.

    {{< img "/img/rke/vsphere-nodedriver-enable-uuid.png" "vsphere-nodedriver-enable-uuid" >}}

5. Click **Create** or **Save**.

**Result:** The disk UUID is enabled in the vSphere node template.

# Node Tags and Custom Attributes

These attributes allow you to attach metadata to objects in the vSphere inventory to make it easier to sort and search for these objects.

Optionally, you can:

- Provide a set of configuration parameters (instance-options) for the VMs.
- Assign labels to the VMs that can be used as a base for scheduling rules in the cluster.
- Customize the configuration of the Docker daemon on the VMs that will be created.

> **Note:** Custom attributes are a legacy feature that will eventually be removed from vSphere. 

# Cloud Init

[Cloud-init](https://cloudinit.readthedocs.io/en/latest/) allows you to initialize your nodes by applying configuration on the first boot. This may involve things such as creating users, authorizing SSH keys or setting up the network.

You may specify the URL of a RancherOS cloud-config.yaml file in the the **Cloud Init** field. Refer to the [RancherOS Documentation](https://rancher.com/docs/os/v1.x/en/configuration/#cloud-config) for details on the supported configuration directives. Note that the URL must be network accessible from the VMs created by the template.