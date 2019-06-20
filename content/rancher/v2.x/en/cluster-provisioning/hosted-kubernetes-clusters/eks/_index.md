---
title: Creating an EKS Cluster
shortTitle: Amazon EKS
weight: 2110
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-eks/
---

Amazon EKS provides a managed control plane for your Kubernetes cluster. Amazon EKS runs the Kubernetes control plane instances across multiple Availability Zones to ensure high availability. Rancher provides an intuitive user interface for managing and deploying the Kubernetes clusters you run in Amazon EKS. With this guide, you will use Rancher to quickly and easily launch an Amazon EKS Kubernetes cluster in your AWS account. For more information on Amazon EKS, see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html).


## Prerequisites in Amazon Web Services

>**Note**
>Deploying to Amazon AWS will incur charges. For more information, refer to the [EKS pricing page](https://aws.amazon.com/eks/pricing/).

To set up a cluster on EKS, you will need to set up an Amazon VPC (Virtual Private Cloud). You will also need to make sure that the account you will be using to create the EKS cluster has the appropriate permissions. For details, refer to the official guide on [Amazon EKS Prerequisites](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-prereqs).

### Amazon VPC

You need to set up an Amazon VPC to launch the EKS cluster. The VPC enables you to launch AWS resources into a virtual network that you've defined. For more information, refer to the [Tutorial: Creating a VPC with Public and Private Subnets for Your Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-public-private-vpc.html).

### IAM Policies

Rancher needs access to your AWS account in order to provision and administer your Kubernetes clusters in Amazon EKS. You'll need to create a user for Rancher in your AWS account and define what that user can access.

1. Create a user with programmatic access by following the steps [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).

2. Next, create an IAM policy that defines what this user has access to in your AWS account. It's important to only grant this user minimal access within your account. Follow the steps [here](https://docs.aws.amazon.com/eks/latest/userguide/EKS_IAM_user_policies.html) to create an IAM policy and attach it to your user.

3. Finally, follow the steps [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) to create an access key and secret key for this user.

> **Note:** It's important to regularly rotate your access and secret keys. See this [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#rotating_access_keys_console) for more information.

For more detailed information on IAM policies for EKS, refer to the official [documentation on Amazon EKS IAM Policies, Roles, and Permissions](https://docs.aws.amazon.com/eks/latest/userguide/IAM_policies.html).

## Architecture

The figure below illustrates the high-level architecture of Rancher 2.x. The figure depicts a Rancher Server installation that manages two Kubernetes clusters: one created by RKE and another created by EKS.

![Rancher architecture with EKS hosted cluster]({{< baseurl >}}/img/rancher/rancher-architecture.svg)

## Architecture

The figure below illustrates the high-level architecture of Rancher 2.x. The figure depicts a Rancher Server installation that manages two Kubernetes clusters: one created by RKE and another created by EKS.

![Rancher architecture with EKS hosted cluster]({{< baseurl >}}/img/rancher/rancher-architecture.svg)

## Architecture

The figure below illustrates the high-level architecture of Rancher 2.x. The figure depicts a Rancher Server installation that manages two Kubernetes clusters: one created by RKE and another created by EKS.

![Rancher architecture with EKS hosted cluster]({{< baseurl >}}/img/rancher/rancher-architecture.svg)

## Create the EKS Cluster

Use Rancher to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Amazon EKS**.

1. Enter a **Cluster Name**.

1. {{< step_create-cluster_member-roles >}}

1. Configure **Account Access** for the EKS cluster. Complete each drop-down and field using the information obtained in [2. Create Access Key and Secret Key](#prerequisites-in-amazon-web-services).

    | Setting    | Description                                                                                                          |
    | ---------- | -------------------------------------------------------------------------------------------------------------------- |
    | Region     | From the drop-down choose the geographical region in which to build your cluster.                                    |
    | Access Key | Enter the access key that you created in [2. Create Access Key and Secret Key](#2-create-access-key-and-secret-key). |
    | Secret Key | Enter the secret key that you created in [2. Create Access Key and Secret Key](#2-create-access-key-and-secret-key). |

1. Click **Next: Select Service Role**. Then choose a [service role](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html).

    Service Role | Description
    -------------|---------------------------
    Standard: Rancher generated service role | If you choose this role, Rancher automatically adds a service role for use with the cluster.
    Custom: Choose from your existing service roles | If you choose this role, Rancher lets you choose from service roles that you're already created within AWS. For more information on creating a custom service role in AWS, see the [Amazon documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html#create-service-linked-role).

1. Click **Next: Select VPC and Subnet**.

1. Choose an option for **Public IP for Worker Nodes**. Your selection for this option determines what options are available for **VPC & Subnet**.

    Option | Description
    -------|------------
    Yes | When your cluster nodes are provisioned, they're assigned a both a private and public IP address.
    No: Private IPs only | When your cluster nodes are provisioned, they're assigned only a private IP address.<br/><br/>If you choose this option, you must also choose a **VPC & Subnet** that allow your instances to access the internet. This access is required so that your worker nodes can connect to the Kubernetes control plane.

1. Now choose a **VPC & Subnet**. For more information, refer to the AWS documentation for [Cluster VPC Considerations](https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html). Follow one of the sets of instructions below based on your selection from the previous step.

	- [What Is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
	- [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)

    {{% accordion id="yes" label="Public IP for Worker Nodes—Yes" %}}
If you choose to assign a public IP address to your cluster's worker nodes, you have the option of choosing between a VPC that's automatically generated by Rancher (i.e., **Standard: Rancher generated VPC and Subnet**), or a VPC that you're already created with AWS (i.e., **Custom: Choose from your existing VPC and Subnets**). Choose the option that best fits your use case.

1. Choose a **VPC and Subnet** option.

    Option | Description
    -------|------------
    Standard: Rancher generated VPC and Subnet | While provisioning your cluster, Rancher generates a new VPC and Subnet.
    Custom: Choose from your exiting VPC and Subnets | While provisioning your cluster, Rancher configures your nodes to use a VPC and Subnet that you've already [created in AWS](https://docs.aws.amazon.com/vpc/latest/userguide/getting-started-ipv4.html). If you choose this option, complete the remaining steps below.

1.  If you're using **Custom: Choose from your existing VPC and Subnets**:

    (If you're using **Standard**, skip to [step 11](#select-instance-options))

	1. Make sure **Custom: Choose from your existing VPC and Subnets** is selected.

	1. From the drop-down that displays, choose a VPC.

	1. Click **Next: Select Subnets**. Then choose one of the **Subnets** that displays.

    1. Click **Next: Select Security Group**.
    {{% /accordion %}}
    {{% accordion id="no" label="Public IP for Worker Nodes—No: Private IPs only" %}}
If you chose this option, you must also choose a **VPC & Subnet** that allow your instances to access the internet. This access is required so that your worker nodes can connect to the Kubernetes control plane. Follow the steps below.

>**Tip:** When using only private IP addresses, you can provide your nodes internet access by creating a VPC constructed with two subnets, a private set and a public set.  The private set should have its route tables configured to point toward a NAT in the public set.  For more information on routing traffic from private subnets, please see the [official AWS documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html).

    1. From the drop-down that displays, choose a VPC.

	1. Click **Next: Select Subnets**. Then choose one of the **Subnets** that displays.

    1. Click **Next: Select Security Group**.
    {{% /accordion %}}

1. <a id="security-group"></a>Choose a **Security Group**. See the documentation below on how to create one.

    Amazon Documentation:
    - [Cluster Security Group Considerations](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html)
    - [Security Groups for Your VPC](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
    - [Create a Security Group](https://docs.aws.amazon.com/vpc/latest/userguide/getting-started-ipv4.html#getting-started-create-security-group)

1. <a id="select-instance-options"></a>Click **Select Instance Options**, and then edit the node options available. Instance type and size of your worker nodes affects how many IP addresses each worker node will have available. See this [documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI) for more information.

    Option | Description
    -------|------------
    Instance Type | Choose the [hardware specs](https://aws.amazon.com/ec2/instance-types/) for the instance you're provisioning.
    Custom AMI Override | If you want to use a custom [Amazon Machine Image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#creating-an-ami) (AMI), specify it here. By default, Rancher will use the [EKS-optimized AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) for the EKS version that you chose.
    Minimum ASG Size | The minimum number of instances that your cluster will scale to during low traffic, as controlled by [Amazon Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html).
    Maximum ASG Size | The maximum number of instances that your cluster will scale to during high traffic, as controlled by [Amazon Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html).
    User Data | Custom commands can to be passed to perform automated configuration tasks **WARNING: Modifying this may cause your nodes to be unable to join the cluster.** _Note: Available as of v2.2.0_

1. Click **Create**.

{{< result_create-cluster >}}

## Troubleshooting

For any issues or troubleshooting details for your Amazon EKS Kubernetes cluster, please see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html).

## AWS Service Events

To find information on any AWS Service events, please see [this page](https://status.aws.amazon.com/).

## Security and Compliance

For more information on security and compliance with your Amazon EKS Kubernetes cluster, please see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/shared-responsibilty.html).

## Tutorial

This [tutorial](https://aws.amazon.com/blogs/opensource/managing-eks-clusters-rancher/) on the AWS Open Source Blog will walk you through how to set up an EKS cluster with Rancher, deploy a publicly accessible app to test the cluster, and deploy a sample project to track real-time geospatial data using a combination of other open-source software such as Grafana and InfluxDB.