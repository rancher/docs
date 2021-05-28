---
title: Kubernetes Registry and Docker Registry
description: Learn about the Docker registry and Kubernetes registry, their use cases and how to use a private registry with the Rancher UI
weight: 3063
aliases:
  - /rancher/v2.5/en/tasks/projects/add-registries/
  - /rancher/v2.5/en/k8s-in-rancher/registries
  - /rancher/v2.5/en/k8s-resources/k8s-in-rancher/registries  
---
Registries are Kubernetes secrets containing credentials used to authenticate with [private Docker registries](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/). 

The word "registry" can mean two things, depending on whether it is used to refer to a Docker or Kubernetes registry:

- A **Docker registry** contains Docker images that you can pull in order to use them in your deployment. The registry is a stateless, scalable server side application that stores and lets you distribute Docker images.
- The **Kubernetes registry** is an image pull secret that your deployment uses to authenticate with a Docker registry.

Deployments use the Kubernetes registry secret to authenticate with a private Docker registry and then pull a Docker image hosted on it.

Currently, deployments pull the private registry credentials automatically only if the workload is created in the Rancher UI and not when it is created via kubectl.

# Creating a Registry

>**Prerequisites:** You must have a [private registry](https://docs.docker.com/registry/deploying/) available to use.

1. From the **Global** view, select the project containing the namespace(s) where you want to add a registry.

1. From the main menu, click **Resources > Secrets > Registry Credentials.** 

1. Click **Add Registry.**

1. Enter a **Name** for the registry.

    >**Note:** Kubernetes classifies secrets, certificates, and registries all as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your registry must have a unique name among all secrets within your workspace.

1. Select a **Scope** for the registry. You can either make the registry available for the entire project or a single namespace.

1. Select the website that hosts your private registry. Then enter credentials that authenticate with the registry. For example, if you use DockerHub, provide your DockerHub username and password.

1. Click **Save**.

**Result:** 

- Your secret is added to the project or namespace, depending on the scope you chose.
- You can view the secret in the Rancher UI from the **Resources > Registries** view.
- Any workload that you create in the Rancher UI will have the credentials to access the registry if the workload is within the registry's scope.

# Using a Private Registry

You can deploy a workload with an image from a private registry through the Rancher UI, or with `kubectl`.

### Using the Private Registry with the Rancher UI

To deploy a workload with an image from your private registry,

1. Go to the project view,
1. Click **Resources > Workloads.**
1. Click **Deploy.**
1. Enter a unique name for the workload and choose a namespace.
1. In the **Docker Image** field, enter the URL of the path to the Docker image in your private registry. For example, if your private registry is on Quay.io, you could use `quay.io/<Quay profile name>/<Image name>`.
1. Click **Launch.**

**Result:** Your deployment should launch, authenticate using the private registry credentials you added in the Rancher UI, and pull the Docker image that you specified.

### Using the Private Registry with kubectl

When you create the workload using `kubectl`, you need to configure the pod so that its YAML has the path to the image in the private registry. You also have to create and reference the registry secret because the pod only automatically gets access to the private registry credentials if it is created in the Rancher UI.

The secret has to be created in the same namespace where the workload gets deployed.

Below is an example `pod.yml` for a workload that uses an image from a private registry. In this example, the pod uses an image from Quay.io, and the .yml specifies the path to the image. The pod authenticates with the registry using credentials stored in a Kubernetes secret called `testquay`, which is specified in `spec.imagePullSecrets` in the `name` field:

```
apiVersion: v1
kind: Pod
metadata:
  name: private-reg
spec:
  containers:
  - name: private-reg-container
    image: quay.io/<Quay profile name>/<image name>
  imagePullSecrets:
  - name: testquay
```

In this example, the secret named `testquay` is in the default namespace.

You can use `kubectl` to create the secret with the private registry credentials. This command creates the secret named `testquay`:

```
kubectl create secret docker-registry testquay \
    --docker-server=quay.io \
    --docker-username=<Profile name> \
    --docker-password=<password>
```

To see how the secret is stored in Kubernetes, you can use this command:

```
kubectl get secret testquay --output="jsonpath={.data.\.dockerconfigjson}" | base64 --decode
```

The result looks like this:

```
{"auths":{"quay.io":{"username":"<Profile name>","password":"<password>","auth":"c291bXlhbGo6dGVzdGFiYzEyMw=="}}}
```

After the workload is deployed, you can check if the image was pulled successfully:

```
kubectl get events
```
The result should look like this:
```
14s         Normal    Scheduled          Pod    Successfully assigned default/private-reg2 to minikube
11s         Normal    Pulling            Pod    pulling image "quay.io/<Profile name>/<image name>"
10s         Normal    Pulled             Pod    Successfully pulled image "quay.io/<Profile name>/<image name>"
```

For more information, refer to the Kubernetes documentation on [creating a pod that uses your secret.](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-pod-that-uses-your-secret)
