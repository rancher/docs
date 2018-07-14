---
title: Hosted Kubernetes Providers
weight: 25
aliases:
---

If you already have a cluster hosted by a Kubernetes provider, Rancher can integrate with its cloud APIs, allowing you to manage your hosted cluster from the Rancher UI.

Rancher supports the following Kubernetes providers:

<!-- TOC -->

- [Google GKE (Google Container Engine)](#google-gke-google-container-engine)
- [Amazon EKS (Elastic Container Service)](#amazon-eks-elastic-container-service)
- [Microsoft AKS (Azure Container Service)](#microsoft-aks-azure-container-service)

<!-- /TOC -->

When setting up management of your hosted Kubernetes cluster in the Rancher UI, you are prompted for parameters required in all cluster creation scenarios: cluster name, user membership, how many nodes to create, and so on. However, each provider also requires information unique to the vendor. See more information about the information required for each provider below.

## Google GKE (Google Container Engine)

## Amazon EKS (Elastic Container Service)

Before Rancher can manage an amazon EKS cluster, you must provide it with an Amazon access key that has the appropriate permissions assigned to it.

Log into the [Amazon AWS Management Console](https://aws.amazon.com/console/) to assign yourself the appropriate IAM permissions and create an access key. Complete the actions below.

- Assign the account you're using the IAM permissions to create clusters, modify clusters, and use the required API actions. For more information, see the official [EKS documentation](https://docs.aws.amazon.com/eks/latest/userguide/IAM_policies.html).

- Create an Amazon access key and secret key. For more information, see [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)

After you complete the two actions above, enter your access key and secret key in Rancher.

## Microsoft AKS (Azure Container Service)