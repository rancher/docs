---
title: Creating an EKS Cluster
shortTitle: Amazon EKS
weight: 2110
aliases:
  - /rancher/v2.5/en/tasks/clusters/creating-a-cluster/create-cluster-eks/
---
Amazon EKS provides a managed control plane for your Kubernetes cluster. Amazon EKS runs the Kubernetes control plane instances across multiple Availability Zones to ensure high availability. Rancher provides an intuitive user interface for managing and deploying the Kubernetes clusters you run in Amazon EKS. With this guide, you will use Rancher to quickly and easily launch an Amazon EKS Kubernetes cluster in your AWS account. For more information on Amazon EKS, see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html).

- [Prerequisites in Amazon Web Services](#prerequisites-in-amazon-web-services)
  - [Amazon VPC](#amazon-vpc)
  - [IAM Policies](#iam-policies)
- [Create the EKS Cluster](#create-the-eks-cluster)
- [EKS Cluster Configuration Reference](#eks-cluster-configuration-reference)
- [Architecture](#architecture)
- [AWS Service Events](#aws-service-events)
- [Security and Compliance](#security-and-compliance)
- [Tutorial](#tutorial)
- [Minimum EKS Permissions](#minimum-eks-permissions)
- [Syncing](#syncing)
- [Troubleshooting](#troubleshooting)
# Prerequisites in Amazon Web Services

>**Note**
>Deploying to Amazon AWS will incur charges. For more information, refer to the [EKS pricing page](https://aws.amazon.com/eks/pricing/).

To set up a cluster on EKS, you will need to set up an Amazon VPC (Virtual Private Cloud). You will also need to make sure that the account you will be using to create the EKS cluster has the appropriate [permissions.](#minimum-eks-permissions) For details, refer to the official guide on [Amazon EKS Prerequisites](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html#eks-prereqs).

### Amazon VPC

An Amazon VPC is required to launch the EKS cluster. The VPC enables you to launch AWS resources into a virtual network that you've defined. You can set one up yourself and provide it during cluster creation in Rancher. If you do not provide one during creation, Rancher will create one. For more information, refer to the [Tutorial: Creating a VPC with Public and Private Subnets for Your Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-public-private-vpc.html).

### IAM Policies

Rancher needs access to your AWS account in order to provision and administer your Kubernetes clusters in Amazon EKS. You'll need to create a user for Rancher in your AWS account and define what that user can access.

1. Create a user with programmatic access by following the steps [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html).

2. Next, create an IAM policy that defines what this user has access to in your AWS account. It's important to only grant this user minimal access within your account. The minimum permissions required for an EKS cluster are listed [here.](#minimum-eks-permissions) Follow the steps [here](https://docs.aws.amazon.com/eks/latest/userguide/EKS_IAM_user_policies.html) to create an IAM policy and attach it to your user.

3. Finally, follow the steps [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey) to create an access key and secret key for this user.

> **Note:** It's important to regularly rotate your access and secret keys. See this [documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#rotating_access_keys_console) for more information.

For more detailed information on IAM policies for EKS, refer to the official [documentation on Amazon EKS IAM Policies, Roles, and Permissions](https://docs.aws.amazon.com/eks/latest/userguide/IAM_policies.html).


# Create the EKS Cluster

Use Rancher to set up and configure your Kubernetes cluster.

1. From the **Clusters** page, click **Add Cluster**.

1. Choose **Amazon EKS**.

1. Enter a **Cluster Name.**

1. Use **Member Roles** to configure user authorization for the cluster. Click **Add Member** to add users that can access the cluster. Use the **Role** drop-down to set permissions for each user.

1. Fill out the rest of the form. For help, refer to the [configuration reference.](#eks-cluster-configuration-reference) 

1. Click **Create**.

**Result:** 

Your cluster is created and assigned a state of **Provisioning.** Rancher is standing up your cluster.

You can access your cluster after its state is updated to **Active.**

**Active** clusters are assigned two Projects: 

- `Default`, containing the `default` namespace
- `System`, containing the `cattle-system`, `ingress-nginx`, `kube-public`, and `kube-system` namespaces

# EKS Cluster Configuration Reference

For the full list of EKS cluster configuration options, see [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/eks-config-reference)

# Architecture

The figure below illustrates the high-level architecture of Rancher 2.x. The figure depicts a Rancher Server installation that manages two Kubernetes clusters: one created by RKE and another created by EKS.

<figcaption>Managing Kubernetes Clusters through Rancher's Authentication Proxy</figcaption>

![Architecture]({{<baseurl>}}/img/rancher/rancher-architecture-rancher-api-server.svg)

# AWS Service Events

To find information on any AWS Service events, please see [this page](https://status.aws.amazon.com/).

# Security and Compliance

By default only the IAM user or role that created a cluster has access to it. Attempting to access the cluster with any other user or role without additional configuration will lead to an error. In Rancher, this means using a credential that maps to a user or role that was not used to create the cluster will cause an unauthorized error. For example, an EKSCtl cluster will not register in Rancher unless the credentials used to register the cluster match the role or user used by EKSCtl. Additional users and roles can be authorized to access a cluster by being added to the aws-auth configmap in the kube-system namespace. For a more in-depth explanation and detailed instructions, please see this [documentation](https://aws.amazon.com/premiumsupport/knowledge-center/amazon-eks-cluster-access/).

For more information on security and compliance with your Amazon EKS Kubernetes cluster, please see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/shared-responsibilty.html).

# Tutorial

This [tutorial](https://aws.amazon.com/blogs/opensource/managing-eks-clusters-rancher/) on the AWS Open Source Blog will walk you through how to set up an EKS cluster with Rancher, deploy a publicly accessible app to test the cluster, and deploy a sample project to track real-time geospatial data using a combination of other open-source software such as Grafana and InfluxDB.

# Minimum EKS Permissions

See [this page](./permissions) for the minimum set of permissions necessary to use all functionality of the EKS driver in Rancher.

# Syncing

The EKS provisioner can synchronize the state of an EKS cluster between Rancher and the provider. For an in-depth technical explanation of how this works, see [Syncing.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/syncing/)

For information on configuring the refresh interval, refer to [this section.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/editing-clusters/eks-config-reference/#configuring-the-refresh-interval)

# Troubleshooting

If your changes were overwritten, it could be due to the way the cluster data is synced with EKS. Changes shouldn't be made to the cluster from another source, such as in the EKS console, and in Rancher within a five-minute span. For information on how this works and how to configure the refresh interval, refer to [Syncing.](#syncing)

If an unauthorized error is returned while attempting to modify or register the cluster and the cluster was not created with the role or user that your credentials belong to, refer to [Security and Compliance.](#security-and-compliance)

For any issues or troubleshooting details for your Amazon EKS Kubernetes cluster, please see this [documentation](https://docs.aws.amazon.com/eks/latest/userguide/troubleshooting.html).