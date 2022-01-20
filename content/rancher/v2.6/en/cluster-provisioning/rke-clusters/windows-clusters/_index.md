---
title: Launching Kubernetes on Windows Clusters
weight: 2240
---

When provisioning a [custom cluster]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/custom-nodes) using Rancher, Rancher uses RKE (the Rancher Kubernetes Engine) to install Kubernetes on your existing nodes.

In a Windows cluster provisioned with Rancher, the cluster must contain both Linux and Windows nodes. The Kubernetes controlplane can only run on Linux nodes, and the Windows nodes can only have the worker role. Windows nodes can only be used for deploying workloads.

Some other requirements for Windows clusters include:

- You can only add Windows nodes to a cluster if Windows support is enabled when the cluster is created. Windows support cannot be enabled for existing clusters.
- Kubernetes 1.15+ is required.
- The Flannel network provider must be used.
- Windows nodes must have 50 GB of disk space.

For the full list of requirements, see [this section.](#requirements-for-windows-clusters)

For a summary of Kubernetes features supported in Windows, see the Kubernetes documentation on [supported functionality and limitations for using Kubernetes with Windows](https://kubernetes.io/docs/setup/production-environment/windows/intro-windows-in-kubernetes/#supported-functionality-and-limitations) or the [guide for scheduling Windows containers in Kubernetes](https://kubernetes.io/docs/setup/production-environment/windows/user-guide-windows-containers/).

This guide covers the following topics:

<!-- TOC -->

- [Changes in Rancher v2.6](#changes-in-rancher-v2-6)
- [Requirements](#requirements-for-windows-clusters)
- [Tutorial: How to Create a Cluster with Windows Support](#tutorial-how-to-create-a-cluster-with-windows-support)
- [Configuration for Storage Classes in Azure](#configuration-for-storage-classes-in-azure)
  <!-- /TOC -->

  # Changes in Rancher v2.6

_Tech Preview_

Rancher v2.6 introduces provisioning for [RKE2](https://docs.rke2.io/) clusters directly from the Rancher UI. RKE2, also known as RKE Government, is a fully conformant Kubernetes distribution that focuses on security and compliance within the U.S. Federal Government sector.

The RKE2 provisioning tech preview also includes installing RKE2 on Windows clusters. Windows features for RKE2 include:

- Windows Containers with RKE2 powered by containerd
- Added provisioning of Windows RKE2 custom clusters directly from the Rancher UI
- Calico CNI for Windows RKE2 custom clusters
- SAC releases of Windows Server (2004 and 20H2) are included in the technical preview

Windows Support for RKE2 Custom Clusters requires choosing Calico as the CNI.

# Requirements for Windows Clusters

The general node requirements for networking, operating systems, and Docker are the same as the node requirements for a [Rancher installation]({{<baseurl>}}/rancher/v2.6/en/installation/requirements/).

### OS and Docker Requirements

Our support for Windows Server and Windows containers match the Microsoft official lifecycle for LTSC (Long-Term Servicing Channel) and SAC (Semi-Annual Channel).

For the support lifecycle dates for Windows Server, see the [Microsoft Documentation.](https://docs.microsoft.com/en-us/windows-server/get-started/windows-server-release-info)

### Kubernetes Version

Kubernetes v1.15+ is required.

If you are using Kubernetes v1.21 with Windows Server 20H2 Standard Core, the patch "2019-08 Servicing Stack Update for Windows Server" must be installed on the node.

### Node Requirements

The hosts in the cluster need to have at least:

- 2 core CPUs
- 5 GB memory
- 50 GB disk space

Rancher will not provision the node if the node does not meet these requirements.

### Networking Requirements

Before provisioning a new cluster, be sure that you have already installed Rancher on a device that accepts inbound network traffic. This is required in order for the cluster nodes to communicate with Rancher. If you have not already installed Rancher, please refer to the [installation documentation]({{<baseurl>}}/rancher/v2.6/en/installation/) before proceeding with this guide.

Rancher only supports Windows using Flannel as the network provider.

There are two network options: [**Host Gateway (L2bridge)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) and [**VXLAN (Overlay)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#vxlan). The default option is **VXLAN (Overlay)** mode.

For **Host Gateway (L2bridge)** networking, it's best to use the same Layer 2 network for all nodes. Otherwise, you need to configure the route rules for them. For details, refer to the [documentation on configuring cloud-hosted VM routes.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements/#cloud-hosted-vm-routes-configuration) You will also need to [disable private IP address checks]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements/#disabling-private-ip-address-checks) if you are using Amazon EC2, Google GCE, or Azure VM.

For **VXLAN (Overlay)** networking, the [KB4489899](https://support.microsoft.com/en-us/help/4489899) hotfix must be installed. Most cloud-hosted VMs already have this hotfix.

If you are configuring DHCP options sets for an AWS virtual private cloud, note that in the `domain-name` option field, only one domain name can be specified. According to the DHCP options [documentation:](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_DHCP_Options.html)

> Some Linux operating systems accept multiple domain names separated by spaces. However, other Linux operating systems and Windows treat the value as a single domain, which results in unexpected behavior. If your DHCP options set is associated with a VPC that has instances with multiple operating systems, specify only one domain name.

### Rancher on vSphere with ESXi 6.7u2 and above

If you are using Rancher on VMware vSphere with ESXi 6.7u2 or later with Red Hat Enterprise Linux 8.3, CentOS 8.3, or SUSE Enterprise Linux 15 SP2 or later, it is necessary to disable the `vmxnet3` virtual network adapter hardware offloading feature. Failure to do so will result in all network connections between pods on different cluster nodes to fail with timeout errors. All connections from Windows pods to critical services running on Linux nodes, such as CoreDNS, will fail as well. It is also possible that external connections may fail. This issue is the result of Linux distributions enabling the hardware offloading feature in `vmxnet3` and a bug in the `vmxnet3` hardware offloading feature that results in the discarding of packets for guest overlay traffic. To address this issue, it is necessary disable the `vmxnet3` hardware offloading feature. This setting does not survive reboot, so it is necessary to disable on every boot. The recommended course of action is to create a systemd unit file at `/etc/systemd/system/disable_hw_offloading.service`, which disables the `vmxnet3` hardware offloading feature on boot. A sample systemd unit file which disables the `vmxnet3` hardware offloading feature is as follows. Note that `<VM network interface>` must be customized to the host `vmxnet3` network interface, e.g., `ens192`:

```
[Unit]
Description=Disable vmxnet3 hardware offloading feature

[Service]
Type=oneshot
ExecStart=ethtool -K <VM network interface> tx-udp_tnl-segmentation off
ExecStart=ethtool -K <VM network interface> tx-udp_tnl-csum-segmentation off
StandardOutput=journal

[Install]
WantedBy=multi-user.target
```
Then set the appropriate permissions on the systemd unit file:
```
chmod 0644 /etc/systemd/system/disable_hw_offloading.service
```
Finally, enable the systemd service:
```
systemctl enable disable_hw_offloading.service
```

### Architecture Requirements

The Kubernetes cluster management nodes (`etcd` and `controlplane`) must be run on Linux nodes.

The `worker` nodes, which is where your workloads will be deployed on, will typically be Windows nodes, but there must be at least one `worker` node that is run on Linux in order to run the Rancher cluster agent, DNS, metrics server, and Ingress related containers.

We recommend the minimum three-node architecture listed in the table below, but you can always add additional Linux and Windows workers to scale up your cluster for redundancy:

<a id="guide-architecture"></a>

| Node   | Operating System                                    | Kubernetes Cluster Role(s)                                                                                                                                                                                                                         | Purpose                                                                             |
| ------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Node 1 | Linux (Ubuntu Server 18.04 recommended)             | Control plane, etcd, worker | Manage the Kubernetes cluster                                                       |
| Node 2 | Linux (Ubuntu Server 18.04 recommended)             | Worker                                                                                                                                                                       | Support the Rancher Cluster agent, Metrics server, DNS, and Ingress for the cluster |
| Node 3 | Windows (Windows Server core version 1809 or above) | Worker                                                                                                                                                                       | Run your Windows containers                                                         |

### Container Requirements

Windows requires that containers must be built on the same Windows Server version that they are being deployed on. Therefore, containers must be built on Windows Server core version 1809 or above. If you have existing containers built for an earlier Windows Server core version, they must be re-built on Windows Server core version 1809 or above.

### Cloud Provider Specific Requirements

If you set a Kubernetes cloud provider in your cluster, some additional steps are required. You might want to set a cloud provider if you want to want to leverage a cloud provider's capabilities, for example, to automatically provision storage, load balancers, or other infrastructure for your cluster. Refer to [this page]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/cloud-providers/) for details on how to configure a cloud provider cluster of nodes that meet the prerequisites.

If you are using the GCE (Google Compute Engine) cloud provider, you must do the following:

- Enable the GCE cloud provider in the `cluster.yml` by following [these steps.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/cloud-providers/gce)
- When provisioning the cluster in Rancher, choose **Custom cloud provider** as the cloud provider in the Rancher UI.

# Tutorial: How to Create a Cluster with Windows Support

This tutorial describes how to create a Rancher-provisioned cluster with the three nodes in the [recommended architecture.](#guide-architecture)

When you provision a cluster with Rancher on existing nodes, you will add nodes to the cluster by installing the [Rancher agent]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/custom-nodes/agent-options/) on each one. When you create or edit your cluster from the Rancher UI, you will see a **Customize Node Run Command** that you can run on each server to add it to your cluster.

To set up a cluster with support for Windows nodes and containers, you will need to complete the tasks below.

<!-- TOC -->

1. [Provision Hosts](#1-provision-hosts)
1. [Create the Cluster on Existing Nodes](#2-create-the-cluster-on-existing-nodes)
1. [Add Nodes to the Cluster](#3-add-nodes-to-the-cluster)
1. [Optional: Configuration for Azure Files](#4-optional-configuration-for-azure-files)
   <!-- /TOC -->

# 1. Provision Hosts

To begin provisioning a cluster on existing nodes with Windows support, prepare your hosts.

Your hosts can be:

- Cloud-hosted VMs
- VMs from virtualization clusters
- Bare-metal servers

You will provision three nodes:

- One Linux node, which manages the Kubernetes control plane and stores your `etcd`
- A second Linux node, which will be another worker node
- The Windows node, which will run your Windows containers as a worker node

| Node   | Operating System                                             |
| ------ | ------------------------------------------------------------ |
| Node 1 | Linux (Ubuntu Server 18.04 recommended)                      |
| Node 2 | Linux (Ubuntu Server 18.04 recommended)                      |
| Node 3 | Windows (Windows Server core version 1809 or above required) |

If your nodes are hosted by a **Cloud Provider** and you want automation support such as loadbalancers or persistent storage devices, your nodes have additional configuration requirements. For details, see [Selecting Cloud Providers.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/cloud-providers)

# 2. Create the Cluster on Existing Nodes

The instructions for creating a Windows cluster on existing nodes are very similar to the general [instructions for creating a custom cluster]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/custom-nodes/) with some Windows-specific requirements.

1. In the upper left corner, click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create**.
1. Click **Custom**.
1. Enter a name for your cluster in the **Cluster Name** field.
1. In the **Kubernetes Version** dropdown menu, select v1.19 or above.
1. In the **Network Provider** field, select **Flannel**.
1. In the **Windows Support** section, click **Enabled**.
1. Optional: After you enable Windows support, you will be able to choose the Flannel backend. There are two network options: [**Host Gateway (L2bridge)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) and [**VXLAN (Overlay)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#vxlan). The default option is **VXLAN (Overlay)** mode.
1. Click **Next**.

> **Important:** For <b>Host Gateway (L2bridge)</b> networking, it's best to use the same Layer 2 network for all nodes. Otherwise, you need to configure the route rules for them. For details, refer to the [documentation on configuring cloud-hosted VM routes.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements/#cloud-hosted-vm-routes-configuration) You will also need to [disable private IP address checks]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements/#disabling-private-ip-address-checks) if you are using Amazon EC2, Google GCE, or Azure VM.

# 3. Add Nodes to the Cluster

This section describes how to register your Linux and Worker nodes to your cluster. You will run a command on each node, which will install the Rancher agent and allow Rancher to manage each node.

### Add Linux Master Node

In this section, we fill out a form on the Rancher UI to get a custom command to install the Rancher agent on the Linux master node. Then we will copy the command and run it on our Linux master node to register the node in the cluster.

The first node in your cluster should be a Linux host has both the **Control Plane** and **etcd** roles. At a minimum, both of these roles must be enabled for this node, and this node must be added to your cluster before you can add Windows hosts.

1. In the **Node Operating System** section, click **Linux**.
1. In the **Node Role** section, choose at least **etcd** and **Control Plane**. We recommend selecting all three.
1. Optional: If you click **Show advanced options,** you can customize the settings for the [Rancher agent]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/custom-nodes/agent-options/) and [node labels.](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)
1. Copy the command displayed on the screen to your clipboard.
1. SSH into your Linux host and run the command that you copied to your clipboard.
1. When you are finished provisioning your Linux node(s), select **Done**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning**. Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active**.

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces


It may take a few minutes for the node to be registered in your cluster.

### Add Linux Worker Node

In this section, we run a command to register the Linux worker node to the cluster.

After the initial provisioning of your cluster, your cluster only has a single Linux host. Next, we add another Linux `worker` host, which will be used to support _Rancher cluster agent_, _Metrics server_, _DNS_ and _Ingress_ for your cluster.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **⋮ > Edit Config**.
1. Scroll down to **Node Operating System**. Choose **Linux**.
1. In the **Customize Node Run Command** section, go to the **Node Options** and select the **Worker** role.
1. Copy the command displayed on screen to your clipboard.
1. Log in to your Linux host using a remote Terminal connection. Run the command copied to your clipboard.
1. From **Rancher**, click **Save**.

**Result:** The **Worker** role is installed on your Linux host, and the node registers with Rancher. It may take a few minutes for the node to be registered in your cluster.

> **Note:** Taints on Linux Worker Nodes
>
> For each Linux worker node added into the cluster, the following taints will be added to Linux worker node. By adding this taint to the Linux worker node, any workloads added to the Windows cluster will be automatically scheduled to the Windows worker node. If you want to schedule workloads specifically onto the Linux worker node, you will need to add tolerations to those workloads.

> | Taint Key      | Taint Value | Taint Effect |
> | -------------- | ----------- | ------------ |
> | `cattle.io/os` | `linux`     | `NoSchedule` |

### Add a Windows Worker Node

In this section, we run a command to register the Windows worker node to the cluster.

You can add Windows hosts to the cluster by editing the cluster and choosing the **Windows** option.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster that you created and click **⋮ > Edit Config**.
1. Scroll down to **Node Operating System**. Choose **Windows**. Note: You will see that the **worker** role is the only available role.
1. Copy the command displayed on screen to your clipboard.
1. Log in to your Windows host using your preferred tool, such as [Microsoft Remote Desktop](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients). Run the command copied to your clipboard in the **Command Prompt (CMD)**.
1. From Rancher, click **Save**.
1. Optional: Repeat these instructions if you want to add more Windows nodes to your cluster.

**Result:** The **Worker** role is installed on your Windows host, and the node registers with Rancher. It may take a few minutes for the node to be registered in your cluster. You now have a Windows Kubernetes cluster.

### Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/cluster-access/kubectl/#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.
- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/cluster-access/kubectl/#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through the Rancher server. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.

# Configuration for Storage Classes in Azure

If you are using Azure VMs for your nodes, you can use [Azure files](https://docs.microsoft.com/en-us/azure/aks/azure-files-dynamic-pv) as a StorageClass for the cluster. For details, refer to [this section.]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/windows-clusters/azure-storageclass)
