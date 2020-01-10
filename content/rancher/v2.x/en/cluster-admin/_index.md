---
title: Cluster Administration
weight: 2005
---

After you provision a cluster in Rancher, you can begin using powerful Kubernetes features to deploy and scale your containerized applications in development, testing, or production environments.

This page covers the following topics:

- [Switching between clusters](#switching-between-clusters)
- [Managing clusters in Rancher](#managing-clusters-in-rancher)
- [Configuring tools](#configuring-tools)

> This section assumes a basic familiarity with Docker and Kubernetes. For a brief explanation of how Kubernetes components work together, refer to the [concepts]({{<baseurl>}}/rancher/v2.x/en/overview/concepts) page.

## Switching between Clusters

To switch between clusters, use the drop-down available in the navigation bar.

Alternatively, you can switch between projects and clusters directly in the navigation bar. Open the **Global** view and select **Clusters** from the main menu. Then select the name of the cluster you want to open.

## Managing Clusters in Rancher

After clusters have been [provisioned into Rancher]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/), [cluster owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) will need to manage these clusters. There are many different options of how to manage your cluster. 

| Action | [Rancher launched Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) | [Hosted Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) | [Imported Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters) |
| --- | --- | ---| ---|
| [Using kubeconfig file to access a Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/cluster-access/kubeconfig/) | * | * | * |
| [Using kubectl to Access a Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/cluster-access/kubectl/) | * | * | * |
| [Adding Cluster Members]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/cluster-access/cluster-members/) | * | * | * |
| [Editing Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/editing-clusters/) | * | * | * |
| [Managing Nodes]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/nodes) | * | * | * |
| [Managing Persistent Volumes and Storage Classes]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/volumes-and-storage/) | * | * | * |
| [Managing Projects and Namespaces]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/projects-and-namespaces/) | * | * | * |
| [Configuring Tools](#configuring-tools) | * | * | * |
| [Cloning Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/cloning-clusters/)| | * | * |
| [Ability to rotate certificates]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/certificate-rotation/) | * |  | |
| [Ability to back up your Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/backing-up-etcd/) | * | | |
| [Ability to recover and restore etcd]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/restoring-etcd/) | * | | |
| [Cleaning Kubernetes components when clusters are no longer reachable from Rancher]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/cleaning-cluster-nodes/) | * | | |

## Configuring Tools

Rancher contains a variety of tools that aren't included in Kubernetes to assist in your DevOps operations. Rancher can integrate with external services to help your clusters run more efficiently. Tools are divided into following categories:

- Alerts
- Notifiers
- Logging
- Monitoring

For more information, see [Tools]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/tools/)
