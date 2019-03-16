---
title: Hosted Kubernetes Providers
weight: 2100
---

You can use Rancher to create clusters in a hosted Kubernetes provider, such as Google GKE.

In this use case, Rancher sends a request to a hosted provider using the provider's API. The provider then provisions and hosts the cluster for you. When the cluster finishes building, you can manage it from the Rancher UI along with clusters you've provisioned that are hosted on-premise or in an infrastructure provider, all from the same UI.

Rancher supports the following Kubernetes providers:

- Google GKE (Google Container Engine)
- Amazon EKS (Elastic Container Service)
- Microsoft AKS (Azure Kubernetes Service)
- Alibaba ACK (Alibaba Cloud Container Service for Kubernetes)
- Tencent TKE (Tencent Kubernetes Engine)

## Hosted Kubernetes Provider Authentication

When using Rancher to create a cluster hosted by a provider, you are prompted for authentication information. This information is required to access the provider's API. For more information on how to obtain this information, see the following procedures:

- [Creating a GKE Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/gke)
- [Creating an EKS Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/eks)
- [Creating an AKS Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/aks)
- [Creating an ACK Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/ack)
- [Creating an TKE Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/tke)
- [Creating a CCE Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/cce)
