---
title: Nutanix Node Template Configuration
weight: 2
---

- [Account Access](#account-access)
- [Scheduling](#scheduling)
- [Instance Options](#instance-options)
- [Networks](#networks)
- [VM Categories](#vm-categories)
- [cloud-init](#cloud-init)

# Account Access

| Parameter                    | Required | Description | Default
|:-----------------------------|:--------:|:-----------------------------------------------------------------|:-----
| Management Endpoint          |   ✓      | Hostname/IP address of Prism Central                             |
| Username                     |   ✓      | Username of the Prism Central user                               |
| Password                     |   ✓      | Password of the Prism Central user                               |
| Allow insecure communication |          | Set to true to allow insecure SSL communication to Prism Central | False

# Scheduling

Choose what Nutanix cluster the virtual machine will be scheduled to. 

| Parameter | Required | Description
|:----------|:--------:|:----------------------------------------------------------------------------
| Cluster   |   ✓      | Name of the Nutanix cluster where the VM should be deployed (case sensitive)

# Instance Options

In the **Instance Options** section, configure the number of vCPUs, memory, and disk size for the VMs created by this template.

| Parameter            | Required | Description                                                                                 | Default
|:---------------------|:--------:|:--------------------------------------------------------------------------------------------|:-------
| CPUs                 |          | Number of vCPUs allocated to the VM (cores)                                                 | 2
| Memory               |          | Amount of RAM allocated to the VM (MB)                                                      | 2 GB
| Template Image       | ✓        | Name of the Disk Image template to clone as the VM's primary disk (must support cloud-init) |
| VM Disk Size         |          | New size of the VM's primary disk (in GiB)                                                  |
| Additional Disk Size |          | Size of an additional disk to add to the VM (in GiB)                                        |
| Storage Container    |          | Storage container _UUID_ in which to provision an additional disk                           |
| Cloud Config YAML    |          | Cloud-init to provide to the VM (will be patched with Rancher root user)                  |
| Network              | ✓        | Name(s) of the network(s) to attach to the VM                                               |
| VM Categories        |          | Name(s) of any categories to be applied to the VM                                           |

The VM may use any modern Linux operating system that is configured with support for [cloud-init](https://cloudinit.readthedocs.io/en/latest/) using the [Config Drive v2 datasource](https://cloudinit.readthedocs.io/en/latest/topics/datasources/configdrive.html).

# Networks

The node template allows a VM to be provisioned with multiple networks. In the **Network** field, you can click **Add** to add any networks available to you in AOS.

# VM Categories

A category is a grouping of entities into a key value pair. Typically, VMs are assigned to a category based on some criteria. Policies can then be tied to those entities that are assigned (grouped by) a specific category value.

# cloud-init

[Cloud-init](https://cloudinit.readthedocs.io/en/latest/) allows you to initialize your nodes by applying configuration on the first boot. This may involve things such as creating users or authorizing SSH keys.

To make use of cloud-init initialization, paste a cloud config using valid YAML syntax into the **Cloud Config YAML** field. Refer to the [cloud-init documentation](https://cloudinit.readthedocs.io/en/latest/topics/examples.html) for a commented set of examples of supported cloud config directives.

Note that cloud-init based network configuration is not recommended and only supported via user data `runcmd` rather than by NoCloud or other network configuration datasources. 

Nutanix IP Address Management (IPAM) or another DHCP service is recommended.
