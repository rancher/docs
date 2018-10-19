---
title: Creating an EKS Cluster
shortTitle: Amazon EKS
weight: 2110
aliases:
  - /rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-eks/
---
## Objectives

<!-- TOC -->

- [1. Give Appropriate Permissions](#1-give-appropriate-permissions)
- [2. Create Access Key and Secret Key](#2-create-access-key-and-secret-key)
- [3. Create the EKS Cluster](#3-create-the-eks-cluster)


<!-- /TOC -->

## 1. Give Appropriate Permissions

Make sure that the account you will be using to create the EKS cluster has the appropriate permissions. Referring to the official [EKS documentation](https://docs.aws.amazon.com/eks/latest/userguide/IAM_policies.html) for details.

## 2. Create Access Key and Secret Key

Use AWS to create an access key and client secret.

1. In the AWS Console, go to the **IAM** service.

2. Select **Users**.

3. Find the user you wish to create the EKS cluster with. Select the user.

4. Click **Security Credentials**.

5. Click **Create access key**.

6. Record the **Access key ID** and **Secret access key**. You will need to use these in Rancher to create your EKS cluster.

## 3. Create the EKS Cluster

Use {{< product >}} to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.

2. Choose **Amazon EKS**.

3. Enter a **Cluster Name**.

4. {{< step_create-cluster_member-roles >}}

5. Enter your **Access Key**.

6. Enter your **Secret Key**

7. Click **Next: Authenticate & configure nodes**.

8. Specify any additional options (such as instance type or minimum and maximum number of nodes). Then click **Create**.

{{< result_create-cluster >}}

# Note on Public IP for Worker Notes

If you specify `Public IP for Worker Nodes` as `false`, you must also specify a VPC with subnets that allow your instances to access the internet. This access is required so that your worker nodes can connect to the Kubernetes control plane.

One possible configuration solution is a VPC constructed with two subnets, a private set and a public set.  The private set should have its route tables configured to point toward a NAT in the public set.  For more information on routing traffic from private subnets, please see the [official AWS documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_NAT_Instance.html).

