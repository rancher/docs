---
title: EC2 Node Template Configuration
weight: 1
---

For more details about EC2, nodes, refer to the official documentation for the [EC2 Management Console](https://aws.amazon.com/ec2). 
### Region

In the **Region** field, select the same region that you used when creating your cloud credentials.

### Cloud Credentials

Your AWS account access information, stored in a [cloud credential.](../../../user-settings/manage-cloud-credentials.md) 

See [Amazon Documentation: Creating Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) how to create an Access Key and Secret Key.

See [Amazon Documentation: Creating IAM Policies (Console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html#access_policies_create-start) how to create an IAM policy.

See [Amazon Documentation: Adding Permissions to a User (Console)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-add-console) how to attach an IAM 

See our three example JSON policies:

- [Example IAM Policy](../../../../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/launch-kubernetes-with-rancher/use-new-nodes-in-an-infra-provider/create-an-amazon-ec2-cluster.md#example-iam-policy)
- [Example IAM Policy with PassRole](../../../../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/launch-kubernetes-with-rancher/use-new-nodes-in-an-infra-provider/create-an-amazon-ec2-cluster.md#example-iam-policy-with-passrole) (needed if you want to use [Kubernetes Cloud Provider](../../../../pages-for-subheaders/set-up-cloud-providers.md) or want to pass an IAM Profile to an instance)
- [Example IAM Policy to allow encrypted EBS volumes](../../../../how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/launch-kubernetes-with-rancher/use-new-nodes-in-an-infra-provider/create-an-amazon-ec2-cluster.md#example-iam-policy-to-allow-encrypted-ebs-volumes) policy to an user.

### Authenticate & Configure Nodes

Choose an availability zone and network settings for your cluster. 

### Security Group

Choose the default security group or configure a security group.

Please refer to [Amazon EC2 security group when using Node Driver](../../../../getting-started/installation-and-upgrade/installation-requirements/port-requirements.md#rancher-aws-ec2-security-group) to see what rules are created in the `rancher-nodes` Security Group.

---
**_New in v2.6.4_**

If you provide your own security group for an EC2 instance, please note that Rancher will not modify it. As such, you will be responsible for ensuring that your security group is set to allow the [necessary ports for Rancher to provision the instance](../../../../getting-started/installation-and-upgrade/installation-requirements/port-requirements.md#ports-for-rancher-server-nodes-on-rke). For more information on controlling inbound and outbound traffic to EC2 instances with security groups, refer [here](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#WorkingWithSecurityGroups).

### Instance Options

Configure the instances that will be created. Make sure you configure the correct **SSH User** for the configured AMI. It is possible that a selected region does not support the default instance type. In this scenario you must select an instance type that does exist, otherwise an error will occur stating the requested configuration is not supported.

If you need to pass an **IAM Instance Profile Name** (not ARN), for example, when you want to use a [Kubernetes Cloud Provider](../../../../pages-for-subheaders/set-up-cloud-providers.md), you will need an additional permission in your policy. See [Example IAM policy with PassRole](#example-iam-policy-with-passrole) for an example policy.

### Engine Options

In the **Engine Options** section of the node template, you can configure the Docker daemon. You may want to specify the docker version or a Docker registry mirror.
