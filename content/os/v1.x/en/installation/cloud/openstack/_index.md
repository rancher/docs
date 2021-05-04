---
title: OpenStack
weight: 109
aliases:
  - /os/v1.x/en/installation/running-rancheros/cloud/openstack
---

As of v0.5.0, RancherOS releases include an OpenStack image that can be found on our [releases page](https://github.com/rancher/os/releases). The image format is [QCOW3](https://wiki.qemu.org/Features/Qcow3#Fully_QCOW2_backwards-compatible_feature_set) that is backward compatible with QCOW2.

When launching an instance using the image, you must enable **Advanced Options** -> **Configuration Drive** and in order to use a [cloud-config]({{< baseurl >}}/os/v1.x/en/configuration/#cloud-config) file.
