---
title: Kubernetes Registry and Docker Registry
description: Learn about the Docker registry and Kubernetes registry, their use cases and how to use a private registry with the Rancher UI
weight: 3063
---
Registries are Kubernetes secrets containing credentials used to authenticate with [private Docker registries](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/). 

The word "registry" can mean two things, depending on whether it is used to refer to a Docker or Kubernetes registry:

- A **Docker registry** contains Docker images that you can pull in order to use them in your deployment. The registry is a stateless, scalable server side application that stores and lets you distribute Docker images.
- The **Kubernetes registry** is an image pull secret that your deployment uses to authenticate with a Docker registry.

Deployments use the Kubernetes registry secret to authenticate with a private Docker registry and then pull a Docker image hosted on it.

Currently, deployments pull the private registry credentials automatically only if the workload is created in the Rancher UI and not when it is created via kubectl.

# Creating a Registry in Namespaces

>**Prerequisites:** You must have a [private registry](https://docs.docker.com/registry/deploying/) available to use.

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to add a registry and click **Explore**.
1. In the left navigation, click either **Storage > Secrets** or **More Resources > Core > Secrets**. 
1. Click **Create**.
1. Click **Registry**.
1. Enter a **Name** for the registry.

    >**Note:** Kubernetes classifies secrets, certificates, and registries all as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your registry must have a unique name among all secrets within your workspace.

1. Select a namespace for the registry.
1. Select the website that hosts your private registry. Then enter credentials that authenticate with the registry. For example, if you use DockerHub, provide your DockerHub username and password.
1. Click **Save**.

**Result:** 

- Your secret is added to the namespace you chose.
- You can view the secret in the Rancher UI by clicking either **Storage > Secrets** or **More Resources > Core > Secrets**. 
- Any workload that you create in the Rancher UI will have the credentials to access the registry if the workload is within the registry's scope.

# Creating a Registry in Projects

>**Prerequisites:** You must have a [private registry](https://docs.docker.com/registry/deploying/) available to use.

Before v2.6, secrets were required to be in a project scope. Projects are no longer required, and you may use the namespace scope instead. As a result, the Rancher UI was updated to reflect this new functionality. However, you may still create a project-scoped registry if desired. Use the following steps to do so:

1. In the upper left corner, click **☰ > Global Settings** in the dropdown.
1. Click **Feature Flags**.
1. Go to the `legacy` feature flag and click **Activate**.
1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to add a registry and click **Explore**.
1. In the left navigation, click either **Storage > Secrets** or **More Resources > Core > Secrets**. 
1. Click **Create**.
1. Click **Registry**.
1. In the top navigation bar, filter to see only one project.
1. Enter a **Name** for the registry.

    >**Note:** Kubernetes classifies secrets, certificates, and registries all as [secrets](https://kubernetes.io/docs/concepts/configuration/secret/), and no two secrets in a project or namespace can have duplicate names. Therefore, to prevent conflicts, your registry must have a unique name among all secrets within your workspace.

1. Select a namespace for the registry.
1. Select the website that hosts your private registry. Then enter credentials that authenticate with the registry. For example, if you use DockerHub, provide your DockerHub username and password.
1. Click **Save**.

**Result:** 

- Your secret is added to the individual project you chose.
- You can view the secret in the Rancher UI by clicking either **Storage > Secrets** or **More Resources > Core > Secrets**.
- Any workload that you create in the Rancher UI will have the credentials to access the registry if the workload is within the registry's scope.

>**Note:** Project-scoped registries on the local cluster are only visible when a single project is selected.

# Using a Private Registry

You can deploy a workload with an image from a private registry through the Rancher UI, or with `kubectl`.

### Using the Private Registry with the Rancher UI

To deploy a workload with an image from your private registry,

1. In the upper left corner, click **☰ > Cluster Management**.
1. Go to the cluster where you want to deploy a workload and click **Explore**.
1. Click **Workload**.
1. Click **Create**.
1. Select the type of workload you want to create.
1. Enter a unique name for the workload and choose a namespace.
1. In the **Container Image** field, enter the URL of the path to the image in your private registry. For example, if your private registry is on Quay.io, you could use `quay.io/<Quay profile name>/<Image name>`.
1. Click **Create**.

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
