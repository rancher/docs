---
title: Allow Unsupported Storage Drivers
weight: 1
---
_Available as of v2.3.0_

This feature enables unsupported types for storage providers and provisioners.

To enable or disable this feature, refer to the instructions on [the main page about enabling unsupported features.]({{<baseurl>}}/rancher/v2.x/en/admin-settings/feature-flags)

### Supported Types for Persistent Volume Plugins
Below is a list of supported storage types for persistent volume plugins. Everything not on the list is unsupported:

- `aws-ebs`
- `azure-disk`
- `azure-file`
- `flex-volume-longhorn`
- `gce-pd`
- `host-path`
- `local`
- `nfs`
- `vsphere-volume`

### Supported Types for StorageClass
Below is a list of supported storage types for a StorageClass. Everything not on the list is unsupported:

- `aws-ebs`
- `azure-disk`
- `azure-file`
- `gce-pd`
- `longhorn`
- `local`
- `vsphere-volume`