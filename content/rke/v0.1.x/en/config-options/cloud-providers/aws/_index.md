---
title: AWS Cloud Provider
weight: 251
---

To enable the AWS cloud provider, there are no configuration options. You only need to set the name as `aws`. In order to use the AWS cloud provider, all cluster nodes must have already been configured with an appropriate IAM role.

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
