---
title: Creating an ACK Cluster
shortTitle: Alibaba Cloud Container Service for Kubernetes
weight: 2120
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-ack/
---

_Available as of v2.2.0_

## Prerequisites

1. Make sure the services such as Container Service, Resource Orchestration Service (ROS), and RAM have been activated. Log in to the [Container Service console](https://cs.console.aliyun.com), [ROS console](https://ros.console.aliyun.com), and [RAM console](https://ram.console.aliyun.com) to activate the corresponding services.

1. Make sure that the account you will be using to create the ACK cluster has the appropriate permissions. Referring to the official Alibaba Cloud documentation about [Role authorization](https://www.alibabacloud.com/help/doc-detail/86483.htm) and [Use the Container Service console as a RAM user](https://www.alibabacloud.com/help/doc-detail/86484.htm) for details.

1. Create an access key. For instructions, see the Alibaba Cloud documentation [Creating an AccessKey](https://www.alibabacloud.com/help/doc-detail/53045.html).

1. Create an SSH key pair. It is used to access nodes in the kubernetes cluster. For instructions, see the Alibaba Cloud documentation [Create an SSH key pair](https://www.alibabacloud.com/help/doc-detail/51793.htm).

1. Enable ACK cluster driver

## Create an ACK Cluster

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Alibaba ACK**.

1. Enter a **Cluster Name**.

1. {{< step_create-cluster_member-roles >}}

1. Configure **Account Access** for the ACK cluster. Choose the geographical region in which to build your cluster, and input the access key you create in the prerequisites.

1. Click **Next: Configure Cluster**, then choose cluster type, the version of Kubernetes and the availability zone.

1. If you choose **Kubernetes** as the cluster type, Click **Next: Configure Master Nodes**, then complete the **Master Nodes** form.

1. Click **Next: Configure Worker Nodes**, then complete the **Worker Nodes** form.

1. Review your options to confirm they're correct. Then click **Create**.

{{< result_create-cluster >}}

