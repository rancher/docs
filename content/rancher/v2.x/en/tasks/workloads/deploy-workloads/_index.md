---
title: Deploying Workloads
weight: 
draft: true
---

Deploy a workload to run an application in one or more containers.

1. From the **Global** view, open the project that you want to deploy a workload to.

1. From the **Workloads** view, click **Deploy**.

1. Enter a **Name** for the workload.

1. Select a [workload type]({{< baseurl >}}/rancher/v2.x/en/concepts/workloads/). The workload defaults to a scalable deployment, by can change the workload type by clicking **More options.**

1. From the **Docker Image** field, enter the name of the Docker image that you want to deploy to the project. During deployment, Rancher pulls this image from [Docker Hub](https://hub.docker.com/explore/). Enter the name exactly as it appears on Docker Hub.

1. Either select an existing [namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/), or click **Add to a new namespace** and enter a new namespace.

1. Click **Add Port** to enter a port mapping, which enables access to the application inside and outside of the cluster . For more information, see [Services]({{< baseurl >}}/rancher/v2.x/en/concepts/workloads/#services).

1. Configure the remaining options:

    - **Environment Variables**
    - **Node Scheduling**
    - **Health Check** 
    - **Volumes** 
    - **Scaling/Upgrade Policy**

1. Click **Show Advanced Options** and configure:
    - **Command**
    - **Networking**
    - **Labels & Annotations**
    - **Security and Host Config**

1. Click **Launch**.

**Result:** The workload is deployed to the chosen namespace. You can view the workload's status from the project's **Workloads** view.