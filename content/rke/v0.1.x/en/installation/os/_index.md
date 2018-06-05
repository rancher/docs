---
title: Operating System Notes
weight: 60
draft: true
---

<!-- Add some information about requirements on most operating systems
Add in notes of which OS are currently used-->


### Atomic OS

- Container volumes may have some issues in Atomic OS due to SELinux, most of volumes are mounted in rke with option `z`, however user still need to run the following commands before running rke:
```
# mkdir /opt/cni /etc/cni
# chcon -Rt svirt_sandbox_file_t /etc/cni
# chcon -Rt svirt_sandbox_file_t /opt/cni
```
- OpenSSH 6.4 shipped by default on Atomic CentOS which doesn't support SSH tunneling and therefore breaks rke, upgrading OpenSSH to the latest version supported by Atomic host will solve this problem:
```
# atomic host upgrade
```
- Atomic host doesn't come with docker group by default, you can change ownership of docker.sock to enable specific user to run rke:
```
# chown <user> /var/run/docker.sock
```
