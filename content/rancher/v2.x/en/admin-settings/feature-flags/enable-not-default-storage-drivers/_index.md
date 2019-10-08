---
title: Allow Unsupported Storage Drivers
weight: 1
---
_Available as of v2.3.0_

This feature allows you to use types for storage providers and provisioners that are not enabled by default.

To enable or disable this feature, refer to the instructions on [the main page about enabling experimental features.]({{<baseurl>}}/rancher/v2.x/en/admin-settings/feature-flags)

Environment Variable Key | Default Value | Description
---|---|---
 `unsupported-storage-drivers` | `false` | This feature enables types for storage providers and provisioners that are not enabled by default.

### Types for Persistent Volume Plugins that are Enabled by Default
Below is a list of storage types for persistent volume plugins that are enabled by default. When enabling this feature flag, any persistent volume plugins that are not on this list are considered experimental and unsupported:

- `aws-ebs`
- `azure-disk`
- `azure-file`
- `flex-volume-longhorn`
- `gce-pd`
- `host-path`
- `local`
- `nfs`
- `vsphere-volume`

### Types for StorageClass that are Enabled by Default
Below is a list of storage types for a StorageClass that are enabled by default. When enabling this feature flag, any persistent volume plugins that are not on this list are considered experimental and unsupported:

- `aws-ebs`
- `azure-disk`
- `azure-file`
- `gce-pd`
- `longhorn`
- `local`
- `vsphere-volume`