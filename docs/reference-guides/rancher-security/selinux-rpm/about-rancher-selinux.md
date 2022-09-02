---
title: About rancher-selinux
---


To allow Rancher to work with SELinux, some functionality has to be manually enabled for the SELinux nodes. To help with that, Rancher provides a SELinux RPM. 

The `rancher-selinux` RPM only contains policies for the [rancher-logging application.](https://github.com/rancher/charts/tree/dev-v2.5/charts/rancher-logging)

The `rancher-selinux` GitHub repository is [here.](https://github.com/rancher/rancher-selinux)

# Installing the rancher-selinux RPM

:::note Requirement:

The rancher-selinux RPM was tested with CentOS 7 and 8.

:::

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

:::note Requirement:

Logging v2 was tested with SELinux on RHEL/CentOS 7 and 8.

:::

Applications do not automatically work once the `rancher-selinux` RPM is installed on the host. They need to be configured to run in an allowed SELinux container domain provided by the RPM. 

To configure the `rancher-logging` chart to be SELinux aware, change `global.seLinux.enabled` to true in the `values.yaml` when installing the chart.