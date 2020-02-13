---
title: Installing Rancher on a Kubernetes Cluster
weight: 3
description: For production environments, install Rancher in a high-availability configuration. Read the guide for setting up a 3-node cluster and still install Rancher using a Helm chart.
aliases:
  - /rancher/v2.x/en/installation/ha/
---

For production environments, we recommend installing Rancher in a high-availability configuration so that your user base can always access Rancher Server. When installed in a Kubernetes cluster, Rancher will integrate with the cluster's etcd database and take advantage of Kubernetes scheduling for high-availability.

This section describes how to first use RKE to create and manage a cluster, then install Rancher onto that cluster. For this type of architecture, you will need to deploy three VMs in the infrastructure provider of your choice. You will also need to configure a load balancer to direct front-end traffic to the three VMs. When the VMs are running and fulfill the [node requirements,]({{<baseurl>}}/rancher/v2.x/en/installation/requirements) you can use RKE to deploy Kubernetes onto them, then use the Helm package manager to deploy Rancher onto Kubernetes.

### Optional: Installing Rancher on a Single-node Kubernetes Cluster

If you only have one node, but you want to use the Rancher server in production in the future, it is better to install Rancher on a single-node Kubernetes cluster than to install it with Docker.

One option is to install Rancher with Helm on a Kubernetes cluster, but to only use a single node in the cluster. In this case, the Rancher server does not have high availability, which is important for running Rancher in production. However, this option is useful if you want to save resources by using a single node in the short term, while preserving a high-availability migration path. In the future, you can add nodes to the cluster to get a high-availability Rancher server.

The single-node Kubernetes install can be achieved by describing only one node in the `cluster.yml` when provisioning the Kubernetes cluster with RKE. The single node would have all three roles: `etcd`, `controlplane`, and `worker`. Then Rancher would be installed with Helm on the cluster in the same way that it would be installed on any other cluster.

### Important Notes on Architecture

The Rancher management server can only be run on an RKE-managed Kubernetes cluster. Use of Rancher on hosted Kubernetes or other providers is not supported.

For the best performance and security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

We recommend the following architecture and configurations for the load balancer and Ingress controllers:

- DNS for Rancher should resolve to a Layer 4 load balancer (TCP)
- The Load Balancer should forward port TCP/80 and TCP/443 to all 3 nodes in the Kubernetes cluster.
- The Ingress controller will redirect HTTP to HTTPS and terminate SSL/TLS on port TCP/443.
- The Ingress controller will forward traffic to port TCP/80 on the pod in the Rancher deployment.

For more information on how a Kubernetes Installation works, refer to [this page.]({{<baseurl>}}/rancher/v2.x/en/installation/how-ha-works)

For information on how Rancher works, regardless of the installation method, refer to the [architecture section.]({{<baseurl>}}/rancher/v2.x/en/overview/architecture)

## Required CLI Tools

The following CLI tools are required for this install. Please make sure these tools are installed and available in your `$PATH`

- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl) - Kubernetes command-line tool.
- [rke]({{<baseurl>}}/rke/latest/en/installation/) - Rancher Kubernetes Engine, cli for building Kubernetes clusters.
- [helm](https://docs.helm.sh/using_helm/#installing-helm) - Package management for Kubernetes. Refer to the [Helm version requirements]({{<baseurl>}}/rancher/v2.x/en/installation/options/helm-version) to choose a version of Helm to install Rancher.

## Installation Outline

- [Create Nodes and Load Balancer]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/create-nodes-lb/)
- [Install Kubernetes with RKE]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/kubernetes-rke/)
- [Install Rancher]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/helm-rancher/)

## Additional Install Options

- [Migrating from a high-availability Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/)
- [Installing Rancher with Helm 2:]({{<baseurl>}}/rancher/v2.x/en/installation/options/helm2) This section provides a copy of the older high-availability Rancher installation instructions that used Helm 2, and it is intended to be used if upgrading to Helm 3 is not feasible.

## Previous Methods

[RKE add-on install]({{<baseurl>}}/rancher/v2.x/en/installation/options/rke-add-on/)

> **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
> Please use the Rancher Helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install - Installation Outline]({{<baseurl>}}/rancher/v2.x/en/installation/k8s-install/#installation-outline).
>
> If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.
