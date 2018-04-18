---
tag: ["rancher", "cluster"]
category: "rancher"
layout: list-docs
title: Azure
weight: 50
---

# Creating an Azure Cluster

## Objectives

{{< prereq_cluster >}}

1.	[Create a Linux Virtual Machine](#create-a-linux-virtual-machine)

	Begin by logging into Azure and provisioning a Linux virtual machine (VM).

2.	[Create the Cluster](#create-the-azure-cluster)

	Use your Linux VM as a template for your new Kubernetes cluster.

## Create a Linux Virtual Machine

Create a Linux VM using the [Microsoft Azure Portal](https://portal.azure.com) ([Azure Instructions](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/)).

Provision the droplet according to our [requirements](../setup/requirements.md).

## Create the Azure Cluster

Use {{< product >}} to clone your Linux host and configure them as Kubernetes nodes.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Azure**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	1.	Click **Add Node Template**.

	2.	Complete the **Azure Options** form.

		- **Placement** sets the geographical region where where your cluster is hosted and other location metadata.

		- **Account Access** stores your account information for authenticating with Azure.

		- **Network** configures the networking used in your cluster.

		- **Instance** customizes your VM configuration.

	3. {{< step_rancher-template >}}

	4. Click **Create**.

	5. **Optional:** Add additional node pools.

7. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
