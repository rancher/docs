---
title: Deploying Rancher Server
weight: 100
---

Use one of the following guides to deploy and provision Rancher and a Kubernetes cluster in the provider of your choice.

# Automated Quickstart to Deploy Rancher on Amazon EKS

Rancher and Amazon Web Services collaborated on a quick start guide for deploying Rancher on an EKS Kubernetes cluster following AWS best practices. The deployment guide is [here.](https://aws-quickstart.github.io/quickstart-eks-rancher/)
# Installing Rancher on a Virtual Machine

The following guides use automation tools to deploy the Rancher server on a virtual machine.

> These guides do not deploy Rancher on a separate Kubernetes cluster, which is a best practice in cases where the Rancher server needs to manage downstream Kubernetes clusters.

- [DigitalOcean](./digital-ocean-qs) (uses Terraform)
- [AWS](./amazon-aws-qs) (uses Terraform)
- [Azure](./microsoft-azure-qs) (uses Terraform)
- [GCP](./google-gcp-qs) (uses Terraform)
- [Vagrant](./quickstart-vagrant)

If you prefer, the following guide will take you through the same process in individual steps. Use this if you want to run Rancher in a different provider, on prem, or if you would just like to see how easy it is.

- [Manual Install](./quickstart-manual-setup)
