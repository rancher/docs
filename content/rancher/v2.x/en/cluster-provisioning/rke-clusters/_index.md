---
title: Rancher Launched Kubernetes
weight: 2200
---

If you don't want to use a hosted Kubernetes provider, you can have Rancher launch a Kubernetes cluster using any nodes you want. When Rancher deploys Kubernetes onto these nodes, it uses Rancher Kubernetes Engine]({{< baseurl >}}/rke/v0.1.x/en/) (RKE), which is Rancher's own lightweight Kubernetes installer. It can launch Kubernetes on any computers, including:

- Bare-metal servers
- On-premise virtual machines
- IaaS-hosted virtual machines

RKE cluster provisioning is separated into two categories:

- [Node Pools]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/):

    In this use case, Rancher uses [Docker Machine](https://docs.docker.com/machine/) to provision nodes in IaaS-hosted virtual machines. After the nodes are provisioned, RKE is used deploy Kubernetes. 

- [Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/):

    For use cases where you want to provision bare-metal servers, on-premise virtual machines, or bring virtual machines that are already exist in a cloud provider. With this option, you will run a Rancher agent Docker container on the machine. Then, RKE is used to deploy Kubernetes. 
