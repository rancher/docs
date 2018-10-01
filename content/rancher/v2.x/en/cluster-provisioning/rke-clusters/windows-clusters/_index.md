---
title: Configuring Custom Clusters for Windows 
weight: 2240
---

_Available as of v2.1.0_


When provisioning a [custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/) using Rancher, you can use a mix of Linux and Windows hosts as your cluster nodes.

This guide walks you through create of a custom cluster that includes 3 nodes: a Linux node, which serves as a Kubernetes control plane node; another Linux node, which serves as a Kubernetes worker used to support Ingress for the cluster; and a Windows node, which is assigned the Kubernetes worker role and runs your Windows containers.

>**Notes:**
>
>- Windows nodes are experimental and not yet officially supported in Rancher. Therefore, we do not recommend using Windows nodes in a production environment.
>- For a summary of Kubernetes features supported in Windows, see [Using Windows Server Containers in Kubernetes](https://kubernetes.io/docs/getting-started-guides/windows/#supported-features).


## Objectives for Creating Cluster with Windows Support

When setting up a custom cluster with support for Windows nodes and containers, complete the series of tasks below.

<!-- TOC -->

- [1. Provision Hosts](#1-provision-hosts)
- [2. Cloud-host VM Networking Configuration](#2-cloud-host-vm-networking-configuration)
- [3. Create the Custom Cluster](#3-create-the-custom-cluster)
- [4. Add Linux Host for Ingress Support](#4-add-linux-host-for-ingress-support)
- [5. Adding Windows Workers](#5-adding-windows-workers)
- [6. Cloud-host VM Routes Configuration](#6-cloud-host-vm-routes-configuration)
- [Troubleshooting](#troubleshooting)

<!-- /TOC -->

## 1. Provision Hosts

To begin provisioning a custom cluster with Windows support, prepare your host servers. Provision three nodes according to our [requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/)—two Linux, one Windows. Your hosts can be:

- Cloud-hosted virtual machines (VM)
- On-premise VMs
- Bare-metal servers 

The table below lists the [Kubernetes roles]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#kubernetes-cluster-node-components) you'll assign to each host, although you won't enable these roles until further along in the configuration process—we're just informing you of each node's purpose. The first node, a Linux host, is primarily responsible for managing the Kubernetes control plane, although, in this use case, we're installing all three roles on this node. Node 2 is also a Linux worker, which is responsible for Ingress support. Finally, the third node is your Windows worker, which will run your Windows applications.

Node    | Operating System | Future Cluster Role(s)
--------|------------------|------
Node 1  | Linux            | [Control Plane]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#control-plane-nodes), [etcd]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#etcd), [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes)
Node 2  | Linux            | [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes) (This node is used for Ingress support) 
Node 3  | Windows          | [Worker]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#worker-nodes)

>**Notes:**
>
>- To support [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/), your cluster must include at least one Linux node dedicated to the worker role.
>- Although we recommend the three node architecture listed in the table above, you add additional Linux and Windows workers to scale up your cluster for redundancy.

### Requirements

- You can view node requirements for Linux and Windows nodes in the [installation section]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/).
- All nodes in a custom cluster that supports Windows must have connectivity over OSI layer 2.

## 2. Cloud-host VM Networking Configuration

>**Note:** This step only applies to nodes hosted on cloud-hosted virtual machines. If you're using on-premise virtual machines or bare-metal servers, skip ahead to [Create the Custom Cluster](#3-create-the-custom-cluster).

If you're hosting your nodes on any of the cloud services listed below, you must disable the private IP address checks for both your Linux or Windows hosts on startup. To disable this check for each node, follow the directions provided by each service below.

Service | Directions to disable private IP address checks
--------|------------------------------------------------
Amazon EC2 | [Disabling Source/Destination Checks](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html#EIP_Disable_SrcDestCheck)
Google GCE | [Enabling IP Forwarding for Instances](https://cloud.google.com/vpc/docs/using-routes#canipforward)
Azure VM | [Enable or Disable IP Forwarding](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface#enable-or-disable-ip-forwarding)

## 3. Create the Custom Cluster

To create a custom cluster that supports Windows nodes, follow the instructions in [Creating a Cluster with Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#2-create-the-custom-cluster), starting from [2. Create the Custom Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#2-create-the-custom-cluster). While completing the linked instructions, look for steps that requires special actions for Windows nodes, which are flagged with a note. These notes will link back here, to the special Windows instructions listed in the subheadings below.


### Enable the Windows Support Option

While choosing **Cluster Options**, set **Windows Support (Experimental)** to **Enabled**.

![Enable Windows Support]({{< baseurl >}}/img/rancher/enable-windows-support.png)

After you select this option, resume [Creating a Cluster with Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#create-the-custom-cluster) from [step 6]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#step-6).

### Networking Option

When choosing a network provider for a cluster that supports Windows, the only option available is Flannel, as [host-gw](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) is needed for IP routing.

![Flannel]({{< baseurl >}}/img/rancher/flannel.png)

If your nodes are hosted by a cloud provider and you want automation support such as load balancers or persistent storage devices, see [Selecting Cloud Providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers) for configuration info.

### Node Configuration

The first node in your cluster should be a Linux host that fills the Control Plane role. This role must be fulfilled before you can add Windows hosts to your cluster. At minimum, the node must have this role enabled, but we recommend enabling all three. The following table lists our recommended settings (we'll provide the recommended settings for nodes 2 and 3 later).

Option | Setting
-------|--------
Node Operating System | Linux
Node Roles | etcd <br/> Control Plane <br/> Worker

![Recommended Linux Control Plane Configuration]({{< baseurl >}}/img/rancher/linux-control-plane.png)

When you're done with these configurations, resume [Creating a Cluster with Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#create-the-custom-cluster) from [step 8]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#step-8).



## 4. Add Linux Host for Ingress Support

After the initial provisioning of your custom cluster, your cluster only has a single Linux host. Add another Linux host, which will be used to support Ingress for your cluster.

1. Using the content menu, open the custom cluster your created in [2. Create the Custom Cluster](#2-create-the-custom-cluster).

1. From the main menu, select **Nodes**. 

1. Click **Edit Cluster**.

1. Scroll down to **Node Operating System**. Choose **Linux**.

1. Select the **Worker** role.

1. Copy the command displayed on screen to your clipboard.

1. Log in to your Linux host using a remote Terminal connection. Run the command copied to your clipboard.

1. From **Rancher**, click **Save**. 

**Result:** The worker role is installed on your Linux host, and the node registers with Rancher.

## 5. Adding Windows Workers

You can add Windows hosts to a custom cluster by editing the cluster and choosing the **Windows** option.

1. From the main menu, select **Nodes**. 

1. Click **Edit Cluster**.

1. Scroll down to **Node Operating System**. Choose **Windows**.

1. Select the **Worker** role.

1. Copy the command displayed on screen to your clipboard.

1. Log in to your Windows host using your preferred tool, such as [Microsoft Remote Desktop](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients). Run the command copied to your clipboard in the **Command Prompt (CMD)**.

1. From Rancher, click **Save**. 

1. **Optional:** Repeat these instruction if you want to add more Windows nodes to your cluster.

**Result:** The worker role is installed on your Windows host, and the node registers with Rancher.

## 6. Cloud-host VM Routes Configuration

>**Note:** This step only applies to nodes hosted on cloud-hosted virtual machines. If you're using on-premise virtual machines or bare-metal servers, you're done!

If you're hosting your nodes using a service listed in the table below, you must make additional node configurations to account for routing. Follow the vendor instructions provided.

Service | Instructions
--------|-------------
Google GCE | For GCE, add a static route for each node: [Adding a Static Route](https://cloud.google.com/vpc/docs/using-routes#addingroute).
Azure VM | For Azure, create a routing table: [Custom Routes: User-defined](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview#user-defined).

To confirm the destination address of each route, you can run this script using [kubectl]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/kubectl): `kubectl get nodes -o custom-columns=nodeName:.metadata.name,nodeIP:status.addresses[0].address,routeDestination:.spec.podCIDR` 


### Troubleshooting

If the Windows worker is already starting (i.e., Terminal outputs `Starting plan monitor`), yet it displays a status of `Unavailable` in the Rancher UI, try to restarting the Nginx proxy on the Windows host using the following Docker command:

```
docker restart nginx-proxy
```
