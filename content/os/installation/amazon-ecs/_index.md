---
title: Amazon ECS (EC2 Container Service)
weight: 190
---

## Amazon ECS (EC2 Container Service)
---

[Amazon ECS](https://aws.amazon.com/ecs/) is supported, which allows RancherOS EC2 instances to join your cluster.

### Pre-Requisites

Prior to launching RancherOS EC2 instances, the [ECS Container Instance IAM Role](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html) will need to have been created. This `ecsInstanceRole` will need to be used when launching EC2 instances. If you have been using ECS, you created this role if you followed the ECS "Get Started" interactive guide.

### Launching an instance with ECS

RancherOS makes it easy to join your ECS cluster. The ECS agent is a [system service]({{< baseurl >}}/os/installation/system-services/adding-system-services/) that is enabled in the ECS enabled AMI. There may be other RancherOS AMIs that don't have the ECS agent enabled by default, but it can easily be added in the user data on any RancherOS AMI.

When launching the RancherOS AMI, you'll need to specify the **IAM Role** and **Advanced Details** -> **User Data** in the **Configure Instance Details** step.

For the **IAM Role**, you'll need to be sure to select the ECS Container Instance IAM role.

For the **User Data**, you'll need to pass in the [cloud-config]({{< baseurl >}}/os/installation/configuration/#cloud-config) file.

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

To select the version, you can update your [cloud-config]({{< baseurl >}}/os/installation/configuration/#cloud-config) file.

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

Latest Release: [v1.2.0](https://github.com/rancher/os/releases/tag/v1.2.0)

Region | Type | AMI
---|--- | ---
ap-south-1 | HVM - ECS enabled | [ami-add487c2](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#launchInstanceWizard:ami=ami-add487c2)
eu-west-3 | HVM - ECS enabled | [ami-f1a3158c](https://eu-west-3.console.aws.amazon.com/ec2/home?region=eu-west-3#launchInstanceWizard:ami=ami-f1a3158c)
eu-west-2 | HVM - ECS enabled | [ami-8fbd58e8](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#launchInstanceWizard:ami=ami-8fbd58e8)
eu-west-1 | HVM - ECS enabled | [ami-f41e768d](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#launchInstanceWizard:ami=ami-f41e768d)
ap-northeast-2 | HVM - ECS enabled | [ami-3da30153](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#launchInstanceWizard:ami=ami-3da30153)
ap-northeast-1 | HVM - ECS enabled | [ami-31c1b657](https://ap-northeast-1.console.aws.amazon.com/ec2/home?region=ap-northeast-1#launchInstanceWizard:ami=ami-31c1b657)
sa-east-1 | HVM - ECS enabled | [ami-31115f5d](https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#launchInstanceWizard:ami=ami-31115f5d)
ca-central-1 | HVM - ECS enabled | [ami-bba622df](https://ca-central-1.console.aws.amazon.com/ec2/home?region=ca-central-1#launchInstanceWizard:ami=ami-bba622df)
ap-southeast-1 | HVM - ECS enabled | [ami-aa5b1ad6](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#launchInstanceWizard:ami=ami-aa5b1ad6)
ap-southeast-2 | HVM - ECS enabled | [ami-eec73c8c](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#launchInstanceWizard:ami=ami-eec73c8c)
eu-central-1 | HVM - ECS enabled | [ami-29422646](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#launchInstanceWizard:ami=ami-29422646)
us-east-1 | HVM - ECS enabled | [ami-84171efe](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#launchInstanceWizard:ami=ami-84171efe)
us-east-2 | HVM - ECS enabled | [ami-9982b7fc](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#launchInstanceWizard:ami=ami-9982b7fc)
us-west-1 | HVM - ECS enabled | [ami-c7b3bca7](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#launchInstanceWizard:ami=ami-c7b3bca7)
us-west-2 | HVM - ECS enabled | [ami-3924a041](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#launchInstanceWizard:ami=ami-3924a041)
