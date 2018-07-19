---
title: Rancher Launched Kubernetes
weight: 2200
---

If you don't want to use a hosted Kubernetes provider, you can have Rancher launch a Kubernetes cluster using any nodes your want. When Rancher deploys Kubernetes onto these nodes, it uses RKE, or [Rancher Kubernetes Engine]({{< baseurl >}}/rke/v0.1.x/en/), which is Rancher's own lightweight Kubernetes installer. It can launch Kubernetes on any computer, including:

- Bare-metal servers
- On-premise virtual machines
- IaaS-hosted virtual machines

RKE cluster provisioning is separated into two categories:

- [Node Pools]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/):

    In this use case, Rancher uses a [Docker Machine](https://docs.docker.com/machine/) and RKE to provision a Kubernetes cluster using a major cloud provider.

- [Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/):

    For use cases where you want to provision bare-metal servers, on-premise virtual machines, or a cloud provider not included in Node Pool use cases.
