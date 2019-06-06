---
title: Booting from ISO
weight: 102
---

The RancherOS ISO file can be used to create a fresh RancherOS install on KVM, VMware, VirtualBox, Hyper-V, Proxmox VE, or bare metal servers. You can download the `rancheros.iso` file from our [releases page](https://github.com/rancher/os/releases/).

Some hypervisors may require a built-in agent to communicate with the guest, for this, RancherOS precompiles some ISO files.

Hypervisor | ISO
--------   | ----------------
VMware     | [rancheros-vmware.iso](https://releases.rancher.com/os/latest/vmware/rancheros.iso)
Hyper-V    | [rancheros-hyperv.iso](https://releases.rancher.com/os/latest/hyperv/rancheros.iso)
Proxmox VE | [rancheros-proxmoxve.iso](https://releases.rancher.com/os/latest/proxmoxve/rancheros.iso)

You must boot with enough memory which you can refer to [here]({{< baseurl >}}/os/v1.x/en/overview/#hardware-requirements). If you boot with the ISO, you will automatically be logged in as the `rancher` user. Only the ISO is set to use autologin by default. If you run from a cloud or install to disk, SSH keys or a password of your choice is expected to be used.

### Install to Disk

After you boot RancherOS from ISO, you can follow the instructions [here]({{< baseurl >}}/os/v1.x/en/installation/running-rancheros/server/install-to-disk/) to install RancherOS to a hard disk.
