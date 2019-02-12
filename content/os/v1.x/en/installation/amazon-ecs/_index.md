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

Latest Release: [v1.5.1](https://github.com/rancher/os/releases/tag/v1.5.1)

Region | Type | AMI
---|--- | ---
eu-north-1 | HVM - ECS enabled | [ami-064549188a66e7ea6](https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#launchInstanceWizard:ami=ami-064549188a66e7ea6)
ap-south-1 | HVM - ECS enabled | [ami-08595b2533a6195d2](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#launchInstanceWizard:ami=ami-08595b2533a6195d2)
eu-west-3 | HVM - ECS enabled | [ami-0e3cd3d86a637b352](https://eu-west-3.console.aws.amazon.com/ec2/home?region=eu-west-3#launchInstanceWizard:ami=ami-0e3cd3d86a637b352)
eu-west-2 | HVM - ECS enabled | [ami-0f6ad4f7e408e1069](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#launchInstanceWizard:ami=ami-0f6ad4f7e408e1069)
eu-west-1 | HVM - ECS enabled | [ami-0d8dae1cc019e6cef](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#launchInstanceWizard:ami=ami-0d8dae1cc019e6cef)
ap-northeast-2 | HVM - ECS enabled | [ami-0c1f5bad8bbc0b6b2](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#launchInstanceWizard:ami=ami-0c1f5bad8bbc0b6b2)
ap-northeast-1 | HVM - ECS enabled | [ami-0e47cb2a4e9efb985](https://ap-northeast-1.console.aws.amazon.com/ec2/home?region=ap-northeast-1#launchInstanceWizard:ami=ami-0e47cb2a4e9efb985)
sa-east-1 | HVM - ECS enabled | [ami-0e7f3fa6d7434b64c](https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#launchInstanceWizard:ami=ami-0e7f3fa6d7434b64c)
ca-central-1 | HVM - ECS enabled | [ami-0b004e903b48ed9a0](https://ca-central-1.console.aws.amazon.com/ec2/home?region=ca-central-1#launchInstanceWizard:ami=ami-0b004e903b48ed9a0)
ap-southeast-1 | HVM - ECS enabled | [ami-05235fc0bc8051a45](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#launchInstanceWizard:ami=ami-05235fc0bc8051a45)
ap-southeast-2 | HVM - ECS enabled | [ami-057db347305e01f91](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#launchInstanceWizard:ami=ami-057db347305e01f91)
eu-central-1 | HVM - ECS enabled | [ami-01bd38e3433481d8b](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#launchInstanceWizard:ami=ami-01bd38e3433481d8b)
us-east-1 | HVM - ECS enabled | [ami-029bd9bf2b4521072](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#launchInstanceWizard:ami=ami-029bd9bf2b4521072)
us-east-2 | HVM - ECS enabled | [ami-06cc66eb6efe0dc0d](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#launchInstanceWizard:ami=ami-06cc66eb6efe0dc0d)
us-west-1 | HVM - ECS enabled | [ami-050723009f13ccdd5](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#launchInstanceWizard:ami=ami-050723009f13ccdd5)
us-west-2 | HVM - ECS enabled | [ami-0e85f0edaeed888f1](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#launchInstanceWizard:ami=ami-0e85f0edaeed888f1)
cn-north-1 | HVM - ECS enabled | [ami-0c0fca27431002bc6](https://cn-north-1.console.amazonaws.cn/ec2/home?region=cn-north-1#launchInstanceWizard:ami=ami-0c0fca27431002bc6)
cn-northwest-1 | HVM - ECS enabled | [ami-067c78822a0314717](https://cn-northwest-1.console.amazonaws.cn/ec2/home?region=cn-northwest-1#launchInstanceWizard:ami=ami-067c78822a0314717)
