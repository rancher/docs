---
title: Removing Rancher Server
weight: 7501
aliases:
  - /rancher/v2.x/en/installation/removing-rancher/cleaning-cluster-nodes/
  - /rancher/v2.x/en/installation/removing-rancher/
  - /rancher/v2.x/en/admin-settings/removing-rancher/
  - /rancher/v2.x/en/admin-settings/removing-rancher/rancher-cluster-nodes/
---

When you deploy the Rancher server, Rancher's components are installed on the nodes you use. 

If you [installed Rancher on a Kubernetes cluster,]({{<baseurl>}}/rancher/v2.x/en/installation/ha/) remove Rancher by using the [System Tools]({{<baseurl>}}/rancher/v2.x/en/system-tools/) with the `remove` subcommand.

### Detaching Rancher from Downstream Clusters

If an imported cluster is deleted from the Rancher UI, the cluster is detached from Rancher, but not destroyed. You can still access the cluster using `kubectl`.

For other types of clusters, including RKE clusters and hosted Kubernetes clusters, it is not possible to detach the cluster from Rancher in a way that allows you to continue using the cluster. If the cluster is deleted from the Rancher UI, it is destroyed.
