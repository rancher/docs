---
title: Creating an EKS Cluster
shortTitle: Amazon EKS
weight: 2110
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-eks/
---

Amazon EKS provides a managed control plane for your Kubernetes cluster. Amazon EKS runs the Kubernetes control plane instances across multiple Availability Zones to ensure high availability. Rancher provides an intuitive user interface for managing and deploying the Kubernetes clusters you run in Amazon EKS. With this guide, you will use Rancher to quickly and easily launch an Amazon EKS Kubernetes cluster in your AWS account. For more information on Amazon EKS, see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html).

- [Prerequisites in Amazon Web Services](#prerequisites-in-amazon-web-services)
  - [Amazon VPC](#amazon-vpc)
  - [IAM Policies](#iam-policies)
- [Architecture](#architecture)
- [Create the EKS Cluster](#create-the-eks-cluster)
- [EKS Cluster Configuration Reference](#eks-cluster-configuration-reference)
- [Troubleshooting](#troubleshooting)
- [AWS Service Events](#aws-service-events)
- [Security and Compliance](#security-and-compliance)
- [Tutorial](#tutorial)
- [Minimum EKS Permissions](#minimum-eks-permissions)

# Prerequisites in Amazon Web Services

>**Note**
>Deploying to Amazon AWS will incur charges. For more information, refer to the [EKS pricing page](https://aws.amazon.com/eks/pricing/).

To set up a cluster on EKS, you will need to set up an Amazon VPC (Virtual Private Cloud). You will also need to make sure that the account you will be using to create the EKS cluster has the appropriate [permissions.](#minimum-eks-permissions) For details, refer to the official guide on [Amazon EKS Prerequisites](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-prereqs).

### Amazon VPC

You need to set up an Amazon VPC to launch the EKS cluster. The VPC enables you to launch AWS resources into a virtual network that you've defined. For more information, refer to the [Tutorial: Creating a VPC with Public and Private Subnets for Your Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-public-private-vpc.html).

### IAM Policies

Rancher needs access to your AWS account in order to provision and administer your Kubernetes clusters in Amazon EKS. You'll need to create a user for Rancher in your AWS account and define what that user can access.

1. Create a user with programmatic access by following the steps [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).

2. Next, create an IAM policy that defines what this user has access to in your AWS account. It's important to only grant this user minimal access within your account. The minimum permissions required for an EKS cluster are listed [here.](#minimum-eks-permissions) Follow the steps [here](https://docs.aws.amazon.com/eks/latest/userguide/EKS_IAM_user_policies.html) to create an IAM policy and attach it to your user.

3. Finally, follow the steps [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) to create an access key and secret key for this user.

> **Note:** It's important to regularly rotate your access and secret keys. See this [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#rotating_access_keys_console) for more information.

For more detailed information on IAM policies for EKS, refer to the official [documentation on Amazon EKS IAM Policies, Roles, and Permissions](https://docs.aws.amazon.com/eks/latest/userguide/IAM_policies.html).

# Architecture

The figure below illustrates the high-level architecture of Rancher 2.x. The figure depicts a Rancher Server installation that manages two Kubernetes clusters: one created by RKE and another created by EKS.

<figcaption>Managing Kubernetes Clusters through Rancher's Authentication Proxy</figcaption>

![Architecture]({{<baseurl>}}/img/rancher/rancher-architecture-rancher-api-server.svg)

# Create the EKS Cluster

Use Rancher to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Amazon EKS**.

1. Enter a **Cluster Name.**

1. {{< step_create-cluster_member-roles >}}

1. Fill out the rest of the form. For help, refer to the [configuration reference.](#eks-cluster-configuration-reference) 

1. Click **Create**.

{{< result_create-cluster >}}

# EKS Cluster Configuration Reference

### Changes in Rancher v2.5

More EKS options can be configured when you create an EKS cluster in Rancher, including the following:

- Managed node groups
- The Kubernetes Cluster Autoscaler
- Control plane logging
- Secrets encryption with KMS

The following capabilities have been added for configuring EKS clusters in Rancher:

- GPU support
- Automatically update AMIs
- Add new nodes
- Upgrade nodes
- Add and remove node groups
- Disable and enable private access
- Add restrictions to public access
- Use your cloud credentials to create the EKS cluster instead of passing in your access key and secret key

{{% tabs %}}
{{% tab "Rancher v2.5+" %}}

### Account Access

<a id="account-access-2-5"></a>

Complete each drop-down and field using the information obtained for your [IAM policy.](#iam-policy)

| Setting    | Description       |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Region     | From the drop-down choose the geographical region in which to build your cluster.                                    |
| Cloud Credentials | Select the cloud credentials that you created for your [IAM policy.](#iam-policy) For more information on creating cloud credentials in Rancher, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cloud-credentials/) |

### Service Role

<a id="service-role-2-5"></a>

Choose a [service role](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html).

Service Role | Description
-------------|---------------------------
Standard: Rancher generated service role | If you choose this role, Rancher automatically adds a service role for use with the cluster.
Custom: Choose from your existing service roles | If you choose this role, Rancher lets you choose from service roles that you're already created within AWS. For more information on creating a custom service role in AWS, see the [Amazon documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html#create-service-linked-role).

### Secrets Encryption

<a id="secrets-encryption-2-5"></a>

Optional: To encrypt secrets, select or enter a key created in [AWS Key Management Service (KMS)](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)

### API Server Endpoint Access

<a id="api-server-endpoint-access-2-5"></a>

Configuring Public/Private API access is an advanced use case. For details, refer to the EKS cluster endpoint access control [documentation.](https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html)

### Public Access Endpoints

<a id="public-access-endpoints-2-5"></a>

Optionally limit access to the public endpoint via explicit CIDR blocks. If you limit access to specific CIDR blocks, then it is recommended that you also enable the private access to avoid losing network communication to the cluster.

For more information about public and private access to the cluster endpoint, refer to the [Amazon EKS documentation.](https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html)

### Subnet

<a id="subnet-2-5"></a>

| Option | Description |
| ------- | ------------ |
| Standard: Rancher generated VPC and Subnet | While provisioning your cluster, Rancher generates a new VPC and Subnet. |
| Custom: Choose from your existing VPC and Subnets | While provisioning your cluster, Rancher configures your nodes to use a VPC and Subnet that you've already [created in AWS](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html).  |

 For more information, refer to the AWS documentation for [Cluster VPC Considerations](https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html). Follow one of the sets of instructions below based on your selection from the previous step.

- [What Is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)

### Security Group

<a id="security-group-2-5"></a>

Amazon Documentation:

- [Cluster Security Group Considerations](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html)
- [Security Groups for Your VPC](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [Create a Security Group](https://docs.aws.amazon.com/vpc/latest/userguide/getting-started-ipv4.html#getting-started-create-security-group)

### Logging

<a id="logging-2-5"></a>

Configure control plane logs to send to Amazon CloudWatch. You are charged the standard CloudWatch Logs data ingestion and storage costs for any logs sent to CloudWatch Logs from your clusters.

Each log type corresponds to a component of the Kubernetes control plane. To learn more about these components, see [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/) in the Kubernetes documentation.

For more information on EKS control plane logging, refer to the official [documentation.](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)

### Managed Node Groups

<a id="managed-node-groups-2-5"></a>

Amazon EKS managed node groups automate the provisioning and lifecycle management of nodes (Amazon EC2 instances) for Amazon EKS Kubernetes clusters. 

For more information about how node groups work and how they are configured, refer to the [EKS documentation.](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html)

Amazon will use the [EKS-optimized AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) for the Kubernetes version. You can configure whether the AMI has GPU enabled.

| Option | Description |
| ------- | ------------ |
| Instance Type | Choose the [hardware specs](https://aws.amazon.com/ec2/instance-types/) for the instance you're provisioning. |
| Maximum ASG Size | The maximum number of instances. This setting won't take effect until the [Cluster Autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html) is installed. |
| Minimum ASG Size | The minimum number of instances. This setting won't take effect until the [Cluster Autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html) is installed. |

{{% /tab %}}
{{% tab "Rancher prior to v2.5" %}}


### Account Access

<a id="account-access-2-4"></a>

Complete each drop-down and field using the information obtained for your [IAM policy.](#iam-policy)

| Setting    | Description                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Region     | From the drop-down choose the geographical region in which to build your cluster.                                    |
| Access Key | Enter the access key that you created for your [IAM policy.](#iam-policy) |
| Secret Key | Enter the secret key that you created for your [IAM policy.](#iam-policy) |

### Service Role

<a id="service-role-2-4"></a>

Choose a [service role](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html).

Service Role | Description
-------------|---------------------------
Standard: Rancher generated service role | If you choose this role, Rancher automatically adds a service role for use with the cluster.
Custom: Choose from your existing service roles | If you choose this role, Rancher lets you choose from service roles that you're already created within AWS. For more information on creating a custom service role in AWS, see the [Amazon documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html#create-service-linked-role).

### Public IP for Worker Nodes

<a id="public-ip-for-worker-nodes-2-4"></a>

Your selection for this option determines what options are available for **VPC & Subnet**.

Option | Description
-------|------------
Yes | When your cluster nodes are provisioned, they're assigned a both a private and public IP address.
No: Private IPs only | When your cluster nodes are provisioned, they're assigned only a private IP address.<br/><br/>If you choose this option, you must also choose a **VPC & Subnet** that allow your instances to access the internet. This access is required so that your worker nodes can connect to the Kubernetes control plane.

### VPC & Subnet

<a id="vpc-and-subnet-2-4"></a>

The available options depend on the [public IP for worker nodes.](#public-ip-for-worker-nodes)

Option | Description
    -------|------------
    Standard: Rancher generated VPC and Subnet | While provisioning your cluster, Rancher generates a new VPC and Subnet.
    Custom: Choose from your existing VPC and Subnets | While provisioning your cluster, Rancher configures your nodes to use a VPC and Subnet that you've already [created in AWS](https://docs.aws.amazon.com/vpc/latest/userguide/getting-started-ipv4.html). If you choose this option, complete the remaining steps below.

 For more information, refer to the AWS documentation for [Cluster VPC Considerations](https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html). Follow one of the sets of instructions below based on your selection from the previous step.

- [What Is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)


If you choose to assign a public IP address to your cluster's worker nodes, you have the option of choosing between a VPC that's automatically generated by Rancher (i.e., **Standard: Rancher generated VPC and Subnet**), or a VPC that you've already created with AWS (i.e., **Custom: Choose from your existing VPC and Subnets**). Choose the option that best fits your use case.

{{% accordion id="yes" label="Click to expand" %}}

If you're using **Custom: Choose from your existing VPC and Subnets**:

(If you're using **Standard**, skip to the [instance options.)](#select-instance-options-2-4)

1. Make sure **Custom: Choose from your existing VPC and Subnets** is selected.

1. From the drop-down that displays, choose a VPC.

1. Click **Next: Select Subnets**. Then choose one of the **Subnets** that displays.

1. Click **Next: Select Security Group**.
{{% /accordion %}}

If your worker nodes have Private IPs only, you must also choose a **VPC & Subnet** that allow your instances to access the internet. This access is required so that your worker nodes can connect to the Kubernetes control plane.
{{% accordion id="no" label="Click to expand" %}}
Follow the steps below.

>**Tip:** When using only private IP addresses, you can provide your nodes internet access by creating a VPC constructed with two subnets, a private set and a public set.  The private set should have its route tables configured to point toward a NAT in the public set.  For more information on routing traffic from private subnets, please see the [official AWS documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html).

1. From the drop-down that displays, choose a VPC.

1. Click **Next: Select Subnets**. Then choose one of the **Subnets** that displays.

{{% /accordion %}}

### Security Group

<a id="security-group-2-4"></a>

Amazon Documentation:

- [Cluster Security Group Considerations](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html)
- [Security Groups for Your VPC](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [Create a Security Group](https://docs.aws.amazon.com/vpc/latest/userguide/getting-started-ipv4.html#getting-started-create-security-group)

### Instance Options

<a id="select-instance-options-2-4"></a>

Instance type and size of your worker nodes affects how many IP addresses each worker node will have available. See this [documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI) for more information.

Option | Description
-------|------------
Instance Type | Choose the [hardware specs](https://aws.amazon.com/ec2/instance-types/) for the instance you're provisioning.
Custom AMI Override | If you want to use a custom [Amazon Machine Image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html#creating-an-ami) (AMI), specify it here. By default, Rancher will use the [EKS-optimized AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) for the EKS version that you chose.
Desired ASG Size | The number of instances that your cluster will provision.
User Data | Custom commands can to be passed to perform automated configuration tasks **WARNING: Modifying this may cause your nodes to be unable to join the cluster.** _Note: Available as of v2.2.0_

{{% /tab %}}
{{% /tabs %}}


# Troubleshooting

For any issues or troubleshooting details for your Amazon EKS Kubernetes cluster, please see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html).

# AWS Service Events

To find information on any AWS Service events, please see [this page](https://status.aws.amazon.com/).

# Security and Compliance

For more information on security and compliance with your Amazon EKS Kubernetes cluster, please see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/shared-responsibilty.html).

# Tutorial

This [tutorial](https://aws.amazon.com/blogs/opensource/managing-eks-clusters-rancher/) on the AWS Open Source Blog will walk you through how to set up an EKS cluster with Rancher, deploy a publicly accessible app to test the cluster, and deploy a sample project to track real-time geospatial data using a combination of other open-source software such as Grafana and InfluxDB.

# Minimum EKS Permissions

Documented here is a minimum set of permissions necessary to use all functionality of the EKS driver in Rancher.

Resource targeting uses `*` as the ARN of many of the resources created cannot be known prior to creating the EKS cluster in Rancher. Some permissions (for example `ec2:CreateVpc`) are only used in situations where Rancher handles the creation of certain resources.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "EC2Permisssions",
            "Effect": "Allow",
            "Action": [
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:DeleteSubnet",
                "ec2:CreateKeyPair",
                "ec2:AttachInternetGateway",
                "ec2:ReplaceRoute",
                "ec2:DeleteRouteTable",
                "ec2:AssociateRouteTable",
                "ec2:DescribeInternetGateways",
                "ec2:CreateRoute",
                "ec2:CreateInternetGateway",
                "ec2:RevokeSecurityGroupEgress",
                "ec2:DescribeAccountAttributes",
                "ec2:DeleteInternetGateway",
                "ec2:DescribeKeyPairs",
                "ec2:CreateTags",
                "ec2:CreateRouteTable",
                "ec2:DescribeRouteTables",
                "ec2:DetachInternetGateway",
                "ec2:DisassociateRouteTable",
                "ec2:RevokeSecurityGroupIngress",
                "ec2:DeleteVpc",
                "ec2:CreateSubnet",
                "ec2:DescribeSubnets",
                "ec2:DeleteKeyPair",
                "ec2:DeleteTags",
                "ec2:CreateVpc",
                "ec2:DescribeAvailabilityZones",
                "ec2:CreateSecurityGroup",
                "ec2:ModifyVpcAttribute",
                "ec2:AuthorizeSecurityGroupEgress",
                "ec2:DescribeTags",
                "ec2:DeleteRoute",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeImages",
                "ec2:DescribeVpcs",
                "ec2:DeleteSecurityGroup"
            ],
            "Resource": "*"
        },
        {
            "Sid": "EKSPermissions",
            "Effect": "Allow",
            "Action": [
                "eks:DeleteFargateProfile",
                "eks:DescribeFargateProfile",
                "eks:ListTagsForResource",
                "eks:UpdateClusterConfig",
                "eks:DescribeNodegroup",
                "eks:ListNodegroups",
                "eks:DeleteCluster",
                "eks:CreateFargateProfile",
                "eks:DeleteNodegroup",
                "eks:UpdateNodegroupConfig",
                "eks:DescribeCluster",
                "eks:ListClusters",
                "eks:UpdateClusterVersion",
                "eks:UpdateNodegroupVersion",
                "eks:ListUpdates",
                "eks:CreateCluster",
                "eks:UntagResource",
                "eks:CreateNodegroup",
                "eks:ListFargateProfiles",
                "eks:DescribeUpdate",
                "eks:TagResource"
            ],
            "Resource": "*"
        },
        {
            "Sid": "IAMPermissions",
            "Effect": "Allow",
            "Action": [
                "iam:ListRoleTags",
                "iam:RemoveRoleFromInstanceProfile",
                "iam:CreateRole",
                "iam:AttachRolePolicy",
                "iam:AddRoleToInstanceProfile",
                "iam:DetachRolePolicy",
                "iam:GetRole",
                "iam:DeleteRole",
                "iam:CreateInstanceProfile",
                "iam:ListInstanceProfilesForRole",
                "iam:PassRole",
                "iam:GetInstanceProfile",
                "iam:ListRoles",
                "iam:ListInstanceProfiles",
                "iam:DeleteInstanceProfile"
            ],
            "Resource": "*"
        },
        {
            "Sid": "CloudFormationPermisssions",
            "Effect": "Allow",
            "Action": [
                "cloudformation:DescribeStackResource",
                "cloudformation:ListStackResources",
                "cloudformation:DescribeStackResources",
                "cloudformation:DescribeStacks",
                "cloudformation:ListStacks",
                "cloudformation:CreateStack"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AutoScalingPermissions",
            "Effect": "Allow",
            "Action": [
                "autoscaling:DescribeAutoScalingGroups",
                "autoscaling:UpdateAutoScalingGroup",
                "autoscaling:TerminateInstanceInAutoScalingGroup",
                "autoscaling:CreateOrUpdateTags",
                "autoscaling:DeleteAutoScalingGroup",
                "autoscaling:CreateAutoScalingGroup",
                "autoscaling:DescribeAutoScalingInstances",
                "autoscaling:DescribeLaunchConfigurations",
                "autoscaling:DescribeScalingActivities",
                "autoscaling:CreateLaunchConfiguration",
                "autoscaling:DeleteLaunchConfiguration"
            ],
            "Resource": "*"
        }
    ]
}
```
