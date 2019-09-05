---
title: Configuring Custom Clusters for Windows
weight: 2240
---

_Available as of v2.3.0_


When provisioning a [custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/) using Rancher, Rancher uses RKE (the Rancher Kubernetes Engine) to provision the Kubernetes custom cluster on your existing infrastructure.

You can use a mix of Linux and Windows hosts as your cluster nodes. Windows nodes can only be used for deploying workloads, while Linux nodes are required for cluster management.

You can only add Windows nodes to a cluster if Windows support is enabled. Windows support can be enabled for new custom clusters that use Kubernetes 1.15+ and the Flannel network provider. Windows support cannot be enabled for existing clusters.

For a summary of Kubernetes features supported in Windows, see the Kubernetes documentation on [supported functionality and limitations for using Kubernetes with Windows](https://kubernetes.io/docs/setup/production-environment/windows/intro-windows-in-kubernetes/#supported-functionality-and-limitations) or the [guide for scheduling Windows containers in Kubernetes](https://kubernetes.io/docs/setup/production-environment/windows/user-guide-windows-containers/).

This guide covers the following topics:

<!-- TOC -->
- [Prerequisites](#prerequisites)
- [Requirements](#requirements-for-windows-clusters)
  - [OS and Docker](#os-and-docker)
  - [Hardware](#hardware)
  - [Networking](#networking)
  - [Architecture](#architecture)
  - [Containers](#containers)
- [Tutorial: How to Create a Cluster with Windows Support](#tutorial-how-to-create-a-cluster-with-windows-support)
- [Configuration for Storage Classes in Azure](#configuration-for-storage-classes-in-azure)
<!-- /TOC -->

# Prerequisites

Before provisioning a new cluster, be sure that you have already installed Rancher on a device that accepts inbound network traffic. This is required in order for the cluster nodes to communicate with Rancher. If you have not already installed Rancher, please refer to the [installation documentation]({{< baseurl >}}/rancher/v2.x/en/installation/) before proceeding with this guide.

> **Note on Cloud Providers:** If you set a Kubernetes cloud provider in your cluster, some additional steps are required. You might want to set a cloud provider if you want to want to leverage a cloud provider's capabilities, for example, to automatically provision storage, load balancers, or other infrastructure for your cluster. Refer to [this page]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) for details on how to configure a cloud provider cluster of nodes that meet the prerequisites.

# Requirements for Windows Clusters

For a custom cluster, the general node requirements for networking, operating systems, and Docker are the same as the node requirements for a [Rancher installation]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/).

### OS and Docker

In order to add Windows worker nodes to a cluster, the node must be running Windows Server 2019 (i.e. core version 1903 or above) and [Docker 19.03.]({{<baseurl>}}/rancher/v2.x/en/installation/requirements/)

>**Notes:**
>
>- If you are using AWS, Rancher recommends *Microsoft Windows Server 2019 Base with Containers* as the Amazon Machine Image (AMI).
>- If you are using GCE, Rancher recommends *Windows Server 2019 Datacenter for Containers* as the OS image.

### Hardware

The hosts in the cluster need to have at least:

- 2 core CPUs
- 4.5 GiB memory (~4.83 GB)
- 30 GiB of disk space (~32.21 GB)

Rancher will not provision the node if the node does not meet these requirements.

### Networking

Rancher only supports Windows using Flannel as the network provider.

There are two network options: [**Host Gateway (L2bridge)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) and [**VXLAN (Overlay)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#vxlan). The default option is **VXLAN (Overlay)** mode.

For **Host Gateway (L2bridge)** networking, it's best to use the same Layer 2 network for all nodes. Otherwise, you need to configure the route rules for them. For details, refer to the [documentation on configuring cloud-hosted VM routes.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements/#cloud-hosted-vm-routes-configuration) You will also need to [disable private IP address checks]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements/#disabling-private-ip-address-checks) if you are using Amazon EC2, Google GCE, or Azure VM.

For **VXLAN (Overlay)** networking, the [KB4489899](https://support.microsoft.com/en-us/help/4489899) hotfix must be installed. Most cloud-hosted VMs already have this hotfix.

### Architecture

The Kubernetes cluster management nodes (`etcd` and `controlplane`) must be run on Linux nodes.

The `worker` nodes, which is where your workloads will be deployed on, will typically be Windows nodes, but there must be at least one `worker` node that is run on Linux in order to run the Rancher cluster agent, DNS, metrics server, and Ingress related containers.

We recommend the minimum three-node architecture listed in the table below, but you can always add additional Linux and Windows workers to scale up your cluster for redundancy:

<a id="guide-architecture"></a>

Node    | Operating System | Kubernetes Cluster Role(s) | Purpose
--------|------------------|----------------------------|--------
Node 1  | Linux (Ubuntu Server 18.04 recommended)           | [Control Plane]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#control-plane-nodes), [etcd]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#etcd-nodes), [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes) | Manage the Kubernetes cluster
Node 2  | Linux (Ubuntu Server 18.04 recommended)           | [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes) | Support the Rancher Cluster agent, Metrics server, DNS, and Ingress for the cluster
Node 3  | Windows (Windows Server 2019 required)            | [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes) | Run your Windows containers

### Containers

Windows requires that containers must be built on the same Windows Server version that they are being deployed on. Therefore, containers must be built on Windows Server 2019 core version 1903. If you have existing containers built for an earlier Windows Server 2019 core version, they must be re-built on Windows Server 2019 core version 1903.

# Tutorial: How to Create a Cluster with Windows Support

This tutorial describes how to create a Rancher-provisioned cluster with the three nodes in the [recommended architecture.](#guide-architecture)

When you provision a custom cluster with Rancher, you will add nodes to the cluster by installing the [Rancher agent]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/agent-options/) on each one. When you create or edit your cluster from the Rancher UI, you will see a **Customize Node Run Command** that you can run on each server to add it to your custom cluster.

To set up a custom cluster with support for Windows nodes and containers, you will need to complete the tasks below.

<!-- TOC -->
1. [Provision Hosts](#1-provision-hosts)
1. [Create the Custom Cluster](#2-create-the-custom-cluster)
1. [Add Nodes to the Cluster](#3-add-nodes-to-the-cluster)
1. [Optional: Configuration for Azure Files](#5-optional-configuration-for-azure-files)
<!-- /TOC -->

# 1. Provision Hosts

To begin provisioning a custom cluster with Windows support, prepare your hosts.

Your hosts can be:

- Cloud-hosted VMs
- VMs from virtualization clusters
- Bare-metal servers

You will provision three nodes:

- One Linux node, which manages the Kubernetes control plane and stores your `etcd`
- A second Linux node, which will be another worker node
- The Windows node, which will run your Windows containers as a worker node

Node | Operating System
-----|-----------------
Node 1  | Linux (Ubuntu Server 18.04 recommended)
Node 2  | Linux (Ubuntu Server 18.04 recommended)
Node 3  | Windows (Windows Server 2019 required)

If your nodes are hosted by a **Cloud Provider** and you want automation support such as loadbalancers or persistent storage devices, your nodes have additional configuration requirements. For details, see [Selecting Cloud Providers.]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers)

# 2. Create the Custom Cluster

The instructions for creating a custom cluster that supports Windows nodes are very similar to the general [instructions for creating a custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#2-create-the-custom-cluster) with some Windows-specific requirements.

Windows support only be enabled if the cluster uses Kubernetes v1.15+ and the Flannel network provider.

1. From the **Global** view, click on the **Clusters** tab and click **Add Cluster**.

1. Click **From existing nodes (Custom)**.

1. Enter a name for your cluster in the **Cluster Name** text box.

1. In the **Kubernetes Version** dropdown menu, select v1.15 or above.

1. In the **Network Provider** field, select **Flannel.**

1. In the **Windows Support** section, click **Enable.**

1. Optional: After you enable Windows support, you will be able to choose the Flannel backend. There are two network options: [**Host Gateway (L2bridge)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) and [**VXLAN (Overlay)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#vxlan). The default option is **VXLAN (Overlay)** mode.

1. Click **Next**.

> **Important:** For **Host Gateway (L2bridge)** networking, it's best to use the same Layer 2 network for all nodes. Otherwise, you need to configure the route rules for them. For details, refer to the [documentation on configuring cloud-hosted VM routes.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements/#cloud-hosted-vm-routes-configuration) You will also need to [disable private IP address checks]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/host-gateway-requirements/#disabling-private-ip-address-checks) if you are using Amazon EC2, Google GCE, or Azure VM.

# 3. Add Nodes to the Cluster

This section describes how to register your Linux and Worker nodes to your custom cluster.

### Add Linux Master Node

The first node in your cluster should be a Linux host has both the **Control Plane** and **etcd** roles. At a minimum, both of these roles must be enabled for this node, and this node must be added to your cluster before you can add Windows hosts.

In this section, we fill out a form on the Rancher UI to get a custom command to install the Rancher agent on the Linux master node. Then we will copy the command and run it on our Linux master node to register the node in the cluster.

1. In the **Node Operating System** section, click **Linux**.

1. In the **Node Role** section, choose at least **etcd** and **Control Plane**. We recommend selecting all three.

1. Optional: If you click **Show advanced options,** you can customize the settings for the [Rancher agent]({{< baseurl >}}/rancher/v2.x/en/admin-settings/agent-options/) and [node labels.](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)

1. Copy the command displayed on the screen to your clipboard.

1. SSH into your Linux host and run the command that you copied to your clipboard.

1. When you are finished provisioning your Linux node(s), select **Done**.

{{< result_create-cluster >}}

It may take a few minutes for the node to be registered in your cluster.

### Add Linux Worker Node

After the initial provisioning of your custom cluster, your cluster only has a single Linux host. Next, we add another Linux `worker` host, which will be used to support *Rancher cluster agent*, *Metrics server*, *DNS* and *Ingress* for your cluster.

1. From the **Global** view, click **Clusters.**

1. Go to the custom cluster that you created and click **Ellipsis (...) > Edit.**

1. Scroll down to **Node Operating System**. Choose **Linux**.

1. In the **Customize Node Run Command** section, go to the **Node Options** and select the **Worker** role.

1. Copy the command displayed on screen to your clipboard.

1. Log in to your Linux host using a remote Terminal connection. Run the command copied to your clipboard.

1. From **Rancher**, click **Save**.

**Result:** The **Worker** role is installed on your Linux host, and the node registers with Rancher. It may take a few minutes for the node to be registered in your cluster.

### Add a Windows Worker Node

You can add Windows hosts to a custom cluster by editing the cluster and choosing the **Windows** option.

1. From the **Global** view, click **Clusters.**

1. Go to the custom cluster that you created and click **Ellipsis (...) > Edit.**

1. Scroll down to **Node Operating System**. Choose **Windows**. Note: You will see that the **worker** role is the only available role.

1. Copy the command displayed on screen to your clipboard.

1. Log in to your Windows host using your preferred tool, such as [Microsoft Remote Desktop](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients). Run the command copied to your clipboard in the **Command Prompt (CMD)**.

1. From Rancher, click **Save**.

1. Optional: Repeat these instructions if you want to add more Windows nodes to your cluster.

**Result:** The **Worker** role is installed on your Windows host, and the node registers with Rancher. It may take a few minutes for the node to be registered in your cluster. You now have a Windows Kubernetes cluster.

# Configuration for Storage Classes in Azure

If you are using Azure VMs for your nodes, you can use [Azure files](https://docs.microsoft.com/en-us/azure/aks/azure-files-dynamic-pv) as a [storage class]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/#adding-storage-classes) for the cluster.

In order to have the Azure platform create the required storage resources, follow these steps:

1. [Configure the Azure cloud provider.]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/#azure)

1. Configure `kubectl` to connect to your cluster.

1. Copy the `ClusterRole` and `ClusterRoleBinding` manifest for the service account:

        ---
        apiVersion: rbac.authorization.k8s.io/v1
        kind: ClusterRole
        metadata:
          name: system:azure-cloud-provider
        rules:
        - apiGroups: ['']
          resources: ['secrets']
          verbs:     ['get','create']
        ---
        apiVersion: rbac.authorization.k8s.io/v1
        kind: ClusterRoleBinding
        metadata:
          name: system:azure-cloud-provider
        roleRef:
          kind: ClusterRole
          apiGroup: rbac.authorization.k8s.io
          name: system:azure-cloud-provider
        subjects:
        - kind: ServiceAccount
          name: persistent-volume-binder
          namespace: kube-system

1. Create these in your cluster using one of the follow command.

    ```
    # kubectl create -f <MANIFEST>
    ```
