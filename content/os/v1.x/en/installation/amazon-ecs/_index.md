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
eu-north-1 | HVM - ECS enabled | [ami-0d0ea423c99b99528](https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#launchInstanceWizard:ami=ami-0d0ea423c99b99528)
ap-south-1 | HVM - ECS enabled | [ami-026d573feb2b40494](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#launchInstanceWizard:ami=ami-026d573feb2b40494)
eu-west-3 | HVM - ECS enabled | [ami-0b00515ac5791981a](https://eu-west-3.console.aws.amazon.com/ec2/home?region=eu-west-3#launchInstanceWizard:ami=ami-0b00515ac5791981a)
eu-west-2 | HVM - ECS enabled | [ami-017c58d5ed26b91f4](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#launchInstanceWizard:ami=ami-017c58d5ed26b91f4)
eu-west-1 | HVM - ECS enabled | [ami-00863d13761ef3724](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#launchInstanceWizard:ami=ami-00863d13761ef3724)
ap-northeast-2 | HVM - ECS enabled | [ami-04e09c2c9c4b59d54](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#launchInstanceWizard:ami=ami-04e09c2c9c4b59d54)
ap-northeast-1 | HVM - ECS enabled | [ami-0e5d74499b8bd1119](https://ap-northeast-1.console.aws.amazon.com/ec2/home?region=ap-northeast-1#launchInstanceWizard:ami=ami-0e5d74499b8bd1119)
sa-east-1 | HVM - ECS enabled | [ami-033aa9f2a4ea1c2ab](https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#launchInstanceWizard:ami=ami-033aa9f2a4ea1c2ab)
ca-central-1 | HVM - ECS enabled | [ami-0002d992ae120cc94](https://ca-central-1.console.aws.amazon.com/ec2/home?region=ca-central-1#launchInstanceWizard:ami=ami-0002d992ae120cc94)
ap-southeast-1 | HVM - ECS enabled | [ami-0524bbc4fb51f2190](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#launchInstanceWizard:ami=ami-0524bbc4fb51f2190)
ap-southeast-2 | HVM - ECS enabled | [ami-09be0a7f78760ed49](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#launchInstanceWizard:ami=ami-09be0a7f78760ed49)
eu-central-1 | HVM - ECS enabled | [ami-08b437124d5650e75](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#launchInstanceWizard:ami=ami-08b437124d5650e75)
us-east-1 | HVM - ECS enabled | [ami-047c2cc8ce83362d5](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#launchInstanceWizard:ami=ami-047c2cc8ce83362d5)
us-east-2 | HVM - ECS enabled | [ami-022fc798437fb846a](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#launchInstanceWizard:ami=ami-022fc798437fb846a)
us-west-1 | HVM - ECS enabled | [ami-00d236646389e14d0](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#launchInstanceWizard:ami=ami-00d236646389e14d0)
us-west-2 | HVM - ECS enabled | [ami-0c12fa819f3adc03d](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#launchInstanceWizard:ami=ami-0c12fa819f3adc03d)
cn-north-1 | HVM - ECS enabled | [ami-092d12a2396dc0822](https://cn-north-1.console.amazonaws.cn/ec2/home?region=cn-north-1#launchInstanceWizard:ami=ami-092d12a2396dc0822)
cn-northwest-1 | HVM - ECS enabled | [ami-0d63e8f32b5873368](https://cn-northwest-1.console.amazonaws.cn/ec2/home?region=cn-northwest-1#launchInstanceWizard:ami=ami-0d63e8f32b5873368)
