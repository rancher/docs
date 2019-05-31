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

Latest Release: [v1.5.2](https://github.com/rancher/os/releases/tag/v1.5.2)

Region | Type | AMI
---|--- | ---
eu-north-1 | HVM - ECS enabled | [ami-0888272f6e3d16d05](https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#launchInstanceWizard:ami=ami-0888272f6e3d16d05)
ap-south-1 | HVM - ECS enabled | [ami-0f433c1f17388f74a](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#launchInstanceWizard:ami=ami-0f433c1f17388f74a)
eu-west-3 | HVM - ECS enabled | [ami-0bde97d3226fb3780](https://eu-west-3.console.aws.amazon.com/ec2/home?region=eu-west-3#launchInstanceWizard:ami=ami-0bde97d3226fb3780)
eu-west-2 | HVM - ECS enabled | [ami-0871c68685772846c](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#launchInstanceWizard:ami=ami-0871c68685772846c)
eu-west-1 | HVM - ECS enabled | [ami-0007e2490a3edba1d](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#launchInstanceWizard:ami=ami-0007e2490a3edba1d)
ap-northeast-2 | HVM - ECS enabled | [ami-001432bab43108869](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#launchInstanceWizard:ami=ami-001432bab43108869)
ap-northeast-1 | HVM - ECS enabled | [ami-0ca27790cc998f326](https://ap-northeast-1.console.aws.amazon.com/ec2/home?region=ap-northeast-1#launchInstanceWizard:ami=ami-0ca27790cc998f326)
sa-east-1 | HVM - ECS enabled | [ami-0dee69c3e943090d2](https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#launchInstanceWizard:ami=ami-0dee69c3e943090d2)
ca-central-1 | HVM - ECS enabled | [ami-08a3c4348c32901c8](https://ca-central-1.console.aws.amazon.com/ec2/home?region=ca-central-1#launchInstanceWizard:ami=ami-08a3c4348c32901c8)
ap-southeast-1 | HVM - ECS enabled | [ami-0e144ba210c6aca27](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#launchInstanceWizard:ami=ami-0e144ba210c6aca27)
ap-southeast-2 | HVM - ECS enabled | [ami-014ef29b79c6c869a](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#launchInstanceWizard:ami=ami-014ef29b79c6c869a)
eu-central-1 | HVM - ECS enabled | [ami-0cd059553ae2db346](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#launchInstanceWizard:ami=ami-0cd059553ae2db346)
us-east-1 | HVM - ECS enabled | [ami-0dd393657bf06c830](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#launchInstanceWizard:ami=ami-0dd393657bf06c830)
us-east-2 | HVM - ECS enabled | [ami-02ba4957a8e3c2f14](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#launchInstanceWizard:ami=ami-02ba4957a8e3c2f14)
us-west-1 | HVM - ECS enabled | [ami-025ab38f4d044be62](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#launchInstanceWizard:ami=ami-025ab38f4d044be62)
us-west-2 | HVM - ECS enabled | [ami-02ff2946d2cf94ef5](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#launchInstanceWizard:ami=ami-02ff2946d2cf94ef5)
cn-north-1 | HVM - ECS enabled | [ami-07b80b3fba93cf7c3](https://cn-north-1.console.amazonaws.cn/ec2/home?region=cn-north-1#launchInstanceWizard:ami=ami-07b80b3fba93cf7c3)
cn-northwest-1 | HVM - ECS enabled | [ami-052db9ef3b5ed0e41](https://cn-northwest-1.console.amazonaws.cn/ec2/home?region=cn-northwest-1#launchInstanceWizard:ami=ami-052db9ef3b5ed0e41)
