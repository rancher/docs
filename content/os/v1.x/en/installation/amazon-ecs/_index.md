---
title: Amazon ECS (EC2 Container Service)
weight: 190
---

[Amazon ECS](https://aws.amazon.com/ecs/) is supported, which allows RancherOS EC2 instances to join your cluster.

### Pre-Requisites

Before launching RancherOS EC2 instances, the [ECS Container Instance IAM Role](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/instance_IAM_role.html) will need to have been created. This `ecsInstanceRole` will need to be used when launching EC2 instances. If you have been using ECS, you created this role if you followed the ECS "Get Started" interactive guide.

### Launching an instance with ECS

RancherOS makes it easy to join your ECS cluster. The ECS agent is a [system service]({{< baseurl >}}/os/v1.x/en/system-services/) that is enabled in the ECS enabled AMI. There may be other RancherOS AMIs that don't have the ECS agent enabled by default, but it can easily be added in the user data on any RancherOS AMI.

When launching the RancherOS AMI, you'll need to specify the **IAM Role** and **Advanced Details** -> **User Data** in the **Configure Instance Details** step.

For the **IAM Role**, you'll need to be sure to select the ECS Container Instance IAM role.

For the **User Data**, you'll need to pass in the [cloud-config]({{< baseurl >}}/os/v1.x/en/configuration/#cloud-config) file.

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

To select the version, you can update your [cloud-config]({{< baseurl >}}/os/v1.x/en/configuration/#cloud-config) file.

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

Latest Release: [v1.5.6](https://github.com/rancher/os/releases/tag/v1.5.6)

Region | Type | AMI
---|--- | ---
eu-north-1 | HVM - ECS enabled | [ami-0539b842146882049](https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#launchInstanceWizard:ami=ami-0539b842146882049)
ap-south-1 | HVM - ECS enabled | [ami-0d3b8d8f26c689b4f](https://ap-south-1.console.aws.amazon.com/ec2/home?region=ap-south-1#launchInstanceWizard:ami=ami-0d3b8d8f26c689b4f)
eu-west-3 | HVM - ECS enabled | [ami-0fea51d2e82d132a0](https://eu-west-3.console.aws.amazon.com/ec2/home?region=eu-west-3#launchInstanceWizard:ami=ami-0fea51d2e82d132a0)
eu-west-2 | HVM - ECS enabled | [ami-00c3a19135715c851](https://eu-west-2.console.aws.amazon.com/ec2/home?region=eu-west-2#launchInstanceWizard:ami=ami-00c3a19135715c851)
eu-west-1 | HVM - ECS enabled | [ami-012c49dfd6efe2b69](https://eu-west-1.console.aws.amazon.com/ec2/home?region=eu-west-1#launchInstanceWizard:ami=ami-012c49dfd6efe2b69)
ap-northeast-2 | HVM - ECS enabled | [ami-02c46f0bcf41b4979](https://ap-northeast-2.console.aws.amazon.com/ec2/home?region=ap-northeast-2#launchInstanceWizard:ami=ami-02c46f0bcf41b4979)
ap-northeast-1 | HVM - ECS enabled | [ami-0354daa9f30fe60e6](https://ap-northeast-1.console.aws.amazon.com/ec2/home?region=ap-northeast-1#launchInstanceWizard:ami=ami-0354daa9f30fe60e6)
sa-east-1 | HVM - ECS enabled | [ami-00856c117fa05835f](https://sa-east-1.console.aws.amazon.com/ec2/home?region=sa-east-1#launchInstanceWizard:ami=ami-00856c117fa05835f)
ca-central-1 | HVM - ECS enabled | [ami-0b0cb5188439bf169](https://ca-central-1.console.aws.amazon.com/ec2/home?region=ca-central-1#launchInstanceWizard:ami=ami-0b0cb5188439bf169)
ap-southeast-1 | HVM - ECS enabled | [ami-0d8a0ed617d75bacc](https://ap-southeast-1.console.aws.amazon.com/ec2/home?region=ap-southeast-1#launchInstanceWizard:ami=ami-0d8a0ed617d75bacc)
ap-southeast-2 | HVM - ECS enabled | [ami-029cebde25901dcc9](https://ap-southeast-2.console.aws.amazon.com/ec2/home?region=ap-southeast-2#launchInstanceWizard:ami=ami-029cebde25901dcc9)
eu-central-1 | HVM - ECS enabled | [ami-0d513a54a3e67e38e](https://eu-central-1.console.aws.amazon.com/ec2/home?region=eu-central-1#launchInstanceWizard:ami=ami-0d513a54a3e67e38e)
us-east-1 | HVM - ECS enabled | [ami-0f5cc7a532c3171c3](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#launchInstanceWizard:ami=ami-0f5cc7a532c3171c3)
us-east-2 | HVM - ECS enabled | [ami-030615e199666fd4b](https://us-east-2.console.aws.amazon.com/ec2/home?region=us-east-2#launchInstanceWizard:ami=ami-030615e199666fd4b)
us-west-1 | HVM - ECS enabled | [ami-0b530a841750e3315](https://us-west-1.console.aws.amazon.com/ec2/home?region=us-west-1#launchInstanceWizard:ami=ami-0b530a841750e3315)
us-west-2 | HVM - ECS enabled | [ami-0f1e06359f24f6480](https://us-west-2.console.aws.amazon.com/ec2/home?region=us-west-2#launchInstanceWizard:ami=ami-0f1e06359f24f6480)
