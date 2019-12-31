---
title: Cluster Access
weight: 1
---

There are many ways you can interact with Kubernetes clusters that are managed by Rancher:

- **Rancher UI**

    Rancher provides an intuitive user interface for interacting with your clusters. All options available in the UI use the Rancher API. Therefore any action possible in the UI is also possible in the Rancher CLI or Rancher API.

- **kubectl**

    You can use the Kubernetes command-line tool, [kubectl](https://kubernetes.io/docs/reference/kubectl/overview/), to manage   your clusters. You have two options for using kubectl:

    - **Rancher kubectl shell**

        Interact with your clusters by launching a kubectl shell available in the Rancher UI. This option requires no configuration actions on your part.

        For more information, see [Accessing Clusters with kubectl Shell]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/kubectl/#accessing-clusters-with-kubectl-shell).

    - **Terminal remote connection**

        You can also interact with your clusters by installing [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) on your local desktop and then copying the cluster's kubeconfig file to your local `~/.kube/config` directory.

        For more information, see [Accessing Clusters with kubectl and a kubeconfig File]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/kubectl/#accessing-clusters-with-kubectl-and-a-kubeconfig-file).

- **Rancher CLI**

    You can control your clusters by downloading Rancher's own command-line interface, [Rancher CLI]({{< baseurl >}}/rancher/v2.x/en/cli/). This CLI tool can interact directly with different clusters and projects or pass them `kubectl` commands.

- **Rancher API**

    Finally, you can interact with your clusters over the Rancher API. Before you use the API, you must obtain an [API key]({{< baseurl >}}/rancher/v2.x/en/user-settings/api-keys/). To view the different resource fields and actions for an API object, open the API UI, which can be accessed by clicking on **View in API** for any Rancher UI object.