---
title: Load Balancing Configuration
layout: single-docs
weight: 300
---

# External Load Balancer Configuration

Following {{< product >}} installation, you have the option of configuring an external load balancer to direct cluster traffic.

## Option 1: Amazon ELB (Recommended)

Amazon Elastic Load Balancer (ELB) is the load balancer most tested by {{< product >}}. You can set one up at Amazon Web Services (AWS). You have the option of using either an Application Load Balancer (ALB) or a Network Load Balancer (NLB).

## Create Target Groups

Regardless of your choice, ALB or ELB, your first load balancer configuration step is to create two target groups: one for HTTP, the other for HTTPS.

The document below will guide you through this process. Use the data in the tables below to complete the procedure.

[Amazon Documentation: Create a Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-target-group.html)

### Target Group 1 (HTTP)

Option                      | Setting
----------------------------|------------------------------------
Target Group Name           | `rancher-ha-http-80`
Protocol                    | For ALB: `HTTP`<br/>For NLB: `TCP`
Port                        | `80`
Target type                 | `instance`
VPC                         | Choose your VPC
Protocol<br/>(Health Check) | For ALB: `HTTPS`<br/>For NLB: `TCP`


### Target Group 2 (HTTPS)

Option                      | Setting
----------------------------|------------------------------------
Target Group Name           | `rancher-ha-http-443`
Protocol                    | For ALB: `HTTP`<br/>For NLB: `TCP`
Port                        | `443`
Target type                 | `instance`
VPC                         | Choose your VPC
Protocol<br/>(Health Check) | For ALB: `HTTPS`<br/>For NLB: `TCP`


## Register Targets

Next, add your Kubernetes nodes assigned either the `controlplane` or `worker` role to _both_ of your target groups.

[Amazon Documentation: Register Targets with Your Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-register-targets.html)

## Option 3: NGINX

NGINX is a popular application platform that can be used as a load balancer.

## Option 2: HAProxy

Hey, guess what. You can use HAProxy too.
