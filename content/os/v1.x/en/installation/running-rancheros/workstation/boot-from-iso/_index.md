---
title: Booting from ISO
weight: 102
---

The RancherOS ISO file can be used to create a fresh RancherOS install on KVM, VMware, VirtualBox, or bare metal servers. You can download the `rancheros.iso` file from our [releases page](https://github.com/rancher/os/releases/).

You must boot with at least **1280MB** of memory. If you boot with the ISO, you will automatically be logged in as the `rancher` user. Only the ISO is set to use autologin by default. If you run from a cloud or install to disk, SSH keys or a password of your choice is expected to be used.

### Install to Disk

After you boot RancherOS from ISO, you can follow the instructions [here]({{< baseurl >}}/os/v1.x/en/installation/running-rancheros/server/install-to-disk/) to install RancherOS to a hard disk.
