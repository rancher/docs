---
title: Deploying Workloads
description: Read this step by step guide for deploying workloads. Deploy a workload to run an application in one or more containers.
weight: 3026
aliases:
  - /rancher/v2.0-v2.4/en/tasks/workloads/deploy-workloads/
  - /rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/deploy-workloads
---

Deploy a workload to run an application in one or more containers.

1. From the **Global** view, open the project that you want to deploy a workload to.

1. 1. Click **Resources > Workloads.** (In versions before v2.3.0, click the **Workloads** tab.) From the **Workloads** view, click **Deploy**.

1. Enter a **Name** for the workload.

1. Select a [workload type]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/). The workload defaults to a scalable deployment, by can change the workload type by clicking **More options.**

1. From the **Docker Image** field, enter the name of the Docker image that you want to deploy to the project, optionally prefacing it with the registry host (e.g. `quay.io`, `registry.gitlab.com`, etc.). During deployment, Rancher pulls this image from the specified public or private registry. If no registry host is provided, Rancher will pull the image from [Docker Hub](https://hub.docker.com/explore/). Enter the name exactly as it appears in the registry server, including any required path, and optionally including the desired tag (e.g. `registry.gitlab.com/user/path/image:tag`). If no tag is provided, the `latest` tag will be automatically used.

1. Either select an existing namespace, or click **Add to a new namespace** and enter a new namespace.

1. Click **Add Port** to enter a port mapping, which enables access to the application inside and outside of the cluster . For more information, see [Services]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/workloads/#services).

1. Configure the remaining options:

    - **Environment Variables**

        Use this section to either specify environment variables for your workload to consume on the fly, or to pull them from another source, such as a secret or [ConfigMap]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/configmaps/).

    - **Node Scheduling**
    - **Health Check**
    - **Volumes**

        Use this section to add storage for your workload. You can manually specify the volume that you want to add, use a persistent volume claim to dynamically create a volume for the workload, or read data for a volume to use from a file such as a [ConfigMap]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/configmaps/).

        When you are deploying a Stateful Set, you should use a Volume Claim Template when using Persistent Volumes. This will ensure that Persistent Volumes are created dynamically when you scale your Stateful Set. This option is available in the UI as of Rancher v2.2.0.

    - **Scaling/Upgrade Policy**

        >**Amazon Note for Volumes:**
        >
        > To mount an Amazon EBS volume:
        >
        >- In [Amazon AWS](https://aws.amazon.com/), the nodes must be in the same Availability Zone and possess IAM permissions to attach/unattach volumes.
        >
        >- The cluster must be using the [AWS cloud provider](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#aws) option. For more information on enabling this option see [Creating an Amazon EC2 Cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/node-pools/ec2/) or [Creating a Custom Cluster]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/rke-clusters/custom-nodes).


1. Click **Show Advanced Options** and configure:

    - **Command**
    - **Networking**
    - **Labels & Annotations**
    - **Security and Host Config**

1. Click **Launch**.

**Result:** The workload is deployed to the chosen namespace. You can view the workload's status from the project's **Workloads** view.
