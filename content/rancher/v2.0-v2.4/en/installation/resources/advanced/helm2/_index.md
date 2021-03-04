---
title: Kubernetes Installation Using Helm 2
weight: 1
aliases:
  - /rancher/v2.0-v2.4/en/installation/options/helm2
---

> After Helm 3 was released, the Rancher installation instructions were updated to use Helm 3.
>
> If you are using Helm 2, we recommend [migrating to Helm 3](https://helm.sh/blog/migrate-from-helm-v2-to-helm-v3/) because it is simpler to use and more secure than Helm 2.
>
> This section provides a copy of the older high-availability Kubernetes Rancher installation instructions that used Helm 2, and it is intended to be used if upgrading to Helm 3 is not feasible.

For production environments, we recommend installing Rancher in a high-availability configuration so that your user base can always access Rancher Server. When installed in a Kubernetes cluster, Rancher will integrate with the cluster's etcd database and take advantage of Kubernetes scheduling for high-availability.

This procedure walks you through setting up a 3-node cluster with Rancher Kubernetes Engine (RKE) and installing the Rancher chart with the Helm package manager.

> **Important:** The Rancher management server can only be run on an RKE-managed Kubernetes cluster. Use of Rancher on hosted Kubernetes or other providers is not supported.

> **Important:** For the best performance, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-provisioning/) for running your workloads.

## Recommended Architecture

- DNS for Rancher should resolve to a Layer 4 load balancer (TCP)
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

<figcaption>Kubernetes Rancher install with layer 4 load balancer, depicting SSL termination at ingress controllers</figcaption>
![High-availability Kubernetes Install]({{<baseurl>}}/img/rancher/ha/rancher2ha.svg)
<sup>Kubernetes Rancher install with Layer 4 load balancer (TCP), depicting SSL termination at ingress controllers</sup>

## Required Tools

The following CLI tools are required for this install. Please make sure these tools are installed and available in your `$PATH`

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
- [rke]({{<baseurl>}}/rke/latest/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
- [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes. Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm-version) to choose a version of Helm to install Rancher.

## Installation Outline

- [Create Nodes and Load Balancer]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/create-nodes-lb/)
- [Install Kubernetes with RKE]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/kubernetes-rke/)
- [Initialize Helm (tiller)]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/helm-init/)
- [Install Rancher]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/helm-rancher/)

## Additional Install Options

- [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/)

## Previous Methods

[RKE add-on install]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/rke-add-on/)

> **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
> Please use the Rancher helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install ]({{<baseurl>}}/rancher/v2.0-v2.4/en/installation/options/helm2/).
>
> If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0-v2.4/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the Helm chart.
