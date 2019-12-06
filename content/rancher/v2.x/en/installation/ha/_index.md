---
title: High Availability (HA) Install
weight: 275
---

For production environments, we recommend installing Rancher in a high-availability configuration so that your user base can always access Rancher Server. When installed in a Kubernetes cluster, Rancher will integrate with the cluster's etcd database and take advantage of Kubernetes scheduling for high-availability.

This procedure walks you through setting up a 3-node cluster with Rancher Kubernetes Engine (RKE) and installing the Rancher chart with the Helm package manager.

> **Important:** The Rancher management server can only be run on an RKE-managed Kubernetes cluster. Use of Rancher on hosted Kubernetes or other providers is not supported. 

> **Important:** For the best performance and security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

We recommend the following architecture and configurations for the load balancer and Ingress controllers:

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
* [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes. Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.x/en/installation/helm-version) to choose a version of Helm to install Rancher.

## Installation Outline

- [Create Nodes and Load Balancer]({{< baseurl >}}/rancher/v2.x/en/installation/ha/create-nodes-lb/)
- [Install Kubernetes with RKE]({{< baseurl >}}/rancher/v2.x/en/installation/ha/kubernetes-rke/)
- [Install Rancher]({{< baseurl >}}/rancher/v2.x/en/installation/ha/helm-rancher/)

## Additional Install Options

* [Migrating from an HA RKE Add-on Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/)

## Previous Methods

[RKE add-on install]({{< baseurl >}}/rancher/v2.x/en/installation/ha/rke-add-on/)

> **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
>Please use the Rancher helm chart to install HA Rancher. For details, see the [HA Install - Installation Outline]({{< baseurl >}}/rancher/v2.x/en/installation/ha/#installation-outline).
>
>If you are currently using the RKE add-on install method, see [Migrating from an HA RKE Add-on Install]({{< baseurl >}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.

