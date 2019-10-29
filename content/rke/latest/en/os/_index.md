---
title: Requirements
weight: 5
aliases:
  - /rke/latest/en/installation/os
---
**In this section:** 

<!-- TOC -->

- [Operating System](#operating-system)
    - [General Linux Requirements](#general-linux-requirements)
    - [Red Hat Enterprise Linux (RHEL) / Oracle Enterprise Linux (OEL) / CentOS](#red-hat-enterprise-linux-rhel-oracle-enterprise-linux-oel-centos)

        - [Using upstream Docker](#using-upstream-docker)
        - [Using RHEL/CentOS packaged Docker](#using-rhel-centos-packaged-docker)
    - [Notes about Atomic Nodes](#red-hat-atomic)

        - [OpenSSH version](#openssh-version)
        - [Creating a Docker Group](#creating-a-docker-group)
- [Software](#software)
- [Ports](#ports)

    - [Opening port TCP/6443 using `iptables`](#opening-port-tcp-6443-using-iptables)
    - [Opening port TCP/6443 using `firewalld`](#opening-port-tcp-6443-using-firewalld)
- [SSH Server Configuration](#ssh-server-configuration)

<!-- /TOC -->

## Operating System

### General Linux Requirements

RKE runs on almost any Linux OS with Docker installed. Most of the development and testing of RKE occurred on Ubuntu 16.04. However, some OS's have restrictions and specific requirements.

- [SSH user]({{< baseurl >}}/rke/latest/en/config-options/nodes/#ssh-user) - The SSH user used for node access must be a member of the `docker` group on the node:

   ```
   usermod -aG docker <user_name>
   ```
   
> **Note:** Users added to the `docker` group are granted effective root permissions on the host by means of the Docker API. Only choose a user that is intended for this purpose and has its credentials and access properly secured. 

   See [Manage Docker as a non-root user](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user) to see how you can configure access to Docker without using the `root` user.

- Swap should be disabled on any worker nodes

- Following kernel modules should be present. This can be checked using:
   * `modprobe module_name`
   * `lsmod | grep module_name`
   * `grep module_name /lib/modules/$(uname -r)/modules.builtin`, if it's a built-in module
   * The following bash script

```bash
     for module in br_netfilter ip6_udp_tunnel ip_set ip_set_hash_ip ip_set_hash_net iptable_filter iptable_nat iptable_mangle iptable_raw nf_conntrack_netlink nf_conntrack nf_conntrack_ipv4   nf_defrag_ipv4 nf_nat nf_nat_ipv4 nf_nat_masquerade_ipv4 nfnetlink udp_tunnel veth vxlan x_tables xt_addrtype xt_conntrack xt_comment xt_mark xt_multiport xt_nat xt_recent xt_set  xt_statistic xt_tcpudp;
     do
       if ! lsmod | grep -q $module; then
         echo "module $module is not present";
       fi;
     done
```

Module name |
------------|
br_netfilter |
ip6_udp_tunnel |
ip_set |
ip_set_hash_ip |
ip_set_hash_net |
iptable_filter |
iptable_nat |
iptable_mangle |
iptable_raw |
nf_conntrack_netlink |
nf_conntrack |
nf_conntrack_ipv4 |
nf_defrag_ipv4 |
nf_nat |
nf_nat_ipv4 |
nf_nat_masquerade_ipv4 |
nfnetlink |
udp_tunnel |
veth |
vxlan |
x_tables |
xt_addrtype |
xt_conntrack |
xt_comment |
xt_mark |
xt_multiport |
xt_nat |
xt_recent |
xt_set |
xt_statistic |
xt_tcpudp |

- Following sysctl settings must be applied

```
net.bridge.bridge-nf-call-iptables=1
```

### Red Hat Enterprise Linux (RHEL) / Oracle Enterprise Linux (OEL) / CentOS

If using Red Hat Enterprise Linux, Oracle Enterprise Linux or CentOS, you cannot use the `root` user as [SSH user]({{< baseurl >}}/rke/latest/en/config-options/nodes/#ssh-user) due to [Bugzilla 1527565](https://bugzilla.redhat.com/show_bug.cgi?id=1527565). Please follow the instructions below how to setup Docker correctly, based on the way you installed Docker on the node.

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

## Software

This section describes the requirements for Docker, Kubernetes, and SSH.

### OpenSSH

In order to SSH into each node, OpenSSH 7.0+ must be installed on each node.

### Kubernetes

Refer to the [RKE release notes](https://github.com/rancher/rke/releases) for the supported versions of Kubernetes.

### Docker

Each Kubernetes version supports different Docker versions. The Kubernetes release notes contain the [current list](https://kubernetes.io/docs/setup/release/notes/#dependencies) of validated Docker versions.

### Installing Docker

You can either follow the [Docker installation](https://docs.docker.com/install/) instructions or use one of Rancher's [install scripts](https://github.com/rancher/install-docker) to install Docker. For RHEL, please see [How to install Docker on Red Hat Enterprise Linux 7](https://access.redhat.com/solutions/3727511).

Docker Version   | Install Script |
----------|------------------
18.09.2 |  <code>curl https://releases.rancher.com/install-docker/18.09.2.sh &#124; sh</code> |
18.06.2 |  <code>curl https://releases.rancher.com/install-docker/18.06.2.sh &#124; sh</code> |
17.03.2 |  <code>curl https://releases.rancher.com/install-docker/17.03.2.sh &#124; sh</code> |

### Checking the Installed Docker Version

Confirm that a Kubernetes supported version of Docker is installed on your machine, by running `docker version --format '{{.Server.Version}}'`.

```
docker version --format '{{.Server.Version}}'
17.03.2-ce
```

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

### Opening port TCP/6443 using `firewalld`

```
# Open TCP/6443 for all
firewall-cmd --zone=public --add-port=6443/tcp --permanent
firewall-cmd --reload

# Open TCP/6443 for one specific IP
firewall-cmd --permanent --zone=public --add-rich-rule='
  rule family="ipv4"
  source address="your_ip_here/32"
  port protocol="tcp" port="6443" accept'
firewall-cmd --reload
```

## SSH Server Configuration

Your SSH server system-wide configuration file, located at `/etc/ssh/sshd_config`, must include this line that allows TCP forwarding:

```
AllowTcpForwarding yes
```
