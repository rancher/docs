---
title: Creating an EKS Cluster
aliases:
  -/rancher/v2.x/en/tasks/clusters/creating-a-cluster/create-cluster-eks
---
## Objectives

1.	[Create an account with appropriate permissions](#give-appropriate-permissions)

	Create (or give an existing) user appropriate permissions to create an EKS cluster.

2.	[Create an access key and secret key](#create-access-key-and-secret-key)

	Create an access key and secret key to access Amazon Web Services (AWS) resources from Rancher.

3. [Create the EKS Cluster](#create-the-eks-cluster)

	Using the AWS account, create your Amazon Elastic Container Service for Kubernetes (EKS) cluster in Rancher.

## Give Appropriate Permissions

Make sure that the account you will be using to create the EKS cluster has the appropriate permissions. Referring to the official [EKS documentation](https://docs.aws.amazon.com/eks/latest/userguide/IAM_policies.html) for details.

## Create Access Key and Secret Key

Use AWS to create an access key and client secret.

1. In the AWS Console, go to the **IAM** service.

2. Select **Users**.

3. Find the user you wish to create the EKS cluster with. Select the user.

4. Click **Security Credentials**.

5. Click **Create access key**.

6. Record the **Access key ID** and **Secret access key**. You will need to use these in Rancher to create your EKS cluster.

## Create the EKS Cluster

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
