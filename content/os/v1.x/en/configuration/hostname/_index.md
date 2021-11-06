---
title: Setting the Hostname
weight: 124
aliases:
  - /os/v1.x/en/installation/configuration/hostname
---

You can set the hostname of the host using [cloud-config]({{< baseurl >}}/os/v1.x/en/configuration/#cloud-config). The example below shows how to configure it.

```yaml
#cloud-config
hostname: myhost
```
You can use command:

```yaml
#sudo ros config set hostname new-hostname
```
