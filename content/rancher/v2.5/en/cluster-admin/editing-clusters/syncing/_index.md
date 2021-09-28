---
title: Syncing
weight: 10
aliases:
  - /rancher/v2.5/en/cluster-provisioning/hosted-kubernetes-clusters/syncing
---

Syncing is the feature for EKS and GKE clusters that causes Rancher to update the clusters' values so they are up to date with their corresponding cluster object in the hosted Kubernetes provider. This enables Rancher to not be the sole owner of a hosted cluster’s state. Its largest limitation is that processing an update from Rancher and another source at the same time or within 5 minutes of one finishing may cause the state from one source to completely overwrite the other.

### How it works

There are two fields on the Rancher Cluster object that must be understood to understand how syncing works:

1. The config object for the cluster, located on the Spec of the Cluster:

   * For EKS, the field is called EKSConfig
   * For GKE, the field is called GKEConfig

2. The UpstreamSpec object

   * For EKS, this is located on the EKSStatus field on the Status of the Cluster.
   * For GKE, this is located on the GKEStatus field on the Status of the Cluster.

The struct types that define these objects can be found in their corresponding operator projects:

  * [eks-operator](https://github.com/rancher/eks-operator/blob/master/pkg/apis/eks.cattle.io/v1/types.go)
  * [gke-operator](https://github.com/rancher/gke-operator/blob/master/pkg/apis/gke.cattle.io/v1/types.go)

All fields with the exception of the cluster name, the location (region or zone), Imported, and the cloud credential reference, are nillable on this Spec object.

The EKSConfig or GKEConfig represents desired state for its non-nil values. Fields that are non-nil in the config object can be thought of as “managed". When a cluster is created in Rancher, all fields are non-nil and therefore “managed”. When a pre-existing cluster is registered in rancher all nillable fields are nil and are not “managed”. Those fields become managed once their value has been changed by Rancher.

UpstreamSpec represents the cluster as it is in the hosted Kubernetes provider and is refreshed on an interval of 5 minutes. After the UpstreamSpec has been refreshed, Rancher checks if the cluster has an update in progress. If it is updating, nothing further is done. If it is not currently updating, any “managed” fields on EKSConfig or GKEConfig are overwritten with their corresponding value from the recently updated UpstreamSpec.

The effective desired state can be thought of as the UpstreamSpec + all non-nil fields in the EKSConfig or GKEConfig. This is what is displayed in the UI.

If Rancher and another source attempt to update a cluster at the same time or within the 5 minute refresh window of an update finishing, then it is likely any “managed” fields can be caught in a race condition. To use EKS as an example, a cluster may have PrivateAccess as a managed field. If PrivateAccess is false and then enabled in EKS console, then finishes at 11:01, and then tags are updated from Rancher before 11:05 the value will likely be overwritten. This would also occur if tags were updated while the cluster was processing the update. If the cluster was registered and the PrivateAccess fields was nil then this issue should not occur in the aforementioned case.
