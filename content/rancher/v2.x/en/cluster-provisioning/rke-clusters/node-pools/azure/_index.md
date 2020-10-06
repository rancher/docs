---
title: Creating an Azure Cluster
shortTitle: Azure
weight: 2220
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-azure/
---

In this section, you'll learn how to set up a Kubernetes cluster in Azure through Rancher. During this process, Rancher will provision new nodes in Azure.

- [Creating an Azure Cluster](#creating-an-azure-cluster)
- [Creating an Azure Node Template](#creating-an-azure-node-template)
  - [Preparation in Azure](#preparation-in-azure)
  - [Creating the Template](#creating-the-template)
  - [Template Configuration](#template-configuration)

# Creating an Azure Cluster

> **Prerequisite:** Before Rancher can create a cluster in Azure, a node template needs to be created using your Azure credentials and configuration. For details, see [this section.](#creating-an-azure-node-template)

Use {{< product >}} to create a Kubernetes cluster in Azure.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Azure**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}} For more information, see the [cluster configuration reference.](../../options)

6. {{< step_create-cluster_node-pools >}}

7. **Optional:** Add additional node pools.

8. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}

### Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/cluster-access/kubectl/#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.
- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/cluster-access/kubectl/#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through Rancher. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.

# Creating an Azure Node Template

Creating a node template for Azure will allow Rancher to provision new nodes when it sets up a Kubernetes cluster in Azure.

### Preparation in Azure
  
Before creating a **node template** in Rancher using a cloud infrastructure such as Azure, we must configure Rancher to allow the manipulation of resources in an Azure subscription.

To do this, we will first create a new Azure **service principal (SP)** in Azure **Active Directory (AD)**, which, in Azure, is an application user who has permission to manage Azure resources.

The following is a template `az cli` script that you have to run for creating an service principal, where you have to enter your SP name, role, and scope:
  
```
az ad sp create-for-rbac --name="<Rancher ServicePrincipal name>" --role="Contributor" --scopes="/subscriptions/<subscription Id>"
```
  
The creation of this service principal returns three pieces of identification information, *The application ID, also called the client ID*, *The client secret*, and *The tenant ID*. This information will be used in the following section adding the **node template**.

### Creating the Template

1.	Click **Add Node Template**.

1.	Complete the **Azure Options** form. For help filling out the form, refer to [Configuration](#azure-node-template-configuration) below.

1. Click **Create**.

**Result:** The node template can be used during the cluster creation process.


### Template Configuration

- **Account Access** stores your account information for authenticating with Azure. Note: As of v2.2.0, account access information is stored as a cloud credentials. Cloud credentials are stored as Kubernetes secrets. Multiple node templates can use the same cloud credential. You can use an existing cloud credential or create a new one. To create a new cloud credential, enter **Name** and **Account Access** data, then click **Create.**

- **Placement** sets the geographical region where your cluster is hosted and other location metadata.

- **Network** configures the networking used in your cluster.

- **Instance** customizes your VM configuration.

{{< step_rancher-template >}}


