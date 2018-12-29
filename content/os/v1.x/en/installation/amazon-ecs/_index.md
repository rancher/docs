---
title: Amazon ECS (EC2 Container Service)
weight: 190
---

[Amazon ECS](https://aws.amazon.com/ecs/) is supported, which allows RancherOS EC2 instances to join your cluster.

### Pre-Requisites

Prior to launching RancherOS EC2 instances, the [ECS Container Instance IAM Role](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html) will need to have been created. This `ecsInstanceRole` will need to be used when launching EC2 instances. If you have been using ECS, you created this role if you followed the ECS "Get Started" interactive guide.

### Launching an instance with ECS

RancherOS makes it easy to join your ECS cluster. The ECS agent is a [system service]({{< baseurl >}}/os/v1.x/en/installation/system-services/adding-system-services/) that is enabled in the ECS enabled AMI. There may be other RancherOS AMIs that don't have the ECS agent enabled by default, but it can easily be added in the user data on any RancherOS AMI.

When launching the RancherOS AMI, you'll need to specify the **IAM Role** and **Advanced Details** -> **User Data** in the **Configure Instance Details** step.

For the **IAM Role**, you'll need to be sure to select the ECS Container Instance IAM role.

For the **User Data**, you'll need to pass in the [cloud-config]({{< baseurl >}}/os/v1.x/en/installation/configuration/#cloud-config) file.

```yaml
#cloud-config
rancher:
  environment:
    ECS_CLUSTER: your-ecs-cluster-name
    # Note: You will need to add this variable, if using awslogs for ECS task.
    ECS_AVAILABLE_LOGGING_DRIVERS: |-
      ["json-file","awslogs"]
# If you have selected a RancherOS AMI that does not have ECS enabled by default,
# you'll need to enable the system service for the ECS agent.
  services_include:
    amazon-ecs-agent: true
```

#### Version

By default, the ECS agent will be using the `latest` tag for the `amazon-ecs-agent` image. In v0.5.0, we introduced the ability to select which version of the `amazon-ecs-agent`.

To select the version, you can update your [cloud-config]({{< baseurl >}}/os/v1.x/en/installation/configuration/#cloud-config) file.

```yaml
#cloud-config
rancher:
  environment:
    ECS_CLUSTER: your-ecs-cluster-name
    # Note: You will need to make sure to include the colon in front of the version.
    ECS_AGENT_VERSION: :v1.9.0
    # If you have selected a RancherOS AMI that does not have ECS enabled by default,
    # you'll need to enable the system service for the ECS agent.
  services_include:
    amazon-ecs-agent: true
```

<br>

> **Note:** The `:` must be in front of the version tag in order for the ECS image to be tagged correctly.

### Amazon ECS enabled AMIs

Latest Release: [v1.5.0](https://github.com/rancher/os/releases/tag/v1.5.0)

Region | Type | AMI
---|--- | ---
ap-south-1 | HVM - ECS enabled | [ami-01eb05244333f6a61](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#launchInstanceWizard:ami=ami-01eb05244333f6a61)
eu-west-3 | HVM - ECS enabled | [ami-0a55415758e07b870](https://eu-west-3.console.aws.amazon.com/ec2/home?region=eu-west-3#launchInstanceWizard:ami=ami-0a55415758e07b870)
eu-west-2 | HVM - ECS enabled | [ami-04b701ed0e265c04b](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#launchInstanceWizard:ami=ami-04b701ed0e265c04b)
eu-west-1 | HVM - ECS enabled | [ami-07972283f33d5a3fd](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#launchInstanceWizard:ami=ami-07972283f33d5a3fd)
ap-northeast-2 | HVM - ECS enabled | [ami-059ebda385041684e](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#launchInstanceWizard:ami=ami-059ebda385041684e)
ap-northeast-1 | HVM - ECS enabled | [ami-0aef5ef2b3c12bfc4](https://ap-northeast-1.console.aws.amazon.com/ec2/home?region=ap-northeast-1#launchInstanceWizard:ami=ami-0aef5ef2b3c12bfc4)
sa-east-1 | HVM - ECS enabled | [ami-01724913538fe3945](https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#launchInstanceWizard:ami=ami-01724913538fe3945)
ca-central-1 | HVM - ECS enabled | [ami-033ba827e95d4035e](https://ca-central-1.console.aws.amazon.com/ec2/home?region=ca-central-1#launchInstanceWizard:ami=ami-033ba827e95d4035e)
ap-southeast-1 | HVM - ECS enabled | [ami-0f5bdca0bef8dbe65](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#launchInstanceWizard:ami=ami-0f5bdca0bef8dbe65)
ap-southeast-2 | HVM - ECS enabled | [ami-070f925fc40975305](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#launchInstanceWizard:ami=ami-070f925fc40975305)
eu-central-1 | HVM - ECS enabled | [ami-0f464ce37ff4db93e](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#launchInstanceWizard:ami=ami-0f464ce37ff4db93e)
us-east-1 | HVM - ECS enabled | [ami-0084990d1748b1b43](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#launchInstanceWizard:ami=ami-0084990d1748b1b43)
us-east-2 | HVM - ECS enabled | [ami-02105b58a0a892aa0](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#launchInstanceWizard:ami=ami-02105b58a0a892aa0)
us-west-1 | HVM - ECS enabled | [ami-0497f7deea4603717](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#launchInstanceWizard:ami=ami-0497f7deea4603717)
us-west-2 | HVM - ECS enabled | [ami-01181a0ab58f2d7b6](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#launchInstanceWizard:ami=ami-01181a0ab58f2d7b6)
cn-north-1 | HVM - ECS enabled | [ami-03c6806310327b1a8](https://cn-north-1.console.amazonaws.cn/ec2/home?region=cn-north-1#launchInstanceWizard:ami=ami-03c6806310327b1a8)
cn-northwest-1 | HVM - ECS enabled | [ami-0e456544613e0da61](https://cn-northwest-1.console.amazonaws.cn/ec2/home?region=cn-northwest-1#launchInstanceWizard:ami=ami-0e456544613e0da61)
