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

[Amazon Documentation: Create a Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-target-group.html)

As you complete the procedure above, use the settings listed in the table below.

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



### Completing ALB Configuration

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

7. Complete the **Step 4: Configure Routing** form. Configure two **Target Groups** using the settings below. 

	- Target Group 1: HTTP

		- **Target Group**

			- Name: `rancher-ha-http-80`
			- Protocol: `HTTP`
			- Port: `80`
			- Target type: `instance`
			- Protocol:

		- **Health Checks**

			- Protocol: `HTTPS`

	- Target Group 2: HTTPS

		- **Target Group**

			- Name: `rancher-ha-http-443`
			- Protocol: `HTTPS`
			- Port: `443`
			- Target type: `instance`

		- **Health Checks**

			- Protocol: `HTTPS`

### To Use Network Load Balancer:

1. Open a web browser, navigate to the [Amazon Elastic Load Balancing Console](https://aws.amazon.com/elasticloadbalancing/), and then log in.

## Option 3: NGINX

NGINX is a popular application platform that can be used as a load balancer.

## Option 2: HAProxy

Hey, guess what. You can use HAProxy too.
