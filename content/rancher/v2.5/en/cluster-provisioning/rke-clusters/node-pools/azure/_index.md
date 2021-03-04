---
title: Creating an Azure Cluster
shortTitle: Azure
weight: 2220
aliases:
  - /rancher/v2.5/en/tasks/clusters/creating-a-cluster/create-cluster-azure/
---

In this section, you'll learn how to install an [RKE]({{<baseurl>}}/rke/latest/en/) Kubernetes cluster in Azure through Rancher.

First, you will set up your Azure cloud credentials in Rancher. Then you will use your cloud credentials to create a node template, which Rancher will use to provision new nodes in Azure. 

Then you will create an Azure cluster in Rancher, and when configuring the new cluster, you will define node pools for it. Each node pool will have a Kubernetes role of etcd, controlplane, or worker. Rancher will install Kubernetes on the new nodes, and it will set up each node with the Kubernetes role defined by the node pool.

For more information on configuring the Kubernetes cluster that Rancher will install on the Azure nodes, refer to the [RKE cluster configuration reference.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options)

For more information on configuring Azure node templates, refer to the [Azure node template configuration reference.](./azure-node-template-config)

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
  
The creation of this service principal returns three pieces of identification information, *The application ID, also called the client ID*, *The client secret*, and *The tenant ID*. This information will be used when you create a node template for Azure.

# Creating an Azure Cluster


1. [Create your cloud credentials](#1-create-your-cloud-credentials)
2. [Create a node template with your cloud credentials](#2-create-a-node-template-with-your-cloud-credentials)
3. [Create a cluster with node pools using the node template](#3-create-a-cluster-with-node-pools-using-the-node-template)
 
### 1. Create your cloud credentials

1. In the Rancher UI, click the user profile button in the upper right corner, and click **Cloud Credentials.**
1. Click **Add Cloud Credential.**
1. Enter a name for the cloud credential.
1. In the **Cloud Credential Type** field, select **Azure**.
1. Enter your Azure credentials.
1. Click **Create.**

**Result:** You have created the cloud credentials that will be used to provision nodes in your cluster. You can reuse these credentials for other node templates, or in other clusters. 

### 2. Create a node template with your cloud credentials

Creating a [node template]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools/#node-templates) for Azure will allow Rancher to provision new nodes in Azure. Node templates can be reused for other clusters.

1. In the Rancher UI, click the user profile button in the upper right corner, and click **Node Templates.**
1. Click **Add Template.**
1. Fill out a node template for Azure. For help filling out the form, refer to [Azure Node Template Configuration.](./azure-node-template-config)

### 3. Create a cluster with node pools using the node template

Use Rancher to create a Kubernetes cluster in Azure.

1. From the **Clusters** page, click **Add Cluster**.
1. Choose **Azure**.
1. Enter a **Cluster Name**.
1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.
1. Use **Cluster Options** to choose the version of Kubernetes that will be installed, what network provider will be used and if you want to enable project network isolation. To see more cluster options, click on **Show advanced options.** For help configuring the cluster, refer to the [RKE cluster configuration reference.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/options)
1. Add one or more node pools to your cluster. Each node pool uses a node template to provision new nodes. For more information about node pools, including best practices, see [this section.]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/rke-clusters/node-pools)
1. Review your options to confirm they're correct. Then click **Create**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces

### Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/kubectl/#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.
- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/kubectl/#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through Rancher. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.