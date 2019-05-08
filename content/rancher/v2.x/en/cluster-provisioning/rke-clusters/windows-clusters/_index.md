---
title: Configuring Custom Clusters for Windows (Experimental)
weight: 2240
---

_Available as of v2.3.0-alpha1_

>**Important:**	
>	
>Support for Windows nodes is currently an experimental feature and is not yet officially supported in Rancher. Therefore, we do not recommend using Windows nodes in a production environment.

When provisioning a [custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/) using Rancher, you can use a mix of Linux and Windows hosts as your cluster nodes.

This guide walks you through the creation of a custom cluster that includes three nodes. 

- 1. A Linux node, which serves as a Kubernetes control plane node. 
- 2. Another Linux node, which serves as a Kubernetes worker used to support Rancher Cluster agent, Metrics server, DNS and Ingress for the cluster. 
- 3. A Windows node, which is assigned the Kubernetes worker role and runs your Windows containers.

>**Notes:**
>
>- For a summary of Kubernetes features supported in Windows, see [Using Windows Server Containers in Kubernetes](https://kubernetes.io/docs/getting-started-guides/windows/#supported-features).
>- The script to add a Windows worker must be ran on Windows Server 2019 (core version 1809 or above) hosts. Core version 1803 and earlier versions do not support Kubernetes properly.
>- Containers built for Windows Server 1803 or earlier do not run on Windows Server 2019. You must build containers on Windows Server 2019 to run these containers on Windows Server 2019.
>- Windows Overlay networking requires [KB4489899](https://support.microsoft.com/en-us/help/4489899) hotfix. Most of Cloud-hosted VMs already have this hotfix.

## Objectives for Creating Cluster with Windows Support

To set up a custom cluster with support for Windows nodes and containers, you will need to complete the series of tasks listed below. 

<!-- TOC -->

- [1. Provision Hosts](#1-provision-hosts)
- [2. Create the Custom Cluster](#2-create-the-custom-cluster)
- [3. Add Linux Master Node](#3-add-linux-master-node)
- [4. Add Linux Worker Node](#4-add-linux-worker-node)
- [5. Add Windows Workers](#5-add-windows-workers)
- [6. Cloud-host VM Routes Configuration for Host Gateway Mode (Optional)](#6-cloud-hosted-vm-routes-configuration-for-host-gateway-mode)

<!-- /TOC -->



## 1. Provision Hosts

To begin provisioning a custom cluster with Windows support, prepare your host servers. Provision three nodes according to our [requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/)—two Linux, one Windows. Your hosts can be:

- Cloud-hosted VMs
- VMs from virtualization clusters
- Bare-metal servers

The table below lists the [Kubernetes roles]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#kubernetes-cluster-node-components) you'll assign to each host, although you won't enable these roles until further along in the configuration process—we're just informing you of each node's purpose. The first node, a Linux host, is primarily responsible for managing the Kubernetes control plane, although, in this use case, we’re installing all three roles on this node. The second node is also a Linux worker, which is responsible for running a DNS server, Ingress controller, Metrics server and Rancher Cluster agent. Finally, the third node is the Windows worker, which will run your Windows applications.

Node    | Operating System | Future Cluster Role(s)
--------|------------------|------
Node 1  | Linux (Ubuntu Server 18.04 recommended)           | [Control Plane]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#control-plane-nodes), [etcd]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#etcd), [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes)
Node 2  | Linux (Ubuntu Server 18.04 recommended)           | [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes)
Node 3  | Windows (Windows Server 2019 required)            | [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes)

>**Notes:**
>
>- If you are using AWS, you should choose *Microsoft Windows Server 2019 Base with Containers* as the Amazon Machine Image (AMI).
>- If you are using GCE, you should choose *Windows Server 2019 Datacenter for Containers* as the OS image.

### Requirements

- You can view the requirements for Linux and Windows nodes in the [installation section]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/).
- For **Host Gateway (L2bridge)** networking, it's best to use the same Layer 2 network for all nodes. Otherwise, you need to configure the route rules for them.
- For **VXLAN (Overlay)** networking, you must confirm the Windows Server 2019 has the [KB4489899](https://support.microsoft.com/en-us/help/4489899) hotfix installed. Most of Cloud-hosted VMs already have this hotfix.
- Your cluster must include at least one Linux worker node to run Rancher Cluster agent, DNS, Metrics server and Ingress related containers.
- Although we recommend the three node architecture listed in the table above, you can add additional Linux and Windows workers to scale up your cluster for redundancy.


## 2. Create the Custom Cluster

To create a custom cluster that supports Windows nodes, follow the instructions in [Creating a Cluster with Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#2-create-the-custom-cluster), starting from [2. Create the Custom Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#2-create-the-custom-cluster). While completing the linked instructions, look for steps that requires special actions for Windows nodes, which are flagged with a note. These notes will link back here, to the special Windows instructions listed below.


1. Select `v1.14 or above` version for **Kubernetes Version**.

1. Select **Flannel** as **Network Provider**.

1. Select **Enable** for **Windows Support**.

1. Choose the **Flannel Backend**. There are two options [**Host Gateway (L2bridge)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) and [**VXLAN (Overlay)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#vxlan). Default is **VXLAN (Overlay)** mode.

If your nodes are hosted by a **Cloud Provider** and you want automation support such as load balancers or persistent storage devices, see [Selecting Cloud Providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers) for configuration info.

Finally, resume [Creating a Cluster with Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#create-the-custom-cluster) from [step 6]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#step-6).

>**Important:**  If you are using *Host Gateway (L2bridge)* mode and hosting your nodes on any of the cloud services listed below, you must disable the private IP address checks for both your Linux or Windows hosts on startup. To disable this check for each node, follow the directions provided by each service below.

Service | Directions to disable private IP address checks
--------|------------------------------------------------
Amazon EC2 | [Disabling Source/Destination Checks](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html#EIP_Disable_SrcDestCheck)
Google GCE | [Enabling IP Forwarding for Instances](https://cloud.google.com/vpc/docs/using-routes#canipforward)
Azure VM   | [Enable or Disable IP Forwarding](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface#enable-or-disable-ip-forwarding)

## 3. Add Linux Master Node

The first node in your cluster should be a Linux host that fills both *Control Plane* and *etcd* role. Both of this two roles must be fulfilled before you can add Windows hosts to your cluster. At a minimum, the node must have 2 roles enabled, but we recommend enabling all three. The following table lists our recommended settings (we'll provide the recommended settings for nodes 2 and 3 later).

Option | Setting
-------|--------
Node Operating System | Linux
Node Roles            | etcd <br/> Control Plane <br/> Worker (optional)

When you're done with these configurations, resume [Creating a Cluster with Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#create-the-custom-cluster) from [step 8]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#step-8).

## 4. Add Linux Worker Node

After the initial provisioning of your custom cluster, your cluster only has a single Linux host. Add another Linux host, which will be used to support *Rancher cluster agent*, *Metrics server*, *DNS* and *Ingress* for your cluster.

1. Using the content menu, open the custom cluster your created in [2. Create the Custom Cluster](#2-create-the-custom-cluster).

1. From the main menu, select **Nodes**.

1. Click **Edit Cluster**.

1. Scroll down to **Node Operating System**. Choose **Linux**.

1. Select the **Worker** role.

1. Copy the command displayed on screen to your clipboard.

1. Log in to your Linux host using a remote Terminal connection. Run the command copied to your clipboard.

1. From **Rancher**, click **Save**.

**Result:** The **Worker** role is installed on your Linux host, and the node registers with Rancher.



## 5. Add Windows Workers

You can add Windows hosts to a custom cluster by editing the cluster and choosing the **Windows** option.

1. From the main menu, select **Nodes**.

1. Click **Edit Cluster**.

1. Scroll down to **Node Operating System**. Choose **Windows**.

1. Select the **Worker** role.

1. Copy the command displayed on screen to your clipboard.

1. Log in to your Windows host using your preferred tool, such as [Microsoft Remote Desktop](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients). Run the command copied to your clipboard in the **Command Prompt (CMD)**.

1. From Rancher, click **Save**.

1. **Optional:** Repeat these instruction if you want to add more Windows nodes to your cluster.

**Result:** The **Worker** role is installed on your Windows host, and the node registers with Rancher.



## 6. Cloud-hosted VM Routes Configuration for Host Gateway Mode

If you are using the [**Host Gateway (L2bridge)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) backend of Flannel, all containers on the same node belong to a private subnet, and traffic routes from a subnet on one node to a subnet on another node through the host network.

- When worker nodes are provisioned on AWS, virtualization clusters, or bare metal servers, make sure they belong to the same layer 2 subnet. If the nodes don't belong to the same layer 2 subnet, `host-gw` networking will not work.

- When worker nodes are provisioned on GCE or Azure, they are not on the same layer 2 subnet. Nodes on GCE and Azure belong to a routable layer 3 network. Follow the instructions below to configure GCE and Azure so that the cloud network knows how to route the host subnets on each node.

To configure host subnet routing on GCE or Azure, first run the following command to find out the host subnets on each worker node:

```bash
kubectl get nodes -o custom-columns=nodeName:.metadata.name,nodeIP:status.addresses[0].address,routeDestination:.spec.podCIDR
```

Then follow the instructions for each cloud provider to configure routing rules for each node:

Service | Instructions
--------|-------------
Google GCE | For GCE, add a static route for each node: [Adding a Static Route](https://cloud.google.com/vpc/docs/using-routes#addingroute).
Azure VM   | For Azure, create a routing table: [Custom Routes: User-defined](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview#user-defined).


` `
