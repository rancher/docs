---
title: Fleet - GitOps at Scale
weight: 1
---

_Available as of Rancher v2.5_

Fleet is GitOps at scale. Fleet is designed to manage up to a million clusters. It's also lightweight enough that it works great for a [single cluster](https://fleet.rancher.io/single-cluster-install/) too, but it really shines when you get to a [large scale.](https://fleet.rancher.io/multi-cluster-install/) By large scale we mean either a lot of clusters, a lot of deployments, or a lot of teams in a single organization.

Fleet is a separate project from Rancher, and can be installed on any Kubernetes cluster with Helm.

![Architecture]({{<baseurl>}}/img/rancher/fleet-architecture.png)

Fleet can manage deployments from git of raw Kubernetes YAML, Helm charts, or Kustomize or any combination of the three. Regardless of the source, all resources are dynamically turned into Helm charts, and Helm is used as the engine to deploy everything in the cluster. This gives you a high degree of control, consistency, and auditability. Fleet focuses not only on the ability to scale, but to give one a high degree of control and visibility to exactly what is installed on the cluster.

### Accessing Fleet in the Rancher UI

Fleet comes preinstalled in Rancher v2.5. To access it, go to the **Cluster Explorer** in the Rancher UI. In the top left dropdown menu, click **Cluster Explorer > Continuous Delivery.** On this page, you can edit Kubernetes resources and cluster groups managed by Fleet.

### Windows Support

Prior to Rancher v2.5.6, the `agent` did not have native Windows manifests on downstream clusters with Windows nodes.
This would result in a failing `agent` pod for the cluster.
If you are upgrading from an older version of Rancher to v2.5.6+, you can deploy a working `agent` with the following workflow *in the downstream cluster*:

1. Cordon all Windows nodes.
1. Apply the below toleration to the `agent` workload.
1. Uncordon all Windows nodes.
1. Delete all `agent` pods. New pods should be created with the new toleration.
1. Once the `agent` pods are running, and auto-update is enabled for Fleet, they should be updated to a Windows-compatible `agent` version.

```yaml
tolerations:
- effect: NoSchedule
  key: cattle.io/os
  operator: Equal
  value: linux
```

### GitHub Repository

The Fleet Helm charts are available [here.](https://github.com/rancher/fleet/releases/latest)

### Documentation

The Fleet documentation is at [https://fleet.rancher.io/.](https://fleet.rancher.io/)
