---
title: Cloud Providers
weight: 2110
---

# Cloud Providers

## RKE and Amazon AWS EC2: Adding Hosts

When setting up a custom cluster configured to run with an AWS cloud provider, any hosts you add to the cluster:

- Must be an AWS EC2 instance.
- Must have the following IAM policy at minimum:

```
{
  "Effect": "Allow",
  "Action": "ec2:Describe*",
  "Resource": "*"
}
```
In order to use Amazon Elastic Load Balancers (ELBs) and EBS with Kubernetes, the host requires the IAM role with appropriate access.

**Example Policy for IAM Role**

```
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
      "Action": ["ec2:*"],
      "Resource": ["*"]
    },
    {
      "Effect": "Allow",
      "Action": ["elasticloadbalancing:*"],
      "Resource": ["*"]
    }
  ]
}
```
