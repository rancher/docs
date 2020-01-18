---
title: Creating an Azure Cluster
shortTitle: Azure
weight: 2220
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-azure/
---

Use {{< product >}} to create a Kubernetes cluster in Azure.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Azure**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	1.	Click **Add Node Template**.

	2.	Complete the **Azure Options** form.

		- **Account Access** stores your account information for authenticating with Azure. Note: As of v2.2.0, account access information is stored as a cloud credentials. Cloud credentials are stored as Kubernetes secrets. Multiple node templates can use the same cloud credential. You can use an existing cloud credential or create a new one. To create a new cloud credential, enter **Name** and **Account Access** data, then click **Create.**

		- **Placement** sets the geographical region where your cluster is hosted and other location metadata.

		- **Network** configures the networking used in your cluster.

		- **Instance** customizes your VM configuration.

	3. {{< step_rancher-template >}}

	4. Click **Create**.

	5. **Optional:** Add additional node pools.
<br>
7. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
