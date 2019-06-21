---
title: Creating an AKS Cluster
shortTitle: Azure Kubernetes Service
weight: 2115
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-azure-container-service/
---

You can use Rancher to create a cluster hosted in Microsoft Azure Kubernetes Service (AKS).

## Prerequisites in Microsoft Azure

>**Note**
>Deploying to AKS will incur charges.

Obtain the following information from the [Microsoft Azure Portal](https://portal.azure.com) by completing how to [Create Service Principal for Azure AD](https://docs.microsoft.com/en-us/azure/azure-stack/azure-stack-create-service-principals#create-service-principal-for-azure-ad).


## Create the AKS Cluster

Use Rancher to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Azure Kubernetes Service**.

1. Enter a **Cluster Name**.

1. {{< step_create-cluster_member-roles >}} 

1. Use your subscription ID, tenant ID, app ID, and client secret to give your cluster access to AKS. If you don't have all of that information, you can retrieve it using these instructions:
  - **App ID and tenant ID:** To get the app ID and tenant ID, you can go to the Azure Portal, then click **Azure Active Directory**, then click **App registrations,** then click the name of the service principal. The app ID and tenant ID are both on the app registration detail page. 
  - **Client secret:** If you didn't copy the client secret when creating the service principal, you can get a new one if you go to the app registration detail page, then click **Certificates & secrets**, then click **New client secret.** 
  - **Subscription ID:** You can get the subscription ID is available in the portal from **All services > Subscriptions.**

1. {{< step_create-cluster_cluster-options >}}

1. Complete the **Account Access** form using the output from your Service Principal. This information is used to authenticate with Azure.

1. Use **Nodes** to provision each node in your cluster and choose a geographical region.

	[Microsoft Documentation: How to create and use an SSH public and private key pair](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys)
<br/>
1. Click **Create**.
<br/>
1. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
