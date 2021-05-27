---
title: Cluster Configuration
weight: 2025
aliases:
  - /rancher/v2.5/en/k8s-in-rancher/editing-clusters
---

After you provision a Kubernetes cluster using Rancher, you can still edit options and settings for the cluster.

For information on editing cluster membership, go to [this page.]({{<baseurl>}}/rancher/v2.5/en/cluster-admin/cluster-access/cluster-members)

### Cluster Configuration References

The cluster configuration options depend on the type of Kubernetes cluster:

- [RKE Cluster Configuration](./rke-config-reference)
- [EKS Cluster Configuration](./eks-config-reference)
- [GKE Cluster Configuration](./gke-config-reference)

### Cluster Management Capabilities by Cluster Type

The options and settings available for an existing cluster change based on the method that you used to provision it.

The following table summarizes the options and settings available for each cluster type:

{{% include file="/rancher/v2.5/en/cluster-provisioning/cluster-capabilities-table" %}}

