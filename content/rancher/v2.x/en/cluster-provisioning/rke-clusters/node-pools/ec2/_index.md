---
title: Creating an Amazon EC2 Cluster
shortTitle: Amazon EC2
weight: 2210
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-amazon-ec2/
---
Use {{< product >}} to create a Kubernetes cluster in Amazon EC2.

## Prerequisites

- AWS EC2 Access Key and Secret key that will be used to create the instances. See [Amazon Documentation: Creating Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) how to create an Access Key and Secret Key.
- IAM Policy created to add to the user of the Access Key And Secret Key. See [Amazon Documentation: Creating IAM Policies (Console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html#access_policies_create-start) how to create an IAM policy. See our two example JSON policies below:
  - [Example IAM Policy](#example-iam-policy)
  - [Example IAM Policy with PassRole](#example-iam-policy-with-passrole) (needed if you want to use [Kubernetes Cloud Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers) or want to pass an IAM Profile to an instance)
- IAM Policy added as Permission to the user. See [Amazon Documentation: Adding Permissions to a User (Console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console) how to attach it to an user.
- If you want to reuse a node from a previous Rancher Launched Kubernetes cluster, [clean the node]({{< baseurl >}}/rancher/v2.x/en/admin-settings/removing-rancher/rancher-cluster-nodes/) before using it in a cluster again. If you reuse a node that hasn't been cleaned, cluster provisioning may fail.

## Create the cluster

1. From the **Clusters** page, click **Add Cluster**.
1. Choose **Amazon EC2**.
1. Enter a **Cluster Name**.
1. {{< step_create-cluster_member-roles >}}
1. {{< step_create-cluster_cluster-options >}}Refer to [Selecting Cloud Providers]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers/) to configure the Kubernetes Cloud Provider.</p></div>
1. {{< step_create-cluster_node-pools >}}
1. Click **Add Node Template**.


      Complete each of the following forms using information available from the [EC2 Management Console](https://aws.amazon.com/ec2).

      * **Account Access** is where you configure the region of the nodes, and the credentials (Access Key and Secret Key) used to create the machine. See [Prerequisistes](#prerequisistes) how to create the Access Key and Secret Key and the needed permissions.

	- **Zone and Network** configures the availability zone and network settings for your cluster.
    - **Security Groups** creates or configures the Security Groups applied to your nodes. Please refer to [Amazon EC2 security group when using Node Driver]({{< baseurl >}}/rancher/v2.x/en/installation/references/#amazonec2-securitygroup-nodedriver) to see what rules are created in the `rancher-nodes` Security Group.
    - **Instance** configures the instances that will be created. Make sure you configure the correct **SSH User** for the configured AMI.

    If you need to pass an **IAM Instance Profile Name** (not ARN), for example, when you want to use a [Kubernetes Cloud Provider]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/options/cloud-providers), you will need an additional permission in your policy. See [Example IAM policy with PassRole](#example-iam-policy-with-passrole) for an example policy.

	1. {{< step_rancher-template >}}
	1. Click **Create**.
	1. **Optional:** Add additional node pools.
1. Review your cluster settings to confirm they are correct. Then click **Create**.

{{< result_create-cluster >}}

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
                "arn:aws:iam::AWS_ACCOUNT_ID:role/your-role-name"
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
