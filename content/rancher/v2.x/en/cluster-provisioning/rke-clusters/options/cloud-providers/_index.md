---
title: Selecting Cloud Providers
weight: 2255
aliases:
  - /rancher/v2.x/en/concepts/clusters/cloud-providers/
---
A _cloud provider_ is a module in Kubernetes that provides an interface for managing nodes, load balancers, and networking routes. You can configure a cloud provider to automatically provision load balancers or persistent storage devices when launching Kubernetes definitions, provided that the cloud provider you're using supports such automation.

By default, the **Cloud Provider** option is set to `None`. Supported cloud providers are:

* [Amazon](#amazon)
* [Azure](#azure)

The `Custom` cloud provider is available if you want to configure any [Kubernetes cloud provider](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/).

For the custom cloud provider option, you can refer to the [RKE docs]({{< baseurl >}}/rke/latest/en/config-options/cloud-providers/) on how to edit the yaml file for your specific cloud provider. There are specific cloud providers that have more detailed configuration :

* [vSphere]({{< baseurl >}}/rke/latest/en/config-options/cloud-providers/vsphere/)
* [Openstack]({{< baseurl >}}/rke/latest/en/config-options/cloud-providers/openstack/)

> **Warning:** Your cluster will not provision correctly if you configure a cloud provider cluster of nodes that do not meet the prerequisites. Prerequisites for supported cloud providers are listed below.

## Amazon

When using the `Amazon` cloud provider, you can leverage the following capabilities:

- **Load Balancers:** Launches an AWS Elastic Load Balancer (ELB) when choosing `Layer-4 Load Balancer` in **Port Mapping** or when launching a `Service` with `type: LoadBalancer`.
- **Persistent Volumes**: Allows you to use AWS Elastic Block Stores (EBS) for persistent volumes.

See [cloud-provider-aws README](https://github.com/kubernetes/cloud-provider-aws/blob/master/README.md) for all information regarding the Amazon cloud provider.

### Prerequisites

- Create an IAM role and attach to the instances
- Configuring the ClusterID

> **Note:** When you create an [Amazon EC2 Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/ec2/#create-the-amazon-ec2-cluster), the `ClusterID` is automatically configured for the created nodes. Other resources still need to be tagged manually.

#### Create an IAM Role and attach to the instances

All nodes added to the cluster must be able to interact with EC2 so that they can create and remove resources. You can enable this interaction by using an IAM role attached to the instance. See [Amazon documentation: Creating an IAM Role](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#create-iam-role) how to create an IAM role. There are two example policies:

* The first policy is for the nodes with the `controlplane` role. These nodes have to be able to create/remove EC2 resources. The following IAM policy is an example, please remove any unneeded permissions for your use case.
* The second policy is for the nodes with the `etcd` or `worker` role. These nodes only have to be able to retrieve information from EC2.

IAM Policy for nodes with the `controlplane` role:

```json
{
"Version": "2012-10-17",
"Statement": [
  {
    "Effect": "Allow",
    "Action": [
      "autoscaling:DescribeAutoScalingGroups",
      "autoscaling:DescribeLaunchConfigurations",
      "autoscaling:DescribeTags",
      "ec2:DescribeInstances",
      "ec2:DescribeRegions",
      "ec2:DescribeRouteTables",
      "ec2:DescribeSecurityGroups",
      "ec2:DescribeSubnets",
      "ec2:DescribeVolumes",
      "ec2:CreateSecurityGroup",
      "ec2:CreateTags",
      "ec2:CreateVolume",
      "ec2:ModifyInstanceAttribute",
      "ec2:ModifyVolume",
      "ec2:AttachVolume",
      "ec2:AuthorizeSecurityGroupIngress",
      "ec2:CreateRoute",
      "ec2:DeleteRoute",
      "ec2:DeleteSecurityGroup",
      "ec2:DeleteVolume",
      "ec2:DetachVolume",
      "ec2:RevokeSecurityGroupIngress",
      "ec2:DescribeVpcs",
      "elasticloadbalancing:AddTags",
      "elasticloadbalancing:AttachLoadBalancerToSubnets",
      "elasticloadbalancing:ApplySecurityGroupsToLoadBalancer",
      "elasticloadbalancing:CreateLoadBalancer",
      "elasticloadbalancing:CreateLoadBalancerPolicy",
      "elasticloadbalancing:CreateLoadBalancerListeners",
      "elasticloadbalancing:ConfigureHealthCheck",
      "elasticloadbalancing:DeleteLoadBalancer",
      "elasticloadbalancing:DeleteLoadBalancerListeners",
      "elasticloadbalancing:DescribeLoadBalancers",
      "elasticloadbalancing:DescribeLoadBalancerAttributes",
      "elasticloadbalancing:DetachLoadBalancerFromSubnets",
      "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
      "elasticloadbalancing:ModifyLoadBalancerAttributes",
      "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
      "elasticloadbalancing:SetLoadBalancerPoliciesForBackendServer",
      "elasticloadbalancing:AddTags",
      "elasticloadbalancing:CreateListener",
      "elasticloadbalancing:CreateTargetGroup",
      "elasticloadbalancing:DeleteListener",
      "elasticloadbalancing:DeleteTargetGroup",
      "elasticloadbalancing:DescribeListeners",
      "elasticloadbalancing:DescribeLoadBalancerPolicies",
      "elasticloadbalancing:DescribeTargetGroups",
      "elasticloadbalancing:DescribeTargetHealth",
      "elasticloadbalancing:ModifyListener",
      "elasticloadbalancing:ModifyTargetGroup",
      "elasticloadbalancing:RegisterTargets",
      "elasticloadbalancing:SetLoadBalancerPoliciesOfListener",
      "iam:CreateServiceLinkedRole",
      "kms:DescribeKey"
    ],
    "Resource": [
      "*"
    ]
  }
]
}
```

IAM policy for nodes with the `etcd` or `worker` role:

```json
{
"Version": "2012-10-17",
"Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "ec2:DescribeInstances",
            "ec2:DescribeRegions",
            "ecr:GetAuthorizationToken",
            "ecr:BatchCheckLayerAvailability",
            "ecr:GetDownloadUrlForLayer",
            "ecr:GetRepositoryPolicy",
            "ecr:DescribeRepositories",
            "ecr:ListImages",
            "ecr:BatchGetImage"
        ],
        "Resource": "*"
    }
]
}
```

- While creating an [Amazon EC2 cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/ec2/#create-the-amazon-ec2-cluster), you must fill in the **IAM Instance Profile Name** (not ARN) of the created IAM role when creating the **Node Template**.
- While creating a [Custom cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/custom-clusters/), you must manually attach the IAM role to the instance(s).

#### Configuring the ClusterID

The following resources need to tagged with a `ClusterID`:

- **Nodes**: All hosts added in Rancher.
- **Subnet**: The subnet used for your cluster.
- **Security Group**: The security group used for your cluster.

>**Note:** Do not tag multiple security groups. Tagging multiple groups generates an error when creating an Elastic Load Balancer (ELB).

Use the following tag:

**Key** = `kubernetes.io/cluster/CLUSTERID` **Value** = `owned`

`CLUSTERID` can be any string you like, as long as it is equal across all tags set.

Setting the value of the tag to `owned` tells the cluster that all resources with this tag are owned and managed by this cluster. If you share resources between clusters, you can change the tag to:

**Key** = `kubernetes.io/cluster/CLUSTERID` **Value** = `shared`.

## Azure

When using the `Azure` cloud provider, you can leverage the following capabilities:

- **Load Balancers:** Launches an Azure Load Balancer within a specific Network Security Group.

- **Persistent Volumes:** Supports using Azure Blob disks and Azure Managed Disks with standard and premium storage accounts.

- **Network Storage:** Support Azure Files via CIFS mounts.

### Known Limitations Regarding Azure Subscriptions

The following account types are not supported for Azure Subscriptions:

- Single tenant accounts (i.e. accounts with no subscriptions).
- Multi-subscription accounts.

### Prerequisites

* Configure the credentials

#### Configure the credentials

The following credentials need to be configured:

* **Azure Tenant ID (tenantID)**

Visit [Azure portal](https://portal.azure.com), login and go to **Azure Active Directory** and select **Properties**. Your **Directory ID** is your **Tenant ID**.

If you want to use the Azure CLI, you can run the command `az account show` to get the information.

* **Azure Client ID (aadClientId) and Azure Client Secret (aadClientSecret)**

Visit [Azure portal](https://portal.azure.com), login and follow the steps below to create an **App Registration** and the corresponding **Azure Client ID** and **Azure Client Secret**.

1. Select **Azure Active Directory**.
1. Select **App registrations**.
1. Select **New application registration**.
1. Choose a **Name**, select `Web app / API` as **Application Type** and a **Sign-on URL** which can be anything in this case.
1. Select **Create**.

In the **App registrations** view, you should see your created App registration. The value shown in the column **APPLICATION ID** is what you need to use as **Azure Client ID**.

The next step is to generate the **Azure Client Secret**:

1. Open your created App registration.
1. In the **Settings** view, open **Keys**.
1. Enter a **Key description**, select an expiration time and select **Save**.
1. The generated value shown in the column **Value** is what you need to use as **Azure Client Secret**. This value will only be shown once.

Last thing you will need to do, is assign the appropriate permissions to your App registration.

1. Go to **More services**, search for **Subscriptions** and open it.
1. Open **Access control (IAM)**.
1. Select **Add**.
1. For **Role**, select `Contributor`.
1. For **Select**, select your created App registration name.
1. Select **Save**.


* **Azure Network Security Group Name (securityGroupName)**

Custom Azure Network Security Group needed to allow Azure Load Balancers to work. If you provision hosts using Rancher Machine Azure driver, you will need to edit them manually to assign them to this Network Security Group. You should already assign custom hosts to this Network Security Group during provisioning.

Only hosts expected to be Load Balancer backends need to be in this group.

## Related Links

### External Links

- [Cloud Providers](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/)
