---
title: Amazon ALB Configuration
weight: 277
aliases:
- /rancher/v2.0-v2.4/en/installation/ha-server-install-external-lb/alb/
- /rancher/v2.0-v2.4/en/installation/options/helm2/rke-add-on/layer-7-lb/alb
---

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher helm chart to install Kubernetes Rancher. For details, see the [Kubernetes Install ]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/).
>
>If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

## Objectives

Configuring an Amazon ALB is a multistage process. We've broken it down into multiple tasks so that it's easy to follow.

1. [Create Target Group](#create-target-group)

	Begin by creating one target group for the http protocol. You'll add your Linux nodes to this group.

2. [Register Targets](#register-targets)

	Add your Linux nodes to the target group.

3. [Create Your ALB](#create-your-alb)

	Use Amazon's Wizard to create an Application Load Balancer. As part of this process, you'll add the target groups you created in **1. Create Target Groups**.


## Create Target Group

Your first ALB configuration step is to create one target group for HTTP.

Log into the [Amazon AWS Console](https://console.aws.amazon.com/ec2/) to get started.

The document below will guide you through this process. Use the data in the tables below to complete the procedure.

[Amazon Documentation: Create a Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-target-group.html)

### Target Group (HTTP)

Option                      | Setting
----------------------------|------------------------------------
Target Group Name           | `rancher-http-80`
Protocol                    | `HTTP`
Port                        | `80`
Target type                 | `instance`
VPC                         | Choose your VPC
Protocol<br/>(Health Check) | `HTTP`
Path<br/>(Health Check)     | `/healthz`

## Register Targets

Next, add your Linux nodes to your target group.

[Amazon Documentation: Register Targets with Your Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-register-targets.html)

### Create Your ALB

Use Amazon's Wizard to create an Application Load Balancer. As part of this process, you'll add the target group you created in [Create Target Group](#create-target-group).

1. From your web browser, navigate to the [Amazon EC2 Console](https://console.aws.amazon.com/ec2/).

2. From the navigation pane, choose **LOAD BALANCING** > **Load Balancers**.

3. Click **Create Load Balancer**.

4. Choose **Application Load Balancer**.

5. Complete the **Step 1: Configure Load Balancer** form.
	- **Basic Configuration**

	   - Name: `rancher-http`
	   - Scheme: `internet-facing`
	   - IP address type: `ipv4`
	- **Listeners**

		Add the **Load Balancer Protocols** and **Load Balancer Ports** below.
		- `HTTP`: `80`
		- `HTTPS`: `443`

	- **Availability Zones**

	   - Select Your **VPC** and **Availability Zones**.

6. Complete the **Step 2: Configure Security Settings** form.

	Configure the certificate you want to use for SSL termination.

7. Complete the **Step 3: Configure Security Groups** form.

8. Complete the **Step 4: Configure Routing** form.

	- From the **Target Group** drop-down, choose **Existing target group**.

	- Add target group `rancher-http-80`.

9. Complete **Step 5: Register Targets**. Since you registered your targets earlier, all you have to do it click **Next: Review**.

10. Complete **Step 6: Review**. Look over the load balancer details and click **Create** when you're satisfied.

11. After AWS creates the ALB, click **Close**.
