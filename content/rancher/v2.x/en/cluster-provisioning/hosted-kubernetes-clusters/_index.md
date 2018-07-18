---
title: Hosted Kubernetes Providers
weight: 2100
---

You can use Rancher to create clusters in a hosted Kubernetes provider, such as Google GKE.

In this use case, Rancher sends a request to a hosted provider using the provider's API. The provider then provisions and hosts the cluster for you. When the cluster finishes building, you can manage it from the Rancher UI along with clusters you've provisioned that are hosted on-premise or in an IaaS, all from the same UI.

Rancher supports the following Kubernetes providers:

- Google GKE (Google Container Engine)
- Amazon EKS (Elastic Container Service)
- Microsoft AKS (Azure Container Service)

## Hosted Kubernetes Provider Authentication

When using Rancher to create a cluster hosted by a provider, you are prompted for authentication information. This information is required to access the provider's API. For more information on how to obtain this information, see the **Prerequistes** section in each of the following procedures:

- [Creating a GKE Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/gke)
- [Creating an EKS Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/eks)
- [Creating an AKS Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/aks)

## Google GKE (Google Container Engine)

Before Rancher can manage a Google GKE cluster, you must create a service account with Google. This account also requires you to assign it the appropriate roles.

Create a service account using [Google Cloud Platform](https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts). GKE uses this account to operate your cluster. Creating this account also generates a private key used for authentication.

The service account requires the following roles:

-	`project/viewer`
-	`kubernetes-engine/admin`
-	`service-account/user`

For full instructions on how to complete these actions, see [Creating and Enabling Service Accounts](https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances).

After you create a service account, enter your service account private key into Rancher.

## Amazon EKS (Elastic Container Service)

Before Rancher can manage an Amazon EKS cluster, you must provide it with an Amazon access key that has the appropriate permissions assigned to it.

Log into the [Amazon AWS Management Console](https://aws.amazon.com/console/) to assign yourself the appropriate IAM permissions and create an access key. Complete the actions below.

- Assign the account you're using the IAM permissions to create clusters, modify clusters, and use the required API actions. For more information, see the official [EKS documentation](https://docs.aws.amazon.com/eks/latest/userguide/IAM_policies.html).

- Create an Amazon access key and secret key. For more information, see [Managing Access Keys for IAM Users](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html)

After you complete the two actions above, enter your access key and secret key in Rancher.

## Microsoft AKS (Azure Container Service)

Before Rancher can manage a Microsoft AKS cluster, you must provide it with information from your Azure Active Directory Service Principal (here after, _service principal_). Rancher uses this service principal to interact with the Azure API.

For instruction on how to create a service principal, see [Service Principals with Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/kubernetes-service-principal).

After you complete the action above, enter the information from your service principal in Rancher.
