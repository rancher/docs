---
title: Cluster Access
weight: 1
---

This section is about what tools can be used to access clusters managed by Rancher.

For information on how to give users permission to access a cluster, see the section on [adding users to clusters.]({{<baseurl>}}/rancher/v2.0-v2.4/en/cluster-admin/cluster-access/cluster-members/)

For more information on roles-based access control, see [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/rbac/)

For information on how to set up an authentication system, see [this section.]({{<baseurl>}}/rancher/v2.0-v2.4/en/admin-settings/authentication/)


### Rancher UI

Rancher provides an intuitive user interface for interacting with your clusters. All options available in the UI use the Rancher API. Therefore any action possible in the UI is also possible in the Rancher CLI or Rancher API.

### kubectl

You can use the Kubernetes command-line tool, [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), to manage   your clusters. You have two options for using kubectl:

- **Rancher kubectl shell:** Interact with your clusters by launching a kubectl shell available in the Rancher UI. This option requires no configuration actions on your part. For more information, see [Accessing Clusters with kubectl Shell]({{<baseurl>}}/rancher/v2.0-v2.4/en/k8s-in-rancher/kubectl/).
- **Terminal remote connection:** You can also interact with your clusters by installing [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your local desktop and then copying the cluster's kubeconfig file to your local `~/.kube/config` directory. For more information, see [Accessing Clusters with kubectl and a kubeconfig File](./kubectl/).

### Rancher CLI

You can control your clusters by downloading Rancher's own command-line interface, [Rancher CLI]({{<baseurl>}}/rancher/v2.0-v2.4/en/cli/). This CLI tool can interact directly with different clusters and projects or pass them `kubectl` commands.

### Rancher API

Finally, you can interact with your clusters over the Rancher API. Before you use the API, you must obtain an [API key]({{<baseurl>}}/rancher/v2.0-v2.4/en/user-settings/api-keys/). To view the different resource fields and actions for an API object, open the API UI, which can be accessed by clicking on **View in API** for any Rancher UI object.