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

# Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/cluster-access/kubectl/#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.
- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/cluster-access/kubectl/#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through Rancher. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.