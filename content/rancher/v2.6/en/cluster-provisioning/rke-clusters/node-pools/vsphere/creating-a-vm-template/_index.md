---
title: Creating a vSphere Virtual Machine Template
weight: 2
---

Creating virtual machines in a repeatable and reliable fashion can often be difficult. VMware vSphere offers the ability to build one VM that can then be converted to a template. The template can then be used to create identically configured VMs. Rancher leverages this capability within node pools to create identical RKE1 and RKE2 nodes. With that said, Rancher does have some specific requirements for the VM to have pre-installed to leverage the template to create new VMs. After configuring the VM with the requirements, the VM will need to be prepared before creating the template. Once preparation is complete, the VM can be converted to a template and moved into a content library, ready for Rancher node pool usage.

- [Requirements](#requirements)
- [Template Creation](#template-creation)
- [Preparation](#preparation)
- [Converting to a Template](#converting-to-a-template)
- [Moving to a content library](#moving-to-a-content-library)
- [Other Resources](#other-resources)

# Requirements

There are specific tooling required for both Linux and Windows VMs to be usable by the vSphere node driver. The most critical dependency is [cloud-init](https://cloud-init.io/) for Linux and [cloudbase-init](https://cloudbase.it/cloudbase-init/) for Windows. Both of these are used for provisioning the VMs by configuring the hostname, settings up the SSH access, and default Rancher user. Users can add additional content to these as desired if additional configuration is desired. Outside of that some additional requirements will be listed below. If you have any specific firewall rules or configuration, this should be added to the VM before creating a template. 

## Linux Dependencies

Here is the list of packages that need installed on the template. These will have slightly varied names based on distribution with some distributions shipping these by default.

* curl 
* wget
* git
* net-tools
* unzip
* apparmor-parser
* ca-certificates
* cloud-init
* cloud-guest-utils
* cloud-image-utils
* growpart
* cloud-initramfs-growroot
* open-iscsi
* openssh-server
* [open-vm-tools](https://docs.vmware.com/en/VMware-Tools/11.3.0/com.vmware.vsphere.vmwaretools.doc/GUID-8B6EA5B7-453B-48AA-92E5-DB7F061341D1.html)

## Windows Dependencies

Here is the list of packages that need installed on the template.

* Windows Container Feature
* [cloudbase-init](https://cloudbase.it/cloudbase-init/#download)
* [Docker EE](https://docs.microsoft.com/en-us/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-Server#install-docker) - RKE1 Only

**Now here is where the configuration for Windows templates need to differ between RKE1 and RKE2. RKE1 leverages Docker, so any templates for RKE1 will need to have Docker EE preinstalled too. RKE2 doesn't require Docker EE and doesn't require that it be installed.**

# Template Creation

There a few different approaches that can be pursued at this step. You can manually create your VM by following [these instructions](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-AE8AFBF1-75D1-4172-988C-378C35C9FAF2.html) from VMware. Once you have a VM running, you can manually install the dependency listed above to configure the VM correctly for the vSphere node driver. After the required dependencies are configured, you can further customize based on your specific environment and requirements. Finally, you are ready to precede with the final preparation before creating your template. 

## Alternatives to manual creation

Alternatives to manual creation do exist and below is a list of tools that can assist.

* [VMware PowerCLI](https://developer.vmware.com/powercli)
* [Packer](https://www.packer.io/)
* [SaltStack](https://saltproject.io/)
* [Ansible](https://www.ansible.com/)

Packer is often used and here is a good [reference](https://github.com/vmware-samples/packer-examples-for-vsphere) for usage with vSphere. 

# Preparation

Once you have a VM created with all the dependencies listed above and any additional items that are required, the most critical step is next. That step is preparing the VM to be turned into a template. This basically resets the VM hostname, IPs, etc. to prevent that information from being brought into a new VM. When VMs are created from a template without this step, those VMs could have the same hostname, IP address, etc. The steps differ between Linux and Windows.

## Linux Preparation

Here is how to achieve the different items that need reset.

```Bash
# Cleaning logs.
if [ -f /var/log/audit/audit.log ]; then
  cat /dev/null > /var/log/audit/audit.log
fi
if [ -f /var/log/wtmp ]; then
  cat /dev/null > /var/log/wtmp
fi
if [ -f /var/log/lastlog ]; then
  cat /dev/null > /var/log/lastlog
fi

# Cleaning udev rules.
if [ -f /etc/udev/rules.d/70-persistent-net.rules ]; then
  rm /etc/udev/rules.d/70-persistent-net.rules
fi

# Cleaning the /tmp directories
rm -rf /tmp/*
rm -rf /var/tmp/*

# Cleaning the SSH host keys
rm -f /etc/ssh/ssh_host_*

# Cleaning the machine-id
truncate -s 0 /etc/machine-id
rm /var/lib/dbus/machine-id
ln -s /etc/machine-id /var/lib/dbus/machine-id

# Cleaning the shell history
unset HISTFILE
history -cw
echo > ~/.bash_history
rm -fr /root/.bash_history

# Truncating hostname, hosts, resolv.conf and setting hostname to localhost
truncate -s 0 /etc/{hostname,hosts,resolv.conf}
hostnamectl set-hostname localhost

# Clean cloud-init
cloud-init clean -s -l
```

## Windows Preparation

Windows has a utility called [sysprep](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/sysprep--generalize--a-windows-installation) that is used to generalize an image and reset the same items listed above for Linux. The command would look like this.

```PowerShell
sysprep.exe /generalize /shutdown /oobe
```

# Converting to a Template

To convert a VM to a template the first step is to shut down and stop the VM. Once it has been stopped, right-click on the VM in the inventory list and select Template. Then click on `Convert to Template`. Once that process has finished, there is now a template that can be used. 

* [VMware guide](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-5B3737CC-28DB-4334-BD18-6E12011CDC9F.html)

# Moving to a content library

Rancher has the ability to consume templates provided by a content library. Content libraries store and manage content within vSphere. Content libraries offer the ability to publish and share that content. 

* [Create a content library](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-2A0F1C13-7336-45CE-B211-610D39A6E1F4.html)
* [Clone the template to the content library](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-AC1545F0-F8BA-4CD2-96EB-21B3DFAA1DC1.html)

# Other Resources

Here is a list of additional resources that may be useful.

* [Tutorial for creating a Linux template](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/manage/hybrid/server/best-practices/vmware-ubuntu-template)
* [Tutorial for creating a Windows template](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/manage/hybrid/server/best-practices/vmware-windows-template)
