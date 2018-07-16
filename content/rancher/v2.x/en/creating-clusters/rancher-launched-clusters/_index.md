---
title: Rancher-Launched Kubernetes Clusters
weight: 25
aliases:

---

## Infrastructure Providers

Using Rancher, you can leverage APIs from major IaaS providers to create nodes and provision a new Kubernetes cluster, all from the Rancher UI. There's no need to log directly into your infrastructure providers's portal.

You can create provider-hosted nodes from the Rancher UI by creating a node template. After providing Rancher with an access token from the vendor you're using, Rancher prompts you for specifications that it will send to your provider by API. The provider than provisions your nodes based on the template.

Out-of-the-box, Rancher supports the following infrastructure providers:

- Amazon EC2
- Microsoft Azure
- DigitalOcean
- VMWare Vsphere

Each vendor requires specific information that's used to authenticate with the provider API. Read more below to learn about the information required for each provider.

## From Existing Nodes

Use Rancher to create a Kubernetes cluster on your on-premise bare metal servers. This option creates a cluster using RKE, which is Rancher's own lightweight Kubernetes installer. In addition to bare metal servers, RKE can also create clusters on _any_ IaaS providers by integrating with node drivers.

To use this option you'll need access to servers you intend to use as your Kubernetes cluster. Provision each server according to Rancher requirements, which includes some hardware specifications and Docker. After you install Docker on each server, run the command provided in the Rancher UI to turn each server into a Kubernetes node. 