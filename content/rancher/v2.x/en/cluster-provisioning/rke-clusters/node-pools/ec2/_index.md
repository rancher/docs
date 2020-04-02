---
title: Creating an Amazon EC2 Cluster
shortTitle: Amazon EC2
description: Learn the prerequisites and steps required in order for you to create an Amazon EC2 cluster using Rancher
weight: 2210
---
Use Rancher to create a Kubernetes cluster in Amazon EC2.

### Prerequisites

- **AWS EC2 Access Key and Secret Key** that will be used to create the instances. See [Amazon Documentation: Creating Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) how to create an Access Key and Secret Key.
- **IAM Policy created** to add to the user of the Access Key And Secret Key. See [Amazon Documentation: Creating IAM Policies (Console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html#access_policies_create-start) how to create an IAM policy. See our three example JSON policies below:
  - [Example IAM Policy](#example-iam-policy)
  - [Example IAM Policy with PassRole](#example-iam-policy-with-passrole) (needed if you want to use [Kubernetes Cloud Provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers) or want to pass an IAM Profile to an instance)
  - [Example IAM Policy to allow encrypted EBS volumes](#example-iam-policy-to-allow-encrypted-ebs-volumes)
- **IAM Policy added as Permission** to the user. See [Amazon Documentation: Adding Permissions to a User (Console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console) how to attach it to an user.

# Creating an EC2 Cluster

The steps to create a cluster differ based on your Rancher version.

{{% tabs %}}
{{% tab "Rancher v2.2.0+" %}}

1. [Create your cloud credentials](#1-create-your-cloud-credentials)
2. [Create a node template with your cloud credentials and information from EC2](#2-create-a-node-template-with-your-cloud-credentials-and-information-from-ec2)
3. [Create a cluster with node pools using the node template](#3-create-a-cluster-with-node-pools-using-the-node-template)

### 1. Create your cloud credentials

1. In the Rancher UI, click the user profile button in the upper right corner, and click **Cloud Credentials.**
1. Click **Add Cloud Credential.**
1. Enter a name for the cloud credential.
1. In the **Cloud Credential Type** field, select **Amazon.**
1. In the **Region** field, select the AWS region where your cluster nodes will be located.
1. Enter your AWS EC2 **Access Key** and **Secret Key.**
1. Click **Create.**

**Result:** You have created the cloud credentials that will be used to provision nodes in your cluster. You can reuse these credentials for other node templates, or in other clusters. 

### 2. Create a node template with your cloud credentials and information from EC2
Complete each of the following forms using information available from the [EC2 Management Console](https://aws.amazon.com/ec2).

1. In the Rancher UI, click the user profile button in the upper right corner, and click **Node Templates.**
1. Click **Add Template.**
1. In the **Region** field, select the same region that you used when creating your cloud credentials.
1. In the **Cloud Credentials** field, select your newly created cloud credentials.
1. Click **Next: Authenticate & configure nodes.**
1. Choose an availability zone and network settings for your cluster. Click **Next: Select a Security Group.**
1. Choose the default security group or configure a security group. Please refer to [Amazon EC2 security group when using Node Driver]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/node-requirements/#security-group-for-nodes-on-aws-ec2) to see what rules are created in the `rancher-nodes` Security Group. Then click **Next: Set Instance options.**
1. Configure the instances that will be created. Make sure you configure the correct **SSH User** for the configured AMI.

> If you need to pass an <b>IAM Instance Profile Name</b> (not ARN), for example, when you want to use a [Kubernetes Cloud Provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers), you will need an additional permission in your policy. See [Example IAM policy with PassRole](#example-iam-policy-with-passrole) for an example policy.

Optional: In the **Engine Options** section of the node template, you can configure the Docker daemon. You may want to specify the docker version or a Docker registry mirror.

### 3. Create a cluster with node pools using the node template

{{< step_create-cluster_node-pools >}}

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Amazon EC2**.

1. Enter a **Cluster Name**.

1. Create a node pool for each Kubernetes role. For each node pool, choose a node template that you created.

1. Click **Add Member** to add users that can access the cluster.

1. Use the **Role** drop-down to set permissions for each user.

1. Use **Cluster Options** to choose the version of Kubernetes, what network provider will be used and if you want to enable project network isolation. Refer to [Selecting Cloud Providers]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) to configure the Kubernetes Cloud Provider.

1. Click **Create**.

{{< result_create-cluster >}}
{{% /tab %}}
{{% tab "Rancher prior to v2.2.0+" %}}

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Amazon EC2**.

1. Enter a **Cluster Name**.

1. {{< step_create-cluster_member-roles >}}

1. {{< step_create-cluster_cluster-options >}}Refer to [Selecting Cloud Providers]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) to configure the Kubernetes Cloud Provider.

1. {{< step_create-cluster_node-pools >}}

  1. Click **Add Node Template**.

  1. Complete each of the following forms using information available from the [EC2 Management Console](https://aws.amazon.com/ec2).

	- **Account Access** is where you configure the region of the nodes, and the credentials (Access Key and Secret Key) used to create the machine. See [Prerequisites](#prerequisites) how to create the Access Key and Secret Key and the needed permissions.
	- **Zone and Network** configures the availability zone and network settings for your cluster.
	- **Security Groups** creates or configures the Security Groups applied to your nodes. Please refer to [Amazon EC2 security group when using Node Driver]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/node-requirements/#security-group-for-nodes-on-aws-ec2) to see what rules are created in the `rancher-nodes` Security Group.
	- **Instance** configures the instances that will be created. Make sure you configure the correct **SSH User** for the configured AMI.
<br><br>
	If you need to pass an **IAM Instance Profile Name** (not ARN), for example, when you want to use a [Kubernetes Cloud Provider]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers), you will need an additional permission in your policy. See [Example IAM policy with PassRole](#example-iam-policy-with-passrole) for an example policy.

1. {{< step_rancher-template >}}
1. Click **Create**.
1. **Optional:** Add additional node pools.
1. Review your cluster settings to confirm they are correct. Then click **Create**.

{{< result_create-cluster >}}
{{% /tab %}}
{{% /tabs %}}

### Optional Next Steps

After creating your cluster, you can access it through the Rancher UI. As a best practice, we recommend setting up these alternate ways of accessing your cluster:

- **Access your cluster with the kubectl CLI:** Follow [these steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/cluster-access/kubectl/#accessing-clusters-with-kubectl-on-your-workstation) to access clusters with kubectl on your workstation. In this case, you will be authenticated through the Rancher server’s authentication proxy, then Rancher will connect you to the downstream cluster. This method lets you manage the cluster without the Rancher UI.
- **Access your cluster with the kubectl CLI, using the authorized cluster endpoint:** Follow [these steps]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/cluster-access/kubectl/#authenticating-directly-with-a-downstream-cluster) to access your cluster with kubectl directly, without authenticating through Rancher. We recommend setting up this alternative method to access your cluster so that in case you can’t connect to Rancher, you can still access the cluster.

### Example IAM Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:Describe*",
                "ec2:ImportKeyPair",
                "ec2:CreateKeyPair",
                "ec2:CreateSecurityGroup",
                "ec2:CreateTags",
                "ec2:DeleteKeyPair"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "ec2:RunInstances"
            ],
            "Resource": [
                "arn:aws:ec2:REGION::image/ami-*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:instance/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:placement-group/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:volume/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:subnet/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:key-pair/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:network-interface/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:security-group/*"
            ]
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": [
                "ec2:RebootInstances",
                "ec2:TerminateInstances",
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:instance/*"
        }
    ]
}
```

### Example IAM Policy with PassRole

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:Describe*",
                "ec2:ImportKeyPair",
                "ec2:CreateKeyPair",
                "ec2:CreateSecurityGroup",
                "ec2:CreateTags",
                "ec2:DeleteKeyPair"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "ec2:RunInstances"
            ],
            "Resource": [
                "arn:aws:ec2:REGION::image/ami-*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:instance/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:placement-group/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:volume/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:subnet/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:key-pair/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:network-interface/*",
                "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:security-group/*",
                "arn:aws:iam::AWS_ACCOUNT_ID:role/YOUR_ROLE_NAME"
            ]
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": [
                "ec2:RebootInstances",
                "ec2:TerminateInstances",
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:instance/*"
        }
    ]
}
```
### Example IAM Policy to allow encrypted EBS volumes
``` json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "kms:Decrypt",
        "kms:GenerateDataKeyWithoutPlaintext",
        "kms:Encrypt",
        "kms:DescribeKey",
        "kms:CreateGrant",
        "ec2:DetachVolume",
        "ec2:AttachVolume",
        "ec2:DeleteSnapshot",
        "ec2:DeleteTags",
        "ec2:CreateTags",
        "ec2:CreateVolume",
        "ec2:DeleteVolume",
        "ec2:CreateSnapshot"
      ],
      "Resource": [
        "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:volume/*",
        "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:instance/*",
        "arn:aws:ec2:REGION:AWS_ACCOUNT_ID:snapshot/*",
        "arn:aws:kms:REGION:AWS_ACCOUNT_ID:key/KMS_KEY_ID"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:DescribeSnapshots"
      ],
      "Resource": "*"
    }
  ]
}
```
