---
title: High Availability Installation
weight: 275
draft: true
---

When installed as a Deployment in a Kubernetes cluster, Rancher will take integrate with the cluster's etcd database and Kubernetes scheduling for High-Availability.

This procedure walks you through setting up a 3-node cluster with RKE and installing the Rancher chart with the Helm package manager.

> NOTE: For the best performance, we recommend this Kubernetes cluster is dedicated to only the Rancher workload.

## Recommended Architecture

* DNS for Rancher should resolve to a Layer 4 Load Balancer
* The Load Balancer should forward ports 80 and 443 TCP to all 3 nodes in the Kubernetes cluster.
* The Ingress controller will redirect http port 80 to https and terminate SSL/TLS on port 443.
* The Ingress controller will forward traffic to port 80 on the Pod in the Rancher Deployment.

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)

## Required Tools

The following CLI tools are required for this install. Please make sure these tools installed and available in your `$PATH`

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
* [rke]({{< baseurl >}}/rke/v0.1.x/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes.

## Installation Outline

1. [Create Nodes and Load Balancer](create-nodes-lb/)
1. [Install Kubernetes with RKE](kubernetes-rke/)
1. [Initialize Helm (tiller)](helm-init/)
1. [Install Rancher](helm-rancher/)

## Additional Install Options

* [Migrating from RKE all-in-one install](migrating-from-rke-all-in-one/)
* [RKE all-in-one install](rke-all-in-one/)