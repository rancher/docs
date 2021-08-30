---
title: Cluster Templates
weight: 100
---

Cluster templates encompass both Kubernetes configuration and node pool configuration, allowing a single template to contain all the information Rancher needs to provision new nodes in a cloud provider and install Kubernetes on those nodes.

- [Overview](#overview)
- [Adding a Cluster Template to Rancher](#adding-a-cluster-template-to-rancher)
- [Creating a Cluster from a Cluster Template](#creating-a-cluster-from-a-cluster-template)
- [Uninstalling Cluster Templates](#uninstalling-cluster-templates)
- [Configuration Options](#configuration-options)
- [Cluster Template Example Repository](#cluster-template-example-repository)

# Overview

Cluster templates are provided as Helm charts. To use them, you will need to clone and fork the templates, change them according to your use case, and then install the Helm charts on the Rancher management cluster. When the Helm chart is installed on the Rancher management cluster, a new cluster resource is created, which Rancher uses to provision the new cluster.

After the cluster is provisioned using the template, no changes to the template will affect the cluster. After the cluster is created from the cluster template, its configuration and infrastructure can change, because no restrictions are enforced by cluster templates.

### Kubernetes Distribution

Cluster templates can use any Kubernetes distribution. For now, we provide an example with an RKE2 Kubernetes cluster. We may provide more examples in the future using other Kubernetes distributions.

### Versioning

Rancher doesn't manage version control for cluster templates. Version control is handled in the repository containing the template's Helm chart.

# Adding a Cluster Template to Rancher

> **Prerequisite:** You will need permission to configure a Helm chart repository in Rancher.

1. Go to a cluster template example repository. Rancher's examples are in [this GitHub repository.](https://github.com/rancher/cluster-template-examples) As of Rancher v2.6.0, we provide an RKE2 cluster template and add to more in the future.
1. Fork the repository.
1. Optional: Edit the cluster options by editing the `values.yaml` file. For help editing the file, see the cluster template's Helm chart README.
1. Add the chart repository to Rancher. Click **☰ > Cluster Management**.
1. Go to the `local` cluster and click **Explore.**
1. In the left navigation bar, click **Apps & Marketplace > Chart Repositories.**
1. Click **Create.**
1. Enter a name for the cluster template repository.
1. Click **Git Repository containing Helm chart definitions.**
1. In the **Git Repo URL** field, enter the URL for the repository. For example, `https://github.com/rancher/cluster-template-examples.git`.
1. In the **Git Branch** field, enter the branch to use as the source for the template. Rancher's example repository uses `main`.
1. Click **Create.**

**Result:** The cluster template available from the **Apps & Marketplace** in Rancher's `local` cluster. It can now be used to deploy clusters.

# Creating a Cluster from a Cluster Template

> **Prerequisites:**
>
> - You will need permission to provision new Kubernetes clusters.
> - You will need permission to install Helm charts on the `local` Kubernetes cluster that the Rancher management server is installed on.
> -  In order to use a template as part of continuous delivery/GitOps, the cluster template needs to be deployed in the `fleet-local` namespace of the `local` cluster.

1. Click **☰ > Cluster Management**.
1. Go to the `local` cluster and click **Apps & Marketplace > Charts.**
1. In the dropdown menu under **Charts**, select the chart repository for your cluster template.
1. Install the Helm chart onto the cluster.
1. When the cluster resource is created, the new cluster is provisioned.

**Result:** The new cluster is managed in the same way as any other Rancher-launched Kubernetes cluster.

# Uninstalling Cluster Templates

1. Click **☰ > Cluster Management**.
1. Go to the `local` cluster and click **Apps & Marketplace > Chart Repositories.**
1. Go to the chart repository for your cluster template and click **⋮ > Delete.**
1. Confirm the deletion.

**Result:** The cluster template is uninstalled. This action does not affect clusters created with the cluster template.

# Configuration Options

Cluster templates are flexible enough that they can be used to configure all of the following options:

- Node configuration
- Node pools
- Pre-specified cloud credentials
- Enable/configure an authorized cluster endpoint to get kubectl access to the cluster without using Rancher as a proxy
- Install Rancher V2 monitoring
- Kubernetes version
- Assign cluster members
- Infrastructure configuration such as AWS VPC/subnets or vSphere data center
- Cloud provider options
- Pod security options
- Network providers
- Ingress controllers
- Network security configuration
- Network plugins
- Private registry URL and credentials
- Add-ons
- Kubernetes options, including configurations for Kubernetes components such as kube-api, kube-controller, kubelet, and services

For details on how to configure the template, refer to the cluster template's Helm chart README.

# Cluster Template Example Repository

The example repo is [here](https://github.com/rancher/cluster-template-examples). As of Rancher v2.6.0, we provide an RKE2 cluster template and add to more in the future.