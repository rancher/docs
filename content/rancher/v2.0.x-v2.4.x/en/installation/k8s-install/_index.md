---
title: Installing Rancher on a Kubernetes Cluster
weight: 3
description: For production environments, install Rancher in a high-availability configuration. Read the guide for setting up a 3-node cluster and still install Rancher using a Helm chart.
aliases:
  - /rancher/v2.0.x-v2.4.x/en/installation/ha/
---

For production environments, we recommend installing Rancher in a high-availability configuration so that your user base can always access Rancher Server. When installed in a Kubernetes cluster, Rancher will integrate with the cluster's etcd database and take advantage of Kubernetes scheduling for high-availability.

This section describes how to create and manage a Kubernetes cluster, then install Rancher onto that cluster. For this type of architecture, you will need to deploy nodes - typically virtual machines - in the infrastructure provider of your choice. You will also need to configure a load balancer to direct front-end traffic to the three VMs. When the VMs are running and fulfill the [node requirements,]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/installation/requirements) you can use RKE or K3s to deploy Kubernetes onto them, then use the Helm package manager to deploy Rancher onto Kubernetes.

### Optional: Installing Rancher on a Single-node Kubernetes Cluster

If you only have one node, but you want to use the Rancher server in production in the future, it is better to install Rancher on a single-node Kubernetes cluster than to install it with Docker.

One option is to install Rancher with Helm on a Kubernetes cluster, but to only use a single node in the cluster. In this case, the Rancher server does not have high availability, which is important for running Rancher in production. However, this option is useful if you want to save resources by using a single node in the short term, while preserving a high-availability migration path. In the future, you can add nodes to the cluster to get a high-availability Rancher server.

To set up a single-node RKE cluster, configure only one node in the `cluster.yml` . The single node should have all three roles: `etcd`, `controlplane`, and `worker`.

To set up a single-node K3s cluster, run the Rancher server installation command on just one node instead of two nodes.

In both single-node Kubernetes setups, Rancher can be installed with Helm on the Kubernetes cluster in the same way that it would be installed on any other cluster.

### Important Notes on Architecture

The Rancher management server can only be run on Kubernetes cluster in an infrastructure provider where Kubernetes is installed using K3s or RKE. Use of Rancher on hosted Kubernetes providers, such as EKS, is not supported.

For the best performance and security, we recommend a dedicated Kubernetes cluster for the Rancher management server. Running user workloads on this cluster is not advised. After deploying Rancher, you can [create or import clusters]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/cluster-provisioning/#cluster-creation-in-rancher) for running your workloads.

For information on how Rancher works, regardless of the installation method, refer to the [architecture section.]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/overview/architecture)

## Installation Outline

- [Set up Infrastructure]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/installation/k8s-install/create-nodes-lb/)
- [Set up a Kubernetes Cluster]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/installation/k8s-install/kubernetes-rke/)
- [Install Rancher]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/installation/k8s-install/helm-rancher/)

## Additional Install Options

- [Migrating from a high-availability Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/upgrades/upgrades/migrating-from-rke-add-on/)
- [Installing Rancher with Helm 2:]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/installation/options/helm2) This section provides a copy of the older high-availability Rancher installation instructions that used Helm 2, and it is intended to be used if upgrading to Helm 3 is not feasible.

## Previous Methods

[RKE add-on install]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/installation/options/rke-add-on/)

> **Important: RKE add-on install is only supported up to Rancher v2.0.8**
>
> Please use the Rancher Helm chart to install Rancher on a Kubernetes cluster. For details, see the [Kubernetes Install - Installation Outline]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/installation/k8s-install/#installation-outline).
>
> If you are currently using the RKE add-on install method, see [Migrating from a Kubernetes Install with an RKE Add-on]({{<baseurl>}}/rancher/v2.0.x-v2.4.x/en/upgrades/upgrades/migrating-from-rke-add-on/) for details on how to move to using the helm chart.
