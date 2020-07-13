---
title: Upgrading the Rancher Kubernetes Cluster and Helm Chart
weight: 2
---

> This page is under construction.

This page is about how to upgrade the local Kubernetes cluster that Rancher is installed on, as well as the Rancher Helm chart.

This information applies if you set up the local Rancher server cluster using the Rancher CLI.

To upgrade the Rancher server's local Kubernetes cluster using the Rancher CLI, you will first upgrade the master nodes of the cluster, and then the worker nodes.

### About Rancher Kubernetes

Rancher is intended to be installed on any Kubernetes cluster.

The Rancher CLI comes with a Kubernetes distribution called Rancher Kubernetes, which allows you to install Kubernetes more easily as a prerequisite to installing Rancher.

Rancher Kubernetes clusters can also be imported into Rancher.


### Known Upgrade Issues

A list of known issues for each Rancher version can be found in the release notes on [GitHub](https://github.com/rancher/rancher/releases) and on the [Rancher forums.](https://forums.rancher.com/c/announcements/12)

### Caveats
Upgrades _to_ or _from_ any chart in the [rancher-alpha repository]({{<baseurl>}}/rancher/v2.x/en/installation/options/server-tags/#helm-chart-repositories/) aren't supported.