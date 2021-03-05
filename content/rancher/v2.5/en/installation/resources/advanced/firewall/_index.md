---
title: Opening Ports with firewalld
weight: 1
---

> We recommend disabling firewalld. For Kubernetes 1.19, firewalld must be turned off.

Some distributions of Linux [derived from RHEL,](https://en.wikipedia.org/wiki/Red_Hat_Enterprise_Linux#Rebuilds) including Oracle Linux, may have default firewall rules that block communication with Helm.

For example, one Oracle Linux image in AWS has REJECT rules that stop Helm from communicating with Tiller:

```
Chain INPUT (policy ACCEPT)
target     prot opt source               destination
ACCEPT     all  --  anywhere             anywhere             state RELATED,ESTABLISHED
ACCEPT     icmp --  anywhere             anywhere
ACCEPT     all  --  anywhere             anywhere
ACCEPT     tcp  --  anywhere             anywhere             state NEW tcp dpt:ssh
REJECT     all  --  anywhere             anywhere             reject-with icmp-host-prohibited

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination
REJECT     all  --  anywhere             anywhere             reject-with icmp-host-prohibited

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination
```

You can check the default firewall rules with this command:

```
sudo iptables --list
```

This section describes how to use `firewalld` to apply the [firewall port rules]({{<baseurl>}}/rancher/v2.5/en/installation/references) for nodes in a high-availability Rancher server cluster.

# Prerequisite

Install v7.x or later ofv`firewalld`:

```
yum install firewalld
systemctl start firewalld
systemctl enable firewalld
```

# Applying Firewall Port Rules

In the Rancher high-availability installation instructions, the Rancher server is set up on three nodes that have all three Kubernetes roles: etcd, controlplane, and worker. If your Rancher server nodes have all three roles, run the following commands on each node:

```
firewall-cmd --permanent --add-port=22/tcp
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --permanent --add-port=2376/tcp
firewall-cmd --permanent --add-port=2379/tcp
firewall-cmd --permanent --add-port=2380/tcp
firewall-cmd --permanent --add-port=6443/tcp
firewall-cmd --permanent --add-port=8472/udp
firewall-cmd --permanent --add-port=9099/tcp
firewall-cmd --permanent --add-port=10250/tcp
firewall-cmd --permanent --add-port=10254/tcp
firewall-cmd --permanent --add-port=30000-32767/tcp
firewall-cmd --permanent --add-port=30000-32767/udp
```
If your Rancher server nodes have separate roles, use the following commands based on the role of the node:

```
# For etcd nodes, run the following commands:
firewall-cmd --permanent --add-port=2376/tcp
firewall-cmd --permanent --add-port=2379/tcp
firewall-cmd --permanent --add-port=2380/tcp
firewall-cmd --permanent --add-port=8472/udp
firewall-cmd --permanent --add-port=9099/tcp
firewall-cmd --permanent --add-port=10250/tcp

# For control plane nodes, run the following commands:
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --permanent --add-port=2376/tcp
firewall-cmd --permanent --add-port=6443/tcp
firewall-cmd --permanent --add-port=8472/udp
firewall-cmd --permanent --add-port=9099/tcp
firewall-cmd --permanent --add-port=10250/tcp
firewall-cmd --permanent --add-port=10254/tcp
firewall-cmd --permanent --add-port=30000-32767/tcp
firewall-cmd --permanent --add-port=30000-32767/udp

# For worker nodes, run the following commands:
firewall-cmd --permanent --add-port=22/tcp
firewall-cmd --permanent --add-port=80/tcp
firewall-cmd --permanent --add-port=443/tcp
firewall-cmd --permanent --add-port=2376/tcp
firewall-cmd --permanent --add-port=8472/udp
firewall-cmd --permanent --add-port=9099/tcp
firewall-cmd --permanent --add-port=10250/tcp
firewall-cmd --permanent --add-port=10254/tcp
firewall-cmd --permanent --add-port=30000-32767/tcp
firewall-cmd --permanent --add-port=30000-32767/udp
```

After the `firewall-cmd` commands have been run on a node, use the following command to enable the firewall rules:

```
firewall-cmd --reload
```

**Result:** The firewall is updated so that Helm can communicate with the Rancher server nodes.
