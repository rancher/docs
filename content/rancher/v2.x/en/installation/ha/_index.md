---
title: High Availability (HA) Install
description: For production environments, install Rancher in a high-availability configuration. Read the guide for setting up a 3-node cluster and still install Rancher using a helm chart.
weight: 275
---

For production environments, we recommend installing Rancher in a high-availability configuration so that your user base can always access Rancher Server. When installed in a Kubernetes cluster, Rancher will integrate with the cluster's etcd database and take advantage of Kubernetes scheduling for high-availability.

This procedure walks you through setting up a 3-node cluster with RKE and installing the Rancher chart with the Helm package manager.

> **Important:** It is not supported, nor generally a good idea, to run Rancher on top of hosted Kubernetes solutions such as Amazon's EKS, or Google's GKE. These hosted Kubernetes solutions do not expose etcd to a degree that is manageable for Rancher, and their customizations can interfere with Rancher operations. It is strongly recommended to use hosted infrastructure such as EC2 or GCE instead. 

> **Important:** For the best performance, we recommend this Kubernetes cluster to be dedicated only to run Rancher. After the Kubernetes cluster to run Rancher is setup, you can [create or import clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

## Recommended Architecture

* DNS for Rancher should resolve to a Layer 4 load balancer (TCP)
* The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
* The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
* The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>HA Rancher install with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>
![Rancher HA]({{< baseurl >}}/img/rancher/ha/rancher2ha.svg)
<sup>HA Rancher install with Layer 4 load balancer (TCP), depicting SSL termination at ingress controllers</sup>

## Required Tools

The following CLI tools are required for this install. Please make sure these tools are installed and available in your `$PATH`

* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
* [rke]({{< baseurl >}}/rke/latest/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes.

> **Important:** Due to an issue with Helm v2.12.0 and cert-manager, please use Helm v2.12.1 or higher.

## Installation Outline

- [Create Nodes and Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/)
- [Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/)
- [Initialize Helm (tiller)]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-init/)
- [Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/)

## Additional Install Options

* [Migrating from an HA RKE Add-on Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/)

## Previous Methods

[RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/installation/ha/rke-add-on/)

> ##### **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#installation-outline).
>
>If you are currently using the RKE add-on install method, see [Migrating from an HA RKE Add-on Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

