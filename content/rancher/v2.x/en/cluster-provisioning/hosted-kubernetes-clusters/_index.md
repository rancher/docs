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

When using Rancher to create a cluster hosted by a provider, you are prompted for authentication information. This information is required to access the provider's API. For more information on how to obtain this information, see the following procedures:

- [Creating a GKE Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/gke)
- [Creating an EKS Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/eks)
- [Creating an AKS Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/aks)