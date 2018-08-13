---
title: Cleaning cluster nodes
weight: 375
---
When adding a node to a cluster, resources (containers/(virtual) network interfaces) and configuration items (certificates/configuration files) are created. When removing a node from a cluster (if it is in `Active` state), those resources will be automatically cleaned and the only action needed is to restart the node. When a node has become unreachable and the automatic cleanup process cannot be used, we describe the steps that need to be executed before the node can be added to a cluster again.

## Removing a node from a cluster via Rancher UI

When the node is in `Active` state, removing the node from a cluster will trigger a process to clean up the node. Please restart the node after the automatic cleanup process is done to make sure any non-persistent data is properly removed.

* How to restart a node

```
# using reboot
reboot

# using shutdown
shutdown -r now
```

## Cleaning a node manually

When a node is unreachable and removed from the cluster, the automatic cleaning process can't be triggered because the node is unreachable. Please follow the steps below to manually clean the node.

>**Warning:** The commands listed below will remove data from the node. Make sure you have created a backup of files you want to keep before executing any of the commands as data will be lost.

### Docker containers, images and volumes

Based on what role you assigned to the node, Kubernetes components in containers, containers belonging to overlay networking, DNS, ingress controller and Rancher agent. (and pods you created that have been scheduled to this node)

* How to clean all Docker containers, images and volumes:

```
docker rm -f $(docker ps -qa)
docker rmi -f $(docker images -q)
docker volume rm $(docker volume ls -q)
```

### Mounts

Kubernetes components and secrets leave behind mounts on the system that need to be unmounted.

Mounts |
--------|
`/var/lib/kubelet/pods/XXX` (miscellaneous mounts)  |
`/var/lib/kubelet` |
`/var/lib/rancher` |

* How to unmount all mounts:

```
for mount in $(mount | grep tmpfs | grep '/var/lib/kubelet' | awk '{ print $3 }') /var/lib/kubelet /var/lib/rancher; do umount $mount; done
```

### Directories and files

The following directories are used when adding a node to a cluster, and should be removed. You can remove a directory using `rm -rf /directory_name`.

>**Note:** Depending on the role you assigned to the node, some of the directories will or won't be present on the node.

Directories |
--------|
`/etc/ceph` |
`/etc/cni` |
`/etc/kubernetes` |
`/opt/cni` |
`/opt/rke` |
`/run/secrets/kubernetes.io` |
`/run/calico` |
`/run/flannel` |
`/var/lib/calico` |
`/var/lib/etcd` |
`/var/lib/cni` |
`/var/lib/kubelet` |
`/var/lib/rancher` |
`/var/log/containers` |
`/var/log/pods` |
`/var/run/calico` |

* How to clean the directories:

```
rm -rf /etc/ceph \
       /etc/cni \
       /etc/kubernetes \
       /opt/cni \
       /opt/rke \
       /run/secrets/kubernetes.io \
       /run/calico \
       /run/flannel \
       /var/lib/calico \
       /var/lib/etcd \
       /var/lib/cni \
       /var/lib/kubelet \
       /var/lib/rancher \
       /var/log/containers \
       /var/log/pods \
       /var/run/calico
```

### Network interfaces and iptables

The remaining two components that are changed/configured are (virtual) network interfaces and iptables rules. Both are non-persistent to the node, meaning that they will be cleared after a restart of the node. 

This is the recommended method. 

* How to restart a node

```
# using reboot
reboot

# using shutdown
shutdown -r now
```

If you want to know more on (virtual) network interfaces or iptables rules, please see the specific subjects below.

### Network interfaces

>**Note:** Depending on the network provider configured for the cluster the node was part of, some of the interfaces will or won't be present on the node.

Interfaces |
--------|
`flannel.1` |
`cni0` |
`tunl0` |
`caliXXXXXXXXXXX` (random interface names)  |
`vethXXXXXXXX` (random interface names)  |

* How to list all interfaces:

```
# Using ip
ip address show

# Using ifconfig
ifconfig -a
```

* How to remove an interface:

```
ip link delete interface_name
```

### Iptables

>**Note:** Depending on the network provider configured for the cluster the node was part of, some of the chains will or won't be present on the node.

Iptables rules are used to route traffic from and to containers. The created rules are not persistent, so restarting the node will restore iptables to it's original state.

Chains |
--------|
`cali-failsafe-in` |
`cali-failsafe-out` |
`cali-fip-dnat` |
`cali-fip-snat` |
`cali-from-hep-forward` |
`cali-from-host-endpoint` |
`cali-from-wl-dispatch` |
`cali-fw-caliXXXXXXXXXXX` (random chain names) |
`cali-nat-outgoing` |
`cali-pri-kns.NAMESPACE` (chain per namespace) |
`cali-pro-kns.NAMESPACE` (chain per namespace) |
`cali-to-hep-forward` |
`cali-to-host-endpoint` |
`cali-to-wl-dispatch` |
`cali-tw-caliXXXXXXXXXXX` (random chain names) |
`cali-wl-to-host` |
`KUBE-EXTERNAL-SERVICES` |
`KUBE-FIREWALL` |
`KUBE-MARK-DROP` |
`KUBE-MARK-MASQ` |
`KUBE-NODEPORTS` |
`KUBE-SEP-XXXXXXXXXXXXXXXX` (random chain names) |
`KUBE-SERVICES` |
`KUBE-SVC-XXXXXXXXXXXXXXXX` (random chain names) |

* How to list all iptables rules

```
iptables -L -t nat
iptables -L -t mangle
iptables -L
```