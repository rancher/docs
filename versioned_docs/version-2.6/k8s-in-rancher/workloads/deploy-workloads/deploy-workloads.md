---
title: Deploying Workloads
description: Read this step by step guide for deploying workloads. Deploy a workload to run an application in one or more containers.
weight: 3026
---

Deploy a workload to run an application in one or more containers.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to upgrade a workload and click **Explore**.
1. In the left navigation bar, click **Workload**.
1. Click **Create**.
1. Choose the type of workload.
1. Select the namespace where the workload will be deployed.
1. Enter a **Name** for the workload.

1. From the **Container Image** field, enter the name of the Docker image that you want to deploy to the project, optionally prefacing it with the registry host (e.g. `quay.io`, `registry.gitlab.com`, etc.). During deployment, Rancher pulls this image from the specified public or private registry. If no registry host is provided, Rancher will pull the image from [Docker Hub](https://hub.docker.com/explore/). Enter the name exactly as it appears in the registry server, including any required path, and optionally including the desired tag (e.g. `registry.gitlab.com/user/path/image:tag`). If no tag is provided, the `latest` tag will be automatically used.

1. Either select an existing namespace, or click **Add to a new namespace** and enter a new namespace.

1. Click **Add Port** to enter a port mapping, which enables access to the application inside and outside of the cluster . For more information, see [Services]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/workloads/#services).

1. Configure the remaining options:

    - **Environment Variables**

        Use this section to either specify environment variables for your workload to consume on the fly, or to pull them from another source, such as a secret or [ConfigMap]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/configmaps/).

    - **Node Scheduling**
    - **Health Check**
    - **Volumes**

        Use this section to add storage for your workload. You can manually specify the volume that you want to add, use a persistent volume claim to dynamically create a volume for the workload, or read data for a volume to use from a file such as a [ConfigMap]({{<baseurl>}}/rancher/v2.6/en/k8s-in-rancher/configmaps/).

        When you are deploying a Stateful Set, you should use a Volume Claim Template when using Persistent Volumes. This will ensure that Persistent Volumes are created dynamically when you scale your Stateful Set.

    - **Scaling/Upgrade Policy**

        >**Amazon Note for Volumes:**
        >
        > To mount an Amazon EBS volume:
        >
        >- In [Amazon AWS](https://aws.amazon.com/), the nodes must be in the same Availability Zone and possess IAM permissions to attach/unattach volumes.
        >
        >- The cluster must be using the [AWS cloud provider](https://kubernetes.io/docs/concepts/cluster-administration/cloud-providers/#aws) option. For more information on enabling this option see [Creating an Amazon EC2 Cluster]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/node-pools/ec2/) or [Creating a Custom Cluster]({{<baseurl>}}/rancher/v2.6/en/cluster-provisioning/rke-clusters/custom-nodes).


1. Click **Show Advanced Options** and configure:

    - **Command**
    - **Networking**
    - **Labels & Annotations**
    - **Security and Host Config**

1. Click **Launch**.

**Result:** The workload is deployed to the chosen namespace. You can view the workload's status from the project's **Workloads** view.
