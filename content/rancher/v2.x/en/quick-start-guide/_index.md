---
title: Quick Start Guide
short title: Quick Start
weight: 25
---
>**Note:** This Quick Start Guide will get you up and running in a sandbox environment. It is not intended for a production environment. For more comprehensive instructions, see [Installation]({{< baseurl >}}/rancher/v2.x/en/installation/).

Howdy Partner! This tutorial walks you through:

- Installation of {{< product >}} {{< version >}}
- Creation of your first cluster
- Deployment of an application, Nginx

## Objectives

This Quick Start Guide is divided into different tasks for easier consumption.

1.  [Provision a Linux Host](#provision-a-linux-host)

    Begin by provisioning a Linux host.

2.  [Install Rancher](#install-rancher)

    From your Linux host, run the Docker command for installing Rancher.

3.  [Log In](#log-in)

    Browse to your Linux host to access the Rancher UI.

4.  [Create the Cluster](#create-the-cluster)

    Use the versatile **Custom** option to add your Linux host into a new Kubernetes cluster.

5.  [Deploy a Workload](#deploy-a-workload)

    Create a workload so that Kubernetes can distribute Nginx among your cluster nodes.

6.  [View Your Application](#view-your-application)

    When your workload finishes deployment, browse to your node IP to make sure Nginx is running.

## Provision a Linux Host

### Begin creation of a custom cluster by provisioning a Linux host. Your host can be:

- A cloud-host virtual machine (VM)
- An on-premise VM
- A bare-metal server

  >**Note:**
  > When using a cloud-host virtual machine you need to allow inbound TCP communication to ports 80 and 443.  Please see your cloud-host's documentation for information regarding port configuration.

### Provision the host according to the requirements below.

{{< requirements_os >}}

#### Hardware Requirements

- Memory: 4GB

#### Software requirements

- Software: Docker

  <a name="node-requirements"></a>**Supported Docker versions:**

  - `1.12.6`
  - `1.13.1`
  - `17.03.2`

  >**Notes:**
  >
  > - For Docker installation instructions, visit their [documentation](https://docs.docker.com/install/).
  > - Docker requirements apply to both your Linux host and your cluster nodes.

### Install Rancher

To install Rancher on your host, connect to it and then use a shell to install.

1.  Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection.

2.  From your shell, enter the following command:

	```
	$ sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/rancher
	```

**Result:** Rancher is installed.

### Log In

Log in to Rancher to begin using the application. After you log in, you'll make some one-time configurations.

1.  Open a web browser and enter the IP address of your host: `https://<SERVER_IP>`<br/><br/>
    Replace `<SERVER_IP>` with your host IP address.

2.  When prompted, create a password for the default `admin` account there cowpoke!

3. Set the **Rancher Server URL**. The URL can either be an IP address or a host name. However, each node added to your cluster must be able to connect to this URL.<br/><br/>If you use a hostname in the URL, this hostname must be resolvable by DNS on the nodes you want to add to you cluster

## Create the Cluster

Welcome to {{< product >}}! You are now able to create your first Kubernetes cluster.

In this task, you can use the versatile **Custom** option. This option lets you add _any_ Linux host (cloud-hosted VM, on-premise VM, or bare-metal) to be used in a cluster.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Custom**.

3. Enter a **Cluster Name**.

4. Skip **Member Roles** and **Cluster Options**. We'll tell you about them later.

5. Click **Next**.

6. From **Node Role**, select _all_ the roles: **etcd**, **Control**, and **Worker**.

7. Rancher will auto-detect the IP addresses used for Rancher communication and cluster communication. You can override these using `Public Address` and `Internal Address` in the **Node Address** section.

8. Skip the **Labels** stuff. It's not important for now.

9. Copy the command displayed on screen to your clipboard.

10. Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection. Run the command copied to your clipboard.

11. When you finish running the command on your Linux host, click **Done**.

{{< result_create-cluster >}}

### Deploy a Workload

You're ready to create your first _workload_. A workload is an object that includes pods along with other files and info needed to deploy your application.

For this workload, you'll be deploying the application Nginx.

1.  From the **Clusters** page, open the cluster that you just created.

2.  From the main menu of the **Dashboard**, select **Projects**.

3.  Open the **Default** project.

4.  Click **+ Deploy**.

	**Step Result:** The **Deploy Workload** page opens.

5.  Enter a **Name** for your workload.

6.  From the **Docker Image** field, enter `nginx`. This field is case-sensitive.

7.  From **Port Mapping**, click **Add Port**.

8.  From the **As a** drop-down, make sure that **NodePort (On every node)** is selected.

	![As a dropdown, NodePort (On every node selected)]({{< baseurl >}}/img/rancher/nodeport-dropdown.png)

9.  From the **On Listening Port** field, leave the **Random** value in place.

	![On Listening Port, Random selected]({{< baseurl >}}/img/rancher/listening-port-field.png)

10. From the **Publish the container port** field, enter port `80`.

	![Publish the container port, 80 entered]({{< baseurl >}}/img/rancher/container-port-field.png)

11. Leave the remaining options on their default setting. We'll tell you about them later.

12. Click **Launch**.

#### Result:
* Your workload is deployed. This process might take a few minutes to complete.
* When your workload completes deployment, it's assigned a state of **Active**. You can view this status from the project's **Workloads** page.

### View Your Application

When your workload completes deployment, browse to its IP to confirm your application is working.

From the **Workloads** page, click the link underneath your workload. If your deployment succeeded, your application opens.

>**Note**
> When using a cloud-host virtual machine you may not have access to the port running the container. It can be tested in an ssh session on the local machine. Use the port number after the `:` in the link under your workload, which is 31568 in this example.

```sh

gettingstarted@rancher:~$ curl http://localhost:31568
<!DOCTYPE html>
<html>
<head>
<title>Welcome to Nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to Nginx!</h1>
<p>If you see this page, the Nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://Nginx.org/">Nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using Nginx.</em></p>
</body>
</html>
gettingstarted@rancher:~$

```

### Finished

Congratulations! You have:

- Created your first cluster.
- Deployed Nginx to your cluster using a workload.
