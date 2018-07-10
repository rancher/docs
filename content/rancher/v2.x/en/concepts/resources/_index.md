---
title: Resources
weight: 2275
---

Within the context of a Rancher project or namespace, _resources_ are files and data that support operation of your pods. Within this scope, resources include:

- [Certificates](#certificates)
- [ConfigMaps](#configmaps)
- [Secrets](#secrets)
- [Registries](#registries)

Rancher extends the application of the Kubernetes namespace resources listed above to [projects]({{< baseurl >}}/rancher/v2.x/en/projects), which are Rancher-specific constructs. In the hierarchy of Rancher objects, projects contain namespaces. Therefore, any resources available within a project are available for all namespaces within that project.

Within Kubernetes, certificates, registries, and secrets are all considered [secrets](https://kubernetes.io/docs/concepts/configuration/secret/). Therefore, within a single project or namespace, these resources must have unique names to avoid conflicts. Although secrets are primarily used to carry sensitive information, they have other uses as well. Read on below.

## Certificates

When you create an ingress within Rancher/Kubernetes, you must provide it with a secret that includes a TLS private key and certificate, which are used to encrypt and decrypt communications that come through the ingress. You can make certificates available for ingress use by navigating to its project or namespace, and then uploading the certificate. You can then add the certificate to the ingress deployment.

## ConfigMaps

While most types of Kubernetes secrets store sensitive information, [ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/) store general configuration information, such as a group of config files. Because ConfigMaps don't store sensitive information, they can be updated automatically, and therefore don't require their containers to be restarted following update (unlike most secret types, which require manual updates and a container restart to take effect).

ConfigMaps accept key value pairs in common string formats, like config files or JSON blobs. After you upload a config map, any workload can reference it as either an environment variable or a volume mount.

>**Note:** ConfigMaps are only available within namespaces and not projects.

## Secrets

[Secrets](https://kubernetes.io/docs/concepts/configuration/secret/#overview-of-secrets) store sensitive data like passwords, tokens, or keys. They may contain one or more key value pairs.
When configuring a workload, you'll be able to choose which secrets to include. Like config maps, secrets can be referenced by workloads as either an environment variable or a volume mount.

>**Note:** Any update to secrets won't reflect automatically inside pods, until the pods are restarted.

## Registries

Registries are secrets containing credentials used to authenticate with [private registries](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/). Deployments use these secrets to authenticate with a private registry and then pull a Docker image hosted on it.

>**Note:** Currently, credentials are pulled automatically only if the workload is created in the Rancher UI and not kubectl.

## Related Links

- [Adding SSL Certificates]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/add-ssl-certificates)
- [Adding ConfigMaps]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/add-configmaps)
- [Adding Secrets]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/add-a-secret)
- [Adding Registries]({{< baseurl >}}/rancher/v2.x/en/tasks/projects/add-registries)
