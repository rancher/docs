---
title: Azure Container Service
weight: 3350
---

# Creating an Azure Container Service Cluster

You can use Rancher to create a cluster using Microsoft Azure Container Service.

{{< beta-note_azure >}

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Azure Container Service**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6.	Complete the **Account Access** form. This information is used to authenticate with Azure.

	-	You can find your **Subscription ID** and **Tenant ID** on the [Microsoft Azure Portal](https://portal.azure.com/).
	-	To obtain a **Client ID** and **Client Secret**, follow the instructions in [this document](https://www.packer.io/docs/builders/azure-setup.html).
<br/>
7. Use **Nodes** to provision each node in your cluster and choose a geographical region.

	Provision the nodes according to our [requirements](../setup/requirements.md).

	[Microsoft Documentation: How to create and use an SSH public and private key pair](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys)
<br/>
8. Click **Create**.
<br/>
9. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
