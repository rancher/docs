---
title: Cluster Administration
weight: 2005
---

## What's a Kubernetes Cluster?

A cluster is a group of computers that work together as a single system.

A _Kubernetes Cluster_ is a cluster that uses the [Kubernetes container-orchestration system](https://kubernetes.io/) to deploy, maintain, and scale Docker containers, allowing your organization to automate application operations.

### Kubernetes Cluster Node Components

Each computing resource in a Kubernetes Cluster is called a _node_. Nodes can be either bare-metal servers or virtual machines. Kubernetes classifies nodes into three types: _etcd_ nodes, _control plane_ nodes, and _worker_ nodes.

#### etcd Nodes

[etcd](https://kubernetes.io/docs/concepts/overview/components/#etcd) nodes run the etcd database. The etcd database component is a key value store used as Kubernetes storage for all cluster data, such as cluster coordination and state management.

etcd is a distributed key value store, meaning it runs on multiple nodes so that there's always a backup available for fail over. Even though you can run etcd on a single node, you should run it on multiple nodes. We recommend 3, 5, or 7 etcd nodes for redundancy.

#### Control Plane Nodes

[Control plane](https://kubernetes.io/docs/concepts/#kubernetes-control-plane) nodes run the Kubernetes API server, scheduler, and controller manager. These nodes take care of routine tasks to ensure that your cluster maintains your configuration. Because all cluster data is stored on your etcd nodes, control plane nodes are stateless. You can run control plane on a single node, although two or more nodes are recommended for redundancy. Additionally, a single node can share the control plane and etcd roles.

#### Worker Nodes

[Worker nodes](https://kubernetes.io/docs/concepts/architecture/nodes/) run:

- _Kubelets_: An agent that monitors the state of the node, ensuring your containers are healthy.
- _Workloads_: The containers and pods that hold your apps, as well as other types of deployments.

Worker nodes also run storage and networking drivers, and ingress controllers when required. You create as many worker nodes as necessary to run your workloads.

## Switching between Clusters

To switch between clusters, use the drop-down available in the navigation bar.

Alternatively, you can switch between projects and clusters directly in the navigation bar. Open the **Global** view and select **Clusters** from the main menu. Then open a cluster.

## Managing Clusters in Rancher

After clusters have been [provisioned into Rancher]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/), [cluster owners]({{< baseurl >}}/rancher/v2.x/en/admin-settings/rbac/cluster-project-roles/#cluster-roles) will need to manage these clusters.

| Action | [Rancher launched Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/rke-clusters/) | [Hosted Kubernetes Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/hosted-kubernetes-clusters/) | [Imported Clusters]({{< baseurl >}}/rancher/v2.x/en/cluster-provisioning/imported-clusters) |
| --- | --- | ---| ---|
| [Using kubeconfig file to access a Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/kubeconfig/) | * | * | * |
| [Using kubectl to Access a Cluster]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/kubectl/) | * | * | * |
| [Adding Cluster Members]({{< baseurl >}}/rancher/v2.x/en/cluster-admin/cluster-members/) | * | * | * |
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
