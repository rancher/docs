---
title: Azure Machine Configuration
weight: 2
---

For more information about Azure, refer to the official [Azure documentation.](https://docs.microsoft.com/en-us/azure/?product=featured)

### Environment

Microsoft provides multiple [clouds](https://docs.microsoft.com/en-us/cli/azure/cloud?view=azure-cli-latest) for compliance with regional laws, which are available for your use:

- AzurePublicCloud
- AzureGermanCloud
- AzureChinaCloud
- AzureUSGovernmentCloud

### Location

Configure the cluster and node [location](https://docs.microsoft.com/en-us/azure/virtual-machines/regions).

### Resource Group

A resource group is a container that holds related resources for an Azure solution. The resource group can include all the resources for the solution, or only those resources that you want to manage as a group. You decide how you want to allocate resources to resource groups based on what makes the most sense for your organization. Generally, add resources that share the same lifecycle to the same resource group so you can easily deploy, update, and delete them as a group.

Use an existing resource group or enter a resource group name and one will be created for you.

For information on managing resource groups, see the [Azure documentation.](https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)

### Availability Set (unmanaged)

Name or ID of an existing [availability set](https://docs.microsoft.com/en-us/azure/virtual-machines/availability-set-overview) to add the VM to.

### Image

The name of the operating system image provided as an ARM resource identifier. Requires using managed disk.

### VM Size

Choose a size for each VM in the node pool. For details about each VM size, see [this page.](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/)

## Advanced Options

### Fault Domain Count

Fault domains define the group of virtual machines that share a common power source and network switch. If the availability set has already been created, the fault domain count will be ignored.

For more information on fault domains, see [refer here](https://docs.microsoft.com/en-us/azure/virtual-machines/availability-set-overview#how-do-availability-sets-work).

### Update Domain Count

Update domains indicate groups of virtual machines and underlying physical hardware that can be rebooted at the same time. If the availability set has already been created, the update domain count will be ignored.

For more information on update domains, see [refer here](https://docs.microsoft.com/en-us/azure/virtual-machines/availability-set-overview#how-do-availability-sets-work).

### Purchase Plan

Some VM images in the Azure Marketplace require a plan. If applicable, select a purchase plan, formatted as `publisher:product:plan`, to use with your chosen image.

### Subnet

The name of the subnet when creating a new VNet or referencing an existing one.

Default: `docker-machine`

### Subnet Prefix

The subnet IP address prefix to use when creating a new VNet in CIDR format.

Default: `192.168.0.0/16`

### Virtual Network

The [virtual network](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview) to use or create if one does not exist. Formatted as `[resourcegroup:]name`.

### Public IP Options

#### No Public IP

Do not allocate a public IP address.

#### Static Public IP

Allocate a static public IP address.

### Use Private IP

Use a static private IP address.

### Private IP Address

Configure a static private IP address to use.

### Network Security Group

The [network security group](https://docs.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview) to use. All nodes using this template will use the supplied network security group. If no network security group is provided, a new one will be created for each node.

### DNS Label

A unique DNS name label for the public IP address.

### Storage Type

The [storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) type to use with your VMs. Options include Standard LRS, Standard ZRS, Standard GRS, Standard RAGRS, and Premium LRS.

### Use Managed Disks

[Azure managed disks](https://docs.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview) are block-level storage volumes that are managed by Azure and used with Azure Virtual Machines. Managed disks are designed for 99.999% availability. Managed disks achieve this by providing you with three replicas of your data, allowing for high durability.

### Managed Disk Size

The size in GB for the disk for each node.

### SSH Username

The username used to create an SSH connection to your nodes.

### Open Port

Opens inbound traffic on specified ports. When using an existing Network Security Group, Open Ports are ignored.

Default: `2379/tcp, 2380/tcp, 6443/tcp, 9796/tcp, 10250/tcp, 10251/tcp, 10252/tcp, 10256/tcp` and `8472/udp, 4789/udp`