---
title: VMware ESXi
weight: 108
---

As of v1.1.0, RancherOS automatically detects that it is running on VMware ESXi, and automatically adds the `open-vm-tools` service to be downloaded and started, and uses `guestinfo` keys to set the cloud-init data.

As of v1.5.0, RancherOS releases anything required for VMware, which includes initrd, a standard ISO for VMware, a `vmdk` image, and a specific ISO to be used with Docker Machine. The open-vm-tools is built in to RancherOS, there is no need to download it.

| Description  | Download URL |
|---|---|
| Booting from ISO   | https://releases.rancher.com/os/latest/vmware/rancheros.iso |
| For docker-machine | https://releases.rancher.com/os/latest/vmware/rancheros-autoformat.iso |
| VMDK               | https://releases.rancher.com/os/latest/vmware/rancheros.vmdk |
| Initrd             | https://releases.rancher.com/os/latest/vmware/initrd |

### VMware Guest Info

| VARIABLE | TYPE |
|---|---|
| `hostname` | hostname |
| `interface.<n>.name` | string |
| `interface.<n>.mac` | MAC address (is used to match the ethernet device's MAC address, not to set it) |
| `interface.<n>.dhcp` | {"yes", "no"} |
| `interface.<n>.role` | {"public", "private"} |
| `interface.<n>.ip.<m>.address` | CIDR IP address |
| `interface.<n>.route.<l>.gateway` | IP address |
| `interface.<n>.route.<l>.destination` | CIDR IP address (not available yet) |
| `dns.server.<x>` | IP address |
| `dns.domain.<y>` | DNS search domain |
| `cloud-init.config.data` | string |
| `cloud-init.data.encoding` | {"", "base64", "gzip+base64"} |
| `cloud-init.config.url` | URL |


> **Note:** "n", "m", "l", "x" and "y" are 0-indexed, incrementing integers. The identifier for an interface (`<n>`) is used in the generation of the default interface name in the form `eth<n>`.
