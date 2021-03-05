---
title: Removing Kubernetes Components from Nodes
description: Learn about cluster cleanup when removing nodes from your Rancher-launched Kubernetes cluster. What is removed, how to do it manually
weight: 2055
aliases:
  - /rancher/v2.5/en/faq/cleaning-cluster-nodes/
---

This section describes how to disconnect a node from a Rancher-launched Kubernetes cluster and remove all of the Kubernetes components from the node. This process allows you to use the node for other purposes.

When you use Rancher to install Kubernetes on new nodes in an infrastructure provider, resources (containers/virtual network interfaces) and configuration items (certificates/configuration files) are created.

When removing nodes from your Rancher launched Kubernetes cluster (provided that they are in `Active` state), those resources are automatically cleaned, and the only action needed is to restart the node. When a node has become unreachable and the automatic cleanup process cannot be used, we describe the steps that need to be executed before the node can be added to a cluster again.

## What Gets Removed?

When cleaning nodes provisioned using Rancher, the following components are deleted based on the type of cluster node you're removing.

| Removed Component                                                              | [Nodes Hosted by Infrastructure Provider][1] | [Custom Nodes][2] | [Hosted Cluster][3] | [Registered Nodes][4] |
| ------------------------------------------------------------------------------ | --------------- | ----------------- | ------------------- | ------------------- |
| The Rancher deployment namespace (`cattle-system` by default)                  | ✓               | ✓                 | ✓                   | ✓                   |
| `serviceAccount`, `clusterRoles`, and `clusterRoleBindings` labeled by Rancher | ✓               | ✓                 | ✓                   | ✓                   |
| Labels, Annotations, and Finalizers                                            | ✓               | ✓                 | ✓                   | ✓                   |
| Rancher Deployment                                                             | ✓               | ✓                 | ✓                   |                     |
| Machines, clusters, projects, and user custom resource definitions (CRDs)      | ✓               | ✓                 | ✓                   |                     |
| All resources create under the `management.cattle.io` API Group                | ✓               | ✓                 | ✓                   |                     |
| All CRDs created by Rancher v2.x                                               | ✓               | ✓                 | ✓                   |                     |

[1]: {{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/
[2]: {{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/custom-nodes/
[3]: {{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/
[4]: {{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/registered-clusters/

## Removing a Node from a Cluster by Rancher UI

When the node is in `Active` state, removing the node from a cluster will trigger a process to clean up the node. Please restart the node after the automatic cleanup process is done to make sure any non-persistent data is properly removed.

**To restart a node:**

```
# using reboot
$ sudo reboot

# using shutdown
$ sudo shutdown -r now
```

## Removing Rancher Components from a Cluster Manually

When a node is unreachable and removed from the cluster, the automatic cleaning process can't be triggered because the node is unreachable. Please follow the steps below to manually remove the Rancher components.

>**Warning:** The commands listed below will remove data from the node. Make sure you have created a backup of files you want to keep before executing any of the commands as data will be lost.

### Removing Rancher Components from Registered Clusters

For registered clusters, the process for removing Rancher is a little different. You have the option of simply deleting the cluster in the Rancher UI, or your can run a script that removes Rancher components from the nodes. Both options make the same deletions.

After the registered cluster is detached from Rancher, the cluster's workloads will be unaffected and you can access the cluster using the same methods that you did before the cluster was registered into Rancher.

{{% tabs %}}
{{% tab "By UI / API" %}}
>**Warning:** This process will remove data from your cluster. Make sure you have created a backup of files you want to keep before executing the command, as data will be lost.

After you initiate the removal of a registered cluster using the Rancher UI (or API), the following events occur.

1. Rancher creates a `serviceAccount` that it uses to remove the Rancher components from the cluster. This account is assigned the [clusterRole](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-and-clusterrole) and [clusterRoleBinding](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding) permissions, which are required to remove the Rancher components.

1. Using the `serviceAccount`, Rancher schedules and runs a [job](https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/) that cleans the Rancher components off of the cluster. This job also references the `serviceAccount` and its roles as dependencies, so the job deletes them before its completion.

1. Rancher is removed from the cluster. However, the cluster persists, running the native version of Kubernetes.

**Result:** All components listed for registered clusters in [What Gets Removed?](#what-gets-removed) are deleted.

{{% /tab %}}
{{% tab "By Script" %}}
Rather than cleaning registered cluster nodes using the Rancher UI, you can run a script instead.

>**Prerequisite:**
>
>Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

1. Open a web browser, navigate to [GitHub](https://github.com/rancher/rancher/blob/master/cleanup/user-cluster.sh), and download `user-cluster.sh`.

1. Make the script executable by running the following command from the same directory as `user-cluster.sh`:

    ```
    chmod +x user-cluster.sh
    ```

1. **Air Gap Environments Only:** Open `user-cluster.sh` and replace `yaml_url` with the URL in `user-cluster.yml`.

    If you don't have an air gap environment, skip this step.

1. From the same directory, run the script and provide the `rancher/rancher-agent` image version which should be equal to the version of Rancher used to manage the cluster. (`<RANCHER_VERSION>`):

    >**Tip:**
    >
    >Add the `-dry-run` flag to preview the script's outcome without making changes.
    ```
    ./user-cluster.sh rancher/rancher-agent:<RANCHER_VERSION>
    ```

**Result:** The script runs. All components listed for registered clusters in [What Gets Removed?](#what-gets-removed) are deleted.

{{% /tab %}}
{{% /tabs %}}

### Windows Nodes

To clean up a Windows node, you can run a cleanup script located in `c:\etc\rancher`. The script deletes Kubernetes generated resources and the execution binary. It also drops the firewall rules and network settings.

To run the script, you can use this command in the PowerShell:

```
pushd c:\etc\rancher
.\cleanup.ps1
popd
```

**Result:** The node is reset and can be re-added to a Kubernetes cluster.

### Docker Containers, Images, and Volumes

Based on what role you assigned to the node, there are Kubernetes components in containers, containers belonging to overlay networking, DNS, ingress controller and Rancher agent. (and pods you created that have been scheduled to this node)

**To clean all Docker containers, images and volumes:**

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

**To unmount all mounts:**

```
for mount in $(mount | grep tmpfs | grep '/var/lib/kubelet' | awk '{ print $3 }') /var/lib/kubelet /var/lib/rancher; do umount $mount; done
```

### Directories and Files

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
`/var/lib/rancher/rke/log` |
`/var/log/containers` |
`/var/log/kube-audit` |
`/var/log/pods` |
`/var/run/calico` |

**To clean the directories:**

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
       /var/lib/rancher/rke/log \
       /var/log/containers \
       /var/log/kube-audit \
       /var/log/pods \
       /var/run/calico
```

### Network Interfaces and Iptables

The remaining two components that are changed/configured are (virtual) network interfaces and iptables rules. Both are non-persistent to the node, meaning that they will be cleared after a restart of the node. To remove these components, a restart is recommended.

**To restart a node:**

```
# using reboot
$ sudo reboot

# using shutdown
$ sudo shutdown -r now
```

If you want to know more on (virtual) network interfaces or iptables rules, please see the specific subjects below.

### Network Interfaces

>**Note:** Depending on the network provider configured for the cluster the node was part of, some of the interfaces will or won't be present on the node.

Interfaces |
--------|
`flannel.1` |
`cni0` |
`tunl0` |
`caliXXXXXXXXXXX` (random interface names)  |
`vethXXXXXXXX` (random interface names)  |

**To list all interfaces:**

```
# Using ip
ip address show

# Using ifconfig
ifconfig -a
```

**To remove an interface:**

```
ip link delete interface_name
```

### Iptables

>**Note:** Depending on the network provider configured for the cluster the node was part of, some of the chains will or won't be present on the node.

Iptables rules are used to route traffic from and to containers. The created rules are not persistent, so restarting the node will restore iptables to its original state.

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

**To list all iptables rules:**

```
iptables -L -t nat
iptables -L -t mangle
iptables -L
```
