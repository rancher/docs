---
title: vSphere Node Template Configuration Reference
weight: 4
---

The tables below describe the configuration options available in the vSphere node template:

- [Account access](#account-access)
- [Instance options](#instance-options)
- [Scheduling options](#scheduling-options)

# Account Access

The account access parameters are different based on the Rancher version.

{{% tabs %}}
{{% tab "Rancher v2.2.0+" %}}

| Parameter                | Required | Description |
|:----------------------|:--------:|:-----|
| Cloud Credentials   |   *      | Your vSphere account access information, stored in a [cloud credential.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cloud-credentials/)  |

{{% /tab %}}
{{% tab "Rancher prior to v2.2.0" %}}

| Parameter                | Required | Description |
|:------------------------|:--------:|:------------------------------------------------------------|
| vCenter or ESXi Server   |   *      | IP or FQDN of the vCenter or ESXi server used for managing VMs. |
| Port                     |   *      | Port to use when connecting to the server. Defaults to `443`.  |
| Username                 |   *      | vCenter/ESXi user to authenticate with the server. |
| Password                 |   *      | User's password. |

{{% /tab %}}
{{% /tabs %}}

# Instance Options

The options for creating and configuring an instance are different depending on your Rancher version.

{{% tabs %}}
{{% tab "Rancher v2.3.3+" %}}

| Parameter                | Required | Description |
|:----------------|:--------:|:-----------|
| CPUs                     |   *      | Number of vCPUS to assign to VMs. |
| Memory                   |   *      | Amount of memory to assign to VMs.  |
| Disk                     |   *      | Size of the disk (in MB) to attach to the VMs. |
| Creation method | * | The method for setting up an operating system on the node. The operating system can be installed from an ISO or from a VM template. Depending on the creation method, you will also have to specify a VM template, content library, existing VM, or ISO. For more information on creation methods, refer to the section on [configuring instances.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/vsphere/provisioning-vsphere-clusters/#c-configure-instances-and-operating-systems) |
| Cloud Init               |          | URL of a `cloud-config.yml` file or URL to provision VMs with. This file allows further customization of the operating system, such as network configuration, DNS servers, or system daemons. The operating system must support `cloud-init`. |
| Networks | | Name(s) of the network to attach the VM to. |
| Configuration Parameters used for guestinfo |          | Additional configuration parameters for the VMs. These correspond to the [Advanced Settings](https://kb.vmware.com/s/article/1016098) in the vSphere console. Example use cases include providing RancherOS [guestinfo]({{< baseurl >}}/os/v1.x/en/installation/cloud/vmware-esxi/#vmware-guestinfo) parameters or enabling disk UUIDs for the VMs (`disk.EnableUUID=TRUE`). |

{{% /tab %}}
{{% tab "Rancher prior to v2.3.3" %}}

| Parameter                | Required | Description |
|:------------------------|:--------:|:------------------------------------------------------------|
| CPUs                     |   *      | Number of vCPUS to assign to VMs. |
| Memory                   |   *      | Amount of memory to assign to VMs.  |
| Disk                     |   *      | Size of the disk (in MB) to attach to the VMs. |
| Cloud Init               |          | URL of a [RancherOS cloud-config]({{< baseurl >}}/os/v1.x/en/configuration/) file to provision VMs with. This file allows further customization of the RancherOS operating system, such as network configuration, DNS servers, or system daemons.|
| OS ISO URL               |   *      | URL of a RancherOS vSphere ISO file to boot the VMs from. You can find URLs for specific versions in the [Rancher OS GitHub Repo](https://github.com/rancher/os). |
| Configuration Parameters |          | Additional configuration parameters for the VMs. These correspond to the [Advanced Settings](https://kb.vmware.com/s/article/1016098) in the vSphere console. Example use cases include providing RancherOS [guestinfo]({{< baseurl >}}/os/v1.x/en/installation/cloud/vmware-esxi/#vmware-guestinfo) parameters or enabling disk UUIDs for the VMs (`disk.EnableUUID=TRUE`). |

{{% /tab %}}
{{% /tabs %}}

# Scheduling Options
The options for scheduling VMs to a hypervisor are different depending on your Rancher version.
{{% tabs %}}
{{% tab "Rancher v2.3.3+" %}}

| Parameter                | Required | Description |
|:------------------------|:--------:|:-------|
| Data Center              |   *      | Name/path of the datacenter to create VMs in.          |
| Resource Pool                     |          | Name of the resource pool to schedule the VMs in. Leave blank for standalone ESXi. If not specified, the default resource pool is used.  |
| Data Store               |   *      | If you have a data store cluster, you can toggle the **Data Store** field. This lets you select a data store cluster where your VM will be scheduled to. If the field is not toggled, you can select an individual disk. |
| Folder                   |          | Name of a folder in the datacenter to create the VMs in. Must already exist. The folder name should be prefaced with `vm/` in your vSphere config file. |
| Host                     |          | The IP of the host system to schedule VMs in. If specified, the host system's pool will be used and the *Pool* parameter will be ignored. |

{{% /tab %}}
{{% tab "Rancher prior to v2.3.3" %}}

| Parameter                | Required | Description |
|:------------------------|:--------:|:------------------------------------------------------------|
| Data Center              |   *      | Name/path of the datacenter to create VMs in.          |
| Pool                     |          | Name/path of the resource pool to schedule the VMs in. If not specified, the default resource pool is used.  |
| Host                     |          | Name/path of the host system to schedule VMs in. If specified, the host system's pool will be used and the *Pool* parameter will be ignored. |
| Network                  |   *      | Name of the VM network to attach VMs to. |
| Data Store               |   *      | Datastore to store the VM disks. |
| Folder                   |          | Name of a folder in the datacenter to create the VMs in. Must already exist. The folder name should be prefaced with `vm/` in your vSphere config file. |
{{% /tab %}}
{{% /tabs %}}