---
title: Creating a DigitalOcean Cluster
shortTitle: DigitalOcean
weight: 2215
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-digital-ocean/
---
Use {{< product >}} to create a Kubernetes cluster using DigitalOcean.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **DigitalOcean**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	1.	Click **Add Node Template**. Note: As of v2.2.0, account access information is stored as a cloud credentials. Cloud credentials are stored as Kubernetes secrets. Multiple node templates can use the same cloud credential. You can use an existing cloud credential or create a new one. To create a new cloud credential, enter **Name** and **Account Access** data, then click **Create.**

	2.  Complete the **Digital Ocean Options** form.

		- **Access Token** stores your DigitalOcean Personal Access Token. Refer to [DigitalOcean Instructions: How To Generate a Personal Access Token](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-api-v2#how-to-generate-a-personal-access-token).

		- **Droplet Options** provision your cluster's geographical region and specifications.

	4. {{< step_rancher-template >}}

	5. Click **Create**.

	6. **Optional:** Add additional node pools.
<br/>
7. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
