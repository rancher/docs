---
title: Configuring Amazon ALB
weight:
---
# Configuring Amazon ALB

## Objectives

Configuring an Amazon ALB is a multistage process. We've broken it down into multiple tasks so that it's easy to follow.

1. [Create Target Groups](#create-target-groups)

	Begin by creating two target groups for each http protocol: http and https. You'll add your Kubernetes nodes to both groups.

2. [Register Targets](#register-targets)

	Add your Kubernettes nodes to the groups.

3. [Create Your ALB](#create-your-alb)

	Use Amazon's Wizard to create an Application Load Balancer. As part of this process, you'll add one of the target groups you created in **1. Create Target Groups**.

4. [Add Your Second Target Group](#placeholder)

	The Wizard in **3. Create Your ALB** only allows you to add a single target group. Go back into Amazon's console and add the second target group manually.


## Create Target Groups

Your first ALB configuration step is to create two target groups: one for HTTP, the other for HTTPS.

The document below will guide you through this process. Use the data in the tables below to complete the procedure.

[Amazon Documentation: Create a Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-target-group.html)

### Target Group 1 (HTTP)

Option                      | Setting
----------------------------|------------------------------------
Target Group Name           | `rancher-http-80`
Protocol                    | `HTTP`
Port                        | `80`
Target type                 | `instance`
VPC                         | Choose your VPC
Protocol<br/>(Health Check) | `HTTPS`


### Target Group 2 (HTTPS)

Option                      | Setting
----------------------------|------------------------------------
Target Group Name           | `rancher-http-443`
Protocol                    | `HTTP`
Port                        | `443`
Target type                 | `instance`
VPC                         | Choose your VPC
Protocol<br/>(Health Check) | `HTTPS`

## Register Targets

Next, add your Kubernetes nodes assigned either the `controlplane` or `worker` role to _both_ of your target groups.

[Amazon Documentation: Register Targets with Your Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-register-targets.html)

### Create Your ALB

1. From your web browser, navigate to the [Amazon Elastic Load Balancing Console](https://aws.amazon.com/elasticloadbalancing/).

2. Click **Get Started with Elastic Load Balancing** and sign in.

3. Choose **Application Load Balancer**.

4. Complete the **Step 1: Configure Load Balancer** form.
	- **Basic Configuration**

	   - Name: `rancher-ha-http-https`
	   - Scheme: `internet-facing`
	   - IP address type: `ipv4`
	- **Listeners**

		Add the **Load Balancer Protocols** and **Load Balancer Ports** below.
		- `HTTP`: `80`
		- `HTTPS`: `443`

	- **Availability Zones**

	   - Select Your **VPC** and **Availability Zone**.

5. Complete the **Step 2: Configure Security Settings** form.

	>**Installing in a High-Availability Configuration?**
	> - If you are using self-signed certificates, the certificate and key must be signed by the same certificate authority that signed `cattle-keys-server`.
	> - If you are using SSL passthrough, you must use a certificate signed by a public certificate authority.

6. Complete the **Step 3: Configure Security Groups** form.

7. Complete the **Step 4: Configure Routing** form. Add one of your [target groups](#create-target-groups) using the form.

	>**User Action:** You must add _both_ target groups to your routing configuration, but Amazon's ALB Wizard limits you to add a single target group.


### Add Your Second Target Group
