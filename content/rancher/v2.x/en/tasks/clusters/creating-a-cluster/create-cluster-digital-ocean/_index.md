---
title: Creating a DigitalOcean Clusters
shortTitle: DigitalOcean
weight: 3275
---
Use {{< product >}} to create a Kubernetes cluster using DigitalOcean.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Digital Ocean**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	1.	Click **Add Node Template**.

	2.	Paste your DigitalOcean Personal Access Token.

		[DigitalOcean Instructions: How To Generate a Personal Access Token](https://www.digitalocean.com/community/tutorials/how-to-use-the-digitalocean-api-v2#how-to-generate-a-personal-access-token)

	3. Complete the **DigitalOcean Options** form.

		- **Droplet Options** provision your cluster's geographical region and specifications.

	4. {{< step_rancher-template >}}

	5. Click **Create**.

	6. **Optional:** Add additional node pools.
<br/>
7. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
