---
title: 3—Migrate 1.6 Apps to 2.0
weight: 200
---

Now that you've run the Migration Tool and identified which of your 1.6 applications can be moved to 2.0, begin moving them.

## What's Differences Should I Know About?

In Rancher 1.6, our most popular container orchestrator was Cattle, which consumes either Docker Compose or Rancher Compose config files, which are then used to configure your clusters. However, Rancher 2.0 focuses exclusively on Kubernetes. Therefore, your clusters are now configured using Kubeconfig, which is a file format similar to Compose. Because Rancher 2.0 supports only Kubernetes, you must convert your 1.6 Compose files to Kubeconfig. After you convert these files, your can pass them to Rancher 2.0 to recreate your 1.6 clusters.

Before you begin migration of apps, familiarize your self with the 1.6 and 2.0 terms below, as they're used frequently.

<figcaption>App migration vocabulary cheat sheet</figcaption>

Rancher 1.6 | Rancher 2.0 | Description | Key Differences
------------|-------------|-------------|-----------------
Container   | Pod         | The smallest standard unit of software (along with its dependencies) available for deployment. | Although these terms are often used synonymously, they are technically slightly different. Containers are a single unit. Pods are a group of containers. These terms are used synonymously because pods usually only include a single container. Pods are Kubernetes object, while containers are a Docker object.
Service     | Workload    | A set of one or more containers created from the same Docker image.  | Service is a term that encompasses one or more containers using the same image. A workload also a group of containers running the same image. However, there are different types of workloads used for different purposes.
Stack       | Namespace | An object used to group a number of services. | In Rancher 1.6, the only objects for grouping services were stacks. However, Rancher 2.0 lets you group namespaces into _projects_, which are grouping objects introduced by Rancher.
Compose config file | Kubeconfig file | A file that holds the configuration of your cluster. | Two different file types used to configure a cluster.

## A. Convert Compose Config Files to Kubeconfig

Begin by exporting your Compose files from Rancher 1.6 and running them through [Kompose](http://kompose.io/), an open source tool that converts Compose files to Kubeconfig files. Kompose is supported on Windows, Mac, and most major flavors of Linux.

> **Prerequisites:** Install [Kompose](http://kompose.io/).

1. Log into Rancher 1.6.

1. Download the Compose file for each application that you want to migrate.

1. Open Terminal and change directory to the location of your Compose files.

1. Enter the following command to convert your Compose files.

    ```
    kompose convert
    ```
    **Step Result:** Kompose converts each Compose file into two output files: a deployment YAML file and a service YAML file.

    >**Why does Kompose output two files?**
    >
    >When you run Kompose, in addition to the deployment YAML created for each Compose file, a service YAML file is also created. This additional service YAML is needed because each pod in your deployment is assigned IP address dynamically, which makes it an unreliable way to reach the pod. Therefore, a service YAML file is created, which provides a static endpoint that's bound to the deployment using labels and annotations.


1. Kompose doesn't do everything needed to successfully deploy a workload in Rancher 2.0. Manually add a `HostPort` spec to each of your deployment YAML files, as demonstrated in the example below. Declare the `HostPort` that your particular application uses.

    <figcaption>HostPort Spec Example</figcaption>

    ```yaml
    spec:
        containers:
        - image: sdelements/lets-chat
          name: chat
          ports:
          - containerPort: 8080
            hostPort: <HOSTPORT> # ADD THIS SPEC!
          resources: {}
    ...
    ```

## B. Deploy Applications Using Rancher CLI

Finally, use the following Rancher CLI commands to deploy your application using Rancher 2.0. Repeat these two commands for each application you're moving to Rancher 2.0.

```
./rancher kubectl create -f <DEPLOYMENT_YAML_FILE> # DEPLOY THE DEPLOYMENT YAML

./rancher kubectl create -f <SERVICE_YAML_FILE> # DEPLOY THE SERVICE YAML
```