---
title: EC2 Machine Configuration Reference
weight: 2
---

For more details about EC2 nodes, refer to the official documentation for the [EC2 Management Console](https://aws.amazon.com/ec2).

### Region

The geographical [region](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html) in which to build your cluster.

### Zone

The [zone](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-availability-zones), an isolated location within a region to build your cluster

### Instance Type

The [instance type](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html), which determines the hardware characteristics, used to provision your cluster.

### Root Disk Size

Configure the size (in GB) for your [root device](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/RootDeviceStorage.html).

### VPC/Subnet

The [VPC](https://docs.aws.amazon.com/vpc/latest/userguide/configure-your-vpc.html) or specific [subnet](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html), an IP range in your VPC, to add your resources to.

### IAM Instance Profile Name

The name of the [instance profile] used to pass an IAM role to an EC2 instance.

## Advanced Options

### AMI ID

The [Amazon Machine Image](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) used for the nodes in your cluster.

### SSH Username for AMI

The username for connecting to your launched instances. Refer to [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connection-prereqs.html) for the default usernames to selected AMIs. For AMIs not listed, check with the AMI provider.

### Security Group

Choose the default security group or configure a security group.

Please refer to [Amazon EC2 security group when using Node Driver]({{<baseurl>}}/rancher/v2.6/en/installation/requirements/ports/#rancher-aws-ec2-security-group) to see what rules are created in the `rancher-nodes` Security Group.

### EBS Root Volume Type

The [EBS volume type](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html) to use for the root device.

### Encrypt EBS Volume

Enable [Amazon EBS Encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html).

### Request Spot Instance

Enable option to [request spot instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-requests.html) and specify the maximum instance price per hour you're willing to pay.

### Use only private address

Enable option on use only [private addresses](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html).

### EBS-Optimized Instance

Use an [EBS-optimized instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html).

### Allow access to EC2 metadata

Enable access to [EC2 metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html).

### Use tokens for metadata

Use [Instance Metadata Service Version 2 (IMDSv2)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html), a token-based method to access metadata.

### Add Tag

Add metadata using [tags](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html) to categorize resources.

