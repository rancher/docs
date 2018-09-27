---
title: Using Windows Container
weight: 2600
---
Using Rancher, you can provision Windows Server hosts as nodes in a custom Kubernetes cluster.

>**Notes:**
>
>- Windows nodes are experimental and not yet officially supported. Therefore, we do not recommend using Windows and in a production environment.
>- For a summary of Kubernetes features supported in Windows, see [Using Windows Server Containers in Kubernetes](https://kubernetes.io/docs/getting-started-guides/windows/#supported-features).

## Before You Start

- Your host must be running [Windows Server version 1803](https://docs.microsoft.com/en-us/windows-server/get-started/whats-new-in-windows-server-1803).
- Your host must be able to run [microsoft/nanoserver:1803
](https://hub.docker.com/r/microsoft/nanoserver/tags/) as a Windows Server container (_not_ a [Hyper-V container](https://docs.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/hyperv-container)).
- [Docker v17.06](https://docs.docker.com/install/windows/docker-ee/) or later must be installed.
- Flannel is the only network plug-in supported for Windows [host-gw](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw), which means you need to make some manual network configuration if you host your Windows node using a cloud service.

## Objectives for Creating Cluster with Windows support

<!-- TOC -->

- [1. Provision Hosts](#1-provision-hosts)
- [2. Create the Custom Cluster](#2-create-the-custom-cluster)
- [3. Cloud-host VM Networking Configuration](#3-cloud-host-vm-networking-configuration)
- [4. Adding Windows Workers](#4-adding-windows-workers)
- [5. Cloud-host VM Routes Configuration](#5-cloud-host-vm-routes-configuration)
- [Troubleshooting](#troubleshooting)

<!-- /TOC -->

## 1. Provision Hosts

The first thing you should do when provisioning a cluster with Windows workers is to prepare your host servers. Provision three nodes according to our [requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/)—two Linux, one Windows. The table below lists the [role]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#kubernetes-cluster-node-components) that each node will fill in your cluster.

Node    | Operating System | Role
--------|------------------|------
Node 1  | Linux            | [All]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#control-plane-nodes)
Node 2  | Windows          | [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes)
Node 3 (Optional) | Linux  | [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes) (for Ingress Support)


>**Bare-Metal Server Note:**
>
While creating your cluster, you must assign Kubernetes roles to your cluster nodes. If you plan on dedicating bare-metal servers to each role, you must provision a bare-metal server for each role (i.e. provision multiple bare-metal servers).

## 2. Create the Custom Cluster

Follow the instructions in [Creating a Cluster with Custom Nodes]({{< baseurl >}}rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#create-the-custom-cluster). 

These instructions flag each step that requires special actions for Windows nodes, which are listed below.

### Enable the Windows Support Option

While choosing **Cluster Options**, set **Windows Support (Experimental)** to **Enabled**.

![Enable Windows Support]({{< baseurl >}}/img/rancher/enable-windows-support.png)

### Networking Option

When choosing a network provider for a cluster that supports Windows, the only option available is Flannel.

![Flannel]({{< baseurl >}}/img/rancher/flannel.png)

If you want some automation supporting by cloud environment, such as load balancers or persistent storage devices, please follow [Selecting Cloud Providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers) to configure.

### Node Configuration

The first node in your cluster should be a Linux host that fills the Control Plane role. At minimum, the node must have this role enabled, but we recommend enabling all three. The following table lists our recommended settings (we'll provide the recommended settings for nodes 2 and 3 later).

Option | Setting
-------|--------
Node Operating System | Linux
Node Roles | etcd <br/> Control Plane <br/> Worker

![Recommended Linux Control Plane Configuration]({{< baseurl >}}/img/rancher/linux-control-plane.png)

## 3. Cloud-host VM Networking Configuration

>**Note:** This step only applies to nodes hosted on cloud-hosted virtual machines. If you're using on-premise virtual machines or baremetal servers, skip ahead to [4. Adding Windows Workers](#4-adding-windows-workers).

If you're hosting your nodes on any of the cloud services listed below, you must disable the private IP address checks for both your Linux or Windows hosts on startup. To disable this check for each node, follow the directions provided by each service below.

Service | Directions to disable private IP address checks
--------|------------------------------------------------
Amazon EC2 | [Disabling Source/Destination Checks](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html#EIP_Disable_SrcDestCheck)
Google GCE | [Enabling IP Forwarding for Instances](https://cloud.google.com/vpc/docs/using-routes#canipforward)
Azure VM | [Enable or Disable IP Forwarding](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface#enable-or-disable-ip-forwarding)

## 4. Adding Windows Workers

After the initial provisioning of your custom cluster, add your Windows workers to it. Add nodes using the instructions below.

1. From the main menu, select **Nodes**. 

1. Click **Edit Cluster**.

1. Scroll down to **Node Operating System**. Choose **Windows**.

1. Select the **Worker** role.

1. Copy the command displayed on screen to your clipboard.

1. Log in to your Windows host using your preferred tool, such as [Microsoft Remote Desktop](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients). Run the command copied to your clipboard in the **Command Prompt (CMD)**.

1. Repeat these instruction for each Windows host you want to use as a worker node.

**Result:** The worker role is installed on your Windows host, and the node registers with Rancher.

>**Tip:** If you want the cluster that uses Windows workers to include Ingress support, add one more Linux node to the cluster, enabling the worker role on it.


## 5. Cloud-host VM Routes Configuration

>**Note:** This step only applies to nodes hosted on cloud-hosted virtual machines. If you're using on-premise virtual machines or baremetal servers, you're done!

If you're hosting your nodes using a service listed in the table below, you must make additional node configurations to account for routing. Follow the vendor instructions provided.

Service | Instructions
--------|-------------
Google GCE | For GCE, add a static route for each node: [Adding a Static Route](https://cloud.google.com/vpc/docs/using-routes#addingroute).
Azure VM | For Azure, create a routing table: [Custom Routes: User-defined](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview#user-defined).

To confirm the destination address of each route, you can run this script using [kubectl]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/kubectl): `kubectl get nodes -o custom-columns=nodeName:.metadata.name,nodeIP:status.addresses[0].address,routeDestination:.spec.podCIDR` 


### Troubleshooting

If the Windows worker is already starting (console prints "Starting plan monitor"), but it's still _Unavailable_ on {{< product >}} UI, you can try to restart the Nginx proxy on Windows host via `docker restart nginx-proxy`.
