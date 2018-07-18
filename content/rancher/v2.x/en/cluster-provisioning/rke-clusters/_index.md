---
title: Rancher Launched Kubernetes
weight: 2200
---

If you don't want to use a hosted Kubernetes provider, you can launch a Kubernetes cluster from Rancher using one of our RKE Cluster options using any nodes your want.

RKE, or [Rancher Kubernetes Engine]({{< baseurl >}}/rke/v0.1.x/en/), is Rancher's own lightweight Kubernetes installer. It can launch Kubernetes on any computer, including:

- Bare-metal servers
- On-premise virtual machines
- IaaS-hosted virtual machines

RKE cluster provisioning is separated into two categories:

- [Node Pools]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/node-pools/):

    In this use case, Rancher uses a combination of cloud host APIs and RKE to provision a Kubernetes cluster using a major cloud provider.

- [Custom Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/custom-nodes/):

    For use cases where you want to provision bare-metal servers, on-premise virtual machines, or a cloud provider not included in Node Pool use cases.

## Node Pools

Using Rancher, you can use APIs from major IaaS providers in combination with Rancher RKE to provision a new Kubernetes cluster quickly and easily, all from the Rancher UI. There's no need to log directly into your infrastructure provider's portal.

Out-of-the-box, Rancher supports the following infrastructure providers:

- Amazon EC2
- Microsoft Azure
- DigitalOcean
- VMWare Vsphere

## Custom Nodes

Use Rancher to create a Kubernetes cluster on your on-premise bare metal servers. This option creates a cluster using RKE, which is Rancher's own lightweight Kubernetes installer. In addition to bare metal servers, RKE can also create clusters on _any_ IaaS providers by integrating with node drivers.

To use this option you'll need access to servers you intend to use as your Kubernetes cluster. Provision each server according to Rancher requirements, which includes some hardware specifications and Docker. After you install Docker on each server, run the command provided in the Rancher UI to turn each server into a Kubernetes node. 

You can create provider-hosted nodes from the Rancher UI by creating a node template. After providing Rancher with an access token from the vendor you're using, Rancher prompts you for specifications that it will send to your provider by API. The provider than provisions your nodes based on the template.