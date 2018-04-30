---
title: Configure Amazon NLB
weight: 310
---
# Configure Amazon NLB

Amazon Elastic Load Balancing offers a couple of different load balancers that we're tested. This procedure provides step-by-step instruction for configuring Amazon Network Load Balancer (NLB) with your Rancher Server.

## Objectives

Configuring an Amazon NLB is a multistage process. We've broken it down into multiple tasks so that it's easy to follow.

1. [Create Target Groups](#create-target-groups)

	Begin by creating two target groups for each http protocol: http and https. You'll add your Kubernetes nodes to both groups.

2. [Register Targets](#register-targets)

	Add your Kubernettes nodes to the groups.

3. [Create Your NLB](#create-your-NLB)

	Use Amazon's Wizard to create an Application Load Balancer. As part of this process, you'll add one of the target groups you created in **1. Create Target Groups**.

4. [Add Your Second Target Group](#placeholder)

	The Wizard in **3. Create Your NLB** only allows you to add a single target group. Go back into Amazon's console and add the second target group manually.


### Create Target Groups

Your first NLB configuration step is to create two target groups for the TCP protocol: one on port 80, the other on port 443.

Log into the [Amazon AWS Console](https://console.aws.amazon.com/ec2/) to get started.

The document below will guide you through this process. Use the data in the tables below to complete the procedure.

[Amazon Documentation: Create a Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-target-group.html)

#### Target Group 1 (TCP)

Option                      | Setting
----------------------------|------------------------------------
Target Group Name           | `rancher-tcp-80`
Protocol                    | `TCP`
Port                        | `80`
Target type                 | `instance`
VPC                         | Choose your VPC
Protocol<br/>(Health Check) | `TCP`


#### Target Group 2 (TCP)

Option                      | Setting
----------------------------|------------------------------------
Target Group Name           | `rancher-tcp-443`
Protocol                    | `TCP`
Port                        | `443`
Target type                 | `instance`
VPC                         | Choose your VPC
Protocol<br/>(Health Check) | `TCP`

### Register Targets

Next, add your Kubernetes nodes assigned either the `controlplane` or `worker` role to _both_ of your target groups.

[Amazon Documentation: Register Targets with Your Target Group](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-register-targets.html)

### Create Your NLB

1. From your web browser, navigate to the [Amazon EC2 Console](https://console.aws.amazon.com/ec2/).

2. From the navigation pane, choose **LOAD BALANCING** > **Load Balancers**.

3. Click **Create Load Balancer**.

4. Choose **Network Load Balancer**.

5. Complete the **Step 1: Configure Load Balancer** form.
	- **Basic Configuration**

	   - Name: `rancher-http-https`
	   - Scheme: `internet-facing`
	   - IP address type: `ipv4`
	- **Listeners**

		Add the **Load Balancer Protocols** and **Load Balancer Ports** below.
		- `TCP`: `80`
		- `TCP`: `443`

	- **Availability Zones**

	   - Select Your **VPC** and **Availability Zones**.

6. Complete the **Step 2: Configure Routing** form.

	1. From the **Target Group** drop-down, choose **Existing target group**.

	2. Add target group `rancher-tcp-80`.

	>**Note:** The wizard lets you add only one group. You will add your second group in the  next procedure, [Add Your Second Target Group](#add-your-second-target-group).

7. Complete **Step 3: Register Targets**. Since you registered your targets earlier, all you have to do it click **Next: Review**.

8. Complete **Step 4: Review**. Look over the load balancer details and click **Create** when you're satisfied.

9. After AWS creates the ALB, click **Close**.

### Add Your Second Target Group

The load balancer is created, but you still need to add your second target group. Use the Amazon EC2 Console and add the second target group manually.

1. From the navigation pane, choose **LOAD BALANCING** > **Load Balancers**.

2. From the grid of load balancers, select your load balancer.

3. Select the **Listeners** tab. Select the `TCP: 443` **Listener ID**. Then click **Edit**.

4. From the **Default target group** drop-down, select `rancher-tcp-443`. Click **Save**.

5. Review the **Listeners** tab to make sure the protocols for the **Listener ID**s and **Rules** match. The following **Listener ID**s should be matched to the following **Rules**:

    - `TCP: 80`: `rancher-tcp-80`
    - `TCP:443`: `rancher-tcp-443`
