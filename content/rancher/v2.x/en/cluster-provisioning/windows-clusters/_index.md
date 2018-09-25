---
title: Using Windows Container
weight: 2600
---

Since the release of [Windows Server version 1803](https://docs.microsoft.com/en-us/windows-server/get-started/whats-new-in-windows-server-1803), you can be able to try Windows containers more efficiently and more stable on deploying Kubernetes v1.9 and later.

On the article [Using Windows Server Containers in Kubernetes](https://kubernetes.io/docs/getting-started-guides/windows/#supported-features), you can find out which Kubernetes features are supporting on Windows now.

It is relatively simple to use Windows server containers on Kubernetes cluster via {{< product >}}, but you still have some attention:

- The host must be able to run [microsoft/nanoserver:1803
](https://hub.docker.com/r/microsoft/nanoserver/tags/) as Windows server container not [Hyper-V container](https://docs.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/hyperv-container)
- The Docker v17.06 or later is installed, if not, you can follow the article about how to [Install Docker Enterprise Edition for Windows Server](https://docs.docker.com/install/windows/docker-ee/)
- Networking bases on Flannel [host-gw](https://github.com/coreos/flannel/blob/master/Documentation/backends.md#host-gw) mode, it means you need to do some networking configuration on cloud environments
- Windows support is an **Experimental** feature on {{< product >}}

## Objectives for Creating Cluster with Windows support

1. [Provision a Linux Host]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes#provision-a-linux-host)
    
    Begin by provisioning a Linux host. 

    + **Cloud-Host Virtual Machine Only:** [Host Networking Configuration](#cloud-host-vm-networking-configuration)

2. [Create the Cluster](#create-the-custom-cluster)

    Use your new Linux host as Control Plan and etcd for your new Kubernetes cluster.

3. [Provision a Windows Host](#provision-a-windows-host)

    Prepare a Windows host for Kubernetes Node.

    + **Cloud-Host Virtual Machine Only:** [Host Networking Configuration](#cloud-host-vm-networking-configuration)

4. [Add the Windows Worker](#add-the-windows-worker)

    Use the new Windows host as Worker for your above created Kubernetes cluster.

5. **Cloud-Host Virtual Machine Only:** [Routes Configuration](#cloud-host-vm-routes-configuration)

## Create the Custom Cluster

Starting to create a custom cluster is almost the same as on [Linux]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes#create-the-custom-cluster), except that you need to enable _"Windows Support (Experimental)"_ in **Cluster Options**.

>**Windows Support Note:**
> 
While enabling Windows support on your cluster, the "Network Provider" will be frozen with _"Flannel"_.

If you want some automation supporting by cloud environment, such as load balancers or persistent storage devices, please follow [Selecting Cloud Providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers) to configure.

## Provision a Windows Host

Supporting Windows on a custom cluster by provisioning a Windows host. Your host can be:

- A cloud-host virtual machine (VM)
- An on-premise VM
- A bare-metal server

>**Bare-Metal Server Note:**
>
While creating your cluster, you must assign Kubernetes roles to your cluster nodes. If you plan on dedicating bare-metal servers to each role, you must provision a bare-metal server for each role (i.e. provision multiple bare-metal servers).

Provision the host according to the requirements below.

### Requirements

Each node in your cluster must meet our [Requirements]({{< baseurl >}}/rancher/v2.x/en/installation/requirements).

## Add the Windows Worker

After the creation of a custom cluster, you can add the new Window worker into the cluster.

1. Enter the above created cluster.

2. From the **Nodes** page, click **Edit Cluster**.

3. Use **Node Operating System** to choose _"Windows"_.

4. Copy the command displayed on screen to your clipboard.

5. Log in to your Windows host using your preferred tool, such as [Microsoft Remote Desktop](https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-clients). Run the command copied to your clipboard on **Command Prompt (CMD)**.

    >**Note:** Repeat steps 4-5 if you want to dedicate specific hosts to specific node roles. Repeat the steps as many times as needed.

6.  When you finish running the command(s) on your Windows host(s), click **Cancel** to quit.

## Cloud-host VM Networking Configuration

You need to disable the private IP addresses checking on either Linux or Windows host when startup, if you're using the following cloud-host virtual machines:

- `Amazon EC2`: [disbaling the "Source/Destination Checks"](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html#EIP_Disable_SrcDestCheck) for each instance
- `Google GCE`: [enabling "IP forwarding"](https://cloud.google.com/vpc/docs/using-routes#canipforward) for each instance
- `Azure VM`: [enabling "IP forwarding"](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-network-interface#enable-or-disable-ip-forwarding) for each instance

## Cloud-host VM Routes Configuration

You need to configure some routes after both Linux and Windows worker node are ready, if you’re using the following cloud-host virtual machines:

- `Google GCE`: [adding a static route](https://cloud.google.com/vpc/docs/using-routes#addingroute) on each instance
- `Azure VM`: [adding some "User-defined" routes](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview#user-defined) on route table

In order to confirm the destination address of each route, you can run this scripts via [kubectl]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/kubectl): `kubectl get nodes -o custom-columns=nodeName:.metadata.name,nodeIP:status.addresses[0].address,routeDestination:.spec.podCIDR` 

## Troubleshooting

If the Windows worker is already starting (console prints "Starting plan monitor"), but it's still _Unavailable_ on {{< product >}} UI, you can try to restart the Nginx proxy on Windows host via `docker restart nginx-proxy`.
