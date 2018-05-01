---
title: Quick Start
weight: 25
aliases: [/docs/rancher/v2.0/en/quick-start-guide]
---

# Quick Start Guide

Howdy Partner! This tutorial walks you through:

- Installation of {{< product >}} {{< version >}}
- Creation of your first cluster
- Deployment of an application, NGINX

## Objectives

This Quick Start Guide is divided into different tasks for easier consumption.

1.  [Provision a Linux Host](#provision-a-linux-host) <br/>
        Begin by provisioning a Linux host.

2.  [Install Rancher](#install-rancher) <br/>
        From your Linux host, run the Docker command for installing Rancher.

3.  [Log In](#log-in)  <br/>
        Browse to your Linux host to access the Rancher UI.

4.  [Create the Cluster](#create-the-cluster)  <br/>
        Use the versatile **Custom** option to clone your Linux host into a new Kubernetes cluster.

5.  [Deploy a Workload](#deploy-a-workload)  <br/>
        Create a workload so that Kubernetes can distribute NGINX among your cluster nodes.

6.  [View Your Application](#view-your-application) <br/> 
        When your workload finishes deployment, browse to your node IP to make sure NGINX is running.

7.  [What's Next?](#whats-next) <br/> 
        Now that you've created a cluster and deployed NGINX, find out what else you can do with Rancher v2.0.

## Provision a Linux Host

### Begin creation of a custom cluster by provisioning a Linux host. Your host can be:

- A cloud-host virtual machine (VM)
- An on-premise VM
- A bare-metal server

### Provision the host according to the requirements below.

#### Hardware Requirements

- Memory: 4GB

#### Software requirements

- Operating System: Ubuntu 16.04 (64-bit)
- Software: Docker

  <a name="node-requirements"></a>**Supported Versions:**

  - `1.12.6`
  - `1.13.1`
  - `17.03.2`

  >**Notes:**
  >
  > * For Docker installation instructions, visit their [documentation](https://docs.docker.com/install/).
  > * Docker requirements apply to both your Linux host and your cluster nodes.

### Install Rancher

To install Rancher on your host, connect to it and then use a shell to install.

1.  Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection.

2.  From your shell, enter the following command:

	```
	$ sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
	```

**Result: Rancher is installed.**

### Log In

Log in to Rancher to begin using the application. After you log in, you'll make some one-time configurations.

1.  Open a web browser and enter the IP address of your host:

  `https://<SERVER_IP>`

  Replace `<SERVER_IP>` with your host IP address.

2.  When prompted, create a password for the default `admin` account there cowpoke!

3. Set the **Rancher Server URL**. The URL can either be an IP address or a host name. However, each node in your cluster must be able to resolve to the URL.

## Create the Cluster

Welcome to {{< product >}}! Use our application to clone your Linux host and configure them as a Kubernetes cluster.

In this task, use the versatile **Custom** option. This option lets you convert _any_ Linux host (cloud-hosted VM, on-premise VM, or bare-metal) into a cluster.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Custom**.

3. Enter a **Cluster Name**.

4. Skip **Member Roles** and **Cluster Options**. We'll tell you about them later.

5. Click **Next**.

6. From **Node Role**, select _all_ the roles: **etcd**, **Control**, and **Worker**.

7. Skip the **Labels** stuff. It's not important for now.

8. Copy the command displayed on screen to your clipboard.

9. Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection. Run the command copied to your clipboard.

10. When you finish running the command on your Linux host, click **Done**.

{{< result_create-cluster >}}

### Deploy a Workload

You're ready to create your first _workload_. A workload is an object that includes pods along with other files and info needed to deploy your application.

For this workload, you'll be deploying the application NGINX.

1.  From the **Clusters** page, open the cluster that you just created.

2.  From the main menu of the **Dashboard**, select **Projects**.

3.  Open the **Default** project.

4.  Click **+ Deploy**.

  **Step Result:** The **Deploy Workload** page opens.

5.  Enter a **Name** for your workload.

6.  From the **Docker Image** field, enter `nginx`.

7.  From **Port Mapping**, click **Add Port**.

8.  From the **Publish on** drop-down, make sure that **Every node** is selected.

8.  From the **Source Port** field, leave the **Random** value in place.

7. From the **Container Port** field, enter port `80`.

8. Leave the remaining options on their default setting. We'll tell you about them later.

9. Click **Launch**.

#### Result:
* Your workload is deployed. This process might take a few minutes to complete.
* When your workload completes deployment, it's assigned a state of **Active**. You can view this status from the project's **Workloads** page.

### View Your Application

When your workload completes deployment, browse to its IP to confirm your application is working.

From the **Workloads** page, click the link underneath your workload. If your deployment succeeded, your application opens.

### What's Next?

Congratulations! You have:

- Created your first cluster.
- Deployed NGINX to your cluster using a workload.
