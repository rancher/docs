---
title: Quick Start Guide
weight: 25
---

# Quick Start Guide

Howdy Partner! This tutorial walks you through:

-	Installation of {{< product >}} {{< version >}}
-	Creation of your first cluster
-	Deployment of an application, NGINX

## Objectives

This Quick Start Guide is divided into different tasks for easier consumption.

1.	[Provision a Linux Host](#provision-a-linux-host)


1.  [Review Requirements](#host-and-node-requirements)

    Before you do anything, review the requirements.

2.  [Prepare a Linux Host](#prepare-a-linux-host)

    First, you need to provision a Linux host.

3.  [Install Rancher](#install-rancher)

    Run the Docker command for installing Rancher.

4.  [Log In](#log-in)

    Browse to your Linux host to access the Rancher UI.

5.  [Create a Cluster](#create-a-cluster)

    Use Rancher to create your first cluster.

6.  [Deploy a Workload](#deploy-a-workload)

    Create a workload so that Kubernetes can distribute an application and its dependencies among your nodes.

7.  [View Your Application](#view-your-application)

    When your workload finishes deployment, browse to your application to make sure it works.

8.  [What's Next?](#whats-next)

    Now that you've created a cluster and deployed a workload, find out what else you can do with Rancher v2.0.


Provision the host according to the requirements below.

#### Hardware Requirements

-   Memory: 4GB

#### Software requirements

-   Operating System: Ubuntu 16.04 (64-bit)
-   Software: Docker

    <a name="node-requirements"></a>**Supported Versions:**

    -   `1.12.6`
    -   `1.13.1`
    -   `17.03.2`

    >**Notes:**
    >
    > * For Docker installation instructions, visit their [documentation](https://docs.docker.com/install/).
    > * Docker requirements apply to both your Linux host and your cluster nodes.

#### Port Requirements

When provisioning your Linux host, open the ports listed below so that your master and worker nodes can communicate.

##### Master Nodes (etcd and controlplane nodes)

Protocol  | Direction  | Port Range  | Purpose
--|---|---|--
TCP | Inbound | 22  |  SSH server
TCP | Inbound | 80  | Canal
TCP | Inbound | 443  | Canal
TCP | Inbound | 6443  | Kubernetes API server
TCP | Inbound | 2379-2380  | etcd server client API
TCP | Inbound | 10250  | kubelet API
TCP | Inbound | 10251  | scheduler
TCP | Inbound | 10252  | controller
TCP | Inbound | 10256  | kubeproxy

##### Worker Nodes

Protocol  | Direction  | Port Range  | Purpose
--|---|---|--
TCP | Inbound | 22  |  SSH Server
TCP | Inbound | 80  | Canal
TCP | Inbound | 443  | Canal
TCP | Inbound | 10250  |  kubelet API
TCP | Inbound | 10256  |  kubeproxy
TCP | Inbound | 30000-32767  |  NodePort Services

### Prepare a Linux Host

Begin by provisioning a Linux host to be your Rancher server and a template for your cluster nodes. This host can be:

-   A virtual machine hosted by a cloud service.
-   An on-premise virtual machine.
-   An on-premise bare-metal server.

Provision the server according to the [requirements above](#host-and-node-requirements).

### Install Rancher

To install Rancher on your host, connect to it and then use a shell to install.

1.  Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection.

2.  From your shell, enter the following command:

    ```
    $ sudo docker run -d --restart=unless-stopped -p 80:80 -p 443:443 rancher/server:preview
    ```

    >**Note:**
    > Although Rancher v2.0 is in beta, the `preview` tag is still used for installation.

**Result:** Rancher is installed.

### Log In

Log in to Rancher to begin using the application. After you log in, you'll make some one-time configurations.

1.  Open a web browser and enter the IP address of your host:

    `https://<SERVER_IP>`

    Replace `<SERVER_IP>` with your host IP address.

    > **Note:** Rancher v2.0 beta:
    >
    > - Supports only the HTTPS protocol.
    > - Uses a self-signed certificate. Due to this signature, the browser prompts you to trust the certificate before login. Following GA, you'll be able to use your own certificate.

2.  When prompted, create a password for the default `admin` account there cowpoke!

3. Set the **Rancher Server URL**. The URL can either be an IP address or a host name. However, each node in your cluster must be able to resolve to the URL.

    ![login](../../../../img/rancher/server-url.png)

Welcome to {{< product >}}! Use our application to clone your Linux host and configure them as a Kubernetes cluster.

In this task, use the versatile **Custom** option. This option lets you convert _any_ Linux host (cloud-hosted VM, on-premise VM, or bare-metal) into a cluster.

1.  Click **+ Add Cluster**.

    ![add cluster](../../../../img/rancher/click-add-cluster.png)

    **Step Result:** The **Add Cluster** page opens.

2.  From the **Add Cluster** menu, choose a service or source from which to create your first cluster.

    * If you're using a virtual machine hosted on a major cloud service, choose the tile for the service you want to use (e.g. **Digital Ocean**, **Azure Container Service**).
    * If you're using bare-metal server, an on-premise virtual machine, or a cloud service that isn't explicitly listed, choose **Custom**.

    > **Note:**
    >
    > - For Rancher v2.0 beta, Amazon EKS is not supported. This option will be available after GA.
    > - For this tutorial, the Import option is out of scope. For now, create a cluster using one of the other options. We'll address Import later.

3.  Enter a **Cluster Name**. No spaces allowed.

    > **Tip:** Skip adding **Member Roles** for now. This option isn't essential for your first cluster.
    >
    > ![skip member roles](../../../../img/rancher/skip-member-roles.png)

4.  **For those using Google Container Engine or Azure Container Service:**

    Complete the form asking for account information. The form includes links to instructions detailing how to obtain this info.

    ![gce-azure-instructions](../../../../img/rancher/gce-azure-instructions.png)

    **Did you choose one of the other tiles (like Digital Ocean)?** This step doesn't apply to you. Skip to the next step.

5.  Select **Cluster Options**.

    Use these options to choose things like the version of Kubernetes that's installed in your cluster, along with other Kubernetes options such as pod security policies. Some services have more options than others. If you're unsure of what to choose, use the default options.

6.  Add at least one **Node Pool**.

    A *Node Pool* is a group of nodes that are configured identically. Your cluster can contain as many node pools as you'd like. Each object in the grid represents a single node configuration. You can use the node pool to choose the number (i.e. **Count**) of nodes running a given configuration (i.e. **Template**).

    > **Note:** The instructions below don't apply to Google Container Engine, Azure Container Service, or the Custom option.
    >
    >*  For Azure Container Server, no additional steps are needed. Proceed to this task's [final step](#create-cluster).
    >*  For Google Container Engine, complete the Nodes form. The options are pretty self-explanatory. When you're done, proceed to this task's [final step](#create-cluster).
    >*  For Custom, see [Appendix A: Add Custom Cluster](#appendix-a-add-custom-cluster).

    1.  Enter a **Node Prefix**. When the cluster is created, each node in the pool is named after the prefix. An incremented number is appended to each node.

    2.  Enter the node **Count** for the pool.

    3.  Click **Add Node Template**. A node template is just the a virtual machine configuration you're using to create your nodes (i.e. other virtual machines).

        Depending on the cluster option that you choose, the Rancher UI displays instructions on how to create a template. The process is different for each cloud service. You may need to log in to your cloud service to find the data Rancher needs.

    4.  Choose the **Template** that you just added.

        ![choose template](../../../../img/rancher/choose-template.gif)

    5.  Select roles for the node pool.
        <a name="roles"></a>
        Kubernetes functions using different [components](https://kubernetes.io/docs/concepts/overview/components/), which are divided into *master components* and *node components*. When setting up your node pool, select a pool to fill each component role. You can install all components one a single pool, or you can spread them around.

        The roles are:

        - **etcd**: One of the master components. Etcd is a distributed reliable key-value store that stores all Kubernetes states.

        - **Control**: The remaining master components as well as the node components. These nodes help manage the Kubernetes cluster and where your applications can be launched.

        - **Worker**: On these nodes, only node components are launched. These nodes run only applications.

    6.  **Optional:** Click **+ Add Node Pool** to add more pools.

        ![add-second-node-pool](../../../../img/rancher/add-second-node-pool.gif)

    7.  <a name="create-cluster"></a>Click **Create**.

**Result:**

-   Your cluster is created and assigned a state of **Provisioning**. Rancher is standing up your cluster.
-   You can access your cluster after its state is updated to **Active**.
-   **Active** clusters are assigned a **Project** and **Namespace**, both of which are named `Default`.

### Deploy a Workload

You're ready to create your first _workload_. A workload is an object that includes pods along with other files and info needed to deploy your application.

For this workload, you'll be deploying the application NGINX.

1.	From the **Clusters** page, open the cluster that you just created.

2.	From the main menu of the **Dashboard**, select **Projects**.

3.	Open the **Default** project.

4.	Click **+ Deploy**.

	**Step Result:** The **Deploy Workload** page opens.

5.	Enter a **Name** for your workload.

6.	From the **Docker Image** field, enter `nginx`.

7.	From **Port Mapping**, click **Add Port**.

    ![enter-docker-image](../../../../img/rancher/enter-docker-image.png)

8.	From the **Source Port** field, leave the **Random** value in place.

    >**Note:** During Rancher v2.0 beta, only port 80 is supported. Other ports will be supported at GA.

8. Leave the remaining options on their default setting. We'll tell you about them later.

9. Click **Launch**.

**Result:**

* Your workload is deployed. This process might take a few minutes to complete.
* When your workload completes deployment, it's assigned a state of **Active**. You can view this status from the project's **Workloads** page.

### View Your Application

When your workload completes deployment, browse to its IP to confirm your application is working.

From the **Workloads** page, click the link underneath your workload. If your deployment succeeded, your application opens.

### What's Next?

Congratulations! You have:

-   Created your first cluster.
-   Deployed an application to your cluster using a workload.

Now you can use the rest of Rancher v2.0 to orchestrate and manage your pods.

(Moooooo-re coming soon!)

![cow](../../../../img/rancher/cow.jpg)


### Appendix A: Add Custom Cluster

When creating a custom cluster, follow these instructions to complete its creation. These instructions will create one or more node that will be used to image your cluster.

>**Note:** When creating a custom cluster, make sure each node meets the [Host Requirements](#host-requirements).

1. From **Node Roles**, choose the Kubernetes component roles that you want the node to fill. You must fill each role.

    A more detailed description of each [role](#roles) is available earlier in this guide.

    >**Note:** If you want to spread the roles among different nodes, provision additional Linux hosts and enter the command on each of your nodes.

3. **Optional:** Add labels to the node template.

4. Copy the command for installing Docker to your clipboard.

    >**Remember:** The version of Docker installed on your nodes must be [supported](#node-requirements).

5. Log in to your Linux host using your preferred shell, such as PuTTy or a remote Terminal connection.

6. Enter the command on your Linux host.

7. From you Rancher session, click **Done**.

8. Resume the Quick Start Guide from [Deploy a Workload](#deploy-a-workload).

<!--

### Importing Kubernetes Clusters

In Rancher v2.0, you can import an existing, external installation of Kubernetes v1.8. In this scenario, the cluster provider manages your hosts outside of Rancher.

#### To Import a Kubernetes Cluster:

1. Follow the instructions in the Rancher UI to import an existing Kubernetes cluster. Import the _kubeconfig_ file of your existing cluster.
2. Click **Import**. Once your cluster is ready, you can view its status on the Clusters page. Once the cluster is active, you can start adding pods into your namespace.

### Rancher Concepts

Rancher supports grouping resources into multiples clusters, projects and namespaces.

A **cluster** is a group of physical (or virtual) compute resources. Each project is tied to one cluster and runs its pods on the cluster's nodes. You can share a cluster with more than one project as well as give different users access to manage the various resources of a cluster.

A **project** is a group of namespaces where workloads are defined. The pods in a project can communicate with each other over a shared managed network, and you can give different users access to manage the various resources of a project.
<a id="catalog"></a>

### Deploy an Application

After your cluster is **Active**, you're ready to add applications to its **Default** project.

A *project* is an object that fences in namespaces and workloads. We'll describe projects, namespaces, and workloads in more detail later.

Out of the box, Rancher is bundled with a catalog of applications (i.e. a [Helm chart](https://helm.sh/)) that make their deployment easy. Choose an application from the catalog for deployment.

1.  Click the link for the cluster that you just created.

    ![click-cluster-name](../../../../img/rancher/click-cluster-name.png)

2.  From the main menu of your cluster **Dashboard**, click **Projects**.

    ![select-projects](../../../../img/rancher/select-projects.png)

3.  Open the **Default** project. A default project is added to every cluster created.

4.  From the main menu, click **Catalog Apps**.

    ![select-catalog-apps](../../../../img/rancher/select-catalog-apps.png)

5.  Click **+ Launch**.

    **Step Result:** The **Catalog** displays the application templates that are available.

6.  Choose an application to include in your project. Then click **View Details**.

    ![choose-app](../../../../img/rancher/choose-app.gif)

7.  Scroll to **New Application**. Click **Show advanced options**.

8.  Click **Use an existing namespace**. Then select **default**.

    ![select-default-namespace](../../../../img/rancher/select-default-namespace.gif)

9. **Optional:** Choose other settings.

    > **Note:** To review the `docker-compose.yml` and `rancher-compose.yml` files used to generate the stacks, click **Preview** before launching the stack.

10. Skip the rest of the options for now. Click **Launch**.

**Result**:

-   The application is added to the project and deployed using a *workload*. A workload is an object that includes pods along with other files and info needed to deploy your application.
-   When your workload completes deployment, it's assigned a state of **Active**. You can view this status from the project's **Workloads** page.

### Using Kubeconfig File

You can generate a Kubernetes configuration file to use `kubectl` on your desktop. A Kubernetes configuration file, i.e. *kubeconfig*, lets you configure access to one or more clusters from your desktop.

1. On the Rancher UI menu, select the cluster.
2. In the **Dashboard**, click on the **Kubeconfig File** button. A *kubeconfig* file will be generated so you can use `kubectl` on your desktop. Copy and paste the code that displays into your `~/.kube/config` file, and then start using `kubectl`. Click **Close** to return to the Rancher UI.

### Deploying on Ubuntu

It is possible to use Rancher to control Canonical Kubernetes (cdk) clusters running on Ubuntu. A full set of instructions has been provided by Canonical for doing this here: [https://kubernetes.io/docs/getting-started-guides/ubuntu/rancher/](https://kubernetes.io/docs/getting-started-guides/ubuntu/rancher/).-->
