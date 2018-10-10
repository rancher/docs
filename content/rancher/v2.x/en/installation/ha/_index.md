---
title: High Availability (HA) Install
weight: 275
---

For production environments, we recommend installing Rancher in a high-availability configuration so that your user base can always access Rancher Server. When installed in a Kubernetes cluster, Rancher will integrate with the cluster's etcd database and take advantage of Kubernetes scheduling for high-availability.

This procedure walks you through setting up a 3-node cluster with RKE and installing the Rancher chart with the Helm package manager.

> **Note:** For the best performance, we recommend this Kubernetes cluster be dedicated only to the Rancher workload.

## Recommended Architecture

* DNS for Rancher should resolve to a layer 4 load balancer
* The Load Balancer should forward ports 80 and 443 TCP to all 3 nodes in the Kubernetes cluster.
* The Ingress controller will redirect http port 80 to https and terminate SSL/TLS on port 443.
* The Ingress controller will forward traffic to port 80 on the pod in the Rancher deployment.

<sup>HA Rancher install with layer 4 load balancer, depicting SSL termination at ingress controllers</sup>
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

* [Migrating from RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/)

## Previous Methods

> #### **Important: RKE add-on install is only supported up to Rancher v2.0.8.**
>
>Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#installation-outline).
>
>If you are currently using the RKE add-on install method, see [Migrating from a RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move using a helm chart.

* *Deprecated - [RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/installation/ha/rke-add-on/)*
