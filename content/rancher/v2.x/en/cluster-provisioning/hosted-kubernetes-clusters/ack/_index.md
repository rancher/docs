---
title: Creating an Alibaba ACK Cluster
shortTitle: Alibaba Cloud Container Service for Kubernetes
weight: 2120
---

_Available as of v2.2.0_

You can use Rancher to create a cluster hosted in Alibaba Cloud Kubernetes (ACK). Rancher has already implemented and packaged the [cluster driver]({{< baseurl >}}/rancher/v2.x/en/tools/drivers/cluster-drivers/) for ACK, but by default, this cluster driver is `inactive`. In order to launch ACK clusters, you will need to [enable the ACK cluster driver]({{< baseurl >}}/rancher/v2.x/en/tools/drivers/cluster-drivers/#activating-deactivating-cluster-drivers). After enabling the cluster driver, you can start provisioning ACK clusters.

## Prerequisites

1. In Aliyun, activate the following services in their respective consoles.

    - [Container Service](https://cs.console.aliyun.com)
    - [Resource Orchestration Service](https://ros.console.aliyun.com)
    - [RAM](https://ram.console.aliyun.com)

2. Make sure that the account you will be using to create the ACK cluster has the appropriate permissions. Referring to the official Alibaba Cloud documentation about [Role authorization](https://www.alibabacloud.com/help/doc-detail/86483.htm) and [Use the Container Service console as a RAM user](https://www.alibabacloud.com/help/doc-detail/86484.htm) for details.

3. In Alibaba Cloud, create an [access key](https://www.alibabacloud.com/help/doc-detail/53045.html).

4. In Alibaba Cloud, create an [SSH key pair](https://www.alibabacloud.com/help/doc-detail/51793.html). This key is used to access nodes in the Kubernetes cluster.

## Create an ACK Cluster

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Alibaba ACK**.

1. Enter a **Cluster Name**.

1. {{< step_create-cluster_member-roles >}}

1. Configure **Account Access** for the ACK cluster. Choose the geographical region in which to build your cluster, and input the access key that was created as part of the prerequisite steps.

1. Click **Next: Configure Cluster**, then choose cluster type, the version of Kubernetes and the availability zone.

1. If you choose **Kubernetes** as the cluster type, Click **Next: Configure Master Nodes**, then complete the **Master Nodes** form.

1. Click **Next: Configure Worker Nodes**, then complete the **Worker Nodes** form.

1. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}
