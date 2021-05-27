---
title: Creating an AKS Cluster
shortTitle: Azure Kubernetes Service
weight: 2115
aliases:
  - /rancher/v2.5/en/tasks/clusters/creating-a-cluster/create-cluster-azure-container-service/
---

You can use Rancher to create a cluster hosted in Microsoft Azure Kubernetes Service (AKS).

## Prerequisites in Microsoft Azure

>**Note**
>Deploying to AKS will incur charges.

To interact with Azure APIs, an AKS cluster requires an Azure Active Directory (AD) service principal. The service principal is needed to dynamically create and manage other Azure resources, and it provides credentials for your cluster to communicate with AKS. For more information about the service principal, refer to the [AKS documentation](https://docs.microsoft.com/en-us/azure/aks/kubernetes-service-principal).

Before creating the service principal, you need to obtain the following information from the [Microsoft Azure Portal](https://portal.azure.com):

- Your subscription ID
- Your tenant ID
- An app ID (also called a client ID)
- Client secret
- A resource group

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

1. Click **Azure Active Directory.**

1. Click **App registrations.**

1. Click **New registration.**

1. Enter a name. This will be the name of your service principal.

1. Optional: Choose which accounts can use the service principal.

1. Click **Register.**

1. You should now see the name of your service principal under **Azure Active Directory > App registrations.** 

1. Click the name of your service principal. Take note of the tenant ID and application ID (also called app ID or client ID) so that you can use it when provisioning your AKS cluster. Then click **Certificates & secrets.**

1. Click **New client secret.**

1. Enter a short description, pick an expiration time, and click **Add.** Take note of the client secret so that you can use it when provisioning the AKS cluster.

**Result:** You have created a service principal and you should be able to see it listed in the **Azure Active Directory** section under **App registrations.** You still need to give the service principal access to AKS. 

To give role-based access to your service principal,

1. Click **All Services** in the left navigation bar. Then click **Subscriptions.**

1. Click the name of the subscription that you want to associate with your Kubernetes cluster. Take note of the subscription ID so that you can use it when provisioning your AKS cluster.

1. Click **Access Control (IAM).**

1. In the **Add role assignment** section, click **Add.**

1. In the **Role** field, select a role that will have access to AKS. For example, you can use the **Contributor** role, which has permission to manage everything except for giving access to other users.

1. In the **Assign access to** field, select **Azure AD user, group, or service principal.**

1. In the **Select** field, select the name of your service principal and click **Save.**

**Result:** Your service principal now has access to AKS.


## Create the AKS Cluster

Use Rancher to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Azure Kubernetes Service**.

1. Enter a **Cluster Name**.

1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.

1. Use your subscription ID, tenant ID, app ID, and client secret to give your cluster access to AKS. If you don't have all of that information, you can retrieve it using these instructions:
  - **App ID and tenant ID:** To get the app ID and tenant ID, you can go to the Azure Portal, then click **Azure Active Directory**, then click **App registrations,** then click the name of the service principal. The app ID and tenant ID are both on the app registration detail page. 
  - **Client secret:** If you didn't copy the client secret when creating the service principal, you can get a new one if you go to the app registration detail page, then click **Certificates & secrets**, then click **New client secret.** 
  - **Subscription ID:** You can get the subscription ID is available in the portal from **All services > Subscriptions.**

1. Use **Cluster Options** to choose the version of Kubernetes, what network provider will be used and if you want to enable project network isolation. To see more cluster options, click on **Show advanced options.**

1. Complete the **Account Access** form using the output from your Service Principal. This information is used to authenticate with Azure.

1. Use **Nodes** to provision each node in your cluster and choose a geographical region.

	[Microsoft Documentation: How to create and use an SSH public and private key pair](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys)
<br/>
1. Click **Create**.
<br/>
1. Review your options to confirm they're correct. Then click **Create**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces
