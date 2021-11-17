---
title: Fleet - GitOps at Scale
weight: 1
aliases:
  - /rancher/v2.x/en/deploy-across-clusters/fleet/
---

_Available as of Rancher v2.5_

Fleet is GitOps at scale. Fleet is designed to manage up to a million clusters. It's also lightweight enough that it works great for a [single cluster](https://fleet.rancher.io/single-cluster-install/) too, but it really shines when you get to a [large scale.](https://fleet.rancher.io/multi-cluster-install/) By large scale we mean either a lot of clusters, a lot of deployments, or a lot of teams in a single organization.

Fleet is a separate project from Rancher, and can be installed on any Kubernetes cluster with Helm.

- [Architecture](#architecture)
- [Accessing Fleet in the Rancher UI](#accessing-fleet-in-the-rancher-ui)
- [Windows Support](#windows-support)
- [GitHub Repository](#github-repository)
- [Using Fleet Behind a Proxy](#using-fleet-behind-a-proxy)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)

# Architecture

For information about how Fleet works, see [this page.](./architecture)

# Accessing Fleet in the Rancher UI

Fleet comes preinstalled in Rancher v2.5. To access it, go to the **Cluster Explorer** in the Rancher UI. In the top left dropdown menu, click **Cluster Explorer > Continuous Delivery.** On this page, you can edit Kubernetes resources and cluster groups managed by Fleet.

# Windows Support

_Available as of v2.5.6_

For details on support for clusters with Windows nodes, see [this page.](./windows)


# GitHub Repository

The Fleet Helm charts are available [here.](https://github.com/rancher/fleet/releases/latest)


# Using Fleet Behind a Proxy

_Available as of v2.5.8_

For details on using Fleet behind a proxy, see [this page.](./proxy)

# Troubleshooting

**Known Issue:** 

Fleet in Rancher v2.5 becomes inoperable after a restore using the [backup-restore operator]({{<baseurl>}}rancher/v2.5/en/backups/back-up-rancher/#1-install-the-rancher-backup-operator). We will update the community once a permanent solution is in place. 

**Temporary Workaround**:

1. Find the two service account tokens listed in the fleet-controller and the fleet-controller-bootstrap service accounts. These are under the fleet-system Namespace of the local cluster. </br>
2. Remove the non-existent token secret. Doing so allows for only one entry to be present for the service account token secret that actually exists. </br> 
3. Delete the fleet-controller Pod in the fleet-system Namespace to reschedule. </br>
4. After the service account token issue is resolved, you can force redeployment of the fleet-agents. In the Rancher UI, go to **☰ > Cluster Management**, click on **Clusters** page, then click **Force Update**. </br> 
5. If the fleet-agent bundles remain in a `Modified` state after Step 4, use the command `spec.forceSyncGeneration` for fleet-agent bundle to force re-creation.
      
# Documentation

The Fleet documentation is at [https://fleet.rancher.io/.](https://fleet.rancher.io/)
