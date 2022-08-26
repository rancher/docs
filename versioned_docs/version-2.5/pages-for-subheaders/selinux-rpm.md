---
title: SELinux RPM
weight: 4
---

_Available as of v2.5.8_

[Security-Enhanced Linux (SELinux)](https://en.wikipedia.org/wiki/Security-Enhanced_Linux) is a security enhancement to Linux.

Developed by Red Hat, it is an implementation of mandatory access controls (MAC) on Linux. Mandatory access controls allow an administrator of a system to define how applications and users can access different resources such as files, devices, networks and inter-process communication. SELinux also enhances security by making an OS restrictive by default. 

After being historically used by government agencies, SELinux is now industry standard and is enabled by default on CentOS 7 and 8. To check whether SELinux is enabled and enforcing on your system, use `getenforce`:

```
# getenforce
Enforcing
```

We provide two RPMs (Red Hat packages) that enable Rancher products to function properly on SELinux-enforcing hosts: `rancher-selinux` and `rke2-selinux`.

- [rancher-selinux](#rancher-selinux)
- [rke2-selinux](#rke2-selinux)
- [Installing the rancher-selinux RPM](#installing-the-rancher-selinux-rpm)
- [Configuring the Logging Application to Work with SELinux](#configuring-the-logging-application-to-work-with-selinux)

# rancher-selinux

To allow Rancher to work with SELinux, some functionality has to be manually enabled for the SELinux nodes. To help with that, Rancher provides a SELinux RPM. 

As of v2.5.8, the `rancher-selinux` RPM only contains policies for the [rancher-logging application.](https://github.com/rancher/charts/tree/dev-v2.5/charts/rancher-logging)

The `rancher-selinux` GitHub repository is [here.](https://github.com/rancher/rancher-selinux)

# rke2-selinux

rke2-selinux provides policies for RKE2. It is installed automatically when the RKE2 installer script detects that it is running on an RPM-based distro.

The `rke2-selinux` GitHub repository is [here.](https://github.com/rancher/rke2-selinux)

For more information about installing RKE2 on SELinux-enabled hosts, see the [RKE2 documentation.](https://docs.rke2.io/install/methods/#rpm)

# Installing the rancher-selinux RPM

> **Requirements:** The rancher-selinux RPM was tested with CentOS 7 and 8.

### 1. Set up the yum repo

Set up the yum repo to install `rancher-selinux` directly on all hosts in the cluster.

In order to use the RPM repository, on a CentOS 7 or RHEL 7 system, run the following bash snippet:

```
# cat << EOF > /etc/yum.repos.d/rancher.repo 
[rancher] 
name=Rancher 
baseurl=https://rpm.rancher.io/rancher/production/centos/7/noarch
enabled=1 
gpgcheck=1 
gpgkey=https://rpm.rancher.io/public.key 
EOF
```

In order to use the RPM repository, on a CentOS 8 or RHEL 8 system, run the following bash snippet:

```
# cat << EOF > /etc/yum.repos.d/rancher.repo 
[rancher] 
name=Rancher 
baseurl=https://rpm.rancher.io/rancher/production/centos/8/noarch
enabled=1 
gpgcheck=1 
gpgkey=https://rpm.rancher.io/public.key 
EOF
```
### 2. Installing the RPM

Install the RPM:

```
yum -y install rancher-selinux
```

# Configuring the Logging Application to Work with SELinux

> **Requirements:** Logging v2 was tested with SELinux on RHEL/CentOS 7 and 8.

Applications do not automatically work once the `rancher-selinux` RPM is installed on the host. They need to be configured to run in an allowed SELinux container domain provided by the RPM. 

To configure the `rancher-logging` chart to be SELinux aware, change `global.seLinux.enabled` to true in the `values.yaml` when installing the chart.
