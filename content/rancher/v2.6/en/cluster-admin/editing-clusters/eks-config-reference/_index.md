---
title: EKS Cluster Configuration Reference
shortTitle: EKS Cluster Configuration
weight: 2
---

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
{{% tab "Rancher prior to v2.5" %}}


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



### Configuring the Refresh Interval

{{% tabs %}}
{{% tab "Rancher v2.5.8+" %}}

The `eks-refresh-cron` setting is deprecated. It has been migrated to the `eks-refresh` setting, which is an integer representing seconds.

The default value is 300 seconds.

The syncing interval can be changed by running `kubectl edit setting eks-refresh`.

If the `eks-refresh-cron` setting was previously set, the migration will happen automatically.

The shorter the refresh window, the less likely any race conditions will occur, but it does increase the likelihood of encountering request limits that may be in place for AWS APIs.

{{% /tab %}}
{{% tab "Before v2.5.8" %}}

It is possible to change the refresh interval through the setting `eks-refresh-cron`. This setting accepts values in the Cron format. The default is `*/5 * * * *`. 

The shorter the refresh window, the less likely any race conditions will occur, but it does increase the likelihood of encountering request limits that may be in place for AWS APIs.

{{% /tab %}}
{{% /tabs %}}
