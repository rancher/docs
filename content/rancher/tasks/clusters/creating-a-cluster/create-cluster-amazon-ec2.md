---
layout: single
title: Amazon EC2
weight: 20
---

# Creating an Amazon EC2 Cluster

## Objectives

{{< prereq_cluster >}}

1.	[Create an Instance](#create-an-instance)

	Begin by logging into Amazon EC2 website and provisioning a new instance.

2. [Create the Cluster](#create-the-amazon-ec2-cluster)

	Use your new instance as a template for your new Kubernetes cluster.

## Create an Instance

Create an _instance_, Amazon's version of a virtual machine in EC2, using the [Amazon EC2 Management Console](https://aws.amazon.com/ec2/).

Provision the instance according to our [requirements](../setup/requirements.md).

[Amazon Instructions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)

## Create the Amazon EC2 Cluster

Use {{< product >}} to clone your Linux host and configure them as Kubernetes nodes.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Amazon EC2**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. {{< step_create-cluster_cluster-options >}}

6. {{< step_create-cluster_node-pools >}}

	1.	Click **Add Node Template**.

	2.	Complete each of the following forms using information available from the [EC2 Management Console](https://aws.amazon.com/ec2).

		- **Account Access** holds the region and API Key used to create the cluster.

			[Amazon Documentation: Creating Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)

		- **Zone and Network** configures the availability zone and network settings for your cluster.

		- **Security Groups** configures the security groups applied to your cluster.

 		- **Instance** provisions your VM instances.

	3. {{< step_rancher-template >}}

	4.	Click **Create**.

	5. **Optional:** Add additional node pools.
<br/>
6. Review your cluster settings to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
