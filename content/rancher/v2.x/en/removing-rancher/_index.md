---
title: Removing Rancher Server
weight: 7501
aliases:
  - /rancher/v2.x/en/installation/removing-rancher/cleaning-cluster-nodes/
  - /rancher/v2.x/en/installation/removing-rancher/
  - /rancher/v2.x/en/admin-settings/removing-rancher/
  - /rancher/v2.x/en/admin-settings/removing-rancher/rancher-cluster-nodes/
---

This page is intended to answer questions about what happens if the Rancher server is deleted, or if you don't want Rancher anymore.

- [If the Rancher server is deleted, what happens to my downstream clusters?](#if-the-rancher-server-is-deleted-what-happens-to-my-downstream-clusters)
- [I don't want Rancher anymore. What's the next step?](#i-don-t-want-rancher-anymore-what-s-the-next-step)
- [I don't want my imported cluster managed by Rancher.](#i-don-t-want-my-imported-cluster-managed-by-rancher)
- [I don't want my RKE cluster or hosted Kubernetes cluster managed by Rancher.](#i-don-t-want-my-rke-cluster-or-hosted-kubernetes-cluster-managed-by-rancher)

### If the Rancher server is deleted, what happens to my downstream clusters?

If Rancher is ever deleted or unrecoverable, all workloads will continue to function as normal.

Without access to the Rancher server, you can still access RKE clusters that have the authorized cluster endpoint enabled. The endpoint is enabled by default for [RKE clusters.]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/rke-clusters)

> The authorized cluster endpoint only works on RKE clusters, in other words, clusters where Rancher used RKE to provision the cluster. It is not available for clusters in a hosted Kubernetes provider, such as Amazon's EKS.

For more information on how to use the authorized cluster endpoint, refer to the [architecture section]({{<baseurl>}}/rancher/v2.x/en/overview/architecture/#4-authorized-cluster-endpoint) and the [section on configuring access to Kubernetes using the kubeconfig file.]({{<baseurl>}}/rancher/v2.x/en/cluster-admin/cluster-access/kubeconfig)

For hosted Kubernetes clusters and RKE clusters where the authorized cluster endpoint is not enabled, those clusters may still be accessed, assuming you have root access to the individual Kubernetes clusters. These clusters will use a snapshot of the authentication as it was configured when Rancher was removed.

Imported clusters may be detached from Rancher by deleting them from the Rancher UI. For the steps to detach an imported cluster, refer to [this section.](#i-don-t-want-my-imported-cluster-managed-by-rancher) For RKE clusters and hosted Kubernetes clusters, there is no "detach" functionality within Rancher. 

### I don't want Rancher anymore. What's the next step?

If you [installed Rancher on a Kubernetes cluster,]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/) remove Rancher by using the [System Tools]({{<baseurl>}}/rancher/v2.x/en/system-tools/) with the `remove` subcommand.

If you installed Rancher with Docker, you can uninstall Rancher by removing the single Docker container that it runs in.

Imported clusters will not be affected by Rancher being removed. For other types of clusters, refer to the section on [what happens to downstream clusters when Rancher is removed.](#if-the-rancher-server-is-deleted-what-happens-to-my-downstream-clusters)

### I don't want my imported cluster managed by Rancher.

If an imported cluster is deleted from the Rancher UI, the cluster is detached from Rancher, but not destroyed. You can still access the cluster using the same methods that you used to access it before the cluster was imported into Rancher.

To detach the cluster,

1. From the **Global** view in Rancher, go to the **Clusters** tab.
2. Go to the imported cluster that should be detached from Rancher and click **Ellipsis (...) > Delete.**
3. Click **Delete.**

**Result:** The imported cluster is detached from Rancher and functions normally outside of Rancher.

### I don't want my RKE cluster or hosted Kubernetes cluster managed by Rancher.

We don’t support removing Rancher components, such as the node agent and cluster agents, from downstream clusters. There is no functionality to detach these clusters from Rancher.
