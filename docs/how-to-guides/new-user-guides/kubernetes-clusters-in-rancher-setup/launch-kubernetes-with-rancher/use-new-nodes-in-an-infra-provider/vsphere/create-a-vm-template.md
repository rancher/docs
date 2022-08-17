---
title: Creating a vSphere Virtual Machine Template
weight: 4
---

Creating virtual machines in a repeatable and reliable fashion can often be difficult. VMware vSphere offers the ability to build one VM that can then be converted to a template. The template can then be used to create identically configured VMs. Rancher leverages this capability within node pools to create identical RKE1 and RKE2 nodes.

In order to leverage the template to create new VMs, Rancher has some [specific requirements](#requirements) that the VM must have pre-installed. After you configure the VM with these requirements, you will next need to [prepare the VM](#preparing-your-vm) before [creating the template](#creating-a-template). Finally, once preparation is complete, the VM can be [converted to a template](#converting-to-a-template) and [moved into a content library](#moving-to-a-content-library), ready for Rancher node pool usage.

- [Requirements](#requirements)
- [Creating a Template](#creating-a-template)
- [Preparing Your VM](#preparing-your-vm)
- [Converting to a Template](#converting-to-a-template)
- [Moving to a content library](#moving-to-a-content-library)
- [Other Resources](#other-resources)

# Requirements

There is specific tooling required for both Linux and Windows VMs to be usable by the vSphere node driver. The most critical dependency is [cloud-init](https://cloud-init.io/) for Linux and [cloudbase-init](https://cloudbase.it/cloudbase-init/) for Windows. Both of these are used for provisioning the VMs by configuring the hostname and by setting up the SSH access and the default Rancher user. Users can add additional content to these as desired if other configuration is needed. In addition, other requirements are listed below for reference.

:::note

If you have any specific firewall rules or configuration, you will need to add this to the VM before creating a template.

:::

## Linux Dependencies

The packages that need to be installed on the template are listed below. These will have slightly different names based on distribution; some distributions ship these by default, for example.

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

The list of packages that need to be installed on the template is as follows:

* Windows Container Feature
* [cloudbase-init](https://cloudbase.it/cloudbase-init/#download)
* [Docker EE](https://docs.microsoft.com/en-us/virtualization/windowscontainers/quick-start/set-up-environment?tabs=Windows-Server#install-docker) - RKE1 Only

:::note About the configuration for Windows templates varies between RKE1 and RKE2:

- RKE1 leverages Docker, so any RKE1 templates need to have Docker EE pre-installed as well
- RKE2 does not require Docker EE, and thus it does not need to be installed

:::

# Creating a Template

You may either manually create your VM or you can utilize [other alternatives](#alternatives-to-manual-creation) to create your VM.

## Manual Creation
1. Manually create your VM by following [these instructions](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-AE8AFBF1-75D1-4172-988C-378C35C9FAF2.html) from VMware. Once you have a VM running, you can manually install the dependencies listed above to configure the VM correctly for the vSphere node driver.
2. Customize as needed based on your specific environment and requirements.
3. Proceed with the final preparation before creating your template.

## Alternatives to Manual Creation

Other alternative options to create VMs are listed below:

* [VMware PowerCLI](https://developer.vmware.com/powercli)
* [Packer](https://www.packer.io/)
* [SaltStack](https://saltproject.io/)
* [Ansible](https://www.ansible.com/)

Packer is a frequently-used alternative. Refer to this [reference](https://github.com/vmware-samples/packer-examples-for-vsphere) for examples of its usage with vSphere.

# Preparing Your VM

After creating a VM with all the required dependencies (and any additional required items), you must perform the most critical step next: preparing the VM to be turned into a template. This preparation will reset critical data such as the VM hostname, IPs, etc., to prevent that information from being brought into a new VM. If you fail to perform this step, you could create a VM with the same hostname, IP address, etc.

Note that these preparatory steps differ between Linux and Windows.

## Linux Preparation

The commands below will reset your VM in Linux:

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

Windows has a utility called [sysprep](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/sysprep--generalize--a-windows-installation) that is used to generalize an image and reset the same items listed above for Linux. The command is as follows:

```PowerShell
sysprep.exe /generalize /shutdown /oobe
```

# Converting to a Template

1. Shut down and stop the VM.
2. Right-click on the VM in the inventory list and select **Template**.
3. Click on **Convert to Template**.

**Result:** Once the process has completed, a template will be available for use.

For additional information on converting a VM to a template, see the [VMware guide](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-5B3737CC-28DB-4334-BD18-6E12011CDC9F.html).

# Moving to a Content library

Rancher has the ability to use templates provided by a content library. Content libraries store and manage content within vSphere, and they also offer the ability to publish and share that content.

Below are some helpful links on content libraries:

* [Create a content library](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-2A0F1C13-7336-45CE-B211-610D39A6E1F4.html)
* [Clone the template to the content library](https://docs.vmware.com/en/VMware-vSphere/7.0/com.vmware.vsphere.vm_admin.doc/GUID-AC1545F0-F8BA-4CD2-96EB-21B3DFAA1DC1.html)

# Other Resources

Here is a list of additional resources that may be useful:

* [Tutorial for creating a Linux template](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/manage/hybrid/server/best-practices/vmware-ubuntu-template)
* [Tutorial for creating a Windows template](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/manage/hybrid/server/best-practices/vmware-windows-template)
