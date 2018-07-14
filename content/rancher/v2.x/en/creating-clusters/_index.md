---
title: Creating Kubernetes Clusters
weight: 1200
aliases:
  - /rancher/v2.x/en/concepts/clusters/cluster-providers/
---

Using Rancher, you can create Kubernetes clusters using a variety of options. Use the option that best fits your use case.

## In A Hosted Kubernetes Provider

If you already have a cluster hosted by a Kubernetes provider such as Google GKE, Rancher can integrate with its cloud APIs, allowing you to manage your hosted cluster from the Rancher UI.

## From Nodes in an Infrastructure Provider

Using Rancher, you can leverage APIs from major IaaS providers to create nodes and provision a new Kubernetes cluster.

## From Your Own Existing Nodes

Use Rancher to create a Kubernetes cluster on your on-premise bare metal servers. This option creates a cluster using RKE, which is Rancher's own lightweight Kubernetes installer.

In addition to bare metal servers, RKE can also create clusters on less popular IaaS providers by integrating with node drivers.

## Import Existing Clusters

Users can import an existing Kubernetes cluster into Rancher. Rancher does not automate the provisioning, scaling, and upgrade of imported Kubernetes clusters. All other cluster management, policy management, and workload management capabilities of Rancher apply to imported clusters.
