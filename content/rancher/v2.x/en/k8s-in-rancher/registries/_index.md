---
title: Registries
weight: 3063
aliases:
  - /rancher/v2.x/en/tasks/projects/add-registries/
---
Registries are Kubernetes secrets containing credentials used to authenticate with [private Docker registries](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/). 

The word "registry" can refer to two things:

- A ** Docker registry** contains Docker images that you can pull in order to use them in your deployment. The registry is a stateless, scalable server side application that stores and lets you distribute Docker images.
- The Kubernetes secret that your deployment uses to authenticate with a Docker registry

Deployments use the secrets in the Kubernetes registry to authenticate with a private Docker registry and then pull a Docker image hosted on it.

- A **Docker registry** contains Docker images that you can pull in order to use them in your deployment. The registry is a stateless, scalable server side application that stores and lets you distribute Docker images.
- The **Kubernetes registry** is a secret that your deployment uses to authenticate with a Docker registry.

Deployments use the Kubernetes registry secret to authenticate with a private Docker registry and then pull a Docker image hosted on it.

Currently, deployments pull the private registry credentials automatically only if the workload is created in the Rancher UI and not when it is created via kubectl.

>**Prerequisites:** You must have a [private registry](https://docs.docker.com/registry/deploying/) available to use.

1. From the **Global** view, select the project containing the namespace(s) where you want to add a registry.

1. From the main menu, select **Resources > Registries**. Click **Add Registry**.

1. Enter a **Name** for the registry.

    >**Note:** Kubernetes classifies secrets, certificates, ConfigMaps, and registries all as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your registry must have a unique name among all secrets within your workspace.

1. Select a **Scope** for the registry. You can either make the registry available for the entire project or a single [namespace]({{< baseurl >}}/rancher/v2.x/en/k8s-in-rancher/projects-and-namespaces/#namespaces).

1. Select the website that hosts your private registry. Then enter credentials that authenticate with the registry. For example, if you use DockerHub, provide your DockerHub username and password.

1. Click **Save**.

**Result:** Your secret is added to the project or namespace, depending on the scope you chose. You can view the secret in the Rancher UI from the **Resources > Registries** view. Any workload that you create in the Rancher UI will be able to access your registry if it is within the registry's scope.

## How to Deploy Workloads with Images in a Private Registry

After adding a registry to a project, any workloads deployed via the Rancher UI will be able to pull images from that registry.

Now that you have a registry added to the project or namespace, you can add it to a workload that you want to deploy an image from your private registry.

For more information, refer to the Kubernetes documentation on [creating a pod that uses your secret.](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-pod-that-uses-your-secret)