---
title: Cluster Access
weight: 1
aliases:
  - /rancher/v2.x/en/cluster-admin/cluster-access/
---

This section is about what tools can be used to access clusters managed by Rancher.

For information on how to give users permission to access a cluster, see the section on [adding users to clusters.](../how-to-guides/advanced-user-guides/manage-clusters/access-clusters/add-users-to-clusters.md)

For more information on roles-based access control, see [this section.](manage-role-based-access-control-rbac.md)

For information on how to set up an authentication system, see [this section.](about-authentication.md)


### Rancher UI

Rancher provides an intuitive user interface for interacting with your clusters. All options available in the UI use the Rancher API. Therefore any action possible in the UI is also possible in the Rancher CLI or Rancher API.

### kubectl

You can use the Kubernetes command-line tool, [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), to manage   your clusters. You have two options for using kubectl:

- **Rancher kubectl shell:** Interact with your clusters by launching a kubectl shell available in the Rancher UI. This option requires no configuration actions on your part. For more information, see [Accessing Clusters with kubectl Shell](../how-to-guides/advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md).
- **Terminal remote connection:** You can also interact with your clusters by installing [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your local desktop and then copying the cluster's kubeconfig file to your local `~/.kube/config` directory. For more information, see [Accessing Clusters with kubectl and a kubeconfig File](../how-to-guides/advanced-user-guides/manage-clusters/access-clusters/use-kubectl-and-kubeconfig.md).

### Rancher CLI

You can control your clusters by downloading Rancher's own command-line interface, [Rancher CLI](cli-with-rancher.md). This CLI tool can interact directly with different clusters and projects or pass them `kubectl` commands.

### Rancher API

Finally, you can interact with your clusters over the Rancher API. Before you use the API, you must obtain an [API key](../reference-guides/user-settings/api-keys.md). To view the different resource fields and actions for an API object, open the API UI, which can be accessed by clicking on **View in API** for any Rancher UI object.