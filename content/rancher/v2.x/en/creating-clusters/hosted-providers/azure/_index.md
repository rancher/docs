---
title: Creating an Azure Cluster
aliases:
  -/rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-azure
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

		- **Placement** sets the geographical region where where your cluster is hosted and other location metadata.

		- **Account Access** stores your account information for authenticating with Azure.

		- **Network** configures the networking used in your cluster.

		- **Instance** customizes your VM configuration.

	3. {{< step_rancher-template >}}

	4. Click **Create**.

	5. **Optional:** Add additional node pools.

7. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
