---
title: Cluster Templates
weight: 100
---

Cluster templates encompass both Kubernetes configuration and node pool configuration, allowing a single template to contain all the information Rancher needs to provision new nodes in a cloud provider and install Kubernetes on those nodes.

- [Overview](#overview)
- [RKE2 Cluster Template](#rke2-cluster-template)
- [Adding a Cluster Template to Rancher](#adding-a-cluster-template-to-rancher)
- [Creating a Cluster from a Cluster Template](#creating-a-cluster-from-a-cluster-template)
- [Updating a Cluster Created from a Cluster Template](#updating-a-cluster-created-from-a-cluster-template)
- [Deploying Clusters from a Template with Fleet](#deploying-clusters-from-a-template-with-fleet)
- [Uninstalling Cluster Templates](#uninstalling-cluster-templates)
- [Configuration Options](#configuration-options)

# Overview

Cluster templates are provided as Helm charts. To use them, you will need to clone and fork the templates, change them according to your use case, and then install the Helm charts on the Rancher management cluster. When the Helm chart is installed on the Rancher management cluster, a new cluster resource is created, which Rancher uses to provision the new cluster.

After the cluster is provisioned using the template, no changes to the template will affect the cluster. After the cluster is created from the cluster template, its configuration and infrastructure can change, because no restrictions are enforced by cluster templates.

### Kubernetes Distribution

Cluster templates can use any Kubernetes distribution. For now, we provide an example with an RKE2 Kubernetes cluster. We may provide more examples in the future using other Kubernetes distributions.

### Versioning

Rancher doesn't manage version control for cluster templates. Version control is handled in the repository containing the template's Helm chart.

# RKE2 Cluster Template

The example repository for an RKE2 cluster template is [here](https://github.com/rancher/cluster-template-examples). As of Rancher v2.6.0, we provide an RKE2 cluster template and may add more in the future.

# Adding a Cluster Template to Rancher

In this section, you'll learn how to add the cluster template to the `local` cluster's chart repo list. The result is that Rancher will include the cluster template as an option when users install new Kubernetes clusters.

> **Prerequisites:**
> 
> - You will need permission to install Helm charts on the `local` Kubernetes cluster that Rancher is installed on.
> - In order for the chart to appear in the form for creating new clusters, the chart must have the annotation `catalog.cattle.io/type: cluster-template`.

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

> * **Restricted Admin access:** If you are a restricted admin and don’t have access to the `local` cluster, you may still add new RKE2 templates and manage cluster repositories. To navigate to the chart repository, go to the left navigation bar and click **☰ > Cluster Management >  Advanced > Repositories**. You will bypass steps 1 - 6 above, then proceed to follow steps 7 - 12 to create the cluster template.

# Creating a Cluster from a Cluster Template

> **Prerequisites:**
>
> - You will need permission to provision new Kubernetes clusters.
> - You will need cloud credentials for provisioning infrastructure using the template.
> - In order to show in the form for creating new clusters, the cluster template's Helm chart must have the `catalog.cattle.io/type: cluster-template` annotation.

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create.**
1. Click the name of your cluster template.
1. Finish installing the Helm chart.

**Result:** After Rancher provisions the new cluster, it is managed in the same way as any other Rancher-launched Kubernetes cluster. You can configure any options through the UI if the cluster template has options for the user to choose from.

# Updating a Cluster Created from a Cluster Template

You can update any clusters using a template from the **Apps & Marketplace > Installed Apps** page, given there is a new version of a template being used by those clusters.

# Deploying Clusters from a Template with Fleet

> **Prerequisites:**
>
> - You will need permission to provision new Kubernetes clusters.
> - You will need cloud credentials for provisioning infrastructure using the template.
> - In order to show in the form for creating new clusters, the cluster template's Helm chart must have the `catalog.cattle.io/type:cluster-template` annotation.
> - In order to use a template as part of continuous delivery/GitOps, the cluster template needs to be deployed in the `fleet-local` namespace of the `local` cluster.
> - All values must be set in the `values.yaml` of the template.
> - Fleet repositories must follow the guidelines on [this page.](http://fleet.rancher.io/gitrepo-structure/) For RKE2 cluster templates, that means a `fleet.yaml` file must be added to the repository.

1. Click **☰ > Cluster Management**.
1. On the **Clusters** page, click **Create.**
1. Click **Create Cluster from Template.**

**Result:** After Rancher provisions the new cluster, it is managed by Fleet.

# Uninstalling Cluster Templates

1. Click **☰ > Cluster Management**.
1. Go to the `local` cluster and click **Apps & Marketplace > Chart Repositories.**
1. Go to the chart repository for your cluster template and click **⋮ > Delete.**
1. Confirm the deletion.

**Result:** The cluster template is uninstalled. This action does not affect clusters created with the cluster template.

An admin with access to the `local` cluster can also remove a cluster deployed via cluster templates through the **Apps & Marketplace > Installed Apps** page.

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