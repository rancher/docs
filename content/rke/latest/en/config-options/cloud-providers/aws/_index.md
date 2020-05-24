---
title: AWS Cloud Provider
weight: 251
---

To enable the AWS cloud provider, there are no RKE configuration options. You only need to set the name as `aws`. In order to use the AWS cloud provider, all cluster nodes must have already been configured with an [appropriate IAM role](#iam-requirements) and your AWS resources must be [tagged with a cluster ID](#tagging-aws-resources).

```yaml
cloud_provider:
    name: aws
```

## IAM Requirements

In a cluster with the AWS cloud provider enabled, nodes must have at least the `ec2:Describe*` action.

In order to use Elastic Load Balancers (ELBs) and EBS volumes with Kubernetes, the node(s) will need to have the an IAM role with appropriate permissions.

IAM policy for nodes with the `controlplane` role:

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

## Tagging AWS Resources

The AWS cloud provider uses tagging to discover and manage resources, the following resources are not automatically tagged by Kubernetes or RKE:

- **VPC**: The VPC used by the cluster
- **Subnet**: The subnets used by the cluster
- **EC2 instances**: All nodes launched for the cluster 
- **Security Groups**: The security group(s) used by nodes in the cluster

  >**Note:** If creating a `LoadBalancer` service and there is more than one security group attached to nodes, you must tag only one of the security groups as `owned` so that Kubernetes knows which group to add and remove rules. A single untagged security group is allowed, however, sharing this between clusters is not recommended.

[AWS Documentation: Tagging Your Amazon EC2 Resources](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html)

You must tag with one of the following:

| Key | Value |
|---|---|
| kubernetes.io/cluster/`<CLUSTERID>` | shared |

`<CLUSTERID>` can be any string you choose. However, the same string must be used on every resource you tag. Setting the tag value to `owned` informs the cluster that all resources tagged with the `<CLUSTERID>` are owned and managed by this cluster only.

If you do not share resources between clusters, you can change the tag to:

| Key | Value |
|---|---|
| kubernetes.io/cluster/`<CLUSTERID>` | owned |

## Tagging for Load Balancers

When provisioning a `LoadBalancer` service Kubernetes will attempt to discover the correct subnets, this is also achieved by tags and requires adding additional subnet tags to ensure internet-facing and internal ELBs are created in the correct subnets.

[AWS Documentation: Subnet tagging for load balancers](https://docs.aws.amazon.com/eks/latest/userguide/load-balancing.html#subnet-tagging-for-load-balancers)
