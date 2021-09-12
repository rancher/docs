---
title: Creating an AKS Cluster
shortTitle: Azure Kubernetes Service
weight: 2115
---

You can use Rancher to create a cluster hosted in Microsoft Azure Kubernetes Service (AKS).

- [Prerequisites in Microsoft Azure](#prerequisites-in-microsoft-azure)
- [Setting Up the Service Principal with the Azure Command Line Tool](#setting-up-the-service-principal-with-the-azure-command-line-tool)
  - [Setting Up the Service Principal from the Azure Portal](#setting-up-the-service-principal-from-the-azure-portal)
- [1. Create the AKS Cloud Credentials](#1-create-the-aks-cloud-credentials)
- [2. Create the AKS Cluster](#2-create-the-aks-cluster)
- [Role-based Access Control](#role-based-access-control)
- [AKS Cluster Configuration Reference](#aks-cluster-configuration-reference)
- [Private Clusters](#private-clusters)
- [Minimum AKS Permissions](#minimum-aks-permissions)
- [Syncing](#syncing)

# Prerequisites in Microsoft Azure

>**Note**
>Deploying to AKS will incur charges.

To interact with Azure APIs, an AKS cluster requires an Azure Active Directory (AD) service principal. The service principal is needed to dynamically create and manage other Azure resources, and it provides credentials for your cluster to communicate with AKS. For more information about the service principal, refer to the [AKS documentation](https://docs.microsoft.com/en-us/azure/aks/kubernetes-service-principal).

Before creating the service principal, you need to obtain the following information from the [Microsoft Azure Portal](https://portal.azure.com):

- Subscription ID
- Tenant ID
- Client ID
- Client secret

The below sections describe how to set up these prerequisites using either the Azure command line tool or the Azure portal.

### Setting Up the Service Principal with the Azure Command Line Tool

You can create the service principal by running this command:

```
az ad sp create-for-rbac --skip-assignment
```

The result should show information about the new service principal:
```
{
  "appId": "xxxx--xxx",
  "displayName": "<SERVICE-PRINCIPAL-NAME>",
  "name": "http://<SERVICE-PRINCIPAL-NAME>",
  "password": "<SECRET>",
  "tenant": "<TENANT NAME>"
}
```

You also need to add roles to the service principal so that it has privileges for communication with the AKS API. It also needs access to create and list virtual networks.

Below is an example command for assigning the Contributor role to a service principal. Contributors can manage anything on AKS but cannot give access to others:

```
az role assignment create \
  --assignee $appId \
  --scope /subscriptions/$<SUBSCRIPTION-ID>/resourceGroups/$<GROUP> \
  --role Contributor
```

You can also create the service principal and give it Contributor privileges by combining the two commands into one. In this command, the scope needs to provide a full path to an Azure resource:

```
az ad sp create-for-rbac \
  --scope /subscriptions/$<SUBSCRIPTION-ID>/resourceGroups/$<GROUP> \
  --role Contributor
```

### Setting Up the Service Principal from the Azure Portal

You can also follow these instructions to set up a service principal and give it role-based access from the Azure Portal.

1. Go to the Microsoft Azure Portal [home page](https://portal.azure.com).

1. Click **Azure Active Directory**.
1. Click **App registrations**.
1. Click **New registration**.
1. Enter a name. This will be the name of your service principal.
1. Optional: Choose which accounts can use the service principal.
1. Click **Register**.
1. You should now see the name of your service principal under **Azure Active Directory > App registrations**. 
1. Click the name of your service principal. Take note of the tenant ID and application ID (also called app ID or client ID) so that you can use it when provisioning your AKS cluster. Then click **Certificates & secrets**.
1. Click **New client secret**.
1. Enter a short description, pick an expiration time, and click **Add**. Take note of the client secret so that you can use it when provisioning the AKS cluster.

**Result:** You have created a service principal and you should be able to see it listed in the **Azure Active Directory** section under **App registrations**. You still need to give the service principal access to AKS. 

To give role-based access to your service principal,

1. Click **All Services** in the left navigation bar. Then click **Subscriptions**.
1. Click the name of the subscription that you want to associate with your Kubernetes cluster. Take note of the subscription ID so that you can use it when provisioning your AKS cluster.
1. Click **Access Control (IAM)**.
1. In the **Add role assignment** section, click **Add**.
1. In the **Role** field, select a role that will have access to AKS. For example, you can use the **Contributor** role, which has permission to manage everything except for giving access to other users.
1. In the **Assign access to** field, select **Azure AD user, group, or service principal**.
1. In the **Select** field, select the name of your service principal and click **Save**.

**Result:** Your service principal now has access to AKS.

# 1. Create the AKS Cloud Credentials

1. In the Rancher UI, click **☰ > Cluster Management**.
1. Click **Cloud Credentials**.
1. Click **Create**.
1. Click **Azure**.
1. Fill out the form. For help with filling out the form, see the [configuration reference.]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/editing-clusters/aks-config-reference/#cloud-credentials)
1. Click **Create**.

# 2. Create the AKS Cluster

Use Rancher to set up and configure your Kubernetes cluster.

1. Click **☰ > Cluster Management**.
1. In the **Clusters** section, click **Create**.
1. Click **Azure AKS**.
1. Fill out the form. For help with filling out the form, see the [configuration reference.]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/editing-clusters/aks-config-reference)
1. Click **Create**.

**Result:** Your cluster is created and assigned a state of **Provisioning**. Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active**.

# Role-based Access Control
When provisioning an AKS cluster in the Rancher UI, RBAC is not configurable because it is required to be enabled.

RBAC is required for AKS clusters that are registered or imported into Rancher.

# AKS Cluster Configuration Reference

For more information about how to configure AKS clusters from the Rancher UI, see the [configuration reference.]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/editing-clusters/aks-config-reference)

# Private Clusters

Typically, AKS worker nodes do not get public IPs, regardless of whether the cluster is private. In a private cluster, the control plane does not have a public endpoint.

Rancher can connect to a private AKS cluster in one of two ways.

The first way to ensure that Rancher is running on the same [NAT](https://docs.microsoft.com/en-us/azure/virtual-network/nat-overview) as the AKS nodes.

The second way is to run a command to register the cluster with Rancher. Once the cluster is provisioned, you can run the displayed command anywhere you can connect to the cluster’s Kubernetes API. This command is displayed in a pop-up when you provision an AKS cluster with a private API endpoint enabled.

> **Note:** Please be aware that when registering an existing AKS cluster, the cluster might take some time, possibly hours, to appear in the `Cluster To register` dropdown list. This outcome will be based on region. 

For more information about connecting to an AKS private cluster, see the [AKS documentation.](https://docs.microsoft.com/en-us/azure/aks/private-clusters#options-for-connecting-to-the-private-cluster)

# Syncing

The AKS provisioner can synchronize the state of an AKS cluster between Rancher and the provider. For an in-depth technical explanation of how this works, see [Syncing.]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/editing-clusters/syncing)

For information on configuring the refresh interval, see [this section.]({{<baseurl>}}/rancher/v2.6/en/cluster-admin/editing-clusters/gke-config-reference/#configuring-the-refresh-interval)
