---
title: High Availability Installation
weight: 275
draft: true
---

When installed as a Deployment in a Kubernetes cluster, Rancher will take integrate with the cluster's etcd database and Kubernetes scheduling for High-Availability.

This procedure walks you through setting up a 3-node cluster with RKE and installing the Rancher chart the Helm package manager.

> NOTE: For the best performance, we recommend this Kubernetes cluster be dedicated only the Rancher workload.

## Recommended Architecture

* DNS for Rancher should resolve to a Layer 4 Load Balancer
* The Load Balancer should forward ports 80 and 443 TCP to all 3 nodes in the Kubernetes cluster.
* The ingress controller will redirect http port 80 to https and terminate SSL/TLS on port 443.
* The ingress controller will forward traffic to port 80 on the Pod in the Rancher Deployment.

![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)

## Required Tools

The following CLI tools are required for this install. Please make sure these tools installed and available in your `$PATH`

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
* [rke]({{< baseurl >}}/rke/v0.1.x/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes.

## Installation Outline

1. [Create Nodes and Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install2/create-nodes-and-load-balancer/)
1. [Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install2/rke/)
1. [Initialize Helm (tiller)]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install2/helm/)
1. [Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha-server-install2/rancher/)
