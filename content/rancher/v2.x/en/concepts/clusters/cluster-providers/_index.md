---
title: Cluster Providers
weight: 2105
---

## Rancher Kubernetes Engine (RKE)

RKE is Rancher’s own lightweight Kubernetes installer. It works with any cloud providers, virtualization platforms, or bare metal servers. It integrates with node drivers to automatically provision nodes on AWS, Azure, DigitalOcean, vSphere, OpenStack, etc. Users can add custom nodes to the cluster by running the Rancher agent on these nodes.

<!-- ### RKE Clusters and Kubeconfig Files 

Craig! Fill me in!

-->

## Cloud-Managed Kubernetes Clusters

Rancher integrates with cloud APIs so users can provision GKE, EKS, and AKS clusters directly from Rancher. New cloud managed Kubernetes clusters will be added as they become available.

## Imported Clusters

Users can import an existing Kubernetes cluster into Rancher. Rancher does not automate the provisioning, scaling, and upgrade of imported Kubernetes clusters. All other cluster management, policy management, and workload management capabilities of Rancher apply to imported clustered.
