---
title: vSphere Node Template Configuration in Rancher v2.3.0
shortTitle: v2.3.0
weight: 2
---
- [Account Access](#account-access)
- [Scheduling](#scheduling)
- [Instance Options](#instance-options)
- [Node tags and custom attributes](#node-tags-and-custom-attributes)
- [Cloud Init](#cloud-init)

# Account Access

| Parameter                | Required | Description |
|:----------------------|:--------:|:-----|
| Cloud Credentials   |   *      | Your vSphere account access information, stored in a [cloud credential.]({{<baseurl>}}/rancher/v2.0-v2.4/en/user-settings/cloud-credentials/)  |

Your cloud credential has these fields:

| Credential Field | Description |
|-----------------|-----------------|
| vCenter or ESXi Server |  Enter the vCenter or ESXi hostname/IP. ESXi is the virtualization platform where you create and run virtual machines and virtual appliances. vCenter Server is the service through which you manage multiple hosts connected in a network and pool host resources. |
| Port | Optional: configure configure the port of the vCenter or ESXi server. |
| Username and password | Enter your vSphere login username and password. |

# Scheduling
Choose what hypervisor the virtual machine will be scheduled to. 

In the **Scheduling** section, enter: 

- The name/path of the **Data Center** to create the VMs in
- The name of the **VM Network** to attach to
- The name/path of the **Datastore** to store the disks in

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