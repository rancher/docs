---
title: Creating an Amazon EC2 Cluster
weight:
aliases:
  -/rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-amazon-ec2
---
Use {{< product >}} to create a Kubernetes cluster in Amazon EC2.

1. From the **Clusters** page, click **Add Cluster**.
1. Choose **Amazon EC2**.
1. Enter a **Cluster Name**.
1. {{< step_create-cluster_member-roles >}}
1. {{< step_create-cluster_cluster-options >}}
1. {{< step_create-cluster_node-pools >}}
	1.	Click **Add Node Template**.
      Complete each of the following forms using information available from the [EC2 Management Console](https://aws.amazon.com/ec2).
		  - **Account Access** holds the region and API Key used to create the cluster.
			[Amazon Documentation: Creating Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)
		  - **Zone and Network** configures the availability zone and network settings for your cluster.
		  - **Security Groups** configures the security groups applied to your cluster.
 		 - **Instance** provisions your VM instances.
	1. {{< step_rancher-template >}}
	1.	Click **Create**.
	1. **Optional:** Add additional node pools.
1. Review your cluster settings to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
