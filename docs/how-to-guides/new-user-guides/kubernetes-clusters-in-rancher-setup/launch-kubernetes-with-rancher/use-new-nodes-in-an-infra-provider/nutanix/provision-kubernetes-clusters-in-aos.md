---
title: Provisioning Kubernetes Clusters in Nutanix AOS
weight: 1
---

To use Rancher to install an [RKE](https://rancher.com/docs/rke/latest/en/) Kubernetes cluster in Nutanix AOS (AHV):

1. Locate Rancher's built-in Nutanix [node driver and activate it](../../../../../advanced-user-guides/authentication-permissions-and-global-configuration/about-provisioning-drivers/manage-node-drivers.md#activating-deactivating-node-drivers).

1. Create a node template, which Rancher will use to provision nodes in Nutanix AOS. 

1. Create a Nutanix AOS cluster in Rancher. When configuring the new cluster, you will define node pools for it. Each node pool will have a Kubernetes role of etcd, controlplane, or worker. Rancher will install RKE Kubernetes on the new nodes, and it will set up each node with the Kubernetes role defined by the node pool.

For details on configuring the Nutanix AOS node template, refer to the [Nutanix AOS node template configuration reference.](../../../../../../reference-guides/cluster-configuration/downstream-cluster-configuration/node-template-configuration/nutanix.md)

For details on configuring RKE Kubernetes clusters in Rancher, refer to the [cluster configuration reference.](../../../../../../reference-guides/cluster-configuration/rancher-server-configuration/rke1-cluster-configuration.md)

- [Preparation in Nutanix AOS](#preparation-in-nutanix-aos)
- [Creating a Nutanix AOS Cluster](#creating-a-nutanix-aos-cluster)

# Preparation in Nutanix AOS

The following sections describe the requirements for setting up Nutanix AOS so that Rancher can provision VMs and clusters.

:::note

The node templates are documented and tested with Nutanix AOS version 5.20.2 and 6.0.1.

:::
### Create Credentials in Nutanix AOS

Before proceeding to create a cluster, you must ensure that you have a [Nutanix Prism Central user account](https://portal.nutanix.com/page/documents/details?targetId=Nutanix-Security-Guide-v6_0:wc-user-create-wc-t.html) with admin permissions. When you set up a node template, the template will need to use these credentials.

### Network Permissions

You must ensure that the hosts running the Rancher server are able to establish the following network connections:

- To the Nutanix Prism Central API (usually port 9440/TCP).
- To port 22/TCP and 2376/TCP on the created VMs

See [Node Networking Requirements](../../../node-requirements-for-rancher-managed-clusters.md#networking-requirements) for a detailed list of port requirements applicable for creating nodes on an infrastructure provider.

### VM-VM Anti-Affinity Policies

Setting up [VM-VM Anti-Affinity Policies](https://portal.nutanix.com/page/documents/details?targetId=AHV-Admin-Guide-v6_1:ahv-vm-anti-affinity-t.html) is recommended. These rules allow VMs assigned the etcd and control-plane roles to operate on separate AHV hosts when they are assigned to different node pools. This practice ensures that the failure of a single physical machine does not affect the availability of those planes.

# Creating a Nutanix AOS Cluster

1. [Create a node template ](#1-create-a-node-template)
2. [Create a cluster with node pools using the node template](#2-create-a-cluster-with-node-pools-using-the-node-template)

### 1. Create a node template

Creating a [node template](../../../../../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-templates) for Nutanix AOS will allow Rancher to provision new nodes in Nutanix AOS. Node templates can be reused for other clusters.

1. Click **☰ > Cluster Management**.
1. Click **RKE1 Configuration > Node Templates**.
1. Click **Create**.
1. Click **Add Template**.
1. Click **Nutanix**.
1. Fill out a node template for Nutanix AOS. For help filling out the form, refer to the Nutanix AOS node template [configuration reference.](../../../../../../reference-guides/cluster-configuration/downstream-cluster-configuration/node-template-configuration/nutanix.md).
1. Click **Create**.

### 2. Create a cluster with node pools using the node template

Use Rancher to create a Kubernetes cluster in Nutanix AOS.

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create**.
1. Click **Nutanix**.
1. Enter a **Cluster Name**, then click **Continue**.
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users who can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Use **Cluster Options** to choose the version of Kubernetes that will be installed, what network provider will be used, and whether you want to enable project network isolation. To see more cluster options, click on **Show advanced options**. For help configuring the cluster, refer to the [RKE cluster configuration reference.](../../../../../../reference-guides/cluster-configuration/rancher-server-configuration/rke1-cluster-configuration.md)
1. Add one or more node pools to your cluster. Each node pool uses a node template to provision new nodes. For more information about node pools, including best practices for assigning Kubernetes roles to the nodes, see [this section.](../../../../../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-pools)
1. Review your options to confirm they're correct. Then click **Create**.

**Result:** Your cluster is created and assigned a state of **Provisioning**. Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active**.

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces


# Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps](../../../../../advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.

- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps](../../../../../advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through Rancher. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.