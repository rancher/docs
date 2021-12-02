---
title: Fleet - GitOps at Scale
weight: 1
---

Fleet is GitOps at scale. Fleet is designed to manage up to a million clusters. It's also lightweight enough that it works great for a [single cluster](https://fleet.rancher.io/single-cluster-install/) too, but it really shines when you get to a [large scale.](https://fleet.rancher.io/multi-cluster-install/) By large scale we mean either a lot of clusters, a lot of deployments, or a lot of teams in a single organization.

Fleet is a separate project from Rancher, and can be installed on any Kubernetes cluster with Helm.

- [Architecture](#architecture)
- [Accessing Fleet in the Rancher UI](#accessing-fleet-in-the-rancher-ui)
- [Windows Support](#windows-support)
- [GitHub Repository](#github-repository)
- [Using Fleet Behind a Proxy](#using-fleet-behind-a-proxy)
- [Helm Chart Dependencies](#helm-chart-dependencies)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)

# Architecture

For information about how Fleet works, see [this page.](./architecture)

# Accessing Fleet in the Rancher UI

Fleet comes preinstalled in Rancher. To access it, click **☰ > Continuous Delivery**.

# Windows Support

For details on support for clusters with Windows nodes, see [this page.](./windows)


# GitHub Repository

The Fleet Helm charts are available [here.](https://github.com/rancher/fleet/releases/latest)


# Using Fleet Behind a Proxy

For details on using Fleet behind a proxy, see [this page.](./proxy)

# Helm Chart Dependencies

In order for Helm charts with dependencies to deploy successfully, you must run a manual command (as listed below), as it is up to the user to fulfill the dependency list. If you do not do this and proceed to clone your repository and run `helm install`, your installation will fail because the dependencies will be missing.

The Helm chart in the git repository must include its dependencies in the charts subdirectory. You must either manually run `helm dependencies update $chart` OR run `helm dependencies build $chart` locally, then commit the complete charts directory to your git repository. Note that you will update your commands with the applicable parameters.

# Troubleshooting

---
* **Known Issue:** clientSecretName and helmSecretName secrets for Fleet gitrepos are not included in the backup nor restore created by the [backup-restore-operator]({{<baseurl>}}rancher/v2.6/en/backups/back-up-rancher/#1-install-the-rancher-backups-operator). We will update the community once a permanent solution is in place. 

* **Temporary Workaround:** </br>
By default, user-defined secrets are not backed up in Fleet. It is necessary to recreate secrets if performing a disaster recovery restore or migration of Rancher into a fresh cluster. To modify resourceSet to include extra resources you want to backup, refer to docs [here](https://github.com/rancher/backup-restore-operator#user-flow).

---

# Documentation

The Fleet documentation is at [https://fleet.rancher.io/.](https://fleet.rancher.io/)
