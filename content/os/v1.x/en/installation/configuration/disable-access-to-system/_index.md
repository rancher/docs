---
title: Disabling Access to RancherOS
weight: 136
---

_Available as of v1.5_

In RancherOS, you can set `rancher.password` as a kernel parameter and `auto-login` to be enabled, but there may be some cases where we want to disable both of these options. Both of these options can be disabled in the cloud-config or as part of a `ros` command. 

### How to Disabling Options

If RancherOS has already been started, you can use `ros config set` to update that you want to disable 

```
# Disabling the `rancher.password` kernel parameter
$ sudo ros config set rancher.disable ["password"]

# Disabling the `autologin` ability
$ sudo ros config set rancher.disable ["autologin"]
```

Alternatively, you can set it up in your cloud-config so it's automatically disabled when you boot RancherOS.


```yaml
# cloud-config
rancher:
  disable:
  - password
  - autologin
```
