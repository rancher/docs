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

Latest Release: [v1.5.3](https://github.com/rancher/os/releases/tag/v1.5.3)

Region | Type | AMI
---|--- | ---
eu-north-1 | HVM - ECS enabled | [ami-02042aefd9a6743c0](https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#launchInstanceWizard:ami=ami-02042aefd9a6743c0)
ap-south-1 | HVM - ECS enabled | [ami-097e19198e915f12c](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#launchInstanceWizard:ami=ami-097e19198e915f12c)
eu-west-3 | HVM - ECS enabled | [ami-0622559381120fe22](https://eu-west-3.console.aws.amazon.com/ec2/home?region=eu-west-3#launchInstanceWizard:ami=ami-0622559381120fe22)
eu-west-2 | HVM - ECS enabled | [ami-081d1809e05a29ff9](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#launchInstanceWizard:ami=ami-081d1809e05a29ff9)
eu-west-1 | HVM - ECS enabled | [ami-08f19c0126135b103](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#launchInstanceWizard:ami=ami-08f19c0126135b103)
ap-northeast-2 | HVM - ECS enabled | [ami-08bba0cd9934cef90](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#launchInstanceWizard:ami=ami-08bba0cd9934cef90)
ap-northeast-1 | HVM - ECS enabled | [ami-0a7a9e44ec4c01f7e](https://ap-northeast-1.console.aws.amazon.com/ec2/home?region=ap-northeast-1#launchInstanceWizard:ami=ami-0a7a9e44ec4c01f7e)
sa-east-1 | HVM - ECS enabled | [ami-0ad4e6bd39fe14dfa](https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#launchInstanceWizard:ami=ami-0ad4e6bd39fe14dfa)
ca-central-1 | HVM - ECS enabled | [ami-0bde65d7509878a90](https://ca-central-1.console.aws.amazon.com/ec2/home?region=ca-central-1#launchInstanceWizard:ami=ami-0bde65d7509878a90)
ap-southeast-1 | HVM - ECS enabled | [ami-085ce6d3cf455dba0](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#launchInstanceWizard:ami=ami-085ce6d3cf455dba0)
ap-southeast-2 | HVM - ECS enabled | [ami-004dc02c07766a9a6](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#launchInstanceWizard:ami=ami-004dc02c07766a9a6)
eu-central-1 | HVM - ECS enabled | [ami-0fa23b013188bf809](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#launchInstanceWizard:ami=ami-0fa23b013188bf809)
us-east-1 | HVM - ECS enabled | [ami-0395c86bff9bc1bce](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#launchInstanceWizard:ami=ami-0395c86bff9bc1bce)
us-east-2 | HVM - ECS enabled | [ami-02027918438bc6897](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#launchInstanceWizard:ami=ami-02027918438bc6897)
us-west-1 | HVM - ECS enabled | [ami-03e54b15c63b99c47](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#launchInstanceWizard:ami=ami-03e54b15c63b99c47)
us-west-2 | HVM - ECS enabled | [ami-0a7f51b27f45e8d77](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#launchInstanceWizard:ami=ami-0a7f51b27f45e8d77)
cn-north-1 | HVM - ECS enabled | [ami-0dfbc6d88d4048e24](https://cn-north-1.console.amazonaws.cn/ec2/home?region=cn-north-1#launchInstanceWizard:ami=ami-0dfbc6d88d4048e24)
cn-northwest-1 | HVM - ECS enabled | [ami-04d3267529863091d](https://cn-northwest-1.console.amazonaws.cn/ec2/home?region=cn-northwest-1#launchInstanceWizard:ami=ami-04d3267529863091d)
