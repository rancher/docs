---
title: High Availability Installation
weight: 275
draft: true
---

When installed in a Kubernetes cluster, Rancher will integrate with the cluster's etcd database and take advantage of Kubernetes scheduling for High-Availability.

This procedure walks you through setting up a 3-node cluster with RKE and installing the Rancher chart with the Helm package manager.

> **Note:** For the best performance, we recommend this Kubernetes cluster be dedicated only to the Rancher workload.

## Recommended Architecture

* DNS for Rancher should resolve to a Layer 4 Load Balancer
* The Load Balancer should forward ports 80 and 443 TCP to all 3 nodes in the Kubernetes cluster.
* The Ingress controller will redirect http port 80 to https and terminate SSL/TLS on port 443.
* The Ingress controller will forward traffic to port 80 on the Pod in the Rancher Deployment.

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)

## Required Tools

The following CLI tools are required for this install. Please make sure these tools are installed and available in your `$PATH`

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
* [rke]({{< baseurl >}}/rke/v0.1.x/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes.

## Installation Outline

1. [Create Nodes and Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/)
1. [Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/)
1. [Initialize Helm (tiller)]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/)
1. [Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/)

## Additional Install Options

* [Migrating from RKE all-in-one install]({{< baseurl >}}/rancher/v2.x/en/installation/ha/migrating-from-rke-all-in-one/)
* [RKE all-in-one install]({{< baseurl >}}/rancher/v2.x/en/installation/ha/rke-all-in-one/)