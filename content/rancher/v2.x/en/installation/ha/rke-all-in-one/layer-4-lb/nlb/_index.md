---
title: Amazon NLB configuration
weight: 277
aliases:
- /rancher/v2.x/en/installation/ha-server-install/nlb/
---
## Objectives

Configuring an Amazon NLB is a multistage process. We've broken it down into multiple tasks so that it's easy to follow.

1. [Create Target Groups](#create-target-groups)

	Begin by creating two target groups for the **TCP** protocol, one regarding TCP port 443 and one regarding TCP port 80 (providing redirect to TCP port 443). You'll add your Linux nodes to these groups.

2. [Register Targets](#register-targets)

	Add your Linux nodes to the target groups.

3. [Create Your NLB](#create-your-nlb)

	Use Amazon's Wizard to create an Network Load Balancer. As part of this process, you'll add the target groups you created in **1. Create Target Groups**.


## Create Target Groups

Your first NLB configuration step is to create two target groups. Technically, only port 443 is needed to access Rancher, but its convenient to add a listener for port 80 which will be redirected to port 443 automatically. The NGINX controller on the nodes will make sure that port 80 gets redirected to port 443.

Log into the [Amazon AWS Console](https://console.aws.amazon.com/ec2/) to get started, make sure to select the **Region** where your EC2 instances (Linux nodes) are created.

The Target Groups configuration resides in the **Load Balancing** section of the **EC2** service. Select **Services** and choose **EC2**, find the section **Load Balancing** and open **Target Groups**.

![EC2 Load Balancing section]({{< baseurl >}}/img/rancher/ha/nlb/ec2-loadbalancing.png)

Click **Create target group** to create the first target group, regarding TCP port 443.

### Target Group (TCP port 443)

Configure the first target group according to the table below. Screenshots of the configuration are shown just below the table.

Option                                | Setting
--------------------------------------|------------------------------------
Target Group Name                     | `rancher-tcp-443`
Protocol                              | `TCP`
Port                                  | `443`
Target type                           | `instance`
VPC                                   | Choose your VPC
Protocol<br/>(Health Check)           | `HTTP`
Path<br/>(Health Check)               | `/healthz`
Port (Advanced health check)          | `override`,`80`
Healthy threshold (Advanced health)   | `3`
Unhealthy threshold (Advanced)        | `3`
Timeout (Advanced)                    | `6 seconds`
Interval (Advanced)                   | `10 second`
Success codes                         | `200-399`

<hr>
**Screenshot Target group TCP port 443 settings**<br/>
![Target group 443]({{< baseurl >}}/img/rancher/ha/nlb/create-targetgroup-443.png)

<hr>
**Screenshot Target group TCP port 443 Advanced settings**<br/>
![Target group 443 Advanced]({{< baseurl >}}/img/rancher/ha/nlb/create-targetgroup-443-advanced.png)

<hr>

Click **Create target group** to create the second target group, regarding TCP port 80.

### Target Group (TCP port 80)

Configure the second target group according to the table below. Screenshots of the configuration are shown just below the table.

Option                                | Setting
--------------------------------------|------------------------------------
Target Group Name                     | `rancher-tcp-80`
Protocol                              | `TCP`
Port                                  | `80`
Target type                           | `instance`
VPC                                   | Choose your VPC
Protocol<br/>(Health Check)           | `HTTP`
Path<br/>(Health Check)               | `/healthz`
Port (Advanced health check)          | `traffic port`
Healthy threshold (Advanced health)   | `3`
Unhealthy threshold (Advanced)        | `3`
Timeout (Advanced)                    | `6 seconds`
Interval (Advanced)                   | `10 second`
Success codes                         | `200-399`

<hr>
**Screenshot Target group TCP port 80 settings**<br/>
![Target group 80]({{< baseurl >}}/img/rancher/ha/nlb/create-targetgroup-80.png)

<hr>
**Screenshot Target group TCP port 80 Advanced settings**<br/>
![Target group 80 Advanced]({{< baseurl >}}/img/rancher/ha/nlb/create-targetgroup-80-advanced.png)

<hr>

## Register Targets

Next, add your Linux nodes to both target groups.

Select the target group named **rancher-tcp-443**, click the tab **Targets** and choose **Edit**.

![Edit target group 443]({{< baseurl >}}/img/rancher/ha/nlb/edit-targetgroup-443.png)

Select the instances (Linux nodes) you want to add, and click **Add to registered**.

<hr>
**Screenshot Add targets to target group TCP port 443**<br/>

![Add targets to target group 443]({{< baseurl >}}/img/rancher/ha/nlb/add-targets-targetgroup-443.png)

<hr>
**Screenshot Added targets to target group TCP port 443**<br/>

![Added targets to target group 443]({{< baseurl >}}/img/rancher/ha/nlb/added-targets-targetgroup-443.png)

When the instances are added, click **Save** on the bottom right of the screen.

Repeat those steps, replacing **rancher-tcp-443** with **rancher-tcp-80**. The same instances need to be added as targets to this target group.

## Create Your NLB

Use Amazon's Wizard to create an Network Load Balancer. As part of this process, you'll add the target groups you created in [Create Target Groups](#create-target-groups).

1. From your web browser, navigate to the [Amazon EC2 Console](https://console.aws.amazon.com/ec2/).

2. From the navigation pane, choose **LOAD BALANCING** > **Load Balancers**.

3. Click **Create Load Balancer**.

4. Choose **Network Load Balancer** and click **Create**.

5. Complete the **Step 1: Configure Load Balancer** form.
	- **Basic Configuration**

	   - Name: `rancher`
	   - Scheme: `internet-facing`
	- **Listeners**

		Add the **Load Balancer Protocols** and **Load Balancer Ports** below.
		- `TCP`: `443`

	- **Availability Zones**

	   - Select Your **VPC** and **Availability Zones**.

6. Complete the **Step 2: Configure Routing** form.

	- From the **Target Group** drop-down, choose **Existing target group**.

	- From the **Name** drop-down, choose `rancher-tcp-443`.

	- Open **Advanced health check settings**, and configure **Interval** to `10 seconds`.

7. Complete **Step 3: Register Targets**. Since you registered your targets earlier, all you have to do is click **Next: Review**.

8. Complete **Step 4: Review**. Look over the load balancer details and click **Create** when you're satisfied.

9. After AWS creates the NLB, click **Close**.

## Add listener to NLB for TCP port 80

1. Select your newly created NLB and select the **Listeners** tab.

2. Click **Add listener**.

3. Use `TCP`:`80` as **Protocol** : **Port**

4. Click **Add action** and choose **Forward to...**

5. From the **Forward to** drop-down, choose `rancher-tcp-80`.

6. Click **Save** in the top right of the screen.
