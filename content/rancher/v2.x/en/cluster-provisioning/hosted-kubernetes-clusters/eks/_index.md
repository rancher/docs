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
  - [Service Role Permissions](#service-role-permissions)
  - [VPC Permissions](#vpc-permissions)
- [Syncing](#syncing)

# Prerequisites in Amazon Web Services

>**Note**
>Deploying to Amazon AWS will incur charges. For more information, refer to the [EKS pricing page](https://aws.amazon.com/eks/pricing/).

To set up a cluster on EKS, you will need to set up an Amazon VPC (Virtual Private Cloud). You will also need to make sure that the account you will be using to create the EKS cluster has the appropriate [permissions.](#minimum-eks-permissions) For details, refer to the official guide on [Amazon EKS Prerequisites](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-prereqs).

### Amazon VPC

An Amazon VPC is required to launch the EKS cluster. The VPC enables you to launch AWS resources into a virtual network that you've defined. You can set one up yourself and provide it during cluster creation in Rancher. If you do not provide one during creation, Rancher will create one. For more information, refer to the [Tutorial: Creating a VPC with Public and Private Subnets for Your Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-public-private-vpc.html).

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

1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.

1. Fill out the rest of the form. For help, refer to the [configuration reference.](#eks-cluster-configuration-reference) 

1. Click **Create**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces


# EKS Cluster Configuration Reference

### Changes in Rancher v2.5

More EKS options can be configured when you create an EKS cluster in Rancher, including the following:

- Managed node groups
- Desired size, minimum size, maximum size (requires the Cluster Autoscaler to be installed)
- Control plane logging
- Secrets encryption with KMS

The following capabilities have been added for configuring EKS clusters in Rancher:

- GPU support
- Exclusively use managed nodegroups that come with the most up-to-date AMIs
- Add new nodes
- Upgrade nodes
- Add and remove node groups
- Disable and enable private access
- Add restrictions to public access
- Use your cloud credentials to create the EKS cluster instead of passing in your access key and secret key

Due to the way that the cluster data is synced with EKS, if the cluster is modified from another source, such as in the EKS console, and in Rancher within five minutes, it could cause some changes to be overwritten. For information about how the sync works and how to configure it, refer to [this section](#syncing).

{{% tabs %}}
{{% tab "Rancher v2.5.6+" %}}

### Account Access

<a id="account-access-2-5-6"></a>

Complete each drop-down and field using the information obtained for your IAM policy.

| Setting    | Description       |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Region     | From the drop-down choose the geographical region in which to build your cluster.                                    |
| Cloud Credentials | Select the cloud credentials that you created for your IAM policy. For more information on creating cloud credentials in Rancher, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cloud-credentials/) |

### Service Role

<a id="service-role-2-5-6"></a>

Choose a [service role](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html).

Service Role | Description
-------------|---------------------------
Standard: Rancher generated service role | If you choose this role, Rancher automatically adds a service role for use with the cluster.
Custom: Choose from your existing service roles | If you choose this role, Rancher lets you choose from service roles that you're already created within AWS. For more information on creating a custom service role in AWS, see the [Amazon documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html#create-service-linked-role).

### Secrets Encryption

<a id="secrets-encryption-2-5-6"></a>

Optional: To encrypt secrets, select or enter a key created in [AWS Key Management Service (KMS)](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)

### API Server Endpoint Access

<a id="api-server-endpoint-access-2-5-6"></a>

Configuring Public/Private API access is an advanced use case. For details, refer to the EKS cluster endpoint access control [documentation.](https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html)

### Private-only API Endpoints

If you enable private and disable public API endpoint access when creating a cluster, then there is an extra step you must take in order for Rancher to connect to the cluster successfully. In this case, a pop-up will be displayed with a command that you will run on the cluster to register it with Rancher. Once the cluster is provisioned, you can run the displayed command anywhere you can connect to the cluster's Kubernetes API.

There are two ways to avoid this extra manual step:
- You can create the cluster with both private and public API endpoint access on cluster creation. You can disable public access after the cluster is created and in an active state and Rancher will continue to communicate with the EKS cluster.
- You can ensure that Rancher shares a subnet with the EKS cluster. Then security groups can be used to enable Rancher to communicate with the cluster's API endpoint. In this case, the command to register the cluster is not needed, and Rancher will be able to communicate with your cluster. For more information on configuring security groups, refer to the [security groups documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html).

### Public Access Endpoints

<a id="public-access-endpoints-2-5-6"></a>

Optionally limit access to the public endpoint via explicit CIDR blocks.

If you limit access to specific CIDR blocks, then it is recommended that you also enable the private access to avoid losing network communication to the cluster.

One of the following is required to enable private access:
- Rancher's IP must be part of an allowed CIDR block
- Private access should be enabled, and Rancher must share a subnet with the cluster and have network access to the cluster, which can be configured with a security group

For more information about public and private access to the cluster endpoint, refer to the [Amazon EKS documentation.](https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html)

### Subnet

<a id="subnet-2-5-6"></a>

| Option | Description |
| ------- | ------------ |
| Standard: Rancher generated VPC and Subnet | While provisioning your cluster, Rancher generates a new VPC with 3 public subnets. |
| Custom: Choose from your existing VPC and Subnets | While provisioning your cluster, Rancher configures your Control Plane and nodes to use a VPC and Subnet that you've already [created in AWS](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html).  |

 For more information, refer to the AWS documentation for [Cluster VPC Considerations](https://docs.aws.amazon.com/eks/latest/userguide/network_reqs.html). Follow one of the sets of instructions below based on your selection from the previous step.

- [What Is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [VPCs and Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Subnets.html)

### Security Group

<a id="security-group-2-5-6"></a>

Amazon Documentation:

- [Cluster Security Group Considerations](https://docs.aws.amazon.com/eks/latest/userguide/sec-group-reqs.html)
- [Security Groups for Your VPC](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)
- [Create a Security Group](https://docs.aws.amazon.com/vpc/latest/userguide/getting-started-ipv4.html#getting-started-create-security-group)

### Logging

<a id="logging-2-5-6"></a>

Configure control plane logs to send to Amazon CloudWatch. You are charged the standard CloudWatch Logs data ingestion and storage costs for any logs sent to CloudWatch Logs from your clusters.

Each log type corresponds to a component of the Kubernetes control plane. To learn more about these components, see [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/) in the Kubernetes documentation.

For more information on EKS control plane logging, refer to the official [documentation.](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html)

### Managed Node Groups

<a id="managed-node-groups-2-5-6"></a>

Amazon EKS managed node groups automate the provisioning and lifecycle management of nodes (Amazon EC2 instances) for Amazon EKS Kubernetes clusters. 

For more information about how node groups work and how they are configured, refer to the [EKS documentation.](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html)

#### Bring your own launch template

A launch template ID and version can be provided in order to easily configure the EC2 instances in a node group. If a launch template is provided, then none of the settings below will be configurable in Rancher. Therefore, using a launch template would require that all the necessary and desired settings from the list below would need to be specified in the launch template. Also note that if a launch template ID and version is provided, then only the template version can be updated. Using a new template ID would require creating a new managed node group.

| Option | Description | Required/Optional |
| ------ | ----------- | ----------------- |
| Instance Type | Choose the [hardware specs](https://aws.amazon.com/ec2/instance-types/) for the instance you're provisioning. | Required |
| Image ID | Specify a custom AMI for the nodes. Custom AMIs used with EKS must be [configured properly](https://aws.amazon.com/premiumsupport/knowledge-center/eks-custom-linux-ami/) | Optional |
| Node Volume Size | The launch template must specify an EBS volume with the desired size | Required |
| SSH Key | A key to be added to the instances to provide SSH access to the nodes | Optional |
| User Data | Cloud init script in [MIME multi-part format](https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-user-data) | Optional |
| Instance Resource Tags | Tag each EC2 instance in the node group | Optional |

#### Rancher-managed launch templates

If you do not specify a launch template, then you will be able to configure the above options in the Rancher UI and all of them can be updated after creation. In order to take advantage of all of these options, Rancher will create and manage a launch template for you. Each cluster in Rancher will have one Rancher-managed launch template and each managed node group that does not have a specified launch template will have one version of the managed launch template. The name of this launch template will have the prefix "rancher-managed-lt-" followed by the display name of the cluster. In addition, the Rancher-managed launch template will be tagged with the key "rancher-managed-template" and value "do-not-modify-or-delete" to help identify it as Rancher-managed. It is important that this launch template and its versions not be modified, deleted, or used with any other clusters or managed node groups. Doing so could result in your node groups being "degraded" and needing to be destroyed and recreated.

#### Custom AMIs

If you specify a custom AMI, whether in a launch template or in Rancher, then the image must be [configured properly](https://aws.amazon.com/premiumsupport/knowledge-center/eks-custom-linux-ami/) and you must provide user data to [bootstrap the node](https://docs.aws.amazon.com/eks/latest/userguide/launch-templates.html#launch-template-custom-ami). This is considered an advanced use case and understanding the requirements is imperative.

If you specify a launch template that does not contain a custom AMI, then Amazon will use the [EKS-optimized AMI](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) for the Kubernetes version and selected region. You can also select a [GPU enabled instance](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html#gpu-ami) for workloads that would benefit from it.

>**Note**
>The GPU enabled instance setting in Rancher is ignored if a custom AMI is provided, either in the dropdown or in a launch template.

#### Spot instances

Spot instances are now [supported by EKS](https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html#managed-node-group-capacity-types-spot). If a launch template is specified, Amazon recommends that the template not provide an instance type. Instead, Amazon recommends providing multiple instance types. If the "Request Spot Instances" checkbox is enabled for a node group, then you will have the opportunity to provide multiple instance types.

>**Note**
>Any selection you made in the instance type dropdown will be ignored in this situation and you must specify at least one instance type to the "Spot Instance Types" section. Furthermore, a launch template used with EKS cannot request spot instances. Requesting spot instances must be part of the EKS configuration.

#### Node Group Settings

The following settings are also configurable. All of these except for the "Node Group Name" are editable after the node group is created.

| Option | Description |
| ------- | ------------ |
| Node Group Name | The name of the node group. |
| Desired ASG Size | The desired number of instances. |
| Maximum ASG Size | The maximum number of instances. This setting won't take effect until the [Cluster Autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html) is installed. |
| Minimum ASG Size | The minimum number of instances. This setting won't take effect until the [Cluster Autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html) is installed. |
| Labels | Kubernetes labels applied to the nodes in the managed node group. |
| Tags | These are tags for the managed node group and do not propagate to any of the associated resources. |


{{% /tab %}}
{{% tab "Rancher v2.5.0-v2.5.5" %}}

### Account Access

<a id="account-access-2-5"></a>

Complete each drop-down and field using the information obtained for your IAM policy.

| Setting    | Description       |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Region     | From the drop-down choose the geographical region in which to build your cluster.                                    |
| Cloud Credentials | Select the cloud credentials that you created for your IAM policy. For more information on creating cloud credentials in Rancher, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/user-settings/cloud-credentials/) |

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

### Private-only API Endpoints

If you enable private and disable public API endpoint access when creating a cluster, then there is an extra step you must take in order for Rancher to connect to the cluster successfully. In this case, a pop-up will be displayed with a command that you will run on the cluster to register it with Rancher. Once the cluster is provisioned, you can run the displayed command anywhere you can connect to the cluster's Kubernetes API.

There are two ways to avoid this extra manual step:
- You can create the cluster with both private and public API endpoint access on cluster creation. You can disable public access after the cluster is created and in an active state and Rancher will continue to communicate with the EKS cluster.
- You can ensure that Rancher shares a subnet with the EKS cluster. Then security groups can be used to enable Rancher to communicate with the cluster's API endpoint. In this case, the command to register the cluster is not needed, and Rancher will be able to communicate with your cluster. For more information on configuring security groups, refer to the [security groups documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html).

### Public Access Endpoints

<a id="public-access-endpoints-2-5"></a>

Optionally limit access to the public endpoint via explicit CIDR blocks.

If you limit access to specific CIDR blocks, then it is recommended that you also enable the private access to avoid losing network communication to the cluster.

One of the following is required to enable private access:
- Rancher's IP must be part of an allowed CIDR block
- Private access should be enabled, and Rancher must share a subnet with the cluster and have network access to the cluster, which can be configured with a security group

For more information about public and private access to the cluster endpoint, refer to the [Amazon EKS documentation.](https://docs.aws.amazon.com/eks/latest/userguide/cluster-endpoint.html)

### Subnet

<a id="subnet-2-5"></a>

| Option | Description |
| ------- | ------------ |
| Standard: Rancher generated VPC and Subnet | While provisioning your cluster, Rancher generates a new VPC with 3 public subnets. |
| Custom: Choose from your existing VPC and Subnets | While provisioning your cluster, Rancher configures your Control Plane and nodes to use a VPC and Subnet that you've already [created in AWS](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html).  |

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
{{% tab "Rancher before v2.5" %}}


### Account Access

<a id="account-access-2-4"></a>

Complete each drop-down and field using the information obtained for your IAM policy.

| Setting    | Description                                                                                                          |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Region     | From the drop-down choose the geographical region in which to build your cluster.                                    |
| Access Key | Enter the access key that you created for your IAM policy. |
| Secret Key | Enter the secret key that you created for your IAM policy. |

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

If your changes were overwritten, it could be due to the way the cluster data is synced with EKS. Changes shouldn't be made to the cluster from another source, such as in the EKS console, and in Rancher within a five-minute span. For information on how this works and how to configure the refresh interval, refer to [Syncing.](#syncing)

If an unauthorized error is returned while attempting to modify or register the cluster and the cluster was not created with the role or user that your credentials belong to, refer to [Security and Compliance.](#security-and-compliance)

For any issues or troubleshooting details for your Amazon EKS Kubernetes cluster, please see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html).

# AWS Service Events

To find information on any AWS Service events, please see [this page](https://status.aws.amazon.com/).

# Security and Compliance

By default only the IAM user or role that created a cluster has access to it. Attempting to access the cluster with any other user or role without additional configuration will lead to an error. In Rancher, this means using a credential that maps to a user or role that was not used to create the cluster will cause an unauthorized error. For example, an EKSCtl cluster will not register in Rancher unless the credentials used to register the cluster match the role or user used by EKSCtl. Additional users and roles can be authorized to access a cluster by being added to the aws-auth configmap in the kube-system namespace. For a more in-depth explanation and detailed instructions, please see this [documentation](https://aws.amazon.com/premiumsupport/knowledge-center/amazon-eks-cluster-access/).

For more information on security and compliance with your Amazon EKS Kubernetes cluster, please see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/shared-responsibilty.html).

# Tutorial

This [tutorial](https://aws.amazon.com/blogs/opensource/managing-eks-clusters-rancher/) on the AWS Open Source Blog will walk you through how to set up an EKS cluster with Rancher, deploy a publicly accessible app to test the cluster, and deploy a sample project to track real-time geospatial data using a combination of other open-source software such as Grafana and InfluxDB.

# Minimum EKS Permissions

Documented here is a minimum set of permissions necessary to use all functionality of the EKS driver in Rancher. Additional permissions are required for Rancher to provision the `Service Role` and `VPC` resources. Optionally these resources can be created **before** the cluster creation and will be selectable when defining the cluster configuration.

Resource | Description 
---------|------------
Service Role | The service role provides Kubernetes the permissions it requires to manage resources on your behalf. Rancher can create the service role with the following [Service Role Permissions]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/eks/#service-role-permissions).
VPC | Provides isolated network resources utilised by EKS and worker nodes. Rancher can create the VPC resources with the following [VPC Permissions]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/eks/#vpc-permissions).


Resource targeting uses `*` as the ARN of many of the resources created cannot be known before creating the EKS cluster in Rancher.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "EC2Permisssions",
            "Effect": "Allow",
            "Action": [
                "ec2:RunInstances",
                "ec2:RevokeSecurityGroupIngress",
                "ec2:RevokeSecurityGroupEgress",
                "ec2:DescribeVpcs",
                "ec2:DescribeTags",
                "ec2:DescribeSubnets",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeRouteTables",
                "ec2:DescribeLaunchTemplateVersions",
                "ec2:DescribeLaunchTemplates",
                "ec2:DescribeKeyPairs",
                "ec2:DescribeInternetGateways",
                "ec2:DescribeImages",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeAccountAttributes",
                "ec2:DeleteTags",
                "ec2:DeleteSecurityGroup",
                "ec2:DeleteKeyPair",
                "ec2:CreateTags",
                "ec2:CreateSecurityGroup",
                "ec2:CreateLaunchTemplateVersion",
                "ec2:CreateLaunchTemplate",
                "ec2:CreateKeyPair",
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:AuthorizeSecurityGroupEgress"
            ],
            "Resource": "*"
        },
        {
            "Sid": "CloudFormationPermisssions",
            "Effect": "Allow",
            "Action": [
                "cloudformation:ListStacks",
                "cloudformation:ListStackResources",
                "cloudformation:DescribeStacks",
                "cloudformation:DescribeStackResources",
                "cloudformation:DescribeStackResource",
                "cloudformation:DeleteStack",
                "cloudformation:CreateStackSet",
                "cloudformation:CreateStack"
            ],
            "Resource": "*"
        },
        {
            "Sid": "IAMPermissions",
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "iam:ListRoles",
                "iam:ListRoleTags",
                "iam:ListInstanceProfilesForRole",
                "iam:ListInstanceProfiles",
                "iam:ListAttachedRolePolicies",
                "iam:GetRole",
                "iam:GetInstanceProfile",
                "iam:DetachRolePolicy",
                "iam:DeleteRole",
                "iam:CreateRole",
                "iam:AttachRolePolicy"
            ],
            "Resource": "*"
        },
        {
            "Sid": "KMSPermisssions",
            "Effect": "Allow",
            "Action": "kms:ListKeys",
            "Resource": "*"
        },
        {
            "Sid": "EKSPermisssions",
            "Effect": "Allow",
            "Action": [
                "eks:UpdateNodegroupVersion",
                "eks:UpdateNodegroupConfig",
                "eks:UpdateClusterVersion",
                "eks:UpdateClusterConfig",
                "eks:UntagResource",
                "eks:TagResource",
                "eks:ListUpdates",
                "eks:ListTagsForResource",
                "eks:ListNodegroups",
                "eks:ListFargateProfiles",
                "eks:ListClusters",
                "eks:DescribeUpdate",
                "eks:DescribeNodegroup",
                "eks:DescribeFargateProfile",
                "eks:DescribeCluster",
                "eks:DeleteNodegroup",
                "eks:DeleteFargateProfile",
                "eks:DeleteCluster",
                "eks:CreateNodegroup",
                "eks:CreateFargateProfile",
                "eks:CreateCluster"
            ],
            "Resource": "*"
        }
    ]
}
```

### Service Role Permissions

Rancher will create a service role with the following trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
```

This role will also have two role policy attachments with the following policies ARNs:

```
arn:aws:iam::aws:policy/AmazonEKSClusterPolicy
arn:aws:iam::aws:policy/AmazonEKSServicePolicy
```

Permissions required for Rancher to create service role on users behalf during the EKS cluster creation process.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "IAMPermisssions",
      "Effect": "Allow",
      "Action": [
        "iam:AddRoleToInstanceProfile",
        "iam:AttachRolePolicy",
        "iam:CreateInstanceProfile",
        "iam:CreateRole",
        "iam:CreateServiceLinkedRole",
        "iam:DeleteInstanceProfile",
        "iam:DeleteRole",
        "iam:DetachRolePolicy",
        "iam:GetInstanceProfile",
        "iam:GetRole",
        "iam:ListAttachedRolePolicies",
        "iam:ListInstanceProfiles",
        "iam:ListInstanceProfilesForRole",
        "iam:ListRoles",
        "iam:ListRoleTags",
        "iam:PassRole",
        "iam:RemoveRoleFromInstanceProfile"
      ],
      "Resource": "*"
    }
  ]
}
```

### VPC Permissions

Permissions required for Rancher to create VPC and associated resources.

```json
{
  "Sid": "VPCPermissions",
  "Effect": "Allow",
  "Action": [
     "ec2:ReplaceRoute",
     "ec2:ModifyVpcAttribute",
     "ec2:ModifySubnetAttribute",
     "ec2:DisassociateRouteTable",
     "ec2:DetachInternetGateway",
     "ec2:DescribeVpcs",
     "ec2:DeleteVpc",
     "ec2:DeleteTags",
     "ec2:DeleteSubnet",
     "ec2:DeleteRouteTable",
     "ec2:DeleteRoute",
     "ec2:DeleteInternetGateway",
     "ec2:CreateVpc",
     "ec2:CreateSubnet",
     "ec2:CreateSecurityGroup",
     "ec2:CreateRouteTable",
     "ec2:CreateRoute",
     "ec2:CreateInternetGateway",
     "ec2:AttachInternetGateway",
     "ec2:AssociateRouteTable"
  ],
  "Resource": "*"
}
```


# Syncing

Syncing is the feature that causes Rancher to update its EKS clusters' values so they are up to date with their corresponding cluster object in the EKS console. This enables Rancher to not be the sole owner of an EKS cluster’s state. Its largest limitation is that processing an update from Rancher and another source at the same time or within 5 minutes of one finishing may cause the state from one source to completely overwrite the other.

### How it works

There are two fields on the Rancher Cluster object that must be understood to understand how syncing works:

1. EKSConfig which is located on the Spec of the Cluster.
2. UpstreamSpec which is located on the EKSStatus field on the Status of the Cluster.

Both of which are defined by the struct EKSClusterConfigSpec found in the eks-operator project: https://github.com/rancher/eks-operator/blob/master/pkg/apis/eks.cattle.io/v1/types.go

All fields with the exception of DisplayName, AmazonCredentialSecret, Region, and Imported are nillable on the EKSClusterConfigSpec.

The EKSConfig represents desired state for its non-nil values. Fields that are non-nil in the EKSConfig can be thought of as “managed".When a cluster is created in Rancher, all fields are non-nil and therefore “managed”. When a pre-existing cluster is registered in rancher all nillable fields are nil and are not “managed”. Those fields become managed once their value has been changed by Rancher.

UpstreamSpec represents the cluster as it is in EKS and is refreshed on an interval of 5 minutes. After the UpstreamSpec has been refreshed rancher checks if the EKS cluster has an update in progress. If it is updating, nothing further is done. If it is not currently updating, any “managed” fields on EKSConfig are overwritten with their corresponding value from the recently updated UpstreamSpec.

The effective desired state can be thought of as the UpstreamSpec + all non-nil fields in the EKSConfig. This is what is displayed in the UI.

If Rancher and another source attempt to update an EKS cluster at the same time or within the 5 minute refresh window of an update finishing, then it is likely any “managed” fields can be caught in a race condition. For example, a cluster may have PrivateAccess as a managed field. If PrivateAccess is false and then enabled in EKS console, then finishes at 11:01, and then tags are updated from Rancher before 11:05 the value will likely be overwritten. This would also occur if tags were updated while the cluster was processing the update. If the cluster was registered and the PrivateAccess fields was nil then this issue should not occur in the aforementioned case.

### Configuring the Refresh Interval

It is possible to change the refresh interval through the setting “eks-refresh-cron". This setting accepts values in the Cron format. The default is `*/5 * * * *`. The shorter the refresh window is the less likely any race conditions will occur, but it does increase the likelihood of encountering request limits that may be in place for AWS APIs.
