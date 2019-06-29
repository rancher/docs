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

## How to Deploy Workloads with an Image from a Private Registry

You can deploy a workload with an image from a private registry through the Rancher UI, or with `kubectl`.

### Deploying the Workload with the Rancher UI

When you create the workload, in the **Docker Image** field, you need to enter the URL of the path to the Docker image in your private registry.

You don't need to enter your private registry credentials because the pod automatically has access to the Kubernetes registry secret if the workload is in the scope of a registry that you added.

### Deploying the Workload with kubectl

When you create the workload using `kubectl`, you need to configure the pod so that its YAML has:

- The path to the container image in the private registry, for example `quay.io/$(registry owner's name)/$(name of registry)`
- The name of the Kubernetes secret that has the private registry credentials

To reference this secret in the Pod yaml, you will add the field `imagePullSecrets` with the name of the secret. For more information, refer to the Kubernetes documentation on [creating a pod that uses your secret.](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-pod-that-uses-your-secret)

The reason you have to add the Kubernetes secret manually is that the pod only automatically gets the private registry credentials if you create it in the Rancher UI.

