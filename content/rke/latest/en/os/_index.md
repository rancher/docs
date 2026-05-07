---
title: Requirements
weight: 5
---

> Firewalld conflicts with RKE1 when PNI is enabled. To avoid unexpected behavior, firewalld should be disabled on systems running RKE1.

**In this section:**

<!-- TOC -->
- [Operating System](#operating-system)
  - [General Linux Requirements](#general-linux-requirements)
  - [SUSE Linux Enterprise Server (SLES) / openSUSE](#suse-linux-enterprise-server-sles-opensuse)
    - [Using Upstream Docker](#using-upstream-docker)
    - [Using SUSE/openSUSE packaged Docker](#using-suse-opensuse-packaged-docker)
    - [Adding the Software Repository for Docker](#adding-the-software-repository-for-docker)
  - [openSUSE MicroOS/Kubic (Atomic)](#opensuse-microos-kubic-atomic)
    - [openSUSE MicroOS](#opensuse-microos)
    - [openSUSE Kubic](#opensuse-kubic)
  - [Red Hat Enterprise Linux (RHEL) / Oracle Linux (OL) / CentOS](#red-hat-enterprise-linux-rhel-oracle-linux-ol-centos)
    - [Using upstream Docker](#using-upstream-docker-1)
    - [Using RHEL/CentOS packaged Docker](#using-rhel-centos-packaged-docker)
  - [Red Hat Atomic](#red-hat-atomic)
    - [OpenSSH version](#openssh-version)
    - [Creating a Docker Group](#creating-a-docker-group)
  - [Flatcar Container Linux](#flatcar-container-linux)
- [Software](#software)
  - [OpenSSH](#openssh)
  - [Kubernetes](#kubernetes)
  - [Docker](#docker)
  - [Installing Docker](#installing-docker)
  - [Checking the Installed Docker Version](#checking-the-installed-docker-version)
- [Hardware](#hardware)
  - [Worker Role](#worker-role)
  - [Large Kubernetes Clusters](#large-kubernetes-clusters)
  - [Etcd clusters](#etcd-clusters)
- [Ports](#ports)
  - [Opening port TCP/6443 using `iptables`](#opening-port-tcp-6443-using-iptables)
- [SSH Server Configuration](#ssh-server-configuration)

<!-- /TOC -->

## Operating System

### General Linux Requirements

RKE runs on almost any Linux OS with Docker installed. For details on which OS and Docker versions were tested with each version, refer to the [support maintenance terms.](https://www.rancher.com/support-maintenance-terms/).

- [SSH user]({{<baseurl>}}/rke/latest/en/config-options/nodes/#ssh-user) - The SSH user used for node access must be a member of the `docker` group on the node:

   ```
   usermod -aG docker <user_name>
   ```

> **Note:** Users added to the `docker` group are granted effective root permissions on the host by means of the Docker API. Only choose a user that is intended for this purpose and has its credentials and access properly secured.

   See [Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) to see how you can configure access to Docker without using the `root` user.

- Swap should be disabled on any worker nodes

- Please check the network plugin documentation for any additional requirements (for example, kernel modules)
  - [Calico](https://docs.projectcalico.org/getting-started/kubernetes/requirements#kernel-dependencies)
  - [Flannel](https://github.com/flannel-io/flannel/tree/master/Documentation)
  - Canal (Combination Calico and Flannel)
  - [Weave](https://www.weave.works/docs/net/latest/install/installing-weave/)

> **Note:** If you or your cloud provider are using a custom minimal kernel, some required (network) kernel modules might not be present.

- Following sysctl settings must be applied

```
net.bridge.bridge-nf-call-iptables=1
```

### SUSE Linux Enterprise Server (SLES) / openSUSE

If you are using SUSE Linux Enterprise Server or openSUSE follow the instructions below.

#### Using upstream Docker
If you are using upstream Docker, the package name is `docker-ce` or `docker-ee`. You can check the installed package by executing:

```
rpm -q docker-ce
```

When using the upstream Docker packages, please follow [Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user).

#### Using SUSE/openSUSE packaged docker
If you are using the Docker package supplied by SUSE/openSUSE, the package name is `docker`. You can check the installed package by executing:

```
rpm -q docker
```

#### Adding the Software repository for docker
In SUSE Linux Enterprise Server 15 SP2 docker is found in the Containers module.
This module will need to be added before istalling docker.

To list available modules you can run SUSEConnect to list the extensions and the activation command
```
node:~ # SUSEConnect --list-extensions
AVAILABLE EXTENSIONS AND MODULES

    Basesystem Module 15 SP2 x86_64 (Activated)
    Deactivate with: SUSEConnect -d -p sle-module-basesystem/15.2/x86_64

        Containers Module 15 SP2 x86_64
        Activate with: SUSEConnect -p sle-module-containers/15.2/x86_64
```
Run this SUSEConnect command to activate the Containers module.
```
node:~ # SUSEConnect -p sle-module-containers/15.2/x86_64
Registering system to registration proxy https://rmt.seader.us

Updating system details on https://rmt.seader.us ...

Activating sle-module-containers 15.2 x86_64 ...
-> Adding service to system ...
-> Installing release package ...

Successfully registered system
```
In order to run docker cli commands with your user then you need to add this user to the `docker` group.
It is preferred not to use the root user for this.

```
usermod -aG docker <user_name>
```

To verify that the user is correctly configured, log out of the node and login using SSH or your preferred method, and execute `docker ps`:

```
ssh user@node
user@node:~> docker ps
CONTAINER ID        IMAGE       COMMAND             CREATED             STATUS              PORTS               NAMES
user@node:~>
```
### openSUSE MicroOS/Kubic (Atomic)
Consult the project pages for openSUSE MicroOS and Kubic for installation
#### openSUSE MicroOS
Designed to host container workloads with automated administration & patching. Installing openSUSE MicroOS you get a quick, small environment for deploying Containers, or any other workload that benefits from Transactional Updates. As rolling release distribution the software is always up-to-date.
https://microos.opensuse.org
#### openSUSE Kubic
Based on openSUSE MicroOS, designed with the same things in mind but is focused on being a Certified Kubernetes Distribution.
https://kubic.opensuse.org
Installation instructions:
https://kubic.opensuse.org/blog/2021-02-08-MicroOS-Kubic-Rancher-RKE/

### Red Hat Enterprise Linux (RHEL) / Oracle Linux (OL) / CentOS

If using Red Hat Enterprise Linux, Oracle Linux or CentOS, you cannot use the `root` user as [SSH user]({{<baseurl>}}/rke/latest/en/config-options/nodes/#ssh-user) due to [Bugzilla 1527565](https://bugzilla.redhat.com/show_bug.cgi?id=1527565). Please follow the instructions below how to setup Docker correctly, based on the way you installed Docker on the node.

>**Note:** In RHEL 8.4, two extra services are included on the NetworkManager: `nm-cloud-setup.service` and `nm-cloud-setup.timer`. These services add a routing table that interferes with the CNI plugin's configuration. If these services are enabled, you must disable them using the command below, and then reboot the node to restore connectivity:
>
>  ```
   systemctl disable nm-cloud-setup.service nm-cloud-setup.timer
   reboot
   ```

#### Using upstream Docker
If you are using upstream Docker, the package name is `docker-ce` or `docker-ee`. You can check the installed package by executing:

```
rpm -q docker-ce
```

When using the upstream Docker packages, please follow [Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user).

#### Using RHEL/CentOS packaged Docker
If you are using the Docker package supplied by Red Hat / CentOS, the package name is `docker`. You can check the installed package by executing:

```
rpm -q docker
```

If you are using the Docker package supplied by Red Hat / CentOS, the `dockerroot` group is automatically added to the system. You will need to edit (or create) `/etc/docker/daemon.json` to include the following:

```
{
    "group": "dockerroot"
}
```

Restart Docker after editing or creating the file. After restarting Docker, you can check the group permission of the Docker socket (`/var/run/docker.sock`), which should show `dockerroot` as group:

```
srw-rw----. 1 root dockerroot 0 Jul  4 09:57 /var/run/docker.sock
```

Add the SSH user you want to use to this group, this can't be the `root` user.

```
usermod -aG dockerroot <user_name>
```

To verify that the user is correctly configured, log out of the node and login with your SSH user, and execute `docker ps`:

```
ssh <user_name>@node
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

### Red Hat Atomic

Before trying to use RKE with Red Hat Atomic nodes, there are a couple of updates to the OS that need to occur in order to get RKE working.

#### OpenSSH version

By default, Atomic hosts ship with OpenSSH 6.4, which doesn't support SSH tunneling, which is a core RKE requirement. If you upgrade to the latest version of OpenSSH supported by Atomic, it will correct the SSH issue.

#### Creating a Docker Group

By default, Atomic hosts do not come with a Docker group. You can update the ownership of the Docker socket by enabling the specific user in order to launch RKE.

```
# chown <user> /var/run/docker.sock
```

### Flatcar Container Linux

When using Flatcar Container Linux nodes, it is required to use the following configuration in the cluster configuration file:

{{% tabs %}}
{{% tab "Canal"%}}

```yaml
rancher_kubernetes_engine_config:
  network:
    plugin: canal
    options:
      canal_flex_volume_plugin_dir: /opt/kubernetes/kubelet-plugins/volume/exec/nodeagent~uds
      flannel_backend_type: vxlan

  services:
    kube-controller:
      extra_args:
        flex-volume-plugin-dir: /opt/kubernetes/kubelet-plugins/volume/exec/
```
{{% /tab %}}

{{% tab "Calico"%}}

```yaml
rancher_kubernetes_engine_config:
  network:
    plugin: calico
    options:
      calico_flex_volume_plugin_dir: /opt/kubernetes/kubelet-plugins/volume/exec/nodeagent~uds
      flannel_backend_type: vxlan

  services:
    kube-controller:
      extra_args:
        flex-volume-plugin-dir: /opt/kubernetes/kubelet-plugins/volume/exec/
```
{{% /tab %}}
{{% /tabs %}}

It is also required to enable the Docker service, you can enable the Docker service using the following command:

```
systemctl enable docker.service
```

## Software

This section describes the requirements for Docker, Kubernetes, and SSH.

### OpenSSH

In order to SSH into each node, OpenSSH 7.0+ must be installed on each node.

### Kubernetes

Refer to the [RKE release notes](https://github.com/rancher/rke/releases) for the supported versions of Kubernetes.

### Docker

Each Kubernetes version supports different Docker versions. The Kubernetes release notes contain the [current list](https://kubernetes.io/docs/setup/release/notes/#dependencies) of validated Docker versions.

### Installing Docker

Refer to [Installing Docker]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/installing-docker/)

### Checking the Installed Docker Version

Confirm that a Kubernetes supported version of Docker is installed on your machine, by running `docker version --format '{{.Server.Version}}'`.

## Hardware

This section describes the hardware requirements for the worker role, large Kubernetes clusters, and etcd clusters.

### Worker Role

The hardware requirements for nodes with the `worker` role mostly depend on your workloads. The minimum to run the Kubernetes node components is 1 CPU (core) and 1GB of memory.

Regarding CPU and memory, it is recommended that the different planes of Kubernetes clusters (etcd, controlplane, and workers) should be hosted on different nodes so that they can scale separately from each other.

### Large Kubernetes Clusters

For hardware recommendations for large Kubernetes clusters, refer to the official Kubernetes documentation on [building large clusters](https://kubernetes.io/docs/setup/best-practices/cluster-large/).

### Etcd Clusters

For hardware recommendations for etcd clusters in production, refer to the official [etcd documentation](https://etcd.io/docs/v3.5/op-guide/hardware/).

## Ports
{{< ports-rke-nodes >}}
{{< requirements_ports_rke >}}

If you are using an external firewall, make sure you have this port opened between the machine you are using to run `rke` and the nodes that you are going to use in the cluster.


### Opening port TCP/6443 using `iptables`

```
# Open TCP/6443 for all
iptables -A INPUT -p tcp --dport 6443 -j ACCEPT

# Open TCP/6443 for one specific IP
iptables -A INPUT -p tcp -s your_ip_here --dport 6443 -j ACCEPT
```

## SSH Server Configuration

Your SSH server system-wide configuration file, located at `/etc/ssh/sshd_config`, must include this line that allows TCP forwarding:

```
AllowTcpForwarding yes
```
  
In some cases (e.g., RHEL 8), you also need to set below parameters:

```
AllowStreamLocalForwarding yes
DisableForwarding no
```


