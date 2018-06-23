---
title: Operating System Notes
weight: 55
draft: true
---

RKE runs on almost any Linux OS with Docker installed. Most of the development and testing of RKE occurred on Ubuntu 16.04. However, some OS's have restrictions and specific requirements.

RKE runs on almost any Linux OS with docker installed. Most of the development and testing of RKE were done on Ubuntu 16.04. Our testing also include CentOS,  RHEL and RancherOS. However, some OS's have restrictions and have specific requirements. 

- For  Kubernetes versions 1.8, 1.9 and 1.10, Docker versions `1.11.2` up to `1.13.1` and `17.03.x` are validated
- OpenSSH 7.0+ must be installed on each node for stream local forwarding to work
- The SSH user used for node access must be a member of the `docker` group on the node:

   ```
   usermod -aG docker <user_name>
   ```

- Ports 6443, 2379, and 2380 should be opened between cluster nodes.
- Swap should be disabled on any worker nodes


## Atomic Hosts

Before trying to use RKE with Atomic hosts, there are a couple of updates to the OS that need to occur in order to get RKE working.

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
