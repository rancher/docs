---
title: Kubernetes in Rancher
weight: 3000
aliases:
  - /rancher/v2.x/en/concepts/
  - /rancher/v2.x/en/tasks/
  - /rancher/v2.x/en/concepts/resources/
---



Within the context of a Rancher project or namespace, _resources_ are files and data that support operation of your pods. Within this scope, resources include:

- [Certificates]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/certificates/)
- [ConfigMaps]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/configmaps/)
- [Secrets]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/secrets/)
- [Registries]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/registries/)

Rancher extends the application of the Kubernetes namespace resources listed above to [projects]({{< baseurl >}}/rancher/v2.x/en/kubernetes-in-rancher/projects-and-namespaces/), which are Rancher-specific constructs. In the hierarchy of Rancher objects, projects contain namespaces. Therefore, any resources available within a project are available for all namespaces within that project.

Within Kubernetes, certificates, registries, and secrets are all considered [secrets](https://kubernetes.io/docs/concepts/configuration/secret/). Therefore, within a single project or namespace, these resources must have unique names to avoid conflicts. Although secrets are primarily used to carry sensitive information, they have other uses as well.
