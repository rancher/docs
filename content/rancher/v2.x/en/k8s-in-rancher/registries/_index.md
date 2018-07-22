---
title: Registries
weight: 3063
aliases:
  - /rancher/v2.x/en/tasks/projects/add-registries/
---

Registries are secrets containing credentials used to authenticate with [private registries](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/). Deployments use these secrets to authenticate with a private registry and then pull a Docker image hosted on it.

>**Note:** Currently, credentials are pulled automatically only if the workload is created in the Rancher UI and not kubectl.

Registries are secrets containing credentials used to authenticate with [private registries](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/). Deployments use these secrets to authenticate with a private registry and then pull a Docker image hosted on it.

>**Prerequisites:** You must have a [private registry](https://docs.docker.com/registry/deploying/) configured.

>**Note:** Currently, credentials are pulled automatically only if the workload is created in the Rancher UI and not kubectl.

1. From the **Global** view, select the project containing the namespace(s) where you want to add a registry.

1. From the main menu, select **Resources > Registries**. Click **Add Registry**.

1. Enter a **Name** for the registry.

    >**Note:** Kubernetes classifies secrets, certificates, ConfigMaps, and registries all as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your registry must have a unique name among all secrets within your workspace.

1. Select a **Scope** for the registry.

1. Select the website that hosts your private registry. Then enter credentials that authenticate with the registry.

1. Click **Save**.

**Result:** Your secret is added to the project or namespace, depending on the scope you chose. You can view the secret in the Rancher UI from the **Resources > Registries** view.

## What's Next?

Now that you have a registry added to the project or namespace, you can add it to a workload that's deploying an image from your private registry.

For more information on adding a registry to a workload, see [Deploying Workloads]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/workloads/deploy-workloads/).
