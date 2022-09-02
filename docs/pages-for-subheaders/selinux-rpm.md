---
title: SELinux RPM
weight: 4
---

[Security-Enhanced Linux (SELinux)](https://en.wikipedia.org/wiki/Security-Enhanced_Linux) is a security enhancement to Linux.

Developed by Red Hat, it is an implementation of mandatory access controls (MAC) on Linux. Mandatory access controls allow an administrator of a system to define how applications and users can access different resources such as files, devices, networks and inter-process communication. SELinux also enhances security by making an OS restrictive by default. 

After being historically used by government agencies, SELinux is now industry standard and is enabled by default on CentOS 7 and 8. To check whether SELinux is enabled and enforcing on your system, use `getenforce`:

```
# getenforce
Enforcing
```

We provide two RPMs (Red Hat packages) that enable Rancher products to function properly on SELinux-enforcing hosts: [`rancher-selinux`](../reference-guides/rancher-security/selinux-rpm/about-rancher-selinux.md) and [`rke2-selinux`](../reference-guides/rancher-security/selinux-rpm/about-rke2-selinux.md). 