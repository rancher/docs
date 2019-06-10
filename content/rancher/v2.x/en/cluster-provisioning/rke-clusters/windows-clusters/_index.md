---
title: Configuring Custom Clusters for Windows (Experimental)
weight: 2240
---

>**Notes:**
>
>- Configuring Windows clusters is new and improved for Rancher v2.3.0!  
>- Still using v2.1.x or v2.2.x?  See the documentation for how to provision Windows clusters on [previous versions]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/windows-clusters/docs-for-2.1-and-2.2/). As of v2.1.10 and v2.2.4, the ability to provision Windows clusters has been removed in the 2.1.x and 2.2.x lines.

_Available as of v2.3.0-alpha1_

>**Important:**
>
>Support for Windows nodes is currently an experimental feature and is not yet officially supported in Rancher. Therefore, we do not recommend using Windows nodes in a production environment.

When provisioning a [custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/) using Rancher, you can use a mix of Linux and Windows hosts as your cluster nodes.

This guide walks you through the creation of a custom cluster that includes three nodes.

* A Linux node, which serves as the Kubernetes control plane node.
* Another Linux node, which serves as a Kubernetes worker used to support Rancher Cluster agent, Metrics server, DNS and Ingress for the cluster.
* A Windows node, which is assigned the Kubernetes worker role and runs your Windows containers.

## Prerequisites

Before provisioning a new cluster, be sure that you have already installed Rancher on a device that accepts inbound network traffic. This is required in order for the cluster nodes to communicate with Rancher. If you have not already installed Rancher, please refer to the [installation documentation]({{< baseurl >}}/rancher/v2.x/en/installation/) before proceeding with this guide. 

For a summary of Kubernetes features supported in Windows, see [Using Windows Server Containers in Kubernetes](https://kubernetes.io/docs/getting-started-guides/windows/#supported-features).

### Node Requirements

In order to add Windows worker nodes, the node must be running Windows Server 2019 (i.e. core version 1809 or above). Any earlier versions (e.g. core version 1803 and earlier) do not properly support Kubernetes.

Windows overlay networking requires that [KB4489899](https://support.microsoft.com/en-us/help/4489899) hotfix is installed. Most cloud-hosted VMs already have this hotfix.

### Container Requirements

Windows requires that containers must be built on the same Windows Server version that they are being deployed on. Therefore, containers must be built on Windows Server 2019 core version 1809. If you have existing containers built for Windows Server 2019 core version 1803 or earlier, they must be re-built on Windows Server 2019 core version 1809.

## Steps for Creating a Cluster with Windows Support

To set up a custom cluster with support for Windows nodes and containers, you will need to complete the series of tasks listed below.

<!-- TOC -->

- [1. Provision Hosts](#1-provision-hosts)
- [2. Create the Custom Cluster](#2-create-the-custom-cluster)
- [3. Add Linux Master Node](#3-add-linux-master-node)
- [4. Add Linux Worker Node](#4-add-linux-worker-node)
- [5. Add Windows Workers](#5-add-windows-workers)
- [6. Cloud-host VM Routes Configuration for Host Gateway Mode (Optional)](#6-cloud-hosted-vm-routes-configuration-for-host-gateway-mode)
- [7. Configuration for Azure Files (Optional)](#7-configuration-for-azure-files)
<!-- /TOC -->

## 1. Provision Hosts

To begin provisioning a custom cluster with Windows support, prepare your hosts. Provision three nodes according to our [installation requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/) - two Linux, one Windows. Your hosts can be:

- Cloud-hosted VMs
- VMs from virtualization clusters
- Bare-metal servers

The table below lists the [Kubernetes roles]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#kubernetes-cluster-node-components) you'll assign to each host. The roles will be enabled later on in the configuration process. The first node, a Linux host, is primarily responsible for managing the Kubernetes control plane. In this guide, we will be installing all three roles on this node. The second node is also a Linux worker, which is responsible for running a DNS server, Ingress controller, Metrics server and Rancher Cluster agent. The third node, a Windows worker, will run your Windows containers.

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

- You can view the general requirements for Linux and Windows nodes in the [installation section]({{< baseurl >}}/rancher/v2.x/en/installation/requirements/).
- For **Host Gateway (L2bridge)** networking, it's best to use the same Layer 2 network for all nodes. Otherwise, you need to configure the route rules for them.
- For **VXLAN (Overlay)** networking, you must confirm that Windows Server 2019 has the [KB4489899](https://support.microsoft.com/en-us/help/4489899) hotfix installed. Most cloud-hosted VMs already have this hotfix.
- Your cluster must include at least one Linux worker node to run Rancher Cluster agent, DNS, Metrics server and Ingress related containers.
- Although we recommend the three node architecture listed in the table above, you can always add additional Linux and Windows workers to scale up your cluster for redundancy.

## 2. Create the Custom Cluster

The instructions for creating a custom cluster that supports Windows nodes are very similar to the general [instructions for creating a custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/#2-create-the-custom-cluster) with some Windows specific requirements. The entire process is documented below. 

1. From the main Rancher dashboard click on the **Clusters** tab and select **Add Cluster**.

1. The first section asks where the cluster is hosted. You should select **Custom**. 

1. Enter a name for your cluster in the **Cluster Name** text box. 

1. {{< step_create-cluster_member-roles >}}

1. {{< step_create-cluster_cluster-options >}}

    In order to use Windows workers, you must choose the following options: 
      - You must select `v1.14` or above for **Kubernetes Version**.
      - You must select **Flannel** as the **Network Provider**. There are two options: [**Host Gateway (L2bridge)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) and [**VXLAN (Overlay)**](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#vxlan). The default option is **VXLAN (Overlay)** mode.
      - You must select **Enable** for **Windows Support**.

1. If your nodes are hosted by a **Cloud Provider** and you want automation support such as loadbalancers or persistent storage devices, see [Selecting Cloud Providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers) for configuration info.

1. Click **Next**.



>**Important:**  If you are using *Host Gateway (L2bridge)* mode and hosting your nodes on any of the cloud services listed below, you must disable the private IP address checks for both your Linux or Windows hosts on startup. To disable this check for each node, follow the directions provided by each service below.

Service | Directions to disable private IP address checks
--------|------------------------------------------------
Amazon EC2 | [Disabling Source/Destination Checks](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html#EIP_Disable_SrcDestCheck)
Google GCE | [Enabling IP Forwarding for Instances](https://cloud.google.com/vpc/docs/using-routes#canipforward)
Azure VM   | [Enable or Disable IP Forwarding](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface#enable-or-disable-ip-forwarding)

## 3. Add Linux Master Node

The first node in your cluster should be a Linux host that fills both *Control Plane* and *etcd* role. Both of these two roles must be fulfilled before you can add Windows hosts to your cluster. At a minimum, the node must have 2 roles enabled, but we recommend enabling all three. The following table lists our recommended settings (we'll provide the recommended settings for nodes 2 and 3 later).

Option | Setting
-------|--------
Node Operating System | Linux
Node Roles            | etcd <br/> Control Plane <br/> Worker (optional)

1. For Node Operating System select **Linux**.

1. From **Node Role**, choose at least **etcd** and **Control Plane**.

1. **Optional**: Click **Show advanced options** to specify IP address(es) to use when registering the node, override the hostname of the node or to add labels to the node.

	[Rancher Agent Options]({{< baseurl >}}/rancher/v2.x/en/admin-settings/agent-options/)<br/>
	[Kubernetes Documentation: Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)

1. Copy the command displayed on the screen to your clipboard. 

	>**Note:** Repeat steps 7-10 if you want to dedicate specific hosts to specific node roles. Repeat the steps as many times as needed.

1. SSH into your Linux host and run the command that you copied to your clipboard.

1. When you are finished provisioning your Linux node(s), select **Done**.

{{< result_create-cluster >}}

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


## 7. Configuration for Azure Files

If you are using Azure VMs for your nodes, you can use [Azure files](https://docs.microsoft.com/en-us/azure/aks/azure-files-dynamic-pv) as a [storage class]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/#adding-storage-classes) for the cluster.

In order to have the Azure platform create the required storage resources, follow these steps:

1. [Configure the Azure cloud provider.]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/#azure)

1. Configure `kubectl` to connect to your cluster.

1. Copy the `ClusterRole` and `ClusterRoleBinding` manifest for service account.

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
