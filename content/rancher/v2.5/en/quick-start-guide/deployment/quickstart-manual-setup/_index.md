---
title: Manual Quick Start
weight: 300
---
Howdy Partner! This tutorial walks you through:

- Installation of Rancher 2.x
- Creation of your first cluster
- Deployment of an application, Nginx

## Quick Start Outline

This Quick Start Guide is divided into different tasks for easier consumption.

<!-- TOC -->


1. [Provision a Linux Host](#1-provision-a-linux-host)

1. [Install Rancher](#2-install-rancher)

1. [Log In](#3-log-in)

1. [Create the Cluster](#4-create-the-cluster)

<!-- /TOC -->
<br/>
### 1. Provision a Linux Host

 Begin creation of a custom cluster by provisioning a Linux host. Your host can be:

- A cloud-host virtual machine (VM)
- An on-prem VM
- A bare-metal server

  >**Note:**
  > When using a cloud-hosted virtual machine you need to allow inbound TCP communication to ports 80 and 443.  Please see your cloud-host's documentation for information regarding port configuration.
  >
  > For a full list of port requirements, refer to [Docker Installation]({{<baseurl>}}/rancher/v2.5/en/cluster-provisioning/node-requirements/).

  Provision the host according to our [Requirements]({{<baseurl>}}/rancher/v2.5/en/installation/requirements/).

### 2. Install Rancher

To install Rancher on your host, connect to it and then use a shell to install.

1.  Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection.

2.  From your shell, enter the following command:

	```
  sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 --privileged rancher/rancher
  ```

**Result:** Rancher is installed.

### 3. Log In

Log in to Rancher to begin using the application. After you log in, you'll make some one-time configurations.

1.  Open a web browser and enter the IP address of your host: `https://<SERVER_IP>`.

    Replace `<SERVER_IP>` with your host IP address.

2.  When prompted, create a password for the default `admin` account there cowpoke!

3. Set the **Rancher Server URL**. The URL can either be an IP address or a host name. However, each node added to your cluster must be able to connect to this URL.<br/><br/>If you use a hostname in the URL, this hostname must be resolvable by DNS on the nodes you want to add to you cluster.

<br/>

### 4. Create the Cluster

Welcome to Rancher! You are now able to create your first Kubernetes cluster.

In this task, you can use the versatile **Custom** option. This option lets you add _any_ Linux host (cloud-hosted VM, on-prem VM, or bare-metal) to be used in a cluster.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Existing Nodes**.

3. Enter a **Cluster Name**.

4. Skip **Member Roles** and **Cluster Options**. We'll tell you about them later.

5. Click **Next**.

6. From **Node Role**, select _all_ the roles: **etcd**, **Control**, and **Worker**.

7. **Optional**: Rancher auto-detects the IP addresses used for Rancher communication and cluster communication. You can override these using `Public Address` and `Internal Address` in the **Node Address** section.

8. Skip the **Labels** stuff. It's not important for now.

9. Copy the command displayed on screen to your clipboard.

10. Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection. Run the command copied to your clipboard.

11. When you finish running the command on your Linux host, click **Done**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces

#### Finished

Congratulations! You have created your first cluster.

#### What's Next?

Use Rancher to create a deployment. For more information, see [Creating Deployments]({{<baseurl>}}/rancher/v2.5/en/quick-start-guide/workload).
