---
title: AWS Cloud Provider
weight: 251
---

To enable the AWS cloud provider, there are no configuration options. You only need to set the name as `aws`. In order to use the AWS cloud provider, all cluster nodes must have already been configured with an [appropriate IAM role](#iam-requirements) and your AWS resources must be [tagged with a cluster ID](#tagging-amazon-resources).

```yaml
cloud_provider:
    name: aws
```

## IAM Requirements

The nodes used in RKE that will be running the AWS cloud provider must have at least the following IAM policy.

```json
{
  "Effect": "Allow",
  "Action": "ec2:Describe*",
  "Resource": "*"
}
```

In order to use Elastic Load Balancers (ELBs) and EBS with Kubernetes, the node(s) will need to have the an IAM role with appropriate access.

## Example Policy for IAM Role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "ec2:Describe*",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ec2:AttachVolume",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": "ec2:DetachVolume",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["elasticloadbalancing:*"],
      "Resource": ["*"]
    }
  ]
}
```

## Tagging Amazon Resources

Any resources used in a Kubernetes cluster with the Amazon cloud provider must be tagged with a cluster ID.

[Amazon Documentation: Tagging Your Amazon EC2 Resources](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html)

The following resources need to tagged with a `ClusterID`:

- **Nodes**: All hosts added in Rancher.
- **Subnet**: The subnet used for your cluster
- **Security Group**: The security group used for your cluster.

	>**Note:** Do not tag multiple security groups. Tagging multiple groups generates an error when creating Elastic Load Balancer.

The tag that should be used is:

```
Key=kubernetes.io/cluster/<CLUSTERID>, Value=owned
```

`<CLUSTERID>` can be any string you choose. However, the same string must be used on every resource you tag. Setting the tag value to `owned` informs the cluster that all resources tagged with the `<CLUSTERID>` are owned and managed by this cluster.

If you share resources between clusters, you can change the tag to:

```
Key=kubernetes.io/cluster/CLUSTERID, Value=shared
```
