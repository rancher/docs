---
title: 3—Migrate 1.6 Apps to 2.0
weight: 200
---

<figcaption>App migration vocabulary cheat sheet</figcaption>

Rancher 1.6 | Rancher 2.0 | Description | Key Differences
------------|-------------|-------------|-----------------
Container   | Pod         | A standard unit of software that packages an application along with its dependencies. | Although these terms are often used synonymously, they are technically slightly different. Containers are a single unit. Pods are a group of containers. These terms are used synonymously because pods usually only include a single container. Pods are Kubernetes object, while containers are a Docker object.
Service     | Workload    | A set of one or more containers created from the same Docker image.  | Service is a term that encompasses one or more containers using the same image, while Workload expands that definition to include the deployment rules for those containers.
Stack       | Project + Namespace | placeholder | placeholder
Compose config file | Kubernetes YAML | placeholder | placeholder

## A. Convert Compose Config Files to Kubernetes YAML

In Rancher 1.6, Cattle was the most popular container orchestrator, which supports Docker Compose config files or Rancher Compose config files. Because Rancher 2.0 supports only Kubernetes, you must convert your Compose files from 1.6 to Kubernetes YAML to migrate them.

You can complete this conversion by downloading and installing Kompose, an open source tool that converts Compose files to Kubernetes YAML. 

However, Kompose doesn't do everything needed to successfully deploy a workload in Rancher 2.0. Manually add a `HostPort` spec to your YAML.

<figcaption>HostPort Spec Example</figcaption>

```yaml
spec:
    containers:
    - image: sdelements/lets-chat
      name: chat
      ports: 
      - containerPort: 8080
        hostPort: 9890 # ADD THIS SPEC!
      resources: {}
...
```

## B. Deploy Applications Using Kubernetes YAML