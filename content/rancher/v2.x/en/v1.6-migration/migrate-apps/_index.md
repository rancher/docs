---
title: 3—Migrate 1.6 Apps to 2.0
weight: 200
---

<figcaption>App migration vocabulary cheat sheet</figcaption>

Rancher 1.6 | Rancher 2.0 | Description | Key Differences
------------|-------------|-------------|-----------------
Container   | Pod         | placeholder | placeholder
Service     | Workload    | placeholder | placeholder
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