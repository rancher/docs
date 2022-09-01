---
title: Creating an Azure Cluster
shortTitle: Azure
weight: 2220
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In this section, you'll learn how to install an [RKE](https://rancher.com/docs/rke/latest/en/) Kubernetes cluster in Azure through Rancher.

First, you will set up your Azure cloud credentials in Rancher. Then you will use your cloud credentials to create a node template, which Rancher will use to provision new nodes in Azure.

Then you will create an Azure cluster in Rancher, and when configuring the new cluster, you will define node pools for it. Each node pool will have a Kubernetes role of etcd, controlplane, or worker. Rancher will install Kubernetes on the new nodes, and it will set up each node with the Kubernetes role defined by the node pool.

:::caution

When the Rancher RKE cluster is running in Azure and has an Azure load balancer in front, the outbound flow will fail. The workaround for this problem is as follows:

- Terminate the SSL/TLS on the internal load balancer
- Use the L7 load balancer

For more information, refer to the documentation on [Azure load balancer limitations](https://docs.microsoft.com/en-us/azure/load-balancer/components#limitations).

:::

For more information on configuring the Kubernetes cluster that Rancher will install on the Azure nodes, refer to the [RKE cluster configuration reference.](cluster-provisioning/rke-clusters/options)

For more information on configuring Azure node templates, refer to the [Azure node template configuration reference.](../../../../../reference-guides/cluster-configuration/downstream-cluster-configuration/node-template-configuration/azure.md)

- [Preparation in Azure](#preparation-in-azure)
- [Creating an Azure Cluster](#creating-an-azure-cluster)

# Preparation in Azure

Before creating a node template in Rancher using a cloud infrastructure such as Azure, we must configure Rancher to allow the manipulation of resources in an Azure subscription.

To do this, we will first create a new Azure **service principal (SP)** in Azure **Active Directory (AD)**, which, in Azure, is an application user who has permission to manage Azure resources.

The following is a template `az cli` script that you have to run for creating an service principal, where you have to enter your SP name, role, and scope:

```
az ad sp create-for-rbac \
  --name="<Rancher ServicePrincipal name>" \
  --role="Contributor" \
  --scopes="/subscriptions/<subscription Id>"
```

The creation of this service principal returns three pieces of identification information, *The application ID, also called the client ID*, and *The client secret*. This information will be used when you create a node template for Azure.

# Creating an Azure Cluster

<Tabs>
<TabItem value="RKE">

1. [Create your cloud credentials](#1-create-your-cloud-credentials)
2. [Create a node template with your cloud credentials](#2-create-a-node-template-with-your-cloud-credentials)
3. [Create a cluster with node pools using the node template](#3-create-a-cluster-with-node-pools-using-the-node-template)

### 1. Create your cloud credentials

1. Click **☰ > Cluster Management**.
1. Click **Cloud Credentials**.
1. Click **Create**.
1. Click **Azure**.
1. Enter your Azure credentials.
1. Click **Create**.

**Result:** You have created the cloud credentials that will be used to provision nodes in your cluster. You can reuse these credentials for other node templates, or in other clusters.

### 2. Create a node template with your cloud credentials

Creating a [node template](../../../../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-templates) for Azure will allow Rancher to provision new nodes in Azure. Node templates can be reused for other clusters.

1. Click **☰ > Cluster Management**.
1. Click **RKE1 Configuration > Node Templates**.
1. Click **Add Template**.
1. Click **Azure**.
1. Fill out a node template for Azure. For help filling out the form, refer to [Azure Node Template Configuration.](../../../../../reference-guides/cluster-configuration/downstream-cluster-configuration/node-template-configuration/azure.md)

### 3. Create a cluster with node pools using the node template

Use Rancher to create a Kubernetes cluster in Azure.

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create**.
1. Click **Azure**.
1. Enter a **Cluster Name**.
1. Add one or more node pools to your cluster. Each node pool uses a node template to provision new nodes. For more information about node pools, including best practices, see [this section.](../../../../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md)
1. In the **Cluster Configuration** to choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation. To see more cluster options, click on **Show advanced options**. For help configuring the cluster, refer to the [RKE cluster configuration reference.](cluster-provisioning/rke-clusters/options)
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Click **Create**.

</TabItem>
<TabItem value="RKE2">

### 1. Create your cloud credentials

If you already have a set of cloud credentials to use, skip this section.

1. Click **☰ > Cluster Management**.
1. Click **Cloud Credentials**.
1. Click **Create**.
1. Click **Azure**.
1. Enter your Azure credentials.
1. Click **Create**.

**Result:** You have created the cloud credentials that will be used to provision nodes in your cluster. You can reuse these credentials for other node templates, or in other clusters.

### 2. Create your cluster

Use Rancher to create a Kubernetes cluster in Azure.

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create**.
1. Toggle the switch to **RKE2/K3s**.
1. Click **Azure**.
1. Select a **Cloud Credential**, if more than one exists. Otherwise, it's preselected.
1. Enter a **Cluster Name**.
1. Create a machine pool for each Kubernetes role. Refer to the [best practices](../../../../../pages-for-subheaders/use-new-nodes-in-an-infra-provider.md#node-roles-in-rke2) for recommendations on role assignments and counts.
    1. For each machine pool, define the machine configuration. Refer to the [Azure machine configuration reference](../../../../../reference-guides/cluster-configuration/downstream-cluster-configuration/machine-configuration/azure.md) for information on configuration options.
1. Use the **Cluster Configuration** to choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation.  For help configuring the cluster, refer to the [RKE2 cluster configuration reference.](../../../../../reference-guides/cluster-configuration/rancher-server-configuration/rke2-cluster-configuration.md)
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Click **Create**.

</TabItem>
</Tabs>

**Result:**

Your cluster is created and assigned a state of **Provisioning**. Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active**.

**Active** clusters are assigned two Projects:

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces


### Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps](../../../../advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.
- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps](../../../../advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through Rancher. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.
