---
title: Creating Kubernetes Clusters
weight: 1200
aliases:
    -/rancher/v2.x/en/concepts/clusters/cluster-providers
---

Using Rancher, you can create Kubernetes clusters using a variety of options. Use the option that best fits your use case.

## Hosted Kubernetes Providers

By integrating with cloud APIs, Rancher lets you create new Kubernetes clusters through hosted providers, all within the Rancher UI. You can create clusters using either:

- A hosted Kubernetes provider, such as Google GKE, Amazon EKS, or Microsoft AKS.
- An IaaS provider, using nodes provided from Amazon EC2, Microsoft Azure, or DigitalOcean.

## Rancher-Launched Kubernetes

Alternatively, you can use Rancher to create a cluster from your own existing nodes, using RKE. RKE is Rancher’s own lightweight Kubernetes installer. It works with any bare metal server, cloud provider, or virtualization platform. It integrates with node drivers to automatically provision nodes on AWS, Azure, DigitalOcean, vSphere, OpenStack, etc. Users can add custom nodes to the cluster by running the Rancher agent on these nodes.

## Kubernetes Importation

Finally, you also have the option of importing an existing Kubernetes cluster that you're already using into Rancher.
