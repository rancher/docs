---
title: Creatomg a vSphere Cluster
shortTitle: vSphere
weight: 3375
---
Use {{< product >}} to create a Kubernetes cluster in vSphere.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **vSphere**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	1.	Click **Add Node Template**.

	2.	Use the **vSphere Options** to authenticate with vSphere and provision your cluster.

		- **Account Access** holds the host name for your vCenter host and your credentials for authentication.

		- **Instance Options** are used to provision your cluster's VMs.

		- **Scheduling** is used to choose the hypervisor your virtual machines will be scheduled to.

	3. {{< step_rancher-template >}}

	4. Click **Create**.

	5. **Optional:** Add additional node pools.

<br/>
7. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
