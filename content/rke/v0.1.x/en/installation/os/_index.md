---
title: Operating System Requirements
weight: 55
---

RKE runs on almost any Linux OS with Docker installed. Most of the development and testing of RKE occurred on Ubuntu 16.04. However, some OS's have restrictions and specific requirements.

- [SSH user]({{< baseurl >}}/rke/v0.1.x/en/config-options/nodes/#ssh-user) - The SSH user used for node access must be a member of the `docker` group on the node:

   ```
   usermod -aG docker <user_name>
   ```
- Swap should be disabled on any worker nodes

### Software

- Docker - Each Kubernetes version supports different Docker versions.

Kubernetes Version | Docker 1.12.6 | Docker 1.13.1 | Docker 17.03.2 |
----|----|----|----|
v1.10.x | X | X | X |
v1.9.x | X | X | X |
v1.8.x | X | X | X |

You can either follow the [Docker installation](https://docs.docker.com/install/) instructions or use one of Rancher's [install scripts](https://github.com/rancher/install-docker) to install Docker.

Docker Version   | Install Script |
----------|------------------
17.03.2 |  <code>curl https://releases.rancher.com/install-docker/17.03.sh &#124; sh</code> |
1.13.1  | <code>curl https://releases.rancher.com/install-docker/1.13.sh &#124; sh</code> |
1.12.6  |  <code>curl https://releases.rancher.com/install-docker/1.12.sh &#124; sh</code> |

Confirm that a Kubernetes supported version of Docker is installed on your machine, by running  `docker version`.

```
$ docker version
Client:
 Version:      17.03.2-ce
 API version:  1.27
 Go version:   go1.7.5
 Git commit:   f5ec1e2
 Built:        Tue Jun 27 03:35:14 2017
 OS/Arch:      linux/amd64

Server:
 Version:      17.03.2-ce
 API version:  1.27 (minimum version 1.12)
 Go version:   go1.7.5
 Git commit:   f5ec1e2
 Built:        Tue Jun 27 03:35:14 2017
 OS/Arch:      linux/amd64
 Experimental: false
```

- OpenSSH 7.0+ - In order to SSH into each node, OpenSSH must be installed on each node.

### Ports

{{< requirements_ports_rke >}}

If you are using an external firewall, make sure you have this port opened between the machine you are using to run `rke` and the nodes that you are going to use in the cluster.


#### Opening port TCP/6443 using `iptables``

```
# Open TCP/6443 for all
iptables -A INPUT -p tcp --dport 6443 -j ACCEPT

# Open TCP/6443 for one specific IP
iptables -A INPUT -p tcp -s your_ip_here --dport 6443 -j ACCEPT
```

#### Opening port TCP/6443 using `firewalld`

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

## Notes about Atomic Nodes

Before trying to use RKE with Atomic nodes, there are a couple of updates to the OS that need to occur in order to get RKE working.

### Container Volumes

In RKE, most of the volumes are mounted with option `z`, but there are some container volumes that may have some issues in Atomic due to SELinux.

Before running RKE, users will need to run the following commands to make some additional directories:

```
# mkdir /opt/cni /etc/cni
# chcon -Rt svirt_sandbox_file_t /etc/cni
# chcon -Rt svirt_sandbox_file_t /opt/cni
```

### OpenSSH version

By default, Atomic hosts ship with OpenSSH 6.4, which doesn't support SSH tunneling, which is a core RKE requirement. If you upgrade to the latest version of OpenSSH supported by Atomic, it will correct the SSH issue.

### Creating a Docker Group

By default, Atomic hosts do not come with a Docker group. You can update the ownership of the Docker socket by enabling the specific user in order to launch RKE.

```
# chown <user> /var/run/docker.sock
```
