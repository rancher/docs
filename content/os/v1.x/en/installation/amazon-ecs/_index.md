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

Latest Release: [v1.5.4](https://github.com/rancher/os/releases/tag/v1.5.4)

Region | Type | AMI
---|--- | ---
eu-north-1 | HVM - ECS enabled | [ami-0c46c1da6468aa948](https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#launchInstanceWizard:ami=ami-0c46c1da6468aa948)
ap-south-1 | HVM - ECS enabled | [ami-097e5fa868c46e925](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#launchInstanceWizard:ami=ami-097e5fa868c46e925)
eu-west-3 | HVM - ECS enabled | [ami-016e7d630d7f608e4](https://eu-west-3.console.aws.amazon.com/ec2/home?region=eu-west-3#launchInstanceWizard:ami=ami-016e7d630d7f608e4)
eu-west-2 | HVM - ECS enabled | [ami-00aacd261ab72302e](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#launchInstanceWizard:ami=ami-00aacd261ab72302e)
eu-west-1 | HVM - ECS enabled | [ami-0812b3f8aec8d2d81](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#launchInstanceWizard:ami=ami-0812b3f8aec8d2d81)
ap-northeast-2 | HVM - ECS enabled | [ami-0d9d77df6579e618a](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#launchInstanceWizard:ami=ami-0d9d77df6579e618a)
ap-northeast-1 | HVM - ECS enabled | [ami-09e957ac11ef430a3](https://ap-northeast-1.console.aws.amazon.com/ec2/home?region=ap-northeast-1#launchInstanceWizard:ami=ami-09e957ac11ef430a3)
sa-east-1 | HVM - ECS enabled | [ami-09c22f3ce89280ed4](https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#launchInstanceWizard:ami=ami-09c22f3ce89280ed4)
ca-central-1 | HVM - ECS enabled | [ami-016ac80225e649cf9](https://ca-central-1.console.aws.amazon.com/ec2/home?region=ca-central-1#launchInstanceWizard:ami=ami-016ac80225e649cf9)
ap-southeast-1 | HVM - ECS enabled | [ami-06cdfc80bdbd6f419](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#launchInstanceWizard:ami=ami-06cdfc80bdbd6f419)
ap-southeast-2 | HVM - ECS enabled | [ami-0335f7bb1c51c0a74](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#launchInstanceWizard:ami=ami-0335f7bb1c51c0a74)
eu-central-1 | HVM - ECS enabled | [ami-0af71ec7ee8b729be](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#launchInstanceWizard:ami=ami-0af71ec7ee8b729be)
us-east-1 | HVM - ECS enabled | [ami-07209d7ec9e7545b4](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#launchInstanceWizard:ami=ami-07209d7ec9e7545b4)
us-east-2 | HVM - ECS enabled | [ami-046358fe356dd0e35](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#launchInstanceWizard:ami=ami-046358fe356dd0e35)
us-west-1 | HVM - ECS enabled | [ami-031bcb65b47cb0a77](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#launchInstanceWizard:ami=ami-031bcb65b47cb0a77)
us-west-2 | HVM - ECS enabled | [ami-0d92d296ecb13ea45](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#launchInstanceWizard:ami=ami-0d92d296ecb13ea45)
cn-north-1 | HVM - ECS enabled | [ami-04f1668aaf990acf6](https://cn-north-1.console.amazonaws.cn/ec2/home?region=cn-north-1#launchInstanceWizard:ami=ami-04f1668aaf990acf6)
cn-northwest-1 | HVM - ECS enabled | [ami-0771f259ffce58280](https://cn-northwest-1.console.amazonaws.cn/ec2/home?region=cn-northwest-1#launchInstanceWizard:ami=ami-0771f259ffce58280)
