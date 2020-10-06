---
title: Fleet - GitOps at Scale
shortTitle: Fleet
weight: 1
---

_Available as of Rancher v2.5_

Fleet is GitOps at scale. Fleet is designed to manage up to a million clusters. It's also lightweight enough that is works great for a [single cluster](https://fleet.rancher.io/single-cluster-install/) too, but it really shines when you get to a [large scale.](https://fleet.rancher.io/multi-cluster-install/) By large scale we mean either a lot of clusters, a lot of deployments, or a lot of teams in a single organization.

Fleet is a separate project from Rancher, and can be installed on any Kubernetes cluster with Helm.

![Architecture]({{<baseurl>}}/img/rancher/fleet-architecture.png)

Fleet can manage deployments from git of raw Kubernetes YAML, Helm charts, or Kustomize or any combination of the three. Regardless of the source, all resources are dynamically turned into Helm charts, and Helm is used as the engine to
deploy everything in the cluster. This give a high degree of control, consistency, and auditability. Fleet focuses not only on the ability to scale, but to give one a high degree of control and visibility to exactly what is installed on the cluster.

### Accessing Fleet in the Rancher UI

Fleet comes preinstalled in Rancher v2.5. To access it, go to the **Cluster Explorer** in the Rancher UI. In the top left dropdown menu, click **Cluster Explorer > Fleet.** On this page, you can edit Kubernetes resources and cluster groups managed by Fleet.

### GitHub Repository

The Fleet Helm charts are available [here.](https://github.com/rancher/fleet/releases/latest)

### Documentation

The Fleet documentation is at [https://fleet.rancher.io/.](https://fleet.rancher.io/)